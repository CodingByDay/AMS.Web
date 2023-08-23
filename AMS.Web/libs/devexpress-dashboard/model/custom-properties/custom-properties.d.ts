﻿/**
* DevExpress Dashboard (custom-properties.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { IDashboardSerializationInfoArray } from '../metadata/_base-metadata';
import { SerializableModel } from '../serializable-model';
export declare type CustomPropertyValueType = boolean | string | number;
export declare class CustomProperties extends SerializableModel {
    _model: Object;
    getInfo: () => ISerializationInfoArray;
    constructor(json: any, serializer?: IModelSerializer, info?: IDashboardSerializationInfoArray);
    _isKnownProperty(propertyName: string): boolean;
    getValue(propertyName: string): CustomPropertyValueType;
    setValue(propertyName: string, propertyValue: CustomPropertyValueType): void;
}
