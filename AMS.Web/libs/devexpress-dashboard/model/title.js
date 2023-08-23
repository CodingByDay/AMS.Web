﻿/**
* DevExpress Dashboard (title.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitle = void 0;
const ko = require("knockout");
const _title_1 = require("./metadata/_title");
const serializable_model_1 = require("./serializable-model");
class DashboardTitle extends serializable_model_1.SerializableModel {
    constructor(model, serializer, info) {
        super(model || {}, serializer, info);
        this.imageType = ko.observable('none');
        if (this.image64()) {
            this.imageType('embedded');
        }
        else if (this.url()) {
            this.imageType('linked');
        }
        else {
            this.imageType('none');
        }
        this.imageType.subscribe(imageType => {
            switch (imageType) {
                case 'embedded':
                    this.url(null);
                    break;
                case 'linked':
                    this.image64(null);
                    break;
                default:
                    this.url(null);
                    this.image64(null);
            }
        });
    }
    getInfo() {
        return _title_1.dashboardTitleSerializationsInfo;
    }
}
exports.DashboardTitle = DashboardTitle;
