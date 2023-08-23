/**
* DevExpress Dashboard (excel-data-source.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { DataSource } from './data-source';
export declare class ExcelDataSource extends DataSource {
    get _isFederationDataProvider(): boolean;
    constructor(dataSourceJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getDisplayNamePrefix(): string;
    protected _getDefaultItemType(): string;
}
