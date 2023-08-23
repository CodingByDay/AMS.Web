﻿/**
* DevExpress Dashboard (_flat-item-provider-wrapper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatItemProviderWrapper = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
class FlatItemProviderWrapper {
    constructor(itemsProvider) {
        this.itemsProvider = itemsProvider;
    }
    getItems(path) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        this.itemsProvider.getItems(path).done(items => {
            if (!path.fullPath) {
                def.resolve(items);
            }
            else {
                var leafs = items.filter(i => !i.isList);
                var nodePromises = items
                    .filter(i => i.isList)
                    .map(node => {
                    var newPath = {
                        dataSource: path.dataSource,
                        fullPath: path.fullPath + '.' + node.name,
                        path: path.path + '.' + node.name,
                        id: path.id,
                        pathParts: path.pathParts && path.pathParts.concat(node.name) || undefined,
                        ref: path.ref
                    };
                    return this.itemsProvider.getItems(newPath);
                });
                if (nodePromises.length) {
                    _jquery_helpers_1.jqueryWhenArray(nodePromises).done((...itemArray) => {
                        var itemFlatList = itemArray.reduce((acc, items) => acc.concat(items), []);
                        def.resolve(leafs.concat(itemFlatList));
                    });
                }
                else {
                    def.resolve(leafs);
                }
            }
        });
        return def.promise();
    }
}
exports.FlatItemProviderWrapper = FlatItemProviderWrapper;
