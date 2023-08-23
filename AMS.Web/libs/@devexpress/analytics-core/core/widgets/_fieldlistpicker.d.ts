﻿/**
* DevExpress Analytics (core\widgets\_fieldlistpicker.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import 'devextreme/ui/drop_down_box';
import dxDropDownBox from 'devextreme/ui/drop_down_box';
import * as ko from 'knockout';
export declare class dxFieldListPicker extends dxDropDownBox {
    _path: ko.Observable<string>;
    _value: ko.Observable<string>;
    _parentViewport: JQuery<Element>;
    _itemsProvider: ko.Observable<any>;
    _hasDisplayNameOption: boolean;
    _defaultPosition: any;
    updateOptions(options: any): void;
    constructor($element: any, options: any);
    _showDropDown(): void;
    _getMaxHeight(): number;
    _closeOutsideDropDownHandler(e: any, ignoreContainerClicks: any): void;
    _hideOnBlur(): boolean;
    _popupConfig(): any;
    _setTitle(text: string): void;
    _renderDisplayText(newValue: any): void;
    _optionChanged(args: {
        name: string;
        value: any;
    }): void;
    _clearValueHandler(): void;
    _renderPopupContent(): void;
}
