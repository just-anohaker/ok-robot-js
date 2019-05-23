const platform = require("./platform");
const { hostname } = require("./config");

async function getAll() {
    let result;

    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("user.getall");
    } else {
        result = await platform.getremote(`${hostname}/api/user/all`);
    }

    console.log("[getAll] response:", JSON.stringify(result));
    return result;
}

async function get(userId) {
    let result;

    const params = { userId };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("user.get", params);
    } else {
        result = await platform.getremote(`${hostname}/api/user`, params);
    }

    console.log("[user.get] response:", JSON.stringify(result));
    return result;
}

async function add(groupName, name, apiKey, apiSecret) {
    let result;

    const data = { groupName, name, apiKey, apiSecret };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("user.add", data);
    } else {
        result = await platform.postremote(`${hostname}/api/user`, data);
    }

    console.log("[user.add] response:", JSON.stringify(result));
    return result;
}

async function remove(userId) {
    let result;

    const data = { userId };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("user.remove", data);
    } else {
        result = await platform.postremote(`${hostname}/api/user/remove`, data);
    }

    console.log("[user.remove] response:", JSON.stringify(result));
    return result;
}

async function update(userId, { groupName, name, apiKey, apiSecret } = {}) {
    let result;

    const data = { userId, options: { groupName, name, apiKey, apiSecret } };
    if (platform.isElectronPlatform()) {
        result = await platform.calllocal("user.update", data);
    } else {
        result = await platform.postremote(`${hostname}/api/user/update`, data);
    }

    console.log("[user.update] response:", JSON.stringify(result));
    return result;
}

module.exports = {
    getAll,
    get,
    add,
    update,
    remove
};