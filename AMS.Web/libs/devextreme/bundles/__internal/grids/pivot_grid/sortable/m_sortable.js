/**
 * DevExtreme (bundles/__internal/grids/pivot_grid/sortable/m_sortable.js)
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
exports.default = exports.Sortable = void 0;
var _component_registrator = _interopRequireDefault(require("../../../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _dom_component = _interopRequireDefault(require("../../../../core/dom_component"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _iterator = require("../../../../core/utils/iterator");
var _size = require("../../../../core/utils/size");
var _type = require("../../../../core/utils/type");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _drag = require("../../../../events/drag");
var _index = require("../../../../events/utils/index");
var _swatch_container = _interopRequireDefault(require("../../../../ui/widget/swatch_container"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var getSwatchContainer = _swatch_container.default.getSwatchContainer;
var SORTABLE_NAMESPACE = "dxSortable";
var SORTABLE_CLASS = "dx-sortable-old";
var SCROLL_STEP = 2;
var START_SCROLL_OFFSET = 20;
var SCROLL_TIMEOUT = 10;

function elementHasPoint(element, x, y) {
    var $item = (0, _renderer.default)(element);
    var offset = $item.offset();
    if (x >= offset.left && x <= offset.left + (0, _size.getOuterWidth)($item, true)) {
        if (y >= offset.top && y <= offset.top + (0, _size.getOuterHeight)($item, true)) {
            return true
        }
    }
    return
}

function checkHorizontalPosition(position, itemOffset, rtl) {
    if ((0, _type.isDefined)(itemOffset.posHorizontal)) {
        return rtl ? position > itemOffset.posHorizontal : position < itemOffset.posHorizontal
    }
    return true
}

function getIndex($items, $item) {
    var index = -1;
    var itemElement = $item.get(0);
    (0, _iterator.each)($items, (function(elementIndex, element) {
        var $element = (0, _renderer.default)(element);
        if (!($element.attr("item-group") && $element.attr("item-group") === $items.eq(elementIndex - 1).attr("item-group"))) {
            index += 1
        }
        if (element === itemElement) {
            return false
        }
        return
    }));
    return index === $items.length ? -1 : index
}

function getTargetGroup(e, $groups) {
    var result;
    (0, _iterator.each)($groups, (function() {
        if (elementHasPoint(this, e.pageX, e.pageY)) {
            result = (0, _renderer.default)(this)
        }
    }));
    return result
}

function getItemsOffset($elements, isVertical, $itemsContainer) {
    var result = [];
    var $item = [];
    for (var i = 0; i < $elements.length; i += $item.length) {
        $item = $elements.eq(i);
        if ($item.attr("item-group")) {
            $item = $itemsContainer.find("[item-group='".concat($item.attr("item-group"), "']"))
        }
        if ($item.is(":visible")) {
            var offset = {
                item: $item,
                index: result.length,
                posVertical: isVertical ? ($item.last().offset().top + $item.offset().top + (0, _size.getOuterHeight)($item.last(), true)) / 2 : (0, _size.getOuterHeight)($item.last(), true) + $item.last().offset().top,
                posHorizontal: isVertical ? void 0 : ((0, _size.getOuterWidth)($item.last(), true) + $item.last().offset().left + $item.offset().left) / 2
            };
            result.push(offset)
        }
    }
    return result
}

function getScrollWrapper(scrollable) {
    var timeout;
    var scrollTop = scrollable.scrollTop();
    var $element = scrollable.$element();
    var _$element$offset = $element.offset(),
        top = _$element$offset.top;
    var height = (0, _size.getHeight)($element);
    var delta = 0;

    function onScroll(e) {
        scrollTop = e.scrollOffset.top
    }
    scrollable.on("scroll", onScroll);

    function move() {
        stop();
        scrollable.scrollTo(scrollTop += delta);
        timeout = setTimeout(move, SCROLL_TIMEOUT)
    }

    function stop() {
        clearTimeout(timeout)
    }
    return {
        moveIfNeed: function(event) {
            if (event.pageY <= top + START_SCROLL_OFFSET) {
                delta = -SCROLL_STEP
            } else if (event.pageY >= top + height - START_SCROLL_OFFSET) {
                delta = SCROLL_STEP
            } else {
                delta = 0;
                stop();
                return
            }
            move()
        },
        element: function() {
            return $element
        },
        dispose: function() {
            stop();
            scrollable.off("scroll", onScroll)
        }
    }
}
var Sortable = _dom_component.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            onChanged: null,
            onDragging: null,
            itemRender: null,
            groupSelector: null,
            itemSelector: ".dx-sort-item",
            itemContainerSelector: ".dx-sortable-old",
            sourceClass: "dx-drag-source",
            dragClass: "dx-drag",
            targetClass: "dx-drag-target",
            direction: "vertical",
            allowDragging: true,
            groupFilter: null,
            useIndicator: false
        })
    },
    _renderItem: function($sourceItem, target) {
        var itemRender = this.option("itemRender");
        var $item;
        if (itemRender) {
            $item = itemRender($sourceItem, target)
        } else {
            $item = $sourceItem.clone();
            $item.css({
                width: (0, _size.getWidth)($sourceItem),
                height: (0, _size.getHeight)($sourceItem)
            })
        }
        return $item
    },
    _renderIndicator: function($item, isVertical, $targetGroup, isLast) {
        var height = (0, _size.getOuterHeight)($item, true);
        var width = (0, _size.getOuterWidth)($item, true);
        var top = $item.offset().top - $targetGroup.offset().top;
        var left = $item.offset().left - $targetGroup.offset().left;
        this._indicator.css({
            position: "absolute",
            top: isLast && isVertical ? top + height : top,
            left: isLast && !isVertical ? left + width : left
        }).toggleClass("dx-position-indicator-horizontal", !isVertical).toggleClass("dx-position-indicator-vertical", !!isVertical).toggleClass("dx-position-indicator-last", !!isLast).appendTo($targetGroup);
        (0, _size.setHeight)(this._indicator, "");
        (0, _size.setWidth)(this._indicator, "");
        if (isVertical) {
            (0, _size.setWidth)(this._indicator, width)
        } else {
            (0, _size.setHeight)(this._indicator, height)
        }
    },
    _renderDraggable: function($sourceItem) {
        this._$draggable && this._$draggable.remove();
        this._$draggable = this._renderItem($sourceItem, "drag").addClass(this.option("dragClass")).appendTo(getSwatchContainer($sourceItem)).css({
            zIndex: 1e6,
            position: "absolute"
        })
    },
    _detachEventHandlers: function() {
        var dragEventsString = [_drag.move, _drag.start, _drag.end, _drag.enter, _drag.leave, _drag.drop].join(" ");
        _events_engine.default.off(this._getEventListener(), (0, _index.addNamespace)(dragEventsString, SORTABLE_NAMESPACE), void 0)
    },
    _getItemOffset: function(isVertical, itemsOffset, e) {
        for (var i = 0; i < itemsOffset.length; i += 1) {
            var shouldInsert = void 0;
            var sameLine = e.pageY < itemsOffset[i].posVertical;
            if (isVertical) {
                shouldInsert = sameLine
            } else if (sameLine) {
                shouldInsert = checkHorizontalPosition(e.pageX, itemsOffset[i], this.option("rtlEnabled"));
                if (!shouldInsert && itemsOffset[i + 1] && itemsOffset[i + 1].posVertical > itemsOffset[i].posVertical) {
                    shouldInsert = true
                }
            }
            if (shouldInsert) {
                return itemsOffset[i]
            }
        }
        return
    },
    _getEventListener: function() {
        var groupSelector = this.option("groupSelector");
        var element = this.$element();
        return groupSelector ? element.find(groupSelector) : element
    },
    _attachEventHandlers: function() {
        var that = this;
        var itemSelector = that.option("itemSelector");
        var itemContainerSelector = that.option("itemContainerSelector");
        var groupSelector = that.option("groupSelector");
        var sourceClass = that.option("sourceClass");
        var targetClass = that.option("targetClass");
        var onDragging = that.option("onDragging");
        var groupFilter = that.option("groupFilter");
        var $sourceItem;
        var sourceIndex;
        var $targetItem;
        var $targetGroup;
        var startPositions;
        var sourceGroup;
        var element = that.$element();
        var $groups;
        var scrollWrapper = null;
        var targetIndex = -1;
        var disposeScrollWrapper = function() {
            null === scrollWrapper || void 0 === scrollWrapper ? void 0 : scrollWrapper.dispose();
            scrollWrapper = null
        };
        that._detachEventHandlers();
        if (that.option("allowDragging")) {
            var $eventListener = that._getEventListener();
            _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.start, SORTABLE_NAMESPACE), itemSelector, (function(e) {
                $sourceItem = (0, _renderer.default)(e.currentTarget);
                var $sourceGroup = $sourceItem.closest(groupSelector);
                sourceGroup = $sourceGroup.attr("group");
                sourceIndex = getIndex((groupSelector ? $sourceGroup : element).find(itemSelector), $sourceItem);
                if ($sourceItem.attr("item-group")) {
                    $sourceItem = $sourceGroup.find("[item-group='".concat($sourceItem.attr("item-group"), "']"))
                }
                that._renderDraggable($sourceItem);
                $targetItem = that._renderItem($sourceItem, "target").addClass(targetClass);
                $sourceItem.addClass(sourceClass);
                ! function() {
                    startPositions = [];
                    (0, _iterator.each)($sourceItem, (function(_, item) {
                        startPositions.push((0, _renderer.default)(item).offset())
                    }))
                }();
                $groups = function() {
                    var root = _dom_adapter.default.getRootNode(that.$element().get(0));
                    if (!groupSelector) {
                        return element
                    }
                    return groupFilter ? (0, _renderer.default)(root).find(groupSelector).filter(groupFilter) : element.find(groupSelector)
                }();
                that._indicator = (0, _renderer.default)("<div>").addClass("dx-position-indicator")
            }));
            _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.move, SORTABLE_NAMESPACE), (function(e) {
                var $item;
                var $lastItem;
                var $prevItem;
                if (!$sourceItem) {
                    return
                }
                targetIndex = -1;
                that._indicator.detach();
                (0, _iterator.each)(that._$draggable, (function(index, draggableElement) {
                    (0, _renderer.default)(draggableElement).css({
                        top: startPositions[index].top + e.offset.y,
                        left: startPositions[index].left + e.offset.x
                    })
                }));
                $targetGroup && $targetGroup.removeClass(targetClass);
                $targetGroup = getTargetGroup(e, $groups);
                $targetGroup && function() {
                    var draggingArgs = {
                        sourceGroup: sourceGroup,
                        sourceIndex: sourceIndex,
                        sourceElement: $sourceItem,
                        targetGroup: $targetGroup.attr("group"),
                        targetIndex: $targetGroup.find(itemSelector).index($targetItem)
                    };
                    onDragging && onDragging(draggingArgs);
                    if (draggingArgs.cancel) {
                        $targetGroup = void 0
                    }
                }();
                if ($targetGroup && scrollWrapper && $targetGroup.get(0) !== scrollWrapper.element().get(0)) {
                    disposeScrollWrapper()
                }
                scrollWrapper && scrollWrapper.moveIfNeed(e);
                if (!$targetGroup) {
                    $targetItem.detach();
                    return
                }
                if (!scrollWrapper && $targetGroup.attr("allow-scrolling")) {
                    scrollWrapper = getScrollWrapper($targetGroup.dxScrollable("instance"))
                }
                $targetGroup.addClass(targetClass);
                var $itemContainer = $targetGroup.find(itemContainerSelector);
                var $items = $itemContainer.find(itemSelector);
                var targetSortable = $targetGroup.closest(".".concat(SORTABLE_CLASS)).data("dxSortableOld");
                var useIndicator = targetSortable.option("useIndicator");
                var isVertical = "vertical" === (targetSortable || that).option("direction");
                var itemsOffset = getItemsOffset($items, isVertical, $itemContainer);
                var itemOffset = that._getItemOffset(isVertical, itemsOffset, e);
                if (itemOffset) {
                    $item = itemOffset.item;
                    $prevItem = itemsOffset[itemOffset.index - 1] && itemsOffset[itemOffset.index - 1].item;
                    if ($item.hasClass(sourceClass) || $prevItem && $prevItem.hasClass(sourceClass) && $prevItem.is(":visible")) {
                        $targetItem.detach();
                        return
                    }
                    targetIndex = itemOffset.index;
                    if (!useIndicator) {
                        $targetItem.insertBefore($item);
                        return
                    }
                    var isAnotherGroup = $targetGroup.attr("group") !== sourceGroup;
                    var isSameIndex = targetIndex === sourceIndex;
                    var isNextIndex = targetIndex === sourceIndex + 1;
                    if (isAnotherGroup) {
                        that._renderIndicator($item, isVertical, $targetGroup, that.option("rtlEnabled") && !isVertical);
                        return
                    }
                    if (!isSameIndex && !isNextIndex) {
                        that._renderIndicator($item, isVertical, $targetGroup, that.option("rtlEnabled") && !isVertical)
                    }
                } else {
                    $lastItem = $items.last();
                    if ($lastItem.is(":visible") && $lastItem.hasClass(sourceClass)) {
                        return
                    }
                    if ($itemContainer.length) {
                        targetIndex = itemsOffset.length ? itemsOffset[itemsOffset.length - 1].index + 1 : 0
                    }
                    if (useIndicator) {
                        $items.length && that._renderIndicator($lastItem, isVertical, $targetGroup, !that.option("rtlEnabled") || isVertical)
                    } else {
                        $targetItem.appendTo($itemContainer)
                    }
                }
            }));
            _events_engine.default.on($eventListener, (0, _index.addNamespace)(_drag.end, SORTABLE_NAMESPACE), (function() {
                disposeScrollWrapper();
                if (!$sourceItem) {
                    return
                }
                var onChanged = that.option("onChanged");
                var changedArgs = {
                    sourceIndex: sourceIndex,
                    sourceElement: $sourceItem,
                    sourceGroup: sourceGroup,
                    targetIndex: targetIndex,
                    removeSourceElement: true,
                    removeTargetElement: false,
                    removeSourceClass: true
                };
                if ($targetGroup) {
                    $targetGroup.removeClass(targetClass);
                    changedArgs.targetGroup = $targetGroup.attr("group");
                    if (sourceGroup !== changedArgs.targetGroup || targetIndex > -1) {
                        onChanged && onChanged(changedArgs);
                        changedArgs.removeSourceElement && $sourceItem.remove()
                    }
                }
                that._indicator.detach();
                changedArgs.removeSourceClass && $sourceItem.removeClass(sourceClass);
                $sourceItem = null;
                that._$draggable.remove();
                that._$draggable = null;
                changedArgs.removeTargetElement && $targetItem.remove();
                $targetItem.removeClass(targetClass);
                $targetItem = null
            }))
        }
    },
    _init: function() {
        this.callBase();
        this._attachEventHandlers()
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(SORTABLE_CLASS)
    },
    _dispose: function() {
        var that = this;
        that.callBase.apply(that, arguments);
        that._$draggable && that._$draggable.detach();
        that._indicator && that._indicator.detach()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "onDragging":
            case "onChanged":
            case "itemRender":
            case "groupSelector":
            case "itemSelector":
            case "itemContainerSelector":
            case "sourceClass":
            case "targetClass":
            case "dragClass":
            case "allowDragging":
            case "groupFilter":
            case "useIndicator":
                this._attachEventHandlers();
                break;
            case "direction":
                break;
            default:
                this.callBase(args)
        }
    },
    _useTemplates: function() {
        return false
    }
});
exports.Sortable = Sortable;
(0, _component_registrator.default)("dxSortableOld", Sortable);
var _default = {
    Sortable: Sortable
};
exports.default = _default;
