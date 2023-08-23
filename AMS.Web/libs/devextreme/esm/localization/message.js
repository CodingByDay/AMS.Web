/**
 * DevExtreme (esm/localization/message.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dependencyInjector from "../core/utils/dependency_injector";
import {
    extend
} from "../core/utils/extend";
import {
    format as stringFormat
} from "../core/utils/string";
import {
    humanize
} from "../core/utils/inflector";
import coreLocalization from "./core";
import {
    defaultMessages
} from "./default_messages";
var baseDictionary = extend(true, {}, defaultMessages);
var getDataByLocale = (localeData, locale) => localeData[locale] || {};
var newMessages = {};
var messageLocalization = dependencyInjector({
    engine: function() {
        return "base"
    },
    _dictionary: baseDictionary,
    load: function(messages) {
        extend(true, this._dictionary, messages)
    },
    _localizablePrefix: "@",
    setup: function(localizablePrefix) {
        this._localizablePrefix = localizablePrefix
    },
    localizeString: function(text) {
        var that = this;
        var regex = new RegExp("(^|[^a-zA-Z_0-9" + that._localizablePrefix + "-]+)(" + that._localizablePrefix + "{1,2})([a-zA-Z_0-9-]+)", "g");
        var escapeString = that._localizablePrefix + that._localizablePrefix;
        return text.replace(regex, (str, prefix, escape, localizationKey) => {
            var defaultResult = that._localizablePrefix + localizationKey;
            var result;
            if (escape !== escapeString) {
                result = that.format(localizationKey)
            }
            if (!result) {
                newMessages[localizationKey] = humanize(localizationKey)
            }
            return prefix + (result || defaultResult)
        })
    },
    getMessagesByLocales: function() {
        return this._dictionary
    },
    getDictionary: function(onlyNew) {
        if (onlyNew) {
            return newMessages
        }
        return extend({}, newMessages, this.getMessagesByLocales()[coreLocalization.locale()])
    },
    getFormatter: function(key) {
        return this._getFormatterBase(key) || this._getFormatterBase(key, "en")
    },
    _getFormatterBase: function(key, locale) {
        var message = coreLocalization.getValueByClosestLocale(locale => getDataByLocale(this._dictionary, locale)[key]);
        if (message) {
            return function() {
                var args = 1 === arguments.length && Array.isArray(arguments[0]) ? arguments[0].slice(0) : Array.prototype.slice.call(arguments, 0);
                args.unshift(message);
                return stringFormat.apply(this, args)
            }
        }
    },
    format: function(key) {
        var formatter = this.getFormatter(key);
        var values = Array.prototype.slice.call(arguments, 1);
        return formatter && formatter.apply(this, values) || ""
    }
});
export default messageLocalization;
