﻿/**
* DevExpress Dashboard (delta-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DeltaIndicationMode, DeltaIndicationThresholdType, DeltaValueType } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class CardDeltaOptions extends SerializableModel {
    resultIndicationMode: ko.Observable<DeltaIndicationMode>;
    resultIndicationThresholdType: ko.Observable<DeltaIndicationThresholdType>;
    resultIndicationThreshold: ko.Observable<number>;
    constructor(modelJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class DeltaOptions extends CardDeltaOptions {
    valueType: ko.Observable<DeltaValueType>;
    constructor(modelJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
