/**
* DevExpress Dashboard (_dx-designer-integration.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAceTheme = void 0;
const _dx_devextreme_themes_integration_1 = require("../viewer-parts/_dx-devextreme-themes-integration");
var getAceTheme = () => _dx_devextreme_themes_integration_1.getBaseColorScheme() === 'light' ? 'ace/theme/dreamweaver' : 'ace/theme/ambiance';
exports.getAceTheme = getAceTheme;
