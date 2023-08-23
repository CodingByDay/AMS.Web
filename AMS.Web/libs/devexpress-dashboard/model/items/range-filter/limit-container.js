﻿/**
* DevExpress Dashboard (limit-container.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitContainer = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const _limit_container_1 = require("./metadata/_limit-container");
class LimitContainer extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.mode = ko.observable();
        this.argumentInterval = ko.observable('Year');
        this.mode.subscribe(newMode => {
            if (newMode === 'None') {
                this.flow.isEmpty(true);
                this.fixed.isEmpty(true);
            }
            else if (newMode === 'Flow') {
                this.flow.isEmpty(false);
                this.fixed.isEmpty(true);
            }
            else if (newMode === 'Fixed') {
                this.flow.isEmpty(true);
                this.fixed.isEmpty(false);
            }
        });
        if (!modelJson.hasOwnProperty('FixedDateTimePeriodLimit')) {
            if (!modelJson.hasOwnProperty('FlowDateTimePeriodLimit')) {
                this.mode('None');
            }
            else {
                this.mode('Flow');
            }
        }
        else {
            this.mode('Fixed');
        }
        ko.computed(() => {
            this.flow.argumentInterval(this.argumentInterval());
        });
    }
    getInfo() {
        return _limit_container_1.limitContainer;
    }
    isEmpty() {
        return this.mode() === 'None';
    }
    getInterval() {
        if (this.mode() === 'Flow') {
            return this.flow.interval();
        }
        else {
            return null;
        }
    }
}
exports.LimitContainer = LimitContainer;
