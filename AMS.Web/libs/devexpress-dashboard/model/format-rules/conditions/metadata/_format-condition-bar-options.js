﻿/**
* DevExpress Dashboard (_format-condition-bar-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionBarOptionsSerializationsInfo = exports.drawAxis = exports.allowNegativeAxis = exports.showBarOnly = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.showBarOnly = { propertyName: 'showBarOnly', modelName: '@ShowBarOnly', displayName: 'DashboardStringId.FormatRuleShowBarOnly', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.allowNegativeAxis = { propertyName: 'allowNegativeAxis', modelName: '@AllowNegativeAxis', displayName: 'DashboardStringId.FormatRuleAllowNegativeAxis', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.drawAxis = { propertyName: 'drawAxis', modelName: '@DrawAxis', displayName: 'DashboardStringId.FormatRuleDrawAxis', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.formatConditionBarOptionsSerializationsInfo = [exports.showBarOnly, exports.allowNegativeAxis, exports.drawAxis];
