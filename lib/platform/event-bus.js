"use strict";

const Observable = require("./observable");
const { isElectronPlatform } = require("./index");
const config = require("../config");

class EventBus {
    constructor() {
        this._observable = new Observable();
        this._eventSet = new Set();
    }

    on(eventName, handler) {
        const result = this._observable.on(eventName, handler);
        if (!this._eventSet.has(eventName)) {
            this._on(eventName);
        }
        return result;
    }

    once(eventName, handler) {
        const result = this._observable.once(eventName, handler);
        if (!this._eventSet.has(eventName)) {
            this._on(eventName);
        }
        return result;
    }

    remove(eventName, handler) {
        const result = this._observable.remove(eventName, handler);
        if (!this._observable.hasEventName(eventName)) {
            this._remove(eventName);
        }
        return result;
    }

    removeOnce(eventName, handler) {
        const result = this._observable.removeOnce(eventName, handler);
        if (!this._observable.hasEventName(eventName)) {
            this._remove(eventName);
        }
        return result;
    }

    emit(event, body) {
        this._observable.emit(event, body);
        if (!this._observable.hasEventName(event)) {
            this._remove(event);
        }
    }
}

class ElectronEventBus extends EventBus {
    constructor() {
        super()

        this.electronEventHandler = this._electronEventHandler.bind(this);
    }

    _on(eventName) {
        window.electronIpcRenderer.on(eventName, this.electronEventHandler);
    }

    _remove(eventName) {
        window.electronIpcRenderer.removeListener(eventName, this.electronEventHandler);
    }

    _electronEventHandler(eventName, body) {
        this.emit(eventName, body);
    }
}

class WebEventBus extends EventBus {
    constructor() {
        super();

        this._io = null;
    }

    _checkSocketIOClient() {
        if (this._io == null) {
            const SocketIOClient = require("socket.io-client");
            this._io = SocketIOClient(config.hostname);

            // /> log
            this._io.on("connect", () => console.log("connect"));
            this._io.on("error", error => console.log("error:", error));
        }
    }

    _on(eventName) {
        this._checkSocketIOClient();

        this._io.on(eventName, this.webEventHandler(eventName));
    }

    _remove(eventName) {
        this._checkSocketIOClient();

        this._io.off(eventName);
    }

    webEventHandler(eventName) {
        const self = this;
        return function handler(body) {
            self.emit(eventName, body);
        };
    }
}

let singletonEventBus = null;
function getEventBusSingleton() {
    if (singletonEventBus != null) {
        return singletonEventBus;
    }

    if (isElectronPlatform()) {
        singletonEventBus = new ElectronEventBus();
    } else {
        singletonEventBus = new WebEventBus();
    }

    return singletonEventBus;
}

function on(eventName, handler) {
    getEventBusSingleton()
        .on(eventName, handler);
}

function once(eventName, handler) {
    getEventBusSingleton()
        .once(eventName, handler);
}

function remove(eventName, handler) {
    getEventBusSingleton()
        .remove(eventName, handler);
}

function removeOnce(eventName, handler) {
    getEventBusSingleton()
        .removeOnce(eventName, handler);
}

module.exports = {
    on,
    once,
    remove,
    removeOnce
};