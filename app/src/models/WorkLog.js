var m = require("mithril");

var WorkLog = {
    issues: [],
    timeEntry: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/fullworklog",
        })
        .then(function(result) {
            WorkLog.issues = result.issues;
            WorkLog.timeEntry = result.timeEntry;
        })
    },
    saveWorkLog: function() { 
        WorkLog.issues.forEach(function(issue) {
            console.log('log work on' + issue.id);
        });
    }
}

module.exports = WorkLog