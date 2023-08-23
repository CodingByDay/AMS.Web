﻿/**
* DevExpress Dashboard (_localizer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizer = exports.ALL_ELEMENT = void 0;
const _default_1 = require("./localization/_default");
const special_values_1 = require("./special-values");
exports.ALL_ELEMENT = {
    value: { all: true },
    key: -1,
    get text() {
        return _default_1.getLocalizationById('DashboardStringId.FilterElementShowAllItem') || '(All)';
    },
    get html() {
        return this.text;
    },
    isAll: true
};
class localizer {
    static getString(key) {
        return _default_1.getLocalizationById(key);
    }
    static getPredefinedString(value) {
        switch (value) {
            case null:
            case special_values_1.specialValues.nullValueGuid:
            case special_values_1.specialValues.olapNullValueGuid:
                return _default_1.getLocalizationById('DashboardStringId.DashboardNullValue');
            case special_values_1.specialValues.othersValueGuid:
                return _default_1.getLocalizationById('DashboardStringId.TopNOthersValue');
            case special_values_1.specialValues.errorValueGuid:
                return _default_1.getLocalizationById('DashboardStringId.DashboardErrorValue');
            default:
                return undefined;
        }
    }
}
exports.localizer = localizer;
