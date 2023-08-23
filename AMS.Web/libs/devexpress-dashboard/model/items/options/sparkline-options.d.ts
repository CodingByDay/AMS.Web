﻿/**
* DevExpress Dashboard (sparkline-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SparklineViewType } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class SparklineOptions extends SerializableModel {
    viewType: ko.Observable<SparklineViewType>;
    highlightMinMaxPoints: ko.Observable<boolean>;
    highlightStartEndPoints: ko.Observable<boolean>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
