/**
 * DevExtreme (cjs/ui/scheduler/workspaces/cells_selection_state.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = require("../../../renovation/ui/scheduler/workspaces/base/utils");

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}
var CellsSelectionState = function() {
    function CellsSelectionState(viewDataProvider) {
        this._viewDataProvider = viewDataProvider;
        this._focusedCell = null;
        this._selectedCells = null;
        this._firstSelectedCell = null;
        this._prevFocusedCell = null;
        this._prevSelectedCells = null
    }
    var _proto = CellsSelectionState.prototype;
    _proto.setFocusedCell = function(rowIndex, columnIndex, isAllDay) {
        if (rowIndex >= 0) {
            var cell = this._viewDataProvider.getCellData(rowIndex, columnIndex, isAllDay);
            this._focusedCell = cell
        }
    };
    _proto.setSelectedCells = function(lastCellCoordinates) {
        var firstCellCoordinates = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
        var viewDataProvider = this._viewDataProvider;
        var lastRowIndex = lastCellCoordinates.rowIndex,
            lastColumnIndex = lastCellCoordinates.columnIndex,
            isLastCellAllDay = lastCellCoordinates.allDay;
        if (lastRowIndex < 0) {
            return
        }
        var firstCell = firstCellCoordinates ? viewDataProvider.getCellData(firstCellCoordinates.rowIndex, firstCellCoordinates.columnIndex, firstCellCoordinates.allDay) : this._firstSelectedCell;
        var lastCell = viewDataProvider.getCellData(lastRowIndex, lastColumnIndex, isLastCellAllDay);
        this._firstSelectedCell = firstCell;
        this._selectedCells = (0, _utils.getSelectedCells)(this._viewDataProvider, firstCell, lastCell, isLastCellAllDay)
    };
    _proto.setSelectedCellsByData = function(selectedCellsData) {
        this._selectedCells = selectedCellsData
    };
    _proto.getSelectedCells = function() {
        return this._selectedCells
    };
    _proto.releaseSelectedAndFocusedCells = function() {
        this.releaseSelectedCells();
        this.releaseFocusedCell()
    };
    _proto.releaseSelectedCells = function() {
        this._prevSelectedCells = this._selectedCells;
        this._prevFirstSelectedCell = this._firstSelectedCell;
        this._selectedCells = null;
        this._firstSelectedCell = null
    };
    _proto.releaseFocusedCell = function() {
        this._prevFocusedCell = this._focusedCell;
        this._focusedCell = null
    };
    _proto.restoreSelectedAndFocusedCells = function() {
        this._selectedCells = this._selectedCells || this._prevSelectedCells;
        this._focusedCell = this._focusedCell || this._prevFocusedCell;
        this._firstSelectedCell = this._firstSelectedCell || this._prevFirstSelectedCell;
        this._prevSelectedCells = null;
        this._prevFirstSelectedCell = null;
        this._prevFocusedCell = null
    };
    _proto.clearSelectedAndFocusedCells = function() {
        this._prevSelectedCells = null;
        this._selectedCells = null;
        this._prevFocusedCell = null;
        this._focusedCell = null
    };
    _createClass(CellsSelectionState, [{
        key: "viewDataProvider",
        get: function() {
            return this._viewDataProvider
        }
    }, {
        key: "focusedCell",
        get: function() {
            var focusedCell = this._focusedCell;
            if (!focusedCell) {
                return
            }
            var groupIndex = focusedCell.groupIndex,
                startDate = focusedCell.startDate,
                allDay = focusedCell.allDay;
            var cellInfo = {
                groupIndex: groupIndex,
                startDate: startDate,
                isAllDay: allDay,
                index: focusedCell.index
            };
            var cellPosition = this.viewDataProvider.findCellPositionInMap(cellInfo);
            return {
                coordinates: cellPosition,
                cellData: focusedCell
            }
        }
    }]);
    return CellsSelectionState
}();
exports.default = CellsSelectionState;
module.exports = exports.default;
module.exports.default = exports.default;
