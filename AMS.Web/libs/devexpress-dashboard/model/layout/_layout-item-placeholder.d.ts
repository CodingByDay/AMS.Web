﻿/**
* DevExpress Dashboard (_layout-item-placeholder.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ILayoutItemViewModel } from '../../common/docking-layout/core/_layout-item';
import { DashboardLayoutGroup } from './dashboard-layout-group';
import { DashboardLayoutNode, LayoutItemInsertPosition } from './dashboard-layout-node';
export declare class DashboardLayoutItemPlaceholder extends DashboardLayoutNode {
    protected get _template(): string;
    constructor(parent?: DashboardLayoutGroup, serializer?: ModelSerializer);
    moveTo(itemModel: DashboardLayoutNode, location: string): void;
    _delete(): void;
    _createViewModel(): ILayoutItemViewModel;
    protected _insertItemCore(layoutNodeToInsert: DashboardLayoutNode, position: LayoutItemInsertPosition): void;
    protected _getDefaultItemType(): string;
}
