// Node 20+ 내장 test runner 사용 — 별도 의존성 없음
// 실행: node --test src/tokenCost.test.mjs

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { estimateCost, listModels, compareCost } from "./tokenCost.mjs";

describe("estimateCost — happy path", () => {
  test("Opus 4.7: 1M input + 100K output, no cache", () => {
    // 1,000,000 × $15/M = $15.00
    //   100,000 × $75/M = $7.50
    //   합계 = $22.50
    const cost = estimateCost("claude-opus-4-7", 1_000_000, 100_000);
    assert.equal(cost.toFixed(2), "22.50");
  });

  test("Haiku 4.5: 같은 워크로드는 훨씬 저렴", () => {
    // 1,000,000 × $1/M = $1.00
    //   100,000 × $5/M = $0.50
    //   합계 = $1.50
    const cost = estimateCost("claude-haiku-4-5", 1_000_000, 100_000);
    assert.equal(cost.toFixed(2), "1.50");
  });

  test("Sonnet 4.6은 둘 사이", () => {
    const cost = estimateCost("claude-sonnet-4-6", 1_000_000, 100_000);
    assert.equal(cost.toFixed(2), "4.50");
  });
});

describe("estimateCost — prompt caching 효과", () => {
  test("90% 캐시 적중 시 입력 비용 약 90% 절감", () => {
    // 1M 입력 중 900K가 캐시 적중, 100K는 신규
    // fresh:  100,000 × $15/M = $1.50
    // cached: 900,000 × $1.50/M = $1.35
    // output: 0
    // 합계 = $2.85 (캐시 없이는 $15.00)
    const cost = estimateCost("claude-opus-4-7", 1_000_000, 0, 900_000);
    assert.equal(cost.toFixed(2), "2.85");
  });

  test("100% 캐시 적중 시 input은 cacheHit 가격만", () => {
    // 1M × $1.50/M = $1.50
    const cost = estimateCost("claude-opus-4-7", 1_000_000, 0, 1_000_000);
    assert.equal(cost.toFixed(2), "1.50");
  });

  test("캐시 없음(0)은 기본 입력 가격", () => {
    const withZeroCache = estimateCost("claude-opus-4-7", 1_000_000, 0, 0);
    const noCacheArg    = estimateCost("claude-opus-4-7", 1_000_000, 0);
    assert.equal(withZeroCache, noCacheArg);
  });
});

describe("estimateCost — 에러 처리", () => {
  test("모르는 모델은 예외", () => {
    assert.throws(
      () => estimateCost("gpt-9999", 1000, 1000),
      /Unknown model/
    );
  });

  test("음수 토큰은 예외", () => {
    assert.throws(
      () => estimateCost("claude-opus-4-7", -1, 0),
      /non-negative/
    );
  });

  test("캐시 > 입력은 예외", () => {
    assert.throws(
      () => estimateCost("claude-opus-4-7", 100, 0, 200),
      /exceed/
    );
  });
});

describe("listModels", () => {
  test("3개 모델 반환", () => {
    const models = listModels();
    assert.equal(models.length, 3);
    assert.ok(models.includes("claude-opus-4-7"));
    assert.ok(models.includes("claude-sonnet-4-6"));
    assert.ok(models.includes("claude-haiku-4-5"));
  });
});

describe("compareCost", () => {
  test("모든 모델에 대한 결과를 반환한다", () => {
    const result = compareCost({ inputTokens: 1_000_000, outputTokens: 100_000 });
    assert.equal(result.length, listModels().length);
    const models = result.map(r => r.model);
    for (const m of listModels()) {
      assert.ok(models.includes(m), `${m}이 결과에 없음`);
    }
  });

  test("결과는 cost 오름차순 정렬이다", () => {
    const result = compareCost({ inputTokens: 1_000_000, outputTokens: 100_000 });
    assert.ok(result.length >= 2, "정렬 검증에는 최소 2개 필요");
    for (let i = 1; i < result.length; i++) {
      assert.ok(
        result[i - 1].cost <= result[i].cost,
        `정렬 위반: ${result[i - 1].model}($${result[i - 1].cost}) > ${result[i].model}($${result[i].cost})`
      );
    }
  });

  test("Haiku가 가장 싸다", () => {
    const result = compareCost({ inputTokens: 1_000_000, outputTokens: 100_000 });
    assert.equal(result[0].model, "claude-haiku-4-5");
  });

  test("cachedInputTokens가 각 모델 estimateCost에 전파된다", () => {
    const withCache = compareCost({ inputTokens: 1_000_000, outputTokens: 0, cachedInputTokens: 900_000 });
    const withoutCache = compareCost({ inputTokens: 1_000_000, outputTokens: 0 });
    const opusCached = withCache.find(r => r.model === "claude-opus-4-7").cost;
    const opusUncached = withoutCache.find(r => r.model === "claude-opus-4-7").cost;
    assert.ok(opusCached < opusUncached, `캐시 적용된 cost(${opusCached}) >= 미적용(${opusUncached})`);
  });

  test("음수 토큰은 예외를 전파한다", () => {
    assert.throws(
      () => compareCost({ inputTokens: -1, outputTokens: 0 }),
      /non-negative/
    );
  });
});
