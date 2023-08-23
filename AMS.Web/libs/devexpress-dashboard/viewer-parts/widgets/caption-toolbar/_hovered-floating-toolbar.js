/**
* DevExpress Dashboard (_hovered-floating-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoveredFloatingCaptionToolbar = void 0;
const $ = require("jquery");
const _floating_toolbar_base_1 = require("./_floating-toolbar-base");
class HoveredFloatingCaptionToolbar extends _floating_toolbar_base_1.FloatingCaptionToolbarBase {
    constructor(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition) {
        super(_container, _controlContainer, _popupContainer, encodeHtml, isBottomPosition);
        this._floatingPanelVisible = false;
    }
    calcMinWidth(options) {
        return 0;
    }
    dispose() {
        if (this._popupContainer) {
            $.fn.constructor(this._popupContainer).off('mouseover.captionPanel');
            $.fn.constructor(this._popupContainer).off('mouseleave.captionPanel');
        }
        super.dispose();
    }
    _appendToContainer(toolbarDiv) {
        var element = super._appendToContainer(toolbarDiv);
        let toggleHoverState = (hovered) => {
            if (this._floatingPanelVisible !== hovered) {
                this._floatingPanelVisible = hovered;
                hovered ? this.showFloatingPanel() : this.hideFloatingPanel();
            }
        };
        $.fn.constructor(this._popupContainer).on('mouseover.captionPanel', () => toggleHoverState(true));
        $.fn.constructor(this._popupContainer).on('mouseleave.captionPanel', () => toggleHoverState(false));
        return element;
    }
    _createInstance() {
        return new HoveredFloatingCaptionToolbar(undefined, undefined, undefined, this.encodeHtml, this._isBottomPosition);
    }
}
exports.HoveredFloatingCaptionToolbar = HoveredFloatingCaptionToolbar;
