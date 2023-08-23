﻿/**
* DevExpress Dashboard (_delta-indicator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class DeltaIndicator {
    _container: any;
    _renderer: any;
    _shape: any;
    constructor(options?: any);
    _init(): void;
    draw(options: any): any;
    _prepareDrawParams(options: any): any;
    _render(params: any): void;
    _drawShape(params: any): any;
    static getIndicatorColorType(type?: any, hasPositiveMeaning?: any, useDefaultColor?: any): any;
}
