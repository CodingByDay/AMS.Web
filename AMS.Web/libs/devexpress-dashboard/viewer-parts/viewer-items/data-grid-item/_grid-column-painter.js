﻿/**
* DevExpress Dashboard (_grid-column-painter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridColumnPainter = void 0;
const string_1 = require("devextreme/core/utils/string");
require("devextreme/viz/bullet");
const bullet_1 = require("devextreme/viz/bullet");
require("devextreme/viz/sparkline");
const sparkline_1 = require("devextreme/viz/sparkline");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const _z_index_1 = require("../../../data/_z-index");
const _delta_indicator_1 = require("../../widgets/indicators/_delta-indicator");
const _simple_indicator_1 = require("../../widgets/indicators/_simple-indicator");
const _render_helper_1 = require("../../widgets/_render-helper");
class GridColumnPainter {
    static renderDelta(parentContainer, deltaValue, isDetail) {
        let container = document.createElement('div');
        container.classList.add(this.CssClasses.flexDeltaParent);
        container.classList.add(_delta_indicator_1.DeltaIndicator.getIndicatorColorType(deltaValue.type, deltaValue.hasPositiveMeaning, deltaValue.text.useDefaultColor));
        if (!isDetail) {
            container.classList.add(this.CssClasses.rightAlignment);
        }
        parentContainer.appendChild(container);
        let textDiv = document.createElement('div');
        textDiv.classList.add(this.CssClasses.truncated);
        textDiv.innerText = deltaValue.text.value;
        container.appendChild(textDiv);
        let indicatorDiv = document.createElement('div');
        indicatorDiv.classList.add(this.CssClasses.fixed);
        indicatorDiv.classList.add(this.CssClasses.deltaIndicator);
        indicatorDiv.innerHTML = _simple_indicator_1.SimpleIndicator.getIndicator(deltaValue.type, deltaValue.hasPositiveMeaning) || '';
        container.appendChild(indicatorDiv);
    }
    static renderSparkline(name, showStartEndValues, parentContainer, sparklineData) {
        let container = document.createElement('div');
        container.classList.add(name + '_sparkline-container');
        container.classList.add(this.CssClasses.flexParent);
        parentContainer.appendChild(container);
        let sparklineDiv = document.createElement('div');
        sparklineDiv.classList.add(name + '_sparkline');
        container.appendChild(sparklineDiv);
        if (showStartEndValues) {
            let startDiv = document.createElement('div');
            startDiv.classList.add(this.CssClasses.sparklineStartValue);
            startDiv.classList.add(name + '_startValue');
            startDiv.innerText = sparklineData.startText;
            $.fn.constructor(startDiv).prependTo(container);
            let endDiv = document.createElement('div');
            endDiv.classList.add(name + '_endValue');
            endDiv.innerText = sparklineData.endText;
            container.appendChild(endDiv);
        }
        _jquery_helpers_1.extend(sparklineData.sparkline, {
            size: {
                height: 20,
                width: 10
            },
            pointSize: 1
        });
        new sparkline_1.default(sparklineDiv, sparklineData.sparkline);
    }
    static renderBar(columnName, parentContainer, tooltipText, value, zeroValue) {
        let zerovalue = zeroValue;
        let barContainer = document.createElement('div');
        barContainer.classList.add(this.CssClasses.flexParent);
        barContainer.classList.add(columnName + '_bar-container');
        parentContainer.appendChild(barContainer);
        let barDiv = document.createElement('div');
        barDiv.classList.add(columnName + '_bar');
        barContainer.appendChild(barDiv);
        new bullet_1.default(barDiv, {
            startScaleValue: -zerovalue,
            endScaleValue: 1 - zerovalue,
            value: value,
            showZeroLevel: value !== 0 && zerovalue !== 0 && zerovalue !== 1,
            showTarget: false,
            onIncidentOccurred: _render_helper_1.RenderHelper.widgetIncidentOccurred,
            tooltip: {
                container: _utils_1.tooltipContainerSelector,
                customizeTooltip: function () {
                    return {
                        text: tooltipText
                    };
                },
                zIndex: _z_index_1.zIndex.dashboardItemTooltips
            },
            size: {
                height: 20,
                width: 10
            }
        });
    }
    static renderImage(container, imageData) {
        _utils_1.renderImage(container, imageData);
    }
    static renderHyperlink(container, uri, displayValue, isEncodeHtml) {
        if (uri) {
            let a = document.createElement('a');
            a.target = '_blank';
            a.onclick = (event) => event.stopPropagation();
            a.rel = 'noopener noreferrer';
            a.href = _utils_1.isVulnerable(uri) ? '' : uri;
            _render_helper_1.RenderHelper.html(a, displayValue, isEncodeHtml);
            container.appendChild(a);
        }
        else {
            _render_helper_1.RenderHelper.html(container, displayValue, isEncodeHtml);
        }
    }
    static renderValue(container, text, isEncodeHtml) {
        if (string_1.isEmpty(text)) {
            _render_helper_1.RenderHelper.html(container, '&nbsp;', false);
        }
        else {
            _render_helper_1.RenderHelper.html(container, text, isEncodeHtml);
        }
    }
    static changeGridSparklineColumnsWidth(gridRootElement, columnName) {
        var that = this, startValues = gridRootElement.querySelectorAll('.' + columnName + '_startValue'), endValues = gridRootElement.querySelectorAll('.' + columnName + '_endValue'), maxStartWidth = that.calcMaxWidth(startValues), maxEndWidth = that.calcMaxWidth(endValues), sparklineDivs = gridRootElement.querySelectorAll('.' + columnName + '_sparkline'), firstsparklineContainer = $.fn.constructor(gridRootElement.querySelectorAll('.' + columnName + '_sparkline-container')).filter(':visible').get(0), columnWidth = firstsparklineContainer ? $.fn.constructor(firstsparklineContainer).width() : 0, sparklineWidth = columnWidth - (maxStartWidth + maxEndWidth);
        if (sparklineWidth >= 0) {
            $.fn.constructor(startValues).width(maxStartWidth);
            $.fn.constructor(endValues).width(maxEndWidth);
            $.fn.constructor(startValues).show();
            $.fn.constructor(endValues).show();
            for (let i = 0; i < sparklineDivs.length; i++) {
                let sparklineContainer = sparklineDivs[i];
                let sparkline = sparkline_1.default.getInstance(sparklineContainer);
                sparkline.option('size', { width: sparklineWidth });
                $.fn.constructor(sparklineContainer).show();
            }
        }
        else {
            sparklineDivs.forEach(sparklineDiv => {
                $.fn.constructor(sparklineDiv).hide();
            });
            if (columnWidth >= maxStartWidth + maxEndWidth) {
                $.fn.constructor(startValues).show();
            }
            else {
                $.fn.constructor(startValues).hide();
                if (columnWidth >= maxEndWidth) {
                    $.fn.constructor(endValues).show();
                }
                else {
                    $.fn.constructor(endValues).hide();
                }
            }
        }
    }
    static calcMaxWidth(values) {
        var maxWidth = 0;
        var nodeLen = values.length;
        for (let i = 0; i < nodeLen; ++i) {
            maxWidth = Math.max(maxWidth, values[i].offsetWidth);
        }
        return maxWidth;
    }
    static changeGridBarColumnsWidth(gridRootElement, columnName) {
        var that = this, bars = gridRootElement.querySelectorAll('.' + columnName + '_bar'), firstBarContainer = $.fn.constructor(gridRootElement.querySelectorAll('.' + columnName + '_bar-container')).filter(':visible').get(0), columnWidth = firstBarContainer ? $.fn.constructor(firstBarContainer).width() : 0;
        for (let i = 0; i < bars.length; ++i) {
            let barContainer = bars[i];
            if (columnWidth > 0) {
                $.fn.constructor(barContainer).show();
                let bullet = bullet_1.default.getInstance(barContainer);
                bullet.option('size', {
                    width: columnWidth
                });
            }
            else {
                $.fn.constructor(barContainer).hide();
            }
        }
    }
}
exports.GridColumnPainter = GridColumnPainter;
GridColumnPainter.CssClasses = {
    flexParent: 'dx-dashboard-flex-parent',
    flexDeltaParent: 'dx-dashboard-flex-delta-parent',
    sparklineStartValue: 'dx-dashboard-sparkline-start-value',
    deltaIndicator: 'dx-dashboard-delta-indicator',
    truncated: 'dx-dashboard-truncated',
    fixed: 'dx-dashboard-fixed',
    rightAlignment: 'dx-dashboard-flex-right'
};
