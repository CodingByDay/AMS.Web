﻿/**
* DevExpress Dashboard (_scatter-point-label-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scatterPointLabelOptionsSerializationsInfo = exports.content = void 0;
const _point_label_options_1 = require("../../chart/metadata/_point-label-options");
exports.content = {
    propertyName: 'content', modelName: '@Content', displayName: 'DashboardWebStringId.Chart.Content', defaultVal: 'Argument', simpleFormAdapterItem: 'listEditor',
    values: {
        'Argument': 'DashboardWebStringId.Binding.Argument',
        'Weight': 'DashboardWebStringId.Chart.Weight',
        'Values': 'DashboardWebStringId.Binding.Values',
        'ArgumentAndWeight': 'DashboardWebStringId.Chart.ArgumentAndWeight',
        'ArgumentAndValues': 'DashboardWebStringId.Chart.ArgumentAndValues'
    }
};
exports.scatterPointLabelOptionsSerializationsInfo = _point_label_options_1.pointLabelOptionsBaseSerializationsInfo.concat([exports.content, _point_label_options_1.position]);
