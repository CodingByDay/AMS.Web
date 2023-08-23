﻿/**
* DevExpress Dashboard (_card-layout.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verticalAlignment = exports.horizontalAlignment = exports.sparklineOptions = exports.cardSparklineElement = exports.cardIndicatorElement = exports.cardRowElement = exports.cardRowElementBase = exports.cardRow = exports.cardLayout = void 0;
const _utils_1 = require("../../../../data/_utils");
const _cssHelper_1 = require("../../../viewer/_cssHelper");
class cardLayout {
    constructor(apiHandlers) {
        this.apiHandlers = apiHandlers;
        this.rows = [];
        this._cardCFFilter = (elementModel) => ((rule, applyToCardId) => {
            let cardRule = rule;
            let result = false;
            if (this._isValidCardId(cardRule, applyToCardId)) {
                if (!elementModel || cardRule.ApplyToRow)
                    result = true;
                else {
                    if (cardRule.ApplyToLayoutElementModel.ApplyToLayoutElement === elementModel.Type) {
                        if (cardRule.ApplyToLayoutElementModel.ApplyToLayoutElement === 'Dimension')
                            result = cardRule.ApplyToLayoutElementModel.DimensionId === elementModel.DataId;
                        else if (cardRule.ApplyToLayoutElementModel.ApplyToLayoutElement === 'Text')
                            result = cardRule.ApplyToLayoutElementModel.Text === elementModel.Text;
                        else
                            result = true;
                    }
                }
            }
            return result;
        });
        this._layoutElementCssClassesLinks = [];
        this._layoutElementCssClassesNames = [];
    }
    hasRowElementCssClass(className) {
        return this._layoutElementCssClassesNames.filter(x => x === className).length > 0;
    }
    addRowElementCss(className, selector, properties) {
        if (!this.hasRowElementCssClass(className)) {
            this._layoutElementCssClassesNames.push(className);
            this._layoutElementCssClassesLinks.push(_cssHelper_1.createCssClass(selector, properties));
        }
    }
    getCardBackgroundColor() {
        return this.apiHandlers && this.apiHandlers.cardBackColor;
    }
    _isValidCardId(cardRule, applyToCardId) {
        if (cardRule.ApplyToCardId)
            return cardRule.ApplyToCardId === applyToCardId;
        return true;
    }
    fill(layoutModel) {
        this.minWidth = layoutModel.MinWidth;
        this.maxWidth = layoutModel.MaxWidth;
        layoutModel.Rows.forEach((rowModel, i) => {
            var row = new cardRow();
            row.vAlignment = this.convertVAlignment(rowModel.VAlignment);
            row.indent = rowModel.Indent;
            rowModel.Elements.forEach((elementModel, j) => {
                if (elementModel.Type === 'Indicator') {
                    var indicatorElement = new cardIndicatorElement();
                    indicatorElement.getStyleSettings = (data) => {
                        return data.getStyleSettingsInfo(this._cardCFFilter(elementModel));
                    };
                    indicatorElement.getIndicatorType = (data) => {
                        return this.isDeltaType(elementModel.Type) && data.getIndicatorType();
                    };
                    indicatorElement.getIsGood = (data) => {
                        return this.isDeltaType(elementModel.Type) && data.getIsGood();
                    };
                    indicatorElement.width = elementModel.Size;
                    indicatorElement.height = Math.round(elementModel.Size / elementModel.IndicatorWidthRatio);
                    indicatorElement.hAlignment = this.convertHAlignment(elementModel.HAlignment);
                    row.elements.push(indicatorElement);
                }
                else if (elementModel.Type === 'Sparkline') {
                    var sparklineElement = new cardSparklineElement();
                    sparklineElement.height = elementModel.Size;
                    sparklineElement.getSparklineOptions = (data) => {
                        return data.getSparklineOptions();
                    };
                    row.elements.push(sparklineElement);
                }
                else {
                    var rowElement = new cardRowElement();
                    rowElement.id = elementModel.Id;
                    rowElement.getStyleSettings = (data) => {
                        return data.getStyleSettingsInfo(this._cardCFFilter(elementModel));
                    };
                    rowElement.predefinedColor = elementModel.PredefinedColor;
                    rowElement.color = this.convertElementColor(elementModel.Color);
                    rowElement.hAlignment = this.convertHAlignment(elementModel.HAlignment);
                    rowElement.fontSize = elementModel.FontSize;
                    rowElement.fontFamily = elementModel.FontFamily;
                    rowElement.getValueArgs = (data) => {
                        return this.getElementValue(data, elementModel);
                    };
                    rowElement.getText = (data) => {
                        var text;
                        var valueArgs = this.getElementValue(data, elementModel);
                        if (this.apiHandlers && this.apiHandlers.onCustomizeText) {
                            text = this.apiHandlers.onCustomizeText(valueArgs);
                        }
                        return text || valueArgs.getDefaultText();
                    };
                    rowElement.getIndicatorType = (data) => {
                        return this.isDeltaType(elementModel.Type) ? data.getIndicatorType() : undefined;
                    };
                    rowElement.getIsGood = (data) => {
                        return this.isDeltaType(elementModel.Type) && data.getIsGood();
                    };
                    row.elements.push(rowElement);
                }
            });
            this.rows.push(row);
        });
        this.getStyleSettings = (data) => {
            return data.getStyleSettingsInfo(this._cardCFFilter());
        };
    }
    isDeltaType(elementType) {
        return elementType === 'AbsoluteVariation' ||
            elementType === 'PercentVariation' ||
            elementType === 'PercentOfTarget' ||
            elementType === 'ActualValue' ||
            elementType === 'TargetValue' ||
            elementType === 'Indicator';
    }
    convertElementColor(color) {
        return color ? _utils_1.toColor(color) : null;
    }
    getElementValue(data, elementModel) {
        var valueGetter = () => { return ''; };
        var displayTextGetter = () => { return ''; };
        switch (elementModel.Type) {
            case 'Title':
                valueGetter = data.getTitle;
                displayTextGetter = data.getTitle;
                break;
            case 'Subtitle':
                valueGetter = data.getSubtitle;
                displayTextGetter = data.getSubtitle;
                break;
            case 'Text':
                valueGetter = (s) => elementModel.Text;
                displayTextGetter = (s) => elementModel.Text;
                break;
            case 'ActualValue':
                valueGetter = data.getActualValue;
                displayTextGetter = data.getActualValueText;
                break;
            case 'AbsoluteVariation':
                valueGetter = data.getAbsoluteVariationValue;
                displayTextGetter = data.getAbsoluteVariationText;
                break;
            case 'PercentVariation':
                valueGetter = data.getPercentVariationValue;
                displayTextGetter = data.getPercentVariationText;
                break;
            case 'PercentOfTarget':
                valueGetter = data.getPercentOfTargetValue;
                displayTextGetter = data.getPercentOfTargetText;
                break;
            case 'TargetValue':
                valueGetter = data.getTargetValue;
                displayTextGetter = data.getTargetValueText;
                break;
            case 'Dimension':
                valueGetter = data.getDimensionValue;
                displayTextGetter = data.getDimensionValueText;
                break;
            case 'Measure':
                valueGetter = data.getMeasureValue;
                displayTextGetter = data.getMeasureDisplayText;
                break;
            case 'CardName':
                valueGetter = data.getCardName;
                displayTextGetter = data.getCardName;
                break;
        }
        return {
            getValue() {
                return valueGetter(elementModel.DataId);
            },
            getDefaultText() {
                return displayTextGetter(elementModel.DataId);
            }
        };
    }
    convertVAlignment(value) {
        switch (value) {
            case 'Top':
                return verticalAlignment.top;
            case 'Bottom':
                return verticalAlignment.bottom;
            case 'Center':
            default:
                return verticalAlignment.center;
        }
    }
    convertHAlignment(value) {
        switch (value) {
            case 'Center':
                return horizontalAlignment.center;
            case 'Right':
                return horizontalAlignment.right;
            case 'Left':
            default:
                return horizontalAlignment.left;
        }
    }
    dispose() {
        this._layoutElementCssClassesLinks.forEach(style => style());
        this._layoutElementCssClassesLinks = [];
        this._layoutElementCssClassesNames = [];
    }
}
exports.cardLayout = cardLayout;
class cardRow {
    constructor() {
        this.elements = [];
    }
}
exports.cardRow = cardRow;
class cardRowElementBase {
}
exports.cardRowElementBase = cardRowElementBase;
class cardRowElement extends cardRowElementBase {
}
exports.cardRowElement = cardRowElement;
class cardIndicatorElement extends cardRowElementBase {
}
exports.cardIndicatorElement = cardIndicatorElement;
class cardSparklineElement extends cardRowElementBase {
}
exports.cardSparklineElement = cardSparklineElement;
class sparklineOptions {
    constructor(sparklineOptionsModel) {
        this.viewType = sparklineOptionsModel.ViewType;
        this.highlightMinMaxPoints = sparklineOptionsModel.HighlightMinMaxPoints;
        this.highlightStartEndPoints = sparklineOptionsModel.HighlightStartEndPoints;
    }
}
exports.sparklineOptions = sparklineOptions;
var horizontalAlignment;
(function (horizontalAlignment) {
    horizontalAlignment[horizontalAlignment["left"] = 0] = "left";
    horizontalAlignment[horizontalAlignment["right"] = 1] = "right";
    horizontalAlignment[horizontalAlignment["center"] = 2] = "center";
})(horizontalAlignment = exports.horizontalAlignment || (exports.horizontalAlignment = {}));
var verticalAlignment;
(function (verticalAlignment) {
    verticalAlignment[verticalAlignment["top"] = 0] = "top";
    verticalAlignment[verticalAlignment["center"] = 1] = "center";
    verticalAlignment[verticalAlignment["bottom"] = 2] = "bottom";
})(verticalAlignment = exports.verticalAlignment || (exports.verticalAlignment = {}));
