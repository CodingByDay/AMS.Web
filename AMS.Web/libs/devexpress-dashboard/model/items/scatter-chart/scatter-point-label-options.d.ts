﻿/**
* DevExpress Dashboard (scatter-point-label-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ScatterPointLabelContentType } from '../../enums';
import { PointLabelOptionsBase } from '../chart/point-label-options';
export declare class ScatterPointLabelOptions extends PointLabelOptionsBase {
    content: ko.Observable<ScatterPointLabelContentType>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
}
