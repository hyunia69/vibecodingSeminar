#!/usr/bin/env python3
"""
Stop hook for vibe-coding-seminar.

Detects slide/index/CLAUDE.md changes since last run and appends a JSON entry to
.claude/seminar-queue.jsonl. The queue is flushed to Notion by /seminar-flush.

Design: hook only does detection. Pushing to Notion is deferred to a slash
command to avoid (a) Claude Code recursion when spawning `claude -p`, (b) per-turn
LLM cost, (c) Cloudflare WAF rejection of large Korean payloads.
"""
from __future__ import annotations
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
SLIDES_DIR = PROJECT_ROOT / "slides"
STATE_FILE = PROJECT_ROOT / ".claude" / "seminar-log-state.json"
QUEUE_FILE = PROJECT_ROOT / ".claude" / "seminar-queue.jsonl"

WATCH_EXTRA = [
    PROJECT_ROOT / "index.html",
    PROJECT_ROOT / "CLAUDE.md",
]


def read_state() -> float:
    try:
        return float(json.loads(STATE_FILE.read_text(encoding="utf-8")).get("last_ts", 0))
    except Exception:
        return 0.0


def write_state(ts: float) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "last_ts": ts,
        "last_iso": datetime.fromtimestamp(ts, timezone.utc).isoformat(),
    }
    STATE_FILE.write_text(json.dumps(payload), encoding="utf-8")


def collect_modified(since_ts: float) -> list[dict]:
    found: list[dict] = []
    if SLIDES_DIR.exists():
        for f in SLIDES_DIR.rglob("*.md"):
            try:
                m = f.stat().st_mtime
            except OSError:
                continue
            if m > since_ts:
                found.append({"path": f.relative_to(PROJECT_ROOT).as_posix(), "mtime": m})
    for f in WATCH_EXTRA:
        if not f.exists():
            continue
        try:
            m = f.stat().st_mtime
        except OSError:
            continue
        if m > since_ts:
            found.append({"path": f.relative_to(PROJECT_ROOT).as_posix(), "mtime": m})
    return found


def main() -> None:
    try:
        sys.stdin.read()
    except Exception:
        pass

    now = datetime.now().timestamp()

    if not STATE_FILE.exists():
        write_state(now)
        return

    since = read_state()
    modified = collect_modified(since)
    write_state(now)

    if not modified:
        return

    QUEUE_FILE.parent.mkdir(parents=True, exist_ok=True)
    entry = {
        "ts_iso": datetime.now().isoformat(timespec="seconds"),
        "files": modified,
    }
    with QUEUE_FILE.open("a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
