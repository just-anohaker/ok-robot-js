const platform = require("./platform");
const config = require("./config");

async function getAll() {
    let result;

    try {
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("user.getall");
        } else {
            result = await platform.getremote(`${config.hostname}/api/user/all`);
        }
    } catch (error) {
        config.logEnabled && console.log("[user.getAll] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[user.getAll] response:", JSON.stringify(result));
    return result;
}

async function get(userId) {
    let result;

    try {
        const params = { userId };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("user.get", params);
        } else {
            result = await platform.getremote(`${config.hostname}/api/user`, params);
        }
    } catch (error) {
        config.logEnabled && console.log("[user.get] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[user.get] response:", JSON.stringify(result));
    return result;
}

async function add(groupName, name, httpKey, httpSecret, passphrase) {
    let result;

    try {
        const data = { groupName, name, httpkey: httpKey, httpsecret: httpSecret, passphrase };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("user.add", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/user`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[user.add] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[user.add] response:", JSON.stringify(result));
    return result;
}

async function remove(userId) {
    let result;

    try {
        const data = { userId };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("user.remove", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/user/remove`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[user.remove] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[user.remove] response:", JSON.stringify(result));
    return result;
}

async function update(userId, { groupName, name, httpkey, httpsecret, passphrase } = {}) {
    let result;

    try {
        const data = { userId, options: { groupName, name, httpkey, httpsecret, passphrase } };
        if (platform.isElectronPlatform()) {
            result = await platform.calllocal("user.update", data);
        } else {
            result = await platform.postremote(`${config.hostname}/api/user/update`, data);
        }
    } catch (error) {
        config.logEnabled && console.log("[user.update] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[user.update] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
};