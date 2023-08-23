﻿/**
* DevExpress Dashboard (_parameters.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParametersCollection = exports.Parameter = void 0;
const _jquery_helpers_1 = require("./_jquery-helpers");
const _utils_1 = require("./_utils");
class ParameterValue {
    constructor(value, displayText) {
        this._value = value;
        this._displayText = displayText;
    }
    getValue() {
        return this._value;
    }
    getDisplayText() {
        return this._displayText;
    }
}
class Parameter {
    constructor(parameterViewModel) {
        this.parameterChanged = _jquery_helpers_1.createJQueryCallbacks();
        this._name = parameterViewModel.Name;
        this._value = parameterViewModel.DefaultValue;
        this._defaultValue = parameterViewModel.DefaultValue;
        this._description = parameterViewModel.Description;
        this._type = parameterViewModel.Type;
        this._visible = parameterViewModel.Visible;
        this._allowNull = parameterViewModel.AllowNull;
        this._allowmultiselect = parameterViewModel.AllowMultiselect;
        this.setLookUpValues(parameterViewModel.Values, parameterViewModel.ContainsDisplayMember);
    }
    getName() {
        return this._name;
    }
    getAllowNull() {
        return this._allowNull;
    }
    getAllowMultiselect() {
        return this._allowmultiselect;
    }
    getValue() {
        return this._value;
    }
    setValue(value) {
        if (!_utils_1.checkValuesAreEqual(this._value, value, true, true)) {
            this._value = value;
            this.parameterChanged.fire();
        }
    }
    getDefaultValue() {
        return this._defaultValue;
    }
    getDescription() {
        return this._description;
    }
    getType() {
        return this._type;
    }
    getLookUpValues() {
        return this._values;
    }
    setLookUpValues(values, containsDisplayMember) {
        var that = this;
        if (values === null)
            that._values = values;
        else {
            that._values = [];
            if (values) {
                values.forEach(value => {
                    that._values.push(new ParameterValue(value.Value, containsDisplayMember ? value.DisplayText : value.Value));
                });
            }
        }
    }
    isVisible() {
        return this._visible;
    }
}
exports.Parameter = Parameter;
class ParametersCollection {
    constructor(parametersViewModel) {
        this.collectionChanged = _jquery_helpers_1.createJQueryCallbacks();
        this._parameters = [];
        var that = this;
        if (parametersViewModel) {
            parametersViewModel.forEach(parameterViewModel => {
                var parameter = new Parameter(parameterViewModel);
                parameter.parameterChanged.add(function () {
                    that.collectionChanged.fire();
                });
                that._parameters.push(parameter);
            });
        }
    }
    updateParameterValues(parametersViewModel) {
        parametersViewModel.forEach(parameterViewModel => {
            this.getParameterByName(parameterViewModel.Name).setLookUpValues(parameterViewModel.Values, parameterViewModel.ContainsDisplayMember);
        });
    }
    setParameters(newParameters) {
        newParameters.forEach(newParameter => {
            var parameter = this.getParameterByName(newParameter.Name);
            parameter.setValue(newParameter.Value);
        });
    }
    getParameterValues() {
        let parameterValues = [];
        this._parameters.forEach((parameter) => {
            parameterValues.push({
                Name: parameter.getName(),
                Value: parameter.getValue()
            });
        });
        return parameterValues;
    }
    getParameterDefaultValue(name) {
        return this.getParameterByName(name).getDefaultValue();
    }
    getParameterValue(name) {
        return this.getParameterByName(name).getValue();
    }
    setParameterValue(name, value) {
        var parameter = this.getParameterByName(name);
        parameter.setValue(value);
    }
    getParameters() {
        return this.getParameterList();
    }
    getVisibleParameters() {
        return this._parameters.filter(parameter => parameter.isVisible());
    }
    getParameterList() {
        return this._parameters;
    }
    getParameterByName(name) {
        var that = this;
        return that._parameters.filter((parameter) => parameter.getName() == name)[0];
    }
    getParameterByIndex(index) {
        return this._parameters[index];
    }
}
exports.ParametersCollection = ParametersCollection;
