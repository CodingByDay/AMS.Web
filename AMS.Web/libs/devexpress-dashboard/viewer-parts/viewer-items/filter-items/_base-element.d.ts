﻿/**
* DevExpress Dashboard (_base-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import DataSource from 'devextreme/data/data_source';
import { filterElementDataController } from '../../../data/data-controllers/_filter-element-data-controller';
import { baseItem } from '../_base-item';
export declare abstract class filterElementBaseItem extends baseItem {
    widget: any;
    protected abstract get filterDataController(): filterElementDataController;
    constructor(container: HTMLElement, options: any);
    dispose(): void;
    protected _setSelectionUnsafe(values: any): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected _createWidgetDiv(): HTMLDivElement;
    protected _initializeData(newOptions: any): void;
    get allowMultiselection(): boolean;
    set allowMultiselection(value: boolean);
    protected get isMultiSelectable(): boolean;
    protected _isPaneEmpty(): boolean;
    updateInteractivityOptions(): void;
    getDataSource(): DataSource;
    protected get _enableSearch(): boolean;
    protected get _isBottomFloatingToolbarPosition(): boolean;
    _isBorderRequired(): boolean;
    _getDisplayExpr(): 'text' | 'html';
    _getOptions(includeActions: any): Object;
    _hasToggleSelectionModeButton(): boolean;
    protected _resizeUnsafe(): void;
    _raiseItemClick(elements: any[]): void;
    _mustSelectingFired(values: any): boolean;
    _isUpdating(widget: any): boolean;
    protected _applySelectionUnsafe(): void;
    _selectTuples(tuplesToSelect: any, unaffectedTuples: any, isSelect: any): void;
    _getWidget(): any;
    _getWidgetName(): string;
    _createWidget(div: HTMLElement, opts: any): any;
}
