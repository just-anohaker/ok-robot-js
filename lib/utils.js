const config = require("./config");

async function native_call(channel, data = undefined) {
    return new Promise((resolve, reject) => {
        window.ipcNative.once(channel, (_, resp) => {
            if (!resp.success) {
                return reject(new Error(resp.error));
            }

            return resolve(resp.result);
        });

        window.ipcNative.send(channel, data);
    })
}

async function openFileDialog() {
    let result;

    try {
        result = await native_call("utils.openFileDialog");
    } catch (error) {
        config.logEnabled && console.log("[utils.openFileDialog] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[utils.openFileDialog] response:", JSON.stringify(result));
    return result;
}

async function retrieveFileData(filepath) {
    let result;

    try {
        result = await native_call("utils.retrieveFileData", { filepath });
    } catch (error) {
        config.logEnabled && console.log("[utils.retrieveFileData] exception:", error);
        throw error;
    }

    config.logEnabled && console.log("[utils.retrieveFileData] response:", JSON.stringify(result));
    return result;
}

async function isElectronPlatform() {
    return window !== undefined && window.ipcNative !== undefined;
}

module.exports = {
    openFileDialog,
    retrieveFileData,
    isElectronPlatform
}