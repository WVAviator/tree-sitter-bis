#!/bin/sh

add_section() {
  local dir="$1"
  local header="$2"
  # echo "\n# $header" >>src/SUMMARY.md
  echo "\n- [$header]($dir/README.md)" >>src/SUMMARY.md
  for f in src/$dir/*.md; do
    name=$(basename "$f" .md)
    [[ "$name" == "README" ]] && continue

    # Split on underscores, capitalize first letter of each word, rejoin with spaces
    label=$(echo "$name" | awk -F'_' '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2); print}' OFS=' ')

    echo "  - [$label]($dir/$name.md)" >>src/SUMMARY.md
  done
}

add_section "guides" "Guides"
add_section "statements" "Statements"
add_section "runs" "Runs/Commands"
add_section "reference" "References"
