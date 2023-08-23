﻿/**
* DevExpress Dashboard (_dashboard-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardItemSerializationsInfo = exports.parentContainer = exports.showCaptionDefaultFalse = exports.showCaption = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.showCaption = { propertyName: 'showCaption', modelName: '@ShowCaption', displayName: 'DashboardWebStringId.ShowCaptionText', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.showCaptionDefaultFalse = { propertyName: 'showCaption', modelName: '@ShowCaption', displayName: 'DashboardWebStringId.ShowCaptionText', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.parentContainer = { propertyName: 'parentContainer', modelName: '@ParentContainer' };
exports.dashboardItemSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.componentName, _base_metadata_1.name_ViewModel, exports.showCaption, exports.parentContainer];
