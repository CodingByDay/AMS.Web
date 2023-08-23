﻿/**
* DevExpress Dashboard (_render-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeObjects = exports.RenderHelper = void 0;
const scroll_view_1 = require("devextreme/ui/scroll_view");
const $ = require("jquery");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _cacheable_1 = require("../_cacheable");
class RenderHelper {
    static html(element, content, encodeHtml) {
        if (encodeHtml) {
            element.innerText = content;
        }
        else {
            element.innerHTML = content;
        }
    }
    static rectangleHtml(color, width, height, rightMargin = '0px') {
        var w = width || 10, h = height || 10;
        var div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.width = w + 'px';
        div.style.height = h + 'px';
        div.style.backgroundColor = color;
        div.style.padding = '0px';
        div.style.margin = '0px';
        div.style.marginRight = rightMargin;
        return div;
    }
    static getActualBorder($element) {
        return {
            width: $element.outerWidth() - $element.width(),
            height: $element.outerHeight() - $element.height()
        };
    }
    static getActualSize($element, collapse = false) {
        if (!$element || $element.length === 0) {
            return { width: 0, height: 0 };
        }
        var values = [];
        if (collapse) {
            $.each($element.children(), (index, child) => {
                values.push(child.style.display);
                child.style.display = 'none';
            });
        }
        try {
            var border = this.getActualBorder($element), isBorderBox = $element.css('box-sizing') == 'border-box';
            return {
                width: $element.width() - (isBorderBox ? 0 : border.width),
                height: $element.height() - (isBorderBox ? 0 : border.height)
            };
        }
        finally {
            if (collapse) {
                $.each($element.children(), (index, child) => {
                    child.style.display = values[index];
                });
            }
        }
    }
    static getDefaultPalette() {
        return ['#5F8195', '#B55951', '#AEAF69', '#915E64', '#758E6D', '#85688C', '#91B9C7', '#E49B86'];
    }
    static getScrollable(element) {
        return scroll_view_1.default.getInstance(element);
    }
    static updateScrollable(element) {
        var scrollable = this.getScrollable(element);
        if (scrollable) {
            scrollable.update();
        }
    }
    static wrapScrollable(container, parentOverflow, direction) {
        var scrollableContent = undefined, scrollableOptions = {
            bounceEnabled: false,
            showScrollbar: 'onHover',
            direction: direction
        };
        if (container) {
            var scrollableInstance = scroll_view_1.default.getInstance(container);
            if (scrollableInstance) {
                scrollableInstance.option(scrollableOptions);
            }
            else {
                scrollableInstance = new scroll_view_1.default(container, scrollableOptions);
            }
            scrollableContent = _jquery_helpers_1.$unwrap(scrollableInstance.content());
        }
        return scrollableContent;
    }
    static getElementBox(element) {
        var $fakeContainer = $.fn.constructor('<div>', {
            css: {
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: 'hidden',
                overflow: 'hidden'
            }
        }).appendTo($.fn.constructor(RenderHelper.getThemeBaseElement()));
        $fakeContainer.append(element);
        try {
            return {
                width: $fakeContainer.outerWidth(),
                height: $fakeContainer.outerHeight()
            };
        }
        finally {
            $fakeContainer.remove();
        }
    }
    static processElement($element, processElement) {
        var $fakeContainer = $.fn.constructor('<div>', {
            css: {
                position: 'absolute',
                top: 0,
                left: 0,
                visibility: 'hidden',
                overflow: 'hidden'
            }
        }).appendTo($.fn.constructor(RenderHelper.getThemeBaseElement()));
        $fakeContainer.append($element);
        try {
            return processElement();
        }
        finally {
            $fakeContainer.remove();
        }
    }
    static getElementBoxFloat(e) {
        var style = window.getComputedStyle(e);
        var boxSizing = style['box-sizing'];
        var rect = e.getBoundingClientRect();
        var size = {
            width: rect.width + parseFloat(style.marginLeft) + parseFloat(style.marginRight),
            height: rect.height + parseFloat(style.marginTop) + parseFloat(style.marginBottom)
        };
        if (boxSizing === 'content-box' || boxSizing === 'padding-box') {
            size.width += parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
            size.height += parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
            if (boxSizing === 'content-box') {
                size.width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
                size.height += parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
            }
        }
        return size;
    }
    static widgetIncidentOccurred(e) {
    }
    static getBorderSizeByClasses(classNames) {
        if (classNames && classNames.length > 0) {
            var fakeObjs = createFakeObjects(classNames, { width: 100, height: 100 });
            try {
                return RenderHelper.getActualBorder(fakeObjs.lastElement);
            }
            finally {
                fakeObjs.remove();
            }
        }
        else {
            return {
                width: 0,
                height: 0
            };
        }
    }
}
RenderHelper.getThemeBaseElement = () => document.body;
__decorate([
    _cacheable_1.cacheable('getBorderSizeByClasses')
], RenderHelper, "getBorderSizeByClasses", null);
exports.RenderHelper = RenderHelper;
function createFakeObjects(classNames, cssOptions) {
    var firstElement, prevElement, currElement;
    $.each(classNames, function (_, name) {
        currElement = $.fn.constructor('<div>', {
            css: Object.assign({ position: 'absolute', top: 0, left: 0, visibility: 'hidden', overflow: 'hidden' }, cssOptions)
        });
        currElement.appendTo(prevElement ? prevElement : $.fn.constructor('body'));
        currElement.addClass(name);
        prevElement = currElement;
        if (!firstElement)
            firstElement = currElement;
    });
    return {
        firstElement: firstElement,
        lastElement: currElement,
        remove: function () {
            firstElement.remove();
        }
    };
}
exports.createFakeObjects = createFakeObjects;
