"use strict";

// const axios = require("axios");

function isWebPlatform() {
    return window !== undefined;
}

function isElectronPlatform() {
    return isWebPlatform() && window.electronIpcRenderer !== undefined;
}

function _remote_resp_handler(resp) {
    if (resp.status !== 200) {
        throw new Error(`request failure, status: ${resp.status}, desc: ${resp.statusText}`);
    }
    const { data: { success, error = "" } } = resp;
    if (!success) {
        throw new Error(error);
    }
    const { data: { result = undefined } } = resp;
    if (result === undefined) {
        return undefined;
    }
    return JSON.parse(JSON.stringify(result))
}

async function getremote(url, data = {}, timeout = 4000) {
    const axios = require("axios");
    try {
        const resp = await axios.get(url, { params: data, timeout });
        return _remote_resp_handler(resp);
    } catch (error) {
        throw error;
    }
}

async function postremote(url, data = {}, timeout) {
    const axios = require("axios");
    try {
        const resp = await axios.post(url, data, { timeout });
        return _remote_resp_handler(resp);
    } catch (error) {
        throw error;
    }
}

async function putremote(url, data = {}, timeout) {
    const axios = require("axios");
    try {
        const resp = await axios.put(url, data, { timeout });
        return _remote_resp_handler(resp);
    } catch (error) {
        throw error;
    }
}

async function calllocal(channel, data = undefined) {
    return new Promise((resolve, reject) => {
        window.electronIpcRenderer.once(channel, (_, resp) => {
            if (!resp.success) {
                return reject(new Error(resp.error));
            }

            return resolve(resp.result);
        });
        window.electronIpcRenderer.send(channel, data);
    });
}

module.exports = {
    isWebPlatform,
    isElectronPlatform,
    getremote,
    putremote,
    postremote,
    calllocal
};