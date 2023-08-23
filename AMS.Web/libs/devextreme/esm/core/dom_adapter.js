/**
 * DevExtreme (esm/core/dom_adapter.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import injector from "./utils/dependency_injector";
import {
    noop
} from "./utils/common";
import {
    getShadowElementsFromPoint
} from "./utils/shadow_dom";
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var DOCUMENT_NODE = 9;
var DOCUMENT_FRAGMENT_NODE = 11;
var nativeDOMAdapterStrategy = {
    querySelectorAll: (element, selector) => element.querySelectorAll(selector),
    elementMatches(element, selector) {
        var matches = element.matches || element.matchesSelector || element.mozMatchesSelector || element.msMatchesSelector || element.oMatchesSelector || element.webkitMatchesSelector || (selector => {
            var doc = element.document || element.ownerDocument;
            if (!doc) {
                return false
            }
            var items = this.querySelectorAll(doc, selector);
            for (var i = 0; i < items.length; i++) {
                if (items[i] === element) {
                    return true
                }
            }
        });
        return matches.call(element, selector)
    },
    createElement(tagName, context) {
        context = context || this._document;
        return context.createElement(tagName)
    },
    createElementNS(ns, tagName, context) {
        context = context || this._document;
        return context.createElementNS(ns, tagName)
    },
    createTextNode(text, context) {
        context = context || this._document;
        return context.createTextNode(text)
    },
    createAttribute(text, context) {
        context = context || this._document;
        return context.createAttribute(text)
    },
    isNode: element => element && "object" === typeof element && "nodeType" in element && "nodeName" in element,
    isElementNode: element => element && element.nodeType === ELEMENT_NODE,
    isTextNode: element => element && element.nodeType === TEXT_NODE,
    isDocument: element => element && element.nodeType === DOCUMENT_NODE,
    isDocumentFragment: element => element && element.nodeType === DOCUMENT_FRAGMENT_NODE,
    removeElement(element) {
        var parentNode = element && element.parentNode;
        if (parentNode) {
            parentNode.removeChild(element)
        }
    },
    insertElement(parentElement, newElement, nextSiblingElement) {
        if (parentElement && newElement && parentElement !== newElement) {
            if (nextSiblingElement) {
                parentElement.insertBefore(newElement, nextSiblingElement)
            } else {
                parentElement.appendChild(newElement)
            }
        }
    },
    getAttribute: (element, name) => element.getAttribute(name),
    setAttribute(element, name, value) {
        if ("style" === name) {
            element.style.cssText = value
        } else {
            element.setAttribute(name, value)
        }
    },
    removeAttribute(element, name) {
        element.removeAttribute(name)
    },
    setProperty(element, name, value) {
        element[name] = value
    },
    setText(element, text) {
        if (element) {
            element.textContent = text
        }
    },
    setClass(element, className, isAdd) {
        if (1 === element.nodeType && className) {
            isAdd ? element.classList.add(className) : element.classList.remove(className)
        }
    },
    setStyle(element, name, value) {
        element.style[name] = value || ""
    },
    _document: "undefined" === typeof document ? void 0 : document,
    getDocument() {
        return this._document
    },
    getActiveElement(element) {
        var activeElementHolder = this.getRootNode(element);
        return activeElementHolder.activeElement
    },
    getRootNode(element) {
        var _element$getRootNode, _element$getRootNode2;
        return null !== (_element$getRootNode = null === element || void 0 === element ? void 0 : null === (_element$getRootNode2 = element.getRootNode) || void 0 === _element$getRootNode2 ? void 0 : _element$getRootNode2.call(element)) && void 0 !== _element$getRootNode ? _element$getRootNode : this._document
    },
    getBody() {
        return this._document.body
    },
    createDocumentFragment() {
        return this._document.createDocumentFragment()
    },
    getDocumentElement() {
        return this._document.documentElement
    },
    getLocation() {
        return this._document.location
    },
    getSelection() {
        return this._document.selection
    },
    getReadyState() {
        return this._document.readyState
    },
    getHead() {
        return this._document.head
    },
    hasDocumentProperty(property) {
        return property in this._document
    },
    listen(element, event, callback, options) {
        if (!element || !("addEventListener" in element)) {
            return noop
        }
        element.addEventListener(event, callback, options);
        return () => {
            element.removeEventListener(event, callback)
        }
    },
    elementsFromPoint(x, y, element) {
        var activeElementHolder = this.getRootNode(element);
        if (activeElementHolder.host) {
            return getShadowElementsFromPoint(x, y, activeElementHolder)
        }
        return activeElementHolder.elementsFromPoint(x, y)
    }
};
export default injector(nativeDOMAdapterStrategy);
