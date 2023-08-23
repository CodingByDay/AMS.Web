/**
 * DevExtreme (bundles/__internal/grids/grid_core/filter/m_filter_panel.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterPanelModule = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _deferred = require("../../../../core/utils/deferred");
var _inflector = require("../../../../core/utils/inflector");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _check_box = _interopRequireDefault(require("../../../../ui/check_box"));
var _utils = require("../../../../ui/filter_builder/utils");
var _m_accessibility = require("../m_accessibility");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var FILTER_PANEL_CLASS = "filter-panel";
var FILTER_PANEL_TEXT_CLASS = "".concat(FILTER_PANEL_CLASS, "-text");
var FILTER_PANEL_CHECKBOX_CLASS = "".concat(FILTER_PANEL_CLASS, "-checkbox");
var FILTER_PANEL_CLEAR_FILTER_CLASS = "".concat(FILTER_PANEL_CLASS, "-clear-filter");
var FILTER_PANEL_LEFT_CONTAINER = "".concat(FILTER_PANEL_CLASS, "-left");
var FILTER_PANEL_TARGET = "filterPanel";
var FilterPanelView = _m_modules.default.View.inherit({
    isVisible: function() {
        return this.option("filterPanel.visible") && this.getController("data").dataSource()
    },
    init: function() {
        var _this = this;
        this.getController("data").dataSourceChanged.add((function() {
            return _this.render()
        }));
        this._columnsController = this.getController("columns")
    },
    _renderCore: function() {
        var $element = this.element();
        $element.empty();
        var isColumnsDefined = !!this._columnsController.getColumns().length;
        if (!isColumnsDefined) {
            return
        }
        $element.addClass(this.addWidgetPrefix(FILTER_PANEL_CLASS));
        var $leftContainer = (0, _renderer.default)("<div>").addClass(this.addWidgetPrefix(FILTER_PANEL_LEFT_CONTAINER)).appendTo($element);
        this._renderFilterBuilderText($element, $leftContainer)
    },
    _renderFilterBuilderText: function($element, $leftContainer) {
        var $filterElement = this._getFilterElement();
        var $textElement = this._getTextElement();
        if (this.option("filterValue") || this._filterValueBuffer) {
            var $checkElement = this._getCheckElement();
            var $removeButtonElement = this._getRemoveButtonElement();
            $leftContainer.append($checkElement).append($filterElement).append($textElement);
            $element.append($removeButtonElement);
            return
        }
        $leftContainer.append($filterElement).append($textElement)
    },
    _getCheckElement: function() {
        var that = this;
        var $element = (0, _renderer.default)("<div>").addClass(this.addWidgetPrefix(FILTER_PANEL_CHECKBOX_CLASS));
        that._createComponent($element, _check_box.default, {
            value: that.option("filterPanel.filterEnabled"),
            onValueChanged: function(e) {
                that.option("filterPanel.filterEnabled", e.value)
            }
        });
        $element.attr("title", this.option("filterPanel.texts.filterEnabledHint"));
        return $element
    },
    _getFilterElement: function() {
        var that = this;
        var $element = (0, _renderer.default)("<div>").addClass("dx-icon-filter");
        _events_engine.default.on($element, "click", (function() {
            return that._showFilterBuilder()
        }));
        (0, _m_accessibility.registerKeyboardAction)("filterPanel", that, $element, void 0, (function() {
            return that._showFilterBuilder()
        }));
        that._addTabIndexToElement($element);
        return $element
    },
    _getTextElement: function() {
        var that = this;
        var $textElement = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix(FILTER_PANEL_TEXT_CLASS));
        var filterText;
        var filterValue = that.option("filterValue");
        if (filterValue) {
            (0, _deferred.when)(that.getFilterText(filterValue, that.getController("filterSync").getCustomFilterOperations())).done((function(filterText) {
                var customizeText = that.option("filterPanel.customizeText");
                if (customizeText) {
                    var customText = customizeText({
                        component: that.component,
                        filterValue: filterValue,
                        text: filterText
                    });
                    if ("string" === typeof customText) {
                        filterText = customText
                    }
                }
                $textElement.text(filterText)
            }))
        } else {
            filterText = that.option("filterPanel.texts.createFilter");
            $textElement.text(filterText)
        }
        _events_engine.default.on($textElement, "click", (function() {
            return that._showFilterBuilder()
        }));
        (0, _m_accessibility.registerKeyboardAction)("filterPanel", that, $textElement, void 0, (function() {
            return that._showFilterBuilder()
        }));
        that._addTabIndexToElement($textElement);
        return $textElement
    },
    _showFilterBuilder: function() {
        this.option("filterBuilderPopup.visible", true)
    },
    _getRemoveButtonElement: function() {
        var that = this;
        var clearFilterValue = function() {
            return that.option("filterValue", null)
        };
        var $element = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix(FILTER_PANEL_CLEAR_FILTER_CLASS)).text(that.option("filterPanel.texts.clearFilter"));
        _events_engine.default.on($element, "click", clearFilterValue);
        (0, _m_accessibility.registerKeyboardAction)("filterPanel", this, $element, void 0, clearFilterValue);
        that._addTabIndexToElement($element);
        return $element
    },
    _addTabIndexToElement: function($element) {
        if (!this.option("useLegacyKeyboardNavigation")) {
            var tabindex = this.option("tabindex") || 0;
            $element.attr("tabindex", tabindex)
        }
    },
    optionChanged: function(args) {
        switch (args.name) {
            case "filterValue":
                this._invalidate();
                this.option("filterPanel.filterEnabled", true);
                args.handled = true;
                break;
            case "filterPanel":
                this._invalidate();
                args.handled = true;
                break;
            default:
                this.callBase(args)
        }
    },
    _getConditionText: function(fieldText, operationText, valueText) {
        var result = "[".concat(fieldText, "] ").concat(operationText);
        if ((0, _type.isDefined)(valueText)) {
            result += valueText
        }
        return result
    },
    _getValueMaskedText: function(value) {
        return Array.isArray(value) ? "('".concat(value.join("', '"), "')") : " '".concat(value, "'")
    },
    _getValueText: function(field, customOperation, value) {
        var _this2 = this;
        var deferred = new _deferred.Deferred;
        var hasCustomOperation = customOperation && customOperation.customizeText;
        if ((0, _type.isDefined)(value) || hasCustomOperation) {
            if (!hasCustomOperation && field.lookup) {
                (0, _utils.getCurrentLookupValueText)(field, value, (function(data) {
                    deferred.resolve(_this2._getValueMaskedText(data))
                }))
            } else {
                var displayValue = Array.isArray(value) ? value : _m_utils.default.getDisplayValue(field, value, null);
                (0, _deferred.when)((0, _utils.getCurrentValueText)(field, displayValue, customOperation, FILTER_PANEL_TARGET)).done((function(data) {
                    deferred.resolve(_this2._getValueMaskedText(data))
                }))
            }
        } else {
            deferred.resolve("")
        }
        return deferred.promise()
    },
    getConditionText: function(filterValue, options) {
        var that = this;
        var operation = filterValue[1];
        var deferred = new _deferred.Deferred;
        var customOperation = (0, _utils.getCustomOperation)(options.customOperations, operation);
        var operationText;
        var field = (0, _utils.getField)(filterValue[0], options.columns);
        var fieldText = field.caption || "";
        var value = filterValue[2];
        if (customOperation) {
            operationText = customOperation.caption || (0, _inflector.captionize)(customOperation.name)
        } else if (null === value) {
            operationText = (0, _utils.getCaptionByOperation)("=" === operation ? "isblank" : "isnotblank", options.filterOperationDescriptions)
        } else {
            operationText = (0, _utils.getCaptionByOperation)(operation, options.filterOperationDescriptions)
        }
        this._getValueText(field, customOperation, value).done((function(valueText) {
            deferred.resolve(that._getConditionText(fieldText, operationText, valueText))
        }));
        return deferred
    },
    getGroupText: function(filterValue, options, isInnerGroup) {
        var that = this;
        var result = new _deferred.Deferred;
        var textParts = [];
        var groupValue = (0, _utils.getGroupValue)(filterValue);
        filterValue.forEach((function(item) {
            if ((0, _utils.isCondition)(item)) {
                textParts.push(that.getConditionText(item, options))
            } else if ((0, _utils.isGroup)(item)) {
                textParts.push(that.getGroupText(item, options, true))
            }
        }));
        _deferred.when.apply(this, textParts).done((function() {
            var text;
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key]
            }
            if (groupValue.startsWith("!")) {
                var groupText = options.groupOperationDescriptions["not".concat(groupValue.substring(1, 2).toUpperCase()).concat(groupValue.substring(2))].split(" ");
                text = "".concat(groupText[0], " ").concat(args[0])
            } else {
                text = args.join(" ".concat(options.groupOperationDescriptions[groupValue], " "))
            }
            if (isInnerGroup) {
                text = "(".concat(text, ")")
            }
            result.resolve(text)
        }));
        return result
    },
    getFilterText: function(filterValue, customOperations) {
        var options = {
            customOperations: customOperations,
            columns: this.getController("columns").getFilteringColumns(),
            filterOperationDescriptions: this.option("filterBuilder.filterOperationDescriptions"),
            groupOperationDescriptions: this.option("filterBuilder.groupOperationDescriptions")
        };
        return (0, _utils.isCondition)(filterValue) ? this.getConditionText(filterValue, options) : this.getGroupText(filterValue, options)
    }
});
var filterPanelModule = {
    defaultOptions: function() {
        return {
            filterPanel: {
                visible: false,
                filterEnabled: true,
                texts: {
                    createFilter: _message.default.format("dxDataGrid-filterPanelCreateFilter"),
                    clearFilter: _message.default.format("dxDataGrid-filterPanelClearFilter"),
                    filterEnabledHint: _message.default.format("dxDataGrid-filterPanelFilterEnabledHint")
                }
            }
        }
    },
    views: {
        filterPanelView: FilterPanelView
    },
    extenders: {
        controllers: {
            data: {
                optionChanged: function(args) {
                    switch (args.name) {
                        case "filterPanel":
                            this._applyFilter();
                            args.handled = true;
                            break;
                        default:
                            this.callBase(args)
                    }
                }
            }
        }
    }
};
exports.filterPanelModule = filterPanelModule;
