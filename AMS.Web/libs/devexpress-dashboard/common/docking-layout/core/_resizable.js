﻿/**
* DevExpress Dashboard (_resizable.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devices_1 = require("devextreme/core/devices");
const events_1 = require("devextreme/events");
const eventUtils = require("devextreme/events/utils");
const $ = require("jquery");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const mouseMoveHandlerKey = 'dxpointermove.dx-ko-layout-resize';
const mouseDownHandlerKey = 'dxpointerdown';
const mouseUpHandlerKey = 'dxpointerup.dx-ko-layout-resize';
function skipDevice(ev) {
    return devices_1.default.real().ios && eventUtils.isMouseEvent(ev);
}
function createHResizeHandler(layoutItem, getWidgetContainer, $element, $ghostbar) {
    return function (ev) {
        const parents = $element.parents('.dx-layout');
        parents.addClass('dx-layout-drag-in-progress');
        layoutItem.resizeStarted && layoutItem.resizeStarted();
        ev.preventDefault();
        var currentWidth = 0;
        var ghostOffsetX = ev.offsetX ? ev.offsetX : 0;
        var originalX = ev.pageX;
        const $ghostbar = _jquery_helpers_1.createJQueryElement('<div>', {
            class: 'dx-ghostbar-e',
            css: {
                position: 'fixed',
                height: $element.outerHeight(),
                top: $element.offset().top,
                left: originalX - ghostOffsetX
            }
        }).appendTo(getWidgetContainer());
        events_1.on(document, mouseMoveHandlerKey, function (e) {
            if (!skipDevice(e)) {
                var newWidth = layoutItem.width() + e.pageX - originalX;
                if (!layoutItem.isValidWidth || layoutItem.isValidWidth(newWidth)) {
                    currentWidth = newWidth;
                    $ghostbar.css('left', e.pageX - ghostOffsetX);
                }
            }
            e.preventDefault();
            return false;
        });
        events_1.on(document, mouseUpHandlerKey, function (e) {
            setTimeout(() => layoutItem.width(currentWidth), 1);
            $ghostbar.remove();
            parents.removeClass('dx-layout-drag-in-progress');
            events_1.off(document, mouseMoveHandlerKey);
            events_1.off(document, mouseUpHandlerKey);
            layoutItem.resizeCompleted && layoutItem.resizeCompleted();
            e.preventDefault();
        });
    };
}
function createVResizeHandler(layoutItem, getWidgetContainer, $element, $ghostbar) {
    return function (ev) {
        const parents = $element.parents('.dx-layout');
        parents.addClass('dx-layout-drag-in-progress');
        layoutItem.resizeStarted && layoutItem.resizeStarted();
        ev.preventDefault();
        var currentHeight = 0;
        var ghostOffsetY = ev.offsetY ? ev.offsetY : 0;
        var originalY = ev.pageY;
        const $ghostbar = _jquery_helpers_1.createJQueryElement('<div>', {
            class: 'dx-ghostbar-s',
            css: {
                position: 'fixed',
                width: $element.outerWidth(),
                left: $element.offset().left,
                top: originalY - ghostOffsetY
            }
        }).appendTo(getWidgetContainer());
        events_1.on(document, mouseMoveHandlerKey, function (e) {
            if (!skipDevice(e)) {
                var newHeight = layoutItem.height() + e.pageY - originalY;
                if (!layoutItem.isValidHeight || layoutItem.isValidHeight(newHeight)) {
                    currentHeight = newHeight;
                    $ghostbar.css('top', e.pageY - ghostOffsetY);
                }
            }
            return false;
        });
        events_1.on(document, mouseUpHandlerKey, function (e) {
            setTimeout(() => layoutItem.height(currentHeight), 1);
            $ghostbar.remove();
            parents.removeClass('dx-layout-drag-in-progress');
            events_1.off(document, mouseMoveHandlerKey);
            events_1.off(document, mouseUpHandlerKey);
            layoutItem.resizeCompleted && layoutItem.resizeCompleted();
            e.preventDefault();
        });
    };
}
ko.bindingHandlers['dx-ko-resizable'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        const { layoutItem, getWidgetContainer } = valueAccessor();
        var $element = $.fn.constructor(element);
        var subscriptions = [];
        var unsubscribe = () => {
            subscriptions.forEach(subscr => {
                subscr.subscribable.dispose();
                events_1.off(subscr.dragbar.get(0), mouseDownHandlerKey);
                subscr.dragbar.remove();
            });
            subscriptions.splice(0, subscriptions.length);
        };
        var createResizeDragBars = (resizeHandles) => {
            unsubscribe();
            if (resizeHandles === 'e') {
                var $dragBar = $.fn.constructor('<div>', {
                    class: 'dx-dragbar-e',
                    ondragover: 'event.stopPropagation();',
                    ondrop: 'event.stopPropagation();',
                    css: {
                        height: layoutItem.height()
                    }
                }).appendTo($element);
                var subscr = layoutItem.height.subscribe(val => {
                    $dragBar.css('height', val);
                });
                events_1.on($dragBar.get(0), mouseDownHandlerKey, createHResizeHandler(layoutItem, getWidgetContainer, $element, $dragBar));
                subscriptions.push({
                    subscribable: subscr,
                    dragbar: $dragBar
                });
            }
            else if (resizeHandles === 's') {
                var $dragBar = $.fn.constructor('<div>', {
                    class: 'dx-dragbar-s',
                    ondragover: 'event.stopPropagation();',
                    ondrop: 'event.stopPropagation();',
                    css: {
                        width: layoutItem.width()
                    }
                }).appendTo($element);
                var subscr = layoutItem.width.subscribe(val => {
                    $dragBar.css('width', val);
                });
                events_1.on($dragBar.get(0), mouseDownHandlerKey, createVResizeHandler(layoutItem, getWidgetContainer, $element, $dragBar));
                subscriptions.push({
                    subscribable: subscr,
                    dragbar: $dragBar
                });
            }
        };
        if (ko.isSubscribable(layoutItem.resizeHandles)) {
            (layoutItem.resizeHandles).subscribe(createResizeDragBars);
        }
        createResizeDragBars(layoutItem.resizeHandles());
        ko.utils.domNodeDisposal.addDisposeCallback(element, unsubscribe);
    }
};
