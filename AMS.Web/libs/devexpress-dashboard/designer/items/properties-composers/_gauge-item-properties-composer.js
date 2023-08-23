﻿/**
* DevExpress Dashboard (_gauge-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeItemPropertiesComposer = void 0;
const _gauge_item_1 = require("../../../model/items/gauge/metadata/_gauge-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _container_type_selector_1 = require("../container-type-selector/_container-type-selector");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class GaugeItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var result = [
            new _accordion_tab_1.StyleAccordionTab(_accordion_tab_1.KnownTabs.Type, 'DashboardWebStringId.Type', this.getTypeWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [
                _gauge_item_1.showGaugeCaptions
            ])),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Layout', _shared_composers_1.SharedComposers.getContentArrangementWrapper(model))
        ];
        return result;
    }
    getTypeWrapper(model) {
        return new _container_type_selector_1.ContainerTypeSelector({
            'CircularFull': { displayName: 'DashboardWebStringId.Gauge.Type.FullQuarterGauge', icon: 'dx-dashboard-gauge-circular-full', group: 'Circular' },
            'CircularHalf': { displayName: 'DashboardWebStringId.Gauge.Type.HalfCircular', icon: 'dx-dashboard-gauge-circular-half', group: 'Circular' },
            'CircularQuarterLeft': { displayName: 'DashboardWebStringId.Gauge.Type.LeftQuarterCircular', icon: 'dx-dashboard-gauge-circular-left-quarter', group: 'Circular' },
            'CircularQuarterRight': { displayName: 'DashboardWebStringId.Gauge.Type.RightQuarterCircular', icon: 'dx-dashboard-gauge-circular-right-quarter', group: 'Circular' },
            'CircularThreeFourth': { displayName: 'DashboardWebStringId.Gauge.Type.ThreeFourthCircular', icon: 'dx-dashboard-gauge-circular-three-fourth', group: 'Circular' },
            'LinearHorizontal': { displayName: 'DashboardWebStringId.Gauge.Type.LinearHorizontal', icon: 'dx-dashboard-gauge-linear-horizontal', group: 'Linear' },
            'LinearVertical': { displayName: 'DashboardWebStringId.Gauge.Type.LinearVertical', icon: 'dx-dashboard-gauge-linear-vertical', group: 'Linear' }
        }, model.viewType);
    }
}
exports.GaugeItemPropertiesComposer = GaugeItemPropertiesComposer;
