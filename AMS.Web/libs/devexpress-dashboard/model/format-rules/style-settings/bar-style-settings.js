﻿/**
* DevExpress Dashboard (bar-style-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarStyleSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const color_style_settings_1 = require("./color-style-settings");
class BarStyleSettings extends color_style_settings_1.ColorStyleSettings {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    clone() {
        var style = new BarStyleSettings({});
        style.predefinedColor(this.predefinedColor());
        style.color(this.color());
        return style;
    }
    init() {
        this.predefinedColor('PaleRed');
    }
}
exports.BarStyleSettings = BarStyleSettings;
