"use strict";
function Observable() {
    this._observers = new Map();
    this._onceObservers = new Map();
}

Observable.prototype.on = function (eventName, handler) {
    if (!this._observers.has(eventName)) {
        this._observers.set(eventName, new Array());
    }

    const handlers = this._observers.get(eventName).slice();
    if (handlers.some(val => val === handler)) {
        return false;
    }
    handlers.push(handler);
    this._observers.set(eventName, handlers);
    return true;
}

Observable.prototype.once = function (eventName, handler) {
    if (!this._onceObservers.has(eventName)) {
        this._onceObservers.set(eventName, new Array());
    }

    const handlers = this._onceObservers.get(eventName).slice();
    if (handlers.some(val => val === handler)) {
        return false;
    }

    handlers.push(handler);
    this._onceObservers.set(eventName, handlers);
    return true;
}

Observable.prototype.remove = function (eventName, handler) {
    if (!this._observers.has(eventName)) {
        return false;
    }

    const handlers = this._observers.get(eventName).slice();
    const findIdx = handlers.findIndex(val => val === handler);
    if (findIdx !== -1) {
        handlers.splice(findIdx, 1);
        if (handlers.length === 0) {
            this._observers.delete(eventName);
        } else {
            this._observers.set(eventName, handlers);
        }
        return true;
    }
    return false;
}

Observable.prototype.removeOnce = function (eventName, handler) {
    if (!this._onceObservers.has(eventName)) {
        return false;
    }

    const handlers = this._onceObservers.get(eventName).slice();
    const findIdx = handlers.findIndex(val => val === handler);
    if (findIdx !== -1) {
        handlers.splice(findIdx, 1);
        if (handlers.length === 0) {
            this._onceObservers.delete(eventName);
        } else {
            this._onceObservers.set(eventName, handlers);
        }
        return true;
    }
    return false;
}

Observable.prototype.hasEventName = function (eventName) {
    if (this._observers.has(eventName) && this._observers.get(eventName).length > 0) {
        return true;
    }

    if (this._onceObservers.has(eventName) && this._onceObservers.get(eventName).length > 0) {
        return true;
    }

    return false;
}

Observable.prototype.emit = function (eventName, body) {
    if (this._observers.has(eventName)) {
        const handlers = this._observers.get(eventName).slice();
        handlers.forEach(handler => {
            handler && handler(eventName, body);
        });
    }

    if (this._onceObservers.has(eventName)) {
        const handlers = this._onceObservers.get(eventName).slice();
        this._onceObservers.delete(eventName);
        handlers.forEach(handler => {
            handler && handler(eventName, body);
        });
    }
}

module.exports = Observable;