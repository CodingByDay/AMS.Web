﻿/**
* DevExpress Analytics (core\widgets\_dataMemberEditor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ITreeListController } from '../../widgets/treelist/_treelistController';
import { IDataMemberInfo } from '../../widgets/utils';
import { TreeListItemViewModel } from '../../widgets/treelist/_treelistItem';
export declare class DataMemberTreeListController implements ITreeListController {
    dispose(): void;
    itemsFilter(item: IDataMemberInfo): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    isDraggable(item: TreeListItemViewModel): boolean;
    selectedItem: any;
    suppressActions: boolean;
}
