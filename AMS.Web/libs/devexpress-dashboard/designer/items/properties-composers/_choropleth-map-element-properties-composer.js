﻿/**
* DevExpress Dashboard (_choropleth-map-element-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoroplethMapElementPropertiesComposer = void 0;
const chorolpeth_map_1 = require("../../../model/items/map/chorolpeth-map");
const chorolpeth_map_item_1 = require("../../../model/items/map/chorolpeth-map-item");
const _chorolpeth_map_1 = require("../../../model/items/map/metadata/_chorolpeth-map");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _container_type_selector_1 = require("../container-type-selector/_container-type-selector");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ChoroplethMapElementPropertiesComposer extends _base_properties_composer_1.DataItemContainerPropertiesComposer {
    constructor(customizeHandler, editDeltaFormatHandler = (model) => { }) {
        super(customizeHandler);
        this.editDeltaFormatHandler = editDeltaFormatHandler;
    }
    _composeTabsCore(model, args) {
        var typeTab = new _accordion_tab_1.TypeAccordionTab(_accordion_tab_1.KnownTabs.Type, 'DashboardWebStringId.Map.WeightedLegendType', this.getMapTypeWrapper(model, args.containerType)), commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options', new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                _base_metadata_1.name,
                _chorolpeth_map_1.valueName,
                _chorolpeth_map_1.actualValueName,
                _chorolpeth_map_1.deltaName
            ]
        })), result = [typeTab, commonTab];
        if (model instanceof chorolpeth_map_1.DeltaMap) {
            result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaOptions, 'DashboardWebStringId.Grid.DeltaOptions', _shared_composers_1.SharedComposers.getDeltaOptionsWrapper(model.deltaOptions)));
            result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaFormats, 'DashboardWebStringId.CardLayout.Editor.FormatOptions', _shared_composers_1.SharedComposers.getDeltaFormatsOptionsWrapper(model, this.editDeltaFormatHandler)));
        }
        return result;
    }
    getMapTypeWrapper(model, containerType) {
        if (model) {
            return new _container_type_selector_1.ContainerTypeSelector(chorolpeth_map_item_1.ChoroplethMapItem.choroplethMapTypesMap, containerType);
        }
        return null;
    }
}
exports.ChoroplethMapElementPropertiesComposer = ChoroplethMapElementPropertiesComposer;
