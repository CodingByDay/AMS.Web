﻿/**
* DevExpress Dashboard (_card-layout-template-properties-composer.js)
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
exports.CardTemplatePropertiesComposer = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const _card_layout_1 = require("../../../model/items/card/metadata/_card-layout");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _collection_editor_viewmodel_base_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel-base");
class CardTemplatePropertiesComposer {
    composeTabs(model, args) {
        if (args.applyTemplateToAllCards === undefined)
            args.applyTemplateToAllCards = (template) => { };
        var layoutsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.CardTemplateSettings, 'DashboardWebStringId.CardLayout.LayoutOptions');
        this.fillLayoutsTab(layoutsTab, model, args.dimensionNames, args.applyTemplateToAllCards);
        return [layoutsTab];
    }
    fillLayoutsTab(tab, template, dimensionNames, applyTemplateToAllCards) {
        const refreshCallback = new _collection_editor_viewmodel_base_1.CollectionEditorRefreshCallback();
        const propertiesList = template._collectProperties(dimensionNames);
        const subscriptions = propertiesList.map(item => _knockout_utils_1.safeSubscribe({ checked: item.checked, selectedItem: item.selectedItem || (() => { }) }, () => refreshCallback.refresh()));
        const collectionEditorOptions = {
            dataFields: ['checked', 'title', 'selectedItem', 'lookupDataSource'],
            isToolbarVisible: false,
            gridColumns: [{
                    dataField: 'checked',
                    dataType: 'boolean',
                    width: 40,
                }, {
                    dataField: 'selectedItem',
                    calculateDisplayValue: (rowData) => rowData.title,
                    lookup: {
                        displayExpr: 'displayText',
                        valueExpr: 'key',
                    },
                }],
            customizeInlineEditor: (e) => {
                e.editorOptions.dataSource = e.row.data.lookupDataSource;
                if (e.dataField === 'selectedItem') {
                    var oldValueChanged = e.editorOptions.onValueChanged;
                    e.editorOptions.onValueChanged = function (ee) {
                        oldValueChanged.call(ee.component, ee);
                        setTimeout(() => e.component.saveEditData());
                    };
                }
            },
            customizeCell: (e) => {
                if (!e.isEditing && e.column.dataField === 'selectedItem' && !!e.data.lookupDataSource) {
                    var icon = _utils_1.createSvgIconElement('dx-dashboard-ce-edit');
                    const div = document.createElement('div');
                    div.appendChild(icon);
                    div.classList.add('custom-edit-icon');
                    div.classList.add('dx-dashboard-editable-cell');
                    _jquery_helpers_1.$unwrap(e.cellElement).appendChild(div);
                }
            },
            enableEditItem: (selectedItem, e) => {
                if (e.column.dataField === 'selectedItem')
                    return !!e.data.lookupDataSource;
                return true;
            },
            forceRefreshCallback: refreshCallback,
        };
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: {
                minWidth: template.minWidth,
                maxWidth: template.maxWidth,
                templateProperties: ko.observableArray(propertiesList),
                buttonsFakeProperty: {},
            },
            properties: [
                Object.assign(Object.assign({}, _card_layout_1.minWidth), { formAdapterItem: _form_adapter_editors_1.numberBoxEditor({ min: 1, format: '0#' }) }),
                Object.assign(Object.assign({}, _card_layout_1.maxWidth), { formAdapterItem: _form_adapter_editors_1.nullableNumberBoxEditor({ defaultValue: 200, editorOptions: { min: 1, format: '0#' } }) }),
                {
                    formAdapterItem: _form_adapter_editors_1.inlineEditCollectionEditor(collectionEditorOptions),
                    propertyName: 'templateProperties',
                }, {
                    propertyName: 'buttonsFakeProperty',
                    formAdapterItem: _form_adapter_editors_1.actionButtons([
                        {
                            text: analytics_internal_1.localize('DashboardWebStringId.CardLayout.ResetTemplate'),
                            onClick: () => this.resetTemplate(template),
                            elementAttr: { class: 'dx-dashboard-card-template-reset-button' }
                        },
                        {
                            text: analytics_internal_1.localize('DashboardWebStringId.CardLayout.ApplyToAllCards'),
                            onClick: () => applyTemplateToAllCards(template),
                            elementAttr: { class: 'dx-dashboard-card-template-apply-all-button' }
                        }
                    ]),
                }
            ],
            disposableModelSubscriptions: subscriptions,
        }));
    }
    resetTemplate(template) {
        template._resetToDefaults();
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], CardTemplatePropertiesComposer.prototype, "resetTemplate", null);
exports.CardTemplatePropertiesComposer = CardTemplatePropertiesComposer;
