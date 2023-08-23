﻿/**
* DevExpress Analytics (core\elements\serializableModel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/utils';
import { IModelSerializer } from '../../serializer/serializer';
import { ISerializationInfoArray } from '../../serializer/serializationInfo';
export declare class SerializableModel extends Disposable {
    preInitProperties(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray): void;
    constructor(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    getInfo(): ISerializationInfoArray;
}
