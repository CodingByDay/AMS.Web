﻿/**
* DevExpress Dashboard (_rename-data-source-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dxPopupToolbarItem } from 'devextreme/ui/popup';
import { Properties as dxValidatorOptions } from 'devextreme/ui/validator';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DataSource } from '../../../model/data-sources/data-source';
export declare class RenameDataSourceViewModel {
    _dataSource: DataSource;
    _dataSourceBrowser: DataSourceBrowser;
    title: any;
    label: any;
    isDataSourceNameValid: ko.Observable<boolean>;
    popupVisible: ko.Observable<boolean>;
    toolbarItems: Array<dxPopupToolbarItem>;
    dsName: ko.Observable<string>;
    nameValidationRules: Array<any>;
    nameTextBoxOptions: any;
    nameValidatorOptions: dxValidatorOptions;
    constructor(dataSourceBrowser: DataSourceBrowser);
    _dataSourceNameValid: (dsName: string) => boolean;
    show(dataSource: DataSource): void;
}
