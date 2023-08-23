﻿/**
* DevExpress Dashboard (form-item-templates.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormItemTemplates = void 0;
const button_group_1 = require("devextreme/ui/button_group");
const ko = require("knockout");
class FormItemTemplates {
}
exports.FormItemTemplates = FormItemTemplates;
FormItemTemplates.buttonGroup = (args) => {
    var _a;
    var div = document.createElement('div');
    if (!!((_a = args === null || args === void 0 ? void 0 : args.editorOptions) === null || _a === void 0 ? void 0 : _a.items))
        args.editorOptions.items.forEach(x => x.hint = x.text);
    var options = Object.assign({ width: '100%', onSelectionChanged: e => args.component.updateData(args.dataField, e.component.option('selectedItemKeys')[0]), selectedItemKeys: [ko.unwrap(args.component.option('formData')[args.dataField])] }, args.editorOptions);
    new button_group_1.default(div, options);
    return div;
};
