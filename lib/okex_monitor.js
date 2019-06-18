const platform = require("./platform");
const config = require("./config");

async function monitSpotTrade(instrument_id) {
    let result;

    try {
        const data = { instrument_id };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotTrade", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotTrade`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.monitSpotTrade] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.monitSpotTrade] response:", JSON.stringify(result));
    return result;
}

async function unmonitSpotTrade(instrument_id) {
    let result;

    try {
        const data = { instrument_id };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotTrade.unmonit", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotTrade/unmonit`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.unmonitSpotTrade] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.unmonitSpotTrade] response:", JSON.stringify(result));
    return result;
}

async function monitSpotTicker(instrument_id) {
    let result;

    try {
        const data = { instrument_id };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotTicker", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotTicker`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.monitSpotTicker] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.monitSpotTicker] response:", JSON.stringify(result));
    return result;
}

async function unmonitSpotTicker(instrument_id) {
    let result;

    try {
        const data = { instrument_id };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotTicker.unmonit", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotTicker/unmonit`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.unmonitSpotTicker] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.unmonitSpotTicker] response:", JSON.stringify(result));
    return result;
}

async function monitSpotChannel(channel, filter) {
    let result;

    try {
        const data = { channel_name: channel, filter };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotChannel", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotChannel`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.monitSpotChannel] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.monitSpotChannel] response:", JSON.stringify(result));
    return result;
}

async function unmonitSpotChannel(channel, filter) {
    let result;

    try {
        const data = { channel_name: channel, filter };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotChannel.unmonit", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotChannel/unmonit`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.unmonitSpotChannel] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.unmonitSpotChannel] response:", JSON.stringify(result));
    return result;
}

async function monitSpotDepth(account, instrument_id) {
    let result;

    try {
        const data = { account, instrument_id };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("okex_monitor.spotDepth", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/okex_monitor/spotDepth`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.monitSpotDepth] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[okex_monitor.monitSpotDepth] response:", JSON.stringify(result));
    return result;
}

async function unmonitSpotDepth(account, instrument_id) {
    let result;

    try {
        const data = { account, instrument_id };
        if (platform.isElectronPlatform()) {
            result = platform.calllocal("okex_monitor.spotDepth.unmonit", data);
        } else {
            result = platform.postremote(`${config.hostname}/api/okex_monitor/spotDepth/unmonit`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[okex_monitor.unmonitSpotDepth] exception:", error);
        throw error;
    }

    config.logEnabled && config.log("[okex_monitor.unmonitSpotDepth] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    monitSpotTrade,
    unmonitSpotTrade,
    monitSpotTicker,
    unmonitSpotTicker,
    monitSpotChannel,
    unmonitSpotChannel,
    monitSpotDepth,
    unmonitSpotDepth
};