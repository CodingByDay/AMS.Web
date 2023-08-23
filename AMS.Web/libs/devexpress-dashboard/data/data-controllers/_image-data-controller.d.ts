/**
* DevExpress Dashboard (_image-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { dataControllerBase } from './_data-controller-base';
export declare class imageDataController extends dataControllerBase {
    _imageAxisPoints: any;
    constructor(options: any);
    _getImageAxisPoints(): Array<itemDataAxisPoint>;
    getImageData(): any;
}
