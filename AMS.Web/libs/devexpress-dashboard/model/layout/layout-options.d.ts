/**
* DevExpress Dashboard (layout-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '../serializable-model';
import { LayoutDimensionOptions } from './layout-dimension-options';
export declare class LayoutOptions extends SerializableModel {
    width: LayoutDimensionOptions;
    height: LayoutDimensionOptions;
    constructor(model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getInfo(): ISerializationInfoArray;
}
