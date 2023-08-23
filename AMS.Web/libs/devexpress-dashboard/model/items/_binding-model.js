﻿/**
* DevExpress Dashboard (_binding-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._areTheSameBindingProviders = void 0;
exports._areTheSameBindingProviders = ((a, b) => {
    var bindingsA = a._getBindingModel(), bindingsB = b._getBindingModel();
    if (!bindingsA || !bindingsB)
        return false;
    return (bindingsA
        .filter((binding, index) => bindingsB.some(anotherBinding => anotherBinding.propertyName === binding.propertyName))[1]);
});
