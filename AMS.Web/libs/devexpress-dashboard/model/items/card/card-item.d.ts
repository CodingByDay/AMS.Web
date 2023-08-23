﻿/**
* DevExpress Dashboard (card-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItem } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { KpiItem } from '../kpi/kpi-item';
import { Card } from './card';
export declare class CardItem extends KpiItem {
    private __sparklineArgument;
    sparklineArgument: ko.Observable<Dimension>;
    cards: ko.ObservableArray<Card>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _clearBindings(): void;
    protected _getDefaultItemType(): string;
    protected _getLayersCount(): number;
    protected _getLayerName(): string;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
    _itemInteractivityByColumnAxis(): boolean;
    _getInteractivityAxisDimensionCount(): number;
    _conditionFormattingExpressionEditorFilter(dataItem: DataItem): boolean;
}
