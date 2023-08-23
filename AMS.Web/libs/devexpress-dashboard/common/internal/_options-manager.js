﻿/**
* DevExpress Dashboard (_options-manager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventManager = exports.mergeOptions = exports.OptionsManager = exports.isEventName = exports.getOptionNameByEvent = exports.getEventName = void 0;
const data_1 = require("devextreme/core/utils/data");
const getEventName = (actionName) => {
    return actionName.charAt(2).toLowerCase() + actionName.substr(3);
};
exports.getEventName = getEventName;
const getOptionNameByEvent = (eventName) => {
    return 'on' + eventName.charAt(0).toUpperCase() + eventName.substr(1);
};
exports.getOptionNameByEvent = getOptionNameByEvent;
const isEventName = (actionName) => {
    return actionName && actionName.length && actionName.indexOf('on') === 0 && actionName.charAt(2).toUpperCase() === actionName.charAt(2);
};
exports.isEventName = isEventName;
class OptionsManager {
    constructor() {
        this._internalEvents = new EventManager();
        this._cachedSetters = {};
    }
    initialize(_config) {
        this._config = _config;
        this._dashboardControl = _config.dashboardControl;
        if (_config.eventsHolder) {
            _config.eventsHolder.on = this._internalEvents.on;
            _config.eventsHolder.off = this._internalEvents.off;
        }
    }
    getDefaultOptions() {
        return this._config.defaultOptions;
    }
    getInitialOptions() {
        let res = {};
        this._merge(res, this._config.defaultOptions);
        this._merge(res, this._config.initOptions);
        return res;
    }
    dispose() {
        this._internalEvents.dispose();
    }
    optionChanged(args) {
        return this._config.optionChanged(args);
    }
    raiseEvent(eventName, eventArgs) {
        var optionName = `extensions.${this._config.extensionName}.${exports.getOptionNameByEvent(eventName)}`;
        var delegateFromOptions = this._dashboardControl.option(optionName);
        if (typeof delegateFromOptions === 'function') {
            delegateFromOptions.call(this._dashboardControl, eventArgs);
        }
        this._internalEvents.raise(eventName, eventArgs);
    }
    get(optionName) {
        return this._dashboardControl.option(`extensions.${this._config.extensionName}.${optionName}`);
    }
    set(optionName, value) {
        return this._set(optionName, value, false);
    }
    silent(optionName, value) {
        return this._set(optionName, value, true);
    }
    _set(optionName, value, silent) {
        let name = `extensions.${this._config.extensionName}.${optionName}`;
        return silent ? this._dashboardControl._silent(name, value) : this._dashboardControl.option(name, value);
    }
    _merge(target, source) {
        exports.mergeOptions(target, source, this._cachedSetters);
    }
}
exports.OptionsManager = OptionsManager;
let mergeOptions = (target, source, externalCache = {}) => {
    for (var name in source) {
        let setter = externalCache[name];
        if (setter === undefined)
            setter = externalCache[name] = data_1.compileSetter(name);
        setter(target, source[name], {
            functionsAsIs: true,
            merge: true,
            unwrapObservables: false
        });
    }
};
exports.mergeOptions = mergeOptions;
class EventManager {
    constructor() {
        this._handlers = [];
        this.on = (eventName, eventHandler) => {
            if (!this._handlers.filter(handler => handler.eventName === eventName && handler.event === eventHandler)[0]) {
                this._handlers.push({
                    eventName: eventName,
                    event: eventHandler
                });
            }
        };
        this.off = (eventName, eventHandler) => {
            const eventInfo = this._handlers.filter(handler => handler.eventName === eventName && handler.event === eventHandler)[0];
            const index = this._handlers.indexOf(eventInfo);
            if (index !== -1) {
                this._handlers.splice(index, 1);
            }
        };
    }
    dispose() {
        this._handlers = [];
    }
    raise(eventName, eventArgs) {
        this._handlers
            .filter(handler => handler.eventName === eventName)
            .forEach(handler => handler.event(eventArgs));
    }
}
exports.EventManager = EventManager;
