﻿/**
* DevExpress Analytics (core\internal\_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ToolboxItem } from '../tools/toolbox';
export function getToolboxItems(controlsMap, defaultGroup = '') {
    var toolboxItems = [];
    Object.keys(controlsMap).forEach((controlType) => {
        if (!controlsMap[controlType].nonToolboxItem) {
            var item = {
                '@ControlType': controlType,
                displayName: controlsMap[controlType].displayName,
                index: controlsMap[controlType].toolboxIndex || 0,
                canDrop: controlsMap[controlType].canDrop,
                group: controlsMap[controlType].group || defaultGroup
            };
            if (controlsMap[controlType].size) {
                item['size'] = controlsMap[controlType].size;
            }
            if (controlsMap[controlType].defaultVal) {
                Object.keys(controlsMap[controlType].defaultVal).forEach((name) => {
                    item[name] = controlsMap[controlType].defaultVal[name];
                });
            }
            toolboxItems.push(new ToolboxItem(item));
        }
    });
    return toolboxItems.sort((item1, item2) => { return item1.index - item2.index; });
}
export function blur(element) {
    try {
        element['blur'] && element['blur']();
    }
    catch (e) {
        document.body.blur();
    }
}
export const convertToCssPixelUnits = (value) => `${value}px`;
export const convertFromCssPixelUnits = (value) => parseFloat(value.replace('px', ''));
export function isDefined(object) {
    return null !== object && void 0 !== object && Object.keys(object).length > 0;
}
