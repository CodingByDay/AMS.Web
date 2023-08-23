﻿/**
* DevExpress Dashboard (_filter-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import { DataSourceBrowser, IDataItemValuesProvider } from '../../common/_data-source-browser';
import { DataItem } from '../../model/data-item/data-item';
import { Dimension } from '../../model/data-item/dimension';
import { IDataField } from '../../model/data-sources/_data-field';
export declare function formatValue(value: any, dataItem: DataItem, fieldTypeName: string): any;
declare type GetValuesListFunctionOptions = {
    dataItemValuesProvider: IDataItemValuesProvider;
    dataSource: string;
    dataMember: string;
    dataField: IDataField;
    dataItem: Dimension;
};
export declare var getValuesList: ({ dataItemValuesProvider, dataSource, dataMember, dataField, dataItem }: GetValuesListFunctionOptions) => JQuery.Promise<any, any, any>;
export declare var createItemFilterOptions: (expression: ko.Observable<string>, item: any, _dataSourceBrowser: DataSourceBrowser, title?: {
    text: string;
    localizationId?: string;
}) => ko.Computed<FilterStringOptions>;
export {};
