var m = require("mithril");

var Account = {
    name: '',
    loadAccount: function() {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/account",
        })
        .then(function(result) {
            Account.name = result.fullname
        })
    },
}

module.exports = Account