﻿/**
* DevExpress Dashboard (_helpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestParamsValidator = exports.combineOptions = exports.toCancelableSequenceAction = exports.CancellationToken = exports.getDimensionsExpressions = void 0;
const _jquery_helpers_1 = require("../data/_jquery-helpers");
const _helpers_1 = require("../model/data-item/_helpers");
const _data_source_browser_1 = require("./_data-source-browser");
function getDimensionsExpressions(dashboardItem, dataFieldProvider) {
    let deferred = _jquery_helpers_1.createJQueryDeferred();
    let fieldsNames = dashboardItem._dimensions.map(d => d.dataMember());
    _data_source_browser_1.getDataFields(fieldsNames, dashboardItem.dataSource(), dashboardItem.dataMember(), dataFieldProvider)
        .done((fields) => {
        let dimensionsExpressions = {};
        dashboardItem._dimensions.map(dim => {
            let field = fields.filter(f => f.dataMember() === dim.dataMember())[0];
            dimensionsExpressions[dim.uniqueName()] = _helpers_1.getDimensionExpression(dim.dataMember(), dim.dateTimeGroupInterval(), dim.textGroupInterval(), field.fieldType());
        });
        deferred.resolve(dimensionsExpressions);
    });
    return deferred.promise();
}
exports.getDimensionsExpressions = getDimensionsExpressions;
class CancellationToken {
    constructor(source) {
        this._source = source;
    }
    static get None() {
        return new CancellationToken(_jquery_helpers_1.createJQueryDeferred());
    }
    get canceled() {
        return this._source.state() === 'rejected';
    }
}
exports.CancellationToken = CancellationToken;
function toCancelableSequenceAction(action) {
    let cancelableSequenceAction = action;
    if (cancelableSequenceAction.cancelableAction)
        return cancelableSequenceAction;
    else
        return Object.assign(Object.assign({}, action), { cancelableAction: (options, cancellationToken) => cancelableSequenceAction.action(options) });
}
exports.toCancelableSequenceAction = toCancelableSequenceAction;
function combineOptions(previousOptions, options) {
    let result = Object.assign({}, previousOptions);
    options.forEach(op => {
        if (op.surfaceLeft !== previousOptions.surfaceLeft)
            result.surfaceLeft = op.surfaceLeft;
        if (op.surfaceTop !== previousOptions.surfaceTop)
            result.surfaceTop = op.surfaceTop;
    });
    return result;
}
exports.combineOptions = combineOptions;
exports.requestParamsValidator = {
    isValid(requestParams) {
        return typeof requestParams.dashboardId !== 'symbol'
            && typeof requestParams.dashboardId !== 'object'
            || requestParams.dashboardId === null;
    }
};
