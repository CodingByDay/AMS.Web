/**
 * DevExtreme (esm/renovation/ui/scheduler/resources/hasResourceValue.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isDefined
} from "../../../../core/utils/type";
import {
    equalByValue
} from "../../../../core/utils/common";
export var hasResourceValue = (resourceValues, itemValue) => isDefined(resourceValues.find(value => equalByValue(value, itemValue)));
