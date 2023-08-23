﻿/**
* DevExpress Dashboard (_bound-image-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoundImageItemPropertiesComposer = void 0;
const _bound_image_item_1 = require("../../../model/items/metadata/_bound-image-item");
const _image_item_1 = require("../../../model/items/metadata/_image-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class BoundImageItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var specificDisabledRules = {};
        specificDisabledRules[_bound_image_item_1.uriPattern.propertyName] = [_bound_image_item_1.dataBindingMode.propertyName, '<>', 'Uri'];
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.ImageOptions', _shared_composers_1.SharedComposers.getCommonWrapper(model, [
                _bound_image_item_1.dataBindingMode,
                _bound_image_item_1.uriPattern,
                _image_item_1.sizeMode,
                _image_item_1.horizontalAlignment,
                _image_item_1.verticalAlignment,
            ], specificDisabledRules))
        ];
        return result;
    }
}
exports.BoundImageItemPropertiesComposer = BoundImageItemPropertiesComposer;
