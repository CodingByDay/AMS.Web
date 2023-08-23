﻿/**
* DevExpress Analytics (core\internal\_objectStructureControllers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITreeListController } from '../../widgets/treelist/_treelistController';
import { IDataMemberInfo, IAction } from '../../widgets/utils';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
import { DragDropHandler } from '../dragDrop/_dragDropHandler';
import { Disposable } from '../../serializer/utils';
export declare class ObjectStructureTreeListController extends Disposable implements ITreeListController {
    dispose(): void;
    constructor(propertyNames?: string[], listPropertyNames?: string[]);
    canSelect(value: TreeListItemViewModel): boolean;
    dragDropHandler: DragDropHandler;
    selectedItem: any;
    dblClickHandler: (item: TreeListItemViewModel) => void;
    select: (value: TreeListItemViewModel) => void;
    itemsFilter: (item: IDataMemberInfo, path?: string) => boolean;
    hasItems: (item: IDataMemberInfo) => boolean;
    getActions: (item: TreeListItemViewModel) => IAction[];
    showIconsForChildItems: (item?: TreeListItemViewModel) => boolean;
}
