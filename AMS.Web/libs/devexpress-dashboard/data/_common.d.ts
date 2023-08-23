﻿/**
* DevExpress Dashboard (_common.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare const DashboardDataIdField = "__DX_DASHBOARD_DATA_ID";
export declare type ClearMasterFilterButtonState = 'Enabled' | 'Disabled' | 'Hidden';
export declare let viewerActions: {
    setMasterFilter: string;
    setMultipleValuesMasterFilter: string;
    clearMasterFilter: string;
    drillDown: string;
    drillUp: string;
    setSelectedElementIndex: string;
    expandValue: string;
    dataRequest: string;
    getDrillThroughData: string;
};
export declare type ContentType = 'Empty' | 'ViewModel' | 'ActionModel' | 'CompleteDataSource' | 'PartialDataSource' | 'FullContent';
export declare let contentType: {
    empty: ContentType;
    viewModel: ContentType;
    actionModel: ContentType;
    completeDataSource: ContentType;
    partialDataSource: ContentType;
    fullContent: ContentType;
};
export declare let parseFlagsEnumType: (typeModel: string, defaultValue: number, dic: {
    [key: string]: number;
}) => number;
export declare let serializeFlagsEnumType: (val: number, defaultValue: string, dic: {
    [key: string]: number;
}) => string;
export declare let getFlagsEnumTypeValues: (val: number, dic: {
    [key: string]: number;
}, type: 'key' | 'value') => Array<any>;
