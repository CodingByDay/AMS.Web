﻿/**
* DevExpress Dashboard (text-box-item-editor-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBoxItemEditorExtension = void 0;
const button_1 = require("devextreme/ui/button");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _layout_item_1 = require("../../common/docking-layout/core/_layout-item");
const _default_1 = require("../../data/localization/_default");
const model_1 = require("../../model");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _text_box_item_1 = require("../../model/items/metadata/_text-box-item");
const _display_name_provider_1 = require("../_display-name-provider");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const _textbox_item_surface_1 = require("../items/surfaces/_textbox-item-surface");
const _accordion_tab_1 = require("../properties-controller/_accordion-tab");
require("./_rich-edit-bindings");
const _text_box_item_editor_view_model_1 = require("./_text-box-item-editor-view-model");
const name = 'textBoxItemEditor';
const nameAlias = 'text-box-item-editor';
class TextBoxItemEditorExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.name = name;
        this._dashboardControl = dashboardControl;
        this._viewModel = new _text_box_item_editor_view_model_1.RichEditExtensionViewModel();
        this._customTemplate = {
            name: 'dx-dashboard-text-box-item-editor-extension',
            data: this._viewModel
        };
    }
    start() {
        this._dashboardControl.customTemplates.push(this._customTemplate);
        var contextMenuExtension = this._dashboardControl.findExtension('itemMenu');
        var propertiesPanelExtension = this._dashboardControl.findExtension('itemOptionsPanel');
        if (contextMenuExtension && propertiesPanelExtension) {
            this.toDispose(_knockout_utils_1.subscribeAndPerform(contextMenuExtension._itemContextMenu, (menu) => {
                if (menu) {
                    var customData = menu.contextMenuItems()[0].customData;
                    if (customData instanceof _textbox_item_surface_1.TextBoxItemSurface) {
                        customData.extendTabsHandler = (tabs, model, dashboardItem) => {
                            var textBoxTextProperty = Object.assign({}, _text_box_item_1.textBoxText);
                            this._extendTextBoxSerializationInfo(textBoxTextProperty, dashboardItem, this._dashboardControl._dataSourceBrowser);
                            tabs.push(new _accordion_tab_1.ContentInHeaderAccordionTab('text-box-item-rich-edit', _default_1.getLocalizationById('DashboardWebStringId.AccordionTab.Content'), new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                                model: dashboardItem,
                                properties: [
                                    textBoxTextProperty
                                ]
                            })));
                        };
                    }
                }
            }));
            this.toDispose(propertiesPanelExtension._subscribeTabsChanged((tabs, item) => {
                var dataSourceBrowser = this._dashboardControl._dataSourceBrowser;
                if (item && item instanceof model_1.TextBoxItem) {
                    var textBoxDashoardItem = item;
                    var tab = tabs.filter(tab => tab.name === _accordion_tab_1.KnownTabs.Common)[0];
                    var tabModel = tab.tabModel();
                    if (tabModel) {
                        var textProperty = tabModel._serializationInfo.filter(info => info.propertyName === 'text')[0];
                        if (textProperty) {
                            this._extendTextBoxSerializationInfo(textProperty, textBoxDashoardItem, dataSourceBrowser);
                        }
                    }
                }
            }));
        }
    }
    _extendTextBoxSerializationInfo(textProperty, textBoxDashoardItem, dataSourceBrowser) {
        textProperty.displayName = _default_1.getLocalizationById('DashboardWebStringId.AccordionTab.Content');
        textProperty.formAdapterItem = {
            template: (args) => {
                var div = document.createElement('div');
                new button_1.default(div, {
                    text: _default_1.getLocalizationById('DashboardWebStringId.TextBoxItemEditor.EditTextButton'),
                    width: '100%',
                    onClick: () => {
                        var docVariables = textBoxDashoardItem.dataItems().map(dataItem => {
                            return {
                                id: dataItem.uniqueName(),
                                displayName: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, textBoxDashoardItem, dataItem)
                            };
                        });
                        this._viewModel.show({
                            getValue: () => ko.unwrap(args.component.option('formData')[args.dataField]),
                            setValue: (v) => args.component.updateData(args.dataField, v)
                        }, docVariables, this._getDashboardItemWidth());
                    }
                });
                return div;
            }
        };
    }
    _getDashboardItemWidth() {
        var layoutController = this._dashboardControl._actualLayoutController();
        if (layoutController && layoutController.selectedLayoutItem()) {
            return layoutController.selectedLayoutItem().getWidth() - _layout_item_1.SplitterSize;
        }
        return null;
    }
    stop() {
        this._dashboardControl.customTemplates.remove(this._customTemplate);
        this.dispose();
    }
}
exports.TextBoxItemEditorExtension = TextBoxItemEditorExtension;
control_options_1.extensionNameMap[nameAlias] = name;
