import { RibbonBarBase } from '../../base/bars/ribbon';
import { RichEditClientCommand } from '../../base/commands/client-command';
import { Ribbon } from '../../client-ribbon/client-ribbon/ribbon';
import { ToolbarSubMenuItem } from '../../client-ribbon/client-ribbon/toolbar-items/toolbar-sub-menu-item';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringMapUtils } from '@devexpress/utils/lib/utils/map/string';
import { createInnerTab } from '../public/ribbon/creator';
export class ClientRibbonBar extends RibbonBarBase {
    constructor(ownerControl, ownerElement, apiRibbon, fonts) {
        var _a;
        super(ownerControl);
        this.activeItem = null;
        this.ownerElement = ownerElement;
        this.init(apiRibbon, fonts);
        this.createControl((_a = apiRibbon.activeTabIndex) !== null && _a !== void 0 ? _a : 1);
    }
    updateContextItem(_commandKey) {
    }
    onCanvasMouseDown() { }
    init(apiRibbon, fonts) {
        this.items = [];
        this.contextItemsCategories = [];
        apiRibbon.tabs.forEach((tab) => {
            ClientRibbonBar.changeFontNameItems(tab, fonts);
            if (tab.contextTab) {
                const ctTab = (tab);
                let existingCat = ListUtils.elementBy(this.contextItemsCategories, (c => c.name == ctTab.category));
                if (!existingCat)
                    this.contextItemsCategories.push(existingCat = {
                        name: ctTab.category,
                        items: []
                    });
                existingCat.items.push(createInnerTab(ctTab));
            }
            else
                this.items.push(createInnerTab(tab));
        });
    }
    dispose() {
        this.ribbon.dispose();
    }
    checkActivateHeaderFooter(_selection) {
        return false;
    }
    createControl(activeTabIndex) {
        const element = document.createElement('div');
        element.tabIndex = 0;
        const firstChild = this.ownerElement.firstChild;
        if (firstChild)
            this.ownerElement.insertBefore(element, firstChild);
        else
            this.ownerElement.appendChild(element);
        this.createRibbon(element, activeTabIndex);
    }
    getCommandKeys() {
        return StringMapUtils.toListBy(this.getToolbarItemsCache(this.ribbon.getActiveTabIndex()), (_val, key) => key);
    }
    setItemValue(command, value) {
        const toolbarItems = this.getToolbarItemsCache(this.ribbon.getActiveTabIndex())[command];
        if (!toolbarItems)
            return;
        toolbarItems.forEach(toolbarItem => {
            toolbarItem.setValue(value);
        });
    }
    setItemEnabled(command, enabled) {
        const toolbarItems = this.getToolbarItemsCache(this.ribbon.getActiveTabIndex())[command];
        if (!toolbarItems)
            return;
        toolbarItems.forEach(toolbarItem => {
            toolbarItem.setEnabled(enabled);
        });
    }
    setItemVisible(command, visible) {
        const toolbarItems = this.getToolbarItemsCache(this.ribbon.getActiveTabIndex())[command];
        if (!toolbarItems)
            return;
        toolbarItems.forEach(toolbarItem => {
            toolbarItem.setVisible(visible);
        });
    }
    getContextKeys() {
        return this.contextItemsCategories ? this.contextItemsCategories.map(ci => ci.name) : [];
    }
    setContextItemVisible(key, visible) {
        this.ribbon.setContextItemsCategoryVisible(key, visible);
    }
    getTabVisible(tabIndex) {
        return this.ribbon.getItemVisible(tabIndex);
    }
    activateContextItem(key) {
        const indexes = this.ribbon.getContextItemsIndexes(key);
        if (indexes && indexes.length)
            this.ribbon.setActiveTabIndex(indexes[0]);
    }
    adjustControl() {
        this.ribbon.adjustControl();
    }
    getHeight() {
        const elem = this.ribbon.getTabPanel().element();
        return elem.clientHeight || (elem[0] ? elem[0].clientHeight : 0);
    }
    setActiveTabIndex(index) {
        this.ribbon.getTabPanel().option('selectedIndex', index);
    }
    getActiveTabIndex() {
        return this.ribbon.getTabPanel().option('selectedIndex');
    }
    createRibbon(element, activeTabIndex) {
        this.ribbon = new Ribbon({
            element: element,
            items: this.items,
            contextItemsCategories: this.contextItemsCategories,
            activeTabIndex: activeTabIndex,
            onTitleClickHandler: () => { this.owner.Focus(); },
            onSelectionChangedHandler: () => { this.updateItemsState(); },
            onCommandExecuted: this.getOnCommandExecutedHandler(),
            onOnToolbarItemCreated: this.getOnToolbarItemCreatedHandler(),
            onOpened: this.getOnOpenedToolbarItemHandler(),
            onClosed: this.getOnClosedToolbarItemHandler(),
        });
        this.ribbon.render();
    }
    getOnOpenedToolbarItemHandler() {
        return (e) => {
            if (e.item.name)
                this.activeItem = e.item;
        };
    }
    getOnClosedToolbarItemHandler() {
        return (e) => {
            if (e.item.name)
                this.activeItem = null;
        };
    }
    getOnCommandExecutedHandler() {
        return (e) => {
            if (e.item.name)
                this.raiseBarCommandExecuted(e.item.name, e.parameter);
        };
    }
    getOnToolbarItemCreatedHandler() {
        return (e) => {
            this.addToolbarItemToCache(e.item, e.item instanceof ToolbarSubMenuItem ? e.item.name : e.options.name, e.tabIndex);
        };
    }
    addToolbarItemToCache(item, command, tabIndex) {
        const cache = this.getToolbarItemsCache(tabIndex);
        let items = cache[command];
        if (items === undefined)
            items = cache[command] = [];
        items.push(item);
    }
    getToolbarItemsCache(tabIndex) {
        if (!this._toolbarItemsCache)
            this._toolbarItemsCache = {};
        if (!this._toolbarItemsCache[tabIndex])
            this._toolbarItemsCache[tabIndex] = {};
        return this._toolbarItemsCache[tabIndex];
    }
    static changeFontNameItems(tab, fonts) {
        if (fonts.fonts.length > 0) {
            tab.items.forEach(item => {
                if (item.id == RichEditClientCommand.ChangeFontName) {
                    const fontChangeItem = item;
                    fontChangeItem.dataSource = fonts.fonts.map(font => { return { text: font.name, value: font.name }; });
                }
            });
        }
    }
    closeActiveItem() {
        if (this.activeItem) {
            this.activeItem.widget.close();
            this.activeItem = null;
        }
    }
    containsChild(element) {
        return this.ribbon.containsChild(element);
    }
}
