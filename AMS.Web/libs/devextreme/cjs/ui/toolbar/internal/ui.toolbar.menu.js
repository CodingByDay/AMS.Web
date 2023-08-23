/**
 * DevExtreme (cjs/ui/toolbar/internal/ui.toolbar.menu.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../widget/ui.widget"));
var _button = _interopRequireDefault(require("../../button"));
var _uiToolbarMenu = _interopRequireDefault(require("./ui.toolbar.menu.list"));
var _themes = require("../../themes");
var _child_default_template = require("../../../core/templates/child_default_template");
var _uiToolbar = require("../ui.toolbar.utils");
var _window = require("../../../core/utils/window");
require("../../popup");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DROP_DOWN_MENU_CLASS = "dx-dropdownmenu";
var DROP_DOWN_MENU_POPUP_CLASS = "dx-dropdownmenu-popup";
var DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = "dx-dropdownmenu-popup-wrapper";
var DROP_DOWN_MENU_LIST_CLASS = "dx-dropdownmenu-list";
var DROP_DOWN_MENU_BUTTON_CLASS = "dx-dropdownmenu-button";
var POPUP_BOUNDARY_VERTICAL_OFFSET = 10;
var POPUP_VERTICAL_OFFSET = 3;
var DropDownMenu = function(_Widget) {
    _inheritsLoose(DropDownMenu, _Widget);

    function DropDownMenu() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = DropDownMenu.prototype;
    _proto._supportedKeys = function() {
        var extension = {};
        if (!this.option("opened") || !this._list.option("focusedElement")) {
            extension = this._button._supportedKeys()
        }
        return (0, _extend.extend)(_Widget.prototype._supportedKeys.call(this), extension, {
            tab: function() {
                this._popup && this._popup.hide()
            }
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            items: [],
            onItemClick: null,
            dataSource: null,
            itemTemplate: "item",
            onButtonClick: null,
            activeStateEnabled: true,
            hoverStateEnabled: true,
            opened: false,
            onItemRendered: null,
            closeOnClick: true,
            useInkRipple: false,
            container: void 0,
            animation: {
                show: {
                    type: "fade",
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    to: 0
                }
            }
        })
    };
    _proto._defaultOptionsRules = function() {
        return _Widget.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                useInkRipple: true,
                animation: {
                    show: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 0
                        },
                        to: {
                            scale: 1
                        }
                    },
                    hide: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 1
                        },
                        to: {
                            scale: 0
                        }
                    }
                }
            }
        }])
    };
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this.$element().addClass(DROP_DOWN_MENU_CLASS);
        this._initItemClickAction();
        this._initButtonClickAction()
    };
    _proto._initItemClickAction = function() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    };
    _proto._initButtonClickAction = function() {
        this._buttonClickAction = this._createActionByOption("onButtonClick")
    };
    _proto._initTemplates = function() {
        this._templateManager.addDefaultTemplates({
            content: new _child_default_template.ChildDefaultTemplate("content")
        });
        _Widget.prototype._initTemplates.call(this)
    };
    _proto._initMarkup = function() {
        this._renderButton();
        _Widget.prototype._initMarkup.call(this)
    };
    _proto._render = function() {
        _Widget.prototype._render.call(this);
        this.setAria({
            haspopup: true,
            expanded: this.option("opened")
        })
    };
    _proto._renderContentImpl = function() {
        if (this.option("opened")) {
            this._renderPopup()
        }
    };
    _proto._clean = function() {
        this._cleanFocusState();
        this._list && this._list.$element().remove();
        this._popup && this._popup.$element().remove();
        delete this._list;
        delete this._popup
    };
    _proto._renderButton = function() {
        var _this = this;
        var $button = this.$element().addClass(DROP_DOWN_MENU_BUTTON_CLASS);
        this._button = this._createComponent($button, _button.default, {
            icon: "overflow",
            template: "content",
            useInkRipple: this.option("useInkRipple"),
            hoverStateEnabled: false,
            focusStateEnabled: false,
            onClick: function(e) {
                _this.option("opened", !_this.option("opened"));
                _this._buttonClickAction(e)
            }
        })
    };
    _proto._toggleActiveState = function($element, value, e) {
        this._button._toggleActiveState($element, value, e)
    };
    _proto._toggleMenuVisibility = function(opened) {
        var state = null !== opened && void 0 !== opened ? opened : !this._popup.option("visible");
        if (opened) {
            this._renderPopup()
        }
        this._popup.toggle(state);
        this.setAria("expanded", state)
    };
    _proto._renderPopup = function() {
        var _this2 = this;
        if (this._$popup) {
            return
        }
        this._$popup = (0, _renderer.default)("<div>").appendTo(this.$element());
        var _this$option = this.option(),
            rtlEnabled = _this$option.rtlEnabled,
            container = _this$option.container,
            animation = _this$option.animation;
        this._popup = this._createComponent(this._$popup, "dxPopup", {
            onInitialized: function(_ref) {
                var component = _ref.component;
                component.$wrapper().addClass(DROP_DOWN_MENU_POPUP_WRAPPER_CLASS).addClass(DROP_DOWN_MENU_POPUP_CLASS)
            },
            deferRendering: false,
            contentTemplate: function(contentElement) {
                return _this2._renderList(contentElement)
            },
            _ignoreFunctionValueDeprecation: true,
            maxHeight: function() {
                return _this2._getMaxHeight()
            },
            position: {
                my: "top ".concat(rtlEnabled ? "left" : "right"),
                at: "bottom ".concat(rtlEnabled ? "left" : "right"),
                collision: "fit flip",
                offset: {
                    v: POPUP_VERTICAL_OFFSET
                },
                of: this.$element()
            },
            animation: animation,
            onOptionChanged: function(_ref2) {
                var name = _ref2.name,
                    value = _ref2.value;
                if ("visible" === name) {
                    _this2.option("opened", value)
                }
            },
            container: container,
            autoResizeEnabled: false,
            height: "auto",
            width: "auto",
            hideOnOutsideClick: function(e) {
                return _this2._closeOutsideDropDownHandler(e)
            },
            hideOnParentScroll: true,
            shading: false,
            dragEnabled: false,
            showTitle: false,
            fullScreen: false,
            _fixWrapperPosition: true
        })
    };
    _proto._getMaxHeight = function() {
        var $element = this.$element();
        var offsetTop = $element.offset().top;
        var windowHeight = (0, _size.getOuterHeight)((0, _window.getWindow)());
        var maxHeight = Math.max(offsetTop, windowHeight - offsetTop - (0, _size.getOuterHeight)($element));
        return Math.min(windowHeight, maxHeight - POPUP_VERTICAL_OFFSET - POPUP_BOUNDARY_VERTICAL_OFFSET)
    };
    _proto._closeOutsideDropDownHandler = function(e) {
        var isOutsideClick = !(0, _renderer.default)(e.target).closest(this.$element()).length;
        return isOutsideClick
    };
    _proto._renderList = function(contentElement) {
        var _this3 = this;
        var $content = (0, _renderer.default)(contentElement);
        $content.addClass(DROP_DOWN_MENU_LIST_CLASS);
        this._list = this._createComponent($content, _uiToolbarMenu.default, {
            dataSource: this._getListDataSource(),
            pageLoadMode: "scrollBottom",
            indicateLoading: false,
            noDataText: "",
            itemTemplate: this.option("itemTemplate"),
            onItemClick: function(e) {
                if (_this3.option("closeOnClick")) {
                    _this3.option("opened", false)
                }
                _this3._itemClickAction(e)
            },
            tabIndex: -1,
            focusStateEnabled: false,
            activeStateEnabled: true,
            onItemRendered: this.option("onItemRendered"),
            _itemAttributes: {
                role: "menuitem"
            }
        })
    };
    _proto._itemOptionChanged = function(item, property, value) {
        var _this$_list;
        null === (_this$_list = this._list) || void 0 === _this$_list ? void 0 : _this$_list._itemOptionChanged(item, property, value);
        (0, _uiToolbar.toggleItemFocusableElementTabIndex)(this._list, item)
    };
    _proto._getListDataSource = function() {
        var _this$option2;
        return null !== (_this$option2 = this.option("dataSource")) && void 0 !== _this$option2 ? _this$option2 : this.option("items")
    };
    _proto._setListDataSource = function() {
        var _this$_list2;
        null === (_this$_list2 = this._list) || void 0 === _this$_list2 ? void 0 : _this$_list2.option("dataSource", this._getListDataSource());
        delete this._deferRendering
    };
    _proto._getKeyboardListeners = function() {
        return _Widget.prototype._getKeyboardListeners.call(this).concat([this._list])
    };
    _proto._toggleVisibility = function(visible) {
        _Widget.prototype._toggleVisibility.call(this, visible);
        this._button.option("visible", visible)
    };
    _proto._optionChanged = function(args) {
        var _this$_list3, _this$_list4, _this$_list5;
        var name = args.name,
            value = args.value;
        switch (name) {
            case "items":
            case "dataSource":
                if (!this.option("opened")) {
                    this._deferRendering = true
                } else {
                    this._setListDataSource()
                }
                break;
            case "itemTemplate":
                null === (_this$_list3 = this._list) || void 0 === _this$_list3 ? void 0 : _this$_list3.option(name, this._getTemplate(value));
                break;
            case "onItemClick":
                this._initItemClickAction();
                break;
            case "onButtonClick":
                this._buttonClickAction();
                break;
            case "useInkRipple":
                this._invalidate();
                break;
            case "focusStateEnabled":
                null === (_this$_list4 = this._list) || void 0 === _this$_list4 ? void 0 : _this$_list4.option(name, value);
                _Widget.prototype._optionChanged.call(this, args);
                break;
            case "onItemRendered":
                null === (_this$_list5 = this._list) || void 0 === _this$_list5 ? void 0 : _this$_list5.option(name, value);
                break;
            case "opened":
                if (this._deferRendering) {
                    this._setListDataSource()
                }
                this._toggleMenuVisibility(value);
                this._updateFocusableItemsTabIndex();
                break;
            case "closeOnClick":
                break;
            case "container":
                this._popup && this._popup.option(name, value);
                break;
            case "disabled":
                if (this._list) {
                    this._updateFocusableItemsTabIndex()
                }
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._updateFocusableItemsTabIndex = function() {
        var _this4 = this;
        this.option("items").forEach((function(item) {
            return (0, _uiToolbar.toggleItemFocusableElementTabIndex)(_this4._list, item)
        }))
    };
    return DropDownMenu
}(_ui.default);
exports.default = DropDownMenu;
module.exports = exports.default;
module.exports.default = exports.default;
