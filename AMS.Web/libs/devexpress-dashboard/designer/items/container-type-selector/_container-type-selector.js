﻿/**
* DevExpress Dashboard (_container-type-selector.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerTypeSelector = void 0;
const ko = require("knockout");
const MAX_ICON_NUMBER = 7;
class ContainerTypeSelector {
    constructor(_containersMap, containerType, _containerGroupLocalization, _highlightedTypes) {
        this._containersMap = _containersMap;
        this.containerType = containerType;
        this._containerGroupLocalization = _containerGroupLocalization;
        this._highlightedTypes = _highlightedTypes;
        this.headerClick = (data, event) => {
            if (!this.hasFullList) {
                event.stopPropagation();
                return false;
            }
        };
        this.itemClick = (data, event) => {
            this.containerType(ko.unwrap(data.value));
            event.stopPropagation();
            event.originalEvent && event.originalEvent.stopPropagation();
            return false;
        };
    }
    get shortAvailableContainerTypes() {
        var iconNumber = MAX_ICON_NUMBER - (this.hasFullList ? 1 : 0);
        var highlightedTypes = this.availableContainerTypes
            .filter(type => {
            if (this._highlightedTypes) {
                return this._highlightedTypes.indexOf(type.value) !== -1;
            }
            else {
                return true;
            }
        })
            .slice(0, iconNumber);
        var selected = this.availableContainerTypes.filter(t => t.selected)[0];
        if (selected) {
            if (!highlightedTypes.filter(containerType => containerType.value === selected.value)[0]) {
                highlightedTypes.pop();
                highlightedTypes.unshift(selected);
            }
        }
        return highlightedTypes;
    }
    get hasFullList() {
        var length = Object.keys(this._containersMap).length;
        return (length > MAX_ICON_NUMBER);
    }
    get availableContainerTypes() {
        var containerTypes = Object.keys(this._containersMap || {}).map(name => {
            var info = this._containersMap[name];
            return {
                value: name,
                group: info.group,
                displayName: info.displayName,
                icon: info.icon,
                selected: name === this.containerType()
            };
        });
        return containerTypes;
    }
    get availableContainerTypeGroups() {
        return Object.keys(this._containersMap).reduce((groups, value) => {
            var info = this._containersMap[value];
            if (!groups.filter(group => group.name === info.group)[0]) {
                groups.push({
                    name: info.group,
                    displayName: this._containerGroupLocalization && this._containerGroupLocalization[info.group] || info.group
                });
            }
            return groups;
        }, []);
    }
}
exports.ContainerTypeSelector = ContainerTypeSelector;
