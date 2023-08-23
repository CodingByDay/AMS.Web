﻿/**
* DevExpress Dashboard (_single-data-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IFieldConstraint } from '../../../common/_data-source-browser';
import { DataItem, DataItemLink } from '../../../model/data-item/data-item';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DataItemSurface } from '../binding-details/_data-item-surface';
import { DataDashboardItemSurface } from '../surfaces/_base-item-surface';
import { IDataSectionInfo, IDataSectionSurface, IItemsCollection } from '../_interfaces';
export interface SingleDataItemSurfaceOptions {
    itemSurface: DataDashboardItemSurface<DataDashboardItem>;
    sectionInfo: IDataSectionInfo<DataItem>;
    warning?: ko.Subscribable<boolean>;
    fieldConstraint?: IFieldConstraint;
    extendTabsHandler?: (tabs: AccordionTab[], model: any) => void;
}
export declare class SingleDataItemSurface implements IDataSectionSurface, IItemsCollection {
    private _disposables;
    private extendTabsHandler?;
    dataItemLink: DataItemLink;
    itemSurface: DataDashboardItemSurface<DataDashboardItem>;
    sectionInfo: IDataSectionInfo<DataItem>;
    warning: ko.Subscribable<boolean>;
    fieldConstraint: IFieldConstraint;
    supportGroups: boolean;
    constructor(options: SingleDataItemSurfaceOptions);
    private _removeDataItem;
    removeDataItem: () => void;
    dataItemDisplayNameProvider: (dataItem: DataItem) => string;
    selectDataItem: () => void;
    dataItemSurface: ko.Observable<DataItemSurface>;
    items: ko.ObservableArray<any>;
    relocateItem(item: DataItemContainer | DataItemLink, placeholderIndex: number): void;
    isOlap(): boolean;
    errorFactory(link: DataItemLink): ko.Observable<boolean>;
    template: string;
    dispose(): void;
}
