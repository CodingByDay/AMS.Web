﻿/**
* DevExpress Dashboard (gauge.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemNumericFormat } from '../../data-item/data-item-format';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { KpiElement } from '../kpi/kpi-element';
export declare class Gauge extends KpiElement {
    minimum: ko.Observable<number>;
    maximum: ko.Observable<number>;
    scaleLabelNumericFormat: DataItemNumericFormat;
    constructor(dataItemProvider: DataDashboardItem, modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
}
