﻿/**
* DevExpress Dashboard (_card-layout.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardLayoutSerializationInfo = exports.cardRows = exports.maxWidth = exports.minWidth = exports.templateId = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.templateId = { propertyName: 'templateID', modelName: '@TemplateID' };
exports.minWidth = { propertyName: 'minWidth', modelName: '@MinWidth', displayName: 'DashboardWebStringId.CardLayout.MinWidth', defaultVal: 200, from: _base_metadata_1.floatFromModel };
exports.maxWidth = { propertyName: 'maxWidth', modelName: '@MaxWidth', displayName: 'DashboardWebStringId.CardLayout.MaxWidth', defaultVal: NaN, from: _base_metadata_1.floatFromModel, toJsonObject: _base_metadata_1.nullableFloatToModel };
exports.cardRows = { propertyName: 'rows', modelName: 'CardRows', array: true };
exports.cardLayoutSerializationInfo = [_base_metadata_1.itemType, exports.minWidth, exports.maxWidth, exports.cardRows];
