/**
* DevExpress Dashboard (custom-shape-file.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SerializableModel } from '../../serializable-model';
import { CustomShapefileData } from './custom-shape-file-data';
export declare class CustomShapefile extends SerializableModel {
    url: ko.Observable<string>;
    data: CustomShapefileData;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
