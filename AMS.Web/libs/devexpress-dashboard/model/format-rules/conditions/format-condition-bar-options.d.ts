﻿/**
* DevExpress Dashboard (format-condition-bar-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
export declare class FormatConditionBarOptions extends SerializableModel {
    allowNegativeAxis: ko.Observable<boolean>;
    drawAxis: ko.Observable<boolean>;
    showBarOnly: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
