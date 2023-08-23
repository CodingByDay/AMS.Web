﻿/**
* DevExpress Dashboard (_treemap-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treemapDataController = void 0;
const string_1 = require("devextreme/core/utils/string");
const special_values_1 = require("../special-values");
const _formatter_1 = require("../_formatter");
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _utils_1 = require("../_utils");
const _data_controller_base_1 = require("./_data-controller-base");
class treemapDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this.elementCustomColor = options.elementCustomColor;
        this._prepare();
    }
    _prepare() {
        var multiData = this.multiData;
        if (multiData) {
            let dimensions = multiData.getDimensions();
            this.last_dimension_id = dimensions.length > 0 ? dimensions[dimensions.length - 1].id : null;
        }
        this.nodeHash = {};
    }
    getDataSource() {
        var that = this, dataSource = [], viewModel = that.viewModel, multiData = that.multiData, measureIndex = 0, contentDescription = viewModel.ContentDescription, measure, measureValue, elementColor, valueId;
        if (viewModel.ProvideValuesAsArguments) {
            for (var i = 0; i < viewModel.ValueDataMembers.length; i++) {
                valueId = viewModel.ValueDataMembers[i];
                measure = multiData.getMeasureById(valueId);
                measureValue = multiData.getMeasureValue(valueId);
                elementColor = _utils_1.toColor(multiData.getMeasureValue(viewModel.ColorDataMembers[i]).getValue());
                elementColor = that._getElementCustomColor(multiData.getAxis().getRootPoint(), elementColor, valueId);
                dataSource.push({
                    name: measure.name,
                    value: measureValue.getValue(),
                    valueText: measureValue.getDisplayText(),
                    color: elementColor
                });
            }
            if (viewModel.LayoutAlgorithm === 'SliceAndDice') {
                dataSource.sort(function (a, b) {
                    return b.value - a.value;
                });
            }
        }
        else {
            if (contentDescription != null && contentDescription.ElementSelectionEnabled)
                measureIndex = contentDescription.SelectedElementIndex;
            if (viewModel.ValueDataMembers.length > 0) {
                var root = multiData.getAxis().getRootPoint();
                dataSource = that._getChildren(root, measureIndex, viewModel.GroupArgumentDataMembers, null);
            }
        }
        return dataSource;
    }
    getLabel(node, encodeHtml = true) {
        var viewModel = this.viewModel;
        return this._getNodeText(node, viewModel.TilesLabelContentType, viewModel.GroupsLabelContentType, encodeHtml);
    }
    getTooltip(node, encodeHtml = true) {
        var viewModel = this.viewModel;
        return this._getNodeText(node, viewModel.TilesTooltipContentType, viewModel.GroupsTooltipContentType, encodeHtml);
    }
    getChildrenNodesUniqueValues(value) {
        var node = this.nodeHash[value], res = [];
        this._fillChildrenNodesUniqueValues(res, node);
        return res;
    }
    _fillChildrenNodesUniqueValues(res, node) {
        if (node.items) {
            for (var i = 0; i < node.items.length; i++) {
                this._fillChildrenNodesUniqueValues(res, node.items[i]);
            }
        }
        else
            res.push(node.uniqueValue);
    }
    _getChildren(currentPoint, measureIndex, groupArgumentDataMembers, prevArgumentDataMember) {
        var that = this, viewModel = that.viewModel, items = [], currentArgumentDataMember = groupArgumentDataMembers[0], points, recoveredGroupArgumentDataMembers, node;
        if (groupArgumentDataMembers.length > 1) {
            recoveredGroupArgumentDataMembers = [];
            for (var i = 1; i < groupArgumentDataMembers.length; i++) {
                recoveredGroupArgumentDataMembers.push(groupArgumentDataMembers[i]);
            }
            points = currentPoint.getPointsByDimensionId(currentArgumentDataMember);
            points.forEach(point => {
                node = that._createNode(point, measureIndex, prevArgumentDataMember);
                node.items = that._getChildren(point, measureIndex, recoveredGroupArgumentDataMembers, currentArgumentDataMember);
                items.push(node);
            });
        }
        else {
            points = currentPoint.getPointsByDimensionId(that.last_dimension_id);
            points.forEach(point => {
                node = that._createNode(point, measureIndex, prevArgumentDataMember);
                node.color = that._getColor(point, measureIndex);
                items.push(node);
            });
        }
        return items;
    }
    _createNode(point, measureIndex, prevArgumentDataMember) {
        var viewModel = this.viewModel, multiData = this.multiData, valueDataMember = viewModel.ValueDataMembers[measureIndex], measureValue = multiData.getSlice(point).getMeasureValue(valueDataMember), uniqueValue = point.getUniquePath(), node = {
            name: this._getArgumentString(point, prevArgumentDataMember),
            value: measureValue.getValue(),
            valueText: measureValue.getDisplayText(),
            uniqueValue: uniqueValue,
            format: function (value) {
                return _formatter_1.format(value, multiData.getMeasureFormat(valueDataMember));
            }
        };
        this.nodeHash[node.uniqueValue] = node;
        return node;
    }
    _getNodeText(node, tileType, groupType, encodeHtml) {
        if (node.isLeaf()) {
            return this._getTextByContentType(tileType, node.data.name, node.data.valueText, encodeHtml);
        }
        else {
            return this._getTextByContentType(groupType, node.data.name, node.data.format(node.value()), encodeHtml);
        }
    }
    _getTextByContentType(contentType, argumentText, valueText, encodeHtml) {
        var argumentEncoded = encodeHtml ? _utils_1.encodeHtml(argumentText) : argumentText;
        var valueEncoded = encodeHtml ? _utils_1.encodeHtml(valueText) : valueText;
        switch (contentType) {
            case 'Argument':
                return argumentEncoded;
            case 'ArgumentAndValue':
                return string_1.format(_localizer_1.localizer.getString(_localization_ids_1.localizationId.TreemapLabelValueTemplate), argumentEncoded, valueEncoded);
            case 'Value':
                return valueEncoded;
        }
    }
    _getArgumentString(point, prevArgumentDataMember) {
        var argumentString, path = point.getAxisPath(), dimension;
        if (this.drillDownState[point.getAxisName()]) {
            return point.getDisplayText();
        }
        for (var i = path.length - 1; i >= 0; i--) {
            dimension = path[i].getDimension();
            if (prevArgumentDataMember && dimension && dimension.id === prevArgumentDataMember)
                break;
            if (path[i].getUniqueValue() !== special_values_1.specialValues.olapNullValueGuid) {
                if (argumentString) {
                    argumentString = string_1.format(_localizer_1.localizer.getString(_localization_ids_1.localizationId.TreemapLabelArgumentTemplate), path[i].getDisplayText(), argumentString);
                }
                else {
                    argumentString = path[i].getDisplayText();
                }
            }
        }
        return argumentString;
    }
    _getColor(point, measureIndex) {
        var that = this, viewModel = that.viewModel, multiData = that.multiData, colorId = viewModel.ColorDataMembers[measureIndex], color;
        if (viewModel.ColorArgument) {
            var colorPoint = point.getParentByDimensionId(viewModel.ColorArgument);
            multiData = multiData.getSlice(colorPoint);
        }
        color = _utils_1.toColor(multiData.getMeasureValue(colorId).getValue());
        return that._getElementCustomColor(point, color, viewModel.ValueDataMembers[measureIndex]);
    }
    _getElementCustomColor(point, color, valueId) {
        var that = this, viewModel = that.viewModel, newColor;
        if (that.elementCustomColor && color) {
            var customElementColorEventArgs = {
                targetElement: [point],
                measureIds: [valueId],
                color: color
            };
            that.elementCustomColor(customElementColorEventArgs);
            newColor = customElementColorEventArgs.color;
            if (!newColor.colorIsInvalid && newColor !== color) {
                return newColor;
            }
        }
        return color;
    }
}
exports.treemapDataController = treemapDataController;
