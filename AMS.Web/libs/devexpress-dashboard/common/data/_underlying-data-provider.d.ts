﻿/**
* DevExpress Dashboard (_underlying-data-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ItemDataAxisPoint, PrimitiveType, RequestUnderlyingDataParameters } from '../../data';
import { itemData } from '../../data/item-data/_item-data';
import { DataDashboardItem } from '../../model';
import { IDataServiceClient } from '../_service-client';
export interface RawUnderlyingData {
    Data: Array<Array<PrimitiveType>>;
    DataMembers: Array<string>;
    DataMembersDisplayNames: Array<string>;
    ErrorMessage?: string;
}
export interface IUnderlyingDataProvider {
    requestUnderlyingData(dataDashboardItem: DataDashboardItem, args: RequestUnderlyingDataParameters): JQueryPromise<RawUnderlyingData>;
}
export declare class UnderlyingDataProvider {
    private _serviceClient;
    constructor(_serviceClient: IDataServiceClient);
    _getValidDataQueryParamsValues(values: Array<any>, dataDashboardItem: DataDashboardItem): any;
    _getUnderlyingDataArgsAxisPoints(data: itemData, args: RequestUnderlyingDataParameters): ItemDataAxisPoint[];
    requestUnderlyingData(dataDashboardItem: DataDashboardItem, args: RequestUnderlyingDataParameters): JQueryPromise<RawUnderlyingData>;
}
