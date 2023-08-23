﻿/**
* DevExpress Dashboard (_card-painter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardPainter = void 0;
const tooltip_1 = require("devextreme/ui/tooltip");
const sparkline_1 = require("devextreme/viz/sparkline");
const $ = require("jquery");
const _cssHelper_1 = require("../../../viewer/_cssHelper");
const _delta_indicator_1 = require("../../indicators/_delta-indicator");
const _simple_indicator_1 = require("../../indicators/_simple-indicator");
const _css_class_names_1 = require("../_css-class-names");
const _card_layout_1 = require("./_card-layout");
class cardPainter {
    constructor(data, controlContainer) {
        this.data = data;
        this.controlContainer = controlContainer;
    }
    draw(cardArrangements, layout, _styleSettingsProvider) {
        this.layout = layout;
        this._styleSettingsProvider = _styleSettingsProvider;
        var cardHeight = cardArrangements.getCardHeight();
        var cardWidth = cardArrangements.getCardWidth();
        this._cardStyle = layout.getStyleSettings(this.data);
        var $divCardLayout = $.fn.constructor('<div>', {})
            .addClass(_css_class_names_1.layoutCardCssClassNames.card)
            .css({
            height: cardHeight,
            width: cardWidth,
            'background-color': layout.getCardBackgroundColor()
        }).append(this.createCardContent(cardArrangements, layout));
        let divCardLayout = $divCardLayout.get(0);
        if (this._cardStyle)
            this._styleSettingsProvider.applyStyleSettings(divCardLayout, null, this._cardStyle, true, null, null, true);
        return $divCardLayout;
    }
    createCardContent(cardArrangements, layout) {
        var contentHeight = cardArrangements.getCardContentHeight();
        var contentWidth = cardArrangements.getCardContentWidth();
        var actualContentWidth = layout.maxWidth > 0 ? Math.min(contentWidth, Math.max(layout.minWidth, layout.maxWidth)) : contentWidth;
        return $.fn.constructor('<div>')
            .css({
            height: contentHeight,
            width: actualContentWidth
        }).addClass(_css_class_names_1.layoutCardCssClassNames.content)
            .append(this.createRows(layout.rows, actualContentWidth));
    }
    createRows(rowModels, contentWidth) {
        var topRows = $.fn.constructor('<div>', { 'class': _css_class_names_1.layoutCardCssClassNames.contentTopRows }), centerRows = $.fn.constructor('<div>', {}), bottomRows = $.fn.constructor('<div>', { 'class': _css_class_names_1.layoutCardCssClassNames.contentBottomRows });
        rowModels.forEach(rowModel => {
            var rowDiv = $.fn.constructor('<div>');
            rowDiv.css('paddingBottom', rowModel.indent);
            switch (rowModel.vAlignment) {
                case _card_layout_1.verticalAlignment.top:
                    topRows.append(rowDiv);
                    break;
                case _card_layout_1.verticalAlignment.bottom:
                    bottomRows.append(rowDiv);
                    break;
                case _card_layout_1.verticalAlignment.center:
                default:
                    centerRows.append(rowDiv);
            }
            this.createRow(rowModel.elements, rowDiv, contentWidth);
        });
        if (centerRows.children().length > 0)
            return [topRows, centerRows, bottomRows];
        else if (topRows.children().length > 0 || bottomRows.children().length > 0) {
            return [topRows, bottomRows];
        }
    }
    createRow(elementModels, rowDiv, contentWidth) {
        var leftElements = [], centerElements = [], rightElements = [];
        elementModels.forEach(elementModel => {
            switch (elementModel.hAlignment) {
                case _card_layout_1.horizontalAlignment.left:
                    leftElements.push(elementModel);
                    break;
                case _card_layout_1.horizontalAlignment.right:
                    rightElements.push(elementModel);
                    break;
                case _card_layout_1.horizontalAlignment.center:
                default:
                    centerElements.push(elementModel);
                    break;
            }
        });
        if (centerElements.length != 0 && leftElements.length == 0 && rightElements.length == 0) {
            rowDiv.addClass(_css_class_names_1.layoutCardCssClassNames.rowOnlyCenterElements);
            rowDiv.append(this.createElements(centerElements, contentWidth));
        }
        else {
            rowDiv.addClass(_css_class_names_1.layoutCardCssClassNames.row);
            var leftDiv = $.fn.constructor('<div>', { 'class': _css_class_names_1.layoutCardCssClassNames.rowLeftRightElements }).appendTo(rowDiv), rightDiv = $.fn.constructor('<div>', { 'class': _css_class_names_1.layoutCardCssClassNames.rowLeftRightElements }).appendTo(rowDiv);
            leftDiv.append(this.createElements(leftElements.concat(centerElements), contentWidth));
            rightDiv.append(this.createElements(rightElements, contentWidth));
        }
    }
    createElements(elements, contentWidth) {
        return elements.map(element => {
            if (element instanceof _card_layout_1.cardIndicatorElement) {
                return this.createIndicatorElement(element);
            }
            else if (element instanceof _card_layout_1.cardSparklineElement) {
                return this.createSparklineElement(element, contentWidth);
            }
            else {
                return this.createDataElement(element);
            }
        });
    }
    createIndicatorElement(indicatorElement) {
        let indicatorDiv = $.fn.constructor('<div>');
        indicatorDiv.addClass(_css_class_names_1.layoutCardCssClassNames.indicatorElement);
        let styleSettings = indicatorElement.getStyleSettings(this.data);
        let cfIconType;
        if (styleSettings)
            cfIconType = this._styleSettingsProvider.getIconType(styleSettings);
        if (cfIconType)
            this._styleSettingsProvider.applyIndicatorStyle(indicatorDiv[0], cfIconType);
        else {
            indicatorDiv
                .css({
                height: indicatorElement.height,
                width: indicatorElement.width
            })
                .append(_simple_indicator_1.SimpleIndicator.getIndicator(indicatorElement.getIndicatorType(this.data), indicatorElement.getIsGood(this.data)));
        }
        return indicatorDiv;
    }
    createSparklineElement(sparklineElement, contentWidth) {
        var sparklineOptions = sparklineElement.getSparklineOptions(this.data);
        sparklineOptions.size = {
            height: sparklineElement.height,
            width: contentWidth
        };
        var sparklineContainer = document.createElement('div');
        new sparkline_1.default(sparklineContainer, sparklineOptions);
        return $.fn.constructor('<div>')
            .css({
            height: sparklineElement.height
        }).append(sparklineContainer);
    }
    createDataElement(textElement) {
        var elementText = textElement.getText(this.data);
        let elementCssProperties = _cssHelper_1.getEmptyCssPropertyWrappersArray();
        var elementDiv = $.fn.constructor('<div>')
            .addClass(_css_class_names_1.layoutCardCssClassNames.rowElement)
            .text(elementText);
        this.setElementColor(textElement, elementDiv, elementCssProperties);
        let cssClassName = _css_class_names_1.layoutCardCssClassNames.rowElement + '-' + this.data.getKpiElementId() + '-' + textElement.id;
        if (!this.layout.hasRowElementCssClass(cssClassName)) {
            elementCssProperties.push(_cssHelper_1.createCssPropertyWrapper('font-family', textElement.fontFamily));
            elementCssProperties.push(_cssHelper_1.createCssPropertyWrapper('font-size', textElement.fontSize + 'pt'));
            let cssSelector = '.' + _css_class_names_1.layoutCardCssClassNames.content + ' .' + _css_class_names_1.layoutCardCssClassNames.rowElement + '.' + cssClassName;
            this.layout.addRowElementCss(cssClassName, cssSelector, elementCssProperties);
        }
        elementDiv.addClass(cssClassName);
        var textDiv = document.createElement('div');
        textDiv.innerText = elementText;
        elementDiv.append(textDiv);
        let styleSettings = textElement.getStyleSettings(this.data);
        if (styleSettings)
            this._styleSettingsProvider.applyStyleSettings(elementDiv[0], null, styleSettings, false, null, true, false);
        new tooltip_1.default(textDiv, {
            container: this.controlContainer,
            target: elementDiv.get(0),
            showEvent: { name: 'mouseenter', delay: 800 },
            hideEvent: 'mouseleave'
        });
        return elementDiv;
    }
    setElementColor(element, elementDiv, elementProperties) {
        if (element.predefinedColor !== 'NotSet') {
            switch (element.predefinedColor) {
                case 'Main':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType(null, null, true));
                    break;
                case 'Neutral':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType());
                    break;
                case 'Bad':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType('down', false));
                    break;
                case 'Good':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType('up', true));
                    break;
                case 'Warning':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType('warning'));
                    break;
                case 'Delta':
                    elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType(element.getIndicatorType(this.data), element.getIsGood(this.data)));
                    break;
            }
        }
        else if (element.color) {
            elementProperties.push(_cssHelper_1.createCssPropertyWrapper('color', element.color));
        }
        else {
            elementDiv.addClass(_delta_indicator_1.DeltaIndicator.getIndicatorColorType(null, null, true));
        }
    }
}
exports.cardPainter = cardPainter;
