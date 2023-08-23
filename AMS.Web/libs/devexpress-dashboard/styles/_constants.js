﻿/**
* DevExpress Dashboard (_constants.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardConstants = exports.devExtremeConstants = void 0;
const materialGridBaseHeaderHeight = 40;
const materialGridBaseHeaderLineHeight = 16;
const materialGridBaseCellHeight = 36;
const materialGridBaseCellLineHeight = 16;
const materialPopupContentPadding = 16;
exports.devExtremeConstants = {
    materialPopupToolbarHeight: 42,
    materialPopupContentPadding: materialPopupContentPadding,
    materialGridBaseHeaderHeight: materialGridBaseHeaderHeight,
    materialGridBaseHeaderLineHeight: materialGridBaseHeaderLineHeight,
    materialGridBaseHeaderCellVerticalPadding: Math.round((materialGridBaseHeaderHeight - materialGridBaseHeaderLineHeight) / 2),
    materialGridBaseCellHeight: materialGridBaseCellHeight,
    materialGridBaseCellLineHeight: materialGridBaseCellLineHeight,
    materialGridBaseCellVerticalPadding: Math.round((materialGridBaseCellHeight - materialGridBaseCellLineHeight) / 2),
    materialButtonHeight: 28,
    materialGridBaseCellFontSize: 13,
    materialGridBaseRowBorder: 1,
    dxPopupTitleBorderBottom: 1,
    dxDatagridHeadersBorder: 1,
};
exports.dashboardConstants = {
    materialParametersDialogFormPaddingTop: 18,
    materialParametersDialogFormPaddingBottom: 30 - exports.devExtremeConstants.materialPopupContentPadding,
};
