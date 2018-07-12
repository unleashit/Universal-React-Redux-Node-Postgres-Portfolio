#!/usr/bin/env bash
set -e
set -x

if [ $NODE_ENV == "development" ]; then
  nodemon ./server/app.js
else
  node ./server/app.js
fi