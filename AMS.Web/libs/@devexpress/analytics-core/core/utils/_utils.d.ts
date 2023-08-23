﻿/**
* DevExpress Analytics (core\utils\_utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import * as ko from 'knockout';
import * as localization from 'devextreme/localization';
import { ISerializationInfo } from '../../serializer/serializationInfo';
import { IAction } from '../../widgets/utils';
import { IAjaxSetup } from '../internal/_ajaxSetup';
export declare type SizeFactorType = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export declare function copyObservables(from: any, to: any): void;
export declare function _wrapModelInObservable<T>(model: T | ko.Observable<T> | ko.Computed<T>): ko.Observable<T>;
export interface IGroupedItem<T> {
    group: string;
    items: T[];
}
export declare function collectGroupsFromFlatList<T>(list: T[], getGroupId: (item: T) => string): IGroupedItem<T>[];
export declare function compareObjects(a: any, b: any): boolean;
export declare var cssTransform: string[];
export declare function getFullPath(path: string, dataMember: string): string;
export declare function loadTemplates(): any;
export declare function getSizeFactor(width: any): SizeFactorType;
export declare var staticContext: {
    _static: {
        searchPlaceholder: () => any;
        selectPlaceholder: () => any;
        noDataText: () => any;
        ajaxSetup: IAjaxSetup;
    };
};
export declare var _defaultStaticContext: (newVal?: {}) => {};
export declare function appendStaticContextToRootViewModel(root: any, dx?: any, className?: any): void;
export interface IAjaxSettings {
    uri: string;
    action: string;
    arg: any;
    processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void;
    ignoreError?: () => boolean;
    customOptions?: any;
    isError?: (data: any) => boolean;
    getErrorMessage?: (jqXHR: any) => string;
    method?: 'POST' | 'GET';
}
export declare function _ajax(uri: any, action: any, arg: any, processErrorCallback?: (message: string, jqXHR: any, textStatus: any) => void, ignoreError?: () => boolean, customOptions?: any, isError?: (data: any) => boolean, getErrorMessage?: (deferredResult: any) => string, method?: string): JQuery.Promise<any, any, any>;
export declare function _ajaxWithOptions(options: IAjaxSettings): JQuery.Promise<any, any, any>;
export declare var ajax: (...params: (IAjaxSettings | any)[]) => any;
export declare function setAjax(newFunc: any): void;
export interface _ICommonCallbacksHandler {
    customizeActions?: (actions: IAction[]) => void;
    customizeLocalization?: (callbacks?: JQueryPromise<any>[]) => void;
    onServerError?: (e: any) => void;
    onInitializing?: () => void;
    beforeRender?: (designerModel: any) => void;
}
export interface CustomizeMenuActionsCallbacksHandler<TSender> {
    CustomizeMenuActions?: (sender: TSender, args: {
        Actions: IAction[];
    }) => void;
}
export interface ICommonCallbacksHandler<TSender, TBeforeRenderSender> extends CustomizeMenuActionsCallbacksHandler<TSender>, _ICommonCallbacksHandler {
    OnInitializing?: (sender: TSender) => void;
    BeforeRender?: (sender: TSender, args: TBeforeRenderSender) => void;
    CustomizeLocalization?: (sender: TSender, args: ICustomizeLocalizationEventArgs) => void;
    OnServerError?: (sender: TSender, args: {
        Error: any;
    }) => void;
}
export interface ICustomizeLocalizationEventArgs {
    LoadMessages: (messages: JQueryPromise<any> | any | null) => void;
    SetAvailableCultures: (customCultures: any) => void;
    WidgetLocalization: typeof localization;
}
export interface ICommonBindingCustomizationHandler<T> {
    _eventSenderCreated?: (sender: T) => void;
}
export interface INamedValue {
    displayName: string;
    value: any;
}
export declare function cutRefs(model: any): any;
export interface IDesignerPart {
    id: string;
    templateName: string;
    model: any;
}
export declare var DesignerBaseElements: {
    MenuButton: string;
    Toolbar: string;
    Toolbox: string;
    GroupedToolbox: string;
    Surface: string;
    RightPanel: string;
};
export declare function generateDefaultParts(model: any): IDesignerPart[];
export declare function createActionWrappingFunction(wrapperName: string, func: (model: any, originalHandler: (model?: any) => any) => any): (actions: IAction[]) => void;
export declare function localizeNoneString(noneValue: any): any;
export declare function parseZoom(val: string): number;
export declare function getResizableOptions($element: Element, panelOffset: number, minWidth: ko.Observable<number> | number, position: string, startPosition: string, width?: ko.MaybeSubscribable<number>, disabled?: ko.MaybeSubscribable<boolean>): JQueryUI.ResizableOptions | any;
export declare function createPasswordSerializationInfo(info: ISerializationInfo, isNew?: boolean): ISerializationInfo;
