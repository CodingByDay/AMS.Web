﻿/**
* DevExpress Dashboard (color.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare class Color {
    static fromArgb(alpha: number, red: number, green: number, blue: number): Color;
    static fromRgbaString(rgbaColor: string): Color;
    static fromJSON(jsonValue: string): Color;
    static fromAppearance(appearanceType: string): Color;
    static fromDxColor(dxColor: any): Color;
    static toNumber(alpha: number, red: number, green: number, blue: number): number;
    static toJSON(color: Color): number;
    static contrastColor(baseColor: Color): Color;
    static _colorFromModel(value: string): ko.Observable<Color>;
    static _colorRgbaFromModel(value: string): ko.Observable<string>;
    static _colorToModel(value: Color): number;
    static _colorRgbaToModel(rgbaColor: string): number;
    toNumber(): number;
    static toHex(colorValue: number): string;
    static equals(color1: Color, color2: Color): boolean;
    get A(): any;
    get R(): any;
    get G(): any;
    get B(): any;
    get css(): string;
    private _dxColor;
    constructor(colorValue: number);
    blend(blendColor: any, opacity: any): Color;
    toHex(): any;
    private _toRgbaString;
}
