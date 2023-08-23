/**
 * DevExtreme (esm/integration/knockout/components.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import ko from "knockout";
import {
    getImageContainer
} from "../../core/utils/icon";
if (ko) {
    ko.bindingHandlers.dxControlsDescendantBindings = {
        init: function(_, valueAccessor) {
            return {
                controlsDescendantBindings: ko.unwrap(valueAccessor())
            }
        }
    };
    ko.bindingHandlers.dxIcon = {
        init: function(element, valueAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            var iconElement = getImageContainer(options);
            ko.virtualElements.emptyNode(element);
            if (iconElement) {
                ko.virtualElements.prepend(element, iconElement.get(0))
            }
        },
        update: function(element, valueAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            var iconElement = getImageContainer(options);
            ko.virtualElements.emptyNode(element);
            if (iconElement) {
                ko.virtualElements.prepend(element, iconElement.get(0))
            }
        }
    };
    ko.virtualElements.allowedBindings.dxIcon = true
}
