﻿/**
* DevExpress Dashboard (_pivot-grid-item-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsExtractor = exports.OneElementFilterRemover = exports.FilterChecker = exports.pivotHelper = void 0;
const item_data_axis_names_1 = require("../../../data/item-data/item-data-axis-names");
const _utils_1 = require("../../../data/_utils");
exports.pivotHelper = {
    getSchemaRow(fields) {
        let row = {};
        fields && fields.forEach(f => {
            row[f.name] = undefined;
        });
        return row;
    },
    createAreaFields(fieldsViewModels, area, autoExpand) {
        return fieldsViewModels ? fieldsViewModels.map((viewModel) => {
            return {
                name: viewModel.DataId,
                dataField: viewModel.DataId,
                caption: viewModel.Caption,
                area: area,
                expanded: autoExpand,
                sortBy: 'none'
            };
        }) : [];
    },
    getColumnAxis(multiData) {
        return multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.pivotColumnAxis);
    },
    getRowAxis(multiData) {
        return multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.pivotRowAxis);
    }
};
class FilterValueVisitor {
    constructor() {
        this._supportedLogicalOperation = ['and', 'or'];
    }
    _visitComplexExpression(filter) {
        let currentResult = undefined;
        let currentOperator = null;
        for (let i = 0; i < filter.length; i++) {
            let currentElement = filter[i];
            if (i % 2 === 1) {
                if (typeof currentElement === 'string' && this._supportedLogicalOperation.indexOf(currentElement) !== -1) {
                    currentOperator = currentElement;
                }
                else {
                    new Error(`Filter "${JSON.stringify(filter)}" has unsupported structure. Element "${JSON.stringify(currentElement)}" at ${i} is not supported operator`);
                }
            }
            else {
                if (Array.isArray(currentElement)) {
                    if (i === 0) {
                        currentResult = this._visit(currentElement);
                    }
                    else {
                        switch (currentOperator) {
                            case 'and':
                                currentResult = this._and(currentResult, this._visit(currentElement));
                                break;
                            case 'or':
                                currentResult = this._or(currentResult, this._visit(currentElement));
                                break;
                            default:
                                throw new Error(`The operator "${currentOperator.toString()}" is not supported in filter expression`);
                        }
                    }
                }
                else {
                    throw new Error(`Filter "${JSON.stringify(filter)}" has unsupported structure. Element "${JSON.stringify(currentElement)}" at ${i} should be array`);
                }
            }
        }
        return currentResult;
    }
    _visit(filter) {
        if (!filter || filter.length === 0)
            return this._visitEmpty(filter);
        if (filter.length === 1) {
            return this._visit(filter[0]);
        }
        if (filter.length === 2) {
            return this._negate(this._visit(filter[1]));
        }
        else {
            if (filter.length === 3 && filter[1] === '=') {
                let field = filter[0];
                let value = filter[2];
                return this._visitEquality(field, value);
            }
            else if (filter.length >= 3 && filter.length % 2 === 1) {
                return this._visitComplexExpression(filter);
            }
            else {
                throw new Error(`Filter "${JSON.stringify(filter)}" has unsupported structure: must contain an odd number of elements`);
            }
        }
    }
}
class FilterChecker extends FilterValueVisitor {
    static fits(dimensionValues, filter) {
        FilterChecker._instance._dimensionValues = dimensionValues;
        return FilterChecker._instance._visit(filter);
    }
    _visitEmpty(filter) {
        return true;
    }
    _negate(value) {
        return !value;
    }
    _visitEquality(field, value) {
        return this._dimensionValues[field] === undefined || this._dimensionValues[field] === value;
    }
    _and(left, right) {
        return left && right;
    }
    _or(left, right) {
        return left || right;
    }
}
exports.FilterChecker = FilterChecker;
FilterChecker._instance = new FilterChecker();
class OneElementFilterRemover extends FilterValueVisitor {
    static simplify(filter) {
        return OneElementFilterRemover._instance._visit(filter);
    }
    _visitEmpty(filter) {
        return filter;
    }
    _negate(value) {
        return ['!', value];
    }
    _visitEquality(field, value) {
        return [field, '=', value];
    }
    _and(left, right) {
        return [left, 'and', right];
    }
    _or(left, right) {
        return [left, 'or', right];
    }
}
exports.OneElementFilterRemover = OneElementFilterRemover;
OneElementFilterRemover._instance = new OneElementFilterRemover();
class FieldsExtractor extends FilterValueVisitor {
    static extract(filter) {
        return _utils_1.distinct(FieldsExtractor._instance._visit(filter));
    }
    _visitEmpty(filter) {
        return [];
    }
    _negate(value) {
        return value;
    }
    _visitEquality(field, value) {
        return [field];
    }
    _and(left, right) {
        return left.concat(right);
    }
    _or(left, right) {
        return left.concat(right);
    }
}
exports.FieldsExtractor = FieldsExtractor;
FieldsExtractor._instance = new FieldsExtractor();
