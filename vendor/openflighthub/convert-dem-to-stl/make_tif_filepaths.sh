#!/usr/bin/env bash
# Usage: ./list_tifs.sh <search_folder> <output_file>
# Example: ./list_tifs.sh ./data tif_paths.txt

set -eu

SEARCH_DIR="${1:?Please provide search folder}"
OUT_FILE="${2:?Please provide output file}"

find "$SEARCH_DIR" -type f -iname '*.tif' -print | sed "s|^$PWD/||; s|^\./||" > "$OUT_FILE"
