/**
 * DevExtreme (cjs/ui/toolbar/ui.toolbar.base.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _themes = require("../themes");
var _type = require("../../core/utils/type");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _position = require("../../core/utils/position");
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.async"));
var _bindable_template = require("../../core/templates/bindable_template");
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _constants = require("./constants");

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
var TOOLBAR_BEFORE_CLASS = "dx-toolbar-before";
var TOOLBAR_CENTER_CLASS = "dx-toolbar-center";
var TOOLBAR_AFTER_CLASS = "dx-toolbar-after";
var TOOLBAR_MINI_CLASS = "dx-toolbar-mini";
var TOOLBAR_ITEM_CLASS = "dx-toolbar-item";
var TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
var TOOLBAR_BUTTON_CLASS = "dx-toolbar-button";
var TOOLBAR_ITEMS_CONTAINER_CLASS = "dx-toolbar-items-container";
var TOOLBAR_GROUP_CLASS = "dx-toolbar-group";
var TOOLBAR_COMPACT_CLASS = "dx-toolbar-compact";
var TEXT_BUTTON_MODE = "text";
var DEFAULT_BUTTON_TYPE = "default";
var DEFAULT_DROPDOWNBUTTON_STYLING_MODE = "contained";
var TOOLBAR_ITEM_DATA_KEY = "dxToolbarItemDataKey";
var ANIMATION_TIMEOUT = 15;
var ToolbarBase = function(_AsyncCollectionWidge) {
    _inheritsLoose(ToolbarBase, _AsyncCollectionWidge);

    function ToolbarBase() {
        return _AsyncCollectionWidge.apply(this, arguments) || this
    }
    var _proto = ToolbarBase.prototype;
    _proto._getSynchronizableOptionsForCreateComponent = function() {
        return _AsyncCollectionWidge.prototype._getSynchronizableOptionsForCreateComponent.call(this).filter((function(item) {
            return "disabled" !== item
        }))
    };
    _proto._initTemplates = function() {
        _AsyncCollectionWidge.prototype._initTemplates.call(this);
        var template = new _bindable_template.BindableTemplate(function($container, data, rawModel) {
            if ((0, _type.isPlainObject)(data)) {
                var text = data.text,
                    html = data.html,
                    widget = data.widget;
                if (text) {
                    $container.text(text).wrapInner("<div>")
                }
                if (html) {
                    $container.html(html)
                }
                if ("dxDropDownButton" === widget) {
                    var _data$options;
                    data.options = null !== (_data$options = data.options) && void 0 !== _data$options ? _data$options : {};
                    if (!(0, _type.isDefined)(data.options.stylingMode)) {
                        data.options.stylingMode = this.option("useFlatButtons") ? TEXT_BUTTON_MODE : DEFAULT_DROPDOWNBUTTON_STYLING_MODE
                    }
                }
                if ("dxButton" === widget) {
                    if (this.option("useFlatButtons")) {
                        var _data$options2, _data$options$styling;
                        data.options = null !== (_data$options2 = data.options) && void 0 !== _data$options2 ? _data$options2 : {};
                        data.options.stylingMode = null !== (_data$options$styling = data.options.stylingMode) && void 0 !== _data$options$styling ? _data$options$styling : TEXT_BUTTON_MODE
                    }
                    if (this.option("useDefaultButtons")) {
                        var _data$options3, _data$options$type;
                        data.options = null !== (_data$options3 = data.options) && void 0 !== _data$options3 ? _data$options3 : {};
                        data.options.type = null !== (_data$options$type = data.options.type) && void 0 !== _data$options$type ? _data$options$type : DEFAULT_BUTTON_TYPE
                    }
                }
            } else {
                $container.text(String(data))
            }
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: rawModel,
                parent: this
            })
        }.bind(this), ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
        this._templateManager.addDefaultTemplates({
            item: template,
            menuItem: template
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_AsyncCollectionWidge.prototype._getDefaultOptions.call(this), {
            renderAs: "topToolbar",
            grouped: false,
            useFlatButtons: false,
            useDefaultButtons: false
        })
    };
    _proto._defaultOptionsRules = function() {
        return _AsyncCollectionWidge.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                useFlatButtons: true
            }
        }])
    };
    _proto._itemContainer = function() {
        return this._$toolbarItemsContainer.find([".".concat(TOOLBAR_BEFORE_CLASS), ".".concat(TOOLBAR_CENTER_CLASS), ".".concat(TOOLBAR_AFTER_CLASS)].join(","))
    };
    _proto._itemClass = function() {
        return TOOLBAR_ITEM_CLASS
    };
    _proto._itemDataKey = function() {
        return TOOLBAR_ITEM_DATA_KEY
    };
    _proto._dimensionChanged = function() {
        if (this._disposed) {
            return
        }
        this._arrangeItems();
        this._applyCompactMode()
    };
    _proto._initMarkup = function() {
        this._renderToolbar();
        this._renderSections();
        _AsyncCollectionWidge.prototype._initMarkup.call(this)
    };
    _proto._render = function() {
        _AsyncCollectionWidge.prototype._render.call(this);
        this._renderItemsAsync();
        this._updateDimensionsInMaterial()
    };
    _proto._postProcessRenderItems = function() {
        this._arrangeItems()
    };
    _proto._renderToolbar = function() {
        this.$element().addClass(_constants.TOOLBAR_CLASS);
        this._$toolbarItemsContainer = (0, _renderer.default)("<div>").addClass(TOOLBAR_ITEMS_CONTAINER_CLASS).appendTo(this.$element());
        this.setAria("role", "toolbar")
    };
    _proto._renderSections = function() {
        var _this = this;
        var $container = this._$toolbarItemsContainer;
        (0, _iterator.each)(["before", "center", "after"], (function(_, section) {
            var sectionClass = "dx-toolbar-".concat(section);
            var $section = $container.find(".".concat(sectionClass));
            if (!$section.length) {
                _this["_$".concat(section, "Section")] = (0, _renderer.default)("<div>").addClass(sectionClass).appendTo($container)
            }
        }))
    };
    _proto._arrangeItems = function(elementWidth) {
        var _elementWidth;
        elementWidth = null !== (_elementWidth = elementWidth) && void 0 !== _elementWidth ? _elementWidth : (0, _size.getWidth)(this.$element());
        this._$centerSection.css({
            margin: "0 auto",
            float: "none"
        });
        var beforeRect = (0, _position.getBoundingRect)(this._$beforeSection.get(0));
        var afterRect = (0, _position.getBoundingRect)(this._$afterSection.get(0));
        this._alignCenterSection(beforeRect, afterRect, elementWidth);
        var $label = this._$toolbarItemsContainer.find(".".concat(TOOLBAR_LABEL_CLASS)).eq(0);
        var $section = $label.parent();
        if (!$label.length) {
            return
        }
        var labelOffset = beforeRect.width ? beforeRect.width : $label.position().left;
        var widthBeforeSection = $section.hasClass(TOOLBAR_BEFORE_CLASS) ? 0 : labelOffset;
        var widthAfterSection = $section.hasClass(TOOLBAR_AFTER_CLASS) ? 0 : afterRect.width;
        var elemsAtSectionWidth = 0;
        $section.children().not(".".concat(TOOLBAR_LABEL_CLASS)).each((function() {
            elemsAtSectionWidth += (0, _size.getOuterWidth)(this)
        }));
        var freeSpace = elementWidth - elemsAtSectionWidth;
        var sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
        if ($section.hasClass(TOOLBAR_BEFORE_CLASS)) {
            this._alignSection(this._$beforeSection, sectionMaxWidth)
        } else {
            var labelPaddings = (0, _size.getOuterWidth)($label) - (0, _size.getWidth)($label);
            $label.css("maxWidth", sectionMaxWidth - labelPaddings)
        }
    };
    _proto._alignCenterSection = function(beforeRect, afterRect, elementWidth) {
        this._alignSection(this._$centerSection, elementWidth - beforeRect.width - afterRect.width);
        var isRTL = this.option("rtlEnabled");
        var leftRect = isRTL ? afterRect : beforeRect;
        var rightRect = isRTL ? beforeRect : afterRect;
        var centerRect = (0, _position.getBoundingRect)(this._$centerSection.get(0));
        if (leftRect.right > centerRect.left || centerRect.right > rightRect.left) {
            this._$centerSection.css({
                marginLeft: leftRect.width,
                marginRight: rightRect.width,
                float: leftRect.width > rightRect.width ? "none" : "right"
            })
        }
    };
    _proto._alignSection = function($section, maxWidth) {
        var $labels = $section.find(".".concat(TOOLBAR_LABEL_CLASS));
        var labels = $labels.toArray();
        maxWidth -= this._getCurrentLabelsPaddings(labels);
        var currentWidth = this._getCurrentLabelsWidth(labels);
        var difference = Math.abs(currentWidth - maxWidth);
        if (maxWidth < currentWidth) {
            labels = labels.reverse();
            this._alignSectionLabels(labels, difference, false)
        } else {
            this._alignSectionLabels(labels, difference, true)
        }
    };
    _proto._alignSectionLabels = function(labels, difference, expanding) {
        var getRealLabelWidth = function(label) {
            return (0, _position.getBoundingRect)(label).width
        };
        for (var i = 0; i < labels.length; i++) {
            var $label = (0, _renderer.default)(labels[i]);
            var currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
            var labelMaxWidth = void 0;
            if (expanding) {
                $label.css("maxWidth", "inherit")
            }
            var possibleLabelWidth = Math.ceil(expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth);
            if (possibleLabelWidth < difference) {
                labelMaxWidth = expanding ? possibleLabelWidth : 0;
                difference -= possibleLabelWidth
            } else {
                labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
                $label.css("maxWidth", labelMaxWidth);
                break
            }
            $label.css("maxWidth", labelMaxWidth)
        }
    };
    _proto._applyCompactMode = function() {
        var $element = this.$element();
        $element.removeClass(TOOLBAR_COMPACT_CLASS);
        if (this.option("compactMode") && this._getSummaryItemsWidth(this.itemElements(), true) > (0, _size.getWidth)($element)) {
            $element.addClass(TOOLBAR_COMPACT_CLASS)
        }
    };
    _proto._getCurrentLabelsWidth = function(labels) {
        var width = 0;
        labels.forEach((function(label, index) {
            width += (0, _size.getOuterWidth)(label)
        }));
        return width
    };
    _proto._getCurrentLabelsPaddings = function(labels) {
        var padding = 0;
        labels.forEach((function(label, index) {
            padding += (0, _size.getOuterWidth)(label) - (0, _size.getWidth)(label)
        }));
        return padding
    };
    _proto._renderItem = function(index, item, itemContainer, $after) {
        var _item$location, _item$text;
        var location = null !== (_item$location = item.location) && void 0 !== _item$location ? _item$location : "center";
        var container = null !== itemContainer && void 0 !== itemContainer ? itemContainer : this["_$".concat(location, "Section")];
        var itemHasText = !!(null !== (_item$text = item.text) && void 0 !== _item$text ? _item$text : item.html);
        var itemElement = _AsyncCollectionWidge.prototype._renderItem.call(this, index, item, container, $after);
        itemElement.toggleClass(TOOLBAR_BUTTON_CLASS, !itemHasText).toggleClass(TOOLBAR_LABEL_CLASS, itemHasText).addClass(item.cssClass);
        return itemElement
    };
    _proto._renderGroupedItems = function() {
        var _this2 = this;
        (0, _iterator.each)(this.option("items"), (function(groupIndex, group) {
            var _group$location;
            var groupItems = group.items;
            var $container = (0, _renderer.default)("<div>").addClass(TOOLBAR_GROUP_CLASS);
            var location = null !== (_group$location = group.location) && void 0 !== _group$location ? _group$location : "center";
            if (!groupItems || !groupItems.length) {
                return
            }(0, _iterator.each)(groupItems, (function(itemIndex, item) {
                _this2._renderItem(itemIndex, item, $container, null)
            }));
            _this2._$toolbarItemsContainer.find(".dx-toolbar-".concat(location)).append($container)
        }))
    };
    _proto._renderItems = function(items) {
        var grouped = this.option("grouped") && items.length && items[0].items;
        grouped ? this._renderGroupedItems() : _AsyncCollectionWidge.prototype._renderItems.call(this, items)
    };
    _proto._getToolbarItems = function() {
        var _this$option;
        return null !== (_this$option = this.option("items")) && void 0 !== _this$option ? _this$option : []
    };
    _proto._renderContentImpl = function() {
        var items = this._getToolbarItems();
        this.$element().toggleClass(TOOLBAR_MINI_CLASS, 0 === items.length);
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
        this._applyCompactMode()
    };
    _proto._renderEmptyMessage = function() {};
    _proto._clean = function() {
        this._$toolbarItemsContainer.children().empty();
        this.$element().empty();
        delete this._$beforeSection;
        delete this._$centerSection;
        delete this._$afterSection
    };
    _proto._visibilityChanged = function(visible) {
        if (visible) {
            this._arrangeItems()
        }
    };
    _proto._isVisible = function() {
        return (0, _size.getWidth)(this.$element()) > 0 && (0, _size.getHeight)(this.$element()) > 0
    };
    _proto._getIndexByItem = function(item) {
        return this._getToolbarItems().indexOf(item)
    };
    _proto._itemOptionChanged = function(item, property, value) {
        _AsyncCollectionWidge.prototype._itemOptionChanged.apply(this, [item, property, value]);
        this._arrangeItems()
    };
    _proto._optionChanged = function(_ref) {
        var name = _ref.name;
        _ref.value;
        switch (name) {
            case "width":
                _AsyncCollectionWidge.prototype._optionChanged.apply(this, arguments);
                this._dimensionChanged();
                break;
            case "renderAs":
            case "useFlatButtons":
            case "useDefaultButtons":
                this._invalidate();
                break;
            case "compactMode":
                this._applyCompactMode();
                break;
            case "grouped":
                break;
            default:
                _AsyncCollectionWidge.prototype._optionChanged.apply(this, arguments)
        }
    };
    _proto._dispose = function() {
        _AsyncCollectionWidge.prototype._dispose.call(this);
        clearTimeout(this._waitParentAnimationTimeout)
    };
    _proto._updateDimensionsInMaterial = function() {
        var _this3 = this;
        if ((0, _themes.isMaterial)()) {
            Promise.all([new Promise((function(resolve) {
                ! function runCheck() {
                    clearTimeout(_this3._waitParentAnimationTimeout);
                    _this3._waitParentAnimationTimeout = setTimeout((function() {
                        return function() {
                            var readyToResolve = true;
                            _this3.$element().parents().each((function(_, parent) {
                                if (_fx.default.isAnimating((0, _renderer.default)(parent))) {
                                    readyToResolve = false;
                                    return false
                                }
                            }));
                            if (readyToResolve) {
                                resolve()
                            }
                            return readyToResolve
                        }() || runCheck()
                    }), ANIMATION_TIMEOUT)
                }()
            })), function() {
                var $labels = _this3.$element().find(".".concat(TOOLBAR_LABEL_CLASS));
                var promises = [];
                $labels.each((function(_, label) {
                    var text = (0, _renderer.default)(label).text();
                    var fontWeight = (0, _renderer.default)(label).css("fontWeight");
                    promises.push((0, _themes.waitWebFont)(text, fontWeight))
                }));
                return Promise.all(promises)
            }()]).then((function() {
                _this3._dimensionChanged()
            }))
        }
    };
    return ToolbarBase
}(_uiCollection_widget.default);
(0, _component_registrator.default)("dxToolbarBase", ToolbarBase);
var _default = ToolbarBase;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
