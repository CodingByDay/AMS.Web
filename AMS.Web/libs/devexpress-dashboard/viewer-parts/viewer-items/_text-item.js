﻿/**
* DevExpress Dashboard (_text-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textItem = void 0;
const $ = require("jquery");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _cssHelper_1 = require("../viewer/_cssHelper");
const _render_helper_1 = require("../widgets/_render-helper");
const _base_item_1 = require("./_base-item");
class textItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this.div = undefined;
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var that = this;
        if (!changeExisting || !that.div) {
            that.div = $.fn.constructor('<div>');
            that.$textContent = $.fn.constructor(_render_helper_1.RenderHelper.wrapScrollable(that.div.get(0), 'auto', 'vertical'));
            that.$textContent.addClass('dx-dashboard-textbox-content');
            $.fn.constructor(element).append(that.div);
        }
        that._setContent();
        return false;
    }
    _getWidget() {
        return this.div && _jquery_helpers_1.wrapPublicElement(this.div[0]) || null;
    }
    _setContent() {
        var itemName = this.options.Name, sheetColor, preWrapper = $.fn.constructor('<pre>'), parsedHtml = $.fn.constructor('<div>'), originalHtmlText = this.options.ViewModel.Html;
        originalHtmlText = originalHtmlText.replace('<body', '<div class="' + itemName + '"').replace('</body>', '</div>');
        originalHtmlText = this._updateDocvariableValues(originalHtmlText);
        var contentDiv = $.fn.constructor(originalHtmlText).get().filter(c => c.className === itemName)[0];
        sheetColor = contentDiv && contentDiv.getAttribute('bgcolor');
        sheetColor && this.div.css({ 'backgroundColor': sheetColor });
        parsedHtml.html(originalHtmlText);
        preWrapper.addClass('dx-dashboard-textbox-content-pre-wrapper');
        preWrapper.attr('id', itemName);
        var styles = parsedHtml.find('style');
        styles.each((_, style) => {
            _cssHelper_1.addToStyles(style.innerHTML);
        });
        if (contentDiv)
            preWrapper.append(contentDiv.children);
        this.$textContent.empty();
        this.$textContent.append(preWrapper);
    }
    _updateDocvariableValues(htmlText) {
        return htmlText.replace(/02539CA4-7628-4F5D-9940-ED09C7EE7414\(([^()]+)\)/g, (placeholder) => {
            var match = placeholder.match(/\((.*?)\)/g);
            var id = match && match.length > 0 ? match[0].replace('(', '').replace(')', '') : null;
            if (id) {
                return this._getHtml(this._dataController.getDisplayText(id) || '');
            }
        });
    }
}
exports.textItem = textItem;
