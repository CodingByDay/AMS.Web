﻿/**
* DevExpress Dashboard (map-viewport.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IViewport, IViewportViewModel } from '../../internal/_interfaces';
import { SerializableModel } from '../../serializable-model';
export declare class MapViewport extends SerializableModel {
    topLatitude: ko.Observable<number>;
    bottomLatitude: ko.Observable<number>;
    leftLongitude: ko.Observable<number>;
    rightLongitude: ko.Observable<number>;
    centerPointLatitude: ko.Observable<number>;
    centerPointLongitude: ko.Observable<number>;
    createViewerPaddings: ko.Observable<boolean>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    _set(viewport: IViewport, paddings?: boolean): void;
    _createViewModel(): IViewportViewModel;
}
