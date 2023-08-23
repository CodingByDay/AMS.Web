﻿/**
* DevExpress Dashboard (_dashboard-tab-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabPageSerializationInfo = exports.showItemAsTabPage = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _dashboard_item_1 = require("../../metadata/_dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
exports.showItemAsTabPage = { propertyName: 'showItemAsTabPage', modelName: '@ShowItemAsTabPage', displayName: 'DashboardWebStringId.DisplayItemAsPage', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.tabPageSerializationInfo = _dashboard_item_1.dashboardItemSerializationsInfo.concat([interactivity_options_1._tabItemInteractivityOptions, exports.showItemAsTabPage]);
