/**
 * DevExtreme (esm/__internal/grids/grid_core/focus/m_focus_utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dateSerialization from "../../../../core/utils/date_serialization";
import {
    isDate,
    isFunction
} from "../../../../core/utils/type";
var getSortFilterValue = (sortInfo, rowData, _ref) => {
    var {
        isRemoteFiltering: isRemoteFiltering,
        dateSerializationFormat: dateSerializationFormat,
        getSelector: getSelector
    } = _ref;
    var {
        selector: selector
    } = sortInfo;
    var getter = isFunction(selector) ? selector : getSelector(selector);
    var rawValue = getter ? getter(rowData) : rowData[selector];
    var safeValue = isRemoteFiltering && isDate(rawValue) ? dateSerialization.serializeDate(rawValue, dateSerializationFormat) : rawValue;
    return {
        getter: getter,
        rawValue: rawValue,
        safeValue: safeValue
    }
};
export var UiGridCoreFocusUtils = {
    getSortFilterValue: getSortFilterValue
};
