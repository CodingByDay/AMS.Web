﻿/**
* DevExpress Dashboard (point-label-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PointLabelContentType, PointLabelOrientation, PointLabelOverlappingMode, PointLabelPosition } from '../../enums';
import { SerializableModel } from '../../serializable-model';
export declare class PointLabelOptionsBase extends SerializableModel {
    showPointLabels: ko.Observable<boolean>;
    orientation: ko.Observable<PointLabelOrientation>;
    overlappingMode: ko.Observable<PointLabelOverlappingMode>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    grabFrom(options: PointLabelOptionsBase): void;
}
export declare class PointLabelOptions extends PointLabelOptionsBase {
    showForZeroValues: ko.Observable<boolean>;
    position: ko.Observable<PointLabelPosition>;
    contentType: ko.Observable<PointLabelContentType>;
    constructor(JSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    grabFrom(options: PointLabelOptions): void;
}
