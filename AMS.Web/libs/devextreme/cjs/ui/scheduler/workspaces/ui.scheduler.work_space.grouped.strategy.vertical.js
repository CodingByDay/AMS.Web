/**
 * DevExtreme (cjs/ui/scheduler/workspaces/ui.scheduler.work_space.grouped.strategy.vertical.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _position = require("../../../core/utils/position");
var _cache = require("./cache");
var _classes = require("../classes");
var _base = require("../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [],
            _n = !0,
            _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) {
                    return
                }
                _n = !1
            } else {
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {}
            }
        } catch (err) {
            _d = !0, _e = err
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) {
                    return
                }
            } finally {
                if (_d) {
                    throw _e
                }
            }
        }
        return _arr
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}
var DATE_HEADER_OFFSET = 10;
var WORK_SPACE_BORDER = 1;
var VerticalGroupedStrategy = function() {
    function VerticalGroupedStrategy(workSpace) {
        this._workSpace = workSpace;
        this.cache = new _cache.Cache
    }
    var _proto = VerticalGroupedStrategy.prototype;
    _proto.prepareCellIndexes = function(cellCoordinates, groupIndex, inAllDayRow) {
        var rowIndex = cellCoordinates.rowIndex + groupIndex * this._workSpace._getRowCount();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            rowIndex += groupIndex;
            if (!inAllDayRow) {
                rowIndex += 1
            }
        }
        return {
            rowIndex: rowIndex,
            columnIndex: cellCoordinates.columnIndex
        }
    };
    _proto.getGroupIndex = function(rowIndex) {
        return Math.floor(rowIndex / this._workSpace._getRowCount())
    };
    _proto.calculateHeaderCellRepeatCount = function() {
        return 1
    };
    _proto.insertAllDayRowsIntoDateTable = function() {
        return this._workSpace.option("showAllDayPanel")
    };
    _proto.getTotalCellCount = function() {
        return this._workSpace._getCellCount()
    };
    _proto.getTotalRowCount = function() {
        return this._workSpace._getRowCount() * this._workSpace._getGroupCount()
    };
    _proto.calculateTimeCellRepeatCount = function() {
        return this._workSpace._getGroupCount() || 1
    };
    _proto.getWorkSpaceMinWidth = function() {
        var minWidth = this._workSpace._getWorkSpaceWidth();
        var workspaceContainerWidth = (0, _position.getBoundingRect)(this._workSpace.$element().get(0)).width - this._workSpace.getTimePanelWidth() - this._workSpace.getGroupTableWidth() - 2 * WORK_SPACE_BORDER;
        if (minWidth < workspaceContainerWidth) {
            minWidth = workspaceContainerWidth
        }
        return minWidth
    };
    _proto.getAllDayOffset = function() {
        return 0
    };
    _proto.getGroupCountClass = function(groups) {
        return (0, _base.getVerticalGroupCountClass)(groups)
    };
    _proto.getLeftOffset = function() {
        return this._workSpace.getTimePanelWidth() + this._workSpace.getGroupTableWidth()
    };
    _proto.getGroupBoundsOffset = function(groupIndex, _ref) {
        var _this = this;
        var _ref2 = _slicedToArray(_ref, 2),
            $firstCell = _ref2[0],
            $lastCell = _ref2[1];
        return this.cache.get("groupBoundsOffset".concat(groupIndex), (function() {
            var startDayHour = _this._workSpace.option("startDayHour");
            var endDayHour = _this._workSpace.option("endDayHour");
            var hoursInterval = _this._workSpace.option("hoursInterval");
            var dayHeight = (0, _base.calculateDayDuration)(startDayHour, endDayHour) / hoursInterval * _this._workSpace.getCellHeight();
            var scrollTop = _this.getScrollableScrollTop();
            var topOffset = groupIndex * dayHeight + (0, _position.getBoundingRect)(_this._workSpace._$thead.get(0)).height + _this._workSpace.option("getHeaderHeight")() + DATE_HEADER_OFFSET - scrollTop;
            if (_this._workSpace.option("showAllDayPanel") && _this._workSpace.supportAllDayRow()) {
                topOffset += _this._workSpace.getCellHeight() * (groupIndex + 1)
            }
            var bottomOffset = topOffset + dayHeight;
            var _$firstCell$getBoundi = $firstCell.getBoundingClientRect(),
                left = _$firstCell$getBoundi.left;
            var _$lastCell$getBoundin = $lastCell.getBoundingClientRect(),
                right = _$lastCell$getBoundin.right;
            return _this._groupBoundsOffset = {
                left: left,
                right: right,
                top: topOffset,
                bottom: bottomOffset
            }
        }))
    };
    _proto.shiftIndicator = function($indicator, height, rtlOffset, i) {
        var offset = this._workSpace.getIndicatorOffset(0);
        var tableOffset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        var horizontalOffset = rtlOffset ? rtlOffset - offset : offset;
        var verticalOffset = this._workSpace._getRowCount() * this._workSpace.getCellHeight() * i;
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            verticalOffset += this._workSpace.getAllDayHeight() * (i + 1)
        }
        $indicator.css("left", horizontalOffset + tableOffset);
        $indicator.css("top", height + verticalOffset)
    };
    _proto.getShaderOffset = function(i, width) {
        var offset = this._workSpace.option("crossScrollingEnabled") ? 0 : this._workSpace.getGroupTableWidth();
        return this._workSpace.option("rtlEnabled") ? (0, _position.getBoundingRect)(this._$container.get(0)).width - offset - this._workSpace.getWorkSpaceLeftOffset() - width : offset
    };
    _proto.getShaderTopOffset = function(i) {
        return 0
    };
    _proto.getShaderHeight = function() {
        var height = this._workSpace.getIndicationHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    };
    _proto.getShaderMaxHeight = function() {
        var height = this._workSpace._getRowCount() * this._workSpace.getCellHeight();
        if (this._workSpace.supportAllDayRow() && this._workSpace.option("showAllDayPanel")) {
            height += this._workSpace.getCellHeight()
        }
        return height
    };
    _proto.getShaderWidth = function() {
        return this._workSpace.getIndicationWidth(0)
    };
    _proto.getScrollableScrollTop = function() {
        return this._workSpace.getScrollable().scrollTop()
    };
    _proto.addAdditionalGroupCellClasses = function(cellClass, index, i, j) {
        cellClass = this._addLastGroupCellClass(cellClass, i + 1);
        return this._addFirstGroupCellClass(cellClass, i + 1)
    };
    _proto._addLastGroupCellClass = function(cellClass, index) {
        if (index % this._workSpace._getRowCount() === 0) {
            return "".concat(cellClass, " ").concat(_classes.LAST_GROUP_CELL_CLASS)
        }
        return cellClass
    };
    _proto._addFirstGroupCellClass = function(cellClass, index) {
        if ((index - 1) % this._workSpace._getRowCount() === 0) {
            return "".concat(cellClass, " ").concat(_classes.FIRST_GROUP_CELL_CLASS)
        }
        return cellClass
    };
    return VerticalGroupedStrategy
}();
var _default = VerticalGroupedStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
