var express = require('express');
var TogglClient = require('toggl-api');
var config = require('./config');
var JiraApi = require('jira').JiraApi;

var jira = new JiraApi('https', config.JIRA_HOST, 443, config.JIRA_USERNAME, config.JIRA_PASSWORD, '2');

var app = express();
var toggl = new TogglClient({apiToken: config.TOGGLE_APIKEY});

var workspaceId = config.MY_WORKSPACE_ID;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('These are not the droids you are looking for.');
})

app.get('/account', function(req, res) {
	toggl.getUserData({with_related_data:true}, function(err,result) {
		res.send(result);
	});
});

app.get('/fullworklog', function(req, res) {
	var start = new Date();
	start.setHours(0,0,0,0);

	var end = new Date();
	end.setHours(23,59,59,999);

	var workList = {};
	toggl.getTimeEntries(start.toISOString(), end.toISOString(), function(error, success) {
		success.forEach(function(timeEntry, index) {
			var description = timeEntry.description;
			var hosNumberKey = description.substr(0,description.indexOf(' '));
			if(!workList[hosNumberKey]) {
				workList[hosNumberKey] = 0;
			}
			workList[hosNumberKey] += timeEntry.duration;
		});

		var searchQuery = '';
		Object.keys(workList).forEach(function(workListId, index) {
			searchQuery += 'key = "' + workListId + '"';
			if(index < Object.keys(workList).length - 1) {
				searchQuery += ' OR ';
			}
		});

		jira.searchJira(searchQuery, null, function(error, success) {
			success.timeEntry = workList 
			res.send(success);
		});

	});	
});

app.listen(3000, function () {
  console.log('jiraToggle listening on port 3000!')
})

