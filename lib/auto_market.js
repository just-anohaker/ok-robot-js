const platform = require("./platform");
const config = require("./config");

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 交易方案
 * @param {number} options.startSize - 触发数量
 * @param {number} options.isCancel - 是否撤销
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
            result = await platform.calllocal("automarket.init", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_market`, data);
        }
    } catch (error) {
        console.log("[automarket.init] exception:", error);
        throw error;
    }

    console.log("[automarket.init] response:", JSON.stringify(result));
    return result;
}

async function start() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automarket.start");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_market/start`);
        }
    } catch (error) {
        console.log("[automarket.start] exception:", error);
        throw error;
    }

    console.log("[automarket.start] response:", JSON.stringify(result));
    return result;
}

async function stop() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automarket.stop");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_market/stop`);
        }
    } catch (error) {
        console.log("[automarket.stop] exception:", error);
        throw error;
    }

    console.log("[automarket.stop] response:", JSON.stringify(result));
    return result;
}

async function isRunning() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automarket.isRunning");
        } else {
            result = await platform.postremote(`${config.hostname}/api/auto_market/isRunning`);
        }
    } catch (error) {
        console.log("[automarket.isRunning] exception:", error);
        throw error;
    }

    console.log("[automarket.isRunning] response: ", JSON.stringify(result));
    return result;
}

async function getOptionsAndAccount() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("automarket.getOptionsAndAccount");
        } else {
            result = await platform.getremote(`${config.hostname}/api/auto_market`);
        }
    } catch (error) {
        console.log("[automarket.getOptionsAndAccount] exception:", error);
        throw error;
    }

    console.log("[automarket.getOptionsAndAccount] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    init,
    start,
    stop,
    isRunning,
    getOptionsAndAccount
};