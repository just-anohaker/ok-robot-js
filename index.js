const { isElectronPlatform } = require("./lib/platform");

module.exports = {
    isElectronPlatform,
    config: require("./lib/config"),
    eventbus: require("./lib/platform/event-bus"),
    user: require("./lib/user.js"),
    auto_maker: require("./lib/auto_maker"),
    auto_market: require("./lib/auto_market"),
    batch_order: require("./lib/batch_order"),
    take_order: require("./lib/take_order"),
    okex_utils: require("./lib/okex_utils")
};
