﻿/**
* DevExpress Dashboard (_textbox-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextBoxItemPropertiesComposer = void 0;
const _text_box_item_1 = require("../../../model/items/metadata/_text-box-item");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class TextBoxItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [Object.assign(Object.assign({}, _text_box_item_1.textBoxText), { formAdapterItem: _form_adapter_editors_1.filePickerEditor({ type: 'file', accept: '.rtf', readMode: 'text' }) })]))
        ];
        return result;
    }
}
exports.TextBoxItemPropertiesComposer = TextBoxItemPropertiesComposer;
