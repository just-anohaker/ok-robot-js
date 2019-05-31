const { isElectronPlatform } = require("./lib/platform");

module.exports = {
    isElectronPlatform,
    config: require("./lib/config"),
    eventbus: require("./lib/platform/event-bus"),
    user: require("./lib/user.js")
};