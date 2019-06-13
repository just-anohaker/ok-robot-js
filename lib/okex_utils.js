const platform = require("./platform");
const config = require("./config");

async function getSpotTrade(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotTrade", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotTrade`, options);
        }
    } catch (error) {
        console.log("[okex_utils.getSpotTrade] exception:", error);
        throw error;
    }

    console.log("[okex_utils.getSpotTrade] response:", JSON.stringify(result));
    return result;
}

async function getSpotTicker(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotTicker", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotTicker`, options);
        }
    } catch (error) {
        console.log("[okex_utils.getSpotTicker] exception:", JSON.stringify(result));
        throw error;
    }

    console.log("[okex_utils.getSpotTicker] response:", JSON.stringify(result));
    return result;
}

async function getSpotCandles(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotCandles", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotCandles`, options);
        }
    } catch (error) {
        console.log("[okex_utils.getSpotCandles] exception:", error);
        throw error;
    }

    console.log("[okex_utils.getSpotCandles] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    getSpotTrade,
    getSpotTicker,
    getSpotCandles
}