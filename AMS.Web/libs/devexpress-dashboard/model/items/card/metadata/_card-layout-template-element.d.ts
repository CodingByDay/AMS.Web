﻿/**
* DevExpress Dashboard (_card-layout-template-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardLocalizationId } from '../../../../data/localization/_default';
import { CardFormatRuleLayoutElement, CardRowDataElementType } from '../../../enums';
import { IDashboardSerializationInfo, IDashboardSerializationInfoArray } from '../../../metadata/_base-metadata';
export declare let cardRowElementTypeValuesMapBase: {
    [key in CardRowDataElementType & CardFormatRuleLayoutElement]: DashboardLocalizationId;
};
export declare let cardRowDataElementTypeValuesMap: {
    [key in CardRowDataElementType]: DashboardLocalizationId;
};
export declare let cardFormatRuleLayoutElementValuesMap: {
    [key in CardFormatRuleLayoutElement]: DashboardLocalizationId;
};
export declare let cardRowDataElementTypeValuesMapEx: {
    [key in CardRowDataElementType | 'DeltaIndicator' | 'Sparkline']: DashboardLocalizationId;
};
export declare let cardLayoutVisible: IDashboardSerializationInfo;
export declare let dimensionIndex: IDashboardSerializationInfo;
export declare let cardLayoutValueType: IDashboardSerializationInfo;
export declare let cardLayoutTemplateElementBaseSerializationInfo: IDashboardSerializationInfoArray;
export declare let cardLayoutTemplateDataElementSerializationInfo: IDashboardSerializationInfoArray;
