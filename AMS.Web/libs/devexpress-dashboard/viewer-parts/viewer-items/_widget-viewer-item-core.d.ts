﻿/**
* DevExpress Dashboard (_widget-viewer-item-core.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FormatRuleModelBase } from '../../data/conditional-formatting/_view-model';
import { cardLayout } from '../widgets/widgets-viewer/cards/_card-layout';
export declare class widgetItemCore {
    onIncidentOccurred: (e: any) => void;
    tag: any;
    '__DX_DASHBOARD_DATA_ID': string;
    isSelected: boolean;
    hoverEnabled: boolean;
    cursor: string;
    value: any;
    indicator: any;
    subvalues: any;
    title: any;
    any: any;
    subTitle: string;
    geometry: any;
    valueIndicator: any;
    subvalueIndicator: any;
    scale: any;
    animation: any;
    mainValue: any;
    variableValue1: any;
    variableValue2: any;
    sparklineOptions: any;
    layout: cardLayout;
    dataAccessor: IWidgetItemDataAccessor;
}
export interface IWidgetItemDataAccessor {
    getActualValue?(): any;
    getActualValueText?(): string;
    getTargetValue?(): any;
    getTargetValueText?(): string;
    getAbsoluteVariationValue?(): any;
    getAbsoluteVariationText?(): string;
    getPercentVariationValue?(): any;
    getPercentVariationText?(): string;
    getPercentOfTargetValue?(): any;
    getPercentOfTargetText?(): string;
    getDimensionValue(dataId: string): any;
    getDimensionValueText(dataId: string): string;
    getIndicatorType?(): any;
    getIsGood?(): boolean;
    getMainValueText?(): string;
    getSubValue1Text?(): string;
    getSubValue2Text?(): string;
    getMeasureValue?(): any;
    getMeasureDisplayText?(): string;
    getSparklineOptions?(): any;
    getSelectionValues?(): Array<any>;
    getTitle?(): string;
    getSubtitle?(): string;
    getCaptions?(): Array<string>;
    getGaugeRange?(): any;
    getCardName?(): any;
    getStyleSettingsInfo?(ruleFilter: (rule: FormatRuleModelBase, applyToKpiElementId: string) => boolean): any;
    getKpiElementId?(): string;
}
