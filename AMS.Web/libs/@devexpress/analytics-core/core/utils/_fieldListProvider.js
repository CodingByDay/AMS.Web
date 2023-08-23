﻿/**
* DevExpress Analytics (core\utils\_fieldListProvider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
export class FieldListProvider {
    constructor(fieldListCallback, rootItems, extenders, rootItemsNoDragable = false) {
        this.deferreds = [];
        this._extenders = extenders;
        this.getItems = (pathRequest) => {
            var result = $.Deferred();
            var items = [];
            if (this._beforeFieldListCallback(pathRequest, items)) {
                result.resolve(items);
            }
            else if (rootItems && !pathRequest.fullPath) {
                items.push.apply(items, $.map(rootItems(), (item) => {
                    var _el = { name: item.id || item.ref, displayName: item.name, isList: true, specifics: item.specifics || 'ListSource', dragData: { noDragable: false } };
                    if (rootItemsNoDragable)
                        delete _el.dragData;
                    return _el;
                }));
                this._afterFieldListCallBack(pathRequest, items);
                result.resolve(items);
            }
            else {
                this._patchRequest(pathRequest, rootItems);
                this.deferreds.push(result);
                fieldListCallback(pathRequest).done((fields) => {
                    items.push.apply(items, fields);
                    this._afterFieldListCallBack(pathRequest, items);
                    result.resolve(items);
                })
                    .fail((error) => result.reject(error))
                    .always(() => this.deferreds.splice(this.deferreds.indexOf(result), 1));
            }
            return result.promise();
        };
        this.dispose = () => {
            this.getItems = null;
            fieldListCallback = null;
            this.deferreds.forEach(result => result.reject());
        };
    }
    _patchRequest(request, dataSources) {
        if (!dataSources) {
            return;
        }
        var dss = dataSources.peek();
        for (var i = 0; i < dss.length; i++) {
            if (dss[i].id === request.id && !!request.id) {
                request.ref = undefined;
                return;
            }
            if (dss[i].ref === request.ref && !!request.ref) {
                request.id = undefined;
                return;
            }
        }
    }
    _beforeFieldListCallback(request, items) {
        return !!this._extenders && this._extenders.some((extender) => { return extender.beforeItemsFilled(request, items); });
    }
    _afterFieldListCallBack(request, items) {
        this._extenders && this._extenders.forEach((extender) => { extender.afterItemsFilled && extender.afterItemsFilled(request, items); });
    }
}
