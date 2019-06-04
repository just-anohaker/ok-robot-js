const platform = require("./platform");
const config = require("./config");

/**
 * 
 * @param {object} options 
 * @param {number} options.type - 1:买入; 2:卖出
 * @param {number} options.topPrice - 交易最高价
 * @param {number} options.startPrice - 交易最低价
 * @param {number} options.incr -  价格增量百分比
 * @param {number} options.topSize - 单笔交易数量
 * @param {number} options.count - 挂单数量
 * @param {object} account 
 * @param {string} account.name - username
 * @param {string} account.httpKey - httpKey
 * @param {string} account.httpSecret - httpSecret
 * @param {string} account.passphrase -  passphrase
 */
async function generate(options, account) {
    let result;

    const data = { options, account };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("batchorder.generate", data);
    } else {
        result = await platform.postremote(`${config.hostname}/api/batch_order/gen`, data);
    }

    console.log("[batchorder.generate] response:", JSON.stringify(result));
    return result;
}

/**
 * 
 * @param {array<string>} oids - order ids
 */
async function start(oids) {
    let result;

    const data = { client_oids: oids };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("batchorder.start", data);
    } else {
        result = await platform.postremote(`${config.hostname}/api/batch_order`, data);
    }

    console.log("[batchorder.start] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    generate,
    start
};