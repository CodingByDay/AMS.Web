﻿/**
* DevExpress Analytics (core\dragDrop\_wizardDragDropHandler.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { DragDropHandler } from './_dragDropHandler';
import { Rectangle } from '../elements/rectangle';
import { getTemplate } from '../../property-grid/widgets/templateUtils';
export class WizardDragDropHandler extends DragDropHandler {
    constructor(options) {
        super(null, null, ko.observable(null), null, options.dragHelperContent);
        this.parent = () => $.fn.constructor(options.parent);
        this.containment = options.containment;
        this._target = options.target;
        this._addHandler = options.addHandler;
    }
    helper(draggable, event) {
        this._dropTarget = null;
        var item = draggable;
        var target = $.fn.constructor(event.target).closest('.ui-draggable');
        var rect = new Rectangle(6, 6, target.width(), target.height());
        rect.className = 'dxrd-image-ghost-report';
        this.dragHelperContent.reset();
        this.dragHelperContent.setContent(rect, {
            template: 'dxrd-drag-helper-source-reorder-treelist',
            data: {
                imageClassName: item.imageClassName,
                imageTemplateName: item.imageTemplateName,
                text: item.text
            }
        });
        var templateHtml = getTemplate(this.dragHelperContent.template);
        var $container = $.fn.constructor(templateHtml).css({ 'display': 'block' });
        $container.prependTo(this.parent());
        ko.applyBindingsToDescendants(this.dragHelperContent, $container[0]);
        return $container;
    }
    doStopDrag(uiElement, _) {
        this.dragHelperContent.reset();
        if (this._dropTarget) {
            this._addHandler(this._dropTarget, ko.dataFor(uiElement), this._getAbsoluteSurfacePosition(uiElement));
        }
    }
    drag(event, ui) {
        var $target = $.fn.constructor(this.getTarget(event));
        var page = $target.closest(this._target);
        this._dropTarget = null;
        if (page.length && (!this._target || $target.closest(this._target)[0])) {
            this._dropTarget = ko.dataFor(page.get(0));
        }
    }
}
