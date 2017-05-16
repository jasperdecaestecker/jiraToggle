# JiraToggle
Project to log Toggle WorkLog to JIRA

## install
Just run `npm install` in root folder

##config application
create a config.js file that has APIKEY for Jira and Toggle.
will be somethimg like this. 
exports.TOGGLE_APIKEY = '123invalidtogglekey';
exports.JIRA_APIKEY = '123invalidjirakey';

## Running server application
`node app.js` You can now access the app on port 3000

## Running application
`npm start` will build the src code and inject into app.js => app can be run by opening index.html

##Develop
- [Toggle node api wrapper] (https://github.com/7eggs/node-toggl-api)
- [Jira node api wrapper] (https://github.com/steves/node-jira)

