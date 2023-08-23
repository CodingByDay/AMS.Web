/**
* DevExpress Dashboard (window-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
import { MeasureCalculationWindowDefinition } from './measure-calc-window-definition';
export declare class WindowDefinition extends SerializableModel {
    windowDefinitionType: ko.Observable<string>;
    windowDefinition: ko.Observable<MeasureCalculationWindowDefinition>;
    constructor(modelJson?: {}, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    equals(def: any): any;
    isEmpty(): boolean;
}
