﻿/**
* DevExpress Dashboard (_view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardFormatConditionValueType, FormatConditionAppearanceType, FormatConditionIconType, FormatRuleChartElement } from '../../model/enums';
export interface StyleSettingsModel {
    Color: number;
    ForeColor: number;
    FontFamily: string;
    FontSize: number;
    FontStyle: string;
    RangeIndex: number;
    RuleIndex: number;
    AppearanceType: FormatConditionAppearanceType;
    IconType: FormatConditionIconType;
    Image: any;
    IsBarStyle: boolean;
}
export interface ConditionModel {
    FixedColors: Array<{
        key: number;
        style: StyleSettingsModel;
    }>;
}
export interface RangeConditionModel extends ConditionModel {
    ValueType: DashboardFormatConditionValueType;
    Ranges: Array<RangeInfoModel>;
}
export interface RangeInfoModel {
    LeftValue: any;
    RightValue: any;
}
export interface FormatRuleModelBase {
    FormatConditionMeasureId: string;
    NormalizedValueMeasureId: string;
    ZeroPositionMeasureId: string;
    ApplyToRow: boolean;
    ConditionModel: any;
    CalcByDataId: string;
}
export interface PivotFormatRuleModel extends FormatRuleModelBase {
    ApplyToDataId: string;
    ApplyToColumn: boolean;
}
export interface CardItemFormatRuleModel extends FormatRuleModelBase {
    ApplyToLayoutElementModel: ApplyToLayoutElementModel;
    ApplyToCardId: string;
}
export interface ApplyToLayoutElementModel {
    ApplyToLayoutElement: string;
    DimensionId: string;
    Text: string;
}
export interface ChartItemFormatRuleModelBase extends FormatRuleModelBase {
    DisplayName: string;
    ShowInLegend: boolean;
}
export interface ChartItemFormatRuleModel extends ChartItemFormatRuleModelBase {
    ApplyToSeriesId: string;
    ApplyToChartElement: FormatRuleChartElement;
}
