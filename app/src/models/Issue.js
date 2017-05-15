var m = require("mithril");

var Issue = {
    issues: [],
    loadList: function() {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/jira",
        })
        .then(function(result) {
            Issue.issues = result
        })
    },
}

module.exports = Issue