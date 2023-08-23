﻿/**
* DevExpress Analytics (core\internal\_inlineTextEdit.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { ISelectionProvider } from '../selection/_selection';
export declare function processTextEditorHotKeys(event: JQueryKeyEventObject, delegates: any): void;
export declare class InlineTextEdit extends Disposable {
    private _showInline;
    text: ko.Observable<string> | ko.Computed<string>;
    visible: ko.Observable<boolean> | ko.Computed<boolean>;
    keypressAction: any;
    show: any;
    constructor(selection: ISelectionProvider);
}
