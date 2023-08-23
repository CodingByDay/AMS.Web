﻿/**
* DevExpress Analytics (core\binding\_jsDesignerBindingCommon.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Disposable } from '../../serializer/utils';
import { IJSDesignerBindingCommonOptions } from './_jsDesignerBindingCommonOptions';
export declare class JSDesignerBindingCommon<TSender, TOptions extends IJSDesignerBindingCommonOptions> extends Disposable {
    protected _options: TOptions;
    protected _customEventRaiser?: any;
    sender: TSender;
    protected developmentMode: boolean;
    dispose(): void;
    protected _fireEvent(eventName: any, args?: any): void;
    private _warnForIncorrectCallbackName;
    protected _checkCallbackName(availableEvents: any[]): void;
    protected _getServerActionUrl(host: string, uri: string): string;
    protected _generateCallbackDictionary(eventsArray: any, prefix?: string): any;
    protected _templateHtml: string;
    protected _getLocalizationRequest(): JQuery.Promise<{
        messages: any;
    }, any, any>;
    protected _createDisposeFunction(element: HTMLElement): void;
    static convertCallbackArrayToDictionary(callbackArray: any[]): {};
    constructor(_options: TOptions, _customEventRaiser?: any);
}
export declare class DxAnalyticsComponentCommon<TOptions extends IJSDesignerBindingCommonOptions> {
    private _element;
    private _options;
    constructor(_element: HTMLElement, _options: TOptions);
    getBindingName(): string;
    render(): void;
    dispose(): void;
}
