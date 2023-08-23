﻿/**
* DevExpress Dashboard (interactivity-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TargetDimensions } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { SerializableModel } from '../../serializable-model';
export declare class FilterableDashboardItemInteractivityOptions extends SerializableModel {
    ignoreMasterFilters: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardItemGroupInteractivityOptions extends FilterableDashboardItemInteractivityOptions {
    isMasterFilter: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardItemBaseInteractivityOptions extends SerializableModel {
    ignoreMasterFilters: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardTabItemInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    isMasterFilter: ko.Observable<boolean>;
    ignoreMasterFilters: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardItemMasterFilterInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    masterFilterMode: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardItemDrillDownInteractivityOptions extends DashboardItemBaseInteractivityOptions {
    isDrillDownEnabled: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DashboardItemInteractivityOptions extends DashboardItemMasterFilterInteractivityOptions {
    isDrillDownEnabled: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ChartInteractivityOptions extends DashboardItemInteractivityOptions {
    targetDimensions: ko.Observable<TargetDimensions>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare let _filterItemInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _groupItemInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _tabItemInteractivityOptions: IDashboardSerializationInfo;
export declare let _baseInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _dashboardItemInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _masterFilterInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _drillDownInteractivityOptionsMeta: IDashboardSerializationInfo;
export declare let _chartItemInteractivityOptionsMeta: IDashboardSerializationInfo;
