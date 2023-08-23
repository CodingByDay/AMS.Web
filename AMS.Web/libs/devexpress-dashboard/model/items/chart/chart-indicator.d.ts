﻿/**
* DevExpress Dashboard (chart-indicator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { SerializableModel } from '../../serializable-model';
import { ChartItem } from './chart-item';
export declare class ChartIndicator extends SerializableModel {
    name: ko.Observable<string>;
    displayName: ko.Observable<string>;
    itemType: ko.Observable<string>;
    legendText: ko.Observable<string>;
    value: ko.Observable<string>;
    valueLevel: ko.Observable<string>;
    color: ko.Observable<string>;
    dashStyle: ko.Observable<string>;
    customTypeName: ko.Observable<string>;
    showInLegend: ko.Observable<boolean>;
    visible: ko.Observable<boolean>;
    thickness: ko.Observable<number>;
    _typeName: ko.Observable<string>;
    constructor(model?: any, serializer?: any, info?: any);
    static _createNew(chartItem: ChartItem, dataSourceBrowser: DataSourceBrowser): ChartIndicator;
    getInfo(): ISerializationInfoArray;
    _updateItemType(): void;
}
