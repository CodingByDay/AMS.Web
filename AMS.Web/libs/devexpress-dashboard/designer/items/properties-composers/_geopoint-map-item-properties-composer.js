﻿/**
* DevExpress Dashboard (_geopoint-map-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoPointMapItemPropertiesComposer = void 0;
const _geo_point_map_item_base_1 = require("../../../model/items/map/metadata/_geo-point-map-item-base");
const _map_item_1 = require("../../../model/items/map/metadata/_map-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class GeoPointMapItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model, args) {
        var tabModel = _shared_composers_1.SharedComposers.getCommonMapWrapper(model, args.propertiesController, [
            _map_item_1.lockNavigation,
            _geo_point_map_item_base_1.enableClustering,
            _shared_composers_1.SharedComposers.getShapeTitleSerializationInfo(model)
        ]);
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', tabModel)
        ];
    }
}
exports.GeoPointMapItemPropertiesComposer = GeoPointMapItemPropertiesComposer;
