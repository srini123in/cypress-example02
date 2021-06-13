# Cypress Example Framework
Example using Cypress and Cucumber

Document is fully support for mac users

## Pre-requisities to run 
Install NodeJS, NPM and Chrome on your machine


## Run Cypress from local machine
- Open terminal window and change directory to cloned cypress-example folder
- npm install


## Run test using cypress dash board

- npm run cy:open


## Run test using cli - this will run with Cucumber tag configuration

Executing test using shell script
- sh ./run-tests.sh -t @smoke -e staging -b electron

Executing test using node
- $(npm bin)/cypress-tags run -e TAGS="@smoke" --env configFile="staging" --browser "electron" --headless

## Run test using docker 

- docker build -t cypress-example .
- docker run -i --entrypoint sh cypress-example ./run-tests.sh -t @smoke -e staging -b electron

## Example folders:

Test scenarios located in this folder
- cypress/integration/feature

Steps are written in below folder  
- cypress/step_definitions

Pages are written in below folder  
- cypress/pages







