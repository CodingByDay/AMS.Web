/**
 * DevExtreme (cjs/ui/widget/ui.search_box_mixin.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _deferred = require("../../core/utils/deferred");
var _stubs = require("../../core/utils/stubs");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var EditorClass = (0, _stubs.stubComponent)("TextBox");
var _default = {
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            searchMode: "",
            searchExpr: null,
            searchValue: "",
            searchEnabled: false,
            searchEditorOptions: {}
        })
    },
    _initMarkup: function() {
        this._renderSearch();
        this.callBase()
    },
    _renderSearch: function() {
        var $element = this.$element();
        var searchEnabled = this.option("searchEnabled");
        var searchBoxClassName = this._addWidgetPrefix("search");
        var rootElementClassName = this._addWidgetPrefix("with-search");
        if (!searchEnabled) {
            $element.removeClass(rootElementClassName);
            this._removeSearchBox();
            return
        }
        var editorOptions = this._getSearchEditorOptions();
        if (this._searchEditor) {
            this._searchEditor.option(editorOptions)
        } else {
            $element.addClass(rootElementClassName);
            this._$searchEditorElement = (0, _renderer.default)("<div>").addClass(searchBoxClassName).prependTo($element);
            this._searchEditor = this._createComponent(this._$searchEditorElement, EditorClass, editorOptions)
        }
    },
    _removeSearchBox: function() {
        this._$searchEditorElement && this._$searchEditorElement.remove();
        delete this._$searchEditorElement;
        delete this._searchEditor
    },
    _getSearchEditorOptions: function() {
        var that = this;
        var userEditorOptions = that.option("searchEditorOptions");
        var searchText = _message.default.format("Search");
        return (0, _extend.extend)({
            mode: "search",
            placeholder: searchText,
            tabIndex: that.option("tabIndex"),
            value: that.option("searchValue"),
            valueChangeEvent: "input",
            inputAttr: {
                "aria-label": searchText
            },
            onValueChanged: function(e) {
                var searchTimeout = that.option("searchTimeout");
                that._valueChangeDeferred = new _deferred.Deferred;
                clearTimeout(that._valueChangeTimeout);
                that._valueChangeDeferred.done(function() {
                    this.option("searchValue", e.value)
                }.bind(that));
                if (e.event && "input" === e.event.type && searchTimeout) {
                    that._valueChangeTimeout = setTimeout((function() {
                        that._valueChangeDeferred.resolve()
                    }), searchTimeout)
                } else {
                    that._valueChangeDeferred.resolve()
                }
            }
        }, userEditorOptions)
    },
    _getAriaTarget: function() {
        if (this.option("searchEnabled")) {
            return this._itemContainer(true)
        }
        return this.callBase()
    },
    _focusTarget: function() {
        if (this.option("searchEnabled")) {
            return this._itemContainer(true)
        }
        return this.callBase()
    },
    _updateFocusState: function(e, isFocused) {
        if (this.option("searchEnabled")) {
            this._toggleFocusClass(isFocused, this.$element())
        }
        this.callBase(e, isFocused)
    },
    getOperationBySearchMode: function(searchMode) {
        return "equals" === searchMode ? "=" : searchMode
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "searchEnabled":
            case "searchEditorOptions":
                this._invalidate();
                break;
            case "searchExpr":
            case "searchMode":
            case "searchValue":
                if (!this._dataSource) {
                    _ui.default.log("W1009");
                    return
                }
                if ("searchMode" === args.name) {
                    this._dataSource.searchOperation(this.getOperationBySearchMode(args.value))
                } else {
                    this._dataSource[args.name](args.value)
                }
                this._dataSource.load();
                break;
            case "searchTimeout":
                break;
            default:
                this.callBase(args)
        }
    },
    focus: function() {
        if (!this.option("focusedElement") && this.option("searchEnabled")) {
            this._searchEditor && this._searchEditor.focus();
            return
        }
        this.callBase()
    },
    _cleanAria: function() {
        var $element = this.$element();
        this.setAria({
            role: null,
            activedescendant: null
        }, $element);
        $element.attr("tabIndex", null)
    },
    _clean: function() {
        this.callBase();
        this._cleanAria()
    },
    _refresh: function() {
        if (this._valueChangeDeferred) {
            this._valueChangeDeferred.resolve()
        }
        this.callBase()
    },
    setEditorClass: function(value) {
        EditorClass = value
    }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
