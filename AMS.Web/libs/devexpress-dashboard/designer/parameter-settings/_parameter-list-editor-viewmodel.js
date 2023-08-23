﻿/**
* DevExpress Dashboard (_parameter-list-editor-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterListEditorViewModel = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const disposable_object_1 = require("../../model/disposable-object");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const parameter_1 = require("../../model/parameters/parameter");
const _parameter_editor_viewmodel_1 = require("./_parameter-editor-viewmodel");
class ParameterListEditorViewModel extends disposable_object_1.DisposableObject {
    constructor(dashboard, _dataSourceBrowserGetter) {
        super();
        this.dashboard = dashboard;
        this._dataSourceBrowserGetter = _dataSourceBrowserGetter;
        this.selectedParameters = ko.observable([]);
        this.selectedParameter = ko.computed(() => {
            return this.selectedParameters()[0];
        });
        this.parameterEditorViewModel = ko.observable(null);
        this.allowReordering = ko.observable(false);
        this.toggleReordering = () => {
            this.allowReordering(!this.allowReordering());
        };
        this.addParameter = () => {
            var name = _helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.NewParameterNamePrefix'), this.dashboard().parameters(), 'name', 1), param = new parameter_1.Parameter({ '@Name': name });
            this.dashboard().parameters.push(param);
            this.selectedParameters([param]);
        };
        this.removeParameter = () => {
            this.dashboard().parameters.remove(this.selectedParameter());
            this.selectedParameters([this.dashboard().parameters()[0]]);
        };
        this.reorderParameters = (e) => {
            let reorder = (array, from, to) => {
                var innerArray = array();
                innerArray.splice(to, 0, innerArray.splice(from, 1)[0]);
                array(innerArray);
            };
            reorder(this.dashboard().parameters, e.fromIndex, e.toIndex);
            this.selectedParameters([this.dashboard().parameters()[e.toIndex]]);
        };
        this.selectedParameter.subscribe((sp) => {
            if (sp) {
                let isNameValid = (name) => {
                    return this.dashboard().parameters().filter(p => p !== sp && p.name() === name).length === 0;
                };
                this.parameterEditorViewModel(new _parameter_editor_viewmodel_1.ParameterEditorViewModel(sp, _dataSourceBrowserGetter, isNameValid));
            }
            else {
                this.parameterEditorViewModel(undefined);
            }
        });
        this.toDispose(this.selectedParameter);
    }
    initialize() {
        var setDefaultSelectedParameter = dashboard => {
            if (dashboard && dashboard.parameters.peek().length > 0) {
                this.selectedParameters([dashboard.parameters.peek()[0]]);
            }
            else {
                this.selectedParameters([]);
            }
        };
        this.toDispose(this.dashboard.subscribe(setDefaultSelectedParameter));
        setDefaultSelectedParameter(this.dashboard.peek());
    }
}
exports.ParameterListEditorViewModel = ParameterListEditorViewModel;
