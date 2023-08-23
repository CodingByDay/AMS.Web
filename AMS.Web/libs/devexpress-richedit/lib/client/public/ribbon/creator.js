import { Errors } from '@devexpress/utils/lib/errors';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { RibbonItemsData } from '../../bars/rich-edit-ribbon/ribbon-items-data';
import { RibbonItemType } from './items/base';
import { RibbonButtonItem } from './items/button';
import { RibbonColorBoxItem } from './items/color-box';
import { RibbonMenuItem } from './items/menu';
import { RibbonNumberBoxItem } from './items/number-box';
import { RibbonSelectBoxItem } from './items/select-box';
import { RibbonSubMenuItem } from './items/sub-menu';
import { Ribbon } from './ribbon';
import { RibbonContextTab, RibbonTab } from './tab';
export function createRibbon() {
    const ribbon = new Ribbon();
    addTabs(ribbon);
    addContextTabCategories(ribbon);
    return ribbon;
}
export function addTabs(ribbon, tabs = RibbonItemsData.getDefaultItems()) {
    tabs.forEach(tab => ribbon.insertTab(createTab(tab)));
}
export function addContextTabCategories(ribbon, contextTabCategories = RibbonItemsData.getDefaultContextItemsCategories()) {
    contextTabCategories.forEach(context => context.items.forEach(tab => ribbon.insertTab(createTab(tab, context.name))));
}
function createTab(rawTab, contextName) {
    const items = createItems(rawTab.items);
    return contextName === undefined ?
        new RibbonTab(rawTab.title, rawTab.id, items, rawTab.localizationId) :
        new RibbonContextTab(rawTab.title, rawTab.id, contextName, items, rawTab.localizationId);
}
function createItems(rawItems) {
    return ListUtils.map(rawItems, (rawItem) => {
        switch (rawItem.type) {
            case 'Button':
                return new RibbonButtonItem(rawItem.name, rawItem.text, {
                    showText: rawItem.alwaysShowText,
                    toggleMode: rawItem.isToggleMode,
                    icon: rawItem.icon,
                    beginGroup: rawItem.beginGroup,
                    localizationId: rawItem.localizationId,
                    selected: rawItem.selected
                });
            case 'ButtonGroup':
                throw new Error(Errors.NotImplemented);
            case 'ColorBox':
                return new RibbonColorBoxItem(rawItem.name, rawItem.text, rawItem.value, {
                    beginGroup: rawItem.beginGroup,
                    localizationId: rawItem.localizationId,
                    textOptions: rawItem.textOptions
                });
            case 'Menu':
                return new RibbonMenuItem(rawItem.name, rawItem.text, createSubItems(rawItem.items), {
                    beginGroup: rawItem.beginGroup,
                    icon: rawItem.icon,
                    showText: rawItem.alwaysShowText,
                    localizationId: rawItem.localizationId
                });
            case 'NumberBox':
                return new RibbonNumberBoxItem(rawItem.name, rawItem.text, {
                    beginGroup: rawItem.beginGroup,
                    min: rawItem.min,
                    max: rawItem.max,
                    step: rawItem.step,
                    width: rawItem.width,
                    localizationId: rawItem.localizationId,
                    format: rawItem.format,
                    value: rawItem.value
                });
            case 'SelectBox':
                return new RibbonSelectBoxItem(rawItem.name, rawItem.dataSource, {
                    beginGroup: rawItem.beginGroup,
                    width: rawItem.width,
                    displayExpr: rawItem.displayExpr,
                    valueExpr: rawItem.valueExpr,
                    value: rawItem.value,
                    showClearButton: rawItem.showClearButton,
                    placeholder: rawItem.placeholder,
                    acceptCustomValue: rawItem.acceptCustomValue,
                    onCustomItemCreating: rawItem.onCustomItemCreating,
                    textOptions: rawItem.textOptions,
                    _localizeDataSourceItems: rawItem._localizeDataSourceItems
                });
            default: throw new Error(Errors.InternalException);
        }
    });
    function createSubItems(items) {
        if (!items)
            return [];
        return ListUtils.map(items, (item) => {
            return new RibbonSubMenuItem(item.name, item.text, createSubItems(item.items), {
                icon: item.icon,
                beginGroup: item.beginGroup,
                localizationId: item.localizationId,
            });
        });
    }
}
export function createInnerTab(tab) {
    return {
        id: tab.id,
        title: tab.title,
        visible: true,
        items: createInnerItems(tab.items),
        localizationId: tab.localizationId,
    };
}
export function createInnerItems(items) {
    return ListUtils.map(items, (item) => {
        switch (item.type) {
            case RibbonItemType.Button:
                return {
                    type: 'Button',
                    name: item.id,
                    beginGroup: item.beginGroup,
                    text: item.text,
                    icon: item.icon,
                    alwaysShowText: item.showText,
                    isToggleMode: item.toggleMode,
                    selected: item.selected,
                    localizationId: item.localizationId,
                };
            case RibbonItemType.ColorBox:
                return {
                    type: 'ColorBox',
                    text: item.text,
                    value: item.value,
                    textOptions: item.textOptions,
                    name: item.id,
                    beginGroup: item.beginGroup,
                    localizationId: item.localizationId,
                };
            case RibbonItemType.Menu:
                return {
                    type: 'Menu',
                    items: getSubMenuItems(item.items),
                    name: item.id,
                    beginGroup: item.beginGroup,
                    text: item.text,
                    icon: item.icon,
                    alwaysShowText: item.showText,
                    localizationId: item.localizationId,
                };
            case RibbonItemType.NumberBox:
                return {
                    type: 'NumberBox',
                    min: item.min,
                    max: item.max,
                    step: item.step,
                    text: item.text,
                    width: item.width,
                    name: item.id,
                    beginGroup: item.beginGroup,
                    localizationId: item.localizationId,
                    format: item.format,
                    value: item.value
                };
            case RibbonItemType.SelectBox:
                return {
                    type: 'SelectBox',
                    dataSource: item.dataSource,
                    width: item.width,
                    displayExpr: item.displayExpr,
                    valueExpr: item.valueExpr,
                    name: item.id,
                    beginGroup: item.beginGroup,
                    value: item.value,
                    textOptions: item.textOptions,
                    showClearButton: item.showClearButton,
                    placeholder: item.placeholder,
                    acceptCustomValue: item.acceptCustomValue,
                    onCustomItemCreating: item.onCustomItemCreating,
                    _localizeDataSourceItems: item._localizeDataSourceItems
                };
            default:
                throw new Error(item.type == RibbonItemType.SubMenu ?
                    "Sub menu item must be placed under menu item" :
                    Errors.NotImplemented);
        }
    });
    function getSubMenuItems(items) {
        if (!items)
            return undefined;
        return ListUtils.map(items, (item) => {
            return {
                text: item.text,
                name: item.id,
                icon: item.icon,
                items: getSubMenuItems(item.items),
                beginGroup: item.beginGroup,
                localizationId: item.localizationId,
            };
        });
    }
}
