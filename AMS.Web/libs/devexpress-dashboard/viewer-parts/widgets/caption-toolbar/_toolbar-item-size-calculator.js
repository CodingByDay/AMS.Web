﻿/**
* DevExpress Dashboard (_toolbar-item-size-calculator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcMaxWidth = void 0;
function calcMaxWidth(itemsWidth, sectionWidth, sectionMaxWidth) {
    let itemsMaxWidth = itemsWidth.map(item => undefined);
    if (sectionWidth > sectionMaxWidth) {
        for (let i = itemsWidth.length - 1; i >= 0; i--) {
            let difference = sectionWidth - sectionMaxWidth;
            let itemWidth = itemsWidth[i];
            let itemMaxWidth = Math.max(0, itemWidth - difference);
            sectionWidth -= (itemWidth - itemMaxWidth);
            itemsMaxWidth[i] = itemMaxWidth;
            if (sectionWidth <= sectionMaxWidth) {
                break;
            }
        }
    }
    return itemsMaxWidth;
}
exports.calcMaxWidth = calcMaxWidth;
