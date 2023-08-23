/**
* DevExtreme (utils.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Compiles a getter function from a getter expression.
 */
export function compileGetter(expr: string | Array<string>): Function;

/**
 * Compiles a setter function from a setter expression.
 */
export function compileSetter(expr: string | Array<string>): Function;
