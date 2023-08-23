/**
* DevExtreme (animation/frame.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Cancels an animation frame request scheduled with the requestAnimationFrame method.
 */
export function cancelAnimationFrame(requestID: number): void;

/**
 * Makes the browser call a function to update animation before the next repaint.
 */
export function requestAnimationFrame(callback: Function): number;
