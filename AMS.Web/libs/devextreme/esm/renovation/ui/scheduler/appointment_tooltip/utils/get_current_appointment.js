/**
 * DevExtreme (esm/renovation/ui/scheduler/appointment_tooltip/utils/get_current_appointment.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export default appointmentItem => {
    var _ref, _settings$targetedApp;
    var {
        currentData: currentData,
        data: data,
        settings: settings
    } = appointmentItem;
    return null !== (_ref = null !== (_settings$targetedApp = null === settings || void 0 === settings ? void 0 : settings.targetedAppointmentData) && void 0 !== _settings$targetedApp ? _settings$targetedApp : currentData) && void 0 !== _ref ? _ref : data
};
