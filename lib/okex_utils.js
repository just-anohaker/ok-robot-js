const platform = require("./platform");
const config = require("./config");

/**
 * 
 * @param {object} options 
 * @param {string} options.instrument_id - 交易对
 * @param {object} options.params - 附加参数[可选]
 */
async function getSpotTrade(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotTrade", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotTrade`, options);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_utils.getSpotTrade] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_utils.getSpotTrade] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {string} options.instrument_id - 交易对
 */
async function getSpotTicker(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotTicker", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotTicker`, options);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_utils.getSpotTicker] exception:", JSON.stringify(result));
        throw error;
    }

    config.logEnabled && console.log("[okex_utils.getSpotTicker] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {string} options.instrument_id - 交易对
 * @param {object} options.params - 附加参数[可选]
 */
async function getSpotCandles(options) {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getSpotCandles", options);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getSpotCandles`, options);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_utils.getSpotCandles] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_utils.getSpotCandles] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} account 
 * @param {string} account.httpkey
 * @param {string} account.httpsecret
 * @param {string} account.passphrase
 * @param {array<string>} currencyFilter - 钱包名称列表,例如:["ETM", "USDT", "USDK"]表示需要获取账号上ETM,USDT和USDK的信息 
 */
async function getWallet(account, currencyFilter) {
    let result;

    try {
        const data = { account, currencies: currencyFilter || [] };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getWallet", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getWallet`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_utils.getWallet] exception:", error);
        throw error;
    }
    config.logEnabled && console.log("[okex_utils.getWallet] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} account
 * @param {string} account.httpkey
 * @param {string} account.httpsecret
 * @param {string} account.passphrase
 */
async function getWalletList(account) {
    let result;

    try {
        const data = { account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_utils.getWalletList", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_utils/getWalletList`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_utils.getWalletList] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_utils.getWalletList] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    getSpotTrade,
    getSpotTicker,
    getSpotCandles,
    getWallet,
    getWalletList
}