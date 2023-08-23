/**
 * DevExtreme (cjs/ui/popup/ui.popup.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _element = require("../../core/element");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _empty_template = require("../../core/templates/empty_template");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _inflector = require("../../core/utils/inflector");
var _iterator = require("../../core/utils/iterator");
var _size = require("../../core/utils/size");
var _position = require("../../core/utils/position");
var _type = require("../../core/utils/type");
var _version = require("../../core/utils/version");
var _window = require("../../core/utils/window");
var _visibility_change = require("../../events/visibility_change");
var _message = _interopRequireDefault(require("../../localization/message"));
var _popup_drag = _interopRequireDefault(require("./popup_drag"));
var _resizable = _interopRequireDefault(require("../resizable"));
var _button = _interopRequireDefault(require("../button"));
var _ui = _interopRequireDefault(require("../overlay/ui.overlay"));
var _themes = require("../themes");
require("../toolbar/ui.toolbar.base");
var _resize_observer = _interopRequireDefault(require("../../core/resize_observer"));
var zIndexPool = _interopRequireWildcard(require("../overlay/z_index"));
var _popup_position_controller = require("./popup_position_controller");
var _popup_overflow_manager = require("./popup_overflow_manager");

function _getRequireWildcardCache(nodeInterop) {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cacheBabelInterop = new WeakMap;
    var cacheNodeInterop = new WeakMap;
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop
    })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            default: obj
        }
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var window = (0, _window.getWindow)();
var POPUP_CLASS = "dx-popup";
var POPUP_WRAPPER_CLASS = "dx-popup-wrapper";
var POPUP_FULL_SCREEN_CLASS = "dx-popup-fullscreen";
var POPUP_FULL_SCREEN_WIDTH_CLASS = "dx-popup-fullscreen-width";
var POPUP_NORMAL_CLASS = "dx-popup-normal";
var POPUP_CONTENT_CLASS = "dx-popup-content";
var POPUP_CONTENT_SCROLLABLE_CLASS = "dx-popup-content-scrollable";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var POPUP_DRAGGABLE_CLASS = "dx-popup-draggable";
var POPUP_TITLE_CLASS = "dx-popup-title";
var POPUP_TITLE_CLOSEBUTTON_CLASS = "dx-closebutton";
var POPUP_BOTTOM_CLASS = "dx-popup-bottom";
var POPUP_HAS_CLOSE_BUTTON_CLASS = "dx-has-close-button";
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var POPUP_CONTENT_FLEX_HEIGHT_CLASS = "dx-popup-flex-height";
var POPUP_CONTENT_INHERIT_HEIGHT_CLASS = "dx-popup-inherit-height";
var ALLOWED_TOOLBAR_ITEM_ALIASES = ["cancel", "clear", "done"];
var BUTTON_DEFAULT_TYPE = "default";
var BUTTON_NORMAL_TYPE = "normal";
var BUTTON_TEXT_MODE = "text";
var BUTTON_CONTAINED_MODE = "contained";
var IS_OLD_SAFARI = _browser.default.safari && (0, _version.compare)(_browser.default.version, [11]) < 0;
var HEIGHT_STRATEGIES = {
    static: "",
    inherit: POPUP_CONTENT_INHERIT_HEIGHT_CLASS,
    flex: POPUP_CONTENT_FLEX_HEIGHT_CLASS
};
var getButtonPlace = function(name) {
    var device = _devices.default.current();
    var platform = device.platform;
    var toolbar = "bottom";
    var location = "before";
    if ("ios" === platform) {
        switch (name) {
            case "cancel":
                toolbar = "top";
                break;
            case "clear":
                toolbar = "top";
                location = "after";
                break;
            case "done":
                location = "after"
        }
    } else if ("android" === platform) {
        switch (name) {
            case "cancel":
            case "done":
                location = "after"
        }
    }
    return {
        toolbar: toolbar,
        location: location
    }
};
var Popup = _ui.default.inherit({
    _supportedKeys: function() {
        var _this = this;
        return (0, _extend.extend)(this.callBase(), {
            upArrow: function(e) {
                var _this$_drag;
                null === (_this$_drag = _this._drag) || void 0 === _this$_drag ? void 0 : _this$_drag.moveUp(e)
            },
            downArrow: function(e) {
                var _this$_drag2;
                null === (_this$_drag2 = _this._drag) || void 0 === _this$_drag2 ? void 0 : _this$_drag2.moveDown(e)
            },
            leftArrow: function(e) {
                var _this$_drag3;
                null === (_this$_drag3 = _this._drag) || void 0 === _this$_drag3 ? void 0 : _this$_drag3.moveLeft(e)
            },
            rightArrow: function(e) {
                var _this$_drag4;
                null === (_this$_drag4 = _this._drag) || void 0 === _this$_drag4 ? void 0 : _this$_drag4.moveRight(e)
            }
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            fullScreen: false,
            title: "",
            showTitle: true,
            titleTemplate: "title",
            onTitleRendered: null,
            dragOutsideBoundary: false,
            dragEnabled: false,
            dragAndResizeArea: void 0,
            enableBodyScroll: true,
            outsideDragFactor: 0,
            onResizeStart: null,
            onResize: null,
            onResizeEnd: null,
            resizeEnabled: false,
            toolbarItems: [],
            showCloseButton: false,
            bottomTemplate: "bottom",
            useDefaultToolbarButtons: false,
            useFlatToolbarButtons: false,
            autoResizeEnabled: true
        })
    },
    _defaultOptionsRules: function() {
        var themeName = (0, _themes.current)();
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                animation: this._iosAnimation
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                animation: this._androidAnimation
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                showCloseButton: true
            }
        }, {
            device: function(_device) {
                return "desktop" === _devices.default.real().deviceType && "generic" === _device.platform
            },
            options: {
                dragEnabled: true
            }
        }, {
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)(themeName)
            },
            options: {
                useDefaultToolbarButtons: true,
                useFlatToolbarButtons: true,
                showCloseButton: false
            }
        }])
    },
    _iosAnimation: {
        show: {
            type: "slide",
            duration: 400,
            from: {
                position: {
                    my: "top",
                    at: "bottom"
                }
            },
            to: {
                position: {
                    my: "center",
                    at: "center"
                }
            }
        },
        hide: {
            type: "slide",
            duration: 400,
            from: {
                opacity: 1,
                position: {
                    my: "center",
                    at: "center"
                }
            },
            to: {
                opacity: 1,
                position: {
                    my: "top",
                    at: "bottom"
                }
            }
        }
    },
    _androidAnimation: function() {
        return this.option("fullScreen") ? {
            show: {
                type: "slide",
                duration: 300,
                from: {
                    top: "30%",
                    opacity: 0
                },
                to: {
                    top: 0,
                    opacity: 1
                }
            },
            hide: {
                type: "slide",
                duration: 300,
                from: {
                    top: 0,
                    opacity: 1
                },
                to: {
                    top: "30%",
                    opacity: 0
                }
            }
        } : {
            show: {
                type: "fade",
                duration: 400,
                from: 0,
                to: 1
            },
            hide: {
                type: "fade",
                duration: 400,
                from: 1,
                to: 0
            }
        }
    },
    _init: function() {
        var popupWrapperClassExternal = this.option("_wrapperClassExternal");
        var popupWrapperClasses = popupWrapperClassExternal ? "".concat(POPUP_WRAPPER_CLASS, " ").concat(popupWrapperClassExternal) : POPUP_WRAPPER_CLASS;
        this.callBase();
        this._createBodyOverflowManager();
        this._updateResizeCallbackSkipCondition();
        this.$element().addClass(POPUP_CLASS);
        this.$wrapper().addClass(popupWrapperClasses);
        this._$popupContent = this._$content.wrapInner((0, _renderer.default)("<div>").addClass(POPUP_CONTENT_CLASS)).children().eq(0);
        this._toggleContentScrollClass();
        this.$overlayContent().attr("role", "dialog")
    },
    _render: function() {
        var isFullscreen = this.option("fullScreen");
        this._toggleFullScreenClass(isFullscreen);
        this.callBase()
    },
    _createBodyOverflowManager: function() {
        this._bodyOverflowManager = (0, _popup_overflow_manager.createBodyOverflowManager)()
    },
    _toggleFullScreenClass: function(value) {
        this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_CLASS, value).toggleClass(POPUP_NORMAL_CLASS, !value)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new _empty_template.EmptyTemplate,
            bottom: new _empty_template.EmptyTemplate
        })
    },
    _getActionsList: function() {
        return this.callBase().concat(["onResizeStart", "onResize", "onResizeEnd"])
    },
    _contentResizeHandler: function(entry) {
        if (!this._shouldSkipContentResize(entry)) {
            this._renderGeometry({
                shouldOnlyReposition: true
            })
        }
    },
    _doesShowAnimationChangeDimensions: function() {
        var animation = this.option("animation");
        return ["to", "from"].some((function(prop) {
            var _animation$show;
            var config = null === animation || void 0 === animation ? void 0 : null === (_animation$show = animation.show) || void 0 === _animation$show ? void 0 : _animation$show[prop];
            return (0, _type.isObject)(config) && ("width" in config || "height" in config)
        }))
    },
    _updateResizeCallbackSkipCondition: function() {
        var _this2 = this;
        var doesShowAnimationChangeDimensions = this._doesShowAnimationChangeDimensions();
        this._shouldSkipContentResize = function(entry) {
            return doesShowAnimationChangeDimensions && _this2._showAnimationProcessing || _this2._areContentDimensionsRendered(entry)
        }
    },
    _observeContentResize: function(shouldObserve) {
        var _this3 = this;
        if (!this.option("useResizeObserver")) {
            return
        }
        var contentElement = this._$content.get(0);
        if (shouldObserve) {
            _resize_observer.default.observe(contentElement, (function(entry) {
                _this3._contentResizeHandler(entry)
            }))
        } else {
            _resize_observer.default.unobserve(contentElement)
        }
    },
    _areContentDimensionsRendered: function(entry) {
        var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
        var contentBox = null === (_entry$contentBoxSize = entry.contentBoxSize) || void 0 === _entry$contentBoxSize ? void 0 : _entry$contentBoxSize[0];
        if (contentBox) {
            var _this$_renderedDimens, _this$_renderedDimens2;
            return parseInt(contentBox.inlineSize, 10) === (null === (_this$_renderedDimens = this._renderedDimensions) || void 0 === _this$_renderedDimens ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === (null === (_this$_renderedDimens2 = this._renderedDimensions) || void 0 === _this$_renderedDimens2 ? void 0 : _this$_renderedDimens2.height)
        }
        var contentRect = entry.contentRect;
        return parseInt(contentRect.width, 10) === (null === (_this$_renderedDimens3 = this._renderedDimensions) || void 0 === _this$_renderedDimens3 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === (null === (_this$_renderedDimens4 = this._renderedDimensions) || void 0 === _this$_renderedDimens4 ? void 0 : _this$_renderedDimens4.height)
    },
    _renderContent: function() {
        this.callBase();
        this._observeContentResize(true)
    },
    _renderContentImpl: function() {
        this._renderTitle();
        this.callBase();
        this._renderResize();
        this._renderBottom()
    },
    _renderTitle: function() {
        var items = this._getToolbarItems("top");
        var titleText = this.option("title");
        var showTitle = this.option("showTitle");
        if (showTitle && !!titleText) {
            items.unshift({
                location: _devices.default.current().ios ? "center" : "before",
                text: titleText
            })
        }
        if (showTitle || items.length > 0) {
            this._$title && this._$title.remove();
            var $title = (0, _renderer.default)("<div>").addClass(POPUP_TITLE_CLASS).insertBefore(this.$content());
            this._$title = this._renderTemplateByType("titleTemplate", items, $title).addClass(POPUP_TITLE_CLASS);
            this._renderDrag();
            this._executeTitleRenderAction(this._$title);
            this._$title.toggleClass(POPUP_HAS_CLOSE_BUTTON_CLASS, this._hasCloseButton())
        } else if (this._$title) {
            this._$title.detach()
        }
    },
    _renderTemplateByType: function(optionName, data, $container, additionalToolbarOptions) {
        var _this$option = this.option(),
            rtlEnabled = _this$option.rtlEnabled,
            useDefaultToolbarButtons = _this$option.useDefaultToolbarButtons,
            useFlatToolbarButtons = _this$option.useFlatToolbarButtons,
            disabled = _this$option.disabled;
        var template = this._getTemplateByOption(optionName);
        var toolbarTemplate = template instanceof _empty_template.EmptyTemplate;
        if (toolbarTemplate) {
            var integrationOptions = (0, _extend.extend)({}, this.option("integrationOptions"), {
                skipTemplates: ["content", "title"]
            });
            var toolbarOptions = (0, _extend.extend)(additionalToolbarOptions, {
                items: data,
                rtlEnabled: rtlEnabled,
                useDefaultButtons: useDefaultToolbarButtons,
                useFlatButtons: useFlatToolbarButtons,
                disabled: disabled,
                integrationOptions: integrationOptions
            });
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: {
                    widget: this._getToolbarName(),
                    options: toolbarOptions
                }
            });
            var $toolbar = $container.children("div");
            $container.replaceWith($toolbar);
            return $toolbar
        } else {
            var $result = (0, _renderer.default)(template.render({
                container: (0, _element.getPublicElement)($container)
            }));
            if ($result.hasClass(TEMPLATE_WRAPPER_CLASS)) {
                $container.replaceWith($result);
                $container = $result
            }
            return $container
        }
    },
    _getToolbarName: function() {
        return "dxToolbarBase"
    },
    _renderVisibilityAnimate: function(visible) {
        return this.callBase(visible)
    },
    _hide: function() {
        this._observeContentResize(false);
        return this.callBase()
    },
    _executeTitleRenderAction: function($titleElement) {
        this._getTitleRenderAction()({
            titleElement: (0, _element.getPublicElement)($titleElement)
        })
    },
    _getTitleRenderAction: function() {
        return this._titleRenderAction || this._createTitleRenderAction()
    },
    _createTitleRenderAction: function() {
        return this._titleRenderAction = this._createActionByOption("onTitleRendered", {
            element: this.element(),
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _getCloseButton: function() {
        return {
            toolbar: "top",
            location: "after",
            template: this._getCloseButtonRenderer()
        }
    },
    _getCloseButtonRenderer: function() {
        var _this4 = this;
        return function(_, __, container) {
            var $button = (0, _renderer.default)("<div>").addClass(POPUP_TITLE_CLOSEBUTTON_CLASS);
            _this4._createComponent($button, _button.default, {
                icon: "close",
                onClick: _this4._createToolbarItemAction(void 0),
                stylingMode: "text",
                integrationOptions: {}
            });
            (0, _renderer.default)(container).append($button)
        }
    },
    _getToolbarItems: function(toolbar) {
        var _this5 = this;
        var toolbarItems = this.option("toolbarItems");
        var toolbarsItems = [];
        this._toolbarItemClasses = [];
        var currentPlatform = _devices.default.current().platform;
        var index = 0;
        (0, _iterator.each)(toolbarItems, (function(_, data) {
            var isShortcut = (0, _type.isDefined)(data.shortcut);
            var item = isShortcut ? getButtonPlace(data.shortcut) : data;
            if (isShortcut && "ios" === currentPlatform && index < 2) {
                item.toolbar = "top";
                index++
            }
            item.toolbar = data.toolbar || item.toolbar || "top";
            if (item && item.toolbar === toolbar) {
                if (isShortcut) {
                    (0, _extend.extend)(item, {
                        location: data.location
                    }, _this5._getToolbarItemByAlias(data))
                }
                var isLTROrder = "generic" === currentPlatform;
                if ("done" === data.shortcut && isLTROrder || "cancel" === data.shortcut && !isLTROrder) {
                    toolbarsItems.unshift(item)
                } else {
                    toolbarsItems.push(item)
                }
            }
        }));
        if ("top" === toolbar && this._hasCloseButton()) {
            toolbarsItems.push(this._getCloseButton())
        }
        return toolbarsItems
    },
    _hasCloseButton: function() {
        return this.option("showCloseButton") && this.option("showTitle")
    },
    _getLocalizationKey: function(itemType) {
        return "done" === itemType.toLowerCase() ? "OK" : (0, _inflector.camelize)(itemType, true)
    },
    _getToolbarItemByAlias: function(data) {
        var that = this;
        var itemType = data.shortcut;
        if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
            return false
        }
        var itemConfig = (0, _extend.extend)({
            text: _message.default.format(this._getLocalizationKey(itemType)),
            onClick: this._createToolbarItemAction(data.onClick),
            integrationOptions: {},
            type: that.option("useDefaultToolbarButtons") ? BUTTON_DEFAULT_TYPE : BUTTON_NORMAL_TYPE,
            stylingMode: that.option("useFlatToolbarButtons") ? BUTTON_TEXT_MODE : BUTTON_CONTAINED_MODE
        }, data.options || {});
        var itemClass = POPUP_CLASS + "-" + itemType;
        this._toolbarItemClasses.push(itemClass);
        return {
            template: function(_, __, container) {
                var $toolbarItem = (0, _renderer.default)("<div>").addClass(itemClass).appendTo(container);
                that._createComponent($toolbarItem, _button.default, itemConfig)
            }
        }
    },
    _createToolbarItemAction: function(clickAction) {
        return this._createAction(clickAction, {
            afterExecute: function(e) {
                e.component.hide()
            }
        })
    },
    _renderBottom: function() {
        var items = this._getToolbarItems("bottom");
        if (items.length) {
            this._$bottom && this._$bottom.remove();
            var $bottom = (0, _renderer.default)("<div>").addClass(POPUP_BOTTOM_CLASS).insertAfter(this.$content());
            this._$bottom = this._renderTemplateByType("bottomTemplate", items, $bottom, {
                compactMode: true
            }).addClass(POPUP_BOTTOM_CLASS);
            this._toggleClasses()
        } else {
            this._$bottom && this._$bottom.detach()
        }
    },
    _toggleDisabledState: function(value) {
        this.callBase.apply(this, arguments);
        this.$content().toggleClass(DISABLED_STATE_CLASS, Boolean(value))
    },
    _toggleClasses: function() {
        var _this6 = this;
        var aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
        (0, _iterator.each)(aliases, (function(_, alias) {
            var className = POPUP_CLASS + "-" + alias;
            if (_this6._toolbarItemClasses.includes(className)) {
                _this6.$wrapper().addClass(className + "-visible");
                _this6._$bottom.addClass(className)
            } else {
                _this6.$wrapper().removeClass(className + "-visible");
                _this6._$bottom.removeClass(className)
            }
        }))
    },
    _toggleFocusClass: function(isFocused, $element) {
        this.callBase(isFocused, $element);
        if (isFocused && !zIndexPool.isLastZIndexInStack(this._zIndex)) {
            var zIndex = zIndexPool.create(this._zIndexInitValue());
            zIndexPool.remove(this._zIndex);
            this._zIndex = zIndex;
            this._$wrapper.css("zIndex", zIndex);
            this._$content.css("zIndex", zIndex)
        }
    },
    _toggleContentScrollClass: function() {
        var isNativeScrollingEnabled = !this.option("preventScrollEvents");
        this.$content().toggleClass(POPUP_CONTENT_SCROLLABLE_CLASS, isNativeScrollingEnabled)
    },
    _getPositionControllerConfig: function() {
        var _this$option2 = this.option(),
            fullScreen = _this$option2.fullScreen,
            forceApplyBindings = _this$option2.forceApplyBindings,
            dragOutsideBoundary = _this$option2.dragOutsideBoundary,
            dragAndResizeArea = _this$option2.dragAndResizeArea,
            outsideDragFactor = _this$option2.outsideDragFactor;
        return (0, _extend.extend)({}, this.callBase(), {
            fullScreen: fullScreen,
            forceApplyBindings: forceApplyBindings,
            dragOutsideBoundary: dragOutsideBoundary,
            dragAndResizeArea: dragAndResizeArea,
            outsideDragFactor: outsideDragFactor
        })
    },
    _initPositionController: function() {
        this._positionController = new _popup_position_controller.PopupPositionController(this._getPositionControllerConfig())
    },
    _getDragTarget: function() {
        return this.topToolbar()
    },
    _renderGeometry: function(options) {
        var _this$option3 = this.option(),
            visible = _this$option3.visible,
            useResizeObserver = _this$option3.useResizeObserver;
        if (visible && (0, _window.hasWindow)()) {
            var isAnimated = this._showAnimationProcessing;
            var shouldRepeatAnimation = isAnimated && !(null !== options && void 0 !== options && options.forceStopAnimation) && useResizeObserver;
            this._isAnimationPaused = shouldRepeatAnimation || void 0;
            this._stopAnimation();
            if (null !== options && void 0 !== options && options.shouldOnlyReposition) {
                this._renderPosition(false)
            } else {
                this._renderGeometryImpl(null === options || void 0 === options ? void 0 : options.isDimensionChange)
            }
            if (shouldRepeatAnimation) {
                this._animateShowing();
                this._isAnimationPaused = void 0
            }
        }
    },
    _cacheDimensions: function() {
        if (!this.option("useResizeObserver")) {
            return
        }
        this._renderedDimensions = {
            width: parseInt((0, _size.getWidth)(this._$content), 10),
            height: parseInt((0, _size.getHeight)(this._$content), 10)
        }
    },
    _renderGeometryImpl: function() {
        var isDimensionChange = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        if (!isDimensionChange) {
            this._resetContentHeight()
        }
        this.callBase();
        this._cacheDimensions();
        this._setContentHeight()
    },
    _resetContentHeight: function() {
        var height = this._getOptionValue("height");
        if ("auto" === height) {
            this.$content().css({
                height: "auto",
                maxHeight: "none"
            })
        }
    },
    _renderDrag: function() {
        var $dragTarget = this._getDragTarget();
        var dragEnabled = this.option("dragEnabled");
        if (!$dragTarget) {
            return
        }
        var config = {
            dragEnabled: dragEnabled,
            handle: $dragTarget.get(0),
            draggableElement: this._$content.get(0),
            positionController: this._positionController
        };
        if (this._drag) {
            this._drag.init(config)
        } else {
            this._drag = new _popup_drag.default(config)
        }
        this.$overlayContent().toggleClass(POPUP_DRAGGABLE_CLASS, dragEnabled)
    },
    _renderResize: function() {
        var _this7 = this;
        this._resizable = this._createComponent(this._$content, _resizable.default, {
            handles: this.option("resizeEnabled") ? "all" : "none",
            onResizeEnd: function(e) {
                _this7._resizeEndHandler(e);
                _this7._observeContentResize(true)
            },
            onResize: function(e) {
                _this7._setContentHeight();
                _this7._actions.onResize(e)
            },
            onResizeStart: function(e) {
                _this7._observeContentResize(false);
                _this7._actions.onResizeStart(e)
            },
            minHeight: 100,
            minWidth: 100,
            area: this._positionController.$dragResizeContainer,
            keepAspectRatio: false
        })
    },
    _resizeEndHandler: function(e) {
        var width = this._resizable.option("width");
        var height = this._resizable.option("height");
        width && this._setOptionWithoutOptionChange("width", width);
        height && this._setOptionWithoutOptionChange("height", height);
        this._cacheDimensions();
        this._positionController.resizeHandled();
        this._positionController.detectVisualPositionChange(e.event);
        this._actions.onResizeEnd(e)
    },
    _setContentHeight: function() {
        (this.option("forceApplyBindings") || _common.noop)();
        var overlayContent = this.$overlayContent().get(0);
        var currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
        this.$content().css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
        this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass)
    },
    _heightStrategyChangeOffset: function(currentHeightStrategyClass, popupVerticalPaddings) {
        return currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0
    },
    _chooseHeightStrategy: function(overlayContent) {
        var isAutoWidth = "auto" === overlayContent.style.width || "" === overlayContent.style.width;
        var currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
        if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
            if (isAutoWidth || IS_OLD_SAFARI) {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit
            } else {
                currentHeightStrategyClass = HEIGHT_STRATEGIES.flex
            }
        }
        return currentHeightStrategyClass
    },
    _getHeightCssStyles: function(currentHeightStrategyClass, overlayContent) {
        var cssStyles = {};
        var contentMaxHeight = this._getOptionValue("maxHeight", overlayContent);
        var contentMinHeight = this._getOptionValue("minHeight", overlayContent);
        var popupHeightParts = this._splitPopupHeight();
        var toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + this._heightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
        if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
            if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
                var overlayHeight = this.option("fullScreen") ? Math.min((0, _position.getBoundingRect)(overlayContent).height, (0, _window.getWindow)().innerHeight) : (0, _position.getBoundingRect)(overlayContent).height;
                var contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
                cssStyles = {
                    height: Math.max(0, contentHeight),
                    minHeight: "auto",
                    maxHeight: "auto"
                }
            }
        } else {
            var container = (0, _renderer.default)(this._positionController.$visualContainer).get(0);
            var maxHeightValue = (0, _size.addOffsetToMaxHeight)(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
            var minHeightValue = (0, _size.addOffsetToMinHeight)(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
            cssStyles = {
                height: "auto",
                minHeight: minHeightValue,
                maxHeight: maxHeightValue
            }
        }
        return cssStyles
    },
    _setHeightClasses: function($container, currentClass) {
        var excessClasses = "";
        for (var name in HEIGHT_STRATEGIES) {
            if (HEIGHT_STRATEGIES[name] !== currentClass) {
                excessClasses += " " + HEIGHT_STRATEGIES[name]
            }
        }
        $container.removeClass(excessClasses).addClass(currentClass)
    },
    _isAutoHeight: function() {
        return "auto" === this.$overlayContent().get(0).style.height
    },
    _splitPopupHeight: function() {
        var topToolbar = this.topToolbar();
        var bottomToolbar = this.bottomToolbar();
        return {
            header: (0, _size.getVisibleHeight)(topToolbar && topToolbar.get(0)),
            footer: (0, _size.getVisibleHeight)(bottomToolbar && bottomToolbar.get(0)),
            contentVerticalOffsets: (0, _size.getVerticalOffsets)(this.$overlayContent().get(0), true),
            popupVerticalOffsets: (0, _size.getVerticalOffsets)(this.$content().get(0), true),
            popupVerticalPaddings: (0, _size.getVerticalOffsets)(this.$content().get(0), false)
        }
    },
    _isAllWindowCovered: function() {
        return this.callBase() || this.option("fullScreen")
    },
    _renderDimensions: function() {
        if (this.option("fullScreen")) {
            this.$overlayContent().css({
                width: "100%",
                height: "100%",
                minWidth: "",
                maxWidth: "",
                minHeight: "",
                maxHeight: ""
            })
        } else {
            this.callBase()
        }
        if ((0, _window.hasWindow)()) {
            this._renderFullscreenWidthClass()
        }
    },
    _dimensionChanged: function() {
        this._renderGeometry({
            isDimensionChange: true
        })
    },
    _clean: function() {
        this.callBase();
        this._observeContentResize(false)
    },
    _dispose: function() {
        this.callBase();
        this._toggleBodyScroll(true)
    },
    _renderFullscreenWidthClass: function() {
        this.$overlayContent().toggleClass(POPUP_FULL_SCREEN_WIDTH_CLASS, (0, _size.getOuterWidth)(this.$overlayContent()) === (0, _size.getWidth)(window))
    },
    _toggleSafariScrolling: function() {
        if (!this.option("enableBodyScroll")) {
            return
        }
        this.callBase()
    },
    _toggleBodyScroll: function(enabled) {
        if (!this._bodyOverflowManager) {
            return
        }
        var _this$_bodyOverflowMa = this._bodyOverflowManager,
            setOverflow = _this$_bodyOverflowMa.setOverflow,
            restoreOverflow = _this$_bodyOverflowMa.restoreOverflow;
        if (enabled) {
            restoreOverflow()
        } else {
            setOverflow()
        }
    },
    refreshPosition: function() {
        this._renderPosition()
    },
    _optionChanged: function(args) {
        var _this$_resizable2;
        var value = args.value,
            name = args.name;
        switch (name) {
            case "disabled":
                this.callBase(args);
                this._renderTitle();
                this._renderBottom();
                break;
            case "animation":
                this._updateResizeCallbackSkipCondition();
                break;
            case "enableBodyScroll":
                this._toggleBodyScroll(value);
                break;
            case "showTitle":
            case "title":
            case "titleTemplate":
                this._renderTitle();
                this._renderGeometry();
                (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
                break;
            case "bottomTemplate":
                this._renderBottom();
                this._renderGeometry();
                (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
                break;
            case "container":
                this.callBase(args);
                if (this.option("resizeEnabled")) {
                    var _this$_resizable;
                    null === (_this$_resizable = this._resizable) || void 0 === _this$_resizable ? void 0 : _this$_resizable.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "width":
            case "height":
                this.callBase(args);
                null === (_this$_resizable2 = this._resizable) || void 0 === _this$_resizable2 ? void 0 : _this$_resizable2.option(name, value);
                break;
            case "onTitleRendered":
                this._createTitleRenderAction(value);
                break;
            case "toolbarItems":
            case "useDefaultToolbarButtons":
            case "useFlatToolbarButtons":
                var shouldRenderGeometry = !args.fullName.match(/^toolbarItems((\[\d+\])(\.(options|visible).*)?)?$/);
                this._renderTitle();
                this._renderBottom();
                if (shouldRenderGeometry) {
                    this._renderGeometry();
                    (0, _visibility_change.triggerResizeEvent)(this.$overlayContent())
                }
                break;
            case "dragEnabled":
                this._renderDrag();
                break;
            case "dragAndResizeArea":
                this._positionController.dragAndResizeArea = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                this._positionController.positionContent();
                break;
            case "dragOutsideBoundary":
                this._positionController.dragOutsideBoundary = value;
                if (this.option("resizeEnabled")) {
                    this._resizable.option("area", this._positionController.$dragResizeContainer)
                }
                break;
            case "outsideDragFactor":
                this._positionController.outsideDragFactor = value;
                break;
            case "resizeEnabled":
                this._renderResize();
                this._renderGeometry();
                break;
            case "autoResizeEnabled":
                this._renderGeometry();
                (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
                break;
            case "fullScreen":
                this._positionController.fullScreen = value;
                this._toggleFullScreenClass(value);
                this._toggleSafariScrolling();
                this._renderGeometry();
                (0, _visibility_change.triggerResizeEvent)(this.$overlayContent());
                break;
            case "showCloseButton":
                this._renderTitle();
                break;
            case "preventScrollEvents":
                this.callBase(args);
                this._toggleContentScrollClass();
                break;
            default:
                this.callBase(args)
        }
    },
    bottomToolbar: function() {
        return this._$bottom
    },
    topToolbar: function() {
        return this._$title
    },
    $content: function() {
        return this._$popupContent
    },
    content: function() {
        return (0, _element.getPublicElement)(this.$content())
    },
    $overlayContent: function() {
        return this._$content
    }
});
(0, _component_registrator.default)("dxPopup", Popup);
var _default = Popup;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
