﻿/**
* DevExpress Dashboard (_toolbar-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolbarKoViewModel = exports.toolbarAnimationTime = void 0;
const ko = require("knockout");
const _toolbox_extension_1 = require("../toolbox-extension/_toolbox-extension");
exports.toolbarAnimationTime = 500;
class ToolbarKoViewModel {
    constructor(getContainer, toolbarInitialized) {
        this._visible = ko.observable(false);
        this._popupDisposables = [];
        this.left = ko.observable(0);
        this.toolbarItems = ko.observableArray([]);
        this._getContainer = getContainer;
        this._toolbarInitialized = toolbarInitialized;
        this.koToolbarOptions = this._getKoToolbarOptions();
    }
    get height() { return this._visible() ? undefined : 0; }
    getKoPopupOptions() {
        let container = this._getContainer();
        let popupOptions = {
            container: container,
            position: {
                my: 'left top',
                at: 'left top',
                of: container,
                collision: 'flipfit',
                boundary: container,
                boundaryOffset: {
                    y: 0
                }
            },
            animation: {
                show: { type: 'slide', from: { top: -_toolbox_extension_1.toolboxConstants.menuTitleHeight }, to: { top: 0 }, duration: exports.toolbarAnimationTime },
                hide: { type: 'slide', from: { top: 0 }, to: { top: -_toolbox_extension_1.toolboxConstants.menuTitleHeight }, duration: exports.toolbarAnimationTime }
            },
            onShowing: (args) => {
                let setWidth = () => args.component.option('width', container.getBoundingClientRect().width - this.left());
                this._popupDisposables.push(this.left.subscribe(setWidth));
                let resizeObserver = new ResizeObserver(entries => entries[0] && setWidth());
                resizeObserver.observe(container);
                this._popupDisposables.push({ dispose: () => resizeObserver.unobserve(container) });
                setWidth();
            },
            onHidden: () => {
                this._popupDisposables.forEach(d => d.dispose());
                this._popupDisposables = [];
            },
            focusStateEnabled: false,
            showCloseButton: false,
            dragEnabled: false,
            height: 'auto',
            shading: false,
            wrapperAttr: {
                class: 'dx-dashboard-toolbar-extension'
            },
            showTitle: false
        };
        let koPopupOptions = Object.assign(Object.assign({}, popupOptions), { visible: this._visible });
        let position = koPopupOptions.position;
        let positionOffset = position.boundaryOffset;
        position.boundaryOffset = Object.assign(Object.assign({}, positionOffset), { x: this.left });
        return koPopupOptions;
    }
    _getKoToolbarOptions() {
        let toolbarOptions = {
            onInitialized: (args) => {
                this._toolbarInitialized();
            }
        };
        let koToolbarOptions = Object.assign(Object.assign({}, toolbarOptions), { items: this.toolbarItems });
        return koToolbarOptions;
    }
    setToolbarItems(items) {
        this.toolbarItems(items);
    }
    showPanel() {
        this._visible(true);
    }
    hidePanel() {
        this._visible(false);
    }
}
exports.ToolbarKoViewModel = ToolbarKoViewModel;
