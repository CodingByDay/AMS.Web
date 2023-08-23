﻿/**
* DevExpress Dashboard (appearance-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearanceSettings = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const color_1 = require("../../color");
const _appearance_settings_1 = require("./metadata/_appearance-settings");
const style_settings_base_1 = require("./style-settings-base");
class AppearanceSettings extends style_settings_base_1.StyleSettingsBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _appearance_settings_1.appearanceSettingsSerializationsInfo;
    }
    equals(style) {
        return (style instanceof AppearanceSettings) &&
            this.appearanceType() === style.appearanceType() &&
            this.fontFamily() == style.fontFamily() &&
            this.fontStyle() == style.fontStyle() &&
            color_1.Color.equals(this.backColor(), style.backColor()) &&
            color_1.Color.equals(this.foreColor(), style.foreColor());
    }
    clone() {
        return new AppearanceSettings({
            appearanceType: this.appearanceType(),
            fontFamily: this.fontFamily(),
            fontStyle: this.fontStyle(),
            backColor: this.backColor(),
            foreColor: this.foreColor()
        });
    }
    setSpecificType(type) {
        this.appearanceType(type);
    }
    init() {
        this.appearanceType('PaleRed');
    }
}
exports.AppearanceSettings = AppearanceSettings;
