﻿/**
* DevExpress Dashboard (color-scheme-editor-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardColorSchemeEditorExtension = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _default_1 = require("../../data/localization/_default");
const color_1 = require("../../model/color");
const _dimension_1 = require("../../model/data-item/metadata/_dimension");
const _coloring_options_1 = require("../../model/items/options/metadata/_coloring-options");
const _dashboard_item_coloring_options_1 = require("../../model/items/options/metadata/_dashboard-item-coloring-options");
const _display_name_provider_1 = require("../_display-name-provider");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../properties-controller/_accordion-tab");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const _color_picker_model_1 = require("./internal/_color-picker-model");
const _color_scheme_model_1 = require("./internal/_color-scheme-model");
const _color_tree_view_model_1 = require("./internal/_color-tree-view-model");
const _entry_editor_model_1 = require("./internal/_entry-editor-model");
const name = 'dashboardColorSchemeEditor';
const nameAlias = 'dashboard-color-scheme-editor';
class DashboardColorSchemeEditorExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._subscriptions = [];
        this.selected = ko.observable(false);
        this._colorSchemeModel = ko.observable();
        this._colorPalette = ko.observableArray();
        this._entryEditorModel = new _entry_editor_model_1.EntryEditorViewModel(this._colorPalette);
        this._colorPickerModel = ko.computed(() => new _color_picker_model_1.ColorPickerModel(this._colorSchemeModel(), this._colorPalette));
        this._selectedEntry = ko.observable();
        this._createNewEntry = () => {
            this._colorSchemeModel().initNewEntry();
            this._entryEditorModel.editEntry(this.dataSourceBrowserExtension._dataSourceBrowserViewModel().dataSourceBrowser, this._colorSchemeModel().newEntry(), this._colorSchemeModel().selectedSignatures()[0].colorByMeasures, this._colorSchemeModel().getAvailableMeasureKeys(), editedEntry => this._colorSchemeModel().updateEntry(undefined, editedEntry), false);
        };
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardMenuColorScheme', 250, 0);
        this._menuItem.template = 'dx-dashboard-form-color-scheme';
        this._menuItem.data = {
            colorSchemeModel: this._colorSchemeModel,
            selectedEntry: this._selectedEntry,
            entryEditorModel: this._entryEditorModel,
            colorPickerModel: this._colorPickerModel,
            createNewEntry: this._createNewEntry,
            colorPalette: this._colorPalette,
            getDataSourceName: (dataSourceId) => {
                if (this.dashboardControl.dashboard() && this.dashboardControl.dashboard().dataSources()) {
                    let dataSource = this.dashboardControl.dashboard().dataSources().filter(dataSource => dataSource.componentName() === dataSourceId)[0];
                    if (dataSource)
                        return dataSource.name();
                }
                return dataSourceId;
            }
        };
        this._menuItem.disabled = ko.computed(() => !dashboardControl.dashboard());
    }
    static _isColoringSupported(item) {
        return !!item['coloringOptions'];
    }
    _updateExtensionModel() {
        if (!!this.dashboardControl.dashboard() && this.dashboardControl.isDesignMode()) {
            !!this.dashboardControl._serviceClient() && this.dashboardControl._serviceClient().getDashboardPalette().done(palette => {
                this._colorPalette(analytics_utils_1.deserializeArray(palette, (colorModel) => new color_1.Color(colorModel['#text']))());
            });
            this._colorSchemeModel(new _color_scheme_model_1.ColorSchemeModel(this.dashboardControl.dashboard(), this.dashboardControl._serviceClient() && this.dashboardControl._serviceClient().getColoringScheme || null, this.dashboardControl._updateHub));
        }
        else {
            this._colorSchemeModel(null);
        }
    }
    start() {
        this._propertiesPanelExtension = this.dashboardControl.findExtension('itemOptionsPanel');
        this.dataSourceBrowserExtension = this.dashboardControl.findExtension('dataSourceBrowser');
        var toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.push(this._menuItem);
        }
        this._subscriptions.push(this.dashboardControl.dashboard.subscribe(this._updateExtensionModel, this));
        this._subscriptions.push(this.dashboardControl.isDesignMode.subscribe(this._updateExtensionModel, this));
        this._subscriptions.push(this._selectedEntry.subscribe((entry) => {
            if (entry == null) {
                this._entryEditorModel.close();
            }
            else {
                this._entryEditorModel.editEntry(this.dataSourceBrowserExtension._dataSourceBrowserViewModel().dataSourceBrowser, entry, this._colorSchemeModel().selectedSignatures()[0].colorByMeasures, this._colorSchemeModel().getAvailableMeasureKeys(), editedEntry => this._colorSchemeModel().updateEntry(entry, editedEntry), this._colorSchemeModel().isEntryAutogenerated(entry));
            }
        }));
        ko.computed(() => {
            var model = this._colorSchemeModel();
            if (model) {
                this._subscriptions.push(model.selectedSignatures.subscribe(v => {
                    this._entryEditorModel.close();
                    model.newEntry(null);
                }));
            }
        });
        var oldColoringComputed = null;
        if (!!this._propertiesPanelExtension) {
            this._subscriptions.push(this._propertiesPanelExtension._subscribeTabsChanged(tabs => {
                oldColoringComputed && oldColoringComputed.dispose();
                var item = this.dashboardControl._actualLayoutController() && this.dashboardControl._actualLayoutController().selectedDashboardItem() || null;
                if (item && DashboardColorSchemeEditorExtension._isColoringSupported(item)) {
                    var coloringTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ColoringOptions, 'DashboardWebStringId.ColoringOptions');
                    tabs.push(coloringTab);
                    oldColoringComputed = ko.computed(() => {
                        coloringTab.tabModel(this._getColoringWrapper(item));
                    });
                    this._subscriptions.push(oldColoringComputed);
                    tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ColorScheme, 'DashboardWebStringId.DashboardMenuColorScheme', this._getColorSchemeWrapper(item)));
                }
            }));
        }
        this._updateExtensionModel();
    }
    stop() {
        this._subscriptions.forEach(s => s.dispose());
        this._subscriptions = [];
        var toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.remove(this._menuItem);
        }
    }
    _getColorSchemeWrapper(model) {
        ko.computed(() => {
            if (!!this._colorSchemeModel())
                this._colorSchemeModel().selectedSignatures([model._getColoringSignatureOnCurrentDrillDownLevel()]);
        });
        var artificialModel = {
            colorSchemeModel: this._colorSchemeModel(),
            coloringOptions: model.coloringOptions
        };
        var properties = [{
                propertyName: 'colorSchemeModel',
                formAdapterItem: _color_tree_view_model_1.colorSchemeTreeViewEditor({
                    dataSource: this._colorSchemeModel().selectedSignatureEntries,
                    editColor: (entry, event) => {
                        this._colorPickerModel().init(entry, event.target);
                    },
                    colorPalette: this._colorPalette,
                    colorPickerModel: this._colorPickerModel,
                }),
            }, {
                container: _coloring_options_1.coloringOptions,
                properties: [_dashboard_item_coloring_options_1.useGlobalColors]
            }];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: artificialModel,
            properties: properties
        });
    }
    _getColoringWrapper(model) {
        var allColorsModel = {
            measuresColoringMode: model.coloringOptions.measuresColoringMode,
            getInfo: () => []
        };
        var properties = [];
        var addColoringOptions = (item, arr, prefixId) => {
            var prefix = _default_1.getLocalizationById(prefixId);
            arr.forEach(arg => {
                if (arg.dataItem()) {
                    allColorsModel[arg.uniqueName()] = arg.dataItem().coloringMode;
                    properties.push({
                        propertyName: arg.uniqueName(),
                        displayName: prefix + ' - ' + _display_name_provider_1.getDataItemDisplayName(this.dashboardControl._dataSourceBrowser, item, arg.dataItem()),
                        simpleFormAdapterItem: 'buttonGroupEditor',
                        values: _dimension_1.coloringMode.values
                    });
                }
            });
        };
        var addItemColoringOptions = (itemsInfo) => {
            itemsInfo.forEach(itemInfo => addColoringOptions(model, itemInfo.items, itemInfo.prefixId));
        };
        addItemColoringOptions(model._getColorizableDataItemsInfo());
        if (model._canColorByMeasures) {
            properties.push(_dashboard_item_coloring_options_1.measuresColoringMode);
        }
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: allColorsModel,
            properties: properties
        });
    }
}
exports.DashboardColorSchemeEditorExtension = DashboardColorSchemeEditorExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DashboardColorSchemeEditorExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
