/**
* DevExtreme (core/guid.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * The Guid is an object used to generate and contain a GUID.
 */
export default class Guid {
    constructor();
    constructor(value: string);
    /**
     * Gets the GUID. Works identically to the valueOf() method.
     */
    toString(): string;
    /**
     * Gets the GUID. Works identically to the toString() method.
     */
    valueOf(): string;
}
