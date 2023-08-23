﻿/**
* DevExpress Dashboard (_jquery-helpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DxElement } from 'devextreme/core/element';
import { DxPromise } from 'devextreme/core/utils/deferred';
export declare type dxRenderer = {
    dxRenderer: true;
};
export declare const $promiseAdapter: <T>(promise: JQuery.Promise<T, any, any> | Promise<T>) => Promise<T>;
export declare const $unwrap: (element: JQuery | Element | HTMLElement | dxRenderer) => HTMLElement;
export declare const $wrap: (element: JQuery | Element | HTMLElement) => JQuery;
export declare const wrapPublicElement: (element: HTMLElement) => DxElement;
export declare const extend: (target: any, source1: any, ...sources: any[]) => any;
export declare const deepExtend: (target: any, ...sources: any[]) => any;
export declare const isPlainObject: (object: any) => boolean;
export declare const getWidth: (element: HTMLElement | Element | Window) => any;
export declare const getHeight: (element: HTMLElement | Element | Window) => any;
export declare const getOuterWidth: (element: HTMLElement | Element) => any;
export declare const getOuterHeight: (element: HTMLElement | Element) => any;
export declare const wrapInner: (element: HTMLElement | Element, wrappingElement: HTMLElement | Element) => any;
export declare const accessJQueryData: (element: HTMLElement, key: string, value?: any) => any;
export declare const isVisible: (element: HTMLElement) => any;
export declare const closest: (element: HTMLElement, css: any) => HTMLElement;
export declare const createJQueryCallbacks: () => JQuery.Callbacks<Function>;
export declare const createJQueryDeferred: <TR = any, TJ = any, TN = any>() => JQuery.Deferred<TR, TJ, TN>;
export declare const jqueryWhen: <TR1 = never, TJ1 = never>(...deferreds: Array<JQuery.Promise<TR1, TJ1> | JQuery.Thenable<TR1> | TR1>) => JQuery.Promise<TR1, TJ1, never>;
export declare const jqueryWhenArray: <TR1 = never, TJ1 = never>(deferreds: Array<JQuery.Promise<TR1, TJ1> | JQuery.Thenable<TR1> | TR1>) => JQuery.Promise<TR1, TJ1, never>;
export declare const jqueryQueryParam: (value: Object) => string;
export declare const jqueryOffset: (element: HTMLElement) => any;
export declare const createJQueryElement: (element: string, options: Object) => any;
