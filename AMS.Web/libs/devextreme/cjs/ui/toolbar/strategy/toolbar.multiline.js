/**
 * DevExtreme (cjs/ui/toolbar/strategy/toolbar.multiline.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.MultiLineStrategy = void 0;
var _size = require("../../../core/utils/size");
var TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
var MultiLineStrategy = function() {
    function MultiLineStrategy(toolbar) {
        this._toolbar = toolbar
    }
    var _proto = MultiLineStrategy.prototype;
    _proto._initMarkup = function() {};
    _proto._updateMenuVisibility = function() {};
    _proto._renderMenuItems = function() {};
    _proto._renderItem = function() {};
    _proto._getMenuItems = function() {};
    _proto._getToolbarItems = function() {
        var _this$_toolbar$option;
        return null !== (_this$_toolbar$option = this._toolbar.option("items")) && void 0 !== _this$_toolbar$option ? _this$_toolbar$option : []
    };
    _proto._getItemsWidth = function() {
        return this._toolbar._getSummaryItemsWidth(this._toolbar.itemElements(), true)
    };
    _proto._arrangeItems = function() {
        var $label = this._toolbar._$toolbarItemsContainer.find(".".concat(TOOLBAR_LABEL_CLASS)).eq(0);
        if (!$label.length) {
            return
        }
        var elementWidth = (0, _size.getWidth)(this._toolbar.$element());
        var labelPaddings = (0, _size.getOuterWidth)($label) - (0, _size.getWidth)($label);
        $label.css("maxWidth", elementWidth - labelPaddings)
    };
    _proto._hideOverflowItems = function() {};
    _proto._dimensionChanged = function() {};
    _proto._itemOptionChanged = function() {};
    _proto._optionChanged = function() {};
    return MultiLineStrategy
}();
exports.MultiLineStrategy = MultiLineStrategy;
