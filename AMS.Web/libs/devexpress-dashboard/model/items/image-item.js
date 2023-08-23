﻿/**
* DevExpress Dashboard (image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../serializable-model");
const dashboard_item_1 = require("./dashboard-item");
const _image_item_1 = require("./metadata/_image-item");
class ImageItem extends dashboard_item_1.DashboardItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.imageType = ko.observable('linked');
        if (this.image64()) {
            this.imageType('embedded');
        }
        else {
            this.imageType('linked');
        }
        this.imageType.subscribe(imageType => {
            switch (imageType) {
                case 'embedded':
                    this.urlPath(null);
                    break;
                default:
                    this.image64(null);
                    break;
            }
        });
    }
    _getInfoCore() {
        return _image_item_1.imageDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Image';
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        content.ViewModel.SizeMode = this.sizeMode();
        content.ViewModel.HorizontalAlignment = this.horizontalAlignment();
        content.ViewModel.VerticalAlignment = this.verticalAlignment();
    }
}
exports.ImageItem = ImageItem;
serializable_model_1.itemTypesMap['Image'] = { type: ImageItem, groupName: 'common', title: 'DashboardStringId.DefaultNameImageItem', index: 90 };
