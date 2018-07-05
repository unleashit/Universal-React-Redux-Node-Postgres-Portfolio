#!/usr/bin/env bash
set -e
set -x

if [ $NODE_ENV == "development" ]; then
  npm run nodemon
else
  npm start
fi