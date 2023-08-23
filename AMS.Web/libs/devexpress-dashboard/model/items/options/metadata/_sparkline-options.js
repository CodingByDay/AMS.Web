﻿/**
* DevExpress Dashboard (_sparkline-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sparklineOptionsSerializationsInfo = exports.highlightStartEndPoints = exports.highlightMinMaxPoints = exports.viewType = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.viewType = { propertyName: 'viewType', modelName: '@ViewType', displayName: 'DashboardWebStringId.Sparkline.ViewType', defaultVal: 'Line' };
exports.highlightMinMaxPoints = { propertyName: 'highlightMinMaxPoints', modelName: '@HighlightMinMaxPoints', displayName: 'DashboardWebStringId.Sparkline.HighlightMinMaxPoints', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.highlightStartEndPoints = { propertyName: 'highlightStartEndPoints', modelName: '@HighlightStartEndPoints', displayName: 'DashboardWebStringId.Sparkline.HighlightStartEndPoints', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.sparklineOptionsSerializationsInfo = [exports.viewType, exports.highlightMinMaxPoints, exports.highlightStartEndPoints];
