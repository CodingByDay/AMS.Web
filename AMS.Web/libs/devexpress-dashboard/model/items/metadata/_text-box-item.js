﻿/**
* DevExpress Dashboard (_text-box-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textBoxDashboardItemSerializationsInfo = exports.textBoxValues = exports.textBoxText = void 0;
const ko = require("knockout");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const interactivity_options_1 = require("../options/interactivity-options");
const _data_dashboard_item_1 = require("./_data-dashboard-item");
exports.textBoxText = {
    propertyName: 'text',
    modelName: 'Text',
    displayName: 'DashboardWebStringId.TextBox.Text',
    defaultVal: '',
    from: (value) => ko.observable(value),
    toJsonObject: (value) => {
        return value.replace(/\0*$/g, '').trim();
    },
};
exports.textBoxValues = { propertyName: _base_metadata_1.valuesPropertyName, modelName: 'Values', displayName: 'DashboardStringId.DescriptionValues', array: true };
exports.textBoxDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.textBoxValues, exports.textBoxText, interactivity_options_1._baseInteractivityOptionsMeta]);
