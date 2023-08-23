/**
 * DevExtreme (esm/ui/scheduler/workspaces/view_model/view_data_generator_day.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    calculateStartViewDate
} from "../../../../renovation/ui/scheduler/view_model/to_test/views/utils/day";
import {
    ViewDataGenerator
} from "./view_data_generator";
export class ViewDataGeneratorDay extends ViewDataGenerator {
    _calculateStartViewDate(options) {
        return calculateStartViewDate(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount))
    }
}
