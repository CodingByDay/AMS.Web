﻿/**
* DevExpress Dashboard (disposable-object.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisposableObject = void 0;
class DisposableObject {
    constructor() {
        this._disposables = [];
        this.disposed = false;
    }
    toDispose(...disposables) {
        this._disposables.push(...disposables);
    }
    dispose() {
        this._disposables.forEach(disposable => disposable.dispose());
        this._disposables = [];
        this.disposed = true;
    }
}
exports.DisposableObject = DisposableObject;
