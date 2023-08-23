/**
 * DevExtreme (esm/renovation/ui/scroll_view/utils/get_permissible_wheel_direction.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL
} from "../common/consts";
export function permissibleWheelDirection(direction, isShiftKey) {
    switch (direction) {
        case DIRECTION_HORIZONTAL:
            return DIRECTION_HORIZONTAL;
        case DIRECTION_VERTICAL:
            return DIRECTION_VERTICAL;
        default:
            return isShiftKey ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL
    }
}
