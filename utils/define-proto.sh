#!/bin/bash

set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="./proto/GeoDB-Limited/odin-core"
ODIN_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
OUT_DIR="./src/codec/"

mkdir -p "$OUT_DIR"

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$ODIN_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$ODIN_PROTO_DIR/oracle/v1/tx.proto" \
  "$ODIN_PROTO_DIR/oracle/v1/oracle.proto" \
  "$ODIN_PROTO_DIR/mint/tx.proto" \
  "$ODIN_PROTO_DIR/mint/mint.proto" \
  "$ODIN_PROTO_DIR/mint/tx.proto" \
  "$ODIN_PROTO_DIR/coinswap/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/cosmos/base/v1beta1/coin.proto"

# Remove unnecessary codec files
rm -rf \
  src/codec/cosmos_proto/ \
  src/codec/gogoproto/ \
  src/codec/google/api/ \
  src/codec/google/protobuf/descriptor.ts