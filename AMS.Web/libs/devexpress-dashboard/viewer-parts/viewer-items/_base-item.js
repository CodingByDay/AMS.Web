﻿/**
* DevExpress Dashboard (_base-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssClassNamesBaseItem = exports.baseItem = exports.getControlContainer = exports.createDefaultToolbar = void 0;
const $ = require("jquery");
const _default_1 = require("../../data/localization/_default");
const _common_1 = require("../../data/_common");
const _factory_1 = require("../../data/_factory");
const _formatter_1 = require("../../data/_formatter");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _localization_ids_1 = require("../../data/_localization-ids");
const _localizer_1 = require("../../data/_localizer");
const _utils_1 = require("../../data/_utils");
const _z_index_1 = require("../../data/_z-index");
const _utils_layout_1 = require("../layout/_utils.layout");
const _dashboard_viewer_constants_1 = require("../viewer/_dashboard-viewer-constants");
const caption_toolbar_options_1 = require("../widgets/caption-toolbar/caption-toolbar-options");
const _caption_toolbar_css_classes_1 = require("../widgets/caption-toolbar/_caption-toolbar-css-classes");
const _clickable_floating_toolbar_1 = require("../widgets/caption-toolbar/_clickable-floating-toolbar");
const _hidden_caption_toolbar_1 = require("../widgets/caption-toolbar/_hidden-caption-toolbar");
const _hovered_floating_toolbar_1 = require("../widgets/caption-toolbar/_hovered-floating-toolbar");
const _hovered_toolbar_1 = require("../widgets/caption-toolbar/_hovered-toolbar");
const _minimized_clickable_toolbar_1 = require("../widgets/caption-toolbar/_minimized-clickable-toolbar");
const _minimized_hovered_toolbar_1 = require("../widgets/caption-toolbar/_minimized-hovered-toolbar");
const _static_toolbar_1 = require("../widgets/caption-toolbar/_static-toolbar");
const _render_helper_1 = require("../widgets/_render-helper");
const _dashboard_layout_mode_helper_1 = require("../_dashboard-layout-mode-helper");
const _item_loading_1 = require("./elements/_item-loading");
const _interactivity_controller_1 = require("./_interactivity-controller");
var createDefaultToolbar = (viewerItem, container, controlContainer, popupContainer, viewOptions) => {
    if (viewOptions.hiddenToolbar) {
        return new _hidden_caption_toolbar_1.HiddenCaptionToolbar();
    }
    else if (_dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isTouch) {
        if (viewOptions.hasCaption) {
            return new _static_toolbar_1.StaticCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, _caption_toolbar_css_classes_1.cssClasses.caption, viewOptions.captionToolbarSeparatorRequired, false);
        }
        else {
            if (viewOptions.allowPreview) {
                return new _minimized_clickable_toolbar_1.MinimizedClickableCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, viewOptions.isBottomFloatingToolbarPosition, viewOptions.itemHasOwnContent);
            }
            else {
                return new _clickable_floating_toolbar_1.ClickableFloatingCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, viewOptions.isBottomFloatingToolbarPosition, viewOptions.itemHasOwnContent);
            }
        }
    }
    else {
        if (viewOptions.hasCaption) {
            return new _hovered_toolbar_1.HoveredDashboardCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, viewOptions.captionToolbarSeparatorRequired);
        }
        else {
            if (viewOptions.allowPreview) {
                return new _minimized_hovered_toolbar_1.MinimizedHoveredCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, viewOptions.isBottomFloatingToolbarPosition);
            }
            else {
                return new _hovered_floating_toolbar_1.HoveredFloatingCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, viewOptions.isBottomFloatingToolbarPosition);
            }
        }
    }
};
exports.createDefaultToolbar = createDefaultToolbar;
function getControlContainer(element) {
    return $.fn.constructor(element).closest('.dx-dashboard-widget-container')[0];
}
exports.getControlContainer = getControlContainer;
class baseItem {
    constructor($container, options) {
        this._lockCount = 0;
        this._isFixedHeight = false;
        this.customHoverEnabled = false;
        this._allowMultiselection = false;
        this.dateToString = (date) => date.toJSON();
        this.selected = _jquery_helpers_1.createJQueryCallbacks();
        this.clearMasterFilter = _jquery_helpers_1.createJQueryCallbacks();
        this.drillUp = _jquery_helpers_1.createJQueryCallbacks();
        this.contentElementSelection = _jquery_helpers_1.createJQueryCallbacks();
        this.expandValue = _jquery_helpers_1.createJQueryCallbacks();
        this.clientStateUpdate = _jquery_helpers_1.createJQueryCallbacks();
        this.dataRequest = _jquery_helpers_1.createJQueryCallbacks();
        this.itemClick = _jquery_helpers_1.createJQueryCallbacks();
        this.itemHover = _jquery_helpers_1.createJQueryCallbacks();
        this.itemSelectionChanged = _jquery_helpers_1.createJQueryCallbacks();
        this.itemWidgetCreated = _jquery_helpers_1.createJQueryCallbacks();
        this.itemWidgetUpdating = _jquery_helpers_1.createJQueryCallbacks();
        this.itemWidgetUpdated = _jquery_helpers_1.createJQueryCallbacks();
        this.itemWidgetOptionsPrepared = _jquery_helpers_1.createJQueryCallbacks();
        this.itemCaptionToolbarUpdated = _jquery_helpers_1.createJQueryCallbacks();
        this.constraintsUpdated = _jquery_helpers_1.createJQueryCallbacks();
        this.customTargetAxes = [];
        this.customDefaultSelectedValues = [];
        this.itemLoadingElement = new _item_loading_1.ItemLoadingElement();
        this.visualMode = 'full';
        this._hasWidget = false;
        this.deferredToolbarRenderingPromise = undefined;
        this.createCaptionToolbar = exports.createDefaultToolbar;
        this._initializeData(options);
        this.container = $container;
        this.controlContainer = options.controlContainer;
        this._boundaryContainer = options.boundaryContainer;
        this.interactivityController = new _interactivity_controller_1.interactivityController($.proxy(this.getSelectedTuples, this));
        this.interactivityController.selectionChanged.add($.proxy(this._onSelectionChanged, this));
        this.customSelectionMode = _interactivity_controller_1.dashboardSelectionMode.none;
    }
    get hasWidget() {
        return this._hasWidget;
    }
    get _captionToolbarSeparatorRequired() {
        return false;
    }
    get _isBottomFloatingToolbarPosition() {
        return false;
    }
    get _allowPreview() {
        return false;
    }
    get _shouldApplySelectionOnInitialRender() {
        return true;
    }
    get dataController() { return null; }
    set dataController(dataController) { }
    _initializeData(newOptions) {
        if (!this.options) {
            this.options = newOptions;
        }
        else {
            this.options = {
                Name: newOptions.Name,
                Type: newOptions.Type,
                ParentContainer: newOptions.ParentContainer,
                ContentType: newOptions.ContentType,
                SelectedValues: newOptions.SelectedValues,
                ViewModel: newOptions.ViewModel || this.options.ViewModel,
                ActionModel: newOptions.ActionModel || this.options.ActionModel,
                CaptionViewModel: newOptions.CaptionViewModel || this.options.CaptionViewModel,
                ConditionalFormattingModel: newOptions.ConditionalFormattingModel || this.options.ConditionalFormattingModel,
                Parameters: newOptions.Parameters,
                DrillDownValues: newOptions.DrillDownValues,
                DrillDownUniqueValues: newOptions.DrillDownUniqueValues,
                AxisNames: newOptions.AxisNames,
                DimensionIds: newOptions.DimensionIds,
                multiData: newOptions.multiData,
                encodeHtml: newOptions.encodeHtml !== undefined ? newOptions.encodeHtml : this.options.encodeHtml,
                allowExport: newOptions.allowExport !== undefined ? newOptions.allowExport : this.options.allowExport,
                showExportDialog: newOptions.showExportDialog !== undefined ? newOptions.showExportDialog : this.options.showExportDialog,
                isDataReduced: !!newOptions.ItemData ? newOptions.ItemData.Reduced : this.options.isDataReduced,
                useNeutralFilterMode: newOptions.useNeutralFilterMode !== undefined ? newOptions.useNeutralFilterMode : this.options.useNeutralFilterMode,
                FullViewport: newOptions.FullViewport,
                LimitDataState: newOptions.LimitDataState
            };
        }
        if (!this.dataController || (newOptions.ContentType != _common_1.contentType.actionModel)) {
            var drillDownState = {};
            drillDownState[this._getDrillDownAxisName()] = this.options.DrillDownUniqueValues;
            this.dataController = _factory_1.defaultDataControllerFactory.createDataController(this.options.Type, {
                multiData: this.options.multiData,
                viewModel: this.options.ViewModel,
                cfModel: this.options.ConditionalFormattingModel,
                useNeutralFilterMode: this.options.useNeutralFilterMode,
                drillDownState: drillDownState
            });
            if (this.dataController) {
                this.dataController.update(this.options.SelectedValues, this._isEncodeHtml());
            }
        }
        this.customSelectedTuples = [];
    }
    initialDataRequest() {
        if (this.hasWidget) {
            this.initialDataRequestUnsafe();
        }
    }
    initialDataRequestUnsafe() {
    }
    get allowMultiselection() {
        return this._allowMultiselection;
    }
    set allowMultiselection(value) {
        this._allowMultiselection = value;
    }
    forceUpdateInteractivity() {
        this.updateCaptionToolbar();
        this.updateInteractivityOptions();
    }
    clearSelection() {
        if (this.hasWidget) {
            this._clearSelectionUnsafe();
        }
        else {
            this._clearSelectionBase();
        }
    }
    _clearSelectionUnsafe() {
        this._clearSelectionBase();
    }
    _clearSelectionBase() {
    }
    performClearSelection() {
        this._setSelectedValues(null);
        this.clearSelection();
    }
    selectTuple(tuple, state) {
        if (this.hasWidget) {
            this.selectTupleUnsafe(tuple, state);
        }
    }
    selectTupleUnsafe(tuple, state) {
    }
    setSelection(values) {
        if (this.hasWidget) {
            this._setSelectionUnsafe(values);
        }
        else {
            this.setSelectionBase(values);
        }
    }
    _setSelectionUnsafe(values) {
        this.setSelectionBase(values);
    }
    setSelectionBase(values) {
        this._setSelectedValues(values);
    }
    _applySelection() {
        if (this.hasWidget) {
            this._applySelectionUnsafe();
        }
    }
    _applySelectionUnsafe() {
    }
    _isEncodeHtml() {
        return (!this.options || this.options.encodeHtml == undefined) ? true : this.options.encodeHtml;
    }
    _isSupportDataAwareExport() {
        return this.options && this.options.allowExport && this.options.ViewModel && this.options.ViewModel.SupportDataAwareExport;
    }
    _isLocked() {
        if (this._lockCount < 0)
            throw new Error("Unresolved locker state (looks like 'unlock' method is called without 'lock')");
        return this._lockCount > 0;
    }
    _lock() {
        this._lockCount++;
    }
    _unlock() {
        this._lockCount--;
    }
    _getCustomSelectionMode() {
        return this.customSelectionMode;
    }
    _setCustomSelectionMode(value) {
        this.customSelectionMode = value;
    }
    _getCustomHoverEnabled() {
        return this.customHoverEnabled;
    }
    _setCustomHoverEnabled(value) {
        this.customHoverEnabled = value;
    }
    _getCustomTargetAxes() {
        return this.customTargetAxes;
    }
    _setCustomTargetAxes(value) {
        this.customTargetAxes = value;
    }
    _getTargetAxes() {
        if (!this.isInteractivityActionEnabled()) {
            return this._getCustomTargetAxes();
        }
        else {
            return this._getAxisNames();
        }
    }
    getSelectedTuples() {
        var that = this, multiData = that.options.multiData, axisNames = that._getAxisNames(), dimensionByAxis = {}, tupleValues, axisValues, valueIndex;
        if (that._canSetMasterFilter() || that._canSetMultipleMasterFilter() || that._canPerformDrillDown()) {
            var tuples = [];
            if (that.options.SelectedValues == null)
                return tuples;
            if (axisNames.length > 1) {
                axisNames.forEach(axisName => {
                    dimensionByAxis[axisName] = multiData.getAxis(axisName).getDimensions();
                });
                that.options.SelectedValues.forEach(selection => {
                    tupleValues = [];
                    valueIndex = 0;
                    axisNames.forEach(axisName => {
                        axisValues = [];
                        dimensionByAxis[axisName].forEach(() => {
                            axisValues.push(selection[valueIndex++]);
                        });
                        tupleValues.push({ axisName: axisName, value: axisValues });
                    });
                    tuples.push(tupleValues);
                });
            }
            else {
                var drillDownValues = that._getDrillDownValues();
                that.options.SelectedValues.forEach(value => {
                    tuples.push([{ axisName: axisNames[0], value: drillDownValues.concat(value) }]);
                });
            }
            return tuples;
        }
        else {
            return that.customSelectedTuples;
        }
    }
    updateItem(options) {
        var that = this;
        this._setCustomSelectionMode(options.selectionMode);
        this._setCustomTargetAxes(options.targetAxes);
        this._setCustomHoverEnabled(options.hoverEnabled);
        this.customDefaultSelectedValues = options.defaultSelectedValues;
        that.updateInteractivityOptions();
        if (!this.isInteractivityActionEnabled()) {
            var customDefaultSelectedValues = options.selectionMode == _interactivity_controller_1.dashboardSelectionMode.single ? that.customDefaultSelectedValues.slice(0, 1) : that.customDefaultSelectedValues;
            that.interactivityController.clickAction(customDefaultSelectedValues);
        }
        this.updateCaptionToolbar();
    }
    forceUpdateItem() {
        this.forceCreateCaptionToolbar();
        this.updateContentSize();
    }
    _changeTuple(tuple) {
        var that = this, newTuple = [];
        tuple.forEach(axisValue => {
            var axisName = axisValue.axisName, value = axisValue.value;
            newTuple.push({ axisName: axisName, value: (axisName == that._getDrillDownAxisName()) ? value.slice(-1) : value });
        });
        return newTuple;
    }
    _onSelectionChanged(tuples) {
        var that = this, currentSelectedValues = this.options.SelectedValues, singleSelection = !!currentSelectedValues && currentSelectedValues.length === 1 ? currentSelectedValues[0] : null, newSelection = [], tupleValues, selectedTuples = this.getSelectedTuples(), actionName;
        this._selectTuples(tuples, selectedTuples, true);
        this._selectTuples(selectedTuples, tuples, false);
        if (this.isInteractivityActionEnabled()) {
            tuples.forEach(tuple => {
                tupleValues = [];
                that._getAxisNames().forEach(axisName => {
                    tupleValues.push.apply(tupleValues, _utils_1.getAxisPointValue(tuple, axisName).slice());
                });
                newSelection.push(tupleValues);
            });
            newSelection = this._deductDrillDownValues(newSelection);
            this._setSelectedValues(newSelection);
            actionName = this._getSelectionCallbackType(newSelection.length === 1 && singleSelection && _utils_1.checkValuesAreEqual(newSelection[0], singleSelection));
            if (actionName === _common_1.viewerActions.drillDown) {
                newSelection = newSelection[0];
            }
            if (this._mustSelectingFired(newSelection)) {
                this.selected.fire(this.getName(), actionName, newSelection);
            }
            else {
                this._onClearMasterFilter();
            }
        }
        else {
            this.customSelectedTuples = [];
            tuples.forEach(tuple => {
                that.customSelectedTuples.push(tuple);
            });
        }
        if (this.customSelectionMode == _interactivity_controller_1.dashboardSelectionMode.multiple) {
            this.updateCaptionToolbar();
        }
        if (this.itemSelectionChanged) {
            this.itemSelectionChanged.fire(this.getName(), tuples);
        }
    }
    _mustSelectingFired(values) {
        return values.length > 0;
    }
    _patchTroughDrillDownValues(values) {
        var drillDownValues = this._getDrillDownValues(), filterValues = [];
        if (values) {
            values.forEach(value => {
                filterValues.push(drillDownValues.concat(value));
            });
        }
        return filterValues;
    }
    _deductDrillDownValues(values) {
        var drillDownValues = this._getDrillDownValues(), drillDownValuesLength = drillDownValues.length, cutValue;
        values.forEach(value => {
            cutValue = value.slice(0, drillDownValuesLength);
            if (_utils_1.checkValuesAreEqual(cutValue, drillDownValues))
                value.splice(0, drillDownValuesLength);
        });
        return values;
    }
    _getSelectionCallbackType(performDrillDown) {
        var actionName = undefined;
        if (this._canSetMultipleMasterFilter() && this.allowMultiselection) {
            actionName = _common_1.viewerActions.setMultipleValuesMasterFilter;
        }
        else if (this._canSetMasterFilter()) {
            if (performDrillDown) {
                if (this._canPerformDrillDown())
                    actionName = _common_1.viewerActions.drillDown;
            }
            else {
                actionName = _common_1.viewerActions.setMasterFilter;
            }
        }
        else if (this._canPerformDrillDown()) {
            actionName = _common_1.viewerActions.drillDown;
        }
        return actionName;
    }
    _selectTuples(tuplesToSelect, unaffectedTuples, isSelect) {
        var that = this;
        var updateTuple = function (tuple) {
            if (_utils_1.checkArrayContainsTuple(unaffectedTuples, tuple) == undefined) {
                return that._hasDrillUpButton() && !that._isMultiDataSupported() ? that._changeTuple(tuple) : tuple;
            }
            return undefined;
        };
        this._selectTuplesCore(tuplesToSelect, updateTuple, isSelect);
    }
    _selectTuplesCore(tuples, updateTupleDelegate, state) {
        var that = this;
        $.each(tuples, function (index, tuple) {
            var updatedTuple = updateTupleDelegate(tuple);
            if (!!updatedTuple) {
                that.selectTuple(updatedTuple, state);
            }
        });
    }
    _renderContent(element, changeExisting, afterRenderCallback) {
        if (this.visualMode !== 'caption') {
            this._hasWidget = true;
            return this.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        }
        return false;
    }
    renderContentUnsafe($element, changeExisting, afterRenderCallback) {
        return false;
    }
    renderPartialContent() {
        if (this.hasWidget) {
            this.renderPartialContentUnsafe();
        }
    }
    renderPartialContentUnsafe() {
    }
    updateContentState() {
        if (this.hasWidget) {
            this.updateContentStateUnsafe();
        }
    }
    updateContentStateUnsafe() {
    }
    getInfo() {
        if (this.hasWidget) {
            return this.getInfoUnsafe();
        }
        else {
            return this.getInfoBase();
        }
    }
    getInfoUnsafe() {
        return this.getInfoBase();
    }
    getInfoBase() {
        var that = this, container = this._getBoundaryContainer();
        return {
            name: that.getName(),
            headerHeight: this.hasCaption() ? this.captionToolbar.calcHeight(this.getCaptionToolbarOptions()) : 0,
            position: $.fn.constructor(container).offset(),
            width: $.fn.constructor(container).outerWidth(),
            height: $.fn.constructor(container).outerHeight(),
            virtualSize: undefined,
            scroll: undefined
        };
    }
    getName() {
        return this.options.Name;
    }
    getCaption() {
        return this.options.CaptionViewModel && this.options.CaptionViewModel.Text ? this.options.CaptionViewModel.Text.concat(this._getParametersTitle() || '') : undefined;
    }
    hasCaption(options) {
        var opts = options || this.options;
        return opts && opts.CaptionViewModel && opts.CaptionViewModel.ShowCaption;
    }
    hasParentContainer() {
        return this.options && _utils_1.type.isDefined(this.options.ParentContainer);
    }
    _isPaneEmpty() {
        return this.hasParentContainer();
    }
    _isTransparentBackground() {
        return false;
    }
    render(container) {
        this.container = this.container || container;
        this.container.setAttribute('data-layout-item-name', this.getName());
        this.contentRoot = document.createElement('div');
        _utils_1.moveContent(this.container, this.contentRoot, true);
        if (!this.captionToolbar) {
            this.captionToolbar = this._createCaptionToolbar(this.container, this.controlContainer, this._getBoundaryContainer());
            this.updateCaptionToolbar();
        }
        else if (container) {
            this.forceCreateCaptionToolbar();
        }
        this.container.appendChild(this.contentRoot);
        this.updateContentSize();
        this._changeContent(false);
    }
    dispose() {
        this._removeShildElement();
        this.itemLoadingElement.hide();
        if (this.captionToolbar) {
            this.captionToolbar.dispose();
        }
    }
    updateContent(newOptions) {
        var isPrevShowCaption = this.hasCaption(this.options), isNewShowCaption = this.hasCaption(newOptions), showCaptionChanged = isPrevShowCaption !== isNewShowCaption;
        this._initializeData(newOptions);
        if (_utils_1.type.isDefined(isNewShowCaption) && showCaptionChanged) {
            this.forceCreateCaptionToolbar();
        }
        else {
            this.updateCaptionToolbar();
        }
        switch (newOptions.ContentType) {
            case _common_1.contentType.partialDataSource:
            case _common_1.contentType.completeDataSource:
                if (newOptions.DataSource || (newOptions.ItemData && newOptions.ItemData.DataStorageDTO)) {
                    if (newOptions.forceUpdateViewModel)
                        this._changeContent(true);
                    else
                        this.renderPartialContent();
                }
                break;
            case _common_1.contentType.actionModel:
                if (!this.isInteractivityActionEnabled()) {
                    this.updateContentState();
                }
                break;
            default:
                this._changeContent(true);
                break;
        }
    }
    updateClientState(clientState) {
        if (this.hasWidget && this.options.ContentType !== _common_1.contentType.partialDataSource && this.options.ContentType !== _common_1.contentType.completeDataSource)
            this._updateClientStateUnsafe(clientState);
    }
    _removeShildElement() {
        let shieldingElement = this.shieldingElement;
        if (shieldingElement) {
            shieldingElement.parentNode.removeChild(shieldingElement);
            delete this.shieldingElement;
        }
    }
    showLoadingPanel() {
        this._toggleLoadingPanel(true);
    }
    hideLoadingPanel() {
        this._toggleLoadingPanel(false);
    }
    _toggleLoadingPanel(loading) {
        if (!this.container)
            return;
        const container = this._getBoundaryContainer();
        if (this.visualMode !== 'caption') {
            if (!!loading) {
                this.itemLoadingElement.show(container);
            }
            else {
                this.itemLoadingElement.hide();
            }
        }
        if (!loading) {
            this._removeShildElement();
        }
        else if (!this.shieldingElement) {
            const position = this._getContainerPosition();
            const shieldingElement = document.createElement('div');
            shieldingElement.classList.add('dx-dashboard-item-shield');
            shieldingElement.style.left = position.left.toString() + 'px';
            shieldingElement.style.top = position.top.toString() + 'px';
            shieldingElement.style.width = position.width.toString() + 'px';
            shieldingElement.style.height = position.height.toString() + 'px';
            shieldingElement.style.zIndex = _z_index_1.zIndex.dashboardItemShield.toString();
            this.shieldingElement = shieldingElement;
            $.fn.constructor(container).prepend(shieldingElement);
        }
    }
    width(width) {
        var that = this;
        if ($.isNumeric(width)) {
            that.setSize(width, undefined);
        }
        else {
            return $.fn.constructor(that.container).outerWidth();
        }
    }
    height(height) {
        var that = this;
        if ($.isNumeric(height)) {
            that.setSize(undefined, height);
        }
        else {
            return $.fn.constructor(that.container).outerHeight();
        }
    }
    setSize(width, height) {
        var that = this, oldSize = { width: that.width(), height: that.height() }, newSize = { width: width, height: height };
        if (width) {
            $.fn.constructor(that.container).outerWidth(width);
        }
        if (height) {
            $.fn.constructor(that.container).outerHeight(height);
        }
        that._resize();
    }
    getConstraints(includeBorders) {
        var borderSize = includeBorders ? _render_helper_1.RenderHelper.getBorderSizeByClasses(this._generateOuterBorderClasses().concat(this._generateInnerBorderClasses())) : { width: 0, height: 0 }, headerHeight = this._calcHeaderAndFooterHeight(), contentMinHeight = this._getMinContentHeight(), height = borderSize.height + headerHeight + contentMinHeight;
        return _utils_layout_1.constraints(_utils_layout_1.size(_dashboard_viewer_constants_1.DashboardViewerConstants.minPaneWidth + borderSize.width, height), _utils_layout_1.size(Number.MAX_VALUE, this._isFixedHeight ? height : Number.MAX_VALUE));
    }
    getOffset() {
        return {
            width: 0,
            height: 0
        };
    }
    updateInteractivityOptions() {
        var that = this, selectionMode = _interactivity_controller_1.dashboardSelectionMode.none;
        if (!that.isInteractivityActionEnabled()) {
            that.updateContentState();
            selectionMode = this.customSelectionMode;
            if (selectionMode == _interactivity_controller_1.dashboardSelectionMode.multiple && !this.allowMultiselection)
                selectionMode = _interactivity_controller_1.dashboardSelectionMode.single;
        }
        else {
            if (this._canSetMultipleMasterFilter() && this.allowMultiselection) {
                selectionMode = _interactivity_controller_1.dashboardSelectionMode.multiple;
            }
            else {
                if (that.isInteractivityActionEnabled()) {
                    selectionMode = _interactivity_controller_1.dashboardSelectionMode.single;
                }
            }
        }
        that.interactivityController.setOptions(selectionMode);
    }
    getCaptionToolbarOptions() {
        let actionAtems = this._getActionToolbarItems();
        let staticItems = this._getStaticToolbarItems();
        let stateItems = this._getStateToolbarItems();
        var toolbarOptions = {
            staticItems: staticItems,
            actionItems: actionAtems,
            stateItems: stateItems,
            navigationItems: []
        };
        this.addContextCaptionToolbarOptions && this.addContextCaptionToolbarOptions(toolbarOptions);
        this.itemCaptionToolbarUpdated.fire(this.getName(), toolbarOptions);
        return toolbarOptions;
    }
    updateConstraints() {
        this.constraintsUpdated.fire(this.getName());
    }
    updateCaptionToolbar() {
        let options = this.getCaptionToolbarOptions();
        if (this.deferredToolbarRenderingPromise) {
            this.deferredToolbarRenderingPromise(this.getName(), this.captionToolbar.calcMinWidth(options), this.captionToolbar.calcHeight(options)).done(() => {
                this._updateCaptionToolbarAndSize(options);
            });
        }
        else {
            this._updateCaptionToolbarAndSize(options);
        }
    }
    _createCaptionToolbar(container, controlContainer, popupContainer) {
        return this.createCaptionToolbar(this, container, controlContainer, popupContainer, {
            encodeHtml: this._isEncodeHtml(),
            hasCaption: this.hasCaption(),
            isBottomFloatingToolbarPosition: this._isBottomFloatingToolbarPosition,
            captionToolbarSeparatorRequired: this._captionToolbarSeparatorRequired,
            allowPreview: this._allowPreview,
            hiddenToolbar: this.visualMode === 'content',
            itemHasOwnContent: this._itemHasOwnContent()
        });
    }
    _updateCaptionToolbarAndSize(options) {
        let heightChanged = this.captionToolbar.update(options);
        if (heightChanged) {
            this.updateContentSize();
        }
    }
    forceCreateCaptionToolbar() {
        this.captionToolbar.dispose();
        this.captionToolbar = this._createCaptionToolbar(this.container, this.controlContainer, this._getBoundaryContainer());
        this.updateCaptionToolbar();
    }
    _itemHasOwnContent() {
        return true;
    }
    _updateClientStateUnsafe(clientState) {
    }
    _changeContent(updateExisting) {
        if (this.visualMode === 'caption')
            return;
        let afterRenderCallback = () => {
            if (updateExisting) {
                this._raiseItemWidgetUpdated();
            }
            else {
                this._raiseItemWidgetCreated();
            }
            if (updateExisting || this._shouldApplySelectionOnInitialRender)
                this._applySelection();
        };
        if (updateExisting) {
            this._raiseItemWidgetUpdating();
        }
        if (!this._renderContent(this.contentRoot, updateExisting, afterRenderCallback)) {
            afterRenderCallback();
        }
    }
    _calcHeaderAndFooterHeight() {
        var headerAndFooterHeight = 0;
        let toolbar = this._createCaptionToolbar(undefined, undefined, undefined);
        headerAndFooterHeight += toolbar.calcHeight(this.getCaptionToolbarOptions());
        return headerAndFooterHeight;
    }
    _getReducedDataTooltip() {
        if (this.options.LimitDataState) {
            if (this.options.LimitDataState.isReduced)
                return _default_1.getLocalizationById('DashboardWebStringId.LimitVisibleData.DisplayAllDataTooltip');
            return _default_1.getLocalizationById('DashboardWebStringId.LimitVisibleData.IncreasePerformanceTooltip');
        }
        return undefined;
    }
    _getStaticToolbarItems() {
        let items = [];
        if (this.hasCaption()) {
            let caption = this.getCaption();
            if (caption) {
                items.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.itemCaption,
                    type: 'text',
                    text: caption
                });
            }
            if (this.allowLimitDataCallback && this.options.LimitDataState.isReduceMode)
                items.push(this._getReduceDataToolbarItem());
        }
        return items;
    }
    _getReduceDataToolbarItem() {
        return {
            name: caption_toolbar_options_1.dashboardToolbarItemNames.limitVisibleData,
            checked: this.options.LimitDataState.isReduced,
            click: (element) => { this.allowLimitDataCallback(); },
            icon: _caption_toolbar_css_classes_1.cssClasses.iconLimitVisibleData,
            type: 'button',
            tooltip: {
                className: _caption_toolbar_css_classes_1.cssClasses.tooltipLimitVisibleData,
                template: () => {
                    let div = document.createElement('div');
                    div.innerText = this._getReducedDataTooltip();
                    return div;
                }
            }
        };
    }
    _getStateToolbarItems() {
        let items = this._getSpecificStatePanelItems();
        let actionModel = this.options.ActionModel;
        if (this._hasClearMasterFilterButton()) {
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.clearMasterFilter,
                click: (element) => { this._onClearMasterFilter(); },
                icon: _caption_toolbar_css_classes_1.cssClasses.iconClearMasterFilter,
                type: 'button',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ClearMasterFilter)
            });
        }
        if (this.options.useNeutralFilterMode && actionModel && actionModel.ClearMasterFilterButtonState === 'Disabled') {
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.clearMasterFilter,
                icon: _caption_toolbar_css_classes_1.cssClasses.iconClearMasterFilter,
                type: 'button',
                disabled: true,
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ClearMasterFilter)
            });
        }
        if (this._hasClearSelectionButton())
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.clearSelection,
                click: (element) => { this._onClearSelection(); },
                icon: _caption_toolbar_css_classes_1.cssClasses.iconClearSelection,
                type: 'button',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ClearSelection)
            });
        if (this._hasDrillUpButton() && this._isDrillUpEnabled())
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.drillUp,
                click: (element) => { this._onDrillUp(); },
                icon: _caption_toolbar_css_classes_1.cssClasses.iconDrillUp,
                type: 'button',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.DrillUp)
            });
        if (!this.hasCaption() && this.allowLimitDataCallback && this.options.LimitDataState.isReduceMode)
            items.push(this._getReduceDataToolbarItem());
        return items;
    }
    _getActionToolbarItems() {
        let items = this._getSpecificActionToolbarItems(), contentDescription = this.options.ViewModel ? this.options.ViewModel.ContentDescription : undefined;
        if (this.options.allowExport)
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.exportMenu,
                menu: this._getExportMenuModel(),
                icon: _caption_toolbar_css_classes_1.cssClasses.iconItemExport,
                type: 'menu',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportTo)
            });
        if (contentDescription && contentDescription.ElementSelectionEnabled)
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.values,
                menu: {
                    items: contentDescription.ElementNames,
                    selectedItems: [contentDescription.ElementNames[contentDescription.SelectedElementIndex]],
                    selectionMode: 'single',
                    itemClick: (itemData, itemElement, index) => { this._onContentElementSelection(index); },
                    type: 'list'
                },
                icon: _caption_toolbar_css_classes_1.cssClasses.iconContentSelection,
                type: 'menu',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ElementSelection)
            });
        if (this._hasToggleSelectionModeButton())
            items.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.multiselection,
                checked: this.allowMultiselection,
                click: (element) => { this._onToggleSelectionMode(); },
                icon: _caption_toolbar_css_classes_1.cssClasses.iconMultiselection,
                type: 'button',
                hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.AllowMultiselection)
            });
        return items;
    }
    _getExportMenuModel() {
        let items = [_caption_toolbar_css_classes_1.cssClasses.iconExportToPDF];
        if (_caption_toolbar_css_classes_1.Settings.allowExportToImage)
            items.push(_caption_toolbar_css_classes_1.cssClasses.iconExportToImage);
        if (this._isSupportDataAwareExport()) {
            items.push(_caption_toolbar_css_classes_1.cssClasses.iconExportToExcel);
        }
        return {
            title: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportTo),
            items: items,
            itemClick: (itemData, itemElement, index) => { this.showExportDialog(_caption_toolbar_css_classes_1._convertToExportFormat(itemData)); },
            type: 'icons'
        };
    }
    _getParametersTitle() {
        if (!this.hasCaption())
            return undefined;
        let parameters = [], separator = ' - ', drillDownValues = this.options.DrillDownValues, contentDescription = this.options.ViewModel.ContentDescription;
        if (contentDescription && contentDescription.ElementSelectionEnabled) {
            parameters.push(contentDescription.ElementNames[contentDescription.SelectedElementIndex || 0]);
        }
        if (drillDownValues && drillDownValues.length > 0) {
            parameters = parameters.concat(drillDownValues.map(drillDownValue => _formatter_1.format(drillDownValue.Value, drillDownValue.Format)));
        }
        return parameters.length > 0 ? separator + parameters.join(separator) : undefined;
    }
    showExportDialog(exportFormat) {
        this.options.showExportDialog(exportFormat);
    }
    _getSpecificActionToolbarItems() {
        return [];
    }
    _getSpecificStatePanelItems() {
        return [];
    }
    _getMinContentHeight() {
        return _dashboard_viewer_constants_1.DashboardViewerConstants.minPaneHeight;
    }
    _generateInnerBorderClasses(element) {
        if (this.visualMode === 'caption') {
            return [];
        }
        else {
            return this._generateInnerBorderClassesUnsafe(element);
        }
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = [exports.cssClassNamesBaseItem.item];
        if (this._isBorderRequired()) {
            classes.push(exports.cssClassNamesBaseItem.simpleBorder);
        }
        if (element) {
            element.classList.add(exports.cssClassNamesBaseItem.item);
            if (this._isBorderRequired()) {
                element.classList.add(exports.cssClassNamesBaseItem.simpleBorder);
            }
            else {
                element.classList.remove(exports.cssClassNamesBaseItem.simpleBorder);
            }
        }
        return classes;
    }
    _generateOuterBorderClasses(element) {
        if (this.visualMode === 'caption')
            return;
        if (element) {
            if (this.hasParentContainer() && this.visualMode === 'full') {
                element.classList.add(exports.cssClassNamesBaseItem.groupItemChild);
            }
            else {
                element.classList.remove(exports.cssClassNamesBaseItem.groupItemChild);
            }
        }
        return this.hasParentContainer() && this.visualMode === 'full' ? [exports.cssClassNamesBaseItem.groupItemChild] : [];
    }
    _isBorderRequired() {
        return this._isPaneEmpty() && this.visualMode === 'full';
    }
    _resize() {
        if (this.hasWidget) {
            this._resizeUnsafe();
        }
        else {
            this._resizeBase();
        }
    }
    _resizeUnsafe() {
        this._resizeBase();
    }
    _resizeBase() {
        this.updateContentSize();
        this._allocatePreloader();
        this.captionToolbar.onResize();
    }
    updateContentSize() {
        if (this.hasWidget) {
            this._updateContentSizeUnsafe();
        }
        else {
            this._updateContentSizeBase();
        }
    }
    _updateContentSizeUnsafe() {
        this._updateContentSizeBase();
    }
    _updateContentSizeBase() {
        var that = this;
        that._generateOuterBorderClasses(that.container);
        that._generateInnerBorderClasses(that.contentRoot);
        var contentHeight = Math.floor($.fn.constructor(that.container).height() - that._calcHeaderAndFooterHeight());
        $.fn.constructor(that.contentRoot).outerHeight(contentHeight);
    }
    _allocatePreloader() {
        let shieldingElement = this.container.querySelector('.dx-dashboard-item-shield'), position = this._getContainerPosition();
        this.itemLoadingElement.resize();
        if (shieldingElement) {
            shieldingElement.style.left = position.left.toString() + 'px';
            shieldingElement.style.top = position.top.toString() + 'px';
            shieldingElement.style.width = position.width.toString() + 'px';
            shieldingElement.style.height = position.height.toString() + 'px';
        }
    }
    _getButtonOffset(useToolbarOffset) {
        var defaultButtonSize = 28;
        var hoverDiv = useToolbarOffset ? this.container.querySelector('.' + exports.cssClassNamesBaseItem.overlayContent) : undefined;
        return {
            left: !!hoverDiv ? $.fn.constructor(hoverDiv).outerWidth(true) : defaultButtonSize,
            top: !!hoverDiv ? $.fn.constructor(hoverDiv).outerHeight(true) : defaultButtonSize
        };
    }
    _getAnimationOptions() {
        return {
            enabled: !!this.options.animate,
            duration: 300
        };
    }
    _getContainerPosition() {
        if (this.hasWidget) {
            return this._getContainerPositionUnsafe();
        }
        else {
            return this._getContainerPositionBase();
        }
    }
    _getContainerPositionUnsafe() {
        return this._getContainerPositionBase();
    }
    _getContainerPositionBase() {
        var container = this._getBoundaryContainer(), position = $.fn.constructor(container).position(), width = $.fn.constructor(container).outerWidth(), height = $.fn.constructor(container).outerHeight(), marginX = $.fn.constructor(container).css('margin-left'), marginY = $.fn.constructor(container).css('margin-top'), border = this._isPaneEmpty() ? 0 : 1, parseMargin = function (margin) { return margin == 'auto' ? 0 : parseInt(margin); };
        return {
            left: position.left,
            top: position.top,
            width: width,
            height: height,
            offsetX: width + parseMargin(marginX) - border,
            offsetY: parseMargin(marginY) - border
        };
    }
    _getBoundaryContainer() {
        return this.visualMode === 'caption' ? this._boundaryContainer : this.container;
    }
    _getSelectedValues() {
        var selectedValues = this.options.SelectedValues;
        return this._isMultiDataSupported() ? this._patchTroughDrillDownValues(selectedValues) : selectedValues;
    }
    _onClearSelection() {
        this.clearSelection();
        this.customSelectedTuples = [];
        if (this.customSelectionMode == _interactivity_controller_1.dashboardSelectionMode.multiple)
            this.updateCaptionToolbar();
        this.itemSelectionChanged.fire(this.getName(), []);
    }
    _getElementInteractionValue(element, viewModel) {
    }
    _setSelectedValues(values) {
        this.options.SelectedValues = values;
    }
    _raiseItemClick(element) {
        var that = this, tuple = [], dataPoint = that._getDataPoint(element), drillDownValues = that._getDrillDownValues(), targetAxes = that._getTargetAxes(), drillDownAxis = drillDownValues && targetAxes.length == 1 ? targetAxes[0] : undefined;
        targetAxes.forEach(axisName => {
            var values;
            if (dataPoint.getSelectionValues) {
                values = dataPoint.getSelectionValues(axisName);
            }
            else {
                values = dataPoint.getValues(axisName);
            }
            if (values.length > 0) {
                if (drillDownAxis && axisName === drillDownAxis && !that._isMultiDataSupported()) {
                    values = drillDownValues.concat(values);
                }
                tuple.push({ axisName: axisName, value: values });
            }
        });
        if ((targetAxes.length != 0) && (targetAxes.length == tuple.length)) {
            that._clickAction(tuple);
        }
        if (that.itemClick) {
            that.itemClick.fire(that.getName(), dataPoint);
        }
    }
    _clickAction(tuple) {
        this.interactivityController.clickAction([tuple]);
    }
    _isMultiDataSupported() {
        return false;
    }
    _getDataPoint(element) {
        return null;
    }
    _getWidget() {
        return null;
    }
    _raiseItemWidgetCreated() {
        var widget = this._getWidget();
        if (widget) {
            this.itemWidgetCreated.fire(this.getName(), widget);
        }
    }
    _raiseItemWidgetUpdating() {
        var widget = this._getWidget();
        if (widget) {
            this.itemWidgetUpdating.fire(this.getName(), widget);
        }
    }
    _raiseItemWidgetUpdated() {
        var widget = this._getWidget();
        if (widget) {
            this.itemWidgetUpdated.fire(this.getName(), widget);
        }
    }
    _raiseItemWidgetOptionsPrepared(options) {
        if (options) {
            this.itemWidgetOptionsPrepared.fire(this.getName(), options);
        }
    }
    _raiseItemHover(element, state) {
        if (this.itemHover) {
            var dataPoint = this._getDataPoint(element);
            this.itemHover.fire(this.getName(), dataPoint, state);
        }
    }
    _onClearMasterFilter() {
        var name = this.getName();
        this._setSelectedValues(null);
        if (!this.options || !this.options.useNeutralFilterMode) {
            this.clearSelection();
        }
        this.clearMasterFilter.fire(name);
    }
    _onToggleSelectionMode() {
        this._allowMultiselection = !this._allowMultiselection;
        this.allowMultiselectionChanged && this.allowMultiselectionChanged(this._allowMultiselection);
        this.updateCaptionToolbar();
        this.updateInteractivityOptions();
    }
    _onDrillUp() {
        this.drillUp.fire(this.getName(), !!this._getSelectedValues());
    }
    _onContentElementSelection(index) {
        this.contentElementSelection.fire(this.getName(), {
            index: index,
            caption: this.options.ViewModel.ContentDescription.ElementNames[index]
        });
    }
    _onExpandValue(expandValueParams) {
        this.expandValue.fire(this.getName(), expandValueParams);
    }
    _onClientStateUpdate(clientState) {
        this.clientStateUpdate.fire(this.getName(), clientState);
    }
    _onDataRequest() {
        this.dataRequest.fire(this.getName());
    }
    _hasDrillUpButton() {
        var actionModel = this.options.ActionModel;
        return actionModel && actionModel.DrillUpButtonState && actionModel.DrillUpButtonState !== 'Hidden';
    }
    _hasClearMasterFilterButton() {
        var actionModel = this.options.ActionModel;
        return actionModel && actionModel.ClearMasterFilterButtonState && actionModel.ClearMasterFilterButtonState === 'Enabled';
    }
    _hasClearSelectionButton() {
        return !this.isInteractivityActionEnabled() && this.customSelectionMode == _interactivity_controller_1.dashboardSelectionMode.multiple && this.customSelectedTuples.length > 0;
    }
    _hasToggleSelectionModeButton() {
        return this._canSetMultipleMasterFilter() || (!this.isInteractivityActionEnabled() && this.customSelectionMode == _interactivity_controller_1.dashboardSelectionMode.multiple);
    }
    _isDrillUpEnabled() {
        var actionModel = this.options.ActionModel;
        return actionModel && actionModel.DrillUpButtonState && actionModel.DrillUpButtonState === 'Enabled';
    }
    _canPerformAction(action) {
        var actionModel = this.options.ActionModel;
        return actionModel && actionModel.Actions && actionModel.Actions.indexOf(action) !== -1;
    }
    _canPerformDrillDown() {
        return this._canPerformAction(_common_1.viewerActions.drillDown);
    }
    _canPerformDrillUp() {
        return this._canPerformAction(_common_1.viewerActions.drillUp);
    }
    _canSetMasterFilter() {
        return this._canPerformAction(_common_1.viewerActions.setMasterFilter);
    }
    _canSetMultipleMasterFilter() {
        return this._canPerformAction(_common_1.viewerActions.setMultipleValuesMasterFilter);
    }
    isInteractivityActionEnabled() {
        return this._canSetMasterFilter() || this._canSetMultipleMasterFilter() || this._canPerformDrillDown();
    }
    _selectionMode() {
        return this.isInteractivityActionEnabled() ? 'multiple' : 'none';
    }
    _getHtml(text) {
        return this._isEncodeHtml() ? _utils_1.encodeHtml(text) : text;
    }
    _getAxisNames() {
        return this.options.AxisNames || [];
    }
    _getDrillDownAxisName() {
        return this._getAxisNames().length > 0 ? this._getAxisNames()[0] : undefined;
    }
    _getDrillDownValues() {
        var drillDownValues = this.options.DrillDownUniqueValues;
        return drillDownValues != null ? drillDownValues : [];
    }
}
exports.baseItem = baseItem;
exports.cssClassNamesBaseItem = {
    item: 'dx-dashboard-item',
    groupItem: 'dx-dashboard-group-item',
    groupItemChild: 'dx-dashboard-group-item-child',
    simpleBorder: 'dx-dashboard-simple-border',
    overlayContent: 'dx-overlay-content',
    cardWihtoutBackground: 'dx-dashboard-card-without-background'
};
