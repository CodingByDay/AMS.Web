﻿/**
* DevExpress Dashboard (layout-dimension-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { LayoutDimensionMode } from '../enums';
import { SerializableModel } from '../serializable-model';
export declare class LayoutDimensionOptions extends SerializableModel {
    mode: ko.Observable<LayoutDimensionMode>;
    value: ko.Observable<number>;
    constructor(model?: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
}
