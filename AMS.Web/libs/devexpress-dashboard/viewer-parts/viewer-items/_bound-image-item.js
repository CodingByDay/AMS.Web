﻿/**
* DevExpress Dashboard (_bound-image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boundImageItem = void 0;
const _image_item_1 = require("./_image-item");
var BASE64_STRING_PREFIX = 'data:image/png;base64,';
class boundImageItem extends _image_item_1.imageItem {
    constructor(container, options) {
        super(container, options);
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        var viewModel = this.options.ViewModel, value = this.dataController ? this._dataController.getImageData() : undefined;
        if (viewModel) {
            if (viewModel.DataBindingMode === 'Uri' && viewModel.UriPattern)
                value = viewModel.UriPattern.replace('{0}', value);
            else
                value = BASE64_STRING_PREFIX + (value || viewModel.DefaultImageBase64String);
        }
        this.imgSrc = value || this._getImageSource(viewModel ? viewModel.ImageViewModel : undefined);
    }
}
exports.boundImageItem = boundImageItem;
