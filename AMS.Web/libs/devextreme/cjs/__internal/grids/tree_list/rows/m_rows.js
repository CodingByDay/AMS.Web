/**
 * DevExtreme (cjs/__internal/grids/tree_list/rows/m_rows.js)
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
exports.RowsView = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _m_rows_view = require("../../../grids/grid_core/views/m_rows_view");
var _m_core = _interopRequireDefault(require("../m_core"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var TREELIST_TEXT_CONTENT = "dx-treelist-text-content";
var TREELIST_EXPAND_ICON_CONTAINER_CLASS = "dx-treelist-icon-container";
var TREELIST_CELL_EXPANDABLE_CLASS = "dx-treelist-cell-expandable";
var TREELIST_EMPTY_SPACE = "dx-treelist-empty-space";
var TREELIST_EXPANDED_CLASS = "dx-treelist-expanded";
var TREELIST_COLLAPSED_CLASS = "dx-treelist-collapsed";
var RowsView = _m_rows_view.rowsModule.views.rowsView.inherit(function() {
    var createIcon = function(hasIcon, isExpanded) {
        var $iconElement = (0, _renderer.default)("<div>").addClass(TREELIST_EMPTY_SPACE);
        if (hasIcon) {
            $iconElement.toggleClass(TREELIST_EXPANDED_CLASS, isExpanded).toggleClass(TREELIST_COLLAPSED_CLASS, !isExpanded).append((0, _renderer.default)("<span>"))
        }
        return $iconElement
    };
    return {
        _renderIconContainer: function($container, options) {
            var _this = this;
            var $iconContainer = (0, _renderer.default)("<div>").addClass(TREELIST_EXPAND_ICON_CONTAINER_CLASS).appendTo($container);
            options.watch && options.watch((function() {
                return [options.row.level, options.row.isExpanded, options.row.node.hasChildren]
            }), (function() {
                $iconContainer.empty();
                _this._renderIcons($iconContainer, options)
            }));
            $container.addClass(TREELIST_CELL_EXPANDABLE_CLASS);
            return this._renderIcons($iconContainer, options)
        },
        _renderIcons: function($iconContainer, options) {
            var row = options.row;
            var level = row.level;
            for (var i = 0; i <= level; i++) {
                $iconContainer.append(createIcon(i === level && row.node.hasChildren, row.isExpanded))
            }
            return $iconContainer
        },
        _renderCellCommandContent: function(container, model) {
            this._renderIconContainer(container, model);
            return true
        },
        _processTemplate: function(template, options) {
            var _a;
            var that = this;
            var resultTemplate;
            var renderingTemplate = this.callBase(template);
            var firstDataColumnIndex = that._columnsController.getFirstDataColumnIndex();
            if (renderingTemplate && (null === (_a = options.column) || void 0 === _a ? void 0 : _a.index) === firstDataColumnIndex) {
                resultTemplate = {
                    render: function(options) {
                        var $container = options.container;
                        if (that._renderCellCommandContent($container, options.model)) {
                            options.container = function($container) {
                                return (0, _renderer.default)("<div>").addClass(TREELIST_TEXT_CONTENT).appendTo($container)
                            }($container)
                        }
                        renderingTemplate.render(options)
                    }
                }
            } else {
                resultTemplate = renderingTemplate
            }
            return resultTemplate
        },
        _updateCell: function($cell, options) {
            $cell = $cell.hasClass(TREELIST_TEXT_CONTENT) ? $cell.parent() : $cell;
            this.callBase($cell, options)
        },
        _rowClick: function(e) {
            var dataController = this._dataController;
            var $targetElement = (0, _renderer.default)(e.event.target);
            var isExpandIcon = this.isExpandIcon($targetElement);
            var item = dataController && dataController.items()[e.rowIndex];
            if (isExpandIcon && item) {
                dataController.changeRowExpand(item.key)
            }
            this.callBase(e)
        },
        _createRow: function(row) {
            var node = row && row.node;
            var $rowElement = this.callBase.apply(this, arguments);
            if (node) {
                this.setAria("level", row.level + 1, $rowElement);
                if (node.hasChildren) {
                    this.setAria("expanded", row.isExpanded, $rowElement)
                }
            }
            return $rowElement
        },
        isExpandIcon: function($targetElement) {
            return !!$targetElement.closest(".".concat(TREELIST_EXPANDED_CLASS, ", .").concat(TREELIST_COLLAPSED_CLASS)).length
        }
    }
}());
exports.RowsView = RowsView;
_m_core.default.registerModule("rows", {
    defaultOptions: _m_rows_view.rowsModule.defaultOptions,
    views: {
        rowsView: RowsView
    }
});
