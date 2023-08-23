﻿/**
* DevExpress Dashboard (_card-item-surface.js)
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
exports.CardItemSurface = void 0;
const ko = require("knockout");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const card_item_format_rule_1 = require("../../../model/format-rules/card-item-format-rule");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const card_1 = require("../../../model/items/card/card");
const card_layout_template_1 = require("../../../model/items/card/card-layout-template");
const legacy_settings_1 = require("../../../viewer-parts/legacy-settings");
const _format_rule_surface_1 = require("../../conditional-formatting/items/surfaces/_format-rule-surface");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _display_name_provider_1 = require("../../_display-name-provider");
const _card_element_properties_composer_1 = require("../properties-composers/_card-element-properties-composer");
const _card_item_properties_composer_1 = require("../properties-composers/_card-item-properties-composer");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _delta_numeric_format_surface_1 = require("./_delta-numeric-format-surface");
const _edit_card_template_surface_1 = require("./_edit-card-template-surface");
class CardItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
        this._editRuleHandler = (selection, args, container) => {
            var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
            surface.startEditing(args);
        };
    }
    addConditionalFormattingOptions(tabs, dataItem) {
        if (dataItem && dataItem.uniqueName()) {
            tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(this.dashboardItem, () => {
                let rule = new card_item_format_rule_1.CardItemFormatRule();
                rule.dataItemName(dataItem.uniqueName());
                return rule;
            }, (rule) => {
                if (rule instanceof card_item_format_rule_1.CardItemFormatRule) {
                    return rule.dataItemName() === dataItem.uniqueName();
                }
                return false;
            }, this._editRuleHandler)));
        }
    }
    extendHiddenMeasuresTabs(tabs, model) {
        this.addConditionalFormattingOptions(tabs, model);
    }
    fillSections() {
        var applyTemplateToAllCards = (template) => {
            this.applyLayoutTemplateToAllCards(template);
        };
        var sectionInfo = {
            title: 'DashboardWebStringId.Binding.Cards',
            bindingProperty: {
                propertyName: 'cards',
                groupName: 'Card',
                emptyPlaceholder: 'DashboardWebStringId.Binding.AddCard',
                selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureCard',
                creator: (itemType = 'Card') => {
                    var card = new card_1.Card(this.dashboardItem, { '@ItemType': itemType });
                    var defaultTemplate;
                    if (legacy_settings_1.LegacySettings._useCardLegacyLayout) {
                        defaultTemplate = new card_layout_template_1.CardEmptyLayoutTemplate();
                    }
                    else {
                        defaultTemplate = new card_layout_template_1.CardStretchedLayoutTemplate();
                        defaultTemplate._resetToDefaults();
                    }
                    card.layoutTemplate(defaultTemplate);
                    return card;
                },
                dataItemType: 'Measure',
                fieldConstraint: (dataField) => !_data_field_1.DataField.isMeasure(dataField) || _data_field_1.DataField.isNumeric(dataField)
            },
            detailsPropertiesComposer: new _card_element_properties_composer_1.CardElementPropertiesComposer(this._dataItemContainerCustomization, (model) => {
                var surface = new _edit_card_template_surface_1.EditCardTemplateSurface(model, this.propertiesController, this.dashboardItem.seriesDimensions().map(dim => _display_name_provider_1.getDataItemDisplayName(this._dataSourceBrowser, this.dashboardItem, dim)), applyTemplateToAllCards);
                surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
            }, (model) => {
                var surface = new _delta_numeric_format_surface_1.DeltaNumericFormatSurface(model, this.propertiesController);
                surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
            }, applyTemplateToAllCards, (selection, args, container) => {
                var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
                surface.startEditing(args);
            })
        };
        this.dataSections.push(new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, this.dashboardItem, sectionInfo, ko.computed(() => !this.dashboardItem.cards().length && (!!this.dashboardItem.seriesDimensions().length || (!!this.dashboardItem.sparklineArgument() && !!this.dashboardItem.sparklineArgument().uniqueName())))));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.SeriesDimension, this.addConditionalFormattingOptions.bind(this)));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.SparklineArgument,
            fieldConstraint: (dataField) => {
                return _data_field_1.DataField.isContinous(dataField);
            }
        }));
    }
    getPropertiesComposer() {
        return new _card_item_properties_composer_1.CardItemPropertiesComposer(this._dashboardItemCustomization, this._editRuleHandler);
    }
    applyLayoutTemplateToAllCards(template) {
        this.dashboardItem.cards().forEach(card => {
            if (ko.unwrap(card.layoutTemplate) !== ko.unwrap(template)) {
                card.layoutTemplate(template.clone());
            }
        });
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], CardItemSurface.prototype, "applyLayoutTemplateToAllCards", null);
exports.CardItemSurface = CardItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Card', CardItemSurface);
