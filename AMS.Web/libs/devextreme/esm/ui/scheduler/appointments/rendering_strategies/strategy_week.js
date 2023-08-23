/**
 * DevExtreme (esm/ui/scheduler/appointments/rendering_strategies/strategy_week.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import VerticalRenderingStrategy from "./strategy_vertical";
class WeekAppointmentRenderingStrategy extends VerticalRenderingStrategy {
    isApplyCompactAppointmentOffset() {
        if (this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType()) {
            return false
        }
        return this.supportCompactDropDownAppointments()
    }
}
export default WeekAppointmentRenderingStrategy;
