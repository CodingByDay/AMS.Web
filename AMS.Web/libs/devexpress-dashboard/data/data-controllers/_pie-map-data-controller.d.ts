/**
* DevExpress Dashboard (_pie-map-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { geoPointMapDataControllerBase } from './_geo-point-map-data-controller-base';
export declare class pieMapDataController extends geoPointMapDataControllerBase {
    elementCustomColor: any;
    constructor(options: any);
    getPoint(index: any, valueIndex?: any): any;
    _getAxisPointDimensionDescriptorId(): any;
    formatValue(value: any): any;
}
