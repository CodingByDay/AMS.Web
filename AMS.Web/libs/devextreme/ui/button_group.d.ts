/**
* DevExtreme (ui/button_group.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    template,
} from '../core/templates/template';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    ItemInfo,
} from '../events/index';

import {
    CollectionWidgetItem,
    SelectionChangedInfo,
} from './collection/ui.collection_widget.base';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

import {
    ButtonType,
    ButtonStyle,
    SingleMultipleOrNone,
} from '../common';

export {
    ButtonType,
    ButtonStyle,
    SingleMultipleOrNone,
};

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxButtonGroup>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxButtonGroup>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxButtonGroup>;

/**
 * 
 */
export type ItemClickEvent = NativeEventInfo<dxButtonGroup, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxButtonGroup> & ChangedOptionInfo;

/**
 * 
 */
export type SelectionChangedEvent = EventInfo<dxButtonGroup> & SelectionChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxButtonGroupOptions extends WidgetOptions<dxButtonGroup> {
    /**
     * Specifies a template for all the buttons in the group.
     */
    buttonTemplate?: template | ((buttonData: any, buttonContent: DxElement) => string | UserDefinedElement);
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Configures buttons in the group.
     */
    items?: Array<Item>;
    /**
     * Specifies which data field provides keys used to distinguish between the selected buttons.
     */
    keyExpr?: string | Function;
    /**
     * A function that is executed when a button is clicked or tapped.
     */
    onItemClick?: ((e: ItemClickEvent) => void);
    /**
     * A function that is executed when a button is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: SelectionChangedEvent) => void);
    /**
     * Contains the keys of the selected buttons and allows selecting buttons initially.
     */
    selectedItemKeys?: Array<any>;
    /**
     * Contains the data objects that correspond to the selected buttons. The data objects are taken from the items array.
     */
    selectedItems?: Array<any>;
    /**
     * Specifies the button selection mode.
     */
    selectionMode?: SingleMultipleOrNone;
    /**
     * Specifies how buttons in the group are styled.
     */
    stylingMode?: ButtonStyle;
}
/**
 * The ButtonGroup is a UI component that contains a set of toggle buttons and can be used as a mode switcher.
 */
export default class dxButtonGroup extends Widget<dxButtonGroupOptions> { }

export type Item = dxButtonGroupItem;

/**
 * @deprecated Use Item instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxButtonGroupItem extends CollectionWidgetItem {
    /**
     * Specifies a text for the hint that appears when the button is hovered over or long-pressed.
     */
    hint?: string;
    /**
     * Specifies the icon to be displayed on the button.
     */
    icon?: string;
    /**
     * Specifies the button type.
     */
    type?: ButtonType;

    /**
     * Specifies the global attributes to be attached to the button group item&apos;s container element.
     */
    elementAttr?: { [key: string]: any };
}

export type Properties = dxButtonGroupOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxButtonGroupOptions;


