﻿/**
* DevExpress Dashboard (_field-list-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { IDataFieldsProvider, IDataSourceProvider } from '../../../common/_data-source-browser';
import { IDataField } from '../../../model/data-sources/_data-field';
import { IDashboardDataMemberInfo } from '../../_helpers';
export declare function getFieldList(pathRequest: IPathRequest, dataFieldsProvider: IDataFieldsProvider, dataSourceProvider: IDataSourceProvider, filterDelegate?: (field: IDataField) => boolean): JQueryPromise<IDashboardDataMemberInfo[]>;
export declare class FlatteningDataFieldsProviderWrapper implements IDataFieldsProvider {
    private _basic;
    private _shouldFlatten;
    constructor(basic: IDataFieldsProvider, shouldFlatten?: (field: IDataField) => boolean);
    findDataField(dataSourceName: string, dataMemberName: string, fullFieldName: string, hasGroupSeparator?: boolean): JQueryPromise<IDataField>;
    getDataFieldsArray(dataSourceName: string, dataMember: string, fieldPath: string, filterDelegate: (field: IDataField) => boolean): JQueryPromise<IDataField[]>;
}
