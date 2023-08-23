﻿/**
* DevExpress Dashboard (title.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectPropertiesWrapper } from '../designer/form-adapter/_object-properties-wrapper';
import { DashboardTitleAlignment } from './enums';
import { IDashboardSerializationInfoArray } from './metadata/_base-metadata';
import { SerializableModel } from './serializable-model';
export declare class DashboardTitle extends SerializableModel {
    imageType: ko.Observable<string>;
    text: ko.Observable<string>;
    visible: ko.Observable<boolean>;
    includeMasterFilter: ko.Observable<boolean>;
    alignment: ko.Observable<DashboardTitleAlignment>;
    image64: ko.Observable<string>;
    url: ko.Observable<string>;
    _titleSettings: ObjectPropertiesWrapper;
    constructor(model: any, serializer?: IModelSerializer, info?: IDashboardSerializationInfoArray);
    getInfo(): ISerializationInfoArray;
}
