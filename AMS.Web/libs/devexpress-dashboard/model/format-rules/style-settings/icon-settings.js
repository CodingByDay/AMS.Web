﻿/**
* DevExpress Dashboard (icon-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _icon_settings_1 = require("./metadata/_icon-settings");
const style_settings_base_1 = require("./style-settings-base");
class IconSettings extends style_settings_base_1.StyleSettingsBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _icon_settings_1.iconSettingsSerializationsInfo;
    }
    equals(style) {
        return (style instanceof IconSettings) && this.iconType() === style.iconType();
    }
    clone() {
        var style = new IconSettings({});
        style.iconType(this.iconType());
        return style;
    }
    setSpecificType(type) {
        this.iconType(type);
    }
    init() {
        this.iconType('DirectionalGreenArrowUp');
    }
}
exports.IconSettings = IconSettings;
