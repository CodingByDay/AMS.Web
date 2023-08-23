﻿/**
* DevExpress Dashboard (_interfaces.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { IDisposable } from '../../model';
import { DataItem, DataItemLink } from '../../model/data-item/data-item';
import { DataItemContainer } from '../../model/items/data-item-container';
import { ConstrainedBindingProperty, ICollectionBindingProperty } from '../../model/items/_binding-model';
import { DataItemContainerPropertiesComposer, IComposeTabsArgs, IDataItemContainerComposeTabsArgs, IDetailsPropertiesComposerBase } from './properties-composers/_base-properties-composer';
export interface IDataSectionSurface extends IDisposable {
    template: string;
}
export interface IDataSectionInfo<TModel> extends ISectionInfoBase<TModel, IComposeTabsArgs> {
}
export interface IDataItemContainerSectionInfo<TModel extends DataItemContainer> extends ISectionInfoBase<TModel, IDataItemContainerComposeTabsArgs> {
    detailsPropertiesComposer?: DataItemContainerPropertiesComposer<DataItemContainer>;
}
export interface ISectionInfoBase<TModel, TArgs extends IComposeTabsArgs> {
    title: DashboardLocalizationId;
    bindingProperty?: ICollectionBindingProperty;
    detailsPropertiesComposer?: IDetailsPropertiesComposerBase<TModel, TArgs>;
    actions?: {
        title: string;
        icon: string;
        action: () => void;
    }[];
}
export interface IDataItemHolder {
    selectItem(holder: any, binding: ConstrainedBindingProperty): any;
    dataItemDisplayNameProvider(item: DataItem): string;
    removeDataItem(dataItemLink: DataItemLink): any;
}
export interface IItemsCollection {
    items: ko.ObservableArray<any>;
    supportGroups: boolean;
    relocateItem: (item: DataItemContainer | DataItemLink, placeholderIndex: number) => void;
    isOlap: () => boolean;
}
