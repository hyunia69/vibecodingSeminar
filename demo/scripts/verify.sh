#!/usr/bin/env bash
# 3 엔드포인트 × (POST + GET) = 6개 curl 검증
# 전제: 라우터들이 모두 구현 완료된 상태 (서브에이전트 작업 + 머지 후)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_DIR="$SCRIPT_DIR/../api"
PORT=3737

cd "$API_DIR"

PORT=$PORT node src/index.js &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null || true" EXIT

sleep 1

# 연결 가능성만 체크 (응답 코드 무관 — 404도 "서버는 살아있음")
if ! curl -s --max-time 2 -o /dev/null "http://localhost:$PORT/users"; then
  echo "❌ Server not responding on port $PORT"
  exit 1
fi

echo ""
echo "─── /users ───"
curl -sf -X POST "localhost:$PORT/users" \
  -H 'Content-Type: application/json' \
  -d '{"name":"alice","email":"a@x.com"}'
echo ""
curl -sf "localhost:$PORT/users"
echo ""

echo ""
echo "─── /products ───"
curl -sf -X POST "localhost:$PORT/products" \
  -H 'Content-Type: application/json' \
  -d '{"name":"widget","price":42}'
echo ""
curl -sf "localhost:$PORT/products"
echo ""

echo ""
echo "─── /orders ───"
curl -sf -X POST "localhost:$PORT/orders" \
  -H 'Content-Type: application/json' \
  -d '{"productId":"p-1","qty":2}'
echo ""
curl -sf "localhost:$PORT/orders"
echo ""

echo ""
echo "✅ All 6 calls passed"
