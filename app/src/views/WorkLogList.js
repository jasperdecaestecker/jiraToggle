var m = require("mithril")
var moment = require("moment")
var WorkLog = require("../models/WorkLog")

module.exports = {
    oninit: WorkLog.loadList,
    view: function() {
    	return m("main", [
            m("ul", WorkLog.issues.map(function(issue) {
            	return m("li", issue.key + " " + issue.fields.summary + " time spent: " + secondsToMinutesHours(WorkLog.timeEntry[issue.key]))
        	})),
            m("button", { onclick: logWork } , "Log work"),
        ])
    } 
}

var logWork = function() {
   WorkLog.saveWorkLog();
}

var secondsToMinutesHours = function(secondsTotal) {
	return moment().startOf('day')
        .seconds(secondsTotal)
        .format('H:mm:ss');
}