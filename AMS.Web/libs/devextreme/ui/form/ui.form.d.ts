/**
* DevExtreme (ui/form/ui.form.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Specifies dependency between the screen factor and the count of columns.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface ColCountResponsible {
    /**
     * The count of columns for a large screen size.
     */
    lg?: number;
    /**
     * The count of columns for a middle-sized screen.
     */
    md?: number;
    /**
     * The count of columns for a small-sized screen.
     */
    sm?: number;
    /**
     * The count of columns for an extra small-sized screen.
     */
    xs?: number;
}
