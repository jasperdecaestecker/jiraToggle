var express = require('express');
var TogglClient = require('toggl-api');
var config = require('./config');
var JiraApi = require('jira').JiraApi;

var jira = new JiraApi('https', config.JIRA_HOST, 443, config.JIRA_USERNAME, config.JIRA_PASSWORD, '2');

var app = express();
var toggl = new TogglClient({apiToken: config.TOGGLE_APIKEY});

var workspaceId = config.MY_WORKSPACE_ID;

app.get('/', function (req, res) {
  res.send('These are not the droids you are looking for.');
})

app.get('/create', function(req, res) {
	var now = new Date();
	now = now.toISOString()
	var dummyData = {wid:workspaceId, start:now, description:"ABC",duration:1200,created_with:"jiraToggle"};
	toggl.createTimeEntry(dummyData, function(err, success) {
		res.send(success);
	})
});

app.get('/info', function(req, res) {
	toggl.getUserData({with_related_data:true}, function(err,result) {
		res.send(result);
	});
});

app.get('/jira', function(req, res) {
	jira.findIssue('104022', function(error, issue) {
		console.log('error: ' + error);
	    console.log('issue: ' + issue);
	    res.send(issue);
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
			// console.log(timeEntry);
			if(!workList[hosNumberKey]) {
				workList[hosNumberKey] = 0;
			}
			workList[hosNumberKey] += timeEntry.duration;
			console.log(hosNumberKey);
			console.log(workList);
		})
	});	


	jira.searchJira('key = "HOS-7262"', null, function(error, success) {
		//onsole.log(success);
		res.send(success);


	});

});

app.listen(3000, function () {
  console.log('jiraToggle listening on port 3000!')
})

