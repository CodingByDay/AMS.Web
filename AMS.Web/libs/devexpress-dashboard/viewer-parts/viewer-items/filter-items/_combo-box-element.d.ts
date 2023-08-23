﻿/**
* DevExpress Dashboard (_combo-box-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxSelectBox from 'devextreme/ui/select_box';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { filterElementDataController, listViewDataController } from '../../../data/data-controllers/_filter-element-data-controller';
import { filterElementBaseItem } from './_base-element';
export declare let cssComboBoxClassNames: {
    item: string;
    multiText: string;
    margins: string;
};
export declare class comboBoxFilterElement extends filterElementBaseItem {
    _dataController: listViewDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    protected get filterDataController(): filterElementDataController;
    protected get _shouldApplySelectionOnInitialRender(): boolean;
    constructor(container: HTMLElement, options: any);
    protected _setSelectionUnsafe(values: any): void;
    protected _clearSelectionUnsafe(): void;
    protected get _isBottomFloatingToolbarPosition(): boolean;
    protected get _allowPreview(): boolean;
    _getWidgetName(): "dxSelectBox" | "dxTagBox";
    protected _createWidgetDiv(): HTMLDivElement;
    _createWidget(div: HTMLElement, opts: any): dxSelectBox<any>;
    _getMinContentHeight(): any;
    _generateInnerBorderClassesUnsafe(element: HTMLElement): string[];
    _getSelectedKeys(): number | number[] | null;
    _getOptions(includeActions: any): Object;
    protected _resizeUnsafe(): void;
}
