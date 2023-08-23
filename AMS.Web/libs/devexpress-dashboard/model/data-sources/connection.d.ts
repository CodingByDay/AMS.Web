﻿/**
* DevExpress Dashboard (connection.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../serializable-model';
export declare class SqlConnection extends SerializableModel {
    getInfo(): ISerializationInfoArray;
    constructor(connectionJSON?: any, serializer?: ModelSerializer);
    name: ko.Observable<string>;
    fromAppConfig: ko.Computed<boolean>;
}
