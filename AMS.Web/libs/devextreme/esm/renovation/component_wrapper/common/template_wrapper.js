/**
 * DevExtreme (esm/renovation/component_wrapper/common/template_wrapper.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["isEqual"];
import {
    InfernoComponent,
    InfernoEffect
} from "@devextreme/runtime/inferno";
import {
    findDOMfromVNode
} from "inferno";
import {
    shallowEquals
} from "../../utils/shallow_equals";
import $ from "../../../core/renderer";
import domAdapter from "../../../core/dom_adapter";
import {
    getPublicElement
} from "../../../core/element";
import {
    isDefined
} from "../../../core/utils/type";
import {
    noop
} from "../../../core/utils/common";
import {
    recordMutations
} from "./mutations_recording";

function isDxElementWrapper(element) {
    return !!element.toArray
}
export function buildTemplateArgs(model, template) {
    var _model$data;
    var args = {
        template: template,
        model: _extends({}, model)
    };
    var _ref = null !== (_model$data = model.data) && void 0 !== _model$data ? _model$data : {},
        {
            isEqual: isEqual
        } = _ref,
        data = _objectWithoutPropertiesLoose(_ref, _excluded);
    if (isEqual) {
        args.model.data = data;
        args.isEqual = isEqual
    }
    return args
}

function buildTemplateContent(props, container) {
    var _props$model;
    var {
        data: data,
        index: index
    } = null !== (_props$model = props.model) && void 0 !== _props$model ? _props$model : {
        data: {}
    };
    if (data) {
        Object.keys(data).forEach(name => {
            if (data[name] && domAdapter.isNode(data[name])) {
                data[name] = getPublicElement($(data[name]))
            }
        })
    }
    var rendered = props.template.render(_extends({
        container: container,
        transclude: props.transclude
    }, {
        renovated: props.renovated
    }, !props.transclude ? {
        model: data
    } : {}, !props.transclude && Number.isFinite(index) ? {
        index: index
    } : {}));
    if (void 0 === rendered) {
        return []
    }
    return isDxElementWrapper(rendered) ? rendered.toArray() : [$(rendered).get(0)]
}
export class TemplateWrapper extends InfernoComponent {
    constructor(props) {
        super(props);
        this.cleanParent = noop;
        this.renderTemplate = this.renderTemplate.bind(this)
    }
    renderTemplate() {
        var node = findDOMfromVNode(this.$LI, true);
        var container = node.parentElement;
        this.cleanParent();
        this.cleanParent = recordMutations(container, () => {
            var content = buildTemplateContent(this.props, getPublicElement($(container)));
            if (0 !== content.length && !(1 === content.length && content[0] === container)) {
                node.after(...content)
            }
        })
    }
    shouldComponentUpdate(nextProps) {
        var {
            model: model,
            template: template
        } = this.props;
        var {
            isEqual: isEqual,
            model: nextModel,
            template: nextTemplate
        } = nextProps;
        var equalityComparer = null !== isEqual && void 0 !== isEqual ? isEqual : shallowEquals;
        if (template !== nextTemplate) {
            return true
        }
        if (!isDefined(model) || !isDefined(nextModel)) {
            return model !== nextModel
        }
        var {
            data: data,
            index: index
        } = model;
        var {
            data: nextData,
            index: nextIndex
        } = nextModel;
        if (index !== nextIndex) {
            return true
        }
        return !equalityComparer(data, nextData)
    }
    createEffects() {
        return [new InfernoEffect(this.renderTemplate, [this.props.template, this.props.model])]
    }
    updateEffects() {
        this._effects[0].update([this.props.template, this.props.model])
    }
    componentWillUnmount() {
        this.cleanParent()
    }
    render() {
        return null
    }
}
