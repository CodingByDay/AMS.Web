﻿/**
* DevExpress Dashboard (_text-item-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textItemDataController = void 0;
const $ = require("jquery");
const _data_controller_base_1 = require("./_data-controller-base");
class textItemDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this.displayTexts = {};
        this._initialize();
    }
    _initialize() {
        var that = this, multiData = that.multiData;
        multiData && $.each(multiData.getMeasures(), function (_, measure) {
            that.displayTexts[measure.id] = multiData.getMeasureValue(measure.id).getDisplayText();
        });
    }
    getDisplayText(id) {
        return this.displayTexts[id];
    }
}
exports.textItemDataController = textItemDataController;
