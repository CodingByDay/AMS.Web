/**
 * DevExtreme (cjs/__internal/grids/grid_core/views/m_columns_view.js)
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
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColumnsView = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _element = require("../../../../core/element");
var _element_data = require("../../../../core/element_data");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _extend = require("../../../../core/utils/extend");
var iteratorUtils = _interopRequireWildcard(require("../../../../core/utils/iterator"));
var _position = require("../../../../core/utils/position");
var _size = require("../../../../core/utils/size");
var _style = require("../../../../core/utils/style");
var _support = require("../../../../core/utils/support");
var _type = require("../../../../core/utils/type");
var _window = require("../../../../core/utils/window");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _double_click = require("../../../../events/double_click");
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _remove = require("../../../../events/remove");
var _m_column_state_mixin = _interopRequireDefault(require("../../../grids/grid_core/column_state_mixin/m_column_state_mixin"));
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));

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
var SCROLL_CONTAINER_CLASS = "scroll-container";
var SCROLLABLE_SIMULATED_CLASS = "scrollable-simulated";
var GROUP_SPACE_CLASS = "group-space";
var CONTENT_CLASS = "content";
var TABLE_CLASS = "table";
var TABLE_FIXED_CLASS = "table-fixed";
var CONTENT_FIXED_CLASS = "content-fixed";
var ROW_CLASS = "dx-row";
var GROUP_ROW_CLASS = "dx-group-row";
var GROUP_CELL_CLASS = "dx-group-cell";
var DETAIL_ROW_CLASS = "dx-master-detail-row";
var FILTER_ROW_CLASS = "filter-row";
var ERROR_ROW_CLASS = "dx-error-row";
var CELL_UPDATED_ANIMATION_CLASS = "cell-updated-animation";
var HIDDEN_COLUMNS_WIDTH = "0.0001px";
var CELL_HINT_VISIBLE = "dxCellHintVisible";
var FORM_FIELD_ITEM_CONTENT_CLASS = "dx-field-item-content";
var appendElementTemplate = {
    render: function(options) {
        options.container.append(options.content)
    }
};
var subscribeToRowEvents = function(that, $table) {
    var touchTarget;
    var touchCurrentTarget;
    var timeoutId;

    function clearTouchTargets(timeout) {
        return setTimeout((function() {
            touchTarget = touchCurrentTarget = null
        }), timeout)
    }
    _events_engine.default.on($table, "touchstart touchend", ".dx-row", (function(e) {
        clearTimeout(timeoutId);
        if ("touchstart" === e.type) {
            touchTarget = e.target;
            touchCurrentTarget = e.currentTarget;
            timeoutId = clearTouchTargets(1e3)
        } else {
            timeoutId = clearTouchTargets()
        }
    }));
    _events_engine.default.on($table, [_click.name, _double_click.name, _pointer.default.down].join(" "), ".dx-row", that.createAction((function(e) {
        var event = e.event;
        if (touchTarget) {
            event.target = touchTarget;
            event.currentTarget = touchCurrentTarget
        }
        if (!(0, _renderer.default)(event.target).closest("a").length) {
            e.rowIndex = that.getRowIndex(event.currentTarget);
            if (e.rowIndex >= 0) {
                e.rowElement = (0, _element.getPublicElement)((0, _renderer.default)(event.currentTarget));
                e.columns = that.getColumns();
                if (event.type === _pointer.default.down) {
                    that._rowPointerDown(e)
                } else if (event.type === _click.name) {
                    that._rowClick(e)
                } else {
                    that._rowDblClick(e)
                }
            }
        }
    })))
};
var getWidthStyle = function(width) {
    if ("auto" === width) {
        return ""
    }
    return (0, _type.isNumeric)(width) ? "".concat(width, "px") : width
};
var setCellWidth = function(cell, column, width) {
    cell.style.width = cell.style.maxWidth = "auto" === column.width ? "" : width
};
var copyAttributes = function(element, newElement) {
    if (!element || !newElement) {
        return
    }
    var oldAttributes = element.attributes;
    var newAttributes = newElement.attributes;
    var i;
    for (i = 0; i < oldAttributes.length; i++) {
        var name = oldAttributes[i].nodeName;
        if (!newElement.hasAttribute(name)) {
            element.removeAttribute(name)
        }
    }
    for (i = 0; i < newAttributes.length; i++) {
        element.setAttribute(newAttributes[i].nodeName, newAttributes[i].nodeValue)
    }
};
var removeHandler = function(templateDeferred) {
    templateDeferred.resolve()
};
var viewWithColumnStateMixin = _m_modules.default.View.inherit(_m_column_state_mixin.default);
var ColumnsView = function(_viewWithColumnStateM) {
    _inheritsLoose(ColumnsView, _viewWithColumnStateM);

    function ColumnsView() {
        return _viewWithColumnStateM.apply(this, arguments) || this
    }
    var _proto = ColumnsView.prototype;
    _proto._createScrollableOptions = function() {
        var scrollingOptions = this.option("scrolling");
        var useNativeScrolling = this.option("scrolling.useNative");
        var options = (0, _extend.extend)({}, scrollingOptions, {
            direction: "both",
            bounceEnabled: false,
            useKeyboard: false
        });
        if (void 0 === useNativeScrolling) {
            useNativeScrolling = true
        }
        if ("auto" === useNativeScrolling) {
            delete options.useNative;
            delete options.useSimulatedScrollbar
        } else {
            options.useNative = !!useNativeScrolling;
            options.useSimulatedScrollbar = !useNativeScrolling
        }
        return options
    };
    _proto._updateCell = function($cell, parameters) {
        if (parameters.rowType) {
            this._cellPrepared($cell, parameters)
        }
    };
    _proto._createCell = function(options) {
        var column = options.column;
        var alignment = column.alignment || (0, _position.getDefaultAlignment)(this.option("rtlEnabled"));
        var cell = _dom_adapter.default.createElement("td");
        cell.style.textAlign = alignment;
        var $cell = (0, _renderer.default)(cell);
        if ("data" === options.rowType && column.headerId && !column.type) {
            if (this.component.option("showColumnHeaders")) {
                this.setAria("describedby", column.headerId, $cell)
            }
        }
        if (column.cssClass) {
            $cell.addClass(column.cssClass)
        }
        if ("expand" === column.command) {
            $cell.addClass(column.cssClass);
            $cell.addClass(this.addWidgetPrefix(GROUP_SPACE_CLASS))
        }
        if (column.colspan > 1) {
            $cell.attr("colSpan", column.colspan)
        } else if (!column.isBand && "auto" !== column.visibleWidth && this.option("columnAutoWidth")) {
            if (column.width || column.minWidth) {
                cell.style.minWidth = getWidthStyle(column.minWidth || column.width)
            }
            if (column.width) {
                setCellWidth(cell, column, getWidthStyle(column.width))
            }
        }
        return $cell
    };
    _proto._createRow = function(rowObject, tagName) {
        tagName = tagName || "tr";
        var $element = (0, _renderer.default)("<".concat(tagName, ">")).addClass(ROW_CLASS);
        this.setAria("role", "row", $element);
        return $element
    };
    _proto._isAltRow = function(row) {
        return row && row.dataIndex % 2 === 1
    };
    _proto._createTable = function(columns, isAppend) {
        var that = this;
        var $table = (0, _renderer.default)("<table>").addClass(that.addWidgetPrefix(TABLE_CLASS)).addClass(that.addWidgetPrefix(TABLE_FIXED_CLASS));
        if (columns && !isAppend) {
            $table.append(that._createColGroup(columns));
            if (_browser.default.safari) {
                $table.append((0, _renderer.default)("<thead>").append("<tr>"))
            }
        } else {
            that.setAria("hidden", true, $table)
        }
        this.setAria("role", "presentation", (0, _renderer.default)("<tbody>").appendTo($table));
        if (isAppend) {
            return $table
        }
        if (_browser.default.mozilla) {
            _events_engine.default.on($table, "mousedown", "td", (function(e) {
                if (e.ctrlKey) {
                    e.preventDefault()
                }
            }))
        }
        if (that.option("cellHintEnabled")) {
            _events_engine.default.on($table, "mousemove", ".dx-row > td", this.createAction((function(args) {
                var e = args.event;
                var $element = (0, _renderer.default)(e.target);
                var $cell = (0, _renderer.default)(e.currentTarget);
                var $row = $cell.parent();
                var visibleColumns = that._columnsController.getVisibleColumns();
                var rowOptions = $row.data("options");
                var columnIndex = $cell.index();
                var cellOptions = rowOptions && rowOptions.cells && rowOptions.cells[columnIndex];
                var column = cellOptions ? cellOptions.column : visibleColumns[columnIndex];
                var isHeaderRow = $row.hasClass("dx-header-row");
                var isDataRow = $row.hasClass("dx-data-row");
                var isMasterDetailRow = $row.hasClass(DETAIL_ROW_CLASS);
                var isGroupRow = $row.hasClass(GROUP_ROW_CLASS);
                var isFilterRow = $row.hasClass(that.addWidgetPrefix(FILTER_ROW_CLASS));
                var isDataRowWithTemplate = isDataRow && (!column || column.cellTemplate);
                var isEditorShown = isDataRow && cellOptions && (rowOptions.isEditing || cellOptions.isEditing || (null === column || void 0 === column ? void 0 : column.showEditorAlways));
                var isHeaderRowWithTemplate = isHeaderRow && (!column || column.headerCellTemplate);
                var isGroupCellWithTemplate = isGroupRow && (!column || column.groupIndex && column.groupCellTemplate);
                var shouldShowHint = !isMasterDetailRow && !isFilterRow && !isEditorShown && !isDataRowWithTemplate && !isHeaderRowWithTemplate && !isGroupCellWithTemplate;
                if (shouldShowHint) {
                    if ($element.data(CELL_HINT_VISIBLE)) {
                        $element.removeAttr("title");
                        $element.data(CELL_HINT_VISIBLE, false)
                    }
                    var difference = $element[0].scrollWidth - $element[0].clientWidth;
                    if (difference > 0 && !(0, _type.isDefined)($element.attr("title"))) {
                        $element.attr("title", $element.text());
                        $element.data(CELL_HINT_VISIBLE, true)
                    }
                }
            })))
        }
        var getOptions = function(event) {
            var $cell = (0, _renderer.default)(event.currentTarget);
            var $fieldItemContent = (0, _renderer.default)(event.target).closest(".".concat(FORM_FIELD_ITEM_CONTENT_CLASS));
            var $row = $cell.parent();
            var rowOptions = $row.data("options");
            var options = rowOptions && rowOptions.cells && rowOptions.cells[$cell.index()];
            if (!$cell.closest("table").is(event.delegateTarget)) {
                return
            }
            var resultOptions = (0, _extend.extend)({}, options, {
                cellElement: (0, _element.getPublicElement)($cell),
                event: event,
                eventType: event.type
            });
            resultOptions.rowIndex = that.getRowIndex($row);
            if ($fieldItemContent.length) {
                var formItemOptions = $fieldItemContent.data("dx-form-item");
                if (formItemOptions.column) {
                    resultOptions.column = formItemOptions.column;
                    resultOptions.columnIndex = that._columnsController.getVisibleIndex(resultOptions.column.index)
                }
            }
            return resultOptions
        };
        _events_engine.default.on($table, "mouseover", ".dx-row > td", (function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellHoverChanged", options)
        }));
        _events_engine.default.on($table, "mouseout", ".dx-row > td", (function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellHoverChanged", options)
        }));
        _events_engine.default.on($table, _click.name, ".dx-row > td", (function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellClick", options)
        }));
        _events_engine.default.on($table, _double_click.name, ".dx-row > td", (function(e) {
            var options = getOptions(e);
            options && that.executeAction("onCellDblClick", options)
        }));
        subscribeToRowEvents(that, $table);
        return $table
    };
    _proto._rowPointerDown = function() {};
    _proto._rowClick = function() {};
    _proto._rowDblClick = function() {};
    _proto._createColGroup = function(columns) {
        var colgroupElement = (0, _renderer.default)("<colgroup>");
        for (var i = 0; i < columns.length; i++) {
            var colspan = columns[i].colspan || 1;
            for (var j = 0; j < colspan; j++) {
                colgroupElement.append(this._createCol(columns[i]))
            }
        }
        return colgroupElement
    };
    _proto._createCol = function(column) {
        var width = column.visibleWidth || column.width;
        if ("adaptiveHidden" === width) {
            width = HIDDEN_COLUMNS_WIDTH
        }
        var col = (0, _renderer.default)("<col>");
        (0, _style.setWidth)(col, width);
        return col
    };
    _proto.renderDelayedTemplates = function(change) {
        var delayedTemplates = this._delayedTemplates;
        var syncTemplates = delayedTemplates.filter((function(template) {
            return !template.async
        }));
        var asyncTemplates = delayedTemplates.filter((function(template) {
            return template.async
        }));
        this._delayedTemplates = [];
        this._renderDelayedTemplatesCore(syncTemplates, false, change);
        this._renderDelayedTemplatesCoreAsync(asyncTemplates)
    };
    _proto._renderDelayedTemplatesCoreAsync = function(templates) {
        var _this = this;
        if (templates.length) {
            var templateTimeout = (0, _window.getWindow)().setTimeout((function() {
                _this._templateTimeouts.delete(templateTimeout);
                _this._renderDelayedTemplatesCore(templates, true)
            }));
            this._templateTimeouts.add(templateTimeout)
        }
    };
    _proto._renderDelayedTemplatesCore = function(templates, isAsync, change) {
        var date = new Date;
        while (templates.length) {
            var templateParameters = templates.shift();
            var options = templateParameters.options;
            var doc = _dom_adapter.default.getRootNode((0, _renderer.default)(options.container).get(0));
            var needWaitAsyncTemplates = this.needWaitAsyncTemplates();
            if (!isAsync || (0, _renderer.default)(options.container).closest(doc).length || needWaitAsyncTemplates) {
                if (change) {
                    options.change = change
                }
                templateParameters.template.render(options)
            }
            if (isAsync && new Date - date > 30) {
                this._renderDelayedTemplatesCoreAsync(templates);
                break
            }
        }
        if (!templates.length && this._delayedTemplates.length) {
            this.renderDelayedTemplates()
        }
    };
    _proto._processTemplate = function(template, options) {
        var renderingTemplate;
        if (template && template.render && !(0, _type.isRenderer)(template)) {
            renderingTemplate = {
                allowRenderToDetachedContainer: template.allowRenderToDetachedContainer,
                render: function(options) {
                    template.render(options.container, options.model, options.change);
                    options.deferred && options.deferred.resolve()
                }
            }
        } else if ((0, _type.isFunction)(template)) {
            renderingTemplate = {
                render: function(options) {
                    var renderedTemplate = template((0, _element.getPublicElement)(options.container), options.model, options.change);
                    if (renderedTemplate && (renderedTemplate.nodeType || (0, _type.isRenderer)(renderedTemplate))) {
                        options.container.append(renderedTemplate)
                    }
                    options.deferred && options.deferred.resolve()
                }
            }
        } else {
            var templateID = (0, _type.isString)(template) ? template : (0, _renderer.default)(template).attr("id");
            if (!templateID) {
                renderingTemplate = this.getTemplate(template)
            } else {
                if (!this._templatesCache[templateID]) {
                    this._templatesCache[templateID] = this.getTemplate(template)
                }
                renderingTemplate = this._templatesCache[templateID]
            }
        }
        return renderingTemplate
    };
    _proto.renderTemplate = function(container, template, options, allowRenderToDetachedContainer, change) {
        var _this2 = this;
        var _a;
        var renderingTemplate = this._processTemplate(template, options);
        var column = options.column;
        var isDataRow = "data" === options.rowType;
        var templateDeferred = new _deferred.Deferred;
        var templateOptions = {
            container: container,
            model: options,
            deferred: templateDeferred,
            onRendered: function() {
                if (_this2.isDisposed()) {
                    templateDeferred.reject()
                } else {
                    templateDeferred.resolve()
                }
            }
        };
        if (renderingTemplate) {
            options.component = this.component;
            var columnAsync = column && (column.renderAsync && isDataRow || this.option("renderAsync") && (false !== column.renderAsync && (column.command || column.showEditorAlways) && isDataRow || "filter" === options.rowType));
            var async = null !== (_a = options.renderAsync) && void 0 !== _a ? _a : columnAsync;
            if ((renderingTemplate.allowRenderToDetachedContainer || allowRenderToDetachedContainer) && !async) {
                renderingTemplate.render(templateOptions)
            } else {
                this._delayedTemplates.push({
                    template: renderingTemplate,
                    options: templateOptions,
                    async: async
                })
            }
            this._templateDeferreds.add(templateDeferred);
            _events_engine.default.on(container, _remove.removeEvent, removeHandler.bind(null, templateDeferred))
        } else {
            templateDeferred.reject()
        }
        return templateDeferred.promise().always((function() {
            _this2._templateDeferreds.delete(templateDeferred)
        }))
    };
    _proto._getBodies = function(tableElement) {
        return (0, _renderer.default)(tableElement).children("tbody").not(".dx-header").not(".dx-footer")
    };
    _proto._needWrapRow = function($tableElement) {
        var _a;
        var hasRowTemplate = !!this.option().rowTemplate;
        return hasRowTemplate && !!(null === (_a = this._getBodies($tableElement)) || void 0 === _a ? void 0 : _a.filter(".".concat(ROW_CLASS)).length)
    };
    _proto._wrapRowIfNeed = function($table, $row, isRefreshing) {
        var $tableElement = isRefreshing ? $table || this._tableElement : this._tableElement || $table;
        var needWrapRow = this._needWrapRow($tableElement);
        if (needWrapRow) {
            var $tbody = (0, _renderer.default)("<tbody>").addClass($row.attr("class"));
            this.setAria("role", "presentation", $tbody);
            return $tbody.append($row)
        }
        return $row
    };
    _proto._appendRow = function($table, $row, appendTemplate) {
        appendTemplate = appendTemplate || appendElementTemplate;
        appendTemplate.render({
            content: $row,
            container: $table
        })
    };
    _proto._resizeCore = function() {
        var scrollLeft = this._scrollLeft;
        if (scrollLeft >= 0) {
            this._scrollLeft = 0;
            this.scrollTo({
                left: scrollLeft
            })
        }
    };
    _proto._renderCore = function(e) {
        var $root = this.element().parent();
        if (!$root || $root.parent().length) {
            this.renderDelayedTemplates(e)
        }
    };
    _proto._renderTable = function(options) {
        options = options || {};
        options.columns = this._columnsController.getVisibleColumns();
        var changeType = options.change && options.change.changeType;
        var $table = this._createTable(options.columns, "append" === changeType || "prepend" === changeType || "update" === changeType);
        this._renderRows($table, options);
        return $table
    };
    _proto._renderRows = function($table, options) {
        var rows = this._getRows(options.change);
        var columnIndices = options.change && options.change.columnIndices || [];
        var changeTypes = options.change && options.change.changeTypes || [];
        for (var i = 0; i < rows.length; i++) {
            this._renderRow($table, (0, _extend.extend)({
                row: rows[i],
                columnIndices: columnIndices[i],
                changeType: changeTypes[i]
            }, options))
        }
    };
    _proto._renderRow = function($table, options) {
        if (!options.columnIndices) {
            options.row.cells = []
        }
        var $row = this._createRow(options.row);
        var $wrappedRow = this._wrapRowIfNeed($table, $row);
        if ("remove" !== options.changeType) {
            this._renderCells($row, options)
        }
        this._appendRow($table, $wrappedRow);
        var rowOptions = (0, _extend.extend)({
            columns: options.columns
        }, options.row);
        this._addWatchMethod(rowOptions, options.row);
        this._rowPrepared($wrappedRow, rowOptions, options.row)
    };
    _proto._needRenderCell = function(columnIndex, columnIndices) {
        return !columnIndices || columnIndices.indexOf(columnIndex) >= 0
    };
    _proto._renderCells = function($row, options) {
        var columnIndex = 0;
        var row = options.row;
        var columns = options.columns;
        for (var i = 0; i < columns.length; i++) {
            if (this._needRenderCell(i, options.columnIndices)) {
                this._renderCell($row, (0, _extend.extend)({
                    column: columns[i],
                    columnIndex: columnIndex,
                    value: row.values && row.values[columnIndex],
                    oldValue: row.oldValues && row.oldValues[columnIndex]
                }, options))
            }
            if (columns[i].colspan > 1) {
                columnIndex += columns[i].colspan
            } else {
                columnIndex++
            }
        }
    };
    _proto._updateCells = function($rowElement, $newRowElement, columnIndices) {
        var $cells = $rowElement.children();
        var $newCells = $newRowElement.children();
        var highlightChanges = this.option("highlightChanges");
        var cellUpdatedClass = this.addWidgetPrefix(CELL_UPDATED_ANIMATION_CLASS);
        columnIndices.forEach((function(columnIndex, index) {
            var $cell = $cells.eq(columnIndex);
            var $newCell = $newCells.eq(index);
            $cell.replaceWith($newCell);
            if (highlightChanges && !$newCell.hasClass("dx-command-expand")) {
                $newCell.addClass(cellUpdatedClass)
            }
        }));
        copyAttributes($rowElement.get(0), $newRowElement.get(0))
    };
    _proto._setCellAriaAttributes = function($cell, cellOptions) {
        if ("freeSpace" !== cellOptions.rowType) {
            this.setAria("role", "gridcell", $cell);
            var columnIndexOffset = this._columnsController.getColumnIndexOffset();
            var ariaColIndex = cellOptions.columnIndex + columnIndexOffset + 1;
            this.setAria("colindex", ariaColIndex, $cell)
        }
    };
    _proto._renderCell = function($row, options) {
        var cellOptions = this._getCellOptions(options);
        if (options.columnIndices) {
            if (options.row.cells) {
                var cellIndex = options.row.cells.findIndex((function(cell) {
                    return cell.columnIndex === cellOptions.columnIndex
                }));
                options.row.cells[cellIndex] = cellOptions
            }
        } else {
            options.row.cells.push(cellOptions)
        }
        var $cell = this._createCell(cellOptions);
        this._setCellAriaAttributes($cell, cellOptions);
        this._renderCellContent($cell, cellOptions, options);
        $row.get(0).appendChild($cell.get(0));
        return $cell
    };
    _proto._renderCellContent = function($cell, options, renderOptions) {
        var _this3 = this;
        var template = this._getCellTemplate(options);
        (0, _deferred.when)(!template || this.renderTemplate($cell, template, options, void 0, renderOptions.change)).done((function() {
            _this3._updateCell($cell, options)
        }))
    };
    _proto._getCellTemplate = function(options) {};
    _proto._getRows = function(change) {
        return []
    };
    _proto._getCellOptions = function(options) {
        var cellOptions = {
            column: options.column,
            columnIndex: options.columnIndex,
            rowType: options.row.rowType,
            isAltRow: this._isAltRow(options.row)
        };
        this._addWatchMethod(cellOptions);
        return cellOptions
    };
    _proto._addWatchMethod = function(options, source) {
        if (!this.option("repaintChangesOnly")) {
            return
        }
        var watchers = [];
        source = source || options;
        source.watch = source.watch || function(getter, updateValueFunc, updateRowFunc) {
            var oldValue = getter(source.data);
            var watcher = function(row) {
                if (row && updateRowFunc) {
                    updateRowFunc(row)
                }
                var newValue = getter(source.data);
                if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
                    if (row) {
                        updateValueFunc(newValue)
                    }
                    oldValue = newValue
                }
            };
            watchers.push(watcher);
            return function() {
                var index = watchers.indexOf(watcher);
                if (index >= 0) {
                    watchers.splice(index, 1)
                }
            }
        };
        source.update = source.update || function(row, keepRow) {
            if (row) {
                this.data = options.data = row.data;
                this.rowIndex = options.rowIndex = row.rowIndex;
                this.dataIndex = options.dataIndex = row.dataIndex;
                this.isExpanded = options.isExpanded = row.isExpanded;
                if (options.row && !keepRow) {
                    options.row = row
                }
            }
            watchers.forEach((function(watcher) {
                watcher(row)
            }))
        };
        if (source !== options) {
            options.watch = source.watch.bind(source)
        }
        return options
    };
    _proto._cellPrepared = function(cell, options) {
        options.cellElement = (0, _element.getPublicElement)((0, _renderer.default)(cell));
        this.executeAction("onCellPrepared", options)
    };
    _proto._rowPrepared = function($row, options, row) {
        (0, _element_data.data)($row.get(0), "options", options);
        options.rowElement = (0, _element.getPublicElement)($row);
        this.executeAction("onRowPrepared", options)
    };
    _proto._columnOptionChanged = function(e) {
        var optionNames = e.optionNames;
        if (_m_utils.default.checkChanges(optionNames, ["width", "visibleWidth"])) {
            var visibleColumns = this._columnsController.getVisibleColumns();
            var widths = iteratorUtils.map(visibleColumns, (function(column) {
                var width = column.visibleWidth || column.width;
                return (0, _type.isDefined)(width) ? width : "auto"
            }));
            this.setColumnWidths({
                widths: widths,
                optionNames: optionNames
            });
            return
        }
        if (!this._requireReady) {
            this.render()
        }
    };
    _proto.getCellIndex = function($cell) {
        var cellIndex = $cell.length ? $cell[0].cellIndex : -1;
        return cellIndex
    };
    _proto.getTableElements = function() {
        return this._tableElement || (0, _renderer.default)()
    };
    _proto.getTableElement = function(isFixedTableRendering) {
        return this._tableElement
    };
    _proto.setTableElement = function(tableElement, isFixedTableRendering) {
        this._tableElement = tableElement
    };
    _proto.optionChanged = function(args) {
        _viewWithColumnStateM.prototype.optionChanged.call(this, args);
        switch (args.name) {
            case "cellHintEnabled":
            case "onCellPrepared":
            case "onRowPrepared":
            case "onCellHoverChanged":
                this._invalidate(true, true);
                args.handled = true
        }
    };
    _proto.init = function() {
        var _this4 = this;
        this._scrollLeft = -1;
        this._columnsController = this.getController("columns");
        this._dataController = this.getController("data");
        this._delayedTemplates = [];
        this._templateDeferreds = new Set;
        this._templatesCache = {};
        this._templateTimeouts = new Set;
        this.createAction("onCellClick");
        this.createAction("onRowClick");
        this.createAction("onCellDblClick");
        this.createAction("onRowDblClick");
        this.createAction("onCellHoverChanged", {
            excludeValidators: ["disabled", "readOnly"]
        });
        this.createAction("onCellPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering"
        });
        this.createAction("onRowPrepared", {
            excludeValidators: ["disabled", "readOnly"],
            category: "rendering",
            afterExecute: function(e) {
                _this4._afterRowPrepared(e)
            }
        });
        this._columnsController.columnsChanged.add(this._columnOptionChanged.bind(this));
        this._dataController && this._dataController.changed.add(this._handleDataChanged.bind(this))
    };
    _proto._afterRowPrepared = function(e) {};
    _proto._handleDataChanged = function() {};
    _proto.callbackNames = function() {
        return ["scrollChanged"]
    };
    _proto._updateScrollLeftPosition = function() {
        var scrollLeft = this._scrollLeft;
        if (scrollLeft >= 0) {
            this._scrollLeft = 0;
            this.scrollTo({
                left: scrollLeft
            })
        }
    };
    _proto.scrollTo = function(pos) {
        var $element = this.element();
        var $scrollContainer = $element && $element.children(".".concat(this.addWidgetPrefix(SCROLL_CONTAINER_CLASS))).not(".".concat(this.addWidgetPrefix(CONTENT_FIXED_CLASS)));
        if ((0, _type.isDefined)(pos) && (0, _type.isDefined)(pos.left) && this._scrollLeft !== pos.left) {
            this._scrollLeft = pos.left;
            $scrollContainer && $scrollContainer.scrollLeft(pos.left)
        }
    };
    _proto._getContent = function(isFixedTableRendering) {
        var _a;
        return null === (_a = this._tableElement) || void 0 === _a ? void 0 : _a.parent()
    };
    _proto._removeContent = function(isFixedTableRendering) {
        var $scrollContainer = this._getContent(isFixedTableRendering);
        if (null === $scrollContainer || void 0 === $scrollContainer ? void 0 : $scrollContainer.length) {
            $scrollContainer.remove()
        }
    };
    _proto._wrapTableInScrollContainer = function($table, isFixedTableRendering) {
        var _this5 = this;
        var $scrollContainer = (0, _renderer.default)("<div>");
        var useNative = this.option("scrolling.useNative");
        if (false === useNative || "auto" === useNative && !_support.nativeScrolling) {
            $scrollContainer.addClass(this.addWidgetPrefix(SCROLLABLE_SIMULATED_CLASS))
        }
        _events_engine.default.on($scrollContainer, "scroll", (function() {
            var scrollLeft = $scrollContainer.scrollLeft();
            if (scrollLeft !== _this5._scrollLeft) {
                _this5.scrollChanged.fire({
                    left: scrollLeft
                }, _this5.name)
            }
        }));
        $scrollContainer.addClass(this.addWidgetPrefix(CONTENT_CLASS)).addClass(this.addWidgetPrefix(SCROLL_CONTAINER_CLASS)).append($table).appendTo(this.element());
        this.setAria("role", "presentation", $scrollContainer);
        return $scrollContainer
    };
    _proto.needWaitAsyncTemplates = function() {
        return this.option("templatesRenderAsynchronously") && false === this.option("renderAsync")
    };
    _proto.waitAsyncTemplates = function() {
        var _this6 = this;
        var forceWaiting = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
        var result = new _deferred.Deferred;
        var needWaitAsyncTemplates = forceWaiting || this.needWaitAsyncTemplates();
        if (!needWaitAsyncTemplates) {
            return result.resolve()
        }
        var waitTemplatesRecursion = function waitTemplatesRecursion() {
            return _deferred.when.apply(_this6, Array.from(_this6._templateDeferreds)).done((function() {
                if (_this6.isDisposed()) {
                    result.reject()
                } else if (_this6._templateDeferreds.size > 0) {
                    waitTemplatesRecursion()
                } else {
                    result.resolve()
                }
            })).fail(result.reject)
        };
        waitTemplatesRecursion();
        return result.promise()
    };
    _proto._updateContent = function($newTableElement, change, isFixedTableRendering) {
        var _this7 = this;
        return this.waitAsyncTemplates().done((function() {
            _this7._removeContent(isFixedTableRendering);
            _this7.setTableElement($newTableElement, isFixedTableRendering);
            _this7._wrapTableInScrollContainer($newTableElement, isFixedTableRendering)
        }))
    };
    _proto._findContentElement = function() {};
    _proto._getWidths = function($cellElements) {
        var result = [];
        var width;
        if ($cellElements) {
            iteratorUtils.each($cellElements, (function(index, item) {
                width = item.offsetWidth;
                if (item.getBoundingClientRect) {
                    var clientRect = (0, _position.getBoundingRect)(item);
                    if (clientRect.width > width - 1) {
                        width = clientRect.width
                    }
                }
                result.push(width)
            }))
        }
        return result
    };
    _proto.getColumnWidths = function($tableElement) {
        var result = [];
        var $rows;
        var $cells;
        (this.option("forceApplyBindings") || _common.noop)();
        $tableElement = $tableElement || this.getTableElement();
        if ($tableElement) {
            $rows = $tableElement.children("tbody:not(.dx-header)").children();
            for (var i = 0; i < $rows.length; i++) {
                var $row = $rows.eq(i);
                var isRowVisible = "none" !== $row.get(0).style.display && !$row.hasClass("dx-state-invisible");
                if (!$row.is(".".concat(GROUP_ROW_CLASS)) && !$row.is(".".concat(DETAIL_ROW_CLASS)) && !$row.is(".".concat(ERROR_ROW_CLASS)) && isRowVisible) {
                    $cells = $row.children("td");
                    break
                }
            }
            result = this._getWidths($cells)
        }
        return result
    };
    _proto.getVisibleColumnIndex = function(columnIndex, rowIndex) {
        return columnIndex
    };
    _proto.setColumnWidths = function(_ref) {
        var widths = _ref.widths,
            $tableElement = _ref.$tableElement,
            columns = _ref.columns,
            fixed = _ref.fixed;
        var $cols;
        var width;
        var minWidth;
        var columnIndex;
        var columnAutoWidth = this.option("columnAutoWidth");
        $tableElement = $tableElement || this.getTableElement();
        if ($tableElement && $tableElement.length && widths) {
            columnIndex = 0;
            $cols = $tableElement.children("colgroup").children("col");
            (0, _style.setWidth)($cols, "auto");
            columns = columns || this.getColumns(null, $tableElement);
            for (var i = 0; i < columns.length; i++) {
                if (columnAutoWidth && !fixed) {
                    width = columns[i].width;
                    if (width && !columns[i].command) {
                        width = columns[i].visibleWidth || width;
                        width = getWidthStyle(width);
                        minWidth = getWidthStyle(columns[i].minWidth || width);
                        var $rows = $rows || $tableElement.children().children(".dx-row").not(".".concat(DETAIL_ROW_CLASS));
                        for (var rowIndex = 0; rowIndex < $rows.length; rowIndex++) {
                            var row = $rows[rowIndex];
                            var cell = void 0;
                            var visibleIndex = this.getVisibleColumnIndex(i, rowIndex);
                            if (row.classList.contains(GROUP_ROW_CLASS)) {
                                cell = row.querySelector("td[aria-colindex='".concat(visibleIndex + 1, "']:not(.").concat(GROUP_CELL_CLASS, ")"))
                            } else {
                                cell = row.cells[visibleIndex]
                            }
                            if (cell) {
                                setCellWidth(cell, columns[i], width);
                                cell.style.minWidth = minWidth
                            }
                        }
                    }
                }
                if (columns[i].colspan) {
                    columnIndex += columns[i].colspan;
                    continue
                }
                width = widths[columnIndex];
                if ("adaptiveHidden" === width) {
                    width = HIDDEN_COLUMNS_WIDTH
                }
                if ("number" === typeof width) {
                    width = "".concat(width.toFixed(3), "px")
                }(0, _style.setWidth)($cols.eq(columnIndex), (0, _type.isDefined)(width) ? width : "auto");
                columnIndex++
            }
        }
    };
    _proto.getCellElements = function(rowIndex) {
        return this._getCellElementsCore(rowIndex)
    };
    _proto._getCellElementsCore = function(rowIndex) {
        if (rowIndex < 0) {
            return
        }
        var $row = this._getRowElements().eq(rowIndex);
        return $row.children()
    };
    _proto._getCellElement = function(rowIndex, columnIdentifier) {
        var $cells = this.getCellElements(rowIndex);
        var columnVisibleIndex = this._getVisibleColumnIndex($cells, rowIndex, columnIdentifier);
        if (!(null === $cells || void 0 === $cells ? void 0 : $cells.length) || columnVisibleIndex < 0) {
            return
        }
        var $cell = $cells.eq(columnVisibleIndex);
        return $cell.length > 0 ? $cell : void 0
    };
    _proto._getRowElement = function(rowIndex) {
        var that = this;
        var $rowElement = (0, _renderer.default)();
        var $tableElements = that.getTableElements();
        iteratorUtils.each($tableElements, (function(_, tableElement) {
            $rowElement = $rowElement.add(that._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex))
        }));
        if ($rowElement.length) {
            return $rowElement
        }
        return
    };
    _proto.getCellElement = function(rowIndex, columnIdentifier) {
        var $cell = this._getCellElement(rowIndex, columnIdentifier);
        if ($cell) {
            return (0, _element.getPublicElement)($cell)
        }
        return
    };
    _proto.getRowElement = function(rowIndex) {
        var $rows = this._getRowElement(rowIndex);
        var elements = [];
        if ($rows && !(0, _element.getPublicElement)($rows).get) {
            for (var i = 0; i < $rows.length; i++) {
                elements.push($rows[i])
            }
        } else {
            elements = $rows
        }
        return elements
    };
    _proto._getVisibleColumnIndex = function($cells, rowIndex, columnIdentifier) {
        if ((0, _type.isString)(columnIdentifier)) {
            var columnIndex = this._columnsController.columnOption(columnIdentifier, "index");
            return this._columnsController.getVisibleIndex(columnIndex)
        }
        return columnIdentifier
    };
    _proto.getColumnElements = function() {};
    _proto.getColumns = function(rowIndex, $tableElement) {
        return this._columnsController.getVisibleColumns(rowIndex)
    };
    _proto.getCell = function(cellPosition, rows, cells) {
        var $rows = rows || this._getRowElements();
        var $cells;
        if ($rows.length > 0 && cellPosition.rowIndex >= 0) {
            if ("virtual" !== this.option("scrolling.mode") && "virtual" !== this.option("scrolling.rowRenderingMode")) {
                cellPosition.rowIndex = cellPosition.rowIndex < $rows.length ? cellPosition.rowIndex : $rows.length - 1
            }
            $cells = cells || this.getCellElements(cellPosition.rowIndex);
            if ((null === $cells || void 0 === $cells ? void 0 : $cells.length) > 0) {
                return $cells.eq($cells.length > cellPosition.columnIndex ? cellPosition.columnIndex : $cells.length - 1)
            }
        }
    };
    _proto.getRowsCount = function() {
        var tableElement = this.getTableElement();
        if (tableElement && 1 === tableElement.length) {
            return tableElement[0].rows.length
        }
        return 0
    };
    _proto._getRowElementsCore = function(tableElement) {
        tableElement = tableElement || this.getTableElement();
        if (tableElement) {
            var hasRowTemplate = this.option().rowTemplate || this.option("dataRowTemplate");
            var tBodies = hasRowTemplate && tableElement.find("> tbody.".concat(ROW_CLASS));
            return tBodies && tBodies.length ? tBodies : tableElement.find("> tbody > " + ".".concat(ROW_CLASS, ", > .").concat(ROW_CLASS))
        }
        return (0, _renderer.default)()
    };
    _proto._getRowElements = function(tableElement) {
        return this._getRowElementsCore(tableElement)
    };
    _proto.getRowIndex = function($row) {
        return this._getRowElements().index($row)
    };
    _proto.getBoundingRect = function() {};
    _proto.getName = function() {};
    _proto.setScrollerSpacing = function(width) {
        var $element = this.element();
        var rtlEnabled = this.option("rtlEnabled");
        $element && $element.css({
            paddingLeft: rtlEnabled ? width : "",
            paddingRight: !rtlEnabled ? width : ""
        })
    };
    _proto.isScrollbarVisible = function(isHorizontal) {
        var $element = this.element();
        var $tableElement = this._tableElement;
        if ($element && $tableElement) {
            return isHorizontal ? (0, _size.getOuterWidth)($tableElement) - (0, _size.getWidth)($element) > 0 : (0, _size.getOuterHeight)($tableElement) - (0, _size.getHeight)($element) > 0
        }
        return false
    };
    _proto.isDisposed = function() {
        var _a;
        return null === (_a = this.component) || void 0 === _a ? void 0 : _a._disposed
    };
    _proto.dispose = function() {
        var _a, _b;
        if ((0, _window.hasWindow)()) {
            var window = (0, _window.getWindow)();
            null === (_a = this._templateTimeouts) || void 0 === _a ? void 0 : _a.forEach((function(templateTimeout) {
                return window.clearTimeout(templateTimeout)
            }));
            null === (_b = this._templateTimeouts) || void 0 === _b ? void 0 : _b.clear()
        }
    };
    return ColumnsView
}(viewWithColumnStateMixin);
exports.ColumnsView = ColumnsView;
