﻿/**
* DevExpress Dashboard (_cards-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsItem = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _style_settings_provider_1 = require("../conditional-formatting/_style-settings-provider");
const _card_layout_1 = require("../widgets/widgets-viewer/cards/_card-layout");
const _cards_viewer_1 = require("../widgets/widgets-viewer/cards/_cards-viewer");
const _card_widget_implementation_1 = require("../_card-widget-implementation");
const _base_item_1 = require("./_base-item");
const _kpi_item_1 = require("./_kpi-item");
class cardsItem extends _kpi_item_1.kpiItem {
    constructor(container, options) {
        super(container, options);
        this.useNewViewer = options.ViewModel.HasLayout;
        this._hasSparkline = false;
        this.apiHandlers = new _card_widget_implementation_1.CardWidgetImplementation(() => { this.renderContentUnsafe(this.contentRoot, true, () => { }); });
        this._styleSettingsProvider = new _style_settings_provider_1.cardItemStyleSettingsProvider();
        this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel, this.options.ViewModel ? this.options.ViewModel.WordWrap : false);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this._styleSettingsProvider) {
            this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel, this.options.ViewModel ? this.options.ViewModel.WordWrap : false);
        }
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        this._hasSparkline = false;
        if (this.options.ViewModel.HasLayout != this.useNewViewer && this.widgetsViewer != null) {
            this.widgetsViewer.clear();
            this.widgetsViewer = null;
        }
        this.useNewViewer = this.options.ViewModel.HasLayout;
        this.disposeLayoutCollection();
        this.initializeLayoutCollection();
        super.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        this.apiHandlers._element = this.widgetsViewer.element();
        return false;
    }
    createWidgetViewer(element, options) {
        if (this.useNewViewer)
            return new _cards_viewer_1.CardsViewer(element, options);
        else
            return super.createWidgetViewer(element, options);
    }
    initializeLayoutCollection() {
        this.layoutCollection = {};
        if (this.options.ViewModel.HasLayout) {
            var cards = this.options.ViewModel.Cards;
            cards.forEach(card => {
                var layout = new _card_layout_1.cardLayout(this.apiHandlers);
                layout.fill(card.Layout);
                this.layoutCollection[card.ID] = layout;
            });
        }
    }
    _isPaneEmpty() {
        return super._isPaneEmpty() || !this.hasCaption();
    }
    _isBorderRequired() {
        return false;
    }
    _isTransparentBackground() {
        return this._isPaneEmpty() && this.visualMode !== 'content';
    }
    _getSpecificWidgetViewerOptions() {
        let specificOptions = {};
        specificOptions.viewer = {
            ignorePadding: this._getIgnorePadding(),
            controlContainer: this.options.controlContainer,
        };
        var layoutsArray = [];
        for (var layoutKey in this.layoutCollection) {
            layoutsArray.push(this.layoutCollection[layoutKey]);
        }
        specificOptions.itemOptions = {
            hasSparkline: this._hasSparkline,
            layouts: layoutsArray
        };
        specificOptions.styleSettingsProvider = this._styleSettingsProvider;
        return _jquery_helpers_1.deepExtend(specificOptions, super._getSpecificWidgetViewerOptions());
    }
    _getIgnorePadding() {
        return this._isPaneEmpty() && this.visualMode !== 'content';
    }
    _getWidgetType() {
        return 'card';
    }
    _getElementsName() {
        return 'Cards';
    }
    setOldCardProperties(sourceItem, cardModel, props) {
        var captions = props.getCaptions(), sparklineOptions, indicatorType, isGood;
        if (cardModel.DataItemType === _utils_1.KpiValueMode.Measure) {
            sourceItem.mainValue = {
                type: undefined,
                hasPositiveMeaning: undefined,
                text: {
                    value: props.getMeasureDisplayText(),
                    useDefaultColor: cardModel.IgnoreDeltaColor
                }
            };
        }
        else {
            indicatorType = props.getIndicatorType();
            isGood = props.getIsGood();
            sourceItem.mainValue = {
                type: indicatorType,
                hasPositiveMeaning: isGood,
                text: {
                    value: props.getMainValueText(),
                    useDefaultColor: cardModel.IgnoreDeltaColor
                }
            };
            sourceItem.variableValue1 = {
                type: indicatorType,
                hasPositiveMeaning: isGood,
                text: {
                    value: props.getSubValue1Text(),
                    useDefaultColor: cardModel.IgnoreSubValue1DeltaColor
                }
            };
            sourceItem.variableValue2 = {
                type: indicatorType,
                hasPositiveMeaning: isGood,
                text: {
                    value: props.getSubValue2Text(),
                    useDefaultColor: cardModel.IgnoreSubValue2DeltaColor
                }
            };
        }
        if (cardModel.ShowSparkline) {
            sparklineOptions = props.getSparklineOptions();
            this._hasSparkline = !!sparklineOptions;
            if (this._hasSparkline) {
                sourceItem.sparklineOptions = sparklineOptions;
            }
        }
        if (captions.length > 0) {
            sourceItem.title = captions.pop();
            sourceItem.subTitle = captions.length != 0 ? captions.join(' - ') : undefined;
        }
    }
    setNewCardProperties(sourceItem, cardModel, props) {
        sourceItem.layout = this.layoutCollection[cardModel.ID];
        sourceItem.dataAccessor = props;
    }
    _setSourceItemProperties(sourceItem, cardModel, props) {
        super._setSourceItemProperties(sourceItem, cardModel, props);
        if (this.useNewViewer)
            this.setNewCardProperties(sourceItem, cardModel, props);
        else
            this.setOldCardProperties(sourceItem, cardModel, props);
    }
    _getWidget() {
        return this.useNewViewer ? this.apiHandlers : undefined;
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = super._generateInnerBorderClassesUnsafe(element);
        var cardWithoutBackground = !this.hasParentContainer() && !this.hasCaption();
        if (cardWithoutBackground) {
            classes.push(_base_item_1.cssClassNamesBaseItem.cardWihtoutBackground);
        }
        if (element) {
            cardWithoutBackground ?
                element.classList.add(_base_item_1.cssClassNamesBaseItem.cardWihtoutBackground) :
                element.classList.remove(_base_item_1.cssClassNamesBaseItem.cardWihtoutBackground);
        }
        return classes;
    }
    dispose() {
        super.dispose();
        this.disposeLayoutCollection();
        this._styleSettingsProvider.dispose();
    }
    disposeLayoutCollection() {
        if (this.layoutCollection) {
            for (var key in this.layoutCollection) {
                if (this.layoutCollection.hasOwnProperty(key))
                    this.layoutCollection[key].dispose();
            }
        }
        this.layoutCollection = null;
    }
}
exports.cardsItem = cardsItem;
