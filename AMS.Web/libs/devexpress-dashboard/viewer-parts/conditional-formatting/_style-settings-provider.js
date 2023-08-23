﻿/**
* DevExpress Dashboard (_style-settings-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardItemStyleSettingsProvider = exports.styleSettingsProvider = exports.DrawProperty = void 0;
const color_1 = require("devextreme/color");
const browser_1 = require("devextreme/core/utils/browser");
const tooltip_1 = require("devextreme/ui/tooltip");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _cssHelper_1 = require("../viewer/_cssHelper");
const _css_class_names_1 = require("../widgets/widgets-viewer/_css-class-names");
const _appearance_settings_provider_1 = require("./_appearance-settings-provider");
const ICON_TYPE_NONE = 'None', APPEARANCE_TYPE_NONE = 'None', APPEARANCE_TYPE_CUSTOM = 'Custom', VERTICAL_AXIS_PADDING = 3, HIDDEN_TEXT_PREFIX = 'hiddenText', TOOLTIP_PREFIX = 'tooltip', GRID_BANDED_ROW_SELECTOR = '.dx-datagrid .dx-row-alt', PIVOT_AREA_SELECTOR = '.dx-pivotgrid .dx-pivotgrid-area';
const nbspSymbol = '\u00A0';
class BarCacheItem {
}
class DrawProperty {
    constructor() {
        this.shouldDrawFontStyles = true;
        this.shouldDrawBackColorStyle = true;
    }
}
exports.DrawProperty = DrawProperty;
class styleSettingsProvider {
    constructor() {
        this.wordWrap = false;
        this.FontStyle = {
            Bold: 1,
            Italic: 2,
            Underline: 4,
            Strikeout: 8
        };
        this.DataAttributes = {
            Bar: 'bar',
            Axis: 'axis',
            NormalizedValue: 'normalizedValue',
            ZeroPosition: 'zeroPosition',
            AllowNegativeAxis: 'allowNegativeAxis',
            DrawAxis: 'drawAxis'
        };
        this.cfModel = undefined;
        this.cssCustomClasses = [];
        this.cssCustomClassesLinks = [];
        this.id = styleSettingsProvider.inctanceCounter++;
        this.drawingLocked = true;
        this.barCache = {};
        this.padding = null;
        this.barPrefixes = [];
    }
    static toIconCssClass(iconType) {
        return styleSettingsProvider.cssClassNames.iconConditionalFormatting + '-' + iconType.toLowerCase();
    }
    static _getRangeBackColorStyleSettings(styleSettings, condition) {
        var rangeIndex = styleSettings.RangeIndex, leftIndex = -1, rightIndex = -1, leftModel, rightModel, resultModel, leftColor, rightColor, color;
        Object.keys(condition.FixedColors)
            .map(Number)
            .forEach((index) => {
            if (index < rangeIndex && (leftIndex === -1 || index > leftIndex))
                leftIndex = index;
            if (index > rangeIndex && (rightIndex === -1 || index < rightIndex))
                rightIndex = index;
        });
        leftModel = condition.FixedColors[leftIndex];
        rightModel = condition.FixedColors[rightIndex];
        leftColor = new color_1.default(_appearance_settings_provider_1.appearanceSettingsProvider.getColor(leftModel));
        rightColor = new color_1.default(_appearance_settings_provider_1.appearanceSettingsProvider.getColor(rightModel));
        return {
            AppearanceType: APPEARANCE_TYPE_CUSTOM,
            Color: leftColor.blend(rightColor, (rangeIndex - leftIndex) / (rightIndex - leftIndex)),
            ForeColor: leftModel.ForeColor,
            FontFamily: leftModel.FontFamily,
            FontSize: leftModel.FontSize,
            FontStyle: leftModel.FontStyle,
            IsBarStyle: leftModel.IsBarStyle
        };
    }
    initialize(cfModel, wordWrap) {
        if (cfModel) {
            this.cfModel = cfModel;
            this._clearCssClasses();
            this._registerCssClasses();
            this.drawingLocked = true;
            this.barCache = {};
            this.padding = null;
            this.barPrefixes = [];
        }
        this.wordWrap = wordWrap !== undefined ? wordWrap : this.wordWrap;
    }
    dispose() {
        this._clearCssClasses();
    }
    draw() {
        Object.values(this.barCache).forEach(columnCacheItem => {
            columnCacheItem.forEach(barCacheItem => {
                const textDiv = barCacheItem.getTextDiv();
                while (barCacheItem.container.firstChild) {
                    barCacheItem.container.removeChild(barCacheItem.container.firstChild);
                }
                if (!barCacheItem.container.classList.contains(styleSettingsProvider.cssClassNames.barContainer)) {
                    barCacheItem.container.classList.add(styleSettingsProvider.cssClassNames.barContainer);
                }
                var barContainer = barCacheItem.barContainer;
                barCacheItem.container.appendChild(barContainer);
                barContainer.appendChild(barCacheItem.barDiv);
                if (barCacheItem.drawAxis) {
                    barContainer.appendChild(barCacheItem.axisDiv);
                }
                if (!barCacheItem.showBarOnly) {
                    barContainer.appendChild(textDiv);
                }
                else {
                    barCacheItem.container.appendChild(textDiv);
                    barCacheItem.container.appendChild(barCacheItem.tooltipDiv);
                }
            });
        });
        this.drawingLocked = false;
        this.barPrefixes.forEach(barPrefix => this.updateBarWidth(barPrefix));
    }
    updateBarWidth(barPrefix) {
        if (!this.drawingLocked) {
            let barCacheItems = this.barCache[barPrefix], containerHeights;
            if (barCacheItems) {
                containerHeights = this._getContainerHeights(barCacheItems);
                barCacheItems.forEach((barCacheItem, i) => {
                    var bar = barCacheItem.barDiv, normalizedValue = _jquery_helpers_1.accessJQueryData(bar, this.DataAttributes.NormalizedValue), zeroPosition = _jquery_helpers_1.accessJQueryData(bar, this.DataAttributes.ZeroPosition), allowNegativeAxis = _jquery_helpers_1.accessJQueryData(bar, this.DataAttributes.AllowNegativeAxis), drawAxis = _jquery_helpers_1.accessJQueryData(bar, this.DataAttributes.DrawAxis), containerHeight = containerHeights[i], axisDiv = bar.parentNode && bar.parentNode.querySelector('.' + this.DataAttributes.Axis + '_' + barPrefix);
                    this._setBarBounds(bar, containerHeight, zeroPosition, normalizedValue, allowNegativeAxis, drawAxis);
                    if (axisDiv) {
                        this._setAxisBounds(axisDiv, containerHeight, zeroPosition);
                    }
                });
            }
        }
    }
    applyStyleSettings(container, popupContainer, styleSettingsInfo, ignoreImageSettings, barPrefix, forceLeftAlignment, isSecondaryStyle) {
        let styleSettingsModel, sortedStyleIndexes = styleSettingsInfo ? styleSettingsInfo.styleIndexes : undefined, condition, ruleIndex, barInfo, iconType;
        if (sortedStyleIndexes && sortedStyleIndexes.length > 0) {
            sortedStyleIndexes.sort((a, b) => a - b);
            sortedStyleIndexes.forEach(styleIndex => {
                styleSettingsModel = this.cfModel.FormatConditionStyleSettings[styleIndex];
                ruleIndex = styleSettingsInfo.styleAndRuleMappingTable[styleIndex];
                if (styleSettingsModel.IsBarStyle) {
                    condition = this.cfModel.RuleModels[ruleIndex].ConditionModel;
                    barInfo = this._getBarInfo(styleSettingsModel, styleIndex, condition);
                }
                else if (styleSettingsModel.RangeIndex || styleSettingsModel.AppearanceType !== APPEARANCE_TYPE_NONE) {
                    let style = isSecondaryStyle === true ? this.cssCustomClasses[styleIndex].secondary : this.cssCustomClasses[styleIndex].primary;
                    container.classList.add(style);
                }
                else if (styleSettingsModel.IconType !== ICON_TYPE_NONE)
                    iconType = styleSettingsModel.IconType;
            });
            if (barInfo) {
                barInfo.normalizedValue = styleSettingsInfo.normalizedValue;
                barInfo.zeroPosition = styleSettingsInfo.zeroPosition;
                this._createBarContent(container, popupContainer, barInfo, barPrefix, forceLeftAlignment);
            }
            else if (!ignoreImageSettings && iconType) {
                this._applyIconSettings(container, iconType, forceLeftAlignment);
            }
        }
    }
    _getContainerHeights(barCacheItems) {
        const containerHeights = [];
        barCacheItems.forEach(barCacheItem => {
            const containerElement = barCacheItem.container, containerBounds = containerElement.getBoundingClientRect(), containerStyles = getComputedStyle(containerElement), topBorderWidth = parseInt(containerStyles.borderTopWidth) || 0, bottomBorderWidth = parseInt(containerStyles.borderBottomWidth) || 0, height = browser_1.default.webkit ? containerBounds.height - topBorderWidth : containerBounds.height - topBorderWidth - bottomBorderWidth;
            containerHeights.push(height);
        });
        return containerHeights;
    }
    _createCssClassName(prefix, styleIndex, postFix) {
        let styleName = prefix + '-' + this.id + '-' + styleIndex;
        if (postFix)
            styleName += '-' + postFix;
        return styleName;
    }
    _applyIconSettings(container, iconType, forceLeftAlignment, flexParentStyle = styleSettingsProvider.cssClassNames.flexParent) {
        if (!container.classList.contains('dx-white-space-column')) {
            let classes = styleSettingsProvider.cssClassNames;
            let textAlignmentIsLeft = this._textAlignmentIsLeft(container);
            let imageClasses = [classes.iconConditionalFormatting, styleSettingsProvider.toIconCssClass(iconType)];
            this._wrapChildElementsToApplyIconSettings(container, classes, forceLeftAlignment);
            let marginClass = textAlignmentIsLeft ? classes.leftMargin : classes.rightMargin;
            imageClasses.push(classes.fixed, marginClass);
            const imageElt = document.createElement('div');
            imageElt.classList.add(...imageClasses);
            if (textAlignmentIsLeft) {
                container.appendChild(imageElt);
            }
            else {
                container.insertBefore(imageElt, container.firstChild);
            }
            const wrappingElement = document.createElement('div');
            wrappingElement.classList.add(flexParentStyle);
            _jquery_helpers_1.wrapInner(container, wrappingElement);
        }
    }
    _wrapChildElementsToApplyIconSettings(container, classes, forceLeftAlignment) {
        let textClasses = [this.wordWrap ? classes.wordWrap : classes.truncated,
            forceLeftAlignment ? '' : classes.stretched];
        if (container.children.length > 0) {
            container.querySelectorAll('.dx-expand-icon-container').forEach(element => element.classList.add(classes.fixed));
            container.querySelectorAll(':scope>:not(.dx-expand-icon-container)').forEach(element => element.classList.add(...textClasses));
        }
        else {
            const wrappingElement = document.createElement('div');
            wrappingElement.classList.add(...textClasses);
            _jquery_helpers_1.wrapInner(container, wrappingElement);
        }
    }
    _textAlignmentIsLeft(container) {
        var textAlignment = getComputedStyle(container).textAlign;
        return textAlignment === 'left' || textAlignment === 'start' || textAlignment === 'center' || textAlignment === 'justify';
    }
    _getBarInfo(styleSettingsModel, styleIndex, condition) {
        if (this._shouldDrawBarStyle(styleSettingsModel)) {
            return {
                showBarOnly: condition.BarOptions.ShowBarOnly,
                allowNegativeAxis: condition.BarOptions.AllowNegativeAxis,
                drawAxis: condition.BarOptions.DrawAxis,
                cssClass: this.cssCustomClasses[styleIndex].primary
            };
        }
        return null;
    }
    _createBarContent(container, popupContainer, barInfo, barPrefix, forceLeftAlignment) {
        const barCacheItem = new BarCacheItem();
        const displayText = container.textContent;
        const containerContent = Array.from(container.childNodes);
        if (!this.padding) {
            const computedStyles = getComputedStyle(container);
            this.padding = computedStyles.paddingTop + ' ' + computedStyles.paddingLeft;
        }
        if (!this.barCache[barPrefix])
            this.barCache[barPrefix] = [];
        this.barCache[barPrefix].push(barCacheItem);
        const barContainer = document.createElement('div');
        barContainer.classList.add(styleSettingsProvider.cssClassNames.relativePosition);
        barCacheItem.container = container;
        barCacheItem.barContainer = barContainer;
        if (!this.barPrefixes.some(prefix => prefix === barPrefix))
            this.barPrefixes.push(barPrefix);
        barCacheItem.barDiv = this._createBarDiv(barInfo, barPrefix);
        barCacheItem.showBarOnly = barInfo.showBarOnly;
        barCacheItem.drawAxis = barInfo.drawAxis;
        if (barInfo.drawAxis) {
            barCacheItem.axisDiv = this._createAxisDiv(barPrefix, barInfo.zeroPosition);
        }
        let textDiv;
        barCacheItem.getTextDiv = () => {
            if (!textDiv) {
                textDiv = document.createElement('div');
                if (barInfo.showBarOnly) {
                    textDiv.append(nbspSymbol);
                }
                else {
                    textDiv.classList.add(styleSettingsProvider.cssClassNames.barValue);
                    containerContent.forEach(node => textDiv.appendChild(node));
                }
            }
            return textDiv;
        };
        if (barInfo.showBarOnly) {
            const index = styleSettingsProvider.hiddenTextCounter++;
            const tooltipId = TOOLTIP_PREFIX + index;
            const containerId = HIDDEN_TEXT_PREFIX + index;
            container.id = containerId;
            var tooltipDiv = document.createElement('div');
            tooltipDiv.innerText = displayText;
            tooltipDiv.id = tooltipId;
            new tooltip_1.default(tooltipDiv, {
                target: '#' + containerId,
                container: popupContainer,
                showEvent: 'dxhoverstart',
                hideEvent: 'dxhoverend',
            });
            barCacheItem.tooltipDiv = tooltipDiv;
            $.fn.constructor(container).unbind().hover(function () { $.fn.constructor(tooltipDiv).toggle(); });
        }
    }
    _createBarDiv(barInfo, barPrefix) {
        const barDiv = document.createElement('div');
        barDiv.classList.add(styleSettingsProvider.cssClassNames.absolutePosition);
        barDiv.classList.add(barInfo.cssClass);
        barDiv.classList.add(this.DataAttributes.Bar + '_' + barPrefix);
        barDiv.append(nbspSymbol);
        _jquery_helpers_1.accessJQueryData(barDiv, this.DataAttributes.NormalizedValue, barInfo.normalizedValue);
        _jquery_helpers_1.accessJQueryData(barDiv, this.DataAttributes.ZeroPosition, barInfo.zeroPosition);
        _jquery_helpers_1.accessJQueryData(barDiv, this.DataAttributes.AllowNegativeAxis, barInfo.allowNegativeAxis);
        _jquery_helpers_1.accessJQueryData(barDiv, this.DataAttributes.DrawAxis, barInfo.drawAxis);
        return barDiv;
    }
    _createAxisDiv(barPrefix, zeroPosition) {
        const axisDiv = document.createElement('div');
        axisDiv.classList.add(styleSettingsProvider.cssClassNames.absolutePosition);
        axisDiv.classList.add(this.DataAttributes.Axis + '_' + barPrefix, styleSettingsProvider.cssClassNames.barAxis);
        _jquery_helpers_1.accessJQueryData(axisDiv, this.DataAttributes.ZeroPosition, zeroPosition);
        return axisDiv;
    }
    _setBarBounds(barDiv, containerHeight, zeroPosition, normalizedValue, allowNegativeAxis, drawAxis) {
        var barWidth = Math.abs(normalizedValue * 100), axisPosition = Math.abs(zeroPosition * 100), width = allowNegativeAxis && drawAxis && normalizedValue < 0 && zeroPosition > 0 ? 'calc(' + barWidth + '% + 1px)' : barWidth + '%';
        barDiv.style.height = containerHeight + 'px';
        barDiv.style.width = width;
        if (allowNegativeAxis && normalizedValue < 0 && zeroPosition > 0) {
            if (drawAxis) {
                barDiv.style.right = 'calc(' + (100 - axisPosition) + '% - 1px)';
            }
            else {
                barDiv.style.right = (100 - axisPosition) + '%';
            }
        }
        else
            barDiv.style.left = axisPosition + '%';
    }
    _setAxisBounds(axisDiv, containerHeight, zeroPosition) {
        axisDiv.style.left = Math.abs(zeroPosition * 100) + '%';
        axisDiv.style.height = Math.max(0, containerHeight - VERTICAL_AXIS_PADDING * 2) + 'px';
    }
    _clearCssClasses() {
        this.cssCustomClassesLinks.forEach(style => style());
        this.cssCustomClassesLinks = [];
    }
    _registerCssClasses() {
        if (this.cfModel != undefined) {
            for (let styleIndex = 0; styleIndex < this.cfModel.FormatConditionStyleSettings.length; styleIndex++) {
                let styleSettingsModel = this.cfModel.FormatConditionStyleSettings[styleIndex];
                this._registerCssClassByStyleModel(styleSettingsModel, styleIndex, false);
                if (this._isShouldGenerateSecondaryStyle(styleSettingsModel)) {
                    this._registerCssClassByStyleModel(styleSettingsModel, styleIndex, true);
                }
            }
        }
    }
    _registerCssClassByStyleModel(styleSettingsModel, styleIndex, isSecondaryStyle) {
        let className = this._generateCssClassName(styleIndex, isSecondaryStyle);
        this._addCssClassToDictionary(className, styleIndex, isSecondaryStyle);
        this._generateCssClassBody(styleSettingsModel, className, this._getDrawProperty(isSecondaryStyle));
    }
    _addCssClassToDictionary(styleName, styleIndex, isSecondary) {
        let primaryStyle, secondaryStyle;
        if (this.cssCustomClasses[styleIndex]) {
            primaryStyle = this.cssCustomClasses[styleIndex].primary;
            secondaryStyle = this.cssCustomClasses[styleIndex].secondary;
        }
        if (isSecondary)
            secondaryStyle = styleName;
        else
            primaryStyle = styleName;
        this.cssCustomClasses[styleIndex] = {
            primary: primaryStyle,
            secondary: secondaryStyle
        };
    }
    _generateCssClassName(styleIndex, isSecondary) {
        let postFix = this._getStylePostFix(isSecondary);
        let cssClassName = this._createCssClassName(styleSettingsProvider.cssClassNames.customStyle, styleIndex, postFix);
        return cssClassName;
    }
    addNewStyle(styleName, styleIndex, isSecond) {
        this.cssCustomClasses[styleIndex] = {
            secondary: styleName,
            primary: styleName
        };
    }
    _isShouldGenerateSecondaryStyle(styleSettingsModel) {
        return false;
    }
    _isSecondaryStyle(styleSettingsModel) {
        return false;
    }
    _getStylePostFix(isSecondary) {
        return null;
    }
    _getDrawProperty(isSecondaryStyle) {
        return null;
    }
    _shouldDrawBarStyle(styleSettingsModel) {
        return true;
    }
    _generateCssClassBody(styleSettingsModel, cssClassName, drawProperty) {
        let selector = this._getCssTdSelector(cssClassName);
        if (styleSettingsModel.RangeIndex) {
            let condition = this.cfModel.RuleModels[styleSettingsModel.RuleIndex].ConditionModel;
            styleSettingsModel = styleSettingsProvider._getRangeBackColorStyleSettings(styleSettingsModel, condition);
            this._createCssClassFromCustomAppearanceType(styleSettingsModel, selector, drawProperty);
        }
        else if (styleSettingsModel.AppearanceType === APPEARANCE_TYPE_CUSTOM) {
            this._createCssClassFromCustomAppearanceType(styleSettingsModel, selector, drawProperty);
        }
        else if (styleSettingsModel.AppearanceType !== APPEARANCE_TYPE_NONE) {
            this._createCssClassFromPredefinedAppearanceType(selector, styleSettingsModel.AppearanceType, drawProperty);
        }
    }
    _getCssTdSelector(cssClassname) {
        return '.' + styleSettingsProvider.cssClassNames.dashboardContainer + ' .' + cssClassname + ', '
            + GRID_BANDED_ROW_SELECTOR + ' .' + cssClassname + ', '
            + PIVOT_AREA_SELECTOR + ' .' + cssClassname;
    }
    _createCssClassFromCustomAppearanceType(styleSettingsModel, cssSelector, drawProperty) {
        let cssProperties = Array();
        if (drawProperty == null || drawProperty.shouldDrawBackColorStyle)
            cssProperties.push(this._createBackColorStyle(styleSettingsModel));
        if (drawProperty == null || drawProperty.shouldDrawFontStyles)
            cssProperties = cssProperties.concat(this._createFontStyles(styleSettingsModel));
        this.cssCustomClassesLinks.push(_cssHelper_1.createCssClass(cssSelector, cssProperties));
    }
    _createFontStyles(styleSettingsModel) {
        let fontStyles = Array();
        var isUnderline = (styleSettingsModel.FontStyle & this.FontStyle.Underline) !== 0, isStrikeout = (styleSettingsModel.FontStyle & this.FontStyle.Strikeout) !== 0;
        if (styleSettingsModel.ForeColor)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('color', _utils_1.toColor(styleSettingsModel.ForeColor)));
        if (styleSettingsModel.FontFamily)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('font-family', styleSettingsModel.FontFamily));
        if (styleSettingsModel.FontSize && styleSettingsModel.FontSize > 0)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('font-size', styleSettingsModel.FontSize));
        if ((styleSettingsModel.FontStyle & this.FontStyle.Bold) !== 0)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('font-weight', 'bold'));
        if ((styleSettingsModel.FontStyle & this.FontStyle.Italic) !== 0)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('font-style', 'italic'));
        if (isUnderline && isStrikeout)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('text-decoration', 'underline line-through'));
        else if (isUnderline)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('text-decoration', 'underline'));
        else if (isStrikeout)
            fontStyles.push(_cssHelper_1.createCssPropertyWrapper('text-decoration', 'line-through'));
        return fontStyles;
    }
    _createBackColorStyle(styleSettingsModel) {
        return styleSettingsModel.Color ? _cssHelper_1.createCssPropertyWrapper('background-color', _appearance_settings_provider_1.appearanceSettingsProvider.getColor(styleSettingsModel)) : null;
    }
    _createCssClassFromPredefinedAppearanceType(selector, appearanceType, drawProperty) {
        this.cssCustomClassesLinks.push(_cssHelper_1.createCssClass(selector, _appearance_settings_provider_1.appearanceSettingsProvider.toCssProperties(appearanceType, drawProperty)));
    }
}
exports.styleSettingsProvider = styleSettingsProvider;
styleSettingsProvider.cssClassNames = {
    iconConditionalFormatting: 'dx-icon-dashboard-cf',
    barAxis: 'dx-dashboard-bar-axis',
    customStyle: 'dx-dashboard-cf-style',
    customGradientStyle: 'dx-dashboard-cf-gradient-style',
    dashboardContainer: 'dx-dashboard-container',
    absolutePosition: 'dx-dashboard-absolute-position',
    relativePosition: 'dx-dashboard-relative-position',
    flexParent: 'dx-dashboard-flex-parent',
    flexParentBaseline: 'dx-dashboard-flex-parent-baseline',
    truncated: 'dx-dashboard-truncated',
    wordWrap: 'dx-dashboard-word-wrap',
    stretched: 'dx-dashboard-stretched',
    fixed: 'dx-dashboard-fixed',
    leftMargin: 'dx-dashboard-left-margin',
    rightMargin: 'dx-dashboard-right-margin',
    barContainer: 'dx-dashboard-cf-bar-container',
    barValue: 'dx-dashboard-cf-bar-value'
};
styleSettingsProvider.inctanceCounter = 0;
styleSettingsProvider.hiddenTextCounter = 0;
class cardItemStyleSettingsProvider extends styleSettingsProvider {
    constructor() {
        super();
    }
    _getDrawProperty(isSecondaryStyle) {
        let drawProperty = new DrawProperty();
        drawProperty.shouldDrawBackColorStyle = isSecondaryStyle;
        drawProperty.shouldDrawFontStyles = !isSecondaryStyle;
        return drawProperty;
    }
    _getStylePostFix(isSecondaryStyle) {
        return isSecondaryStyle ? 'card' : null;
    }
    _isShouldGenerateSecondaryStyle(styleSettingsModel) {
        return true;
    }
    _shouldDrawBarStyle(styleSettingsModel) {
        return false;
    }
    _textAlignmentIsLeft(container) {
        return false;
    }
    _getCssTdSelector(cssClassname) {
        let notSelectedOrHovered = ':not(.dx-selected-viewer-item):not(.dx-hovered-viewer-item)';
        return '.' + styleSettingsProvider.cssClassNames.dashboardContainer + ' .' + _css_class_names_1.layoutCardCssClassNames.card + notSelectedOrHovered + ' .' + cssClassname + ', '
            + '.' + styleSettingsProvider.cssClassNames.dashboardContainer + ' .' + _css_class_names_1.layoutCardCssClassNames.card + notSelectedOrHovered + '.' + cssClassname;
    }
    _applyIconSettings(container, iconType, forceLeftAlignment, flexParentStyle = styleSettingsProvider.cssClassNames.flexParent) {
        super._applyIconSettings(container, iconType, forceLeftAlignment, styleSettingsProvider.cssClassNames.flexParentBaseline);
    }
    _wrapChildElementsToApplyIconSettings(container, classes, forceLeftAlignment) {
        const textClasses = [this.wordWrap ? classes.wordWrap : classes.truncated, classes.stretched];
        const wrappingElement = document.createElement('div');
        wrappingElement.classList.add(...textClasses);
        _jquery_helpers_1.wrapInner(container, wrappingElement);
    }
    getIconType(styleSettingsInfo) {
        let sortedStyleIndexes = styleSettingsInfo ? styleSettingsInfo.styleIndexes : undefined;
        let iconType;
        if (sortedStyleIndexes && sortedStyleIndexes.length > 0) {
            sortedStyleIndexes.sort((a, b) => a - b);
            sortedStyleIndexes.forEach(index => {
                let styleSettingsModel = this.cfModel.FormatConditionStyleSettings[index];
                if (styleSettingsModel.IconType !== ICON_TYPE_NONE)
                    iconType = styleSettingsModel.IconType;
            });
        }
        return iconType;
    }
    applyIndicatorStyle(container, iconType) {
        this._applyIconSettings(container, iconType, null);
    }
}
exports.cardItemStyleSettingsProvider = cardItemStyleSettingsProvider;
