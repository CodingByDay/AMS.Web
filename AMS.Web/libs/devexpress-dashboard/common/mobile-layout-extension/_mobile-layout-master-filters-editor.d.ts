﻿/**
* DevExpress Dashboard (_mobile-layout-master-filters-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IMasterFilterItemsProvider } from '../../model/internal/_interfaces';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
import { ViewerToolbarItem } from '../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options';
import { IDashboardContext } from '../viewer/_viewer-interfaces';
import { IStandaloneItemBindings } from './_dashboard-standalone-item';
export declare class MasterFiltersEditorModel {
    addFilterButton(toolbarItems: Array<ViewerToolbarItem>, filterableItem: IMasterFilterItemsProvider): any;
    _target: ko.Observable<IMasterFilterItemsProvider>;
    _visible: ko.Observable<boolean>;
    visible: ko.Computed<boolean>;
    masterItems: ko.Computed<any>;
    show(target: IMasterFilterItemsProvider): void;
    hide(): void;
}
export interface IDisplayFilterValue {
    name: string;
    valuesString: string;
}
export declare class ItemMasterFilterInfo {
    private dashboardItem;
    click: () => void;
    static maxFilterValuesCount: 10;
    constructor(dashboardItem: DataDashboardItem, click: () => void);
    name: ko.Computed<string>;
    filterValues: ko.Computed<Array<IDisplayFilterValue>>;
}
declare class ItemMasterFilterPopupViewModel {
    constructor(heightOffset: number, visible: ko.Subscribable<boolean>, repaintRequest: JQueryCallback);
    visible: ko.Subscribable<boolean>;
    width: string;
    height: string;
    onInitializing: (e: any) => void;
    onDisposing: (e: any) => void;
}
export declare class ItemMasterFiltersViewModel {
    private model;
    constructor(model: MasterFiltersEditorModel, dashboardContext: IDashboardContext, repaintRequest: JQueryCallback);
    masterItems: ko.Computed<Array<ItemMasterFilterInfo>>;
    masterFilterItem: ko.Observable<IStandaloneItemBindings>;
    showMasterFilterItem: (dashboardItem: DataDashboardItem, dashboardContext: IDashboardContext, repaintRequest: JQueryCallback) => void;
    closeMasterFilterItemPopup: () => void;
    closeMasterFiltersPopup: () => void;
    maximizeFiltersPopup: ko.Observable<boolean>;
    masterFiltersPopup: ItemMasterFilterPopupViewModel;
    masterFilterMaximizedItemPopup: ItemMasterFilterPopupViewModel;
}
export {};
