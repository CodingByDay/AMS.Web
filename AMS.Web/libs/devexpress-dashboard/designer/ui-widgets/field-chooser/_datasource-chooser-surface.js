﻿/**
* DevExpress Dashboard (_datasource-chooser-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceChooserController = void 0;
const ko = require("knockout");
const _field_chooser_surface_1 = require("./_field-chooser-surface");
class DataSourceChooserController extends _field_chooser_surface_1.SliderController {
    constructor(params) {
        super({ startPath: ko.observable(''), dataSourceBrowser: params.dataSourceBrowser, selectedField: ko.observable(), filter: undefined });
        this.toDispose(this.selectedField.subscribe(field => {
            params.dataSource(field && field['dataSourceName']);
            params.dataMember(field && field['dataMemberName']);
        }));
        var updatingWrapper = (func) => {
            this.lists()[0].ready(false);
            func();
            setTimeout(() => {
                this.lists().forEach(list => list.ready(true));
            }, 1);
        };
        var updateSelection = () => {
            if (params.dataSource() && params.dataMember()) {
                updatingWrapper(() => {
                    var newList = new _field_chooser_surface_1.FieldChooserList(this, params.dataSource(), [params.dataSource()], this.selectedField);
                    newList.index(1);
                    this.lists.push(newList);
                    this.lists().forEach((list, index) => list.index(index - this.lists().length + 1));
                });
            }
            this.selectedField({ dataMember: ko.observable(params.dataMember() || params.dataSource()), dataSourceName: params.dataSource(), dataMemberName: params.dataMember() });
            if (params.dataSource() && !params.dataMember()) {
                this.lists()[0].scrollToSelectedItem();
            }
        };
        if (ko.isSubscribable(params.active)) {
            this.toDispose(params.active.subscribe(newVal => {
                if (newVal) {
                    updateSelection();
                }
                else {
                    this.selectedField(undefined);
                    updatingWrapper(() => {
                        this.lists([this.lists()[0]]);
                        this.lists()[0].index(0);
                    });
                }
            }));
        }
        updateSelection();
    }
}
exports.DataSourceChooserController = DataSourceChooserController;
ko.components.register('dx-datasource-chooser', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            var viewModel = new DataSourceChooserController(params);
            const disposeCallback = () => {
                viewModel.dispose();
                ko.utils.domNodeDisposal.removeDisposeCallback(componentInfo.element, disposeCallback);
            };
            ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, disposeCallback);
            return viewModel;
        }
    },
    template: { element: 'dx-datasource-chooser-slider' }
});
