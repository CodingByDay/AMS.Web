﻿/**
* DevExpress Dashboard (_helpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { DataSource } from '../model/data-sources/data-source';
import { IDataField } from '../model/data-sources/_data-field';
export interface IDashboardDataMemberInfo extends IDataMemberInfo {
    hasItems: boolean;
    field: IDataField;
}
export declare function createDataMemberInfo(field: IDataField, dataSource: DataSource): IDashboardDataMemberInfo;
