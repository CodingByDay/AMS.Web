/**
* DevExpress Analytics (core\widgets\fieldListEditor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '../../property-grid/widgets/editor';
import { TreeListController } from '../../widgets/treelist/_treelistController';
export declare class FieldListEditor extends Editor {
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    path: ko.PureComputed<any>;
    treeListController: TreeListController;
}
