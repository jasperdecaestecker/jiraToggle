var m = require("mithril")
var Account = require("../models/Account")

module.exports = {
    oninit: Account.loadAccount,
    view: function() {
        return m("div", Account.name)
    } 
}