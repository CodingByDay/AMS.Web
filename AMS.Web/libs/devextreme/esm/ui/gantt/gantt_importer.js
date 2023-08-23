/**
 * DevExtreme (esm/ui/gantt/gantt_importer.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import Errors from "../widget/ui.errors";
import Gantt from "devexpress-gantt";
export function getGanttViewCore() {
    if (!Gantt) {
        throw Errors.Error("E1041", "devexpress-gantt")
    }
    return Gantt
}
