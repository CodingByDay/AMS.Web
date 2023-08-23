/**
* DevExpress Dashboard (_ko-element-accessor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
ko.bindingHandlers['dx-dashboard-element-accessor'] = {
    init: function (element, valueAccessor) {
        let componentArgs = ko.unwrap(valueAccessor());
        componentArgs.onInitialize && componentArgs.onInitialize({ element: element });
        componentArgs.targetElement && componentArgs.targetElement(element);
        let inDisposingHandler = false;
        ko.utils.domNodeDisposal.addDisposeCallback(element, () => {
            if (componentArgs.onDisposing && !inDisposingHandler) {
                try {
                    inDisposingHandler = true;
                    componentArgs.onDisposing({ element: element });
                }
                finally {
                    inDisposingHandler = false;
                }
            }
        });
    }
};
