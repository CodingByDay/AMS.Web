﻿/**
* DevExpress Dashboard (_pie-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieItemPropertiesComposer = void 0;
const _pie_item_1 = require("../../../model/items/pie/metadata/_pie-item");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _container_type_selector_1 = require("../container-type-selector/_container-type-selector");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class PieItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var result = [
            new _accordion_tab_1.StyleAccordionTab(_accordion_tab_1.KnownTabs.Type, 'DashboardWebStringId.Type', this.getTypeWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [_pie_item_1.showPieCaptions])),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ContentArrangement, 'DashboardWebStringId.AccordionTab.Layout', _shared_composers_1.SharedComposers.getContentArrangementWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Labels, 'DashboardWebStringId.AccordionTab.Labels', this.getLabelsWrapper(model))
        ];
        return result;
    }
    getTypeWrapper(model) {
        return new _container_type_selector_1.ContainerTypeSelector({
            'Pie': {
                displayName: 'DashboardWebStringId.Pie',
                icon: 'dx-dashboard-pie-pie',
                group: undefined
            },
            'Donut': {
                displayName: 'DashboardWebStringId.Pie.Donut',
                icon: 'dx-dashboard-pie-donut',
                group: undefined
            }
        }, model.pieType);
    }
    getLabelsWrapper(model) {
        var properties = [
            _pie_item_1.labelContentType,
            _pie_item_1.tooltipContentType,
            _pie_item_1.labelPosition,
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
}
exports.PieItemPropertiesComposer = PieItemPropertiesComposer;
