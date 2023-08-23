﻿/**
* DevExpress Dashboard (_treemap-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treemapItem = void 0;
const tree_map_1 = require("devextreme/viz/tree_map");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _base_item_1 = require("./_base-item");
const _interactivity_controller_1 = require("./_interactivity-controller");
class treemapItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this.itemElementCustomColor = _jquery_helpers_1.createJQueryCallbacks();
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    dispose() {
        super.dispose();
        this.treemapViewer && this.treemapViewer.dispose();
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this._dataController) {
            this._dataController.elementCustomColor = (eventArgs) => this._elementCustomColor(eventArgs);
        }
    }
    _clearSelectionUnsafe() {
        this.treemapViewer.clearSelection();
    }
    selectTupleUnsafe(tuple, state) {
        var that = this;
        tuple.forEach(tupleValue => {
            that._selectNodes(tupleValue.value, state);
        });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        this._applySelection();
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var options = this._getTreeMapViewerOptions();
        this._raiseItemWidgetOptionsPrepared(options);
        if (changeExisting && this.treemapViewer) {
            this.treemapViewer.option(options);
        }
        else {
            this.treemapViewer = new tree_map_1.default(element, options);
        }
        var selectedValues = this.options.SelectedValues;
        if (selectedValues)
            this.setSelection(selectedValues);
        return false;
    }
    updateContentStateUnsafe() {
        if (this._getCustomHoverEnabled()) {
            this.treemapViewer.option('hoverEnabled', true);
        }
    }
    _selectNodes(valueSet, state) {
        var that = this;
        that.treemapViewer.getRootNode().getAllNodes().forEach(node => {
            if (_utils_1.checkValuesAreEqual(valueSet, node.data.uniqueValue))
                node.select(state);
        });
    }
    _clickAction(tuple) {
        var newTuples = [], tupleValue = tuple[0], values = this._dataController.getChildrenNodesUniqueValues(tupleValue.value), isMultipleMode = this._canSetMultipleMasterFilter() || this.customSelectionMode === _interactivity_controller_1.dashboardSelectionMode.multiple, currentSelection = isMultipleMode && this.allowMultiselection ? this.getSelectedTuples().slice() : [], existingTuples = [];
        if (!isMultipleMode && values.length > 1)
            return;
        for (var i = 0; i < values.length; i++) {
            var newTuple = [{ axisName: tupleValue.axisName, value: values[i] }];
            if (_utils_1.checkArrayContainsTuple(currentSelection, newTuple) === undefined)
                newTuples.push(newTuple);
            else
                existingTuples.push(newTuple);
        }
        this.interactivityController.clickAction(newTuples.length > 0 ? newTuples : existingTuples);
    }
    _elementCustomColor(eventArgs) {
        this.itemElementCustomColor.fire(this.getName(), eventArgs);
    }
    _getTreeMapViewerOptions() {
        var that = this, viewModel = that.options.ViewModel, isSingleMasterFilterMode = this._canSetMasterFilter() && !this._canSetMultipleMasterFilter(), setLabel = function (node) {
            var label = that._dataController.getLabel(node, that._isEncodeHtml());
            if (label)
                node.label(label);
            else
                node.label(' ');
        }, options = {
            dataSource: that._dataController.getDataSource(),
            layoutAlgorithm: that._getLayoutAlgorithm(),
            layoutDirection: that._getLayoutDirection(),
            selectionMode: 'multiple',
            tile: {
                label: {
                    textOverflow: 'ellipsis'
                }
            },
            hoverEnabled: that.isInteractivityActionEnabled(),
            tooltip: {
                enabled: true,
                container: _utils_1.tooltipContainerSelector,
                customizeTooltip: function (arg) {
                    return {
                        text: that._dataController.getTooltip(arg.node, that._isEncodeHtml())
                    };
                }
            },
            onClick: function (e) {
                that._raiseItemClick(e.node.data);
            },
            onNodesRendering: function () {
                this.getRootNode().getAllNodes().forEach(setLabel);
            },
            group: {
                hoverEnabled: !isSingleMasterFilterMode,
                label: {
                    textOverflow: 'ellipsis'
                }
            }
        };
        return options;
    }
    _getLayoutAlgorithm() {
        var viewModel = this.options.ViewModel;
        switch (viewModel.LayoutAlgorithm) {
            case 'SliceAndDice':
                return this.width() >= this.height() ? 'sliceanddice' : 'rotatedsliceanddice';
            case 'Squarified':
                return 'squarified';
            case 'Striped':
                return 'strip';
        }
    }
    _getLayoutDirection() {
        var viewModel = this.options.ViewModel;
        switch (viewModel.LayoutDirection) {
            case 'BottomLeftToTopRight':
                return 'leftBottomRightTop';
            case 'BottomRightToTopLeft':
                return 'rightBottomLeftTop';
            case 'TopLeftToBottomRight':
                return 'leftTopRightBottom';
            case 'TopRightToBottomLeft':
                return 'rightTopLeftBottom';
        }
    }
    _getDataPoint(element) {
        var that = this;
        return {
            getValues: function () {
                return that._getElementInteractionValue(element);
            },
            getMeasureIds: function () {
                return that._getDataPointMeasureIds();
            },
            getDeltaIds: function () {
                return [];
            }
        };
    }
    _getElementInteractionValue(element) {
        if (!this.options.ViewModel.ProvideValuesAsArguments)
            return element.uniqueValue;
    }
    _getDataPointMeasureIds() {
        var viewModel = this.options.ViewModel, contentDescription = viewModel.ContentDescription, elementIndex = 0, measureIds = [];
        if (contentDescription != null && contentDescription.ElementSelectionEnabled)
            elementIndex = contentDescription.SelectedElementIndex;
        if (!viewModel.ProvideValuesAsArguments && viewModel.ValueDataMembers.length > 0) {
            measureIds.push(viewModel.ValueDataMembers[elementIndex]);
        }
        else {
            viewModel.ValueDataMembers.forEach(value => {
                measureIds.push(value);
            });
        }
        return measureIds;
    }
    _updateContentSizeUnsafe() {
        super._updateContentSizeUnsafe();
        if (!!this.treemapViewer) {
            this.treemapViewer.option('layoutAlgorithm', this._getLayoutAlgorithm());
            this.treemapViewer.render();
        }
    }
    _getWidget() {
        return this.treemapViewer;
    }
    _isMultiDataSupported() {
        return true;
    }
    _applySelectionUnsafe() {
        var that = this;
        that.getSelectedTuples().forEach(tuple => that.selectTuple(tuple, true));
    }
}
exports.treemapItem = treemapItem;
