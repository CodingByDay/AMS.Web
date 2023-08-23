﻿/**
* DevExpress Dashboard (_simple-indicator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleIndicator = void 0;
class SimpleIndicator {
    static getIndicator(type, hasPositiveMeaning) {
        return SimpleIndicator.svgIndicators[type + ((type === 'up' || type === 'down') && !hasPositiveMeaning ? '_negative' : '')];
    }
}
exports.SimpleIndicator = SimpleIndicator;
SimpleIndicator._staticPartMarkup = '<svg viewBox="0 0 400 300" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="dxb-d-block dxb-wth-color-0000"><path class="';
SimpleIndicator.svgIndicators = {
    none: '<svg width="24" height="18" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="dxb-d-block dxb-wth-color-0000"></svg>',
    up: SimpleIndicator._staticPartMarkup + 'dx-carditem-positive-color" d="M 0 300 L 200 0 L 400 300 Z"></path></svg>',
    up_negative: SimpleIndicator._staticPartMarkup + 'dx-carditem-negative-color" d="M 0 300 L 200 0 L 400 300 Z"></path></svg>',
    down: SimpleIndicator._staticPartMarkup + 'dx-carditem-positive-color" d="M 0 0 L 200 300 L 400 0 Z"></path></svg>',
    down_negative: SimpleIndicator._staticPartMarkup + 'dx-carditem-negative-color" d="M 0 0 L 200 300 L 400 0 Z"></path></svg>',
    warning: '<svg viewBox="0 0 18 18" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" class="dxb-d-block dxb-wth-color-0000"><circle cx="9" cy="9" r="8.7" class="dx-carditem-warning-color"></circle></svg>'
};
