﻿/**
* DevExpress Dashboard (_static-list-lookup-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticListLookUpSettingsSerializationsInfo = exports.lookUpvalues = exports.lookUpValue = void 0;
const look_up_value_1 = require("../look-up-value");
exports.lookUpValue = { propertyName: 'value', modelName: '#text', displayName: 'DashboardStringId.ParametersFormValueColumnCaption', simpleFormAdapterItem: 'textBoxEditor' };
exports.lookUpvalues = { propertyName: 'values', modelName: 'Values', displayName: 'DevExpress.DashboardCommon.StaticListLookUpSettings.Values', array: true, addHandler: function () { return new look_up_value_1.LookUpValue({}); } };
exports.staticListLookUpSettingsSerializationsInfo = [exports.lookUpvalues];
