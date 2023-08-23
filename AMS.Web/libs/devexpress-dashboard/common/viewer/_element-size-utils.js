﻿/**
* DevExpress Dashboard (_element-size-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setElementSize = exports.createElementSizeUpdater = exports.createItemSizeUpdater = void 0;
function createItemSizeUpdater(item, sizeController) {
    let handler = () => {
        let width = sizeController.getWidth();
        let height = sizeController.getHeight();
        if (Math.abs(width - item.width()) > 1 || Math.abs(height - item.height()) > 1) {
            item.setSize(width, height);
        }
    };
    sizeController.requestRepaint.add(handler);
    return {
        dispose: () => sizeController.requestRepaint.remove(handler)
    };
}
exports.createItemSizeUpdater = createItemSizeUpdater;
function createElementSizeUpdater(element, sizeController) {
    let handler = () => {
        setElementSize(element, sizeController);
    };
    sizeController.requestRepaint.add(handler);
    return {
        dispose: () => sizeController.requestRepaint.remove(handler)
    };
}
exports.createElementSizeUpdater = createElementSizeUpdater;
function setElementSize(element, sizeController) {
    let width = sizeController.getWidth();
    let height = sizeController.getHeight();
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    if (width === 0 || height === 0) {
        element.classList.add('dx-dashboard-hidden-element');
    }
    else {
        element.classList.remove('dx-dashboard-hidden-element');
    }
}
exports.setElementSize = setElementSize;
