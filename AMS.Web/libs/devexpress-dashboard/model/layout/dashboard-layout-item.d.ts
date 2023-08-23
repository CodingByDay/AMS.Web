/**
* DevExpress Dashboard (dashboard-layout-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { DashboardLayoutNode } from './dashboard-layout-node';
export declare class DashboardLayoutItem extends DashboardLayoutNode {
    protected get _template(): string;
    constructor(modelJson?: Object, serializer?: ModelSerializer);
    protected _getDefaultItemType(): string;
    _deleteDashbordItem(): void;
}
