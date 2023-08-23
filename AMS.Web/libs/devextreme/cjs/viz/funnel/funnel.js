/**
 * DevExtreme (cjs/viz/funnel/funnel.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _tiling = require("./tiling");
var _tiling2 = _interopRequireDefault(require("./tiling.funnel"));
var _tiling3 = _interopRequireDefault(require("./tiling.pyramid"));
var _common = require("../../core/utils/common");
var _base_widget = _interopRequireDefault(require("../core/base_widget"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _item = _interopRequireDefault(require("./item"));
var _data_source = require("../core/data_source");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var NODES_CREATE_CHANGE = "NODES_CREATE";
(0, _tiling.addAlgorithm)("dynamicslope", _tiling2.default, true);
(0, _tiling.addAlgorithm)("dynamicheight", _tiling3.default);

function invertFigure(figure) {
    return figure.map((function(coord, index) {
        return index % 2 ? 1 - coord : coord
    }))
}

function getLegendItemState(itemState) {
    return {
        fill: itemState.fill,
        hatching: itemState.hatching
    }
}
var dxFunnel = _base_widget.default.inherit({
    _rootClass: "dxf-funnel",
    _rootClassPrefix: "dxf",
    _proxyData: [],
    _optionChangesMap: {
        dataSource: "DATA_SOURCE",
        neckWidth: NODES_CREATE_CHANGE,
        neckHeight: NODES_CREATE_CHANGE,
        inverted: NODES_CREATE_CHANGE,
        algorithm: NODES_CREATE_CHANGE,
        item: NODES_CREATE_CHANGE,
        valueField: NODES_CREATE_CHANGE,
        argumentField: NODES_CREATE_CHANGE,
        colorField: NODES_CREATE_CHANGE,
        palette: NODES_CREATE_CHANGE,
        paletteExtensionMode: NODES_CREATE_CHANGE,
        sortData: NODES_CREATE_CHANGE
    },
    _themeDependentChanges: [NODES_CREATE_CHANGE],
    _getDefaultSize: function() {
        return {
            width: 400,
            height: 400
        }
    },
    _themeSection: "funnel",
    _fontFields: ["legend.title.font", "legend.title.subtitle.font", "legend.font"],
    _optionChangesOrder: ["DATA_SOURCE"],
    _initialChanges: ["DATA_SOURCE"],
    _initCore: function() {
        this._group = this._renderer.g().append(this._renderer.root);
        this._items = []
    },
    _eventsMap: {
        onHoverChanged: {
            name: "hoverChanged"
        },
        onSelectionChanged: {
            name: "selectionChanged"
        }
    },
    _disposeCore: _common.noop,
    _applySize: function(rect) {
        this._rect = rect.slice();
        this._change(["TILING"]);
        return this._rect
    },
    _getAlignmentRect: function() {
        return this._rect
    },
    _change_TILING: function() {
        var that = this;
        var items = that._items;
        var rect = that._rect;
        var convertCoord = function(coord, index) {
            var offset = index % 2;
            return rect[0 + offset] + (rect[2 + offset] - rect[0 + offset]) * coord
        };
        this._group.clear();
        items.forEach((function(item, index) {
            var coords = item.figure.map(convertCoord);
            var element = that._renderer.path([], "area").attr({
                points: coords
            }).append(that._group);
            item.coords = coords;
            item.element = element
        }));
        this._requestChange(["TILES"])
    },
    _customChangesOrder: [NODES_CREATE_CHANGE, "LAYOUT", "TILING", "TILES", "DRAWN"],
    _dataSourceChangedHandler: function() {
        this._requestChange([NODES_CREATE_CHANGE])
    },
    _change_DRAWN: function() {
        this._drawn()
    },
    _change_DATA_SOURCE: function() {
        this._change(["DRAWN"]);
        this._updateDataSource()
    },
    _change_NODES_CREATE: function() {
        this._buildNodes()
    },
    _change_TILES: function() {
        this._applyTilesAppearance()
    },
    _suspend: function() {
        if (!this._applyingChanges) {
            this._suspendChanges()
        }
    },
    _resume: function() {
        if (!this._applyingChanges) {
            this._resumeChanges()
        }
    },
    _applyTilesAppearance: function() {
        this._items.forEach((function(item) {
            var state = item.getState();
            item.element.smartAttr(item.states[state])
        }))
    },
    _hitTestTargets: function(x, y) {
        var that = this;
        var data;
        this._proxyData.some((function(callback) {
            data = callback.call(that, x, y);
            if (data) {
                return true
            }
        }));
        return data
    },
    clearHover: function() {
        this._suspend();
        this._items.forEach((function(item) {
            item.isHovered() && item.hover(false)
        }));
        this._resume()
    },
    clearSelection: function() {
        this._suspend();
        this._items.forEach((function(item) {
            item.isSelected() && item.select(false)
        }));
        this._resume()
    },
    _getData: function() {
        var data = this._dataSourceItems() || [];
        var valueField = this._getOption("valueField", true);
        var argumentField = this._getOption("argumentField", true);
        var colorField = this._getOption("colorField", true);
        var processedData = data.reduce((function(d, item) {
            var value = Number(item[valueField]);
            if (value >= 0) {
                d[0].push({
                    value: value,
                    color: item[colorField],
                    argument: item[argumentField],
                    dataItem: item
                });
                d[1] += value
            }
            return d
        }), [
            [], 0
        ]);
        var items = processedData[0];
        if (data.length > 0 && 0 === items.length) {
            this._incidentOccurred("E2005", valueField)
        }
        if (!processedData[1]) {
            return []
        }
        if (this._getOption("sortData", true)) {
            items.sort((function(a, b) {
                return b.value - a.value
            }))
        }
        return items
    },
    _buildNodes: function() {
        var that = this;
        var data = that._getData();
        var algorithm = (0, _tiling.getAlgorithm)(that._getOption("algorithm", true));
        var percents = algorithm.normalizeValues(data);
        var itemOptions = that._getOption("item");
        var figures = algorithm.getFigures(percents, that._getOption("neckWidth", true), that._getOption("neckHeight", true));
        var palette = that._themeManager.createPalette(that._getOption("palette", true), {
            useHighlight: true,
            extensionMode: that._getOption("paletteExtensionMode", true),
            count: figures.length
        });
        that._items = figures.map((function(figure, index) {
            var curData = data[index];
            var node = new _item.default(that, {
                figure: figure,
                data: curData,
                percent: percents[index],
                id: index,
                color: curData.color || palette.getNextColor(),
                itemOptions: itemOptions
            });
            return node
        }));
        if (that._getOption("inverted", true)) {
            that._items.forEach((function(item) {
                item.figure = invertFigure(item.figure)
            }))
        }
        that._renderer.initDefsElements();
        that._change(["TILING", "DRAWN"])
    },
    _showTooltip: _common.noop,
    hideTooltip: _common.noop,
    getAllItems: function() {
        return this._items.slice()
    },
    _getLegendData: function() {
        return this._items.map((function(item) {
            var states = item.states;
            return {
                id: item.id,
                visible: true,
                text: item.argument,
                item: item,
                states: {
                    normal: getLegendItemState(states.normal),
                    hover: getLegendItemState(states.hover),
                    selection: getLegendItemState(states.selection)
                }
            }
        }))
    },
    _getMinSize: function() {
        var adaptiveLayout = this._getOption("adaptiveLayout");
        return [adaptiveLayout.width, adaptiveLayout.height]
    }
});
(0, _component_registrator.default)("dxFunnel", dxFunnel);
var _default = dxFunnel;
exports.default = _default;
dxFunnel.addPlugin(_data_source.plugin);
module.exports = exports.default;
module.exports.default = exports.default;
