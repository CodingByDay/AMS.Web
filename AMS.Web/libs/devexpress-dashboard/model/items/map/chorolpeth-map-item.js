﻿/**
* DevExpress Dashboard (chorolpeth-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoroplethMapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
const chorolpeth_map_1 = require("./chorolpeth-map");
const map_item_1 = require("./map-item");
const _chorolpeth_map_item_1 = require("./metadata/_chorolpeth-map-item");
class ChoroplethMapItem extends map_item_1.MapItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.maps = analytics_utils_1.deserializeArray(modelJson.Maps, (item) => this._createMap(item, serializer));
        this._attachDataItem(this, _chorolpeth_map_item_1.attributeDimension.propertyName);
        this._shapeFilesAttributeNameList.subscribe(list => {
            if ((!this.attributeName() && list && list.length > 0) || list.indexOf(this.attributeName()) === -1) {
                this.attributeName(list[0]);
            }
        });
    }
    _getInteractivityDimensionLinks() {
        return [this.__attributeDimension];
    }
    _clearBindings() {
        super._clearBindings();
        this.maps.removeAll();
    }
    _createMap(mapJSON, serializer = new analytics_utils_1.ModelSerializer()) {
        var itemType = mapJSON['@ItemType'];
        return new ChoroplethMapItem.choroplethMapTypesMap[itemType].constructor(this, mapJSON, serializer);
    }
    _getInfoCore() {
        return _chorolpeth_map_item_1.choroplethMapDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'ChoroplethMap';
    }
    _getLayersCount() {
        return !!this.maps ? this.maps().length : 0;
    }
    _getLayerName() {
        return this._getDataItemContainerDisplayName(this.maps()[this._selectedElementIndex() || 0]);
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        var mapContent = this._paneContentHolder.getContent(_base_metadata_1.PropertyCategory.Map);
        if (mapContent && mapContent.ViewModel) {
            content.ViewModel.ToolTipAttributeName = mapContent.ViewModel.ToolTipAttributeName;
            if (mapContent.ViewModel.ChoroplethColorizer) {
                if (!content.ViewModel.ChoroplethColorizer)
                    content.ViewModel.ChoroplethColorizer = {};
                content.ViewModel.ChoroplethColorizer.AttributeName = mapContent.ViewModel.ChoroplethColorizer.AttributeName;
            }
        }
    }
}
exports.ChoroplethMapItem = ChoroplethMapItem;
ChoroplethMapItem.choroplethMapTypesMap = {
    'ValueMap': {
        constructor: chorolpeth_map_1.ValueMap,
        displayName: 'DashboardWebStringId.Map.ValueMap',
        icon: 'dx-dashboard-grid-column-measure'
    },
    'DeltaMap': {
        constructor: chorolpeth_map_1.DeltaMap,
        displayName: 'DashboardWebStringId.Map.DeltaMap',
        icon: 'dx-dashboard-grid-column-delta'
    }
};
serializable_model_1.itemTypesMap['ChoroplethMap'] = { type: ChoroplethMapItem, groupName: 'maps', title: 'DashboardWebStringId.DefaultNameChoroplethMapItem', index: 220 };
