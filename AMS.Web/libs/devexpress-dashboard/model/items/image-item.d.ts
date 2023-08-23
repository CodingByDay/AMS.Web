﻿/**
* DevExpress Dashboard (image-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ImageHorizontalAlignment, ImageSizeMode, ImageVerticalAlignment } from '../enums';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { DashboardItem } from './dashboard-item';
export declare class ImageItem extends DashboardItem {
    urlPath: ko.Observable<string>;
    image64: ko.Observable<string>;
    sizeMode: ko.Observable<ImageSizeMode>;
    horizontalAlignment: ko.Observable<ImageHorizontalAlignment>;
    verticalAlignment: ko.Observable<ImageVerticalAlignment>;
    imageType: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _updateContentViewModel(content: any): void;
}
