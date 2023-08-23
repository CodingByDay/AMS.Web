﻿/**
* DevExpress Dashboard (_mobile-layout-fullscreen-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFullscreenItemViewModel = exports.PopupResizeController = exports.MobileItemViewerFactory = void 0;
const ko = require("knockout");
const _list_element_1 = require("../../viewer-parts/viewer-items/filter-items/_list-element");
const _viewer_item_factory_1 = require("../../viewer-parts/_viewer-item-factory");
const _viewer_item_types_1 = require("../../viewer-parts/_viewer-item-types");
class MobileItemViewerFactory extends _viewer_item_factory_1.ViewerItemFactory {
    createItem(container, options) {
        if (options.Type === _viewer_item_types_1.types.comboBox)
            return new _list_element_1.listFilterElement(container, options);
        return super.createItem(container, options);
    }
}
exports.MobileItemViewerFactory = MobileItemViewerFactory;
class PopupResizeController {
    constructor(_repaintRequest) {
        this._repaintRequest = _repaintRequest;
        this._resizeHandler = null;
        this.onInitialized = (e) => {
            if (!this._resizeHandler) {
                this._resizeHandler = () => e.component.repaint();
                this._repaintRequest.add(this._resizeHandler);
            }
        };
        this.onDisposing = (e) => {
            this._resizeHandler && this._repaintRequest.remove(this._resizeHandler);
        };
    }
}
exports.PopupResizeController = PopupResizeController;
var createFullscreenItemViewModel = (fullscreenItemModel, masterFilters, repaintRequest) => {
    var resizeController = new PopupResizeController(repaintRequest);
    return {
        itemViewModel: ko.computed(() => {
            var viewModel = fullscreenItemModel.viewModel();
            viewModel.repaintRequest = repaintRequest;
            return viewModel;
        }),
        visible: ko.computed(() => fullscreenItemModel.visible()),
        width: '100vw',
        height: '100%',
        onInitialized: resizeController.onInitialized,
        onDisposing: resizeController.onDisposing
    };
};
exports.createFullscreenItemViewModel = createFullscreenItemViewModel;
