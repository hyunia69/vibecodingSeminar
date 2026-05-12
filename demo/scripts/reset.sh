#!/usr/bin/env bash
# 데모 상태를 클린한 초기 상태로 복원
# - 모든 worktree 강제 제거
# - api/를 demo-baseline 태그로 hard reset
# - main 외 모든 브랜치 삭제

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/../api"

cd "$API_DIR"

echo "→ Removing all worktrees except main..."
# Use git rev-parse so path format matches worktree list output on Windows/Unix
MAIN_PATH="$(git rev-parse --show-toplevel)"
git worktree list --porcelain | awk '/^worktree/ {print $2}' | while read -r wt_path; do
  if [ "$wt_path" != "$MAIN_PATH" ]; then
    echo "  removing: $wt_path"
    git worktree remove --force "$wt_path" 2>/dev/null || true
  fi
done

git worktree prune

echo "→ Resetting to demo-baseline..."
git checkout main 2>/dev/null || git checkout -b main
git reset --hard demo-baseline

echo "→ Deleting non-main branches..."
git branch | sed 's/^[* ]*//' | while read -r branch; do
  if [ "$branch" != "main" ] && [ -n "$branch" ]; then
    echo "  deleting: $branch"
    git branch -D "$branch" 2>/dev/null || true
  fi
done

echo "✅ Demo state reset"
echo ""
echo "Final state:"
git worktree list
echo ""
git log --oneline
