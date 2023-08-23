﻿/**
* DevExpress Dashboard (_format-condition-expression.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionExpressionSerializationsInfo = exports.formatConditionFilter = exports.formatConditionExpression = void 0;
const _format_condition_style_base_1 = require("./_format-condition-style-base");
exports.formatConditionExpression = { propertyName: 'expression', modelName: '@Expression' };
exports.formatConditionFilter = { propertyName: 'expression' };
exports.formatConditionExpressionSerializationsInfo = _format_condition_style_base_1.formatConditionStyleBaseSerializationsInfo.concat([exports.formatConditionExpression]);
