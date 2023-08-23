﻿/**
* DevExpress Dashboard (_cards-viewer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsViewer = void 0;
const scroll_view_1 = require("devextreme/ui/scroll_view");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../../../data/_jquery-helpers");
const _css_class_names_1 = require("../_css-class-names");
const _widgets_viewer_base_1 = require("../_widgets-viewer-base");
const _arrangement_strategy_1 = require("./_arrangement-strategy");
const _card_arrangement_table_generator_1 = require("./_card-arrangement-table-generator");
const _card_virtualization_controller_1 = require("./_card-virtualization-controller");
const _new_card_item_1 = require("./_new-card-item");
var viewerCount = 0;
class CardsViewer extends _widgets_viewer_base_1.WidgetsViewerBase {
    constructor(element, options) {
        super(element, options);
    }
    get _styleSettingsProvider() {
        return this.option('styleSettingsProvider');
    }
    redraw() {
        this._render();
    }
    _getDefaultOptions() {
        return {};
    }
    getSelectedItems() {
        return this.itemsList.filter(item => item.selected());
    }
    clearSelections() {
        this.itemsList.forEach(item => item.clearSelection());
    }
    getSizeParams() {
        return this.virtualizer.getSizeParams();
    }
    clear() {
        this.container.remove();
    }
    dispose() {
        super.dispose();
        (this.itemsList || []).forEach(item => item.dispose());
        this.clear();
    }
    _init() {
        this._viewerID = viewerCount++;
        this.tableStruct = $.fn.constructor('<div>', { 'class': _css_class_names_1.cssClassNames.widgetViewerTable + ' ' + _css_class_names_1.cssClassNames.widgetViewerIdPrefix + this._viewerID });
        this.initContainer();
        this.container.append(this.tableStruct);
        this.container.addClass(_css_class_names_1.cssClassNames.widgetViewerContainer);
        var scrollView = new scroll_view_1.default(_jquery_helpers_1.$unwrap(this.container), {
            direction: 'both',
            showScrollbar: 'onHover'
        });
        this.virtualizer = new _card_virtualization_controller_1.CardVirtualizationController(this.tableStruct, scrollView);
        this.createItems();
        this.createArranger();
        this._render();
    }
    _update() {
        this.createItems();
        this.createArranger();
        this._render();
    }
    initContainer() {
        this.container = $.fn.constructor('<div>').appendTo(_jquery_helpers_1.$wrap(this.element()));
        this.container.addClass(_css_class_names_1.layoutCardCssClassNames.cardScrollableHolder);
    }
    createItems() {
        var that = this, data = that.option('dataSource');
        var viewer = this.option('viewer');
        var clickHandler = viewer.onclick, hoverHandler = viewer.onhover, controlContainer = viewer.controlContainer;
        that.itemsList = [];
        data.forEach((dataItem, index) => {
            that.itemsList.push(new _new_card_item_1.newCardItem(dataItem, index, { clickHandler, hoverHandler, controlContainer }));
        });
    }
    _render(drawOptions) {
        this.virtualizer.updateScrollableContent(() => {
            this.invalidateContent();
            this.drawCards();
        });
    }
    invalidateContent() {
        this.createItems();
        this.tableStruct.empty();
    }
    drawCards() {
        var parentWidth = this.container.width();
        var parentHeight = this.container.height();
        var layouts = this._option.itemOptions.layouts;
        var ignorePadding = this._option.viewer.ignorePadding;
        var cardArrangements = this.arranger.arrange(parentHeight, parentWidth, this.itemsList.length, layouts, ignorePadding);
        this.tableGenerator = new _card_arrangement_table_generator_1.cardArrangementTableGenerator();
        this.tableGenerator.generateTable(this.tableStruct, cardArrangements);
        this.virtualizer.init(cardArrangements, (startIndex, endIndex) => { this.drawCardsByIndices(startIndex, endIndex); });
    }
    drawCardsByIndices(startIndex, endIndex) {
        this.tableGenerator.drawCellContent(startIndex, endIndex, (container, cardArrangements, index) => {
            return this.itemsList[index].draw(container, cardArrangements, this._styleSettingsProvider);
        });
    }
    createArranger() {
        var viewerOptions = this.option('viewer');
        var method = viewerOptions.method;
        var count = viewerOptions.count;
        if (this.shouldRecreateArranger(method, count))
            this.arranger = _arrangement_strategy_1.ArrangementStrategy.createInstance(method, count);
    }
    shouldRecreateArranger(newArrangement, lineCount) {
        if (this.arranger != null) {
            let currentArrangement = this.arranger.getArrangeMethod();
            if (currentArrangement === 'auto')
                return newArrangement !== 'auto';
            else
                return newArrangement !== currentArrangement || this.arranger.getLineCount() !== lineCount;
        }
        return true;
    }
}
exports.CardsViewer = CardsViewer;
