/**
* DevExtreme (core/options.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device,
} from './devices';

import {
    DeepPartial,
} from './index';

/**
 * 
 */
export type DefaultOptionsRule<T> = {
    device?: Device | Device[] | ((device: Device) => boolean);
    options: DeepPartial<T>;
};
