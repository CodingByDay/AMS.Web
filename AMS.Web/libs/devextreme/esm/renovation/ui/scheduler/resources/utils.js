/**
 * DevExtreme (esm/renovation/ui/scheduler/resources/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    getAppointmentColor as getDeferredAppointmentColor
} from "../../../../ui/scheduler/resources/utils";
export var getAppointmentColor = (resourceConfig, appointmentConfig) => getDeferredAppointmentColor(_extends({}, resourceConfig, {
    dataAccessors: resourceConfig.resourcesDataAccessors
}), appointmentConfig);
