﻿/**
* DevExpress Dashboard (common-interfaces.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DxElement } from 'devextreme/core/element';
import { CustomItemViewer } from '../common/custom-viewer-item/custom-viewer-item';
import { Dashboard } from '../model/dashboard';
import { CustomItem } from '../model/items/custom-item/custom-item';
import { ICustomItemMetaData } from '../model/items/custom-item/meta';
export interface DashboardContainer {
    id: string;
    dashboard: Dashboard;
}
export declare type ErrorInfo = JQueryXHR | string;
export interface IExtension {
    name: string;
    start?(): void;
    stop?(): void;
    processKeyEvent?(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    designerToViewerAction?: SequenceAction;
    viewerToDesignerAction?: SequenceAction;
}
export interface ICustomItemExtension extends IExtension {
    metaData: ICustomItemMetaData;
    createViewerItem: (item: CustomItem, element: DxElement, content: any) => CustomItemViewer;
}
export declare type KeyEventType = 'keyup' | 'keydown';
export interface KnockoutTemplate {
    name: string;
    data?: any;
}
export interface WorkingModeSwitchingOptions {
    surfaceLeft?: number;
    surfaceTop?: number;
}
export interface SequenceAction {
    orderNo: number;
    action: (options: WorkingModeSwitchingOptions) => JQueryPromise<any>;
}
export interface IRemoteService<TResponse = any> {
    getFromServer: (url: string, data?: Object, queryOptions?: Object, abortController?: AbortController) => TResponse;
    postToServer: (url: string, data?: Object, abortController?: AbortController) => TResponse;
    performPostback: (url: string, args: Object, abortController?: AbortController) => JQueryPromise<any>;
}
export interface AjaxRemoteServiceOptions {
    beforeSend?: (jqXHR: JQueryXHR, settings: JQueryAjaxSettings) => any;
    complete?: (jqXHR: JQueryXHR, textStatus: string) => any;
    headers?: {
        [key: string]: any;
    };
}
export interface FetchRemoteServiceOptions {
    headers?: {
        [key: string]: any;
    };
    beforeSend?: (settings: RequestInit) => void;
}
export interface DashboardInfo {
    id: string;
    name: string;
}
