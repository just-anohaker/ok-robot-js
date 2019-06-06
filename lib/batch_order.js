const platform = require("./platform");
const config = require("./config");

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1:买入; 2:卖出
 * @param {number} options.topPrice - 交易最高价
 * @param {number} options.startPrice - 交易最低价
 * @param {number} options.incr -  价格增量百分比
 * @param {number} options.size - 挂单数量
 * @param {number} options.sizeIncr - 数量递增百分比
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function generate(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.generate", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/gen`, data);
        }
    } catch (error) {
        console.log("[batchorder.generate] exception:", error);
        throw error;
    }

    console.log("[batchorder.generate] response:", JSON.stringify(result));
    return result;
}

// /**
//  * 
//  * @param {array<string>} oids - order ids
//  */
// async function start(oids) {
//     let result;

//     const data = { client_oids: oids };
//     if (platform.isElectronPlatform()) {
//         result = await platform.calllocal("batchorder.start", data);
//     } else {
//         result = await platform.postremote(`${config.hostname}/api/batch_order`, data);
//     }

//     console.log("[batchorder.start] response:", JSON.stringify(result));
//     return result;
// }

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入; 2: 卖出
 * @param {number} options.topPrice - 交易最高价
 * @param {number} options.startPrice - 交易最低价
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function cancel(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.cancel", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/cancel`, data);
        }
    } catch (error) {
        console.log("[batchorder.cancel] exception:", error);
        throw error;
    }

    console.log("[batchorder.cancel] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入;  2: 卖出
 * @param {number} options.price - 价格
 * @param {number} options.size - 数量
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function limitOrder(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.limitOrder", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/limitOrder`, data);
        }
    } catch (error) {
        console.log("[batchorder.limitOrder] exception:", error);
        throw error;
    }

    console.log("[batchorder.limitOrder] response:", JSON.stringify(result));
    return result;
}


/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入; 2: 卖出
 * @param {number} options.notional - 买入时的金额
 * @param {number} options.size - 卖出时的数量
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function marketOrder(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.marketOrder", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/marketOrder`, data);
        }
    } catch (error) {
        console.log("[batchorder.marketOrder] exception:", error);
        throw error;
    }

    console.log("[batchorder.marketOrder] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {*} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function startDepInfo(account) {
    let result;

    try {
        const data = { account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.startDepInfo", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/startDepInfo`, data);
        }
    } catch (error) {
        console.log("[batchorder.startDepInfo] exception:", error);
        throw error;
    }

    console.log("[batchorder.startDepInfo] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    generate,
    // start,
    cancel,
    limitOrder,
    marketOrder,
    startDepInfo
};