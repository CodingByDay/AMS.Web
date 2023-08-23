﻿/**
* DevExpress Dashboard (gauge-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { GaugeViewType } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { KpiItem } from '../kpi/kpi-item';
import { Gauge } from './gauge';
export declare class GaugeItem extends KpiItem {
    gauges: ko.ObservableArray<Gauge>;
    viewType: ko.Observable<GaugeViewType>;
    showGaugeCaptions: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    _itemInteractivityByColumnAxis(): boolean;
    _getInteractivityAxisDimensionCount(): number;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
}
