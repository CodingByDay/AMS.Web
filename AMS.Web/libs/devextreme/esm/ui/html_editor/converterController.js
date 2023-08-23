/**
 * DevExtreme (esm/ui/html_editor/converterController.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
class ConverterController {
    constructor() {
        this._converters = {}
    }
    addConverter(name, converter) {
        this._converters[name] = converter
    }
    getConverter(name) {
        return this._converters[name]
    }
}
var controller = new ConverterController;
export default controller;
