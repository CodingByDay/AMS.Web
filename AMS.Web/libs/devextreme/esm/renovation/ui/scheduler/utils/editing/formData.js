/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/editing/formData.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
export var createFormData = appointment => _extends({}, appointment, {
    repeat: !!appointment.recurrenceRule
});
