/**
 * DevExtreme (esm/viz/translators/datetime_translator.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dateUtils from "../../core/utils/date";

function parse(value) {
    return null !== value ? new Date(value) : value
}
export default {
    fromValue: parse,
    toValue: parse,
    _add: dateUtils.addDateInterval,
    convert: dateUtils.dateToMilliseconds
};
