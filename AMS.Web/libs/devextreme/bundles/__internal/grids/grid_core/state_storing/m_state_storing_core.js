/**
 * DevExtreme (bundles/__internal/grids/grid_core/state_storing/m_state_storing_core.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _storage = require("../../../../core/utils/storage");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_modules = _interopRequireDefault(require("../m_modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var parseDates = function parseDates(state) {
    if (!state) {
        return
    }(0, _iterator.each)(state, (function(key, value) {
        if ((0, _type.isPlainObject)(value) || Array.isArray(value)) {
            parseDates(value)
        } else if ("string" === typeof value) {
            var date = DATE_REGEX.exec(value);
            if (date) {
                state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]))
            }
        }
    }))
};
var StateStoringController = _m_modules.default.ViewController.inherit(function() {
    var getStorage = function(options) {
        var storage = "sessionStorage" === options.type ? (0, _storage.sessionStorage)() : (0, _window.getWindow)().localStorage;
        if (!storage) {
            throw new Error("E1007")
        }
        return storage
    };
    var getUniqueStorageKey = function(options) {
        return (0, _type.isDefined)(options.storageKey) ? options.storageKey : "storage"
    };
    return {
        _loadState: function() {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                return options.customLoad && options.customLoad()
            }
            try {
                return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)))
            } catch (e) {
                _ui.default.log("W1022", "State storing", e.message)
            }
        },
        _saveState: function(state) {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                options.customSave && options.customSave(state);
                return
            }
            try {
                getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state))
            } catch (e) {
                _ui.default.log(e.message)
            }
        },
        publicMethods: function() {
            return ["state"]
        },
        isEnabled: function() {
            return this.option("stateStoring.enabled")
        },
        init: function() {
            var that = this;
            that._state = {};
            that._isLoaded = false;
            that._isLoading = false;
            that._windowUnloadHandler = function() {
                if (void 0 !== that._savingTimeoutID) {
                    that._saveState(that.state())
                }
            };
            _events_engine.default.on((0, _window.getWindow)(), "unload", that._windowUnloadHandler);
            return that
        },
        isLoaded: function() {
            return this._isLoaded
        },
        isLoading: function() {
            return this._isLoading
        },
        load: function() {
            var _this = this;
            this._isLoading = true;
            var loadResult = (0, _deferred.fromPromise)(this._loadState());
            loadResult.always((function() {
                _this._isLoaded = true;
                _this._isLoading = false
            })).done((function(state) {
                if (null !== state && !(0, _type.isEmptyObject)(state)) {
                    _this.state(state)
                }
            }));
            return loadResult
        },
        state: function(_state) {
            var that = this;
            if (!arguments.length) {
                return (0, _extend.extend)(true, {}, that._state)
            }
            that._state = (0, _extend.extend)({}, _state);
            parseDates(that._state)
        },
        save: function() {
            var that = this;
            clearTimeout(that._savingTimeoutID);
            that._savingTimeoutID = setTimeout((function() {
                that._saveState(that.state());
                that._savingTimeoutID = void 0
            }), that.option("stateStoring.savingTimeout"))
        },
        optionChanged: function(args) {
            switch (args.name) {
                case "stateStoring":
                    if (this.isEnabled() && !this.isLoading()) {
                        this.load()
                    }
                    args.handled = true;
                    break;
                default:
                    this.callBase(args)
            }
        },
        dispose: function() {
            clearTimeout(this._savingTimeoutID);
            _events_engine.default.off((0, _window.getWindow)(), "unload", this._windowUnloadHandler)
        }
    }
}());
var _default = {
    StateStoringController: StateStoringController
};
exports.default = _default;
