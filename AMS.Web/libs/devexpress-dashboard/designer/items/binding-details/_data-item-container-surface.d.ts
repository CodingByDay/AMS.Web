﻿/**
* DevExpress Dashboard (_data-item-container-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IDisposable } from '../../../model';
import { DataItem, DataItemLink } from '../../../model/data-item/data-item';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { ConstrainedBindingProperty, IBindingModelProvider } from '../../../model/items/_binding-model';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IPropertiesHolder } from '../../properties-controller/_properties-controller';
import { DataItemContainerPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from '../surfaces/_base-item-surface';
import { IDataItemHolder } from '../_interfaces';
import { DataItemSurface } from './_data-item-surface';
export declare class DataItemContainerSurface implements IDisposable, IPropertiesHolder, IDataItemHolder {
    detailsPropertiesComposer: DataItemContainerPropertiesComposer<DataItemContainer>;
    itemSurface: DataDashboardItemSurface<DataDashboardItem>;
    private _removeDataItemContainer;
    private _disposables;
    constructor(model: DataItemContainer, detailsPropertiesComposer: DataItemContainerPropertiesComposer<DataItemContainer>, itemSurface: DataDashboardItemSurface<DataDashboardItem>, _removeDataItemContainer: (container: DataItemContainer) => void);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    selectItem: (model: IBindingModelProvider, binding: ConstrainedBindingProperty) => void;
    model: ko.Observable<DataItemContainer>;
    containerType: ko.Observable<string>;
    singleItemSurface: ko.Observable<DataItemSurface>;
    dataFieldChoosed: JQuery.Callbacks<Function>;
    private _removeDataItem;
    removeDataItem: (dataItemLink: DataItemLink) => void;
    dataItemDisplayNameProvider: (dataItem: DataItem) => string;
    dataItemErrorFactory(dataItem: DataItem): ko.Observable<boolean>;
    dispose(): void;
}
