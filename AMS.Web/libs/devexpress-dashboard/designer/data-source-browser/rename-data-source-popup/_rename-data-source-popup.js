/**
* DevExpress Dashboard (_rename-data-source-popup.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameDataSourcePopup = void 0;
const _rename_data_source_viewmodel_1 = require("./_rename-data-source-viewmodel");
class RenameDataSourcePopup {
    constructor(dataSourceBrowser) {
        this._viewModel = new _rename_data_source_viewmodel_1.RenameDataSourceViewModel(dataSourceBrowser);
        this.template = {
            name: 'dx-dashboard-datasources-rename-popup',
            data: this._viewModel
        };
    }
    show(dataSource) {
        this._viewModel.show(dataSource);
    }
}
exports.RenameDataSourcePopup = RenameDataSourcePopup;
