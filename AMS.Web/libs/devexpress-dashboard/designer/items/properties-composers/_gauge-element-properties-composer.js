﻿/**
* DevExpress Dashboard (_gauge-element-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeElementPropertiesComposer = void 0;
const _default_1 = require("../../../data/localization/_default");
const gauge_1 = require("../../../model/items/gauge/gauge");
const _gauge_1 = require("../../../model/items/gauge/metadata/_gauge");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class GaugeElementPropertiesComposer extends _base_properties_composer_1.DataItemContainerPropertiesComposer {
    constructor(customizeHandler, editFormatHandler = (model) => { }) {
        super(customizeHandler);
        this.editFormatHandler = editFormatHandler;
    }
    _composeTabsCore(model, args) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options', this.getCommonWrapper(model, args.dashboardItem, args.dataSourceBrowser)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ScaleOptions, 'DashboardWebStringId.Gauge.ScaleOptions', this.getScaleWrapper(model))
        ];
        if (model instanceof gauge_1.Gauge) {
            result.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaOptions, 'DashboardWebStringId.Grid.DeltaOptions', _shared_composers_1.SharedComposers.getDeltaOptionsWrapper(model.deltaOptions)));
            var wrapper = _shared_composers_1.SharedComposers.getDeltaFormatsOptionsWrapper(model, this.editFormatHandler, { title: _default_1.getLocalizationById('DashboardStringId.GaugeScaleLabelFormatCaption'), numericFormat: model.scaleLabelNumericFormat });
            var formatsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.NumericFormat, 'DashboardWebStringId.CardLayout.Editor.FormatOptions', wrapper);
            result.push(formatsTab);
        }
        return result;
    }
    getCommonWrapper(model, dashboardItem, dataSourceBrowser) {
        var properties = [
            Object.assign({ editorOptions: { placeholder: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, model) } }, _base_metadata_1.name),
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: null
        });
    }
    getScaleWrapper(model) {
        var disabledRules = {};
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                Object.assign(Object.assign({}, _gauge_1.minimum), { formAdapterItem: _form_adapter_editors_1.nullableNumberBoxEditor({}) }),
                Object.assign(Object.assign({}, _gauge_1.maximum), { formAdapterItem: _form_adapter_editors_1.nullableNumberBoxEditor({}) })
            ],
            disabledFilterRules: disabledRules
        });
    }
}
exports.GaugeElementPropertiesComposer = GaugeElementPropertiesComposer;
