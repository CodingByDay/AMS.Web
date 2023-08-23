/**
* DevExtreme (events/pointer.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type Pointer = {
    down: 'dxpointerdown';
    up: 'dxpointerup';
    move: 'dxpointermove';
    cancel: 'dxpointercancel';
    enter: 'dxpointerenter';
    leave: 'dxpointerleave';
    over: 'dxpointerover';
    out: 'dxpointerout';
};
/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
declare const pointer: Pointer;
export default pointer;
