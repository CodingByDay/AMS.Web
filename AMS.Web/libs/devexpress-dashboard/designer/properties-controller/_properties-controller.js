﻿/**
* DevExpress Dashboard (_properties-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesController = void 0;
const ko = require("knockout");
const _accordion_tab_1 = require("./_accordion-tab");
class PropertiesController {
    constructor() {
        this._disposables = [];
        this.mainModel = ko.observable();
        this.secondaryModel = ko.observable();
        this.currentTab = ko.observable('');
        this.accordionDataSource = ko.observable([]);
        this.secondaryAccordionDataSource = ko.observable([]);
        this.computator = ko.computed(() => {
            let newTabs = [];
            let oldTabs = this.accordionDataSource;
            if (this.secondaryModel() && this.secondaryModel().data) {
                newTabs = newTabs.concat(ko.unwrap(this.secondaryModel().data.propertiesTabs));
                oldTabs = this.secondaryAccordionDataSource;
            }
            else if (this.mainModel() && this.mainModel().data) {
                newTabs = newTabs.concat(ko.unwrap(this.mainModel().data.propertiesTabs));
            }
            newTabs.forEach((tab, index) => { if (!tab.orderNo)
                tab.orderNo = 100 + index; });
            newTabs = newTabs
                .sort((a, b) => { return (a.orderNo) - (b.orderNo); });
            if ((newTabs.length === oldTabs().length)
                && newTabs.every(t => t instanceof _accordion_tab_1.AccordionTab)
                && oldTabs().every(t => t instanceof _accordion_tab_1.AccordionTab)) {
                var thesame = true;
                for (var i = 0; i < newTabs.length; i++) {
                    thesame = thesame && oldTabs()[i].name === newTabs[i].name;
                }
                if (thesame) {
                    for (var i = 0; i < newTabs.length; i++) {
                        oldTabs()[i].grabData(newTabs[i]);
                    }
                }
                else {
                    const tabsToDispose = oldTabs();
                    oldTabs(newTabs);
                    tabsToDispose.filter(tab => !newTabs.some(newTab => newTab === tab)).forEach(tab => tab && tab.dispose());
                }
            }
            else {
                const tabsToDispose = oldTabs();
                oldTabs(newTabs);
                tabsToDispose.filter(tab => !newTabs.some(newTab => newTab === tab)).forEach(tab => tab && tab.dispose());
            }
        });
        this.selectedIndex = ko.computed({
            read: () => {
                var newTabs = this.accordionDataSource();
                var theSameTab = newTabs.filter(tab => (tab.category === this.currentTab()) && tab.visible())[0];
                if (!theSameTab) {
                    theSameTab = newTabs.filter(tab => !tab.headerTemplate && tab.visible())[0];
                    theSameTab = theSameTab || newTabs[0];
                }
                return newTabs.indexOf(theSameTab);
            },
            write: (index) => {
                var newSelectedItem = this.accordionDataSource()[index];
                if (!!newSelectedItem) {
                    this.currentTab(newSelectedItem.category);
                }
                this.secondaryModel(undefined);
            }
        }).extend({ notify: 'always', deferred: true });
        this.secondarySelectedIndex = ko.observable(0);
        this.processDataItemClick = (data) => {
            var model = data.item;
            if (!this.mainModel() || !this.mainModel().data || ko.unwrap(this.mainModel().data.model) !== model) {
                data.click(model);
            }
            else {
                this.mainModel(null);
            }
        };
        this._disposables.push(this.mainModel.subscribe(() => this.secondaryModel(null), this, 'beforeChange'));
        this._disposables.push(this.mainModel.subscribe(() => {
            var newValue = this.mainModel.peek();
            if (newValue && newValue.data && newValue.containingCollection) {
                this._disposables.push(newValue.containingCollection.subscribe(changes => {
                    changes.forEach(arrayChange => {
                        var change = arrayChange;
                        if (change.status === 'deleted'
                            && this.mainModel()
                            && ko.unwrap(this.mainModel().data.model) === change.value) {
                            this.mainModel(null);
                        }
                    });
                }, null, 'arrayChange'));
            }
            this.secondaryModel(null);
        }));
        this._disposables.push(this.secondaryModel.subscribe(() => this.secondarySelectedIndex(0), this, 'beforeChange'));
        this._disposables.push(this.secondaryModel.subscribe(() => {
            var newValue = this.secondaryModel.peek();
            if (newValue && newValue.data && newValue.containingCollection) {
                this._disposables.push(newValue.containingCollection.subscribe(changes => {
                    changes.forEach(arrayChange => {
                        var change = arrayChange;
                        if (change.status === 'deleted'
                            && this.secondaryModel()
                            && ko.unwrap(this.secondaryModel().data.model) === change.value) {
                            this.secondaryModel(null);
                        }
                    });
                }, null, 'arrayChange'));
            }
        }));
        this._disposables.push(this.computator);
    }
    dispose() {
        this.accordionDataSource().forEach(tab => tab && tab.dispose());
        this._disposables.forEach((d) => {
            d.dispose();
        });
        this.selectedIndex.dispose();
    }
}
exports.PropertiesController = PropertiesController;
