﻿/**
* DevExpress Dashboard (_choropleth-map-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoroplethMapItemPropertiesComposer = void 0;
const _chorolpeth_map_item_1 = require("../../../model/items/map/metadata/_chorolpeth-map-item");
const _map_item_1 = require("../../../model/items/map/metadata/_map-item");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ChoroplethMapItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model, args) {
        const commonTabWrapper = _shared_composers_1.SharedComposers.getCommonMapWrapper(model, args.propertiesController, [
            _shared_composers_1.SharedComposers.getAttributeNamesSerializationInfo(model, _chorolpeth_map_item_1.attributeName, false),
            _map_item_1.lockNavigation
        ]);
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', commonTabWrapper),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ShapeLabels, 'DashboardWebStringId.AccordionTab.ChoroplethMapShapeLabelsAttribute', this.getShapeLabelsWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ColorLegend, 'DashboardWebStringId.AccordionTab.MapLegend', _shared_composers_1.SharedComposers.getColorLegendWrapper(model))
        ];
    }
    getShapeLabelsWrapper(model) {
        var properties = [
            _shared_composers_1.SharedComposers.getShapeTitleSerializationInfo(model),
            _shared_composers_1.SharedComposers.getAttributeNamesSerializationInfo(model, _chorolpeth_map_item_1.tooltipAttributeName, true, 'DashboardWebStringId.Map.UseBindingAttribute'),
            _chorolpeth_map_item_1.includeSummaryValueToShapeTitle
        ];
        var disabledRules = {};
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules
        });
    }
}
exports.ChoroplethMapItemPropertiesComposer = ChoroplethMapItemPropertiesComposer;
