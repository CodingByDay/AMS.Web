/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.size_helper.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttSizeHelper = void 0;
var _size = require("../../core/utils/size");
var _window = require("../../core/utils/window");
var GanttSizeHelper = function() {
    function GanttSizeHelper(gantt) {
        this._gantt = gantt
    }
    var _proto = GanttSizeHelper.prototype;
    _proto._setTreeListDimension = function(dimension, value) {
        var _this$_gantt$_ganttTr;
        var setter = "width" === dimension ? _size.setWidth : _size.setHeight;
        var getter = "width" === dimension ? _size.getWidth : _size.getHeight;
        setter(this._gantt._$treeListWrapper, value);
        null === (_this$_gantt$_ganttTr = this._gantt._ganttTreeList) || void 0 === _this$_gantt$_ganttTr ? void 0 : _this$_gantt$_ganttTr.setOption(dimension, getter(this._gantt._$treeListWrapper))
    };
    _proto._setGanttViewDimension = function(dimension, value) {
        var setter = "width" === dimension ? _size.setWidth : _size.setHeight;
        var getter = "width" === dimension ? _size.getWidth : _size.getHeight;
        setter(this._gantt._$ganttView, value);
        this._gantt._setGanttViewOption(dimension, getter(this._gantt._$ganttView))
    };
    _proto._getPanelsWidthByOption = function() {
        var _leftPanelWidth$index, _leftPanelWidth$index2;
        var ganttWidth = (0, _size.getWidth)(this._gantt._$element);
        var leftPanelWidth = this._gantt.option("taskListWidth");
        var rightPanelWidth;
        if (!isNaN(leftPanelWidth)) {
            rightPanelWidth = ganttWidth - parseInt(leftPanelWidth)
        } else if ((null === (_leftPanelWidth$index = leftPanelWidth.indexOf) || void 0 === _leftPanelWidth$index ? void 0 : _leftPanelWidth$index.call(leftPanelWidth, "px")) > 0) {
            rightPanelWidth = ganttWidth - parseInt(leftPanelWidth.replace("px", "")) + "px"
        } else if ((null === (_leftPanelWidth$index2 = leftPanelWidth.indexOf) || void 0 === _leftPanelWidth$index2 ? void 0 : _leftPanelWidth$index2.call(leftPanelWidth, "%")) > 0) {
            rightPanelWidth = 100 - parseInt(leftPanelWidth.replace("%", "")) + "%"
        }
        return {
            leftPanelWidth: leftPanelWidth,
            rightPanelWidth: rightPanelWidth
        }
    };
    _proto.onAdjustControl = function() {
        var elementHeight = (0, _size.getHeight)(this._gantt._$element);
        this.updateGanttWidth();
        this.setGanttHeight(elementHeight)
    };
    _proto.onApplyPanelSize = function(e) {
        this.setInnerElementsWidth(e);
        this.updateGanttRowHeights()
    };
    _proto.updateGanttRowHeights = function() {
        var rowHeight = this._gantt._ganttTreeList.getRowHeight();
        if (this._gantt._getGanttViewOption("rowHeight") !== rowHeight) {
            var _this$_gantt$_ganttVi;
            this._gantt._setGanttViewOption("rowHeight", rowHeight);
            null === (_this$_gantt$_ganttVi = this._gantt._ganttView) || void 0 === _this$_gantt$_ganttVi ? void 0 : _this$_gantt$_ganttVi._ganttViewCore.updateRowHeights(rowHeight)
        }
    };
    _proto.adjustHeight = function() {
        if (!this._gantt._hasHeight) {
            this._gantt._setGanttViewOption("height", 0);
            this._gantt._setGanttViewOption("height", this._gantt._ganttTreeList.getOffsetHeight())
        }
    };
    _proto.setInnerElementsWidth = function(widths) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        var takeWithFromOption = !widths;
        if (takeWithFromOption) {
            widths = this._getPanelsWidthByOption();
            this._setTreeListDimension("width", 0);
            this._setGanttViewDimension("width", 0)
        }
        this._setTreeListDimension("width", widths.leftPanelWidth);
        this._setGanttViewDimension("width", widths.rightPanelWidth);
        if (takeWithFromOption) {
            this._gantt._splitter._setSplitterPositionLeft()
        }
    };
    _proto.updateGanttWidth = function() {
        this._gantt._splitter._dimensionChanged()
    };
    _proto.setGanttHeight = function(height) {
        var _this$_gantt$_ganttVi2;
        var toolbarHeightOffset = this._gantt._$toolbarWrapper.get(0).offsetHeight;
        var mainWrapperHeight = height - toolbarHeightOffset;
        this._setTreeListDimension("height", mainWrapperHeight);
        this._setGanttViewDimension("height", mainWrapperHeight);
        null === (_this$_gantt$_ganttVi2 = this._gantt._ganttView) || void 0 === _this$_gantt$_ganttVi2 ? void 0 : _this$_gantt$_ganttVi2._ganttViewCore.resetAndUpdate()
    };
    return GanttSizeHelper
}();
exports.GanttSizeHelper = GanttSizeHelper;
