const platform = require("./platform");
const config = require("./config");

async function getSpotTrade(options) {
    let result;

    try {
        const data = { options }
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotTrade", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/getTradeData`, data);
        }
    } catch (error) {
        console.log("[okex_utils.getSpotTrade] exception:", error);
        throw error;
    }

    console.log("[okex_utils.getSpotTrade] response:", JSON.stringify(result));
    return result;
}

async function getSpotCandles(options) {
    let result;

    try {
        const data = { options }
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotCandles", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/getCandlesData`, data);
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
    getSpotCandles
}