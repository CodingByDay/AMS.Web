﻿/**
* DevExpress Dashboard (_data-item-viewer-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemViewerAdapter = void 0;
const _common_1 = require("../../../data/_common");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _interactivity_controller_1 = require("../../../viewer-parts/viewer-items/_interactivity-controller");
const _item_viewer_adapter_base_1 = require("./_item-viewer-adapter-base");
class DataItemViewerAdapter extends _item_viewer_adapter_base_1.ItemViewerAdapterBase {
    constructor() {
        super(...arguments);
        this._createDefaultCustomInteractivityOptions = () => {
            return {
                selectionMode: _interactivity_controller_1.dashboardSelectionMode.none,
                hoverEnabled: false,
                targetAxes: [],
                defaultSelectedValues: []
            };
        };
        this._ensureCustomInteractivityOptions = (interactivityOptions, interactivityEnable, itemData) => {
            var newOptions = {
                selectionMode: interactivityOptions.selectionMode,
                hoverEnabled: interactivityOptions.hoverEnabled,
                targetAxes: interactivityOptions.targetAxes,
                defaultSelectedValues: interactivityOptions.defaultSelectedValues
            };
            if (interactivityEnable && interactivityOptions.defaultSelectedValues.length == 0 && interactivityOptions.selectionMode == _interactivity_controller_1.dashboardSelectionMode.single) {
                var tuple = [];
                interactivityOptions.targetAxes.forEach(axisName => {
                    tuple.push({
                        AxisName: axisName,
                        Value: itemData.getAxis(axisName).getPoints()[0].getUniquePath()
                    });
                });
                newOptions.defaultSelectedValues = [tuple];
            }
            return newOptions;
        };
    }
    attachToModel(viewerItem, dataDashboardItem) {
        super.attachToModel(viewerItem, dataDashboardItem);
        this.modelSubscriptions.push(dataDashboardItem._actions.subscribe(actions => {
            this.updateActionsModel(viewerItem, actions);
        }));
        this.modelSubscriptions.push(dataDashboardItem._actualSelectionValues.subscribe(newSelection => {
            viewerItem.setSelection(newSelection);
        }));
        viewerItem.selected.add(dataDashboardItem._processItemSelectionChange);
        viewerItem.drillUp.add(dataDashboardItem._processItemDrillUp);
        viewerItem.clearMasterFilter.add(dataDashboardItem._processItemClearMasterFilter);
        viewerItem.contentElementSelection.add(dataDashboardItem._processContentElementSelection);
        viewerItem.allowLimitDataCallback = () => {
            dataDashboardItem._limitDataState.toggle();
            this.context.refresh(dataDashboardItem.componentName());
        };
    }
    detachFromModel(viewerItem, dataDashboardItem) {
        viewerItem.selected.remove(dataDashboardItem._processItemSelectionChange);
        viewerItem.drillUp.remove(dataDashboardItem._processItemDrillUp);
        viewerItem.clearMasterFilter.remove(dataDashboardItem._processItemClearMasterFilter);
        viewerItem.contentElementSelection.remove(dataDashboardItem._processContentElementSelection);
        viewerItem.allowLimitDataCallback = null;
        super.detachFromModel(viewerItem, dataDashboardItem);
    }
    ensureViewerItemCore(onlyCreation, content) {
        var customInteractivityOptions = this._createDefaultCustomInteractivityOptions();
        super.ensureViewerItemCore(onlyCreation, content, customInteractivityOptions);
        this.item.updateItem(this._ensureCustomInteractivityOptions(customInteractivityOptions, this.dashboardItem._actions().length > 0, this.dashboardItem._getItemData()));
        this.updateActionsModel(this.item, this.dashboardItem._actions());
    }
    updateItemContent(content) {
        if (!this.dashboardItem._actualSelectionValues() && this.item.visualMode !== 'caption') {
            this.item.clearSelection();
        }
        super.updateItemContent(content);
        this.item.updateInteractivityOptions();
    }
    createDashboardViewerItem(element, content, dashboardItem) {
        var actions = dashboardItem._actions();
        content.ActionModel = content.ActionModel || {};
        content.ActionModel.Actions = actions;
        content.ActionModel.DrillUpButtonState = this.getDrillUpState(actions);
        content.ActionModel.ClearMasterFilterButtonState = this.dashboardItem._getClearMasterFilterState();
        var viewerItem = super.createDashboardViewerItem(element, content, dashboardItem);
        viewerItem.updateInteractivityOptions();
        return viewerItem;
    }
    getDrillUpState(actions) {
        if (actions.indexOf(_common_1.viewerActions.drillUp) !== -1) {
            return 'Enabled';
        }
        else {
            if (actions.indexOf(_common_1.viewerActions.drillDown) !== -1) {
                return 'Disabled';
            }
            else {
                return 'Hidden';
            }
        }
    }
    updateActionsModel(item, actions) {
        var actionModel = _jquery_helpers_1.deepExtend({}, item.options.ActionModel);
        actionModel.Actions = actions;
        actionModel.DrillUpButtonState = this.getDrillUpState(actions);
        actionModel.ClearMasterFilterButtonState = this.dashboardItem._getClearMasterFilterState();
        var newOptions = _jquery_helpers_1.deepExtend({}, item.options);
        newOptions.ActionModel = actionModel;
        newOptions.ContentType = 'ActionModel';
        item.updateContent(newOptions);
    }
}
exports.DataItemViewerAdapter = DataItemViewerAdapter;
