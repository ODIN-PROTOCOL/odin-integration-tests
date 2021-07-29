#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

PROTO_DIR="./proto"
GEO_DB_DIR="$PROTO_DIR/GeoDB-Limited"
ODIN_CORE_DIR="$GEO_DB_DIR/odin-core"
ZIP_FILE="$GEO_DB_DIR/tmp.zip"
ODIN_CORE_REF=${ODIN_CORE_REF:-"feature/[feature-name]"}
SUFFIX=${ODIN_CORE_REF}

[[ $SUFFIX =~ ^v[0-9]+\.[0-9]+\.[0-9]+(-.+)?$ ]] && SUFFIX=${SUFFIX#v}

mkdir -p "$GEO_DB_DIR"

wget -qO "$ZIP_FILE" "https://github.com/GeoDB-Limited/odin-core/archive/$ODIN_CORE_REF.zip"

unzip "$ZIP_FILE" "*.proto" -d "$GEO_DB_DIR"

mv "$ODIN_CORE_DIR-feature-[feature-name]" "$ODIN_CORE_DIR"
rm "$ZIP_FILE"