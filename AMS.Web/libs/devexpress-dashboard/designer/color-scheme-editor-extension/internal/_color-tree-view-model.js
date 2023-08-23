﻿/**
* DevExpress Dashboard (_color-tree-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorSchemeTreeViewEditor = exports.ColorTreeViewModel = exports.ColorEntryTreeItem = void 0;
const ko = require("knockout");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
class ColorEntryTreeItem {
    constructor(value, uniqueKey, entry, editColor, entryComputedColor) {
        this.value = value;
        this.uniqueKey = uniqueKey;
        this.entry = entry;
        this.items = [];
        this.expanded = true;
        this.custom = false;
        if (editColor) {
            this.editColor = (_, ev) => {
                editColor(entry, ev);
            };
            this.custom = entry.custom;
        }
        var entryColor = !!editColor && entryComputedColor;
        this.color = !!entryColor ? entryColor.css : null;
    }
}
exports.ColorEntryTreeItem = ColorEntryTreeItem;
class ColorTreeViewModel {
    constructor(params) {
        this.removeItem = (item) => {
            this.removeEntry(item.entry);
            this.selectedEntry(null);
        };
        this.selectedTreeItems = ko.observable([]);
        this.onItemSelectionChanged = (e) => {
            this.selectedEntry(e.node.itemData.entry);
        };
        this.dataSource = ko.computed(() => {
            var tree = [];
            params.dataSource().forEach(entry => {
                var plainValues = entry.dimensionKeys().map(dim => ({
                    displayValue: dim.displayText(),
                    id: dim.displayText()
                }));
                if (entry.measureKeys().length) {
                    plainValues.push({
                        displayValue: entry.measureKeys().map(m => m.displayText()).join(' | '),
                        id: entry.measureKeys().map(m => m._id).join(' | ')
                    });
                }
                let entryComputedColor = entry.paletteIndex() === null ? entry.color() : params.colorPalette()[entry.paletteIndex()];
                ColorTreeViewModel.construct(plainValues, tree, entry, ko.unwrap(params.editColor), entryComputedColor);
            });
            return tree;
        });
        this.colorPickerModel = params.colorPickerModel;
        this.isTreeMode = ko.computed(() => {
            return params.dataSource().length > 0 && (params.dataSource()[0].dimensionKeys().length + params.dataSource()[0].measureKeys().length) > 1;
        });
        this.allowModify = params.allowModify;
        this.selectedEntry = params.selectedEntry;
        this.addNewEntry = params.addNewEntry;
        this.removeEntry = ko.unwrap(params.removeEntry);
        this.allowAddNewEntry = _knockout_utils_1.safeComputed({ colorSchemeEntries: params.dataSource }, (args) => this.allowModify && args.colorSchemeEntries.some(entry => entry.dimensionKeys().length > 0));
    }
    static construct(values, children, entry, editColor = () => { }, entryComputedColor) {
        var value = values.shift();
        var foundChild = children.filter(item => item.uniqueKey === value.id)[0];
        if (!foundChild && !!value) {
            foundChild = new ColorEntryTreeItem(value.displayValue, value.id, entry, values.length === 0 ? editColor : null, entryComputedColor);
            children.push(foundChild);
        }
        if (foundChild && values.length > 0) {
            ColorTreeViewModel.construct(values, foundChild.items, entry, editColor, entryComputedColor);
        }
    }
}
exports.ColorTreeViewModel = ColorTreeViewModel;
const colorSchemeTreeViewEditor = (options) => context => ({
    template: args => colorSchemeTreeViewEditorTemplate(args, context, options)
});
exports.colorSchemeTreeViewEditor = colorSchemeTreeViewEditor;
const colorSchemeTreeViewEditorTemplate = (args, context, options) => {
    const div = document.createElement('div');
    div.classList.add('dx-dashboard-form-column-content-wrapper');
    let viewModel = new ColorTreeViewModel(options);
    ko.applyBindingsToNode(div, { template: { name: 'dx-dashboard-colors-view', data: viewModel } }, context.bindingContext);
    return div;
};
ko.components.register('dx-dashboard-colors-component', {
    viewModel: ColorTreeViewModel,
    template: { element: 'dx-dashboard-colors-view' }
});
