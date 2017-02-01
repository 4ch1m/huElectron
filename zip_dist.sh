#!/bin/bash

PRODUCT_NAME=$(node -p -e "require('./package.json').productName")
VERSION=$(node -p -e "require('./package.json').version")

if [ -d dist ]; then

  find dist             -iname "${PRODUCT_NAME}-*.zip" -type f -execdir rm                            "{}" \;
  find dist -maxdepth 1 -iname "${PRODUCT_NAME}-*"     -type d -execdir zip -9 -r "{}-${VERSION}.zip" "{}" \;

fi
