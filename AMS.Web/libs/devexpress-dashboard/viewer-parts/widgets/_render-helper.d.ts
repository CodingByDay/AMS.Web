﻿/**
* DevExpress Dashboard (_render-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import dxScrollView from 'devextreme/ui/scroll_view';
import { ISize } from '../layout/_utils.layout';
export declare class RenderHelper {
    static html(element: HTMLElement, content: string, encodeHtml: boolean): void;
    static rectangleHtml(color: any, width: any, height: any, rightMargin?: string): HTMLDivElement;
    static getActualBorder($element: JQuery): {
        width: number;
        height: number;
    };
    static getActualSize($element: any, collapse?: boolean): {
        width: number;
        height: number;
    };
    static getDefaultPalette(): string[];
    static getScrollable(element: HTMLElement): dxScrollView;
    static updateScrollable(element: HTMLElement): void;
    static wrapScrollable(container: HTMLElement, parentOverflow: any, direction: any): HTMLElement;
    static getThemeBaseElement: () => HTMLElement;
    static getElementBox(element: HTMLElement): {
        width: any;
        height: any;
    };
    static processElement($element: JQuery, processElement: () => any): any;
    static getElementBoxFloat(e: Element): {
        width: number;
        height: number;
    };
    static widgetIncidentOccurred(e: any): void;
    static getBorderSizeByClasses(classNames: string[]): ISize;
}
export declare function createFakeObjects(classNames: any, cssOptions: any): {
    firstElement: any;
    lastElement: any;
    remove: () => void;
};
