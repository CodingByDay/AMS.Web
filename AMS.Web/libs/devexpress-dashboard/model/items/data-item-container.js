/**
* DevExpress Dashboard (data-item-container.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemContainer = void 0;
const _custom_properties_utils_1 = require("../custom-properties/_custom-properties-utils");
const serializable_model_1 = require("../serializable-model");
class DataItemContainer extends serializable_model_1.TypedSerializableModel {
    getInfo() {
        return this._getInfoCore().concat(_custom_properties_utils_1.getCustomPropertiesSerializationInfo(this));
    }
    grabFrom(dataItemContainer) {
        this.name(dataItemContainer.name());
    }
    _getContainerType() {
        return this.itemType();
    }
}
exports.DataItemContainer = DataItemContainer;
