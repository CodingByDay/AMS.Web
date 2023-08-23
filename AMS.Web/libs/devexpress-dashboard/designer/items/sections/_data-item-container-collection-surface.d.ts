﻿/**
* DevExpress Dashboard (_data-item-container-collection-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataItem, DataItemLink } from '../../../model/data-item/data-item';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { DataDashboardItemSurface } from '../surfaces/_base-item-surface';
import { IDataItemContainerSectionInfo, IDataSectionSurface, IItemsCollection } from '../_interfaces';
import { IGroupedItemsHolder } from './_data-item-collection-surface';
export declare class DataItemContainerCollectionSurface implements IDataSectionSurface, IItemsCollection {
    itemSurface: DataDashboardItemSurface<DataDashboardItem>;
    holder: any;
    sectionInfo: IDataItemContainerSectionInfo<DataItemContainer>;
    warning?: ko.Subscribable<boolean>;
    private _disposables;
    supportGroups: boolean;
    constructor(itemSurface: DataDashboardItemSurface<DataDashboardItem>, holder: any, sectionInfo: IDataItemContainerSectionInfo<DataItemContainer>, warning?: ko.Subscribable<boolean>);
    groups: ko.Computed<Array<IGroupedItemsHolder>>;
    get items(): ko.ObservableArray<DataItemContainer>;
    private _chooseDataField;
    addDataItemContainerClick: () => void;
    selectContainerSample: (dataItemContainer: DataItemContainer) => void;
    private _removeDataItem;
    removeDataItem: (container: DataItemContainer) => void;
    dataItemDisplayNameProvider: (dataItem: DataItem) => string;
    getDisplayName: (object: any) => string;
    private _processChangeContainer;
    private getCompatibleTransfers;
    private _processChangeContainerType;
    selectDataItemContainer: (container: DataItemContainer) => void;
    newContainerSample: ko.Observable<any>;
    template: string;
    relocateItem(item: DataItemContainer | DataItemLink, placeholderIndex: number): void;
    isOlap(): boolean;
    errorFactory(container: DataItemContainer): ko.Observable<boolean>;
    dispose(): void;
}
