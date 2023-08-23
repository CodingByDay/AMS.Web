﻿/**
* DevExpress Dashboard (text-box-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Measure } from '../data-item/measure';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { DataDashboardItem } from './data-dashboard-item';
import { DashboardItemBaseInteractivityOptions } from './options/interactivity-options';
export declare class TextBoxItem extends DataDashboardItem {
    private __values;
    values: ko.ObservableArray<Measure>;
    text: ko.Observable<string>;
    interactivityOptions: DashboardItemBaseInteractivityOptions;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _isCalculationSupported(): boolean;
    protected _getDefaultItemType(): string;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getIsVisualInteractivitySupported(): boolean;
}
