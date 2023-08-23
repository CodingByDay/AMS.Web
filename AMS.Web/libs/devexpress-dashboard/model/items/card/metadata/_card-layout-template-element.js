﻿/**
* DevExpress Dashboard (_card-layout-template-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardLayoutTemplateDataElementSerializationInfo = exports.cardLayoutTemplateElementBaseSerializationInfo = exports.cardLayoutValueType = exports.dimensionIndex = exports.cardLayoutVisible = exports.cardRowDataElementTypeValuesMapEx = exports.cardFormatRuleLayoutElementValuesMap = exports.cardRowDataElementTypeValuesMap = exports.cardRowElementTypeValuesMapBase = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.cardRowElementTypeValuesMapBase = {
    'Title': 'DashboardStringId.CardRowDataElementTypeTitleCaption',
    'Subtitle': 'DashboardStringId.CardRowDataElementTypeSubtitleCaption',
    'ActualValue': 'DashboardStringId.CardRowDataElementTypeActualValueCaption',
    'TargetValue': 'DashboardStringId.CardRowDataElementTypeTargetValueCaption',
    'AbsoluteVariation': 'DashboardStringId.CardRowDataElementTypeAbsoluteVariationCaption',
    'PercentVariation': 'DashboardStringId.CardRowDataElementTypePercentVariationCaption',
    'PercentOfTarget': 'DashboardStringId.CardRowDataElementTypePercentOfTargetCaption',
    'CardName': 'DashboardStringId.CardRowDataElementTypeCardNameCaption',
};
exports.cardRowDataElementTypeValuesMap = Object.assign(Object.assign({}, exports.cardRowElementTypeValuesMapBase), { 'DimensionValue': 'DashboardStringId.CardRowDataElementTypeDimensionValueCaption' });
exports.cardFormatRuleLayoutElementValuesMap = Object.assign(Object.assign({ 'AllElements': 'DashboardStringId.FormatRuleApplyToAllElements' }, exports.cardRowElementTypeValuesMapBase), { 'Indicator': 'DashboardStringId.CardRowDataElementTypeDeltaIndicatorCaption' });
exports.cardRowDataElementTypeValuesMapEx = Object.assign(Object.assign({}, exports.cardRowDataElementTypeValuesMap), { 'DeltaIndicator': 'DashboardStringId.CardRowDataElementTypeDeltaIndicatorCaption', 'Sparkline': 'DashboardStringId.CardRowDataElementTypeSparklineCaption' });
exports.cardLayoutVisible = { propertyName: 'visible', modelName: '@Visible', from: _base_metadata_1.parseBool };
exports.dimensionIndex = { propertyName: 'dimensionIndex', modelName: '@DimensionIndex', from: _base_metadata_1.floatFromModel };
exports.cardLayoutValueType = { propertyName: 'valueType', modelName: '@ValueType', simpleFormAdapterItem: 'listEditor' };
exports.cardLayoutTemplateElementBaseSerializationInfo = [exports.cardLayoutVisible];
exports.cardLayoutTemplateDataElementSerializationInfo = exports.cardLayoutTemplateElementBaseSerializationInfo.concat([exports.cardLayoutValueType, exports.dimensionIndex]);
