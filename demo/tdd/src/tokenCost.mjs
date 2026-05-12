// 토큰 비용 계산 — Anthropic Claude 모델 기준
// 가격 단위: USD per 1M tokens (2026.05 기준 공개 가격)

const PRICES = {
  "claude-opus-4-7":   { input: 15, output: 75, cacheHit: 1.5 },
  "claude-sonnet-4-6": { input: 3,  output: 15, cacheHit: 0.3 },
  "claude-haiku-4-5":  { input: 1,  output: 5,  cacheHit: 0.1 },
};

export function estimateCost(model, inputTokens, outputTokens, cachedInputTokens = 0) {
  const price = PRICES[model];
  if (!price) {
    throw new Error(`Unknown model: ${model}`);
  }
  if (inputTokens < 0 || outputTokens < 0 || cachedInputTokens < 0) {
    throw new Error("Token counts must be non-negative");
  }
  if (cachedInputTokens > inputTokens) {
    throw new Error("Cached tokens cannot exceed input tokens");
  }

  const freshInput = inputTokens - cachedInputTokens;
  const inputCost  = (freshInput        * price.input)    / 1_000_000;
  const cacheCost  = (cachedInputTokens * price.cacheHit) / 1_000_000;
  const outputCost = (outputTokens      * price.output)   / 1_000_000;

  return inputCost + cacheCost + outputCost;
}

export function listModels() {
  return Object.keys(PRICES);
}

export function compareCost(workload) {
  const { inputTokens, outputTokens, cachedInputTokens = 0 } = workload;
  return listModels()
    .map(model => ({
      model,
      cost: estimateCost(model, inputTokens, outputTokens, cachedInputTokens),
    }))
    .sort((a, b) => a.cost - b.cost);
}
