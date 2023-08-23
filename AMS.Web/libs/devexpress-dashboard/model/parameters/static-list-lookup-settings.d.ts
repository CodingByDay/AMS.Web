﻿/**
* DevExpress Dashboard (static-list-lookup-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { SerializableModel } from '../serializable-model';
import { LookUpValue } from './look-up-value';
export declare class StaticListLookUpSettings extends SerializableModel {
    private _valueType;
    static modelName: string;
    values: ko.ObservableArray<LookUpValue>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _updateValuesType(newType: string): void;
}
export declare let _staticListLookUpSettingsSerializationInfo: IDashboardSerializationInfo;
