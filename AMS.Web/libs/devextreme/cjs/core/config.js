/**
 * DevExtreme (cjs/core/config.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("./utils/extend");
var _errors = _interopRequireDefault(require("./errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var config = {
    rtlEnabled: false,
    defaultCurrency: "USD",
    defaultUseCurrencyAccountingStyle: true,
    oDataFilterToLower: true,
    serverDecimalSeparator: ".",
    decimalSeparator: ".",
    thousandsSeparator: ",",
    forceIsoDateParsing: true,
    wrapActionsBeforeExecute: true,
    useLegacyStoreResult: false,
    useJQuery: void 0,
    editorStylingMode: void 0,
    useLegacyVisibleIndex: false,
    floatingActionButtonConfig: {
        icon: "add",
        closeIcon: "close",
        label: "",
        position: {
            at: "right bottom",
            my: "right bottom",
            offset: {
                x: -16,
                y: -16
            }
        },
        maxSpeedDialActionCount: 5,
        shading: false,
        direction: "auto"
    },
    optionsParser: function(optionsString) {
        if ("{" !== optionsString.trim().charAt(0)) {
            optionsString = "{" + optionsString + "}"
        }
        try {
            return JSON.parse(optionsString)
        } catch (ex) {
            try {
                return JSON.parse(normalizeToJSONString(optionsString))
            } catch (exNormalize) {
                throw _errors.default.Error("E3018", ex, optionsString)
            }
        }
    }
};
var normalizeToJSONString = function(optionsString) {
    return optionsString.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1").replace(/([{,])\s*([^":\s]+)\s*:/g, '$1"$2":')
};
var deprecatedFields = ["decimalSeparator", "thousandsSeparator"];
var configMethod = function() {
    if (!arguments.length) {
        return config
    }
    var newConfig = arguments.length <= 0 ? void 0 : arguments[0];
    deprecatedFields.forEach((function(deprecatedField) {
        if (newConfig[deprecatedField]) {
            var message = "Now, the ".concat(deprecatedField, " is selected based on the specified locale.");
            _errors.default.log("W0003", "config", deprecatedField, "19.2", message)
        }
    }));
    (0, _extend.extend)(config, newConfig)
};
if ("undefined" !== typeof DevExpress && DevExpress.config) {
    configMethod(DevExpress.config)
}
var _default = configMethod;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
