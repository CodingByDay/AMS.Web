﻿/**
* DevExpress Dashboard (accordion-tab-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._customizeTabs = void 0;
const custom_properties_metadata_1 = require("../model/custom-properties/custom-properties-metadata");
const _object_properties_wrapper_1 = require("./form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("./properties-controller/_accordion-tab");
const CustomTabOrderNo = 500000;
function _customizeTabs(tabs, customSectionOption, object) {
    customSectionOption.items.forEach(item => {
        if (item.dataField && !custom_properties_metadata_1._customMetadataContainsProperty(item.dataField) && !object.customProperties._isKnownProperty(item.dataField)) {
            console.warn(`You cannot create an editor for the '${item.dataField}' because the custom property with this name is not registered. First, pass the corresponding custom property options to the registerCustomProperty method.`);
        }
    });
    if (customSectionOption.items.some(formOption => !!object.customProperties._isKnownProperty(formOption.dataField))) {
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: object.customProperties,
            properties: customSectionOption.items.map(formItem => {
                return {
                    propertyName: formItem.dataField,
                    dxFormItem: formItem
                };
            })
        });
        wrapper.onContentReady = customSectionOption.onContentReady;
        wrapper.onInitialized = customSectionOption.onInitialized;
        wrapper.onFieldDataChanged = customSectionOption.onFieldDataChanged;
        var tab = new _accordion_tab_1.AccordionTab(customSectionOption.title, customSectionOption.title, wrapper);
        tab.orderNo = CustomTabOrderNo;
        tabs.push(tab);
    }
}
exports._customizeTabs = _customizeTabs;
