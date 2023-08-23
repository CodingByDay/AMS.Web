﻿/**
* DevExpress Dashboard (_add-data-source-popup.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dxPopupToolbarItem } from 'devextreme/ui/popup';
import * as ko from 'knockout';
import { DataSource } from '../../model/data-sources/data-source';
import { KnockoutEntry } from '../../model/internal/_knockout-utils';
import { AvailableDataSourcesExtension } from '../extensions/available-data-sources-extension';
import { IPopupContentViewModel } from './_data-source-browser-viewmodel';
export declare class AddDataSourcePopup implements IPopupContentViewModel {
    addButtonDisable: ko.Computed<boolean>;
    title: any;
    toolbarItems: Array<dxPopupToolbarItem>;
    template: string;
    bindingData: any;
    dataSourcesFilter: {
        (dataSource: DataSource): boolean;
    };
    constructor(accessibleDataSourcesExtension: ko.Computed<AvailableDataSourcesExtension>, dataSourceFilter: {
        (dataSource: DataSource): boolean;
    }, addDataSourcesCallback: (d: Array<DataSource>) => void, popupVisible: KnockoutEntry<boolean>);
}
