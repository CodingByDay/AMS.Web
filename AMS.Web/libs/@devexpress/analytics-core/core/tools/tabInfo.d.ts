/**
* DevExpress Analytics (core\tools\tabInfo.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { AccessibilityKeyboardHelperBase } from '../../accessibility/_keyboardHelperBase';
import { Disposable } from '../../serializer/utils';
export interface ITabInfoOptions {
    text: string;
    template: string;
    model: any;
    keyboardHelper?: AccessibilityKeyboardHelperBase;
    localizationId?: string;
    imageClassName?: string;
    imageTemplateName?: string;
    visible?: ko.Observable<boolean> | ko.Computed<boolean>;
    disabled?: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class TabInfo extends Disposable {
    private _text;
    private _localizationId;
    constructor(options: ITabInfoOptions);
    focus(): void;
    imageClassName: ko.Observable<string> | ko.Computed<string>;
    imageTemplateName: string;
    name: string;
    active: ko.Observable<boolean> | ko.Computed<boolean>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    template: string;
    model: any;
    keyboardHelper: AccessibilityKeyboardHelperBase;
    get text(): string;
    collapsed: ko.Subscribable<boolean>;
}
