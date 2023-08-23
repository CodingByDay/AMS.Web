/**
 * DevExtreme (esm/__internal/grids/grid_core/state_storing/m_state_storing_core.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    fromPromise
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    each
} from "../../../../core/utils/iterator";
import {
    sessionStorage
} from "../../../../core/utils/storage";
import {
    isDefined,
    isEmptyObject,
    isPlainObject
} from "../../../../core/utils/type";
import {
    getWindow
} from "../../../../core/utils/window";
import eventsEngine from "../../../../events/core/events_engine";
import errors from "../../../../ui/widget/ui.errors";
import modules from "../m_modules";
var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var parseDates = function parseDates(state) {
    if (!state) {
        return
    }
    each(state, (key, value) => {
        if (isPlainObject(value) || Array.isArray(value)) {
            parseDates(value)
        } else if ("string" === typeof value) {
            var date = DATE_REGEX.exec(value);
            if (date) {
                state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]))
            }
        }
    })
};
var StateStoringController = modules.ViewController.inherit(function() {
    var getStorage = function(options) {
        var storage = "sessionStorage" === options.type ? sessionStorage() : getWindow().localStorage;
        if (!storage) {
            throw new Error("E1007")
        }
        return storage
    };
    var getUniqueStorageKey = function(options) {
        return isDefined(options.storageKey) ? options.storageKey : "storage"
    };
    return {
        _loadState() {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                return options.customLoad && options.customLoad()
            }
            try {
                return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)))
            } catch (e) {
                errors.log("W1022", "State storing", e.message)
            }
        },
        _saveState(state) {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                options.customSave && options.customSave(state);
                return
            }
            try {
                getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state))
            } catch (e) {
                errors.log(e.message)
            }
        },
        publicMethods: () => ["state"],
        isEnabled() {
            return this.option("stateStoring.enabled")
        },
        init() {
            var that = this;
            that._state = {};
            that._isLoaded = false;
            that._isLoading = false;
            that._windowUnloadHandler = function() {
                if (void 0 !== that._savingTimeoutID) {
                    that._saveState(that.state())
                }
            };
            eventsEngine.on(getWindow(), "unload", that._windowUnloadHandler);
            return that
        },
        isLoaded() {
            return this._isLoaded
        },
        isLoading() {
            return this._isLoading
        },
        load() {
            this._isLoading = true;
            var loadResult = fromPromise(this._loadState());
            loadResult.always(() => {
                this._isLoaded = true;
                this._isLoading = false
            }).done(state => {
                if (null !== state && !isEmptyObject(state)) {
                    this.state(state)
                }
            });
            return loadResult
        },
        state(state) {
            if (!arguments.length) {
                return extend(true, {}, this._state)
            }
            this._state = extend({}, state);
            parseDates(this._state)
        },
        save() {
            var that = this;
            clearTimeout(that._savingTimeoutID);
            that._savingTimeoutID = setTimeout(() => {
                that._saveState(that.state());
                that._savingTimeoutID = void 0
            }, that.option("stateStoring.savingTimeout"))
        },
        optionChanged(args) {
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
        dispose() {
            clearTimeout(this._savingTimeoutID);
            eventsEngine.off(getWindow(), "unload", this._windowUnloadHandler)
        }
    }
}());
export default {
    StateStoringController: StateStoringController
};
