﻿/**
* DevExpress Dashboard (_image-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageItemPropertiesComposer = void 0;
const _image_item_1 = require("../../../model/items/metadata/_image-item");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ImageItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    _composeTabsCore(model, args) {
        throw new Error('Method not implemented.');
    }
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    composeTabs(model) {
        let visibilityRules = {};
        visibilityRules[_image_item_1.image64.propertyName] = (m) => m.imageType() == 'embedded';
        visibilityRules[_image_item_1.urlPath.propertyName] = (m) => m.imageType() == 'linked';
        let specificProperties = [
            _image_item_1.sizeMode,
            _image_item_1.horizontalAlignment,
            _image_item_1.verticalAlignment,
            _image_item_1.imageType,
            _image_item_1.urlPath,
            Object.assign(Object.assign({}, _image_item_1.image64), { formAdapterItem: _form_adapter_editors_1.filePickerEditor({ placeholderId: 'Image', accept: 'image/*', type: 'img' }) })
        ];
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.ImageOptions', _shared_composers_1.SharedComposers.getCommonWrapper(model, specificProperties, {}, visibilityRules))
        ];
    }
}
exports.ImageItemPropertiesComposer = ImageItemPropertiesComposer;
