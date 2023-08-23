﻿/**
* DevExpress Dashboard (_item-filter-items-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataFieldsProvider, IDataItemValuesProvider } from '../../common/_data-source-browser';
import { DataFieldType } from '../../model';
import { IDimensionDefinition } from '../../model/colorization/dimension-key';
import { DataItem } from '../../model/data-item/data-item';
import { IDataField } from '../../model/data-sources/_data-field';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
import { Parameter } from '../../model/parameters/parameter';
export declare var getRealDimensionType: (dimension: IDimensionDefinition, dataField: IDataField) => DataFieldType;
export declare var isCategoricalDateTime: (dimension: IDimensionDefinition, dataField: IDataField) => boolean;
export declare class ItemFilterItemsProvider implements IItemsProvider {
    private dataItemValuesProvider;
    private dataFieldProvider;
    private parameters;
    private dataDashboardItem;
    private filterPredicate;
    constructor(dataItemValuesProvider: IDataItemValuesProvider, dataFieldProvider: IDataFieldsProvider, parameters: ko.ObservableArray<Parameter>, dataDashboardItem: DataDashboardItem, filterPredicate?: (di: DataItem) => boolean);
    getItems(pathRequest: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
    getValues(pathRequest: IPathRequest): JQueryPromise<any[]>;
    private _getDashboardItemDataFields;
}
