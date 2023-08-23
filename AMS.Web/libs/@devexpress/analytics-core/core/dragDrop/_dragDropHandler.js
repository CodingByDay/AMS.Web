﻿/**
* DevExpress Analytics (core\dragDrop\_dragDropHandler.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
import { Size } from '../elements/size';
import { findSurface } from '../internal/_surfaceHelpers';
import { unitsToPixel } from '../utils/_units';
import { convertFromCssPixelUnits, convertToCssPixelUnits } from '../internal/_utils';
export class DragDropHandler extends Disposable {
    constructor(surface, selection, undoEngine, snapHelper, dragHelperContent) {
        super();
        this._snapDisabled = false;
        this._size = new Size(0, 0);
        this.alwaysAlt = false;
        this.surface = surface;
        this.selection = selection;
        this.snapHelper = snapHelper;
        this.dragHelperContent = dragHelperContent;
        this.stopDrag = (ui, draggable, event) => {
            undoEngine() && undoEngine().start();
            this.doStopDrag(ui, draggable, event);
            undoEngine() && undoEngine().end();
            snapHelper && snapHelper.deactivateSnapLines();
        };
    }
    dispose() {
        super.dispose();
        this.surface = null;
        this.selection = null;
        this.snapHelper = null;
        this.dragHelperContent = null;
    }
    getTarget(event) {
        return event['toElement'] || (ko.dataFor(event.relatedTarget) && event.relatedTarget) || (event && event.target) || null;
    }
    _getAbsoluteSurfacePosition(uiElement) {
        return { left: convertFromCssPixelUnits(uiElement.dataset.leftPosition) - uiElement['delta'].left, top: convertFromCssPixelUnits(uiElement.dataset.topPosition) - uiElement['delta'].top };
    }
    addControl(control, dropTargetSurface, size) {
        var targetWidth = (dropTargetSurface['width'] && dropTargetSurface['width']()) || (dropTargetSurface['_width'] && dropTargetSurface['_width']());
        var underCursor = dropTargetSurface.underCursor();
        if (underCursor.x < targetWidth) {
            dropTargetSurface.getControlModel().addChild(control);
            var controlSurface = findSurface(control);
            if (!controlSurface)
                return;
            var width = size.width(), height = size.height();
            var left = (underCursor.x + width > targetWidth) ? (targetWidth - width - 1) : underCursor.x;
            controlSurface.rect({ left: left, top: Math.max(underCursor.y, 0), width: width, height: height });
            this.selection.initialize(controlSurface);
        }
    }
    recalculateSize(size) {
        var surface = ko.unwrap(this.surface);
        this._size.width(unitsToPixel(ko.unwrap(size.width) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
        this._size.height(unitsToPixel(ko.unwrap(size.height) * surface.dpi() / 100, surface.measureUnit(), surface.zoom()));
    }
    helper(draggable, event) {
        this.snapHelper && this.snapHelper.updateSnapLines(draggable || null);
    }
    canDrop(dropTarget, controlModel, metaData) {
        var locked = dropTarget.locked;
        if (metaData && metaData.canDrop) {
            locked = locked || !metaData.canDrop(dropTarget, controlModel);
        }
        return !locked;
    }
    startDrag(_) { }
    drag(event, uiElement, draggableModel) {
        var needToActivateSnapLines = !this._snapDisabled && event.altKey !== true;
        if (this.selection.dropTarget) {
            var dropTarget = this.selection.dropTarget.getControlModel().getMetaData().isContainer ? this.selection.dropTarget : (this.selection.dropTarget.parent || this.selection.dropTarget), controlModel = draggableModel.getControlModel && draggableModel.getControlModel(), metaData = controlModel && controlModel.getMetaData() || draggableModel.info;
            if (this.canDrop(dropTarget, controlModel, metaData)) {
                this.dragHelperContent && this.dragHelperContent.isLocked(false);
            }
            else {
                this.snapHelper && this.snapHelper.deactivateSnapLines();
                needToActivateSnapLines = false;
                this.dragHelperContent && this.dragHelperContent.isLocked(true);
            }
        }
        if (needToActivateSnapLines) {
            var position = this._getAbsoluteSurfacePosition(uiElement);
            var snapDelta = this.snapHelper && this.snapHelper.activateSnapLines({
                left: position.left,
                top: position.top,
                right: position.left + this._size.width(),
                bottom: position.top + this._size.height()
            });
            if (snapDelta && (snapDelta.left > 0 || snapDelta.top > 0)) {
                uiElement.dataset.leftPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.leftPosition) - snapDelta.left);
                uiElement.dataset.topPosition = convertToCssPixelUnits(convertFromCssPixelUnits(uiElement.dataset.topPosition) - snapDelta.top);
                uiElement.ghostContainer.style.left = uiElement.dataset.leftPosition;
                uiElement.ghostContainer.style.top = uiElement.dataset.topPosition;
            }
        }
    }
    doStopDrag(uiElement, draggableModel, event) { }
}
DragDropHandler.started = ko.observable(false);
