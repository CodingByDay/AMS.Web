﻿/**
* DevExpress Dashboard (series-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../data-item/data-item';
import { Dimension } from '../data-item/dimension';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { DataDashboardItem } from './data-dashboard-item';
export declare abstract class SeriesItem extends DataDashboardItem {
    protected __seriesDimensions: ko.ObservableArray<DataItemLink>;
    seriesDimensions: ko.ObservableArray<Dimension>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _clearBindings(): void;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
}
