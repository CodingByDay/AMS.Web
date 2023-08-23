import dxTabPanel from 'devextreme/ui/tab_panel';
import { TabPanelSelectionChangedHandler, TabPanelTitleClickHandler } from '../../dxt-utils/dxt-utils/devextreme-types';
import { IRibbonItemOptions } from './i-ribbon-item-options';
import { InteractiveItemOptions } from './toolbar-items/toolbar-interactive-item';
export interface IRibbonItem {
    name?: string | number;
    setEnabled(enabled: boolean): void;
    setVisible(visible: boolean): void;
    setValue(value: any): void;
}
export declare type OnCommandExecutedHandler = (e: {
    item: IRibbonItem;
    parameter: any;
}) => void;
export declare type OnToolbarItemStateChangedHandler = (e: {
    item: IRibbonItem;
}) => void;
export declare type OnToolbarItemCreatedHandler = (e: {
    options: InteractiveItemOptions;
    item: IRibbonItem;
    tabIndex: number;
}) => void;
export interface IRibbonContextItemsCategory {
    name: string | number;
    items: IRibbonItemOptions[];
}
export interface IRibbonOptions {
    element: HTMLElement;
    items: IRibbonItemOptions[];
    contextItemsCategories?: IRibbonContextItemsCategory[];
    activeTabIndex: number;
    onTitleClickHandler?: TabPanelTitleClickHandler;
    onSelectionChangedHandler?: TabPanelSelectionChangedHandler;
    onOnToolbarItemCreated?: OnToolbarItemCreatedHandler;
    onCommandExecuted?: OnCommandExecutedHandler;
    onOpened?: OnToolbarItemStateChangedHandler;
    onClosed?: OnToolbarItemStateChangedHandler;
}
export declare class Ribbon {
    private options;
    private tabPanel;
    private toolbars;
    private toolBarItemsByName;
    private contextItemIndexesByCategoryName;
    get element(): HTMLElement;
    constructor(options: IRibbonOptions);
    dispose(): void;
    private static hideNode;
    private shouldApplyLocalization;
    private applyLocalizationId;
    private applyLocalizationIdToRibbonItem;
    private applyLocalizationIdToRibbonItems;
    private applyLocalizationIdToSubMenuItemOptions;
    render(): void;
    getActiveTabIndex(): number;
    setActiveTabIndex(index: number): void;
    setItemVisible(itemIndex: number, visible: boolean): void;
    getItemVisible(itemIndex: number): boolean;
    setContextItemsCategoryVisible(categoryName: string | number, visible: boolean): void;
    getContextItemsCategoryVisible(categoryName: string): boolean;
    getContextItemsIndexes(categoryName: string | number): number[];
    getTabPanel(): dxTabPanel;
    getItems(name: string | number): IRibbonItem[] | null;
    adjustControl(): void;
    private getRibbonItems;
    private createToolbar;
    private getToolbarItemTemplates;
    private getToolbarItems;
    private interactiveToolbarItemFactory;
    private addItemToCache;
    private raiseOnOnToolbarItemCreated;
    containsChild(element: HTMLElement): boolean;
}
//# sourceMappingURL=ribbon.d.ts.map