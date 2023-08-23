/**
* DevExpress Dashboard (_dx-devextreme-themes-integration.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseColorScheme = void 0;
const themes_1 = require("devextreme/viz/themes");
var getBaseColorScheme = () => {
    var vizTheme = themes_1.currentTheme();
    return (vizTheme.indexOf('dark') !== -1) ? 'dark' : 'light';
};
exports.getBaseColorScheme = getBaseColorScheme;
