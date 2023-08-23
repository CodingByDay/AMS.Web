/**
* DevExpress Dashboard (_conditional-formatting-custom-color-storage.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionalFormattingEditor = exports.InMemoryStorage = void 0;
class InMemoryStorage {
    getValue() { return this.value; }
    setValue(value) { this.value = value; }
}
exports.InMemoryStorage = InMemoryStorage;
exports.conditionalFormattingEditor = {
    customColorStorage: new InMemoryStorage(),
    customAppearanceStorage: new InMemoryStorage()
};
