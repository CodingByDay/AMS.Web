/**
* DevExtreme (ui/dialog.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    DxPromise,
} from '../core/utils/deferred';

import {
    dxButtonOptions,
} from './button';

export interface CustomDialogOptions {
    title?: string;
    messageHtml?: string;
    buttons?: Array<dxButtonOptions>;
    showTitle?: boolean;
    message?: string;
    dragEnabled?: boolean;
}
/**
 * Displays an alert dialog with a message and OK button.
 */
export function alert(messageHtml: string, title: string): DxPromise<void>;

/**
 * Creates a confirmation dialog with a message and Yes and No buttons.
 */
export function confirm(messageHtml: string, title: string): DxPromise<boolean>;

/**
 * Creates a dialog with custom buttons.
 */
export function custom(options: CustomDialogOptions): any;
