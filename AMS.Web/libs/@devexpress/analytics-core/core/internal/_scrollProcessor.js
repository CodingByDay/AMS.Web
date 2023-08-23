﻿/**
* DevExpress Analytics (core\internal\_scrollProcessor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxScrollView from 'devextreme/ui/scroll_view';
import { Disposable } from '../../serializer/utils';
export class dxScrollProcessor extends Disposable {
    constructor(_container, _updateTime = 10) {
        super();
        this._container = _container;
        this._updateTime = _updateTime;
        this._currentOffsetY = 0;
        this._currentOffsetX = 0;
        this._scroll = null;
        this._updateInterval = null;
        this._scroll = dxScrollView.getInstance(this._container);
    }
    dispose() {
        this._scroll = null;
        this._container = null;
        this._updateInterval && clearTimeout(this._updateInterval);
        this._updateInterval = null;
    }
    _startUpdateScrollPosition() {
        this._updateInterval && clearInterval(this._updateInterval);
        this._updateInterval = setInterval(() => this._scroll.scrollTo({
            top: this._scroll.scrollTop() + this._currentOffsetY,
            left: this._scroll.scrollLeft() + this._currentOffsetX
        }), this._updateTime);
    }
    _calculateOffset(screenPosition, containerRect, offsetProperty) {
        var sizeProperty = offsetProperty === 'y' ? 'height' : 'width';
        if (screenPosition[offsetProperty] > (containerRect[offsetProperty] + containerRect[sizeProperty] - 50)) {
            return 5;
        }
        else if (screenPosition[offsetProperty] < (containerRect[offsetProperty] + 50)) {
            return -5;
        }
        return 0;
    }
    getScrollOffset() {
        return this._scroll.scrollOffset();
    }
    processOffset(screenPosition) {
        var containerRect = this._container.getBoundingClientRect();
        this._currentOffsetY = this._calculateOffset(screenPosition, containerRect, 'y');
        this._currentOffsetX = this._calculateOffset(screenPosition, containerRect, 'x');
        if (!this._currentOffsetX && !this._currentOffsetY) {
            this._updateInterval && clearInterval(this._updateInterval);
            this._updateInterval = null;
        }
        else if (!this._updateInterval) {
            this._startUpdateScrollPosition();
        }
    }
}
