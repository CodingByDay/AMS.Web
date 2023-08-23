﻿/**
* DevExpress Analytics (core\internal\_resizable.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '../../serializer/utils';
import { IArea } from '../elements/baseSurface';
interface IResizable {
    handles?: string;
    filter?: string;
    distance?: number;
    minimumHeight?: number;
    minimumWidth?: number;
    selecting?: (event: MouseEvent, element: Element) => void;
    start: (event: MouseEvent, ui?: any) => void;
    stop: () => void;
    resize: (event: MouseEvent, element: Element, boundsDiff: IArea) => void;
}
export declare class Resizable extends Disposable {
    private _element;
    private _options;
    static inProcess: boolean;
    readonly handleClass: string;
    readonly handleClassSelector: string;
    readonly resizableElementClass = "ui-resizable";
    readonly _defaultMinSize = 1;
    private _bodyEvents;
    private _startResizeMousePosition;
    private _resizeDirection;
    private _resizeHandles;
    private _initResize;
    private _mouseMove;
    private _mouseUp;
    private _mouseDown;
    private _initResizeHandle;
    private _addClassToElement;
    private _removeClassFromElement;
    private _getBoundsDiff;
    constructor(_element: HTMLElement, _options: IResizable);
    initialize(): Resizable;
}
export declare function getResizeDirection(currentClassList: DOMTokenList): string;
export {};
