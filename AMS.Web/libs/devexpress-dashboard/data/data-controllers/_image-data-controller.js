﻿/**
* DevExpress Dashboard (_image-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDataController = void 0;
const _data_controller_base_1 = require("./_data-controller-base");
class imageDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this._imageAxisPoints = this._getImageAxisPoints();
    }
    _getImageAxisPoints() {
        var that = this, multiData = that.multiData, viewModel = that.viewModel;
        return multiData ? multiData.getPointsByDimensionId(viewModel.ImageDimensionId) : null;
    }
    getImageData() {
        return this._imageAxisPoints && this._imageAxisPoints.length ? this._imageAxisPoints[0].getValue() : undefined;
    }
}
exports.imageDataController = imageDataController;
