﻿/**
* DevExpress Dashboard (geo-point-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Measure } from '../../data-item/measure';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { GeoPointMapItemBase } from './geo-point-map-item-base';
export declare class GeoPointMapItem extends GeoPointMapItemBase {
    private __value;
    value: ko.Observable<Measure>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
}
