﻿/**
* DevExpress Dashboard (_data-item-collection-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataItem, DataItemLink } from '../../../model/data-item/data-item';
import { IDisposable } from '../../../model/disposable-object';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DataItemSurface } from '../binding-details/_data-item-surface';
import { DataDashboardItemSurface } from '../surfaces/_base-item-surface';
import { IDataSectionInfo, IDataSectionSurface, IItemsCollection } from '../_interfaces';
export interface IGroupedItemsHolder {
    groupIndex: undefined | number;
    position: number;
    items: Array<DataItemLink | DataItemContainer>;
}
export declare class DataItemCollectionSurface implements IDisposable, IDataSectionSurface, IItemsCollection {
    itemSurface: DataDashboardItemSurface<DataDashboardItem>;
    sectionInfo: IDataSectionInfo<DataItem>;
    extendTabsHandler?: (tabs: AccordionTab[], model: any) => void;
    warning?: ko.Subscribable<boolean>;
    private _disposables;
    dataItems: ko.ObservableArray<DataItemLink>;
    supportGroups: boolean;
    constructor(itemSurface: DataDashboardItemSurface<DataDashboardItem>, sectionInfo: IDataSectionInfo<DataItem>, extendTabsHandler?: (tabs: AccordionTab[], model: any) => void, warning?: ko.Subscribable<boolean>);
    groups: ko.Computed<Array<IGroupedItemsHolder>>;
    get items(): ko.ObservableArray<DataItemLink>;
    private _addDataItem;
    addClick: () => void;
    private _removeDataItem;
    removeDataItem: (data: DataItemLink) => void;
    dataItemDisplayNameProvider: (dataItem: DataItem) => string;
    selectDataItem: (data: DataItemLink) => void;
    dataItemSurface: ko.Observable<DataItemSurface>;
    newItemSample: ko.Observable<DataItemLink>;
    relocateItem(item: DataItemContainer | DataItemLink, placeholderIndex: number): void;
    isOlap(): boolean;
    errorFactory(link: DataItemLink): ko.Observable<boolean>;
    template: string;
    dispose(): void;
}
