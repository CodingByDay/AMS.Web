/**
 * DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.work_space_day.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import registerComponent from "../../../core/component_registrator";
import {
    VIEWS
} from "../constants";
import SchedulerWorkSpaceVertical from "./ui.scheduler.work_space_vertical";
var DAY_CLASS = "dx-scheduler-work-space-day";
class SchedulerWorkSpaceDay extends SchedulerWorkSpaceVertical {
    get type() {
        return VIEWS.DAY
    }
    _getElementClass() {
        return DAY_CLASS
    }
    _renderDateHeader() {
        return 1 === this.option("intervalCount") ? null : super._renderDateHeader()
    }
    renderRHeaderPanel() {
        if (1 === this.option("intervalCount")) {
            super.renderRHeaderPanel(false)
        } else {
            super.renderRHeaderPanel(true)
        }
    }
}
registerComponent("dxSchedulerWorkSpaceDay", SchedulerWorkSpaceDay);
export default SchedulerWorkSpaceDay;
