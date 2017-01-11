var express = require('express');
var TogglClient = require('toggl-api');
var config = require('./config');

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

app.listen(3000, function () {
  console.log('jiraToggle listening on port 3000!')
})

