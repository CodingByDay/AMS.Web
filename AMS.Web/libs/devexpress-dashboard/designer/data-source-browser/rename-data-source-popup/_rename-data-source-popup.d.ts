﻿/**
* DevExpress Dashboard (_rename-data-source-popup.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DataSource } from '../../../model/data-sources/data-source';
export declare class RenameDataSourcePopup {
    private readonly _viewModel;
    private readonly template;
    constructor(dataSourceBrowser: DataSourceBrowser);
    show(dataSource: DataSource): void;
}
