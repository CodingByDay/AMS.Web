/**
 * DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.work_space_vertical.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import SchedulerWorkSpaceIndicator from "./ui.scheduler.work_space.indicator";
import {
    formatWeekdayAndDay
} from "../../../renovation/ui/scheduler/view_model/to_test/views/utils/base";
class SchedulerWorkspaceVertical extends SchedulerWorkSpaceIndicator {
    _getFormat() {
        return formatWeekdayAndDay
    }
    generateRenderOptions() {
        var options = super.generateRenderOptions();
        return _extends({}, options, {
            isGenerateTimePanelData: true
        })
    }
    _isRenderHeaderPanelEmptyCell() {
        return true
    }
}
export default SchedulerWorkspaceVertical;
