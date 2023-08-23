/**
* DevExpress Dashboard (_dimension-definition.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '../serializable-model';
import { IDimensionDefinition } from './dimension-key';
export declare class DimensionDefinition extends SerializableModel implements IDimensionDefinition {
    constructor(model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    dataMember: ko.Observable<string>;
    dateTimeGroupInterval: ko.Observable<string>;
    getInfo(): ISerializationInfoArray;
}
