﻿/**
* DevExpress Dashboard (pie-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Dimension } from '../../data-item/dimension';
import { Measure } from '../../data-item/measure';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { PieValueType, PointLabelPosition, TargetDimensions } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { ChartItemBase } from '../chart-item-base';
export declare class PieItem extends ChartItemBase {
    private __values;
    values: ko.ObservableArray<Measure>;
    labelContentType: ko.Observable<PieValueType>;
    tooltipContentType: ko.Observable<PieValueType>;
    labelPosition: ko.Observable<PointLabelPosition>;
    pieType: ko.Observable<string>;
    showPieCaptions: ko.Observable<boolean>;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _clearBindings(): void;
    protected _getDefaultItemType(): string;
    protected _getTargetDimensions(): TargetDimensions;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getAreMeasuresColoredByDefault(): boolean;
    protected _getIsDimensionColoredByDefault(dimension: Dimension): boolean;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
}
