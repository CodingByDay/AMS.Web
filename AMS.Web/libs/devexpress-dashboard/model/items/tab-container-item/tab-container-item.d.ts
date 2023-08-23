﻿/**
* DevExpress Dashboard (tab-container-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ItemState } from '../../dashboard-state';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DashboardItem } from '../dashboard-item';
import { DashboardTabPage } from './dashboard-tab-page';
export declare class TabContainerItem extends DashboardItem {
    tabPages: ko.ObservableArray<DashboardTabPage>;
    _activeTabPage: ko.Observable<DashboardTabPage>;
    _activePageChanged: (prevPageName: string, pageName: string) => void;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _setState(itemState: ItemState): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    _addNewPage(): DashboardTabPage;
}
