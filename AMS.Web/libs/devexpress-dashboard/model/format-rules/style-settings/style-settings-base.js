/**
* DevExpress Dashboard (style-settings-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StyleSettingsBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _style_settings_base_1 = require("./metadata/_style-settings-base");
class StyleSettingsBase extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _style_settings_base_1.styleSettingsBaseSerializationsInfo;
    }
    init() { }
    setSpecificType(type) {
    }
}
exports.StyleSettingsBase = StyleSettingsBase;
