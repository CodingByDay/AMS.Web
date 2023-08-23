﻿/**
* DevExpress Dashboard (_text-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DxElement } from 'devextreme/core/element';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { baseItem } from './_base-item';
export declare class textItem extends baseItem {
    div: JQuery;
    $textContent: JQuery;
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _getWidget(): DxElement;
    _setContent(): void;
    _updateDocvariableValues(htmlText: any): any;
}
