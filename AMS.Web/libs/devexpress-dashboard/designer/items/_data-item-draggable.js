﻿/**
* DevExpress Dashboard (_data-item-draggable.js)
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
exports.DragProcessor = void 0;
const events_1 = require("devextreme/events");
const $ = require("jquery");
const ko = require("knockout");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
class DragProcessor {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.CSS_DRAG_IN_PROGRESS = 'dx-dashboard-collection-drag';
        this.CSS_HIGHLIGHT_PLACEHOLDER = 'dx-state-hovered';
        this.COLLECTION_SELECTOR = '.dx-dashboard-collection';
        this.TARGET_SELECTOR = '.dx-dashboard-drop-target';
        this.EVENT_NAMESPACE = '.dragInGroup';
        this.currentDrag = null;
        this.state = 'pending';
        this.setDataItemsPositions = (sourceCollectionRoot) => {
            var elementData = ko.dataFor(sourceCollectionRoot);
            $.fn.constructor(sourceCollectionRoot).find('.dx-dashboard-data-item').each((index, item) => {
                if (elementData.supportGroups) {
                    var groupHolder = ko.contextFor(item).$parents[1], groupSize = groupHolder.items === undefined
                        ? 1
                        : groupHolder.items.length, firstItemInGroup = groupHolder.items ? groupHolder.items[0] : ko.dataFor(item);
                    item.setAttribute('data-position', (groupHolder.position === undefined
                        ? elementData['groups'] ? elementData['groups']().length : 0
                        : groupHolder.position).toString());
                    item.setAttribute('data-array-position', elementData.items().indexOf(firstItemInGroup).toString());
                    item.setAttribute('data-group-size', groupSize.toString());
                }
                else {
                    item.setAttribute('data-position', '0');
                    item.setAttribute('data-array-position', '0');
                    item.setAttribute('data-group-size', '0');
                }
            });
            this.currentDrag.itemPosition = Number(this.currentDrag.itemElement.getAttribute('data-position'));
            var isOlap = this.currentDrag.sourceCollection.isOlap();
            $.fn.constructor(this.rootElement).find(this.COLLECTION_SELECTOR).each((_, collectionElement) => {
                var isOtherCollection = ko.dataFor(collectionElement) !== ko.dataFor(sourceCollectionRoot);
                var arrayPosition = 0;
                $.fn.constructor(collectionElement).find(this.TARGET_SELECTOR).each((index, dragTargetElement) => {
                    var elementData = ko.dataFor(dragTargetElement), elementContext = ko.contextFor(dragTargetElement), groupSize = (elementData.items && elementData.items.length) || 0;
                    dragTargetElement.setAttribute('data-position', index.toString());
                    dragTargetElement.setAttribute('data-array-position', arrayPosition.toString());
                    arrayPosition += groupSize;
                    var result = isOtherCollection
                        ? !isOlap
                        : this.checkItemIsDraggableToPosition(this.currentDrag.itemPosition, index);
                    $.fn.constructor(dragTargetElement).toggleClass('dx-state-active', result);
                });
            });
        };
        this.processHtmlDragEvent = () => {
            this.currentDrag.originalEvent.dataTransfer.effectAllowed = 'move';
            this.currentDrag.originalEvent.dataTransfer.setData('text', this.currentDrag.itemPosition.toString());
            let itemElement = this.currentDrag.itemElement;
            var groupElement = $.fn.constructor(itemElement).parents('.dx-dashboard-hierarchical-group')[0], uiFeedbackElement = groupElement || itemElement;
            var crt = uiFeedbackElement.cloneNode(true);
            crt.style.position = 'absolute';
            crt.style.top = '-100000px';
            crt.style.right = '-100000px';
            crt.className = crt.className + ' dx-dashboard-cloned-copy';
            crt.style.width = $.fn.constructor(itemElement).width() + 'px';
            this.currentDrag.clonedElement = crt;
            var container = $.fn.constructor(uiFeedbackElement).parents('.dx-dashboard-property-grid')[0];
            if (container)
                container.appendChild(crt);
            var event = this.currentDrag.originalEvent;
            if (event.dataTransfer['setDragImage']) {
                event.dataTransfer.setDragImage(crt, event.offsetX === undefined ? event.layerX : event.offsetX, event.offsetY === undefined ? event.layerY : event.offsetY);
            }
        };
        this.finishDrag = () => {
            events_1.off(this.rootElement, this.EVENT_NAMESPACE);
            $.fn.constructor(document).off(this.EVENT_NAMESPACE);
            this.rootElement.classList.remove(this.CSS_DRAG_IN_PROGRESS);
            $.fn.constructor(this.rootElement).parents('.dx-overlay-content').removeClass(this.CSS_DRAG_IN_PROGRESS).addClass('dx-state-hover');
            $.fn.constructor(this.rootElement).find(this.TARGET_SELECTOR).removeClass(this.CSS_HIGHLIGHT_PLACEHOLDER);
            this.currentDrag.itemElement.classList.remove('dx-dashboard-drag-in-progress');
            var clonedElement = this.currentDrag.clonedElement;
            if (clonedElement && clonedElement.parentNode) {
                clonedElement.parentNode.removeChild(clonedElement);
            }
            this.currentDrag.clonedElement = null;
            this.state = 'pending';
        };
    }
    startDrag(ev) {
        this.currentDrag = {
            originalEvent: ev.originalEvent,
            itemPosition: -1,
            clonedElement: null,
            itemElement: ev.originalEvent.target,
            sourceCollection: ko.dataFor($.fn.constructor(ev.target).parents(this.COLLECTION_SELECTOR)[0])
        };
        let sourceCollectionElement = $.fn.constructor(this.currentDrag.originalEvent.target).parents(this.COLLECTION_SELECTOR).get(0);
        this.state = 'dragging';
        this.rootElement.classList.add(this.CSS_DRAG_IN_PROGRESS);
        $.fn.constructor(this.rootElement).parents('.dx-overlay-content').addClass(this.CSS_DRAG_IN_PROGRESS);
        this.setDataItemsPositions(sourceCollectionElement);
        this.processHtmlDragEvent();
        this.currentDrag.itemElement.classList.add('dx-dashboard-drag-in-progress');
        events_1.on(this.rootElement, 'dragover' + this.EVENT_NAMESPACE, this.TARGET_SELECTOR, {}, (ev) => {
            var originalEvent = ev.originalEvent, targetItem = ko.dataFor(originalEvent.target), position = Number(ev.currentTarget.getAttribute('data-position'));
            if (originalEvent.target.parentNode['className'].indexOf('dx-state-active') !== -1) {
                ev.currentTarget.classList.add(this.CSS_HIGHLIGHT_PLACEHOLDER);
                originalEvent.dataTransfer.dropEffect = 'move';
            }
            else {
                originalEvent.dataTransfer.dropEffect = 'none';
            }
            return false;
        });
        events_1.on(this.rootElement, 'dragleave' + this.EVENT_NAMESPACE, this.TARGET_SELECTOR, {}, (ev) => {
            ev.currentTarget.classList.remove(this.CSS_HIGHLIGHT_PLACEHOLDER);
        });
        events_1.on(this.rootElement, 'drop' + this.EVENT_NAMESPACE, this.TARGET_SELECTOR, {}, (ev) => {
            var sourceCollection = this.currentDrag.sourceCollection, targetCollection = ko.dataFor($.fn.constructor(ev.target).parents(this.COLLECTION_SELECTOR)[0]), originalPosition = Number(this.currentDrag.itemElement.getAttribute('data-array-position')), newPosition = Number(ev.currentTarget.getAttribute('data-array-position')), groupSize = Number(this.currentDrag.itemElement.getAttribute('data-group-size'));
            this.interchange(sourceCollection.items, targetCollection !== sourceCollection ? targetCollection : null, originalPosition, newPosition, groupSize);
            this.finishDrag();
            return false;
        });
        events_1.on(document, 'dragend' + this.EVENT_NAMESPACE, () => {
            this.finishDrag();
        });
        return true;
    }
    checkItemIsDraggableToPosition(itemIndex, placeholderIndex) {
        return (placeholderIndex < itemIndex) || (placeholderIndex > itemIndex + 1);
    }
    interchange(items, newOwner, sourceIndex, placeholderIndex, groupSize) {
        if (!groupSize) {
            groupSize = 1;
        }
        if (null === newOwner) {
            if (placeholderIndex > sourceIndex) {
                placeholderIndex--;
                for (var i = 0; i < groupSize; i++) {
                    var item = items()[sourceIndex];
                    items.remove(item);
                    items.splice(placeholderIndex, 0, item);
                }
            }
            else {
                for (var i = 0; i < groupSize; i++) {
                    var item = items()[sourceIndex + i];
                    items.remove(item);
                    items.splice(placeholderIndex + i, 0, item);
                }
            }
        }
        else {
            for (var i = 0; i < groupSize; i++) {
                item = items()[sourceIndex];
                newOwner.relocateItem(item, placeholderIndex + i);
                items.remove(item);
            }
        }
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DragProcessor.prototype, "interchange", null);
exports.DragProcessor = DragProcessor;
ko.bindingHandlers['dx-dashboard-container-draggable'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let processor = new DragProcessor(element);
        events_1.on(element, 'dragstart', (ev) => {
            processor.startDrag(ev);
        });
    }
};
