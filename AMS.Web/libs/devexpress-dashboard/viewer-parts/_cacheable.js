﻿/**
* DevExpress Dashboard (_cacheable.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheable = exports.resetGlobalSizeCache = void 0;
let globalCache = {};
function resetGlobalSizeCache() {
    globalCache = {};
}
exports.resetGlobalSizeCache = resetGlobalSizeCache;
function cacheable(cacheKey) {
    return (target, propertyKey, descriptor) => {
        if (typeof target !== 'function') {
            throw Error('The cacheable decorator can be applied only for static methods');
        }
        return {
            value: (...args) => {
                if (!globalCache[cacheKey]) {
                    globalCache[cacheKey] = {};
                }
                var functionCache = globalCache[cacheKey];
                var argsKey = JSON.stringify(args);
                if (functionCache.hasOwnProperty(argsKey)) {
                    return functionCache[argsKey];
                }
                else {
                    var result = descriptor.value.apply(this, args);
                    functionCache[argsKey] = result;
                    return result;
                }
            }
        };
    };
}
exports.cacheable = cacheable;
