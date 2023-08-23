﻿/**
* DevExpress Dashboard (_item-loading.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemLoadingElement = void 0;
const ui_overlay_1 = require("devextreme/ui/overlay/ui.overlay");
require("devextreme/ui/toast");
const $ = require("jquery");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _z_index_1 = require("../../../data/_z-index");
class ItemLoadingElement {
    show(container) {
        if (!this._overlay) {
            var overlayDiv = document.createElement('div');
            var contentTemplate = document.createElement('div');
            contentTemplate.classList.add('dx-dashboard-item-loading-panel');
            var h1 = document.createElement('h1');
            h1.innerText = _default_1.getLocalizationById('DashboardStringId.MessageLoading');
            contentTemplate.appendChild(h1);
            this._overlay = new ui_overlay_1.default(overlayDiv, {
                shading: true,
                animation: {
                    show: { type: 'fade', duration: 150, from: 0, to: 1, delay: 150 },
                    hide: { type: 'fade', duration: 150, to: 0, delay: 150 }
                },
                width: 'auto',
                height: 'auto',
                target: container,
                container: container,
                contentTemplate: contentTemplate,
                hideOnOutsideClick: false,
                propagateOutsideClick: true,
                position: {
                    boundary: container,
                    my: 'bottom right',
                    at: 'bottom right',
                    offset: '-10 -10',
                    of: container
                },
                onShowing: (e) => {
                    let wrapper = _jquery_helpers_1.$unwrap(e.component._$wrapper);
                    wrapper.style.zIndex = (_z_index_1.zIndex.dashboardItemShield - 2).toString();
                    let overlayContent = wrapper.querySelector('.dx-overlay-content');
                    if (overlayContent) {
                        overlayContent.style.zIndex = (_z_index_1.zIndex.dashboardItemShield - 1).toString();
                    }
                },
                wrapperAttr: {
                    class: 'dx-dashboard-loading-indicator'
                }
            });
            overlayDiv.style.zIndex = _z_index_1.zIndex.dashboardItemShield.toString();
            $.fn.constructor(container).prepend(overlayDiv);
        }
        this._overlay.show();
    }
    hide() {
        if (this._overlay) {
            this._overlay.hide();
        }
    }
    resize() {
        if (this._overlay) {
            this._overlay.repaint();
        }
    }
}
exports.ItemLoadingElement = ItemLoadingElement;
