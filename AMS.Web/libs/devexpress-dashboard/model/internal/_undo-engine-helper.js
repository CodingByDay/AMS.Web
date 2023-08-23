﻿/**
* DevExpress Dashboard (_undo-engine-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapWithUndoRedo = exports.callFuncWithUndoRedo = exports.wrapFuncWithUndoRedo = exports.UndoEngineContainer = void 0;
class UndoEngineContainer {
}
exports.UndoEngineContainer = UndoEngineContainer;
function wrapFuncWithUndoRedo(func) {
    return function (...args) {
        try {
            UndoEngineContainer.undoEngine && UndoEngineContainer.undoEngine.start();
            var result = func.apply(this, args);
            return result;
        }
        finally {
            UndoEngineContainer.undoEngine && UndoEngineContainer.undoEngine.end();
        }
    };
}
exports.wrapFuncWithUndoRedo = wrapFuncWithUndoRedo;
function callFuncWithUndoRedo(func) {
    try {
        UndoEngineContainer.undoEngine && UndoEngineContainer.undoEngine.start();
        func();
    }
    finally {
        UndoEngineContainer.undoEngine && UndoEngineContainer.undoEngine.end();
    }
}
exports.callFuncWithUndoRedo = callFuncWithUndoRedo;
function wrapWithUndoRedo(target, key, value) {
    return {
        value: wrapFuncWithUndoRedo(value.value)
    };
}
exports.wrapWithUndoRedo = wrapWithUndoRedo;
