﻿/**
* DevExpress Dashboard (_tab-header-calculator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcTabHeadersWidth = void 0;
function calcTabHeadersWidth(tabsWidth, containerWidth, leftIndex, showCaption) {
    let actualTabsWidth = tabsWidth.map(width => 0);
    let actualLeftIndex = leftIndex;
    let rightIndex = 0;
    if (showCaption) {
        let widthSum = 0;
        let actualWidthSum = 0;
        for (let i = leftIndex; i < tabsWidth.length; i++) {
            if (widthSum + tabsWidth[i] <= containerWidth) {
                widthSum += tabsWidth[i];
                rightIndex = i;
            }
            else {
                break;
            }
        }
        if (rightIndex === tabsWidth.length - 1) {
            for (let i = leftIndex - 1; i >= 0; i--) {
                if (widthSum + tabsWidth[i] <= containerWidth) {
                    widthSum += tabsWidth[i];
                    actualLeftIndex = i;
                }
                else {
                    break;
                }
            }
        }
        for (let i = actualLeftIndex; i <= rightIndex; i++) {
            let width = Math.floor(containerWidth * (tabsWidth[i] / widthSum));
            actualTabsWidth[i] = width;
            actualWidthSum += width;
        }
        let remainder = containerWidth - actualWidthSum;
        for (let i = rightIndex; i >= 0; i--) {
            if (remainder > 0) {
                actualTabsWidth[i]++;
                remainder--;
            }
            else {
                break;
            }
        }
    }
    else {
        rightIndex = leftIndex;
        actualTabsWidth[leftIndex] = containerWidth;
    }
    return {
        widths: actualTabsWidth,
        leftVisibleIndex: actualLeftIndex,
        rightVisibleIndex: rightIndex
    };
}
exports.calcTabHeadersWidth = calcTabHeadersWidth;
