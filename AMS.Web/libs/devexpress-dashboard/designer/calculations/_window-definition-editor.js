﻿/**
* DevExpress Dashboard (_window-definition-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windowDefinitionEditor = exports.WindowDefinitionEditor = exports.WindowDefinitionMode = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const data_item_1 = require("../../model/data-item/data-item");
const specific_calc_window_definition_1 = require("../../model/data-item/window-definition/specific-calc-window-definition");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
const _form_adapter_editors_1 = require("../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const _display_name_provider_1 = require("../_display-name-provider");
var WindowDefinitionMode;
(function (WindowDefinitionMode) {
    WindowDefinitionMode[WindowDefinitionMode["Predefined"] = 0] = "Predefined";
    WindowDefinitionMode[WindowDefinitionMode["Specific"] = 1] = "Specific";
})(WindowDefinitionMode = exports.WindowDefinitionMode || (exports.WindowDefinitionMode = {}));
class WindowDefinitionEditor {
    constructor(windowDefinition, _params) {
        this._params = _params;
        this.mode = ko.observable(null);
        this.value = windowDefinition.windowDefinition;
        if (this.value() instanceof specific_calc_window_definition_1.SpecificWindowDefinition) {
            this.mode(WindowDefinitionMode.Specific);
            let definition = this.value();
            definition._dimensionsInfoPatcher = WindowDefinitionEditor.createPatchSpecificWindowDimensionsInfo(definition, _params.dataDashboardItem, _params.dataSourceBrowser);
        }
        else {
            this.mode(WindowDefinitionMode.Predefined);
        }
        this.mode.subscribe(this.setValue, this);
        this.formAdapterWrapper = ko.pureComputed(() => {
            if (this.value()) {
                return new _object_properties_wrapper_1.ObjectPropertiesWrapper({ model: this.value(), properties: this.value().getInfo() });
            }
        });
    }
    get dataSource() {
        return [
            { value: WindowDefinitionMode.Predefined, displayValue: 'DashboardWebStringId.Calculations.WindowDefinitionModePredefined' },
            { value: WindowDefinitionMode.Specific, displayValue: 'DashboardWebStringId.Calculations.WindowDefinitionModeSpecific' }
        ];
    }
    setValue(newMode) {
        if (newMode === WindowDefinitionMode.Predefined) {
            this.value(this._params.dataDashboardItem._getDefaultCalculationWindowDefinition());
        }
        else {
            var windowDefinition = new specific_calc_window_definition_1.SpecificWindowDefinition();
            windowDefinition._dimensionsInfoPatcher = WindowDefinitionEditor.createPatchSpecificWindowDimensionsInfo(windowDefinition, this._params.dataDashboardItem, this._params.dataSourceBrowser);
            this.value(windowDefinition);
        }
    }
}
WindowDefinitionEditor.createPatchSpecificWindowDimensionsInfo = (definition, dataDashboardItem, dataSourceBrowser) => (propertyInfo) => {
    var lookupValueFromDimension = (d) => {
        return {
            value: d.uniqueName(),
            displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dataDashboardItem, d)
        };
    };
    var allDimensions = dataDashboardItem._dimensions.map(lookupValueFromDimension);
    var getAvailableDimensions = () => {
        return dataDashboardItem._dimensions
            .filter(d => !definition.dimensions().some(wd => wd.uniqueName() === d.uniqueName()))
            .map(lookupValueFromDimension);
    };
    const editorOptions = {
        dataFields: ['uniqueName'],
        gridColumns: [{
                dataField: 'uniqueName',
                lookup: {
                    displayExpr: 'displayValue',
                    valueExpr: 'value',
                },
                calculateDisplayValue: (gridRow) => {
                    const dimension = allDimensions.filter(d => d.value === gridRow.uniqueName)[0];
                    return dimension && dimension.displayValue || gridRow.uniqueName;
                }
            }],
        enableAddItem: () => !!getAvailableDimensions().length,
        noDataText: 'DashboardWebStringId.CollectionEditor.NoItems',
        createNewItemHandler: () => {
            if (getAvailableDimensions().length > 0) {
                return new data_item_1.DataItemLink(dataDashboardItem, { '@DefaultId': getAvailableDimensions()[0].value });
            }
        },
        customizeInlineEditor: (e) => {
            const uniqueName = e.row && e.row.data && e.row.data.uniqueName;
            const availableDimensions = getAvailableDimensions();
            if (availableDimensions.filter(d => d.value === uniqueName).length) {
                e.editorOptions.dataSource = availableDimensions;
            }
            else {
                e.editorOptions.dataSource = allDimensions
                    .filter(d => d.value === uniqueName)
                    .concat(availableDimensions);
            }
        },
    };
    return Object.assign(Object.assign({}, propertyInfo), { formAdapterItem: _form_adapter_editors_1.inlineEditCollectionEditor(editorOptions) });
};
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], WindowDefinitionEditor.prototype, "setValue", null);
exports.WindowDefinitionEditor = WindowDefinitionEditor;
const windowDefinitionEditor = params => context => {
    return {
        template: (args, itemElement) => {
            const windowDefinition = args.component.option('formData')[args.dataField];
            var viewModel = new WindowDefinitionEditor(windowDefinition, params);
            ko.applyBindingsToNode(_jquery_helpers_1.$unwrap(itemElement), { template: { name: 'dx-dashboard-window-definition-editor', data: viewModel } }, context.bindingContext);
        }
    };
};
exports.windowDefinitionEditor = windowDefinitionEditor;
