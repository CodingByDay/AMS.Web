﻿/**
* DevExpress Analytics (core\_bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import * as ko from 'knockout';
import { KeyboardEnum } from '../property-grid/widgets/internal/_utils';
import { getTemplate } from '../property-grid/widgets/templateUtils';
import { addDisposeCallback } from '../serializer/_internal';
import { extend } from '../serializer/_utils';
import { DragDropHandler } from './dragDrop/_dragDropHandler';
import { KeyDownHandlersManager } from './tools/_keyboardHelper';
import { cssTransform } from './utils/_utils';
import { Selectable } from './internal/selectable';
import { Draggable } from './internal/_draggable';
import { convertToCssPixelUnits } from './internal/_utils';
ko.bindingHandlers['cssArray'] = {
    'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        for (var i = 0; i < value.length; i++) {
            ko.bindingHandlers['css'].update(element, () => { return value[i]; });
        }
    }
};
ko.bindingHandlers['selectable'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var values = valueAccessor();
        var selection = ko.unwrap(values.selection), options = extend({ filter: '.dxd-selectable', distance: 1 }, ko.unwrap(values), {
            selecting: function (event, selectionElement) {
                var _event = { control: ko.dataFor(selectionElement), cancel: false, ctrlKey: event.ctrlKey };
                selection.selecting(_event);
                if (_event.cancel) {
                    $.fn.constructor(selectionElement).removeClass('ui-selecting');
                }
            },
            start: (event, element) => {
                selection.clickHandler(null, event);
                selection.expectClick = true;
                selection.started = true;
            },
            stop: () => {
                selection.started = false;
                setTimeout(() => { selection.expectClick = false; }, 100);
                selection.applySelection();
            },
            unselecting: function (event, selectionElement) {
                selection.unselecting(ko.dataFor(selectionElement));
            }
        });
        const selectable = new Selectable(element, options);
        var subscriptions = [];
        if (selection.disabled && ko.isSubscribable(selection.disabled)) {
            subscriptions.push(selection.disabled.subscribe((newVal) => {
                return Selectable.disabled = newVal;
            }));
        }
        addDisposeCallback(element, () => {
            selectable.dispose();
            element = null;
            subscriptions.forEach(x => x.dispose());
        });
    }
};
ko.bindingHandlers['updateTop'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var value = valueAccessor();
        var $element = $.fn.constructor(element);
        var updateTop = (value) => {
            var scaleY = element.getBoundingClientRect().height / element.offsetHeight;
            var top = (value === 0 || !!value) ? value : ($element.prev().position().top / scaleY) + $element.prev().outerHeight();
            $element.css('top', top + 'px');
        };
        var subscription = value.subscribe((newVal) => {
            updateTop(newVal);
        });
        updateTop(value());
        addDisposeCallback(element, function () {
            subscription.dispose();
        });
    }
};
function _getElementOffset(element, containment) {
    if (!element)
        return { top: 0, left: 0 };
    const containmentElement = _getContainment(element, containment);
    return {
        top: containmentElement.offset().top,
        left: containmentElement.offset().left
    };
}
function _getContainment(parent, containment) {
    return (containment === 'parent' || containment === parent) ? parent : parent.find(containment);
}
function _getBoundary($parent, $containment) {
    if (!$parent || !$containment)
        return null;
    var top = $parent.offset().top - $containment.offset().top;
    var left = $parent.offset().left - $containment.offset().left;
    return {
        left: left,
        top: top,
        right: left + $containment.width(),
        bottom: top + $containment.height()
    };
}
ko.bindingHandlers['draggable'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var values = valueAccessor();
        if (!values)
            return;
        var $element = $.fn.constructor(element), $parent = values.parent && values.parent() || $element.closest('.dx-designer-viewport'), containment = values.containment || '.dxrd-ghost-container', $viewport, $ghostContainerOffset, $containmentOffset, initialScroll = { left: 0, top: 0 }, attachDelta = (ui) => {
            ui['delta'] = {
                left: (($ghostContainerOffset && $ghostContainerOffset.left || 0) - $containmentOffset.left),
                top: ($ghostContainerOffset && $ghostContainerOffset.top || 0) - $containmentOffset.top
            };
            ui['scroll'] = {
                left: $viewport.scrollLeft() - initialScroll.left,
                top: $viewport.scrollTop() - initialScroll.top
            };
        }, options = extend({}, ko.unwrap(values), {
            start: function (event, uiElement) {
                DragDropHandler.started(true);
                $viewport = $parent.find('.dxrd-viewport');
                $ghostContainerOffset = $parent.find('.dxrd-ghost-container').offset();
                $containmentOffset = _getContainment($parent, containment).offset();
                initialScroll.left = $viewport.scrollLeft();
                initialScroll.top = $viewport.scrollTop();
                values.startDrag && values.startDrag(ko.dataFor(uiElement));
            },
            stop: function (event, uiElement) {
                attachDelta(uiElement);
                values.stopDrag(uiElement, ko.dataFor(uiElement), event);
                DragDropHandler.started(false);
            },
            drag: function (event, uiElement) {
                attachDelta(uiElement);
                values.drag && values.drag(event, uiElement, ko.dataFor(uiElement));
            },
            helper: function (event, uiElement) {
                let $container;
                var parentOffset = _getElementOffset($parent, options.containment);
                if (values.helper) {
                    $container = values.helper(ko.dataFor(uiElement), event);
                    if ($container) {
                        $container.css({ 'position': 'absolute' });
                        $container[0].dataset.startLeftPosition = convertToCssPixelUnits(event.pageX - parentOffset.left);
                        $container[0].dataset.startTopPosition = convertToCssPixelUnits(event.pageY - parentOffset.top);
                        return $container;
                    }
                }
                var templateHtml = getTemplate(bindingContext.$root.dragHelperContent.template);
                var draggableModel = ko.dataFor(uiElement);
                $container = $.fn.constructor(templateHtml).css({ 'display': values.helper ? 'block' : 'none', 'position': 'absolute' });
                $container[0].dataset.startLeftPosition = convertToCssPixelUnits(draggableModel.absolutePosition ? draggableModel.absolutePosition.x() : event.pageX - parentOffset.left);
                $container[0].dataset.startTopPosition = convertToCssPixelUnits(draggableModel.absolutePosition ? draggableModel.absolutePosition.y() : event.pageY - parentOffset.top);
                $container.prependTo(_getContainment($parent, options.containment));
                ko.applyBindingsToDescendants(bindingContext.$root.dragHelperContent, $container[0]);
                return $container;
            }
        });
        options.containment = _getContainment($parent, options.containment);
        setDragOffsetMode(element);
        var draggable = new Draggable(element, options);
        addDisposeCallback(element, () => {
            draggable.dispose();
            element = null;
        });
    }
};
var trackCursorData = 'dxd-track-cursor-data';
var trackCursorClass = 'dxd-track-cursor';
var trackCursorSelector = '.' + trackCursorClass;
var dragHelperLineClass = 'dxrd-drag-helper-item';
ko.bindingHandlers['trackCursor'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $.fn.constructor(element);
        $element.addClass(trackCursorClass);
        var value = valueAccessor();
        var recalculateBounds = false;
        if (value['recalculateBounds']) {
            recalculateBounds = value['recalculateBounds'];
            value = value['underCursor'];
        }
        var bounds = element.getBoundingClientRect(), body = document.body, docElem = document.documentElement, overHandler = (event) => {
            if (!(bindingContext.$root.selection.started && bindingContext.$root.resizeHandler.started)) {
                if (!value().isNotDropTarget) {
                    bindingContext.$root.selection.dropTarget = bindingContext.$data;
                    event.stopPropagation();
                }
            }
        }, enterHandler = (event) => {
            value(extend(value(), { isOver: true }));
            if (!(bindingContext.$root.selection.started && bindingContext.$root.resizeHandler.started)) {
                bounds = element.getBoundingClientRect();
            }
        }, leaveHandler = (event) => {
            value(extend(value(), { isOver: false }));
        }, handler = (event) => {
            if (recalculateBounds)
                bounds = element.getBoundingClientRect();
            if (!(bindingContext.$root.selection.started && bindingContext.$root.resizeHandler.started)) {
                var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop, scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft, clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, y = event.pageY - (bounds.top + scrollTop - clientTop), x = event.pageX - (bounds.left + scrollLeft - clientLeft);
                value(extend(value(), { x: x, y: y }));
            }
        };
        element.addEventListener('mousemove', handler);
        !recalculateBounds && element.addEventListener('mouseenter', enterHandler);
        element.addEventListener('mouseover', overHandler);
        element.addEventListener('mouseleave', leaveHandler);
        element.addEventListener('dragover', handler);
        addDisposeCallback(element, function () {
            element.removeEventListener('dragover', handler);
            element.removeEventListener('mousemove', handler);
            element.removeEventListener('mouseover', overHandler);
            element.removeEventListener('mouseleave', leaveHandler);
            !recalculateBounds && element.removeEventListener('mouseenter', enterHandler);
            $element.removeClass(trackCursorClass);
        });
    }
};
ko.bindingHandlers['templates'] = {
    init: function (element, valueAccessor) {
        var templateHtml = $.fn.constructor(valueAccessor()).text(), $templateHtml = $.fn.constructor(templateHtml);
        $.fn.constructor(element).append($templateHtml);
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['zoom'] = {
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor() || {});
        for (var i = 0; i < cssTransform.length; i++) {
            element.style[cssTransform[i]] = 'scale(' + (value) + ')';
        }
        $.fn.constructor(element).addClass('dxrd-transform-origin-left-top');
    }
};
ko.bindingHandlers['keyDownActions'] = (() => {
    var handlersManager = new KeyDownHandlersManager(window);
    return {
        init: function (element, valueAccessor) {
            var actionLists = valueAccessor(), handler = (e) => { actionLists.processShortcut(ko.unwrap(actionLists.toolbarItems), e); };
            if (ko.isSubscribable(actionLists.enabled)) {
                var subscribe = actionLists.enabled.subscribe((newVal) => {
                    if (newVal)
                        handlersManager.bindHandler(element, handler);
                });
                addDisposeCallback(element, () => subscribe.dispose());
            }
            if (ko.unwrap(actionLists.enabled))
                handlersManager.bindHandler(element, handler);
        }
    };
})();
ko.bindingHandlers['accessibilityKeyboardHelper'] = (() => {
    return {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var handlersManager = valueAccessor();
            if (handlersManager && (bindingContext.$root.accessibilityCompliant || handlersManager.accessibilityCompliantEnabled)) {
                var subscription = ko.bindingEvent.subscribe(element, 'childrenComplete', function () {
                    handlersManager.bindHandler(element);
                });
                addDisposeCallback(element, function () {
                    subscription.dispose();
                });
            }
        }
    };
})();
ko.bindingHandlers['dxAction'] = (() => {
    return {
        init: (element, valueAccessor) => {
            var values = valueAccessor();
            var clickHandler = function (e) {
                values.action.call(values.model, values.model, e);
            };
            var keyPressHandler = function (e) {
                if (e.key == KeyboardEnum.Enter || e.key == KeyboardEnum.Space) {
                    values.action.call(values.model, values.model, e);
                }
            };
            element.addEventListener('click', clickHandler);
            element.addEventListener('keydown', keyPressHandler);
            addDisposeCallback(element, function () {
                element.removeEventListener('click', clickHandler);
                element.removeEventListener('keydown', keyPressHandler);
            });
        }
    };
})();
ko.extenders.dxdnum = function (target, value) {
    target.subscribe((newValue) => {
        newValue = newValue || 0;
        if (!isNaN(value.max)) {
            target(Math.min(newValue, value.max));
        }
        else if (!isNaN(value.min)) {
            target(Math.max(newValue, value.min));
        }
        else {
            target(newValue);
        }
    });
    return target;
};
function setDragOffsetMode(element) {
    const startDragWithOffset = element.parentElement.classList.contains('dxrd-toolbox-item');
    if (startDragWithOffset) {
        element.dataset.startDragWithOffset = 'true';
    }
}
