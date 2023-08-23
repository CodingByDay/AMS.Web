/**
* DevExpress Dashboard (grid-column-total.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._gridColumnTotalSerializationsInfo = exports._totalTypeTemplate = exports.GridColumnTotal = void 0;
const _default_1 = require("../../../data/localization/_default");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
class GridColumnTotal extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson, serializer) {
        super(modelJson, serializer);
    }
    getInfo() {
        return exports._gridColumnTotalSerializationsInfo;
    }
    static getDisplayValue(totalType) {
        return this.getLocalization(totalType);
    }
    static getLocalization(totalType) {
        switch (totalType) {
            case 'Auto':
                return _default_1.getLocalizationById('DashboardStringId.GridTotalAutoTemplate');
            case 'Min':
                return _default_1.getLocalizationById('DashboardStringId.GridTotalTypeMin');
            case 'Max':
                return _default_1.getLocalizationById('DashboardStringId.GridTotalTypeMax');
            case 'Avg':
                return _default_1.getLocalizationById('DashboardStringId.GridTotalTypeAvg');
            case 'Sum':
                return _default_1.getLocalizationById('DashboardStringId.GridTotalTypeSum');
            default:
                return _default_1.getLocalizationById('DashboardStringId.GridTotalTypeCount');
        }
    }
    _getDefaultItemType() {
        return 'Total';
    }
}
exports.GridColumnTotal = GridColumnTotal;
exports._totalTypeTemplate = {
    propertyName: 'totalType', modelName: '@Type', displayName: 'DashboardWebStringId.Grid.TotalType', defaultVal: 'Count', simpleFormAdapterItem: 'selectBoxEditor',
};
exports._gridColumnTotalSerializationsInfo = [_base_metadata_1.itemType, exports._totalTypeTemplate];
