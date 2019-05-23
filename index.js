const { isElectronPlatform } = require("./lib/platform");

module.exports = {
    isElectronPlatform,
    config: require("./lib/config"),
    user: require("./lib/user.js")
};