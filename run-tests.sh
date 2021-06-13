#!/usr/bin/env bash

# Default values
DEFAULT_TAGS="@smoke"
DEFAULT_ENV="staging"
DEFAULT_BROWSER="electron"

CYPRESS_TAGS="${DEFAULT_TAGS}"
CYPRESS_ENV="${DEFAULT_ENV}"
CYPRESS_BROWSER="${DEFAULT_BROWSER}"

# Allow for some override parameters
while [ $# -gt 0 ]; do
    case "$1" in
        -h|--help)
            usage
            exit
        ;;
        -e|--environment)
            CYPRESS_ENV="$2"
            shift 2
        ;;
        -b|--browser)
            CYPRESS_BROWSER="$2"
            shift 2
        ;;
        -t|--tags)
            CYPRESS_TAGS="$2"
            shift 2
        ;;
    esac
done

echo "Running tests..."
"$(npm bin)/cypress-tags" run -e TAGS="${CYPRESS_TAGS}" --env configFile="${CYPRESS_ENV}" --browser "${CYPRESS_BROWSER}" --headless