﻿/**
* DevExpress Dashboard (_tab-page-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTabPagePropertiesComposer = void 0;
const model_1 = require("../../../model");
const _interactivity_options_1 = require("../../../model/items/options/metadata/_interactivity-options");
const _dashboard_tab_page_1 = require("../../../model/items/tab-container-item/metadata/_dashboard-tab-page");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
class DashboardTabPagePropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(tabPage, args) {
        const objectPropertiesWrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: tabPage,
            properties: [
                _base_metadata_1.name_ViewModel,
                _dashboard_tab_page_1.showItemAsTabPage,
                {
                    container: model_1._tabItemInteractivityOptions,
                    properties: [
                        _interactivity_options_1.isMasterFilterDefaultTrue,
                        _interactivity_options_1.ignoreMasterFiltersDefaultFalse
                    ]
                }
            ]
        });
        return [new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options', objectPropertiesWrapper)];
    }
}
exports.DashboardTabPagePropertiesComposer = DashboardTabPagePropertiesComposer;
