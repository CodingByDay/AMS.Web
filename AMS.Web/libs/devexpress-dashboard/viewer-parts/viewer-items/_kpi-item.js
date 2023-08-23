﻿/**
* DevExpress Dashboard (_kpi-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kpiItem = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _widget_viewer_item_1 = require("./_widget-viewer-item");
class kpiItem extends _widget_viewer_item_1.widgetViewerItem {
    constructor(container, options) {
        super(container, options);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var result = super.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        element.classList.add('dx-dashboard-widget-viewer-item');
        return result;
    }
    _showTitle() {
        return true;
    }
    _getElementsName() {
    }
    selectTupleUnsafe(tuple, state) {
        this.widgetsViewer.itemsList.forEach(viewer => {
            if (_utils_1.checkValuesAreEqual(viewer.tag, tuple[0].value)) {
                if (state) {
                    viewer.select();
                }
                else {
                    viewer.clearSelection();
                }
            }
        });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        this._applySelection();
    }
    _getDataPoint(element) {
        var that = this, viewModel = that.options.ViewModel, elementTag = element.tag, titleValues = elementTag ? elementTag : [], elementIndex = elementTag ? 0 : element.index, elViewModel = viewModel[that._getElementsName()][elementIndex];
        return {
            getValues: function (name) {
                return (name == 'Default') ? titleValues : null;
            },
            getDeltaIds: function () {
                return elViewModel.DataItemType === 'Delta' ? [elViewModel.ID] : [];
            },
            getMeasureIds: function () {
                return elViewModel.DataItemType === 'Measure' ? [elViewModel.ID] : [];
            },
            getSelectionValues: function () {
                return elementTag;
            }
        };
    }
    _isMultiDataSupported() {
        return true;
    }
    _setSourceItemProperties(sourceItem, elementModel, props) {
        var selectionValues = props.getSelectionValues(), serverSelection = this.options.SelectedValues, currentLine, isSelected = function () {
            if (serverSelection && selectionValues) {
                for (var i = 0; i < serverSelection.length; i++) {
                    currentLine = serverSelection[i];
                    if (_utils_1.checkValuesAreEqual(selectionValues, currentLine))
                        return true;
                }
            }
            return false;
        };
        _jquery_helpers_1.extend(sourceItem, this._configureHover(selectionValues));
        sourceItem.tag = selectionValues;
        sourceItem.isSelected = isSelected();
    }
    _applySelectionUnsafe() {
        var that = this;
        that.getSelectedTuples().forEach(tuple => that.selectTuple(tuple, true));
    }
}
exports.kpiItem = kpiItem;
