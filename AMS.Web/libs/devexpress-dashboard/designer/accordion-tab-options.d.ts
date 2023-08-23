﻿/**
* DevExpress Dashboard (accordion-tab-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxForm, { SimpleItem as dxFormSimpleItem } from 'devextreme/ui/form';
import { ICustomPropertiesProvider } from '../model/custom-properties/_custom-properties-utils';
import { DashboardItem } from '../model/items/dashboard-item';
import { DataItemContainer } from '../model/items/data-item-container';
import { AccordionTab } from './properties-controller/_accordion-tab';
export interface SectionOptions {
    title: string;
    onContentReady?: (e: {
        component?: dxForm;
        element?: DxElement;
    }) => void;
    onInitialized?: (e: {
        component?: dxForm;
        element?: DxElement;
    }) => void;
    onFieldDataChanged?: (e: {
        component?: dxForm;
        element?: DxElement;
        model?: any;
        dataField?: string;
        value?: any;
    }) => any;
    items: Array<dxFormSimpleItem>;
}
export interface CustomizeSectionsEventArgs {
    dashboardItem: DashboardItem;
    addSection(options: SectionOptions): void;
}
export interface CustomizeDataItemContainerSectionsEventArgs extends CustomizeSectionsEventArgs {
    dashboardItem: DashboardItem;
    dataItemContainer: DataItemContainer;
}
export declare function _customizeTabs(tabs: AccordionTab[], customSectionOption: SectionOptions, object: ICustomPropertiesProvider): void;
