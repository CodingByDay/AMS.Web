/**
 * DevExtreme (esm/renovation/ui/scheduler/workspaces/base/ordinary_cell.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["children", "className", "colSpan", "styles"];
import {
    createVNode
} from "inferno";
import {
    BaseInfernoComponent
} from "@devextreme/runtime/inferno";
import {
    normalizeStyles
} from "@devextreme/runtime/inferno";
export var viewFunction = _ref => {
    var {
        props: {
            children: children,
            className: className,
            colSpan: colSpan,
            styles: styles
        }
    } = _ref;
    return createVNode(1, "td", className, children, 0, {
        style: normalizeStyles(styles),
        colSpan: colSpan
    })
};
export var CellProps = {};
export class OrdinaryCell extends BaseInfernoComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    get restAttributes() {
        var _this$props = this.props,
            restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
        return restProps
    }
    render() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            restAttributes: this.restAttributes
        })
    }
}
OrdinaryCell.defaultProps = CellProps;
