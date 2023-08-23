﻿/**
* DevExpress Dashboard (_filter-icon-tooptip.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterIconTooltip = exports.titleTooltipClasses = void 0;
const $ = require("jquery");
const _formatter_1 = require("../../data/_formatter");
const _render_helper_1 = require("../widgets/_render-helper");
exports.titleTooltipClasses = {
    root: 'dx-dashboard-title-tooltip',
    list: 'dx-dashboard-title-tooltip-list',
    listText: 'dx-dashboard-title-tooltip-list-text',
    subList: 'dx-dashboard-title-tooltip-sublist',
    subListItem: 'dx-dashboard-title-tooltip-sublist-item'
};
class FilterIconTooltip {
    static getTooltipContent(contentElement, masterFilterValues) {
        contentElement.addClass(exports.titleTooltipClasses.root);
        let $tooltipList = $.fn.constructor('<ul/>', { 'class': exports.titleTooltipClasses.list });
        masterFilterValues.forEach((argument, i) => {
            let $tooltipListItem = $.fn.constructor('<li/>').appendTo($tooltipList);
            $tooltipListItem.css({ 'padding-top': i == 0 ? 0 : this.FILTER_LIST_SPACE + 'px' });
            _render_helper_1.RenderHelper.html($.fn.constructor('<div/>', { 'class': exports.titleTooltipClasses.listText }).appendTo($tooltipListItem).get(0), argument.Name, true);
            let $tooltipSublist = $.fn.constructor('<ul/>', { 'class': exports.titleTooltipClasses.subList }).appendTo($tooltipListItem);
            let maxFilterListValues = this._calcMaxFilterListValues(masterFilterValues);
            var maxFilterValues = this._calcMaxFilterValues(maxFilterListValues, masterFilterValues);
            for (var j = 0; j < maxFilterValues; j++) {
                if (j >= argument.Values.length && argument.Truncated
                    || j + 1 == maxFilterValues && (j + 1 < argument.Values.length
                        || argument.Truncated)) {
                    $.fn.constructor('<li/>', { 'class': exports.titleTooltipClasses.subListItem }).appendTo($tooltipSublist).append('...');
                    break;
                }
                if (j >= argument.Values.length) {
                    break;
                }
                _render_helper_1.RenderHelper.html($.fn.constructor('<li/>', { 'class': exports.titleTooltipClasses.subListItem }).appendTo($tooltipSublist).get(0), _formatter_1.formatFilterValue(argument.Values[j]), true);
            }
        });
        return $tooltipList;
    }
    static _calcMaxFilterListValues(masterFilterValues) {
        var that = this, lineHeightString = $.fn.constructor('<div/>', { 'class': exports.titleTooltipClasses.root }).css('line-height'), lineHeightTmp = parseInt(lineHeightString, 10), lineHeight = lineHeightTmp && lineHeightString.length > 2 && lineHeightString.substr(lineHeightString.length - 2) == 'px' ? lineHeightTmp : this.DEFAULT_LINE_HEIGHT, maxHeight = this._calcMaxHeight();
        return Math.floor((maxHeight - (masterFilterValues.length - 1) * this.FILTER_LIST_SPACE) / lineHeight);
    }
    static _calcMaxFilterValues(maxFilterListValues, masterFilterValues) {
        var that = this, MIN_FILTER_VALUES = 4, MAX_FILTER_LIST_VALUES = 100, maxFilterValues, curFilterListValues;
        maxFilterListValues = Math.min(maxFilterListValues, MAX_FILTER_LIST_VALUES);
        for (maxFilterValues = Math.max(maxFilterListValues, MIN_FILTER_VALUES); maxFilterValues >= MIN_FILTER_VALUES; maxFilterValues--) {
            if (maxFilterValues == MIN_FILTER_VALUES) {
                break;
            }
            curFilterListValues = 0;
            $.each(masterFilterValues, function (index, dimensionFilterValues) {
                curFilterListValues += (maxFilterValues < dimensionFilterValues.Values.length ? maxFilterValues : dimensionFilterValues.Values.length) + 1;
                if (curFilterListValues > maxFilterListValues) {
                    return false;
                }
            });
            if (curFilterListValues <= maxFilterListValues) {
                break;
            }
        }
        return maxFilterValues;
    }
    static _calcMaxHeight() {
        return Math.floor($.fn.constructor(window).height() * 0.75);
    }
}
exports.FilterIconTooltip = FilterIconTooltip;
FilterIconTooltip.FILTER_LIST_SPACE = 8;
FilterIconTooltip.DEFAULT_LINE_HEIGHT = 16;
