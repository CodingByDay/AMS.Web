﻿/**
* DevExpress Analytics (core\internal\_surfaceHelpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IElementViewModel } from '../elements/elementViewModel';
import { ISelectionTarget } from '../selection/_selection';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { ISurfaceContext } from '../elements/baseSurface';
export declare function findSurface<T extends string = string>(viewModel: IElementViewModel): ISelectionTarget<T>;
export declare function getControlNewAbsolutePositionOnResize(snapHelper: SnapLinesHelper, absolutePosition: {
    top: number;
    left: number;
}, ui: {
    originalSize: {
        width: number;
        height: number;
    };
    size: {
        width: number;
        height: number;
    };
}, delta: {
    x: number;
    y: number;
    width: number;
    height: number;
}): {
    top: number;
    left: number;
    bottom: number;
    right: number;
};
export declare function getControlRect(element: any, control: ISelectionTarget, surface: ISurfaceContext): {
    top: number;
    left: number;
    width: any;
    height: any;
};
export declare function minHeightWithoutScroll(element: HTMLElement): number;
export declare function chooseBetterPositionOf(html: any, designer: any): any;
export declare function updateSurfaceContentSize(surfaceSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): () => void;
