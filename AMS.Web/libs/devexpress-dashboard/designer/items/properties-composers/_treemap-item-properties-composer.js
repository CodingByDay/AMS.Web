﻿/**
* DevExpress Dashboard (_treemap-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreemapItemPropertiesComposer = void 0;
const _dimension_1 = require("../../../model/data-item/metadata/_dimension");
const _treemap_item_1 = require("../../../model/items/treemap/metadata/_treemap-item");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class TreemapItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Layout, 'DashboardWebStringId.AccordionTab.Layout', this.getLayoutWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Labels, 'DashboardWebStringId.AccordionTab.Labels', this.getLabelsWrapper(model))
        ];
        return result;
    }
    getLayoutWrapper(model) {
        var properties = [
            _treemap_item_1.layoutAlgorithm,
            _treemap_item_1.layoutDirection
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
    getLabelsWrapper(model) {
        var properties = [
            _treemap_item_1.tilesLabelContentType,
            _treemap_item_1.tilesTooltipContentType,
            _treemap_item_1.groupsLabelContentType,
            _treemap_item_1.groupsTooltipContentType
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
    static getTileOptionsTab(model, dataItem) {
        return new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.TileOptions, 'DashboardWebStringId.TileOptions', TreemapItemPropertiesComposer.getTileOptionsWrapper(model, dataItem));
    }
    static getTileOptionsWrapper(model, dataItem) {
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dataItem,
            properties: [_dimension_1.groupChildValues]
        });
    }
}
exports.TreemapItemPropertiesComposer = TreemapItemPropertiesComposer;
