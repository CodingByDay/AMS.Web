﻿/**
* DevExpress Dashboard (_card-element-properties-composer.js)
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
exports.CardElementPropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const card_item_delta_format_rule_1 = require("../../../model/format-rules/card-item-delta-format-rule");
const _dashboard_item_format_rule_1 = require("../../../model/format-rules/metadata/_dashboard-item-format-rule");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const card_1 = require("../../../model/items/card/card");
const card_layout_template_1 = require("../../../model/items/card/card-layout-template");
const _card_1 = require("../../../model/items/card/metadata/_card");
const _card_row_1 = require("../../../model/items/card/metadata/_card-row");
const _data_dashboard_item_1 = require("../../../model/items/metadata/_data-dashboard-item");
const _sparkline_options_1 = require("../../../model/items/options/metadata/_sparkline-options");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class CardElementPropertiesComposer extends _base_properties_composer_1.DataItemContainerPropertiesComposer {
    constructor(customizeHandler, editTemplateHandler = (model) => { }, editFormat = (model) => { }, applyTemplateToAllCards = (template) => { }, editRuleHandler = () => { }) {
        super(customizeHandler);
        this.editTemplateHandler = editTemplateHandler;
        this.editFormat = editFormat;
        this.applyTemplateToAllCards = applyTemplateToAllCards;
        this.editRuleHandler = editRuleHandler;
    }
    _composeTabsCore(model, args) {
        var commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options', this.getCommonWrapper(model, args.dashboardItem, args.dataSourceBrowser)), deltaTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaOptions, 'DashboardWebStringId.Grid.DeltaOptions'), sparklineTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.SparklineOptions, 'DashboardWebStringId.Card.SparklineOptions', this.getSparklineWrapper(model)), templatesTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.CardTemplates, 'DashboardWebStringId.CardLayout.Editor.CardLayout'), deltaFormatsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DeltaFormats, 'DashboardWebStringId.CardLayout.Editor.FormatOptions'), conditionalFormattingTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting'), result = [commonTab, templatesTab, deltaTab, sparklineTab, deltaFormatsTab, conditionalFormattingTab];
        if (model instanceof card_1.Card) {
            ko.computed(() => {
                deltaTab.tabModel(_shared_composers_1.SharedComposers.getDeltaOptionsWrapper(model._isTypeEmpty() ? model.deltaOptions : model.cardDeltaOptions));
            });
            conditionalFormattingTab.tabModel(this.getFormatRulesWrapper(model, args.dashboardItem));
            this.fillTemplatesTab(templatesTab, model);
            deltaFormatsTab.tabModel(_shared_composers_1.SharedComposers.getDeltaFormatsOptionsWrapper(model, this.editFormat));
        }
        return result;
    }
    getCommonWrapper(model, dashboardItem, dataSourceBrowser) {
        var properties = [
            Object.assign({ editorOptions: { placeholder: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, model) } }, _base_metadata_1.name)
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: null
        });
    }
    getSparklineWrapper(model) {
        var properties = _shared_composers_1.SharedComposers.getSparklineOptionsProperties();
        var disabledRules = {};
        disabledRules[_sparkline_options_1.viewType.propertyName] = [_card_1.showSparkline.propertyName, '=', false];
        disabledRules[_sparkline_options_1.highlightMinMaxPoints.propertyName] = [_card_1.showSparkline.propertyName, '=', false];
        disabledRules[_sparkline_options_1.highlightStartEndPoints.propertyName] = [_card_1.showSparkline.propertyName, '=', false];
        var visibilityRules = {};
        visibilityRules[_card_1.showSparkline.propertyName] = () => model._isTypeEmpty();
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                _card_1.showSparkline,
                {
                    container: _card_row_1.cardSparklineRowOptions,
                    properties: properties
                }
            ],
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibilityRules
        });
    }
    fillTemplatesTab(tab, card) {
        var availableTemplates = ko.computed(() => this.getAvailableTemplates(card));
        var selectedTemplate = ko.computed({
            read: () => {
                return card.layoutTemplate();
            },
            write: (newTemplate) => {
                this.switchTemplate(card, newTemplate);
            }
        });
        const singleChoiceEditorOptions = {
            propertyName: 'title',
            dataSource: availableTemplates(),
            enableEditItem: (item) => !(item instanceof card_layout_template_1.CardEmptyLayoutTemplate),
            editItemHandler: this.editTemplateHandler,
            customToolbarItems: [{
                    name: _default_1.getLocalizationById('DashboardWebStringId.CardLayout.ApplyToAllCards'),
                    icon: '#dx-dashboard-template-to-all-cards',
                    action: () => { this.applyTemplateToAllCards(selectedTemplate()); }
                }],
        };
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: { layoutTemplates: selectedTemplate },
            properties: [{
                    formAdapterItem: _form_adapter_editors_1.editableListEditor(singleChoiceEditorOptions),
                    propertyName: 'layoutTemplates'
                }]
        }));
    }
    switchTemplate(card, newTemplate) {
        var templateChanged = (newTemplate) => {
            return card.layoutTemplate().getType() !== newTemplate.getType();
        };
        if (templateChanged(newTemplate)) {
            card._setTemplateSwitchingOptions(newTemplate);
        }
    }
    getAvailableTemplates(card) {
        var result = [];
        var currentTemplateAdded = false;
        var currentTemplate = card.layoutTemplate();
        var addTemplate = (templateClass) => {
            var templateInstance = new templateClass();
            if (templateInstance.getType() === currentTemplate.getType()) {
                result.push(currentTemplate);
                currentTemplateAdded = true;
            }
            else {
                templateInstance._resetToDefaults();
                result.push(templateInstance);
            }
        };
        addTemplate(card_layout_template_1.CardStretchedLayoutTemplate);
        addTemplate(card_layout_template_1.CardCenteredLayoutTemplate);
        addTemplate(card_layout_template_1.CardCompactLayoutTemplate);
        addTemplate(card_layout_template_1.CardLightweightLayoutTemplate);
        if (!currentTemplateAdded) {
            result.push(currentTemplate);
        }
        return result;
    }
    getFormatRulesWrapper(model, dashboardItem) {
        var collectionEditorOptions = {
            propertyName: _dashboard_item_format_rule_1.classCaption.propertyName,
            createNewItemHandler: () => {
                var rule = new card_item_delta_format_rule_1.CardItemDeltaFormatRule();
                rule.cardId(model._getDataId());
                return rule;
            },
            editItemHandler: this.editRuleHandler,
            visibleItemsFilter: (rule) => (rule instanceof card_item_delta_format_rule_1.CardItemDeltaFormatRule) && rule.cardId() === model._getDataId(),
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dashboardItem,
            properties: [Object.assign(Object.assign({}, _data_dashboard_item_1.formatRules), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })]
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], CardElementPropertiesComposer.prototype, "switchTemplate", null);
exports.CardElementPropertiesComposer = CardElementPropertiesComposer;
