﻿/**
* DevExpress Dashboard (_map-custom-shapefile-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCustomShapefilePropertiesComposer = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _custom_shape_file_1 = require("../../../model/items/map/metadata/_custom-shape-file");
const _custom_shape_file_data_1 = require("../../../model/items/map/metadata/_custom-shape-file-data");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
class MapCustomShapefilePropertiesComposer {
    composeTabs(model) {
        var layoutsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.CustomMapOptions, 'DashboardWebStringId.Map.CustomMapOptions');
        this.fillLayoutsTab(layoutsTab, model);
        return [layoutsTab];
    }
    fillLayoutsTab(tab, model) {
        var switcherInfo = {
            propertyName: 'switcher', displayName: 'DashboardWebStringId.Map.CustomMapOptionsSource', defaultVal: !!model.data.shapeData() ? 'file' : 'url', simpleFormAdapterItem: 'buttonGroupEditor', valuesArray: [
                { value: 'url', displayValue: 'DashboardWebStringId.Map.CustomMapOptionsUrl' },
                { value: 'file', displayValue: 'DashboardWebStringId.Map.CustomMapOptionsFile' }
            ]
        };
        var visibilityRules = {};
        visibilityRules[_custom_shape_file_1.customShapefileUrl.propertyName] = [switcherInfo.propertyName, '=', 'url'];
        visibilityRules[_custom_shape_file_data_1.shapeData.propertyName] = visibilityRules[_custom_shape_file_data_1.attributeData.propertyName] = [switcherInfo.propertyName, '=', 'file'];
        var disabilityRules = {};
        disabilityRules[_custom_shape_file_data_1.attributeData.propertyName] = [[_custom_shape_file_data_1.shapeData.propertyName, '=', _custom_shape_file_data_1.shapeData.defaultVal], 'or', [_custom_shape_file_data_1.shapeData.propertyName, '=', '']];
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: _jquery_helpers_1.extend(model, {
                switcher: ko.observable(switcherInfo.defaultVal)
            }),
            properties: [
                switcherInfo,
                _custom_shape_file_1.customShapefileUrl,
                {
                    container: _custom_shape_file_1.customShapefileData,
                    properties: [Object.assign(Object.assign({}, _custom_shape_file_data_1.shapeData), { formAdapterItem: _form_adapter_editors_1.filePickerEditor({
                                type: 'file',
                                accept: '.shp',
                                placeholderId: 'DashboardWebStringId.Map.ShapeFileLoaded',
                                showClearButton: true,
                                readMode: undefined
                            }) }), Object.assign(Object.assign({}, _custom_shape_file_data_1.attributeData), { formAdapterItem: _form_adapter_editors_1.filePickerEditor({
                                type: 'file',
                                accept: '.dbf',
                                placeholderId: 'DashboardWebStringId.Map.AttributeFileLoaded',
                                showClearButton: true,
                                readMode: undefined
                            }) })]
                }
            ],
            visibilityFilterRules: visibilityRules,
            disabledFilterRules: disabilityRules
        }));
    }
}
exports.MapCustomShapefilePropertiesComposer = MapCustomShapefilePropertiesComposer;
