/**
* DevExtreme (data/apply_changes.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Applies an array of changes to a source data array.
 */
declare function applyChanges(data: Array<any>, changes: Array<any>, options?: { keyExpr?: string | Array<string>; immutable?: boolean }): Array<any>;

export default applyChanges;
