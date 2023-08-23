﻿/**
* DevExpress Dashboard (_list-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxList from 'devextreme/ui/list';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { dataSourceItem, filterElementDataController } from '../../../data/data-controllers/_filter-element-data-controller';
import { filterElementBaseItem } from './_base-element';
export declare let cssListBoxClassNames: {
    borderVisible: string;
    separatorHidden: string;
    list: string;
    item: string;
    emptyMessage: string;
};
export declare class listFilterElement extends filterElementBaseItem {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    protected get filterDataController(): filterElementDataController;
    constructor(container: HTMLElement, options: any);
    protected _setSelectionUnsafe(values: any): void;
    protected _clearSelectionUnsafe(): void;
    _generateInnerBorderClassesUnsafe(element: HTMLElement): string[];
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _getWidgetName(): string;
    _createWidget(div: HTMLElement, opts: any): dxList<any, any>;
    _getSelection(): dataSourceItem[];
    _getOptions(includeActions: any): Object;
}
