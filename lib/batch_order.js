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
 * @param {string} options.instrument_id - 交易对
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
        config.logEnabled && console.log("[batchorder.generate] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.generate] response:", JSON.stringify(result));
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
 * @param {string} options.instrument_id - 交易对
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
        config.logEnabled && console.log("[batchorder.cancel] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.cancel] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入;  2: 卖出
 * @param {number} options.price - 价格
 * @param {number} options.size - 数量
 * @param {string} options.instrument_id - 交易对
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
        config.logEnabled && console.log("[batchorder.limitOrder] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.limitOrder] response:", JSON.stringify(result));
    return result;
}


/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入; 2: 卖出
 * @param {number} options.notional - 买入时的金额
 * @param {number} options.size - 卖出时的数量
 * @param {string} options.instrument_id - 交易对
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
        config.logEnabled && console.log("[batchorder.marketOrder] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.marketOrder] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1: 买入; 2: 卖出
 * @param {number} options.depth - 深度
 * @param {number} options.size - 数量
 * @param {number} options.perSize - 单笔数量
 * @param {number} options.priceLimit - 价格限制
 * @param {string} options.instrument_id - 交易对
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function icebergOrder(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.icebergOrder", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/icebergOrder`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.icebergOrder] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.icebergOrder] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {*} options 
 * @param {string} options.instrument_id - 交易对
 * @param {string} options.name - username
 * @param {string} options.httpKey - httpKey
 * @param {string} options.httpSecret - httpSecret
 * @param {string} options.passphrase -  passphrase
 */
async function startDepInfo(options) {
    let result;

    try {
        const data = { options };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.startDepthInfo", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/startDepInfo`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.startDepInfo] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.startDepInfo] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {*} options 
 * @param {string} options.instrument_id - 交易对
 * @param {string} options.name - username
 * @param {string} options.httpKey - httpKey
 * @param {string} options.httpSecret - httpSecret
 * @param {string} options.passphrase -  passphrase
 */
async function stopDepInfo(options) {
    let result;

    try {
        const data = { options };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.stopDepthInfo", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/stopDepInfo`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.stopDepInfo] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.stopDepInfo] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {object} options 
 * @param {string} options.instrument_id - 交易对
 * @param {number} options.from - 开始
 * @param {number} options.to - 结束
 * @param {number} options.limit - 限制
 * @param {number} options.state - 订单状态
 * <note>
 * "-2":失败,
 * "-1":撤单成功,
 * "0":等待成交 ,
 * "1":部分成交, 
 * "2":完全成交,
 * "3":下单中,
 * "4":撤单中,
 * "6": 未完成（等待成交+部分成交）,
 * "7":已完成（撤单成功+完全成交）
 * </note>
 * @param {object} account 
 * @param {string} options.name - username
 * @param {string} options.httpKey - httpKey
 * @param {string} options.httpSecret - httpSecret
 * @param {string} options.passphrase -  passphrase
 */
async function getOrderData(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.getOrderData", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/getOrderData`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.getOrderData] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.getOrderData] response:", JSON.stringify(result));
    return result;
}

async function toBatchOrder(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.toBatchOrder", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/toBatchOrder`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.toBatchOrder] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.toBatchOrder] response:", JSON.stringify(result));
    return result;
}

async function addWarnings(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.addWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/addWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && config.log("[batchorder.addWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.addWarnings] response:", JSON.stringify(result));
    return result;
}

async function removeWarnings(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.removeWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/removeWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.removeWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.removeWarnings] response:", JSON.stringify(result));
    return result;
}

async function isWarnings(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.isWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/isWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.isWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.isWarnings] response:", JSON.stringify(result));
    return result;
}

async function startWarnings(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.startWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/startWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.startWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.startWarnings] response:", JSON.stringify(result));
    return result;
}

async function listWarnings(options, account) {
    let result;
    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.listWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/listWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.listWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.listWarnings] response:", JSON.stringify(result));
    return result;
}

async function stopWarnings(options, account) {
    let result;

    try {
        const data = { options, account };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("batchorder.stopWarnings", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/batch_order/stopWarnings`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[batchorder.stopWarnings] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[batchorder.stopWarnings] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    generate,
    // start,
    cancel,
    limitOrder,
    marketOrder,
    icebergOrder,
    startDepInfo,
    stopDepInfo,
    getOrderData,
    toBatchOrder,

    addWarnings,
    removeWarnings,
    isWarnings,
    startWarnings,
    stopWarnings,
    listWarnings
};