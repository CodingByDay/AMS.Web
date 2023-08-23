/**
 * DevExtreme (cjs/__internal/grids/grid_core/keyboard_navigation/m_keyboard_navigation.js)
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
exports.keyboardNavigationModule = exports.KeyboardNavigationController = void 0;
var _common = require("../../../../core/utils/common");
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _element = require("../../../../core/element");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _browser = _interopRequireDefault(require("../../../../core/utils/browser"));
var _deferred = require("../../../../core/utils/deferred");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _short = require("../../../../events/short");
var _index = require("../../../../events/utils/index");
var accessibility = _interopRequireWildcard(require("../../../../ui/shared/accessibility"));
var _selectors = require("../../../../ui/widget/selectors");
var _memoize = require("../../../utils/memoize");
var _const = require("../editing/const");
var _m_modules = _interopRequireDefault(require("../m_modules"));
var _m_utils = _interopRequireDefault(require("../m_utils"));
var _const2 = require("./const");
var _dom = require("./dom");
var _m_keyboard_navigation_utils = require("./m_keyboard_navigation_utils");

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
var KeyboardNavigationController = function(_modules$ViewControll) {
    _inheritsLoose(KeyboardNavigationController, _modules$ViewControll);

    function KeyboardNavigationController() {
        return _modules$ViewControll.apply(this, arguments) || this
    }
    var _proto = KeyboardNavigationController.prototype;
    _proto.init = function() {
        var _this = this;
        this._dataController = this.getController("data");
        this._selectionController = this.getController("selection");
        this._editingController = this.getController("editing");
        this._headerPanel = this.getView("headerPanel");
        this._rowsView = this.getView("rowsView");
        this._columnsController = this.getController("columns");
        this._editorFactory = this.getController("editorFactory");
        this._focusController = this.getController("focus");
        this._memoFireFocusedCellChanged = (0, _memoize.memoize)(this._memoFireFocusedCellChanged.bind(this), {
            compareType: "value"
        });
        this._memoFireFocusedRowChanged = (0, _memoize.memoize)(this._memoFireFocusedRowChanged.bind(this), {
            compareType: "value"
        });
        if (this.isKeyboardEnabled()) {
            accessibility.subscribeVisibilityChange();
            this._updateFocusTimeout = null;
            this._fastEditingStarted = false;
            this._focusedCellPosition = {};
            this._canceledCellPosition = null;
            this._editorFactory.focused.add((function($element) {
                _this.setupFocusedView();
                if (_this._isNeedScroll) {
                    if ($element.is(":visible") && _this._focusedView && _this._focusedView.getScrollable) {
                        _this._focusedView._scrollToElement($element);
                        _this._isNeedScroll = false
                    }
                }
            }));
            this._initViewHandlers();
            this._initDocumentHandlers();
            this.createAction("onKeyDown")
        }
    };
    _proto._initViewHandlers = function() {
        var _this2 = this;
        var rowsViewFocusHandler = function(event) {
            var _a;
            var $element = (0, _renderer.default)(event.target);
            var isRelatedTargetInRowsView = (0, _renderer.default)(event.relatedTarget).closest(_this2._rowsView.element()).length;
            var isLink = $element.is("a");
            if (event.relatedTarget && isLink && !isRelatedTargetInRowsView && _this2._isEventInCurrentGrid(event)) {
                var $focusedCell = _this2._getFocusedCell();
                $focusedCell = !(0, _m_keyboard_navigation_utils.isElementDefined)($focusedCell) ? _this2._rowsView.getCellElements(0).filter("[tabindex]").eq(0) : $focusedCell;
                if (!$element.closest($focusedCell).length) {
                    event.preventDefault();
                    _events_engine.default.trigger($focusedCell, "focus")
                }
            }
            var isCell = $element.is("td");
            var needSetFocusPosition = (null !== (_a = _this2.option("focusedRowIndex")) && void 0 !== _a ? _a : -1) < 0;
            if (isCell && needSetFocusPosition) {
                _this2._updateFocusedCellPosition($element)
            }
        };
        this._rowsView.renderCompleted.add((function(e) {
            var $rowsView = _this2._rowsView.element();
            var isFullUpdate = !e || "refresh" === e.changeType;
            var isFocusedViewCorrect = _this2._focusedView && _this2._focusedView.name === _this2._rowsView.name;
            var needUpdateFocus = false;
            var isAppend = e && ("append" === e.changeType || "prepend" === e.changeType);
            var root = (0, _renderer.default)(_dom_adapter.default.getRootNode($rowsView.get && $rowsView.get(0)));
            var $focusedElement = root.find(":focus");
            var isFocusedElementCorrect = !$focusedElement.length || $focusedElement.closest($rowsView).length;
            _events_engine.default.off($rowsView, "focusin", rowsViewFocusHandler);
            _events_engine.default.on($rowsView, "focusin", rowsViewFocusHandler);
            _this2._initPointerEventHandler();
            _this2._initKeyDownHandler();
            _this2._setRowsViewAttributes();
            if (isFocusedViewCorrect && isFocusedElementCorrect) {
                needUpdateFocus = _this2._isNeedFocus ? !isAppend : _this2._isHiddenFocus && isFullUpdate && !(null === e || void 0 === e ? void 0 : e.virtualColumnsScrolling);
                needUpdateFocus && _this2._updateFocus(true)
            }
        }))
    };
    _proto._initDocumentHandlers = function() {
        var _this3 = this;
        var document = _dom_adapter.default.getDocument();
        this._documentClickHandler = this.createAction((function(e) {
            var $target = (0, _renderer.default)(e.event.target);
            var isCurrentRowsViewClick = _this3._isEventInCurrentGrid(e.event) && $target.closest(".".concat(_this3.addWidgetPrefix(_const2.ROWS_VIEW_CLASS))).length;
            var isEditorOverlay = $target.closest(".".concat(_const2.DROPDOWN_EDITOR_OVERLAY_CLASS)).length;
            var columnsResizerController = _this3.getController("columnsResizer");
            var isColumnResizing = !!columnsResizerController && columnsResizerController.isResizing();
            if (!isCurrentRowsViewClick && !isEditorOverlay && !isColumnResizing) {
                var targetInsideFocusedView = _this3._focusedView ? $target.parents().filter(_this3._focusedView.element()).length > 0 : false;
                !targetInsideFocusedView && _this3._resetFocusedCell(true);
                _this3._resetFocusedView()
            }
        }));
        _events_engine.default.on(document, (0, _index.addNamespace)(_pointer.default.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler)
    };
    _proto._setRowsViewAttributes = function() {
        var $rowsView = this._getRowsViewElement();
        var isGridEmpty = !this._dataController.getVisibleRows().length;
        if (isGridEmpty) {
            this._applyTabIndexToElement($rowsView)
        }
    };
    _proto._initPointerEventHandler = function() {
        var pointerEventName = !(0, _m_keyboard_navigation_utils.isMobile)() ? _pointer.default.down : _click.name;
        var clickSelector = ".".concat(_const.ROW_CLASS, " > td, .").concat(_const.ROW_CLASS);
        var $rowsView = this._getRowsViewElement();
        if (!(0, _type.isDefined)(this._pointerEventAction)) {
            this._pointerEventAction = this.createAction(this._pointerEventHandler)
        }
        _events_engine.default.off($rowsView, (0, _index.addNamespace)(pointerEventName, "dxDataGridKeyboardNavigation"), this._pointerEventAction);
        _events_engine.default.on($rowsView, (0, _index.addNamespace)(pointerEventName, "dxDataGridKeyboardNavigation"), clickSelector, this._pointerEventAction)
    };
    _proto._initKeyDownHandler = function() {
        var _this4 = this;
        var $rowsView = this._getRowsViewElement();
        _short.keyboard.off(this._keyDownListener);
        this._keyDownListener = _short.keyboard.on($rowsView, null, (function(e) {
            return _this4._keyDownHandler(e)
        }))
    };
    _proto.dispose = function() {
        _modules$ViewControll.prototype.dispose.call(this);
        this._resetFocusedView();
        _short.keyboard.off(this._keyDownListener);
        _events_engine.default.off(_dom_adapter.default.getDocument(), (0, _index.addNamespace)(_pointer.default.down, "dxDataGridKeyboardNavigation"), this._documentClickHandler);
        clearTimeout(this._updateFocusTimeout);
        accessibility.unsubscribeVisibilityChange()
    };
    _proto.optionChanged = function(args) {
        switch (args.name) {
            case "keyboardNavigation":
            case "useLegacyKeyboardNavigation":
                args.handled = true;
                break;
            default:
                _modules$ViewControll.prototype.optionChanged.call(this, args)
        }
    };
    _proto.isRowFocusType = function() {
        return this.focusType === _const2.FOCUS_TYPE_ROW
    };
    _proto.isCellFocusType = function() {
        return this.focusType === _const2.FOCUS_TYPE_CELL
    };
    _proto.setRowFocusType = function() {
        if (this.option("focusedRowEnabled")) {
            this.focusType = _const2.FOCUS_TYPE_ROW
        }
    };
    _proto.setCellFocusType = function() {
        this.focusType = _const2.FOCUS_TYPE_CELL
    };
    _proto._keyDownHandler = function(e) {
        var _a;
        var needStopPropagation = true;
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        var isHandled = this._processOnKeyDown(e);
        var isEditing = null === (_a = this._editingController) || void 0 === _a ? void 0 : _a.isEditing();
        var originalEvent = e.originalEvent;
        if (originalEvent.isDefaultPrevented()) {
            this._isNeedFocus = false;
            this._isNeedScroll = false;
            return
        }!_const2.FUNCTIONAL_KEYS.includes(e.keyName) && this._updateFocusedCellPositionByTarget(originalEvent.target);
        if (!isHandled) {
            switch (e.keyName) {
                case "leftArrow":
                case "rightArrow":
                    this._leftRightKeysHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "upArrow":
                case "downArrow":
                    if (e.ctrl) {
                        accessibility.selectView("rowsView", this, originalEvent)
                    } else {
                        this._upDownKeysHandler(e, isEditing)
                    }
                    isHandled = true;
                    break;
                case "pageUp":
                case "pageDown":
                    this._pageUpDownKeyHandler(e);
                    isHandled = true;
                    break;
                case "space":
                    isHandled = this._spaceKeyHandler(e, isEditing);
                    break;
                case "A":
                    if ((0, _index.isCommandKeyPressed)(e.originalEvent)) {
                        this._ctrlAKeyHandler(e, isEditing);
                        isHandled = true
                    } else {
                        isHandled = this._beginFastEditing(e.originalEvent)
                    }
                    break;
                case "tab":
                    this._tabKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "enter":
                    this._enterKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "escape":
                    this._escapeKeyHandler(e, isEditing);
                    isHandled = true;
                    break;
                case "F":
                    if ((0, _index.isCommandKeyPressed)(e.originalEvent)) {
                        this._ctrlFKeyHandler(e);
                        isHandled = true
                    } else {
                        isHandled = this._beginFastEditing(e.originalEvent)
                    }
                    break;
                case "F2":
                    this._f2KeyHandler();
                    isHandled = true;
                    break;
                case "del":
                case "backspace":
                    if (this._isFastEditingAllowed() && !this._isFastEditingStarted()) {
                        isHandled = this._beginFastEditing(originalEvent, true)
                    }
            }
            if (!isHandled && !this._beginFastEditing(originalEvent)) {
                this._isNeedFocus = false;
                this._isNeedScroll = false;
                needStopPropagation = false
            }
            if (needStopPropagation) {
                originalEvent.stopPropagation()
            }
        }
    };
    _proto._processOnKeyDown = function(eventArgs) {
        var originalEvent = eventArgs.originalEvent;
        var args = {
            handled: false,
            event: originalEvent
        };
        this.executeAction("onKeyDown", args);
        eventArgs.ctrl = originalEvent.ctrlKey;
        eventArgs.alt = originalEvent.altKey;
        eventArgs.shift = originalEvent.shiftKey;
        return !!args.handled
    };
    _proto._closeEditCell = function() {
        var _this5 = this;
        setTimeout((function() {
            _this5._editingController.closeEditCell()
        }))
    };
    _proto._leftRightKeysHandler = function(eventArgs, isEditing) {
        var rowIndex = this.getVisibleRowIndex();
        var $event = eventArgs.originalEvent;
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        var directionCode = this._getDirectionCodeByKey(eventArgs.keyName);
        var isEditingNavigationMode = this._isFastEditingStarted();
        var allowNavigate = (!isEditing || isEditingNavigationMode) && (0, _m_keyboard_navigation_utils.isDataRow)($row);
        if (allowNavigate) {
            this.setCellFocusType();
            isEditingNavigationMode && this._closeEditCell();
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(directionCode)
            }
            var $cell = this._getNextCell(directionCode);
            if ((0, _m_keyboard_navigation_utils.isElementDefined)($cell)) {
                this._arrowKeysHandlerFocusCell($event, $cell, directionCode)
            }
            $event && $event.preventDefault()
        }
    };
    _proto._upDownKeysHandler = function(eventArgs, isEditing) {
        var _a, _b;
        var visibleRowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(visibleRowIndex);
        var $event = eventArgs.originalEvent;
        var isUpArrow = "upArrow" === eventArgs.keyName;
        var dataSource = this._dataController.dataSource();
        var isRowEditingInCurrentRow = null === (_b = null === (_a = this._editingController) || void 0 === _a ? void 0 : _a.isEditRowByIndex) || void 0 === _b ? void 0 : _b.call(_a, visibleRowIndex);
        var isEditingNavigationMode = this._isFastEditingStarted();
        var allowNavigate = (!isRowEditingInCurrentRow || !isEditing || isEditingNavigationMode) && $row && !(0, _m_keyboard_navigation_utils.isDetailRow)($row);
        if (allowNavigate) {
            isEditingNavigationMode && this._closeEditCell();
            if (!this._navigateNextCell($event, eventArgs.keyName)) {
                if (this._isVirtualRowRender() && isUpArrow && dataSource && !dataSource.isLoading()) {
                    var rowHeight = (0, _size.getOuterHeight)($row);
                    var rowIndex = this._focusedCellPosition.rowIndex - 1;
                    this._scrollBy(0, -rowHeight, rowIndex, $event)
                }
            }
            $event && $event.preventDefault()
        }
    };
    _proto._pageUpDownKeyHandler = function(eventArgs) {
        var pageIndex = this._dataController.pageIndex();
        var pageCount = this._dataController.pageCount();
        var pagingEnabled = this.option("paging.enabled");
        var isPageUp = "pageUp" === eventArgs.keyName;
        var pageStep = isPageUp ? -1 : 1;
        var scrollable = this._rowsView.getScrollable();
        if (pagingEnabled && !this._isVirtualScrolling()) {
            if ((isPageUp ? pageIndex > 0 : pageIndex < pageCount - 1) && !this._isVirtualScrolling()) {
                this._dataController.pageIndex(pageIndex + pageStep);
                eventArgs.originalEvent.preventDefault()
            }
        } else if (scrollable && (0, _size.getHeight)(scrollable.container()) < (0, _size.getHeight)(scrollable.$content())) {
            this._scrollBy(0, (0, _size.getHeight)(scrollable.container()) * pageStep);
            eventArgs.originalEvent.preventDefault()
        }
    };
    _proto._spaceKeyHandler = function(eventArgs, isEditing) {
        var rowIndex = this.getVisibleRowIndex();
        var $target = (0, _renderer.default)(eventArgs.originalEvent && eventArgs.originalEvent.target);
        if (this.option("selection") && "none" !== this.option("selection").mode && !isEditing) {
            var isFocusedRowElement = "row" === this._getElementType($target) && this.isRowFocusType() && (0, _m_keyboard_navigation_utils.isDataRow)($target);
            var isFocusedSelectionCell = $target.hasClass(_const2.COMMAND_SELECT_CLASS);
            if (isFocusedSelectionCell && "onClick" === this.option("selection.showCheckBoxesMode")) {
                this._selectionController.startSelectionWithCheckboxes()
            }
            if (isFocusedRowElement || $target.parent().hasClass(_const2.DATA_ROW_CLASS) || $target.hasClass(this.addWidgetPrefix(_const2.ROWS_VIEW_CLASS))) {
                this._selectionController.changeItemSelection(rowIndex, {
                    shift: eventArgs.shift,
                    control: eventArgs.ctrl
                });
                eventArgs.originalEvent.preventDefault();
                return true
            }
            return false
        }
        return this._beginFastEditing(eventArgs.originalEvent)
    };
    _proto._ctrlAKeyHandler = function(eventArgs, isEditing) {
        if (!isEditing && !eventArgs.alt && "multiple" === this.option("selection.mode") && this.option("selection.allowSelectAll")) {
            this._selectionController.selectAll();
            eventArgs.originalEvent.preventDefault()
        }
    };
    _proto._tabKeyHandler = function(eventArgs, isEditing) {
        var editingOptions = this.option("editing");
        var direction = eventArgs.shift ? "previous" : "next";
        var isCellPositionDefined = (0, _type.isDefined)(this._focusedCellPosition) && !(0, _type.isEmptyObject)(this._focusedCellPosition);
        var isOriginalHandlerRequired = !isCellPositionDefined || !eventArgs.shift && this._isLastValidCell(this._focusedCellPosition) || eventArgs.shift && this._isFirstValidCell(this._focusedCellPosition);
        var eventTarget = eventArgs.originalEvent.target;
        var focusedViewElement = this._focusedView && this._focusedView.element();
        if (this._handleTabKeyOnMasterDetailCell(eventTarget, direction)) {
            return
        }(0, _renderer.default)(focusedViewElement).addClass(_const2.FOCUS_STATE_CLASS);
        if (editingOptions && eventTarget && !isOriginalHandlerRequired) {
            if ((0, _renderer.default)(eventTarget).hasClass(this.addWidgetPrefix(_const2.ROWS_VIEW_CLASS))) {
                this._resetFocusedCell()
            }
            if (this._isVirtualColumnRender()) {
                this._processVirtualHorizontalPosition(direction)
            }
            if (isEditing) {
                if (!this._editingCellTabHandler(eventArgs, direction)) {
                    return
                }
            } else if (this._targetCellTabHandler(eventArgs, direction)) {
                isOriginalHandlerRequired = true
            }
        }
        if (isOriginalHandlerRequired) {
            this._editorFactory.loseFocus();
            if (this._editingController.isEditing() && !this._isRowEditMode()) {
                this._resetFocusedCell(true);
                this._resetFocusedView();
                this._closeEditCell()
            }
        } else {
            eventArgs.originalEvent.preventDefault()
        }
    };
    _proto._getMaxHorizontalOffset = function() {
        var scrollable = this.component.getScrollable();
        return scrollable ? scrollable.scrollWidth() - (0, _size.getWidth)(this._rowsView.element()) : 0
    };
    _proto._isColumnRendered = function(columnIndex) {
        var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        var renderedVisibleColumns = this._columnsController.getVisibleColumns();
        var column = allVisibleColumns[columnIndex];
        var result = false;
        if (column) {
            result = renderedVisibleColumns.indexOf(column) >= 0
        }
        return result
    };
    _proto._isFixedColumn = function(columnIndex) {
        var allVisibleColumns = this._columnsController.getVisibleColumns(null, true);
        var column = allVisibleColumns[columnIndex];
        return !!column && !!column.fixed
    };
    _proto._isColumnVirtual = function(columnIndex) {
        var localColumnIndex = columnIndex - this._columnsController.getColumnIndexOffset();
        var visibleColumns = this._columnsController.getVisibleColumns();
        var column = visibleColumns[localColumnIndex];
        return !!column && "virtual" === column.command
    };
    _proto._processVirtualHorizontalPosition = function(direction) {
        var scrollable = this.component.getScrollable();
        var columnIndex = this.getColumnIndex();
        var nextColumnIndex;
        var horizontalScrollPosition = 0;
        var needToScroll = false;
        switch (direction) {
            case "next":
            case "nextInRow":
                var columnsCount = this._getVisibleColumnCount();
                nextColumnIndex = columnIndex + 1;
                horizontalScrollPosition = this.option("rtlEnabled") ? this._getMaxHorizontalOffset() : 0;
                if ("next" === direction) {
                    needToScroll = columnsCount === nextColumnIndex || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                } else {
                    needToScroll = columnsCount > nextColumnIndex && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                }
                break;
            case "previous":
            case "previousInRow":
                nextColumnIndex = columnIndex - 1;
                horizontalScrollPosition = this.option("rtlEnabled") ? 0 : this._getMaxHorizontalOffset();
                if ("previous" === direction) {
                    var columnIndexOffset = this._columnsController.getColumnIndexOffset();
                    var leftEdgePosition = nextColumnIndex < 0 && 0 === columnIndexOffset;
                    needToScroll = leftEdgePosition || this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                } else {
                    needToScroll = nextColumnIndex >= 0 && this._isFixedColumn(columnIndex) && !this._isColumnRendered(nextColumnIndex)
                }
        }
        if (needToScroll) {
            scrollable.scrollTo({
                left: horizontalScrollPosition
            })
        } else if ((0, _type.isDefined)(nextColumnIndex) && (0, _type.isDefined)(direction) && this._isColumnVirtual(nextColumnIndex)) {
            horizontalScrollPosition = this._getHorizontalScrollPositionOffset(direction);
            0 !== horizontalScrollPosition && scrollable.scrollBy({
                left: horizontalScrollPosition,
                top: 0
            })
        }
    };
    _proto._getHorizontalScrollPositionOffset = function(direction) {
        var positionOffset = 0;
        var $currentCell = this._getCell(this._focusedCellPosition);
        var currentCellWidth = $currentCell && (0, _size.getOuterWidth)($currentCell);
        if (currentCellWidth > 0) {
            var rtlMultiplier = this.option("rtlEnabled") ? -1 : 1;
            positionOffset = "nextInRow" === direction || "next" === direction ? currentCellWidth * rtlMultiplier : currentCellWidth * rtlMultiplier * -1
        }
        return positionOffset
    };
    _proto._editingCellTabHandler = function(eventArgs, direction) {
        var eventTarget = eventArgs.originalEvent.target;
        var $cell = this._getCellElementFromTarget(eventTarget);
        var isEditingAllowed;
        var $event = eventArgs.originalEvent;
        var elementType = this._getElementType(eventTarget);
        if ($cell.is(_const2.COMMAND_CELL_SELECTOR)) {
            return !this._targetCellTabHandler(eventArgs, direction)
        }
        this._updateFocusedCellPosition($cell);
        var nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
        $cell = nextCellInfo.$cell;
        if (!$cell || this._handleTabKeyOnMasterDetailCell($cell, direction)) {
            return false
        }
        var columnsController = this._columnsController;
        var cellIndex = this._rowsView.getCellIndex($cell);
        var columnIndex = cellIndex + columnsController.getColumnIndexOffset();
        var column = columnsController.getVisibleColumns(null, true)[columnIndex];
        var $row = $cell.parent();
        var rowIndex = this._getRowIndex($row);
        var row = this._dataController.items()[rowIndex];
        var editingController = this._editingController;
        if (column && column.allowEditing) {
            var _isDataRow = !row || "data" === row.rowType;
            isEditingAllowed = editingController.allowUpdating({
                row: row
            }) ? _isDataRow : row && row.isNewRow
        }
        if (!isEditingAllowed) {
            this._closeEditCell()
        }
        if (this._focusCell($cell, !nextCellInfo.isHighlighted)) {
            if (!this._isRowEditMode() && isEditingAllowed) {
                this._editFocusedCell()
            } else {
                this._focusInteractiveElement($cell, eventArgs.shift)
            }
        }
        return true
    };
    _proto._targetCellTabHandler = function(eventArgs, direction) {
        var $event = eventArgs.originalEvent;
        var eventTarget = $event.target;
        var $cell = this._getCellElementFromTarget(eventTarget);
        var $lastInteractiveElement = this._getInteractiveElement($cell, !eventArgs.shift);
        var isOriginalHandlerRequired = false;
        var elementType;
        if (!(0, _m_keyboard_navigation_utils.isEditorCell)(this, $cell) && $lastInteractiveElement.length && eventTarget !== $lastInteractiveElement.get(0)) {
            isOriginalHandlerRequired = true
        } else {
            if (void 0 === this._focusedCellPosition.rowIndex && (0, _renderer.default)(eventTarget).hasClass(_const.ROW_CLASS)) {
                this._updateFocusedCellPosition($cell)
            }
            elementType = this._getElementType(eventTarget);
            if (this.isRowFocusType()) {
                this.setCellFocusType();
                if ("row" === elementType && (0, _m_keyboard_navigation_utils.isDataRow)((0, _renderer.default)(eventTarget))) {
                    eventTarget = this.getFirstValidCellInRow((0, _renderer.default)(eventTarget));
                    elementType = this._getElementType(eventTarget)
                }
            }
            var nextCellInfo = this._getNextCellByTabKey($event, direction, elementType);
            $cell = nextCellInfo.$cell;
            if (!$cell) {
                return false
            }
            $cell = this._checkNewLineTransition($event, $cell);
            if (!$cell) {
                return false
            }
            this._focusCell($cell, !nextCellInfo.isHighlighted);
            if (!(0, _m_keyboard_navigation_utils.isEditorCell)(this, $cell)) {
                this._focusInteractiveElement($cell, eventArgs.shift)
            }
        }
        return isOriginalHandlerRequired
    };
    _proto._getNextCellByTabKey = function($event, direction, elementType) {
        var $cell = this._getNextCell(direction, elementType);
        var args = $cell && this._fireFocusedCellChanging($event, $cell, true);
        if (!args || args.cancel) {
            return {}
        }
        if (args.$newCellElement) {
            $cell = args.$newCellElement
        }
        return {
            $cell: $cell,
            isHighlighted: args.isHighlighted
        }
    };
    _proto._checkNewLineTransition = function($event, $cell) {
        var rowIndex = this.getVisibleRowIndex();
        var $row = $cell.parent();
        if (rowIndex !== this._getRowIndex($row)) {
            var cellPosition = this._getCellPosition($cell);
            var args = this._fireFocusedRowChanging($event, $row);
            if (args.cancel) {
                return
            }
            if (args.rowIndexChanged && cellPosition) {
                this.setFocusedColumnIndex(cellPosition.columnIndex);
                $cell = this._getFocusedCell()
            }
        }
        return $cell
    };
    _proto._enterKeyHandler = function(eventArgs, isEditing) {
        var $cell = this._getFocusedCell();
        var rowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        if (this.option("grouping.allowCollapsing") && (0, _m_keyboard_navigation_utils.isGroupRow)($row) || this.option("masterDetail.enabled") && $cell && $cell.hasClass(_const2.COMMAND_EXPAND_CLASS)) {
            var key = this._dataController.getKeyByRowIndex(rowIndex);
            var item = this._dataController.items()[rowIndex];
            if (void 0 !== key && item && item.data && !item.data.isContinuation) {
                this._dataController.changeRowExpand(key)
            }
        } else {
            this._processEnterKeyForDataCell(eventArgs, isEditing)
        }
    };
    _proto._processEnterKeyForDataCell = function(eventArgs, isEditing) {
        var direction = this._getEnterKeyDirection(eventArgs);
        var allowEditingOnEnterKey = this._allowEditingOnEnterKey();
        if (isEditing || !allowEditingOnEnterKey && direction) {
            this._handleEnterKeyEditingCell(eventArgs.originalEvent);
            if ("next" === direction || "previous" === direction) {
                this._targetCellTabHandler(eventArgs, direction)
            } else if ("upArrow" === direction || "downArrow" === direction) {
                this._navigateNextCell(eventArgs.originalEvent, direction)
            }
        } else if (allowEditingOnEnterKey) {
            this._startEditing(eventArgs)
        }
    };
    _proto._getEnterKeyDirection = function(eventArgs) {
        var enterKeyDirection = this.option("keyboardNavigation.enterKeyDirection");
        var isShift = eventArgs.shift;
        if ("column" === enterKeyDirection) {
            return isShift ? "upArrow" : "downArrow"
        }
        if ("row" === enterKeyDirection) {
            return isShift ? "previous" : "next"
        }
        return
    };
    _proto._handleEnterKeyEditingCell = function(event) {
        var target = event.target;
        var $cell = this._getCellElementFromTarget(target);
        var isRowEditMode = this._isRowEditMode();
        this._updateFocusedCellPosition($cell);
        if (isRowEditMode) {
            this._focusEditFormCell($cell);
            setTimeout(this._editingController.saveEditData.bind(this._editingController))
        } else {
            _events_engine.default.trigger((0, _renderer.default)(target), "change");
            this._closeEditCell();
            event.preventDefault()
        }
    };
    _proto._escapeKeyHandler = function(eventArgs, isEditing) {
        var $cell = this._getCellElementFromTarget(eventArgs.originalEvent.target);
        if (isEditing) {
            this._updateFocusedCellPosition($cell);
            if (!this._isRowEditMode()) {
                if ("cell" === this._editingController.getEditMode()) {
                    this._editingController.cancelEditData()
                } else {
                    this._closeEditCell()
                }
            } else {
                this._focusEditFormCell($cell);
                this._editingController.cancelEditData();
                if (0 === this._dataController.items().length) {
                    this._resetFocusedCell();
                    this._editorFactory.loseFocus()
                }
            }
            eventArgs.originalEvent.preventDefault()
        }
    };
    _proto._ctrlFKeyHandler = function(eventArgs) {
        if (this.option("searchPanel.visible")) {
            var searchTextEditor = this._headerPanel.getSearchTextEditor();
            if (searchTextEditor) {
                searchTextEditor.focus();
                eventArgs.originalEvent.preventDefault()
            }
        }
    };
    _proto._f2KeyHandler = function() {
        var isEditing = this._editingController.isEditing();
        var rowIndex = this.getVisibleRowIndex();
        var $row = this._focusedView && this._focusedView.getRow(rowIndex);
        if (!isEditing && (0, _m_keyboard_navigation_utils.isDataRow)($row)) {
            this._startEditing()
        }
    };
    _proto._navigateNextCell = function($event, keyCode) {
        var $cell = this._getNextCell(keyCode);
        var directionCode = this._getDirectionCodeByKey(keyCode);
        var isCellValid = $cell && this._isCellValid($cell);
        var result = isCellValid ? this._arrowKeysHandlerFocusCell($event, $cell, directionCode) : false;
        return result
    };
    _proto._arrowKeysHandlerFocusCell = function($event, $nextCell, direction) {
        var isVerticalDirection = "prevRow" === direction || "nextRow" === direction;
        var args = this._fireFocusChangingEvents($event, $nextCell, isVerticalDirection, true);
        $nextCell = args.$newCellElement;
        if (!args.cancel && this._isCellValid($nextCell)) {
            this._focus($nextCell, !args.isHighlighted);
            return true
        }
        return false
    };
    _proto._beginFastEditing = function(originalEvent, isDeleting) {
        if (!this._isFastEditingAllowed() || originalEvent.altKey || originalEvent.ctrlKey || this._editingController.isEditing()) {
            return false
        }
        if (isDeleting) {
            this._startEditing(originalEvent, _const2.FAST_EDITING_DELETE_KEY)
        } else {
            var key = originalEvent.key;
            var keyCode = originalEvent.keyCode || originalEvent.which;
            var fastEditingKey = key || keyCode && String.fromCharCode(keyCode);
            if (fastEditingKey && (1 === fastEditingKey.length || fastEditingKey === _const2.FAST_EDITING_DELETE_KEY)) {
                this._startEditing(originalEvent, fastEditingKey)
            }
        }
        return true
    };
    _proto._pointerEventHandler = function(e) {
        var _a;
        var event = e.event || e;
        var $target = (0, _renderer.default)(event.currentTarget);
        var focusedViewElement = null === (_a = this._rowsView) || void 0 === _a ? void 0 : _a.element();
        var $parent = $target.parent();
        var isInteractiveElement = (0, _renderer.default)(event.target).is(_const2.INTERACTIVE_ELEMENTS_SELECTOR);
        var isRevertButton = !!(0, _renderer.default)(event.target).closest(".".concat(_const2.REVERT_BUTTON_CLASS)).length;
        var isExpandCommandCell = $target.hasClass(_const2.COMMAND_EXPAND_CLASS);
        if (!this._isEventInCurrentGrid(event)) {
            return
        }
        if (!isRevertButton && (this._isCellValid($target, !isInteractiveElement) || isExpandCommandCell)) {
            $target = this._isInsideEditForm($target) ? (0, _renderer.default)(event.target) : $target;
            this._focusView();
            (0, _renderer.default)(focusedViewElement).removeClass(_const2.FOCUS_STATE_CLASS);
            if ($parent.hasClass(_const2.FREESPACE_ROW_CLASS)) {
                this._updateFocusedCellPosition($target);
                this._applyTabIndexToElement(this._focusedView.element());
                this._focusedView.focus(true)
            } else if (!this._isMasterDetailCell($target)) {
                this._clickTargetCellHandler(event, $target)
            } else {
                this._updateFocusedCellPosition($target)
            }
        } else if ($target.is("td")) {
            this._resetFocusedCell()
        }
    };
    _proto._clickTargetCellHandler = function(event, $cell) {
        var columnIndex = this._rowsView.getCellIndex($cell);
        var column = this._columnsController.getVisibleColumns()[columnIndex];
        var isCellEditMode = this._isCellEditMode();
        this.setCellFocusType();
        var args = this._fireFocusChangingEvents(event, $cell, true);
        $cell = args.$newCellElement;
        if (!args.cancel) {
            if (args.resetFocusedRow) {
                this.getController("focus")._resetFocusedRow();
                return
            }
            if (args.rowIndexChanged) {
                $cell = this._getFocusedCell()
            }
            if (!args.isHighlighted && !isCellEditMode) {
                this.setRowFocusType()
            }
            this._updateFocusedCellPosition($cell);
            if (this._allowRowUpdating() && isCellEditMode && column && column.allowEditing) {
                this._isNeedFocus = false;
                this._isHiddenFocus = false
            } else {
                $cell = this._getFocusedCell();
                var $target = event && (0, _renderer.default)(event.target).closest("".concat(_const2.NON_FOCUSABLE_ELEMENTS_SELECTOR, ", td"));
                var skipFocusEvent = $target && $target.not($cell).is(_const2.NON_FOCUSABLE_ELEMENTS_SELECTOR);
                var isEditor = !!column && !column.command && $cell.hasClass(_const.EDITOR_CELL_CLASS);
                var isDisabled = !isEditor && (!args.isHighlighted || skipFocusEvent);
                this._focus($cell, isDisabled, skipFocusEvent)
            }
        } else {
            this.setRowFocusType();
            this.setFocusedRowIndex(args.prevRowIndex);
            if (this._editingController.isEditing() && isCellEditMode) {
                this._closeEditCell()
            }
        }
    };
    _proto._allowRowUpdating = function() {
        var rowIndex = this.getVisibleRowIndex();
        var row = this._dataController.items()[rowIndex];
        return this._editingController.allowUpdating({
            row: row
        }, "click")
    };
    _proto.focus = function(element) {
        var activeElementSelector;
        var focusedRowEnabled = this.option("focusedRowEnabled");
        var isHighlighted = this._isCellElement((0, _renderer.default)(element));
        if (!element) {
            activeElementSelector = ".dx-datagrid-rowsview .dx-row[tabindex]";
            if (!focusedRowEnabled) {
                activeElementSelector += ", .dx-datagrid-rowsview .dx-row > td[tabindex]"
            }
            element = this.component.$element().find(activeElementSelector).first()
        }
        element && this._focusElement((0, _renderer.default)(element), isHighlighted)
    };
    _proto.getFocusedView = function() {
        return this._focusedView
    };
    _proto.setupFocusedView = function() {
        if (this.isKeyboardEnabled() && !(0, _type.isDefined)(this._focusedView)) {
            this._focusView()
        }
    };
    _proto._focusElement = function($element, isHighlighted) {
        var rowsViewElement = (0, _renderer.default)(this._getRowsViewElement());
        var $focusedView = $element.closest(rowsViewElement);
        var isRowFocusType = this.isRowFocusType();
        var args = {};
        if (!$focusedView.length || this._isCellElement($element) && !this._isCellValid($element)) {
            return
        }
        this._focusView();
        this._isNeedFocus = true;
        this._isNeedScroll = true;
        if (this._isCellElement($element) || (0, _m_keyboard_navigation_utils.isGroupRow)($element)) {
            this.setCellFocusType();
            args = this._fireFocusChangingEvents(null, $element, true, isHighlighted);
            $element = args.$newCellElement;
            if (isRowFocusType && !args.isHighlighted) {
                this.setRowFocusType()
            }
        }
        if (!args.cancel) {
            this._focus($element, !args.isHighlighted);
            this._focusInteractiveElement($element)
        }
    };
    _proto._getFocusedViewByElement = function($element) {
        var view = this.getFocusedView();
        var $view = view && (0, _renderer.default)(view.element());
        return $element && 0 !== $element.closest($view).length
    };
    _proto._focusView = function() {
        this._focusedView = this._rowsView
    };
    _proto._resetFocusedView = function() {
        this.setRowFocusType();
        this._focusedView = null
    };
    _proto._focusInteractiveElement = function($cell, isLast) {
        if (!$cell) {
            return
        }
        var $focusedElement = this._getInteractiveElement($cell, isLast);
        _m_utils.default.focusAndSelectElement(this, $focusedElement)
    };
    _proto._focus = function($cell, disableFocus, skipFocusEvent) {
        var $row = $cell && !$cell.hasClass(_const.ROW_CLASS) ? $cell.closest(".".concat(_const.ROW_CLASS)) : $cell;
        if ($row && (0, _m_keyboard_navigation_utils.isNotFocusedRow)($row)) {
            return
        }
        var focusedView = this._focusedView;
        var $focusViewElement = focusedView && focusedView.element();
        var $focusElement;
        this._isHiddenFocus = disableFocus;
        var isRowFocus = (0, _m_keyboard_navigation_utils.isGroupRow)($row) || (0, _m_keyboard_navigation_utils.isGroupFooterRow)($row) || this.isRowFocusType();
        if (isRowFocus) {
            $focusElement = $row;
            if (focusedView) {
                this.setFocusedRowIndex(this._getRowIndex($row))
            }
        } else if (this._isCellElement($cell)) {
            $focusElement = $cell;
            this._updateFocusedCellPosition($cell)
        }
        if ($focusElement) {
            if ($focusViewElement) {
                $focusViewElement.find(".dx-row[tabindex], .dx-row > td[tabindex]").not($focusElement).removeClass(_const2.CELL_FOCUS_DISABLED_CLASS).removeClass(_const2.FOCUSED_CLASS).removeAttr("tabindex")
            }
            _events_engine.default.one($focusElement, "blur", (function(e) {
                if (e.relatedTarget) {
                    $focusElement.removeClass(_const2.CELL_FOCUS_DISABLED_CLASS).removeClass(_const2.FOCUSED_CLASS)
                }
            }));
            if (!skipFocusEvent) {
                this._applyTabIndexToElement($focusElement);
                _events_engine.default.trigger($focusElement, "focus")
            }
            if (disableFocus) {
                $focusElement.addClass(_const2.CELL_FOCUS_DISABLED_CLASS);
                if (isRowFocus) {
                    $cell.addClass(_const2.CELL_FOCUS_DISABLED_CLASS)
                }
            } else {
                this._editorFactory.focus($focusElement)
            }
        }
    };
    _proto._updateFocus = function(isRenderView) {
        var _this6 = this;
        this._updateFocusTimeout = setTimeout((function() {
            var editingController = _this6._editingController;
            var isCellEditMode = editingController.getEditMode() === _const.EDIT_MODE_CELL;
            var isBatchEditMode = editingController.getEditMode() === _const.EDIT_MODE_BATCH;
            if (isCellEditMode && editingController.hasChanges() || isBatchEditMode && editingController.isNewRowInEditMode()) {
                editingController._focusEditingCell();
                return
            }
            var $cell = _this6._getFocusedCell();
            var isEditing = editingController.isEditing();
            if ($cell && !(_this6._isMasterDetailCell($cell) && !_this6._isRowEditMode())) {
                if (_this6._hasSkipRow($cell.parent())) {
                    var direction = _this6._focusedCellPosition && _this6._focusedCellPosition.rowIndex > 0 ? "upArrow" : "downArrow";
                    $cell = _this6._getNextCell(direction)
                }
                if ((0, _m_keyboard_navigation_utils.isElementDefined)($cell)) {
                    if ($cell.is("td") || $cell.hasClass(_this6.addWidgetPrefix(_const2.EDIT_FORM_ITEM_CLASS))) {
                        var isCommandCell = $cell.is(_const2.COMMAND_CELL_SELECTOR);
                        var $focusedElementInsideCell = $cell.find(":focus");
                        var isFocusedElementDefined = (0, _m_keyboard_navigation_utils.isElementDefined)($focusedElementInsideCell);
                        if ((isRenderView || !isCommandCell) && _this6._editorFactory.focus()) {
                            if (isCommandCell && isFocusedElementDefined) {
                                _m_utils.default.focusAndSelectElement(_this6, $focusedElementInsideCell);
                                return
                            }!isFocusedElementDefined && _this6._focus($cell)
                        } else if (!isFocusedElementDefined && (_this6._isNeedFocus || _this6._isHiddenFocus)) {
                            _this6._focus($cell, _this6._isHiddenFocus)
                        }
                        if (isEditing) {
                            _this6._focusInteractiveElement.bind(_this6)($cell)
                        }
                    } else {
                        _events_engine.default.trigger($cell, "focus")
                    }
                }
            }
        }))
    };
    _proto._getFocusedCell = function() {
        return (0, _renderer.default)(this._getCell(this._focusedCellPosition))
    };
    _proto._updateFocusedCellPositionByTarget = function(target) {
        var _a;
        var elementType = this._getElementType(target);
        if ("row" === elementType && (0, _type.isDefined)(null === (_a = this._focusedCellPosition) || void 0 === _a ? void 0 : _a.columnIndex)) {
            var $row = (0, _renderer.default)(target);
            this._focusedView && (0, _m_keyboard_navigation_utils.isGroupRow)($row) && this.setFocusedRowIndex(this._getRowIndex($row))
        } else {
            this._updateFocusedCellPosition(this._getCellElementFromTarget(target))
        }
    };
    _proto._updateFocusedCellPosition = function($cell, direction) {
        var position = this._getCellPosition($cell, direction);
        if (position) {
            if (!$cell.length || position.rowIndex >= 0 && position.columnIndex >= 0) {
                this.setFocusedCellPosition(position.rowIndex, position.columnIndex)
            }
        }
        return position
    };
    _proto._getFocusedColumnIndexOffset = function(columnIndex) {
        var offset = 0;
        var column = this._columnsController.getVisibleColumns()[columnIndex];
        if (column && column.fixed) {
            offset = this._getFixedColumnIndexOffset(column)
        } else if (columnIndex >= 0) {
            offset = this._columnsController.getColumnIndexOffset()
        }
        return offset
    };
    _proto._getFixedColumnIndexOffset = function(column) {
        var offset = (0, _m_keyboard_navigation_utils.isFixedColumnIndexOffsetRequired)(this, column) ? this._getVisibleColumnCount() - this._columnsController.getVisibleColumns().length : 0;
        return offset
    };
    _proto._getCellPosition = function($cell, direction) {
        var columnIndex;
        var $row = (0, _m_keyboard_navigation_utils.isElementDefined)($cell) && $cell.closest("tr");
        if ((0, _m_keyboard_navigation_utils.isElementDefined)($row)) {
            var rowIndex = this._getRowIndex($row);
            columnIndex = this._rowsView.getCellIndex($cell, rowIndex);
            columnIndex += this._getFocusedColumnIndexOffset(columnIndex);
            if (direction) {
                columnIndex = "previous" === direction ? columnIndex - 1 : columnIndex + 1;
                columnIndex = this._applyColumnIndexBoundaries(columnIndex)
            }
            return {
                rowIndex: rowIndex,
                columnIndex: columnIndex
            }
        }
        return
    };
    _proto._focusCell = function($cell, isDisabled) {
        if (this._isCellValid($cell)) {
            this._focus($cell, isDisabled);
            return true
        }
        return
    };
    _proto._focusEditFormCell = function($cell) {
        if ($cell.hasClass(_const2.MASTER_DETAIL_CELL_CLASS)) {
            this._editorFactory.focus($cell, true)
        }
    };
    _proto._resetFocusedCell = function(preventScroll) {
        var _a;
        var $cell = this._getFocusedCell();
        (0, _m_keyboard_navigation_utils.isElementDefined)($cell) && $cell.removeAttr("tabindex");
        this._isNeedFocus = false;
        this._isNeedScroll = false;
        this._focusedCellPosition = {};
        clearTimeout(this._updateFocusTimeout);
        null === (_a = this._focusedView) || void 0 === _a ? void 0 : _a.renderFocusState({
            preventScroll: preventScroll
        })
    };
    _proto.restoreFocusableElement = function(rowIndex, $event) {
        var args;
        var $rowElement;
        var isUpArrow = (0, _type.isDefined)(rowIndex);
        var $rowsViewElement = this._rowsView.element();
        var columnIndex = this._focusedCellPosition.columnIndex;
        var rowIndexOffset = this._dataController.getRowIndexOffset();
        rowIndex = isUpArrow ? rowIndex : this._rowsView.getTopVisibleItemIndex() + rowIndexOffset;
        if (!isUpArrow) {
            this._editorFactory.loseFocus();
            this._applyTabIndexToElement($rowsViewElement);
            _events_engine.default.trigger($rowsViewElement, "focus")
        } else {
            $rowElement = this._rowsView.getRow(rowIndex - rowIndexOffset);
            args = this._fireFocusedRowChanging($event, $rowElement);
            if (!args.cancel && args.rowIndexChanged) {
                rowIndex = args.newRowIndex
            }
        }
        if (!isUpArrow || !args.cancel) {
            this.setFocusedCellPosition(rowIndex, columnIndex)
        }
        isUpArrow && this._updateFocus()
    };
    _proto._getNewPositionByCode = function(cellPosition, elementType, code) {
        var columnIndex = cellPosition.columnIndex;
        var rowIndex = cellPosition.rowIndex;
        var visibleColumnsCount;
        if (void 0 === cellPosition.rowIndex && "next" === code) {
            return {
                columnIndex: 0,
                rowIndex: 0
            }
        }
        switch (code) {
            case "nextInRow":
            case "next":
                visibleColumnsCount = this._getVisibleColumnCount();
                if (columnIndex < visibleColumnsCount - 1 && "row" !== elementType && this._hasValidCellAfterPosition({
                        columnIndex: columnIndex,
                        rowIndex: rowIndex
                    })) {
                    columnIndex++
                } else if (!this._isLastRow(rowIndex) && "next" === code) {
                    columnIndex = 0;
                    rowIndex++
                }
                break;
            case "previousInRow":
            case "previous":
                if (columnIndex > 0 && "row" !== elementType && this._hasValidCellBeforePosition({
                        columnIndex: columnIndex,
                        rowIndex: rowIndex
                    })) {
                    columnIndex--
                } else if (rowIndex > 0 && "previous" === code) {
                    rowIndex--;
                    visibleColumnsCount = this._getVisibleColumnCount();
                    columnIndex = visibleColumnsCount - 1
                }
                break;
            case "upArrow":
                rowIndex = rowIndex > 0 ? rowIndex - 1 : rowIndex;
                break;
            case "downArrow":
                rowIndex = !this._isLastRow(rowIndex) ? rowIndex + 1 : rowIndex
        }
        return {
            columnIndex: columnIndex,
            rowIndex: rowIndex
        }
    };
    _proto.setFocusedCellPosition = function(rowIndex, columnIndex) {
        this.setFocusedRowIndex(rowIndex);
        this.setFocusedColumnIndex(columnIndex)
    };
    _proto.setFocusedRowIndex = function(rowIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {}
        }
        this._focusedCellPosition.rowIndex = rowIndex
    };
    _proto.setFocusedColumnIndex = function(columnIndex) {
        if (!this._focusedCellPosition) {
            this._focusedCellPosition = {}
        }
        this._focusedCellPosition.columnIndex = columnIndex
    };
    _proto.getRowIndex = function() {
        return this._focusedCellPosition ? this._focusedCellPosition.rowIndex : -1
    };
    _proto.getColumnIndex = function() {
        return this._focusedCellPosition ? this._focusedCellPosition.columnIndex : -1
    };
    _proto.getVisibleRowIndex = function() {
        var _a;
        var rowIndex = null === (_a = this._focusedCellPosition) || void 0 === _a ? void 0 : _a.rowIndex;
        return !(0, _type.isDefined)(rowIndex) || rowIndex < 0 ? -1 : rowIndex - this._dataController.getRowIndexOffset()
    };
    _proto.getVisibleColumnIndex = function() {
        var _a;
        var columnIndex = null === (_a = this._focusedCellPosition) || void 0 === _a ? void 0 : _a.columnIndex;
        return !(0, _type.isDefined)(columnIndex) ? -1 : columnIndex - this._columnsController.getColumnIndexOffset()
    };
    _proto._applyColumnIndexBoundaries = function(columnIndex) {
        var visibleColumnsCount = this._getVisibleColumnCount();
        if (columnIndex < 0) {
            columnIndex = 0
        } else if (columnIndex >= visibleColumnsCount) {
            columnIndex = visibleColumnsCount - 1
        }
        return columnIndex
    };
    _proto._isCellByPositionValid = function(cellPosition) {
        var $cell = (0, _renderer.default)(this._getCell(cellPosition));
        return this._isCellValid($cell)
    };
    _proto._isLastRow = function(rowIndex) {
        var dataController = this._dataController;
        var visibleItems = dataController.items().filter((function(item) {
            return false !== item.visible
        }));
        if (this._isVirtualRowRender()) {
            return rowIndex >= dataController.getMaxRowIndex()
        }
        return rowIndex === visibleItems.length - 1
    };
    _proto._isFirstValidCell = function(cellPosition) {
        var isFirstValidCell = false;
        if (0 === cellPosition.rowIndex && cellPosition.columnIndex >= 0) {
            isFirstValidCell = isFirstValidCell || !this._hasValidCellBeforePosition(cellPosition)
        }
        return isFirstValidCell
    };
    _proto._hasValidCellBeforePosition = function(cellPosition) {
        var columnIndex = cellPosition.columnIndex;
        var hasValidCells = false;
        while (columnIndex > 0 && !hasValidCells) {
            var checkingPosition = {
                columnIndex: --columnIndex,
                rowIndex: cellPosition.rowIndex
            };
            hasValidCells = this._isCellByPositionValid(checkingPosition)
        }
        return hasValidCells
    };
    _proto._hasValidCellAfterPosition = function(cellPosition) {
        var columnIndex = cellPosition.columnIndex;
        var hasValidCells = false;
        var visibleColumnCount = this._getVisibleColumnCount();
        while (columnIndex < visibleColumnCount - 1 && !hasValidCells) {
            var checkingPosition = {
                columnIndex: ++columnIndex,
                rowIndex: cellPosition.rowIndex
            };
            hasValidCells = this._isCellByPositionValid(checkingPosition)
        }
        return hasValidCells
    };
    _proto._isLastValidCell = function(cellPosition) {
        var nextColumnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex + 1 : 0;
        var rowIndex = cellPosition.rowIndex;
        var checkingPosition = {
            columnIndex: nextColumnIndex,
            rowIndex: rowIndex
        };
        var visibleRows = this._dataController.getVisibleRows();
        var row = visibleRows && visibleRows[rowIndex];
        var isLastRow = this._isLastRow(rowIndex);
        if (!isLastRow) {
            return false
        }
        if (row && "group" === row.rowType && cellPosition.columnIndex > 0) {
            return true
        }
        if (cellPosition.columnIndex === this._getVisibleColumnCount() - 1) {
            return true
        }
        if (this._isCellByPositionValid(checkingPosition)) {
            return false
        }
        return this._isLastValidCell(checkingPosition)
    };
    _proto._isCellValid = function($cell, isClick) {
        if ((0, _m_keyboard_navigation_utils.isElementDefined)($cell)) {
            var $row = $cell.parent();
            var columnsController = this._columnsController;
            var columnIndex = this._rowsView.getCellIndex($cell) + columnsController.getColumnIndexOffset();
            var column = columnsController.getVisibleColumns(null, true)[columnIndex];
            var visibleColumnCount = this._getVisibleColumnCount();
            var editingController = this._editingController;
            var isMasterDetailRow = (0, _m_keyboard_navigation_utils.isDetailRow)($row);
            var isShowWhenGrouped = column && column.showWhenGrouped;
            var isDataCell = column && !$cell.hasClass(_const2.COMMAND_EXPAND_CLASS) && (0, _m_keyboard_navigation_utils.isDataRow)($row);
            var isDragCell = _dom.GridCoreKeyboardNavigationDom.isDragCell($cell);
            if (isDragCell) {
                return false
            }
            if (this._isMasterDetailCell($cell)) {
                return true
            }
            if (visibleColumnCount > columnIndex && (!isMasterDetailRow && column && (!(0, _type.isDefined)(column.groupIndex) || isShowWhenGrouped && isDataCell) || parseInt($cell.attr("colspan"), 10) > 1)) {
                var rowItems = this._dataController.items();
                var visibleRowIndex = this._rowsView.getRowIndex($row);
                var row = rowItems[visibleRowIndex];
                var isCellEditing = editingController && this._isCellEditMode() && editingController.isEditing();
                var isRowEditingInCurrentRow = editingController && editingController.isEditRow(visibleRowIndex);
                var isEditing = isRowEditingInCurrentRow || isCellEditing;
                if (column.command) {
                    if (this._isLegacyNavigation()) {
                        return !isEditing && "expand" === column.command
                    }
                    if (isCellEditing) {
                        return false
                    }
                    if (isRowEditingInCurrentRow) {
                        return "select" !== column.command
                    }
                    return !isEditing
                }
                if (isCellEditing && row && "data" !== row.rowType) {
                    return false
                }
                return !isEditing || column.allowEditing || isClick
            }
        }
    };
    _proto.getFirstValidCellInRow = function($row, columnIndex) {
        var $cells = $row.find("> td");
        var $cell;
        var $result;
        columnIndex = columnIndex || 0;
        for (var i = columnIndex; i < $cells.length; ++i) {
            $cell = $cells.eq(i);
            if (this._isCellValid($cell)) {
                $result = $cell;
                break
            }
        }
        return $result
    };
    _proto._getNextCell = function(keyCode, elementType, cellPosition) {
        var focusedCellPosition = cellPosition || this._focusedCellPosition;
        var isRowFocusType = this.isRowFocusType();
        var includeCommandCells = isRowFocusType || ["next", "previous"].includes(keyCode);
        var $cell;
        var $row;
        if (this._focusedView && focusedCellPosition) {
            var newFocusedCellPosition = this._getNewPositionByCode(focusedCellPosition, elementType, keyCode);
            $cell = (0, _renderer.default)(this._getCell(newFocusedCellPosition));
            var isLastCellOnDirection = "previous" === keyCode ? this._isFirstValidCell(newFocusedCellPosition) : this._isLastValidCell(newFocusedCellPosition);
            if ((0, _m_keyboard_navigation_utils.isElementDefined)($cell) && !this._isCellValid($cell) && this._isCellInRow(newFocusedCellPosition, includeCommandCells) && !isLastCellOnDirection) {
                if (isRowFocusType) {
                    $cell = this.getFirstValidCellInRow($cell.parent(), newFocusedCellPosition.columnIndex)
                } else {
                    $cell = this._getNextCell(keyCode, "cell", newFocusedCellPosition)
                }
            }
            $row = (0, _m_keyboard_navigation_utils.isElementDefined)($cell) && $cell.parent();
            if (this._hasSkipRow($row)) {
                var rowIndex = this._getRowIndex($row);
                if (!this._isLastRow(rowIndex)) {
                    $cell = this._getNextCell(keyCode, "row", {
                        columnIndex: focusedCellPosition.columnIndex,
                        rowIndex: rowIndex
                    })
                } else {
                    return null
                }
            }
            return (0, _m_keyboard_navigation_utils.isElementDefined)($cell) ? $cell : null
        }
        return null
    };
    _proto._startEditing = function(eventArgs, fastEditingKey) {
        var focusedCellPosition = this._focusedCellPosition;
        var visibleRowIndex = this.getVisibleRowIndex();
        var visibleColumnIndex = this.getVisibleColumnIndex();
        var row = this._dataController.items()[visibleRowIndex];
        var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
        if (this._isAllowEditing(row, column)) {
            if (this._isRowEditMode()) {
                this._editingController.editRow(visibleRowIndex)
            } else if (focusedCellPosition) {
                this._startEditCell(eventArgs, fastEditingKey)
            }
        }
    };
    _proto._isAllowEditing = function(row, column) {
        return this._editingController.allowUpdating({
            row: row
        }) && column && column.allowEditing
    };
    _proto._editFocusedCell = function() {
        var rowIndex = this.getVisibleRowIndex();
        var colIndex = this.getVisibleColumnIndex();
        return this._editingController.editCell(rowIndex, colIndex)
    };
    _proto._startEditCell = function(eventArgs, fastEditingKey) {
        var _this7 = this;
        this._fastEditingStarted = (0, _type.isDefined)(fastEditingKey);
        var editResult = this._editFocusedCell();
        var isEditResultDeferred = (0, _type.isDeferred)(editResult);
        var isFastEditingStarted = this._isFastEditingStarted();
        if (!isFastEditingStarted || !isEditResultDeferred && !editResult) {
            return
        }
        var editorValue = isEditResultDeferred && fastEditingKey === _const2.FAST_EDITING_DELETE_KEY ? "" : fastEditingKey;
        var editResultDeferred = isEditResultDeferred ? editResult : (0, _deferred.Deferred)().resolve();
        var waitTemplatesDeferred = this._rowsView.waitAsyncTemplates(true);
        (0, _deferred.when)(editResultDeferred, waitTemplatesDeferred).done((function() {
            _this7._editingCellHandler(eventArgs, editorValue)
        }))
    };
    _proto._editingCellHandler = function(eventArgs, editorValue) {
        var _a, _b;
        var $input = this._getFocusedCell().find(_const2.INTERACTIVE_ELEMENTS_SELECTOR).eq(0);
        var $inputElement = $input.get(0);
        if (!$inputElement) {
            return
        }
        var keyDownEvent = (0, _index.createEvent)(eventArgs, {
            type: "keydown",
            target: $inputElement
        });
        var keyPressEvent = (0, _index.createEvent)(eventArgs, {
            type: "keypress",
            target: $inputElement
        });
        var inputEvent = (0, _index.createEvent)(eventArgs, {
            type: "input",
            target: $inputElement
        });
        if (inputEvent.originalEvent) {
            inputEvent.originalEvent = (0, _index.createEvent)(inputEvent.originalEvent, {
                data: editorValue
            })
        }
        null === (_b = (_a = $inputElement).select) || void 0 === _b ? void 0 : _b.call(_a);
        _events_engine.default.trigger($input, keyDownEvent);
        if (!keyDownEvent.isDefaultPrevented()) {
            _events_engine.default.trigger($input, keyPressEvent);
            if (!keyPressEvent.isDefaultPrevented()) {
                var timeout = _browser.default.mozilla ? 25 : 0;
                setTimeout((function() {
                    $input.val(editorValue);
                    var $widgetContainer = $input.closest(".".concat(_const2.WIDGET_CLASS));
                    _events_engine.default.off($widgetContainer, "focusout");
                    _events_engine.default.one($widgetContainer, "focusout", (function() {
                        _events_engine.default.trigger($input, "change")
                    }));
                    _events_engine.default.trigger($input, inputEvent)
                }), timeout)
            }
        }
    };
    _proto._fireFocusChangingEvents = function($event, $cell, fireRowEvent, isHighlighted) {
        var _a;
        var args = {};
        var cellPosition = null !== (_a = this._getCellPosition($cell)) && void 0 !== _a ? _a : {};
        if (this.isCellFocusType()) {
            args = this._fireFocusedCellChanging($event, $cell, isHighlighted);
            if (!args.cancel) {
                cellPosition.columnIndex = args.newColumnIndex;
                cellPosition.rowIndex = args.newRowIndex;
                isHighlighted = args.isHighlighted;
                $cell = (0, _renderer.default)(this._getCell(cellPosition))
            }
        }
        if (!args.cancel && fireRowEvent && $cell) {
            args = this._fireFocusedRowChanging($event, $cell.parent());
            if (!args.cancel) {
                cellPosition.rowIndex = args.newRowIndex;
                args.isHighlighted = isHighlighted
            }
        }
        args.$newCellElement = (0, _renderer.default)(this._getCell(cellPosition));
        if (!args.$newCellElement.length) {
            args.$newCellElement = $cell
        }
        return args
    };
    _proto._fireFocusedCellChanging = function($event, $cellElement, isHighlighted) {
        var prevColumnIndex = this.option("focusedColumnIndex");
        var prevRowIndex = this.option("focusedRowIndex");
        var cellPosition = this._getCellPosition($cellElement);
        var columnIndex = cellPosition ? cellPosition.columnIndex : -1;
        var rowIndex = cellPosition ? cellPosition.rowIndex : -1;
        var visibleRows = this._dataController.getVisibleRows();
        var visibleColumns = this._columnsController.getVisibleColumns();
        var args = {
            cellElement: $cellElement,
            prevColumnIndex: prevColumnIndex,
            prevRowIndex: prevRowIndex,
            newColumnIndex: columnIndex,
            newRowIndex: rowIndex,
            rows: visibleRows,
            columns: visibleColumns,
            event: $event,
            isHighlighted: isHighlighted || false,
            cancel: false
        };
        this._canceledCellPosition = null;
        this.executeAction("onFocusedCellChanging", args);
        if (args.newColumnIndex !== columnIndex || args.newRowIndex !== rowIndex) {
            args.$newCellElement = (0, _renderer.default)(this._getCell({
                columnIndex: args.newColumnIndex,
                rowIndex: args.newRowIndex
            }))
        }
        if (args.cancel) {
            this._canceledCellPosition = {
                rowIndex: rowIndex,
                columnIndex: columnIndex
            }
        }
        return args
    };
    _proto._fireFocusedCellChanged = function($cell) {
        var columnIndex = this._rowsView.getCellIndex($cell);
        var rowOptions = null === $cell || void 0 === $cell ? void 0 : $cell.parent().data("options");
        var focusedRowKey = null === rowOptions || void 0 === rowOptions ? void 0 : rowOptions.key;
        this._memoFireFocusedCellChanged(focusedRowKey, columnIndex)
    };
    _proto._memoFireFocusedCellChanged = function(rowKey, columnIndex) {
        var $cell = this._getFocusedCell();
        var rowIndex = this._getRowIndex(null === $cell || void 0 === $cell ? void 0 : $cell.parent());
        var localRowIndex = Math.min(rowIndex - this._dataController.getRowIndexOffset(), this._dataController.items().length - 1);
        var isEditingCell = this._editingController.isEditCell(localRowIndex, columnIndex);
        if (isEditingCell) {
            return
        }
        var row = this._dataController.items()[localRowIndex];
        var column = this._columnsController.getVisibleColumns()[columnIndex];
        this.executeAction("onFocusedCellChanged", {
            cellElement: $cell ? (0, _element.getPublicElement)($cell) : void 0,
            columnIndex: columnIndex,
            rowIndex: rowIndex,
            row: row,
            column: column
        })
    };
    _proto._fireFocusedRowChanging = function(eventArgs, $newFocusedRow) {
        var newRowIndex = this._getRowIndex($newFocusedRow);
        var prevFocusedRowIndex = this.option("focusedRowIndex");
        var loadingOperationTypes = this._dataController.loadingOperationTypes();
        var args = {
            rowElement: $newFocusedRow,
            prevRowIndex: prevFocusedRowIndex,
            newRowIndex: newRowIndex,
            event: eventArgs,
            rows: this._dataController.getVisibleRows(),
            cancel: false
        };
        if (!this._dataController || this._dataController.isLoading() && (loadingOperationTypes.reload || loadingOperationTypes.paging)) {
            args.cancel = true;
            return args
        }
        if (this.option("focusedRowEnabled")) {
            this.executeAction("onFocusedRowChanging", args);
            if (!args.cancel && args.newRowIndex !== newRowIndex) {
                args.resetFocusedRow = args.newRowIndex < 0;
                if (!args.resetFocusedRow) {
                    this.setFocusedRowIndex(args.newRowIndex)
                }
                args.rowIndexChanged = true
            }
        }
        return args
    };
    _proto._fireFocusedRowChanged = function() {
        var _a;
        var focusedRowEnabled = this.option("focusedRowEnabled");
        var focusedRowKey = this.option("focusedRowKey");
        var focusedRowIndex = null === (_a = this._focusController) || void 0 === _a ? void 0 : _a.getFocusedRowIndexByKey(focusedRowKey);
        if (!focusedRowEnabled || (0, _type.isDefined)(focusedRowKey) && focusedRowIndex < 0) {
            return
        }
        this._memoFireFocusedRowChanged(focusedRowKey, focusedRowIndex)
    };
    _proto._memoFireFocusedRowChanged = function(focusedRowKey, focusedRowIndex) {
        var localRowIndex = focusedRowIndex - this._dataController.getRowIndexOffset();
        this.executeAction("onFocusedRowChanged", {
            rowElement: focusedRowIndex < 0 ? void 0 : this._rowsView.getRowElement(localRowIndex),
            rowIndex: focusedRowIndex,
            row: focusedRowIndex < 0 ? void 0 : this._dataController.getVisibleRows()[localRowIndex]
        })
    };
    _proto._isEventInCurrentGrid = function(event) {
        return _m_utils.default.isElementInCurrentGrid(this, (0, _renderer.default)(event.target))
    };
    _proto._isRowEditMode = function() {
        var editMode = this._editingController.getEditMode();
        return editMode === _const.EDIT_MODE_ROW || editMode === _const.EDIT_MODE_FORM
    };
    _proto._isCellEditMode = function() {
        var editMode = this._editingController.getEditMode();
        return editMode === _const.EDIT_MODE_CELL || editMode === _const.EDIT_MODE_BATCH
    };
    _proto._isFastEditingAllowed = function() {
        return this._isCellEditMode() && this.option("keyboardNavigation.editOnKeyPress")
    };
    _proto._getInteractiveElement = function($cell, isLast) {
        var $focusedElement = $cell.find(_const2.INTERACTIVE_ELEMENTS_SELECTOR).filter(":visible");
        return isLast ? $focusedElement.last() : $focusedElement.first()
    };
    _proto._applyTabIndexToElement = function($element) {
        var tabIndex = this.option("tabIndex") || 0;
        $element.attr("tabindex", (0, _type.isDefined)(tabIndex) ? tabIndex : 0)
    };
    _proto._getCell = function(cellPosition) {
        if (this._focusedView && cellPosition) {
            var rowIndexOffset = this._dataController.getRowIndexOffset();
            var column = this._columnsController.getVisibleColumns(null, true)[cellPosition.columnIndex];
            var columnIndexOffset = column && column.fixed ? this._getFixedColumnIndexOffset(column) : this._columnsController.getColumnIndexOffset();
            var rowIndex = cellPosition.rowIndex >= 0 ? cellPosition.rowIndex - rowIndexOffset : -1;
            var columnIndex = cellPosition.columnIndex >= 0 ? cellPosition.columnIndex - columnIndexOffset : -1;
            return this._focusedView.getCell({
                rowIndex: rowIndex,
                columnIndex: columnIndex
            })
        }
    };
    _proto._getRowIndex = function($row) {
        var rowIndex = this._rowsView.getRowIndex($row);
        if (rowIndex >= 0) {
            rowIndex += this._dataController.getRowIndexOffset()
        }
        return rowIndex
    };
    _proto._hasSkipRow = function($row) {
        var row = $row && $row.get(0);
        return row && ("none" === row.style.display || (0, _m_keyboard_navigation_utils.isDetailRow)($row) && !$row.hasClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS)))
    };
    _proto._allowEditingOnEnterKey = function() {
        return "startEdit" === this.option("keyboardNavigation.enterKeyAction")
    };
    _proto._isLegacyNavigation = function() {
        return this.option("useLegacyKeyboardNavigation")
    };
    _proto._getDirectionCodeByKey = function(key) {
        var directionCode;
        switch (key) {
            case "upArrow":
                directionCode = "prevRow";
                break;
            case "downArrow":
                directionCode = "nextRow";
                break;
            case "leftArrow":
                directionCode = this.option("rtlEnabled") ? "nextInRow" : "previousInRow";
                break;
            case "rightArrow":
                directionCode = this.option("rtlEnabled") ? "previousInRow" : "nextInRow"
        }
        return directionCode
    };
    _proto._isVirtualScrolling = function() {
        var scrollingMode = this.option("scrolling.mode");
        return "virtual" === scrollingMode || "infinite" === scrollingMode
    };
    _proto._isVirtualRowRender = function() {
        return this._isVirtualScrolling() || _m_utils.default.isVirtualRowRendering(this)
    };
    _proto._isVirtualColumnRender = function() {
        return "virtual" === this.option("scrolling.columnRenderingMode")
    };
    _proto._scrollBy = function(left, top, rowIndex, $event) {
        var that = this;
        var scrollable = this._rowsView.getScrollable();
        if (that._focusedCellPosition) {
            scrollable.on("scroll", (function scrollHandler() {
                scrollable.off("scroll", scrollHandler);
                setTimeout(that.restoreFocusableElement.bind(that, rowIndex, $event))
            }))
        }
        return scrollable.scrollBy({
            left: left,
            top: top
        })
    };
    _proto._isInsideEditForm = function(element) {
        var $editForm = (0, _renderer.default)(element).closest(".".concat(this.addWidgetPrefix(_const.EDIT_FORM_CLASS)));
        return $editForm.length && this.elementIsInsideGrid($editForm)
    };
    _proto._isMasterDetailCell = function(element) {
        var $masterDetailCell = (0, _renderer.default)(element).closest(".".concat(_const2.MASTER_DETAIL_CELL_CLASS));
        return $masterDetailCell.length && this.elementIsInsideGrid($masterDetailCell)
    };
    _proto._processNextCellInMasterDetail = function($nextCell, _$cell) {
        if (!this._isInsideEditForm($nextCell) && $nextCell) {
            this._applyTabIndexToElement($nextCell)
        }
    };
    _proto._handleTabKeyOnMasterDetailCell = function(target, direction) {
        if (this._isMasterDetailCell(target)) {
            this._updateFocusedCellPosition((0, _renderer.default)(target), direction);
            var $nextCell = this._getNextCell(direction, "row");
            this._processNextCellInMasterDetail($nextCell, (0, _renderer.default)(target));
            return true
        }
        return false
    };
    _proto._getElementType = function(target) {
        return (0, _renderer.default)(target).is("tr") ? "row" : "cell"
    };
    _proto._isFastEditingStarted = function() {
        return this._isFastEditingAllowed() && this._fastEditingStarted
    };
    _proto._getVisibleColumnCount = function() {
        return this._columnsController.getVisibleColumns(null, true).length
    };
    _proto._isCellInRow = function(cellPosition, includeCommandCells) {
        var columnIndex = cellPosition.columnIndex;
        var visibleColumnsCount = this._getVisibleColumnCount();
        return includeCommandCells ? columnIndex >= 0 && columnIndex <= visibleColumnsCount - 1 : columnIndex > 0 && columnIndex < visibleColumnsCount - 1
    };
    _proto._isCellElement = function($element) {
        return $element.length && "TD" === $element[0].tagName
    };
    _proto._getCellElementFromTarget = function(target) {
        var elementType = this._getElementType(target);
        var $targetElement = (0, _renderer.default)(target);
        var $cell;
        if ("cell" === elementType) {
            $cell = $targetElement.closest(".".concat(_const.ROW_CLASS, " > td"))
        } else {
            $cell = $targetElement.children().not(".".concat(_const2.COMMAND_EXPAND_CLASS)).first()
        }
        return $cell
    };
    _proto._getRowsViewElement = function() {
        var _a;
        return null === (_a = this._rowsView) || void 0 === _a ? void 0 : _a.element()
    };
    _proto.isKeyboardEnabled = function() {
        return this.option("keyboardNavigation.enabled")
    };
    _proto._processCanceledEditCellPosition = function(rowIndex, columnIndex) {
        if (this._canceledCellPosition) {
            var isCanceled = this._canceledCellPosition.rowIndex === rowIndex && this._canceledCellPosition.columnIndex === columnIndex;
            this._canceledCellPosition = null;
            return isCanceled
        }
        return
    };
    _proto.updateFocusedRowIndex = function() {
        var dataController = this._dataController;
        var visibleRowIndex = this.getVisibleRowIndex();
        var visibleItems = dataController.items();
        var lastVisibleIndex = visibleItems.length ? visibleItems.length - 1 : -1;
        var rowIndexOffset = dataController.getRowIndexOffset();
        if (lastVisibleIndex >= 0 && visibleRowIndex > lastVisibleIndex) {
            this.setFocusedRowIndex(lastVisibleIndex + rowIndexOffset)
        }
    };
    return KeyboardNavigationController
}(_m_modules.default.ViewController);
exports.KeyboardNavigationController = KeyboardNavigationController;
var keyboardNavigationModule = {
    defaultOptions: function() {
        return {
            useLegacyKeyboardNavigation: false,
            keyboardNavigation: {
                enabled: true,
                enterKeyAction: "startEdit",
                enterKeyDirection: "none",
                editOnKeyPress: false
            }
        }
    },
    controllers: {
        keyboardNavigation: KeyboardNavigationController
    },
    extenders: {
        views: {
            rowsView: {
                _rowClick: function(e) {
                    var editRowIndex = this.getController("editing").getEditRowIndex();
                    var keyboardController = this.getController("keyboardNavigation");
                    var isKeyboardEnabled = keyboardController.isKeyboardEnabled();
                    if (editRowIndex === e.rowIndex) {
                        keyboardController.setCellFocusType()
                    }
                    var needTriggerPointerEventHandler = ((0, _m_keyboard_navigation_utils.isMobile)() || !isKeyboardEnabled) && this.option("focusedRowEnabled");
                    if (needTriggerPointerEventHandler) {
                        this._triggerPointerDownEventHandler(e, !isKeyboardEnabled)
                    }
                    this.callBase.apply(this, arguments)
                },
                _triggerPointerDownEventHandler: function(e, force) {
                    var originalEvent = e.event.originalEvent;
                    if (originalEvent) {
                        var keyboardController = this.getController("keyboardNavigation");
                        var $cell = (0, _renderer.default)(originalEvent.target);
                        var columnIndex = this.getCellIndex($cell);
                        var column = this.getController("columns").getVisibleColumns()[columnIndex];
                        var row = this.getController("data").items()[e.rowIndex];
                        if (keyboardController._isAllowEditing(row, column) || force) {
                            var eventArgs = (0, _index.createEvent)(originalEvent, {
                                currentTarget: originalEvent.target
                            });
                            keyboardController._pointerEventHandler(eventArgs)
                        }
                    }
                },
                renderFocusState: function(params) {
                    var _ref = null !== params && void 0 !== params ? params : {},
                        preventScroll = _ref.preventScroll,
                        pageSizeChanged = _ref.pageSizeChanged;
                    var keyboardController = this.getController("keyboardNavigation");
                    var $rowsViewElement = this.element();
                    if ($rowsViewElement && !(0, _selectors.focused)($rowsViewElement)) {
                        $rowsViewElement.attr("tabindex", null)
                    }
                    pageSizeChanged && keyboardController.updateFocusedRowIndex();
                    var rowIndex = keyboardController.getVisibleRowIndex();
                    if (!(0, _type.isDefined)(rowIndex) || rowIndex < 0) {
                        rowIndex = 0
                    }
                    var cellElements = this.getCellElements(rowIndex);
                    if (keyboardController.isKeyboardEnabled() && (null === cellElements || void 0 === cellElements ? void 0 : cellElements.length)) {
                        this.updateFocusElementTabIndex(cellElements, preventScroll)
                    }
                },
                updateFocusElementTabIndex: function(cellElements) {
                    var keyboardController = this.getController("keyboardNavigation");
                    var $row = cellElements.eq(0).parent();
                    if ((0, _m_keyboard_navigation_utils.isGroupRow)($row)) {
                        keyboardController._applyTabIndexToElement($row)
                    } else {
                        var columnIndex = keyboardController.getColumnIndex();
                        if (!(0, _type.isDefined)(columnIndex) || columnIndex < 0) {
                            columnIndex = 0
                        }
                        this._updateFocusedCellTabIndex(cellElements, columnIndex)
                    }
                },
                _updateFocusedCellTabIndex: function(cellElements, columnIndex) {
                    var keyboardController = this.getController("keyboardNavigation");
                    var cellElementsLength = cellElements ? cellElements.length : -1;
                    var updateCellTabIndex = function($cell) {
                        var isMasterDetailCell = keyboardController._isMasterDetailCell($cell);
                        var isValidCell = keyboardController._isCellValid($cell);
                        if (!isMasterDetailCell && isValidCell && keyboardController._isCellElement($cell)) {
                            keyboardController._applyTabIndexToElement($cell);
                            keyboardController.setCellFocusType();
                            return true
                        }
                        return
                    };
                    var $cell = _dom.GridCoreKeyboardNavigationDom.getCellToFocus(cellElements, columnIndex);
                    if ($cell.length) {
                        updateCellTabIndex($cell)
                    } else {
                        if (cellElementsLength <= columnIndex) {
                            columnIndex = cellElementsLength - 1
                        }
                        for (var i = columnIndex; i < cellElementsLength; ++i) {
                            if (updateCellTabIndex((0, _renderer.default)(cellElements[i]))) {
                                break
                            }
                        }
                    }
                },
                renderDelayedTemplates: function(change) {
                    this.callBase.apply(this, arguments);
                    this._renderFocusByChange(change)
                },
                _renderFocusByChange: function(change) {
                    var _ref2 = null !== change && void 0 !== change ? change : {},
                        operationTypes = _ref2.operationTypes,
                        repaintChangesOnly = _ref2.repaintChangesOnly;
                    var _ref3 = null !== operationTypes && void 0 !== operationTypes ? operationTypes : {},
                        fullReload = _ref3.fullReload,
                        pageSize = _ref3.pageSize;
                    if (!change || !repaintChangesOnly || fullReload || pageSize) {
                        var preventScroll = (0, _m_keyboard_navigation_utils.shouldPreventScroll)(this);
                        this.renderFocusState({
                            preventScroll: preventScroll,
                            pageSizeChanged: pageSize
                        })
                    }
                },
                _renderCore: function(change) {
                    var deferred = this.callBase.apply(this, arguments);
                    this._renderFocusByChange(change);
                    return deferred
                },
                _editCellPrepared: function($cell) {
                    var editorInstance = this._getEditorInstance($cell);
                    var keyboardController = this.getController("keyboardNavigation");
                    var isEditingNavigationMode = keyboardController && keyboardController._isFastEditingStarted();
                    if (editorInstance && isEditingNavigationMode) {
                        this._handleEditingNavigationMode(editorInstance)
                    }
                    this.callBase.apply(this, arguments)
                },
                _handleEditingNavigationMode: function(editorInstance) {
                    ["downArrow", "upArrow"].forEach((function(keyName) {
                        var originalKeyHandler = editorInstance._supportedKeys()[keyName];
                        editorInstance.registerKeyHandler(keyName, (function(e) {
                            var isDropDownOpened = "true" === editorInstance._input().attr("aria-expanded");
                            if (isDropDownOpened) {
                                return originalKeyHandler && originalKeyHandler.call(editorInstance, e)
                            }
                        }))
                    }));
                    editorInstance.registerKeyHandler("leftArrow", _common.noop);
                    editorInstance.registerKeyHandler("rightArrow", _common.noop);
                    var isDateBoxWithMask = editorInstance.NAME === _const2.DATEBOX_WIDGET_NAME && editorInstance.option("useMaskBehavior");
                    if (isDateBoxWithMask) {
                        editorInstance.registerKeyHandler("enter", _common.noop)
                    }
                },
                _getEditorInstance: function($cell) {
                    var $editor = $cell.find(".dx-texteditor").eq(0);
                    return _m_utils.default.getWidgetInstance($editor)
                }
            }
        },
        controllers: {
            editing: {
                editCell: function(rowIndex, columnIndex) {
                    var keyboardController = this.getController("keyboardNavigation");
                    if (keyboardController._processCanceledEditCellPosition(rowIndex, columnIndex)) {
                        return false
                    }
                    var isCellEditing = this.callBase(rowIndex, columnIndex);
                    if (isCellEditing) {
                        keyboardController.setupFocusedView()
                    }
                    return isCellEditing
                },
                editRow: function(rowIndex) {
                    var keyboardController = this.getController("keyboardNavigation");
                    var visibleColumnIndex = keyboardController.getVisibleColumnIndex();
                    var column = this._columnsController.getVisibleColumns()[visibleColumnIndex];
                    if (column && column.type || this.option("editing.mode") === _const.EDIT_MODE_FORM) {
                        keyboardController._resetFocusedCell()
                    }
                    this.callBase(rowIndex)
                },
                addRow: function(parentKey) {
                    var keyboardController = this.getController("keyboardNavigation");
                    keyboardController.setupFocusedView();
                    keyboardController.setCellFocusType();
                    return this.callBase.apply(this, arguments)
                },
                getFocusedCellInRow: function(rowIndex) {
                    var keyboardNavigationController = this.getController("keyboardNavigation");
                    var $cell = this.callBase(rowIndex);
                    if (keyboardNavigationController.isKeyboardEnabled() && keyboardNavigationController._focusedCellPosition.rowIndex === rowIndex) {
                        var $focusedCell = keyboardNavigationController._getFocusedCell();
                        if ((0, _m_keyboard_navigation_utils.isElementDefined)($focusedCell) && !$focusedCell.hasClass(_const2.COMMAND_EDIT_CLASS)) {
                            $cell = $focusedCell
                        }
                    }
                    return $cell
                },
                _processCanceledEditingCell: function() {
                    var _this8 = this;
                    this.closeEditCell().done((function() {
                        var keyboardNavigation = _this8.getController("keyboardNavigation");
                        keyboardNavigation._updateFocus()
                    }))
                },
                init: function() {
                    this.callBase();
                    this._keyboardNavigationController = this.getController("keyboardNavigation")
                },
                closeEditCell: function() {
                    var keyboardNavigation = this._keyboardNavigationController;
                    keyboardNavigation._fastEditingStarted = false;
                    var result = this.callBase.apply(this, arguments);
                    keyboardNavigation._updateFocus();
                    return result
                },
                _delayedInputFocus: function() {
                    this._keyboardNavigationController._isNeedScroll = true;
                    this.callBase.apply(this, arguments)
                },
                _isEditingStart: function() {
                    var keyboardNavigation = this.getController("keyboardNavigation");
                    var cancel = this.callBase.apply(this, arguments);
                    if (cancel && !keyboardNavigation._isNeedFocus) {
                        var $cell = keyboardNavigation._getFocusedCell();
                        keyboardNavigation._focus($cell, true)
                    }
                    return cancel
                }
            },
            data: {
                _correctRowIndices: function(getRowIndexCorrection) {
                    var that = this;
                    var keyboardNavigationController = that.getController("keyboardNavigation");
                    var editorFactory = that.getController("editorFactory");
                    var focusedCellPosition = keyboardNavigationController._focusedCellPosition;
                    that.callBase.apply(that, arguments);
                    if (focusedCellPosition && focusedCellPosition.rowIndex >= 0) {
                        var focusedRowIndexCorrection = getRowIndexCorrection(focusedCellPosition.rowIndex);
                        if (focusedRowIndexCorrection) {
                            focusedCellPosition.rowIndex += focusedRowIndexCorrection;
                            editorFactory.refocus()
                        }
                    }
                },
                getMaxRowIndex: function() {
                    var result = this.items().length - 1;
                    var virtualItemsCount = this.virtualItemsCount();
                    if (virtualItemsCount) {
                        var rowIndexOffset = this.getRowIndexOffset();
                        result += rowIndexOffset + virtualItemsCount.end
                    }
                    return result
                }
            },
            adaptiveColumns: {
                _showHiddenCellsInView: function(_ref4) {
                    var viewName = _ref4.viewName,
                        $cells = _ref4.$cells,
                        isCommandColumn = _ref4.isCommandColumn;
                    this.callBase.apply(this, arguments);
                    viewName === _const2.COLUMN_HEADERS_VIEW && !isCommandColumn && $cells.each((function(_, cellElement) {
                        var $cell = (0, _renderer.default)(cellElement);
                        (0, _m_keyboard_navigation_utils.isCellInHeaderRow)($cell) && $cell.attr("tabindex", 0)
                    }))
                },
                _hideVisibleCellInView: function(_ref5) {
                    var viewName = _ref5.viewName,
                        $cell = _ref5.$cell,
                        isCommandColumn = _ref5.isCommandColumn;
                    this.callBase.apply(this, arguments);
                    if (viewName === _const2.COLUMN_HEADERS_VIEW && !isCommandColumn && (0, _m_keyboard_navigation_utils.isCellInHeaderRow)($cell)) {
                        $cell.removeAttr("tabindex")
                    }
                }
            }
        }
    }
};
exports.keyboardNavigationModule = keyboardNavigationModule;
