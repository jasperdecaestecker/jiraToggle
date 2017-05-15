var m = require("mithril")
var Issue = require("../models/Issue")

module.exports = {
    oninit: Issue.loadList,
    view: function() {
        return m(".issue-list-item", Issue.issues.key)
    } 
}