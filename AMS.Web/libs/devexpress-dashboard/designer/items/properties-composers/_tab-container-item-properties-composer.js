﻿/**
* DevExpress Dashboard (_tab-container-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainerItemPropertiesComposer = void 0;
const ko = require("knockout");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _dashboard_layout_node_1 = require("../../../model/layout/metadata/_dashboard-layout-node");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _collection_editor_viewmodel_base_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel-base");
const _base_properties_composer_1 = require("./_base-properties-composer");
class TabContainerItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(editTabPageHandler) {
        super(() => { });
        this.editTabPageHandler = editTabPageHandler;
    }
    _composeTabsCore() { }
    composeTabs(tabContainer, args) {
        let tabContainerLayoutItem = args.dashboard.layout().findLayoutItem(tabContainer);
        if (!tabContainerLayoutItem) {
            return [];
        }
        const customItemTemplate = (itemData, itemIndex, itemElement) => {
            const item = ko.unwrap(itemData.item);
            const div = document.createElement('div');
            div.innerText = item && args.dashboard._getDisplayDashboardItem(item).name() || '';
            div.style.fontWeight = tabContainer._activeTabPage() === item ? '800' : 'normal';
            itemElement.appendChild(div);
            return div;
        };
        const refreshCallback = new _collection_editor_viewmodel_base_1.CollectionEditorRefreshCallback();
        const subscriptions = [];
        subscriptions.push(_knockout_utils_1.safeSubscribe({ activeTabPage: tabContainer._activeTabPage }, _ => refreshCallback.refresh()));
        subscriptions.push(_knockout_utils_1.subscribeToArrayItemProperties(tabContainerLayoutItem.childNodes, (node) => {
            const tabPage = node.item;
            return tabPage && [tabPage.showItemAsTabPage, tabPage.name].map(s => s.subscribe(() => refreshCallback.refresh()));
        }));
        const collectionEditorOptions = {
            createNewItemHandler: () => tabContainerLayoutItem._createTabPage(),
            editItemHandler: (layoutItem, args) => this.editTabPageHandler(layoutItem.item, args),
            removeItemHandler: (layoutItem) => layoutItem._createViewModel().delete(),
            enableRemoveItem: () => tabContainerLayoutItem.childNodes().length > 1,
            reorderItemsHandler: (layoutItem, direction) => {
                let prevActiveTab = tabContainer._activeTabPage();
                var index = tabContainerLayoutItem.childNodes().indexOf(layoutItem);
                tabContainerLayoutItem.childNodes.splice(index, 1);
                tabContainerLayoutItem.childNodes.splice(index + (direction === 'up' ? -1 : 1), 0, layoutItem);
                if (prevActiveTab !== tabContainer._activeTabPage()) {
                    tabContainer._activeTabPage(prevActiveTab);
                }
            },
            customTemplate: customItemTemplate,
            forceRefreshCallback: refreshCallback,
        };
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.TabContainer, 'DashboardStringId.DefaultNameTabContainerItem', new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: tabContainerLayoutItem,
                properties: [
                    Object.assign(Object.assign({}, _dashboard_layout_node_1.layoutItemsSerializable), { displayName: 'DashboardWebStringId.TabPages', formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })
                ],
                disposableModelSubscriptions: subscriptions,
            }))
        ];
    }
}
exports.TabContainerItemPropertiesComposer = TabContainerItemPropertiesComposer;
