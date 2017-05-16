var m = require("mithril")

var WorkLogList = require("./views/WorkLogList");
var accountInfo = require("./views/accountInfo")

m.route(document.body, "/work", {
    "/work": WorkLogList,
    "/account": accountInfo
})