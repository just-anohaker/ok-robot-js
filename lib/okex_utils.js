const platform = require("./platform");
const config = require("./config");

async function getSpotTrade(options) {
    let result;

    try {
        const data = { options }
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("", data);
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
            result = await platform.calllocal("", data);
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

// /**
//  * 
//  * @param {object} options 
//  * @param {number} options.type - 1:买入; 2:卖出
//  * @param {number} options.toPrice - 目标价格
//  * @param {object} account 
//  * @param {string} account.name - username
//  * @param {string} account.httpKey - httpKey
//  * @param {string} account.httpSecret - httpSecret
//  * @param {string} account.passphrase -  passphrase
//  */
// async function generate(options, account) {
//     let result;

//     try {
//         const data = { options, account };
//         if (platform.isElectronPlatform()) {
//             result = await platform.calllocal("takeorder.generate", data);
//         } else {
//             result = await platform.postremote(`${config.hostname}/api/take_order/gen`, data);
//         }
//     } catch (error) {
//         console.log("[takeorder.generate] exception:", error);
//         throw error;
//     }

//     console.log("[takeorder.generate] response:", JSON.stringify(result));
//     return result;
// }

// async function start(oids) {
//     let result;

//     try {
//         const data = { client_oids: oids };
//         if (platform.isElectronPlatform()) {
//             result = await platform.calllocal("takeorder.start", data);
//         } else {
//             result = await platform.postremote(`${config.hostname}/api/take_order`, data);
//         }
//     } catch (error) {
//         console.log("[takeorder.start] exception:", error);
//         throw error;
//     }

//     console.log("[takeorder.start] response:", JSON.stringify(result));
//     return result;
// }

// module.exports = {
//     generate,
//     start
// };