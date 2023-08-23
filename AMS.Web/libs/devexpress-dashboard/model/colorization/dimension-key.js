﻿/**
* DevExpress Dashboard (dimension-key.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionKey = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _format_helper_1 = require("../../data/_format-helper");
const _localizer_1 = require("../../data/_localizer");
const serializable_model_1 = require("../serializable-model");
const _color_scheme_entry_1 = require("./metadata/_color-scheme-entry");
class DimensionKey extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer, _color_scheme_entry_1.dimensionKeySerializationInfo);
        this.displayText = ko.pureComputed(() => {
            var displayText = null;
            if (!!this.value.value()) {
                if (this.value.type() === 'System.DateTime') {
                    var groupInterval = this.definition.dateTimeGroupInterval();
                    displayText = _format_helper_1.DashboardFormatHelper.format(new Date(this.value.value()), { dateType: 'short', format: groupInterval });
                }
                else {
                    displayText = this.value.value().toString();
                }
            }
            var predefinedDisplayText = _localizer_1.localizer.getPredefinedString(displayText);
            if (predefinedDisplayText) {
                return predefinedDisplayText;
            }
            else {
                return displayText;
            }
        });
    }
    getInfo() {
        return _color_scheme_entry_1.dimensionKeySerializationInfo;
    }
}
exports.DimensionKey = DimensionKey;
