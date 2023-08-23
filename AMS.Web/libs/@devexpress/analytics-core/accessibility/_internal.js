/**
* DevExpress Analytics (accessibility\_internal.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { createGlobalModuleVariableFunc } from '../serializer/_internal';
export var accessibilityFontSizeZoomFactor = createGlobalModuleVariableFunc(1);
export var calculateWithZoomFactor = function (value) {
    return value * accessibilityFontSizeZoomFactor();
};
