﻿/**
* DevExpress Dashboard (chart-item-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ItemDataAxisName } from '../../data';
import { DataItemLink } from '../data-item/data-item';
import { Dimension } from '../data-item/dimension';
import { TargetDimensions } from '../enums';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { ChartInteractivityOptions } from './options/interactivity-options';
import { SeriesItem } from './series-item';
export declare abstract class ChartItemBase extends SeriesItem {
    protected __arguments: ko.ObservableArray<DataItemLink>;
    arguments: ko.ObservableArray<Dimension>;
    interactivityOptions: ChartInteractivityOptions;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _clearBindings(): void;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _getTargetDimensions(): TargetDimensions;
    _getItemDataAxis(): ItemDataAxisName;
    _getCurrentFilterValues(): any[];
    _itemInteractivityByColumnAxis(): boolean;
    _getInteractivityAxisDimensionCount(): number;
    protected _getCanColorByMeasures(): boolean;
    protected _getCanColorByDimensions(): boolean;
    _getColorizableDataItemsInfo(): Array<{
        items: Array<DataItemLink>;
        prefixId: string;
    }>;
}
