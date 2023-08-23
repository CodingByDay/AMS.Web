﻿/**
* DevExpress Dashboard (color-style-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorStyleSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const color_1 = require("../../color");
const _color_style_settings_1 = require("./metadata/_color-style-settings");
const style_settings_base_1 = require("./style-settings-base");
class ColorStyleSettings extends style_settings_base_1.StyleSettingsBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _color_style_settings_1.colorStyleSettingsSerializationsInfo;
    }
    equals(style) {
        return (style instanceof ColorStyleSettings) &&
            this.predefinedColor() === style.predefinedColor() &&
            color_1.Color.equals(this.color(), style.color());
    }
    clone() {
        var style = new ColorStyleSettings({});
        style.predefinedColor(this.predefinedColor());
        style.color(this.color());
        return style;
    }
    setSpecificType(type) {
        this.predefinedColor(type);
    }
    init() {
        this.predefinedColor('Red');
    }
}
exports.ColorStyleSettings = ColorStyleSettings;
