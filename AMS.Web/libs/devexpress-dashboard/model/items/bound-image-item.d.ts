﻿/**
* DevExpress Dashboard (bound-image-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Dimension } from '../data-item/dimension';
import { ImageDataBindingMode } from '../enums';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { DataDashboardItem } from './data-dashboard-item';
import { DashboardItemBaseInteractivityOptions } from './options/interactivity-options';
export declare class BoundImageItem extends DataDashboardItem {
    private __imageItem;
    imageItem: ko.Observable<Dimension>;
    interactivityOptions: DashboardItemBaseInteractivityOptions;
    sizeMode: ko.Observable<string>;
    horizontalAlignment: ko.Observable<string>;
    verticalAlignment: ko.Observable<string>;
    dataBindingMode: ko.Observable<ImageDataBindingMode>;
    uriPattern: ko.Observable<string>;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _isCalculationSupported(): boolean;
    _isSortingEnabled(): boolean;
    _isTopNEnabled(dataItem: Dimension): boolean;
    protected _getDefaultItemType(): string;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getIsVisualInteractivitySupported(): boolean;
    protected _updateContentViewModel(content: any): void;
}
