﻿/**
* DevExpress Dashboard (grid-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _grid_options_1 = require("./metadata/_grid-options");
class GridOptions extends serializable_model_1.SerializableModel {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _grid_options_1.gridOptionsSerializationsInfo;
    }
    _getViewModel() {
        return {
            AllowCellMerge: this.allowCellMerge(),
            ColumnWidthMode: this.columnWidthMode(),
            EnableBandedRows: this.enableBandedRows(),
            ShowHorizontalLines: this.showHorizontalLines(),
            ShowVerticalLines: this.showVerticalLines(),
            ShowColumnHeaders: this.showColumnHeaders(),
            WordWrap: this.wordWrap()
        };
    }
}
exports.GridOptions = GridOptions;
