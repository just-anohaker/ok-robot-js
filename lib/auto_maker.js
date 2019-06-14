const platform = require("./platform");
const config = require("./config");

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 0:同时买卖, 1:只买单, 2:只卖单
 * @param {number} options.topPrice - 交易最高价
 * @param {number} options.bottomPrice - 交易最低价
 * @param {number} options.intervalTime - 间隔时间，单位为秒
 * @param {number} options.startVolume - 每次交易量下限
 * @param {number} options.endVolume - 每次交易量上限
 * @param {number} options.tradeType - 0:撤单; 1:接单
 * @param {number} options.tradeLimit - 单位为秒
 * @param {object} account 
 * @param {string} account.name - 账号名字
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - keySecret
 * @param {string} account.passphrase - passphrase
 */
async function init(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automaker.init", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_maker`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[automaker.init] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[automaker.init] response:", JSON.stringify(result));
    return result;
}

async function start() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automaker.start");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_maker/start`);
        }
    } catch (error) {
        config.logEnabled && console.log("[automaker.start] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[automaker.start] response:", JSON.stringify(result));
    return result;
}

async function stop() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automaker.stop");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_maker/stop`);
        }
    } catch (error) {
        config.logEnabled && console.log("[automaker.stop] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[automaker.stop] response:", JSON.stringify(result));
    return result;
}

async function isRunning() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automaker.isRunning");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_maker/isRunning`);
        }
    } catch (error) {
        config.logEnabled && console.log("[automaker.isRunning] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[automaker.isRunning] response: ", JSON.stringify(result));
    return result;
}

async function getOptionsAndAccount() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automaker.getOptionsAndAccount");
        } else {
            result = await platform.getremote(`${config.hostname}/api/auto_maker`);
        }
    } catch (error) {
        config.logEnabled && console.log("[automaker.getOptionsAndAccount] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[automaker.getOptionsAndAccount] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    init,
    start,
    stop,
    isRunning,
    getOptionsAndAccount
};