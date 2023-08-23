﻿/**
* DevExpress Dashboard (slice-table.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../../data-item/data-item';
import { SerializableModel } from '../../serializable-model';
import { IDataItemProvider } from '../_binding-model';
export declare class SliceTable extends SerializableModel {
    private _dataItemProvider;
    constructor(_dataItemProvider: IDataItemProvider, modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    push(bindings: Array<DataItemLink>, dataItemType: string): void;
    dimensions: ko.ObservableArray<DataItemLink>;
    measures: ko.ObservableArray<DataItemLink>;
    name: ko.Observable<string>;
}
