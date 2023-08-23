﻿/**
* DevExpress Dashboard (resource-manager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManager = void 0;
const _localization_initializer_1 = require("../data/localization/_localization-initializer");
const _obsolete_helper_1 = require("../model/internal/_obsolete-helper");
require("../resources/_bindings");
const _resources_1 = require("../resources/_resources");
var resId = 'dx-dashboard-control-resources';
class ResourceManager {
    static embedBundledResources() {
        this._embedBundledResourcesCore('callFromApi');
    }
    static removeEmbeddedResources() {
        this._removeEmbeddedResourcesCore('callFromApi');
    }
    static _embedBundledResourcesCore(keyElement) {
        if (!document.body)
            throw 'HTML <body> element is not created yet.';
        if (!document.getElementById(resId)) {
            let res = '';
            for (let key in _resources_1.resources) {
                res += _resources_1.resources[key];
            }
            var div = document.createElement('div');
            div.style.display = 'none';
            div.innerHTML = res;
            div.id = resId;
            document.body.insertBefore(div, document.body.childNodes[0]);
        }
        if (ResourceManager._resourceManagerKeys.indexOf(keyElement) === -1) {
            ResourceManager._resourceManagerKeys.push(keyElement);
        }
    }
    static _removeEmbeddedResourcesCore(keyElement) {
        let resourceElement = document.getElementById(resId);
        if (resourceElement) {
            var index = ResourceManager._resourceManagerKeys.indexOf(keyElement);
            if (index !== -1) {
                if (keyElement === 'callFromApi' || ResourceManager._resourceManagerKeys.length === 1) {
                    resourceElement.parentNode.removeChild(resourceElement);
                    ResourceManager._resourceManagerKeys = [];
                }
                else if (typeof keyElement !== 'string') {
                    ResourceManager._resourceManagerKeys.splice(index, 1);
                }
            }
        }
    }
    static setLocalizationMessages(localizationMessages) {
        _localization_initializer_1.setLocalization(localizationMessages);
    }
    static registerIcon(icon) {
        var div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.visibility = 'hidden';
        div.style.left = '-10px';
        div.style.top = '-10px';
        div.style.width = '1px';
        div.style.height = '1px';
        if (typeof icon === 'string') {
            div.innerHTML = icon;
        }
        else {
            div.appendChild(icon);
        }
        document.body.insertBefore(div, document.body.childNodes[0]);
    }
}
exports.ResourceManager = ResourceManager;
ResourceManager._resourceManagerKeys = [];
_obsolete_helper_1.defineObsoleteMethod({
    target: ResourceManager,
    memberName: 'removeEmbededResources',
    oldMemberDisplayName: 'ResourceManager.removeEmbededResources',
    newMemberDisplayName: 'ResourceManager.removeEmbeddedResources',
    action: () => ResourceManager.removeEmbeddedResources()
});
