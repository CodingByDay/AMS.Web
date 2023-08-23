﻿/**
* DevExpress Dashboard (_parameter-dialog-binder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterDialogViewModel = void 0;
const ko = require("knockout");
const _parameters_1 = require("../../data/_parameters");
const disposable_object_1 = require("../../model/disposable-object");
const parameter_1 = require("../../model/parameters/parameter");
const _parameters_dialog_1 = require("../../viewer-parts/widgets/dialogs/_parameters-dialog");
class ParameterDialogViewModel extends disposable_object_1.DisposableObject {
    constructor(_parameters, getParameterValues) {
        super();
        this._parameters = _parameters;
        this._getDashboardParameterType = (type) => {
            var result = _parameters_dialog_1.parameterTypes.string;
            if (type) {
                if (type.indexOf('DateTime') > -1) {
                    result = _parameters_dialog_1.parameterTypes.dateTime;
                }
                else if ((type.indexOf('Decimal') + (type.indexOf('Double'))) > -2) {
                    result = _parameters_dialog_1.parameterTypes.float;
                }
                else if (type.indexOf('Boolean') > -1) {
                    result = _parameters_dialog_1.parameterTypes.bool;
                }
                else if (type.indexOf('.Int') > -1) {
                    result = _parameters_dialog_1.parameterTypes.int;
                }
            }
            return result;
        };
        this.setParameters = (newParameters) => {
            newParameters.forEach(newParameter => {
                var parameterModel = this._parameters.peek().filter(p => p.name.peek() === newParameter.getName())[0];
                if (parameterModel) {
                    parameterModel._value(newParameter.getValue());
                }
            });
        };
        this.parameterCollection = ko.computed(() => {
            var parameters = this._parameters();
            var parameterCollection = new _parameters_1.ParametersCollection(parameters.map(param => {
                var values = this._getParameterValues(param, getParameterValues);
                return {
                    Name: param.name(),
                    DefaultValue: this._getParameterDefaultValue(param, values),
                    Description: param.description(),
                    Values: values,
                    ContainsDisplayMember: param.containsDisplayMember(),
                    Visible: param.parameterVisible(),
                    AllowMultiselect: param.allowMultiselect(),
                    AllowNull: param.allowNull(),
                    Type: this._getDashboardParameterType(param.type())
                };
            }));
            parameters.forEach(param => {
                var actualValue = param._actualValue();
                if (actualValue === parameter_1.Parameter.SelectAllValue) {
                    actualValue = this._getParameterValues(param, getParameterValues).map(valueViewModel => valueViewModel.Value);
                }
                parameterCollection.setParameterValue(param.name(), actualValue);
            });
            parameterCollection.collectionChanged.add(() => {
                this.setParameters(parameterCollection.getParameterList());
            });
            return parameterCollection;
        });
        this.toDispose(this.parameterCollection);
    }
    _getParameterValues(parameter, getParameterValues) {
        var parameterValues = null;
        if (!!parameter.staticListLookUpSettings()) {
            parameterValues = parameter.staticListLookUpSettings().values().map(item => {
                return {
                    Value: item.value(),
                };
            });
        }
        else if (!!parameter.dynamicListLookUpSettings()) {
            parameterValues = getParameterValues(parameter.type(), parameter.dynamicListLookUpSettings())();
        }
        return parameterValues;
    }
    _getParameterDefaultValue(param, paramValues) {
        if (param.lookUpSourceType() !== 'None' && param.allowMultiselect()) {
            if (param.selectAllValues()) {
                return paramValues && paramValues.map(value => value.Value) || [];
            }
            else {
                return param._valuesOfDefaultValues() || [];
            }
        }
        else {
            return param.defaultValue();
        }
    }
}
exports.ParameterDialogViewModel = ParameterDialogViewModel;
