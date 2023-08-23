﻿/**
* DevExpress Dashboard (_utils.layout.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type Direction = 'width' | 'height';
export interface ISize {
    width: number;
    height: number;
}
export interface SizeEx extends ISize {
    plus: {
        (arg: ISize): SizeEx;
    };
    minus: {
        (arg: ISize): SizeEx;
    };
    compareByDirections: {
        (size: ISize): Direction[];
    };
    constrain: {
        (constraints: Constraints): SizeEx;
    };
    clone: {
        (): SizeEx;
    };
}
export interface Constraints {
    min: ISize;
    max: ISize;
}
export interface ConstraintsEx {
    min: SizeEx;
    max: SizeEx;
    consolidate: {
        (sourceConstraints: Constraints, consolidateDirection: Direction): ConstraintsEx;
    };
    isFixed: {
        (direction: Direction): boolean;
    };
    [privateFuncName: string]: any;
}
export declare let size: (w?: number, h?: number) => SizeEx;
export declare let constraints: (pMin: SizeEx, pMax: SizeEx) => ConstraintsEx;
export declare let nonClientElement: (width: any, height: any) => {
    getBounds: () => SizeEx;
};
export declare let getCrossDirection: {
    (direction: Direction): Direction;
};
export declare let defConstraints: (valueMin?: number, valueMax?: number) => ConstraintsEx;
export declare let defSizeInPercents: (direction: Direction, value: number) => SizeEx;
export declare let checkRange: (value: number, min: number, max: number) => boolean;
export declare let ensureRange: (value: number, min: number, max: number) => number;
export declare let deepCloneObject: (injectObject: any, sourceObject: any, noDeepCopyPropsValues: any) => any;
