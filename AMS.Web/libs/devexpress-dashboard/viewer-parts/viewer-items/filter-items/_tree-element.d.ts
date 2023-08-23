﻿/**
* DevExpress Dashboard (_tree-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxTreeList from 'devextreme/ui/tree_list';
import dxTreeView from 'devextreme/ui/tree_view';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { filterElementDataController } from '../../../data/data-controllers/_filter-element-data-controller';
import { filterElementBaseItem } from './_base-element';
export declare let cssTreeViewClassNames: {
    borderVisible: string;
    topBorder: string;
    item: string;
};
export declare class treeViewFilterElement extends filterElementBaseItem {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    protected get filterDataController(): filterElementDataController;
    protected _setSelectionUnsafe(values: any): void;
    _generateInnerBorderClassesUnsafe(element: HTMLElement): string[];
    protected _clearSelectionUnsafe(): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _getWidgetName(): "dxTreeView" | "dxTreeList";
    _createWidget(div: HTMLElement, opts: any): dxTreeView<any> | dxTreeList<any, any>;
    _getOptions(includeActions: any): Object;
    private _fillChildren;
    private _getSelectedBranches;
    private _onScrollChanged;
}
