﻿/**
* DevExpress Dashboard (_field-chooser-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldChooserController = exports.SliderController = exports.FieldChooserList = exports.TreeViewFieldChooserItem = exports.FieldChooserItem = void 0;
require("devextreme/ui/scroll_view");
require("devextreme/ui/text_box");
const text_box_1 = require("devextreme/ui/text_box");
const ko = require("knockout");
const _data_source_browser_1 = require("../../../common/_data-source-browser");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const model_1 = require("../../../model");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const _calc_field_editor_1 = require("../../calc-field-editor/_calc-field-editor");
const _confirm_dialog_1 = require("../../confirm-dialog/_confirm-dialog");
var commonSelectedFieldName;
var isListMode = ko.observable(_utils_1.LocalStorageHelper.getItem('dx-dashboard-field-chooser-is-list-mode') === 'true');
class FieldChooserItem {
    constructor(data) {
        this.data = data;
    }
    static getName(data) {
        return data.nodeType && data.nodeType() && data.nodeType().toLowerCase().indexOf('olap') !== -1 ? data.dataMember() : data.name();
    }
    get displayName() {
        return this.data.displayName();
    }
    get name() {
        return FieldChooserItem.getName(this.data);
    }
    get isHierarchy() {
        return this.data.nodeType && this.data.nodeType() === 'OlapHierarchy';
    }
    get isLeaf() {
        return this.data.isDataFieldNode();
    }
    get isGroup() {
        return !this.isLeaf && !this.isList;
    }
    get type() {
        return this.data.isDataFieldNode() ? this.data.fieldType() : '';
    }
    get normalizedType() {
        if (this.isList)
            return 'list';
        if (!this.isLeaf || this.type === undefined || this.data.nodeType && this.data.nodeType() === 'DataSource') {
            return '';
        }
        switch (this.type) {
            case 'Text':
                return 'string';
            case 'Integer':
                return 'integer';
            case 'Float':
            case 'Double':
            case 'Decimal':
                return 'float';
            case 'DateTime':
                return 'datetime';
            case 'Bool':
            case 'Boolean':
                return 'boolean';
        }
        return 'custom';
    }
    get isCalcField() {
        return this.data.nodeType && this.data.nodeType() === 'CalculatedDataField';
    }
    get isCorruptedCalcField() {
        return this.isCalcField && this.data.isCorruptedCalcField();
    }
    get isOlap() {
        return _data_field_1.DataField.isOlap(this.data.dataMember());
    }
    get isOlapDimension() {
        return this.data.nodeType && this.data.nodeType() === 'OlapDimension';
    }
    get isOlapDimensionHierarchy() {
        return this.data.nodeType && this.data.nodeType() === 'OlapHierarchy';
    }
    get isOlapMeasure() {
        return this.data.nodeType && (this.data.nodeType() === 'OlapMeasure' || this.data.nodeType() === 'OlapMeasureFolder');
    }
    get isAggregate() {
        return this.data.isAggregate && this.data.isAggregate();
    }
    get isList() {
        return !_data_source_browser_1.isNonCollectionDataField(this.data);
    }
    get disabled() {
        return this.isList;
    }
    get typeTooltip() {
        if (this.isList)
            return _default_1.getLocalizationById('DashboardStringId.MessageCollectionTypesNotSupported');
        if (this.isCorruptedCalcField)
            return _default_1.getLocalizationById('DashboardWebStringId.DataSources.CalculatedField.Corrupted');
        return this.data.fieldType();
    }
}
exports.FieldChooserItem = FieldChooserItem;
class TreeViewFieldChooserItem extends FieldChooserItem {
    constructor(data, id, parentId) {
        super(data);
        this.data = data;
        this.id = id;
        this.parentId = parentId;
        this.selected = undefined;
    }
}
exports.TreeViewFieldChooserItem = TreeViewFieldChooserItem;
class FieldChooserList extends model_1.DisposableObject {
    constructor(owner, path = '', pathParts, _selectedField) {
        super();
        this.owner = owner;
        this.path = path;
        this.pathParts = pathParts;
        this._selectedField = _selectedField;
        this._scrollAfterInitialize = false;
        this.itemClick = (args) => {
            var item = args.itemData;
            if (!item.isLeaf) {
                this.owner.slide(this, item);
            }
            else {
                commonSelectedFieldName = item.data && item.data.dataMember();
                if (!this._selectedField() || (this._selectedField().dataMember() !== item.data.dataMember()) || ((item.data['dataSourceName']))) {
                    this._selectedField(item.data);
                }
            }
        };
        this.onInitialized = (e) => {
            this.component = e.component;
        };
        this.onContentReady = () => {
            if (this._scrollAfterInitialize) {
                this.scrollToSelectedItem();
            }
        };
        this.items = ko.observable();
        this.index = ko.observable(0);
        this.ready = ko.observable(false);
        this.selectedItemName = ko.observable([undefined]);
        this.loading = ko.observable(true);
        var fieldSelector = (field) => {
            if (field && ((field.dataMember() !== this.selectedItemName()[0]) || field['dataSourceName'])) {
                this.selectedItemName([field.dataMember()]);
            }
        };
        this.toDispose(_selectedField.subscribe(fieldSelector), {
            dispose: () => this.component = undefined
        });
        fieldSelector(_selectedField());
        this.reload();
        this.ancestors = pathParts && pathParts.length ? ['…'].concat(pathParts) : null;
    }
    reload() {
        this.items([]);
        var loadingTimeout = setTimeout(() => this.loading(true), 25);
        var { dataSource, dataMember, fieldPath } = this.owner.dataSourceBrowser.splitFullPath(this.path);
        this.owner.dataSourceBrowser.getDataFieldsArray(dataSource, dataMember, fieldPath, () => true).done(fields => {
            clearTimeout(loadingTimeout);
            this.items(fields
                .filter(field => !this.owner.filter || this.owner.filter(field))
                .map(field => new FieldChooserItem(field)));
            this.loading(false);
            this.scrollToSelectedItem();
        });
    }
    scrollToSelectedItem() {
        if (!this.component) {
            this._scrollAfterInitialize = true;
            return;
        }
        this._scrollAfterInitialize = false;
        var currentItemIndex = this.items().findIndex(x => x.name === this.selectedItemName()[0]);
        var pageIndex = Math.floor(currentItemIndex / 20);
        var _tryScrollToItem = () => {
            if (this.component['_dataSource'].pageIndex() >= pageIndex) {
                this.component.scrollToItem(currentItemIndex);
                return true;
            }
            return false;
        };
        if (_tryScrollToItem())
            return;
        for (var i = 0; i < pageIndex; i++) {
            this.component['_loadNextPage']().done(() => _tryScrollToItem());
        }
    }
}
exports.FieldChooserList = FieldChooserList;
class SliderController extends model_1.DisposableObject {
    constructor(params) {
        super();
        this.lists = ko.observableArray();
        this.isSliding = false;
        this.backClick = (pathItem, ancestors) => {
            if (!this.isSliding) {
                this.isSliding = true;
                var pathIndex = ancestors.length - 1 - ancestors.indexOf(pathItem);
                this.lists().forEach(list => list.index(list.index() + pathIndex));
                setTimeout(() => {
                    var removedLists = this.lists.splice(this.lists().length - pathIndex);
                    removedLists.forEach(x => x.dispose());
                    this.isSliding = false;
                }, FieldChooserController.TRANSITION_TIME);
            }
        };
        this.rootPath = params.startPath;
        this.dataSourceBrowser = params.dataSourceBrowser;
        this.filter = params.filter;
        this.selectedField = params.selectedField;
        this.lists([new FieldChooserList(this, this.rootPath(), [], this.selectedField)]);
        this.lists()[0].ready(true);
        this.toDispose({ dispose: () => this.lists().forEach(x => x.dispose()) });
    }
    slide(list, item) {
        if (!this.isSliding) {
            this.isSliding = true;
            var newList = new FieldChooserList(this, list.path === '' ? item.name : list.path + '.' + item.name, list.pathParts.concat([item.name]), this.selectedField);
            newList.index(1);
            this.lists.push(newList);
            setTimeout(() => {
                newList.ready(true);
                this.lists().forEach(list => list.index(list.index() - 1));
                setTimeout(() => {
                    this.isSliding = false;
                }, FieldChooserController.TRANSITION_TIME);
            }, 1);
        }
    }
}
exports.SliderController = SliderController;
SliderController.TRANSITION_TIME = 310;
class FieldChooserController extends SliderController {
    constructor(params) {
        super(params);
        this.addCalcField = () => {
            var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
            this.calcFieldEditor
                .showAddDialog(dataSource, dataMember)
                .then(cf => this.onCalcFieldSaveHandler(cf));
        };
        this.editCalcField = () => {
            var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
            var calcField = this.getCurrentCalcField();
            this.calcFieldEditor
                .showEditDialog(calcField, dataSource, dataMember)
                .then(cf => this.onCalcFieldSaveHandler(cf));
        };
        this.removeCalcField = () => {
            var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
            var calcField = this.getCurrentCalcField();
            this.calcFieldEditor
                .removeCalcField(calcField, dataSource)
                .then(cf => this.onCalcFieldSaveHandler(cf));
        };
        this._inappropriateCalcFieldConfirmation = new _confirm_dialog_1.ConfirmDialogViewModel();
        this.onCalcFieldSaveHandler = (calcField) => {
            var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
            let updateUI = () => {
                if (this.isListMode.peek()) {
                    let list = this.lists()[0];
                    list.reload();
                }
                else {
                    this.treeViewInstanceResolver.then(treeViewInstance => treeViewInstance.option('dataSource', treeViewInstance.option('dataSource')));
                }
            };
            updateUI();
            return this.dataSourceBrowser
                .findDataField(dataSource, dataMember, calcField.name())
                .then(field => {
                let deferred = _jquery_helpers_1.createJQueryDeferred();
                if (!this.filter || this.filter(field)) {
                    this.selectedField(field);
                    this._navigateToSelection(field.dataMember());
                    deferred.resolve();
                }
                else {
                    this._inappropriateCalcFieldConfirmation
                        .confirm(_default_1.getLocalizationById('DashboardWebStringId.Dialog.Warning'), _default_1.getLocalizationById('DashboardWebStringId.Dialog.UnsupportedCalculatedField'), _default_1.getLocalizationById('DashboardStringId.ButtonOK'))
                        .done(() => deferred.resolve({}))
                        .fail(() => deferred.reject());
                }
                return deferred.promise();
            })
                .then(updateUI);
        };
        this.getCurrentCalcField = () => {
            if (!this.selectedField())
                return null;
            var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
            var dataSourceInstance = this.dataSourceBrowser.findDataSource(dataSource);
            if (!dataSourceInstance.hasCalculatedFields)
                return null;
            return dataSourceInstance.calculatedFields().filter(cf => cf.name() == this.selectedField().name())[0];
        };
        this.isCalcFieldSelected = ko.pureComputed(() => {
            return this.selectedField() && this.selectedField().nodeType && this.selectedField().nodeType() === 'CalculatedDataField';
        });
        this.isSearchMode = ko.observable(false);
        this.searchString = ko.observable().extend({ throttle: 300 });
        this.searchResults = ko.observableArray();
        this.hasSearchResults = ko.observable(false);
        this.searchButtonClick = (_, ev) => {
            var newValue = !this.isSearchMode();
            this.isSearchMode(newValue);
            if (newValue) {
                let textBoxContainer = ev.currentTarget.parentElement.parentElement.querySelector('.dx-textbox');
                let textBox = text_box_1.default.getInstance(textBoxContainer);
                setTimeout(() => {
                    textBox.focus();
                    textBox.reset();
                }, 100);
            }
            else {
                this.searchString(null);
            }
        };
        this.selectViaSearchResults = (data) => {
            var searchResultItem = data.itemData;
            if ((searchResultItem.item.data.dataMember != null) &&
                (!this.selectedField() || (searchResultItem.item.data.dataMember() !== this.selectedField().dataMember()))) {
                this.selectedField(searchResultItem.item.data);
            }
        };
        this.selectedSearchResult = ko.computed(() => {
            return this.searchResults().filter(res => res.item.data.dataMember && this.selectedField() && res.item.data.dataMember() === this.selectedField().dataMember())[0];
        });
        this.isListMode = isListMode;
        this.setListMode = () => {
            isListMode(true);
            _utils_1.LocalStorageHelper.setItem('dx-dashboard-field-chooser-is-list-mode', 'true');
            this.lists().forEach((list, index) => list.index.notifySubscribers());
        };
        this.setTreeMode = () => {
            isListMode(false);
            _utils_1.LocalStorageHelper.setItem('dx-dashboard-field-chooser-is-list-mode', 'false');
        };
        this.hasGroups = ko.computed(() => { return !this.lists()[0].items().every(item => item.isLeaf); });
        this.treeViewInstanceResolver = _jquery_helpers_1.createJQueryDeferred();
        var selectedFieldName = this.selectedField() && this.selectedField().dataMember() || commonSelectedFieldName;
        this._navigateToSelection(selectedFieldName);
        if (!this.selectedField()) {
            var navigationSubscription = this.selectedField.subscribe(newSelection => {
                if (newSelection) {
                    this._navigateToSelection(newSelection.dataMember());
                    navigationSubscription.dispose();
                }
            });
        }
        this.searchString.subscribe(searchFor => {
            this.searchResults([]);
            this.hasSearchResults(false);
            if (!!searchFor) {
                this.dataSourceBrowser.fuzzyFindFields(this.rootPath(), searchFor).done(res => {
                    this.searchResults(res
                        .filter(item => item.field.isDataFieldNode() && (!this.filter || this.filter(item.field)))
                        .map(item => ({
                        path: this.dataSourceBrowser.splitFullPath(item.path).fieldPath,
                        item: new FieldChooserItem(item.field)
                    })));
                    this.hasSearchResults(true);
                });
            }
        });
        ko.computed(() => {
            if (!this.hasGroups() && !this.isListMode.peek()) {
                this.isListMode(true);
            }
        });
        this.calcFieldEditor = new _calc_field_editor_1.CalcFieldEditor(this.dataSourceBrowser);
    }
    get dataSourceName() {
        var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(this.rootPath());
        return dataSource;
    }
    get canAddCalculatedField() {
        return this.calcFieldEditor.canAddCalculatedField(this.dataSourceName);
    }
    _navigateToSelection(selectedFieldName) {
        if (!selectedFieldName) {
            return;
        }
        var pathComponents = (this.rootPath() || '').split('.');
        var fieldChooserConstraint = (field) => { return !this.filter || this.filter(field); };
        this.dataSourceBrowser.findPathToFieldInTree(pathComponents.shift(), pathComponents.join('.'), selectedFieldName, fieldChooserConstraint)
            .done(fieldPath => {
            if (this.isListMode()) {
                if (fieldPath) {
                    if (this.lists().length === 1) {
                        this.lists()[0].ready(false);
                        var selectionList = fieldPath.split('.');
                        var currentPath = this.rootPath(), currentPathParts = [];
                        selectionList.forEach((pathItem, index) => {
                            currentPath = currentPath + '.' + pathItem;
                            if (this.dataSourceBrowser.isFolder(currentPath)) {
                                currentPathParts = currentPathParts.concat(pathItem);
                                var newList = new FieldChooserList(this, currentPath, currentPathParts, this.selectedField);
                                newList.index(index + 1);
                                this.lists.push(newList);
                            }
                        });
                    }
                    this.isSliding = true;
                    this.lists().forEach((list, index) => list.index(index - this.lists().length + 1));
                    setTimeout(() => {
                        this.lists().forEach(list => list.ready(true));
                        this.isSliding = false;
                    }, 1);
                }
                else {
                    this.isSliding = true;
                    this.lists().forEach((list, index) => list.index(index));
                    setTimeout(() => {
                        this.isSliding = false;
                        this.lists([this.lists()[0]]);
                        this.lists().forEach(list => list.ready(true));
                    }, SliderController.TRANSITION_TIME);
                }
            }
            else {
                this.treeViewInstanceResolver.then(treeViewInstance => {
                    if (fieldPath) {
                        var keys = fieldPath.split('.');
                        var nextNodeKey = this.rootPath(), num = 1;
                        while (keys.length) {
                            var keyparts = keys.splice(0, num);
                            var key = keyparts.join('.');
                            num++;
                            nextNodeKey = nextNodeKey + '.' + key;
                            treeViewInstance.expandItem(nextNodeKey);
                        }
                    }
                });
            }
        });
    }
    get dataSourceTreeOptions() {
        return {
            dataSource: {
                load: (options) => {
                    var parentId = options.filter && options.filter[1] || this.rootPath();
                    var result = _jquery_helpers_1.createJQueryDeferred();
                    var { dataSource, dataMember, fieldPath } = this.dataSourceBrowser.splitFullPath(parentId);
                    this.dataSourceBrowser.getDataFieldsArray(dataSource, dataMember, fieldPath, () => true).done(fields => {
                        var data = fields
                            .filter(field => !this.filter || this.filter(field))
                            .map(field => {
                            var name = FieldChooserItem.getName(field);
                            var item = new TreeViewFieldChooserItem(field, parentId + '.' + name, parentId === this.rootPath ? undefined : parentId);
                            item.selected = this.selectedField() && (field.dataMember() === this.selectedField().dataMember());
                            return item;
                        });
                        result.resolve(data);
                    });
                    return result.promise();
                },
            },
            rootValue: this.rootPath(),
            dataStructure: 'plain',
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            hasItemsExpr: 'isGroup',
            showCheckBoxesMode: 'none',
            selectNodesRecursive: false,
            selectionMode: 'single',
            onItemClick: (args) => {
                let fieldChooserItem = args.itemData;
                var field = fieldChooserItem.data;
                if (field.isDataFieldNode()) {
                    args.component.selectItem(args.itemData);
                }
            },
            onItemSelectionChanged: (args) => {
                let fieldChooserItem = args.itemData;
                var field = fieldChooserItem.data;
                commonSelectedFieldName = field && field.dataMember();
                if (!this.selectedField() || (this.selectedField().dataMember() !== field.dataMember())) {
                    this.selectedField(field);
                }
            },
            virtualModeEnabled: true,
            onInitialized: (e) => this.treeViewInstanceResolver.resolve(e.component)
        };
    }
}
exports.FieldChooserController = FieldChooserController;
ko.components.register('dx-field-chooser', {
    viewModel: {
        createViewModel: function (params) {
            return new FieldChooserController(params);
        }
    },
    template: { element: 'dx-field-chooser-slider' }
});
