﻿/**
* DevExpress Dashboard (serializable-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializableModel, IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardItem } from './items/dashboard-item';
import { DataDashboardItem } from './items/data-dashboard-item';
export declare abstract class SerializableModel implements ISerializableModel {
    constructor(model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
}
export declare abstract class TypedSerializableModel extends SerializableModel {
    itemType: ko.Observable<string>;
    _model: any;
    constructor(model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    protected abstract _getDefaultItemType(): string;
    protected _getUniqueNamePrefix(): string;
}
export declare let itemTypesMap: {
    [key: string]: {
        type: typeof DashboardItem;
        customItemType?: typeof DataDashboardItem;
        groupName: string;
        title: string;
        index: number;
    };
};
