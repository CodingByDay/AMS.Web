﻿/**
* DevExpress Dashboard (_card-widget-implementation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import { CardWidget } from '.';
export declare class CardWidgetImplementation implements CardWidget {
    private _cardBackColor;
    private _onCustomizeText;
    private _changed;
    _notifyChanged: () => void;
    _element: DxElement;
    constructor(notifyHandler?: any);
    get onCustomizeText(): (args: {
        getValue: () => any;
        getDefaultText: () => string;
    }) => string;
    set onCustomizeText(value: (args: {
        getValue: () => any;
        getDefaultText: () => string;
    }) => string);
    get cardBackColor(): string;
    set cardBackColor(value: string);
    element: () => DxElement;
}
