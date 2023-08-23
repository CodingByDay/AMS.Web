﻿/**
* DevExpress Dashboard (range-index-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeIndexSettings = void 0;
const ko = require("knockout");
const style_settings_base_1 = require("./style-settings-base");
class RangeIndexSettings extends style_settings_base_1.StyleSettingsBase {
    constructor(index) {
        super(null);
        this.index = ko.observable(-1);
        this.isBarStyle = ko.observable(false);
        this.index(index);
    }
    equals(style) {
        return (style instanceof RangeIndexSettings) && this.index() === style.index();
    }
    clone() {
        var style = new RangeIndexSettings(this.index());
        style.isBarStyle(this.isBarStyle());
        return style;
    }
}
exports.RangeIndexSettings = RangeIndexSettings;
