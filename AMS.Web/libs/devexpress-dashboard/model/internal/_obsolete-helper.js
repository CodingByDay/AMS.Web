﻿/**
* DevExpress Dashboard (_obsolete-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineObsoleteMethod = exports.defineClassMoved = exports.defineObsoleteProperty = exports.ClassMemberType = void 0;
exports.ClassMemberType = {
    method: 'method',
    property: 'property'
};
function obsoleteWarn(memberType, oldMemberName, newMemberName) {
    return `The ${oldMemberName} ${memberType} is obsolete.` + (newMemberName ? ` Use the ${newMemberName} ${memberType} instead.` : '');
}
function defineObsoleteProperty(info) {
    Object.defineProperty(info.target, info.memberName, {
        get: () => {
            if (!info.ignoreWarmMessage) {
                let message = info.warmMessage ? info.warmMessage : obsoleteWarn(exports.ClassMemberType.property, info.oldMemberDisplayName, info.newMemberDisplayName);
                console.warn(message);
            }
            return info.action();
        },
        enumerable: false,
        configurable: true
    });
}
exports.defineObsoleteProperty = defineObsoleteProperty;
function defineClassMoved(className, sourceNamespace, destNamespace, sourceNamespaceName, destNamespaceName, additionalInfo) {
    defineObsoleteProperty({
        target: sourceNamespace,
        memberName: className,
        warmMessage: 'The ' + className + ' class was moved from the ' + sourceNamespaceName + ' to the ' + destNamespaceName + '. ' + additionalInfo,
        action: () => destNamespace[className]
    });
}
exports.defineClassMoved = defineClassMoved;
function defineObsoleteMethod(info) {
    info.target[info.memberName] = function (...args) {
        if (!info.ignoreWarmMessage) {
            let message = info.warmMessage ? info.warmMessage : obsoleteWarn(exports.ClassMemberType.method, info.oldMemberDisplayName, info.newMemberDisplayName);
            console.warn(message);
        }
        return info.action.apply(info.target, args);
    };
}
exports.defineObsoleteMethod = defineObsoleteMethod;
