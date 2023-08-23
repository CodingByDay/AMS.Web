/**
 * DevExtreme (renovation/ui/scheduler/resources/hasResourceValue.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.hasResourceValue = void 0;
var _type = require("../../../../core/utils/type");
var _common = require("../../../../core/utils/common");
var hasResourceValue = function(resourceValues, itemValue) {
    return (0, _type.isDefined)(resourceValues.find((function(value) {
        return (0, _common.equalByValue)(value, itemValue)
    })))
};
exports.hasResourceValue = hasResourceValue;
