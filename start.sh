#!/bin/bash
if [ -f before-start.sh ]; then
    ./before-start.sh
fi

# Local .env
if [ -f .env ]; then
    # Load Environment Variables
    export $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' )
fi

AUTHFILE="./public/js/client-auth-info.js"

# reset the the auth file to be empty
echo "/* This file is auto-generated when the application is started */" >$AUTHFILE

if [ $USE_PROXY == "false" ]; then
  for a in $(cat .env | grep -v '#' | sed 's/\r$//' | awk '/=/ {print $1}' | sed 's/=/="/' | sed 's/$/";/')
  do
    echo "AKORDA.$a" >>$AUTHFILE
  done
fi

