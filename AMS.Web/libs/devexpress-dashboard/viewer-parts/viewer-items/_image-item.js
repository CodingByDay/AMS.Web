﻿/**
* DevExpress Dashboard (_image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageItem = void 0;
const $ = require("jquery");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _base_item_1 = require("./_base-item");
var BASE64_STRING_PREFIX = 'data:image/png;base64,';
class imageItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        this.imgSrc = this._getImageSource(this.options.ViewModel ? this.options.ViewModel.ImageViewModel : undefined);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var that = this;
        if (!changeExisting || !that.img) {
            that.img = $.fn.constructor('<img>').bind('load', function () {
                that._loadImage();
            });
            $.fn.constructor(element).append(that.img);
        }
        that.img.attr('src', that.imgSrc);
        return false;
    }
    _loadImage() {
        this._clearImgTag();
        this._initialWidth = this.img.width();
        this._initialHeight = this.img.height();
        this._loadedImgProcessing();
    }
    _clearImgTag() {
        var that = this, $contentRoot = $.fn.constructor(that.contentRoot), $img = $contentRoot.find('img');
        $contentRoot.css({ overflow: '' });
        $img.removeAttr('style');
        $img.removeAttr('align');
    }
    _loadedImgProcessing() {
        var that = this, $contentRoot = $.fn.constructor(that.contentRoot), containerWidth = $contentRoot.width(), containerHeight = $contentRoot.height(), img = $contentRoot.find('img'), viewModel = that.options.ViewModel, sizeMode = viewModel.SizeMode, horizontalAlignment = viewModel.HorizontalAlignment || 'Right', verticalAlignment = viewModel.VerticalAlignment || 'Top', centeringDirect, curImgHeight, curImgWidth;
        switch (sizeMode) {
            case 'Clip':
                $contentRoot.css({ overflow: 'hidden' });
                that._setHorizontalAlignment(img, horizontalAlignment);
                that._setVerticalAlignment(img, verticalAlignment);
                break;
            case 'Stretch':
                img.css({ width: '100%', height: '100%' });
                break;
            case 'Squeeze': {
                curImgHeight = img.height();
                curImgWidth = img.width();
                if ((curImgHeight >= containerHeight && curImgHeight <= that._initialHeight) || (curImgWidth >= containerWidth && curImgWidth <= that._initialWidth)) {
                    centeringDirect = that._setImgSizeWithProportions(img, containerHeight / containerWidth);
                    img.css({ marginTop: 0, marginLeft: 0 });
                }
                else {
                    img.css({
                        width: '',
                        height: ''
                    });
                    that._setHorizontalAlignment(img, horizontalAlignment);
                    that._setVerticalAlignment(img, verticalAlignment);
                }
                break;
            }
            case 'Zoom': {
                centeringDirect = that._setImgSizeWithProportions(img, containerHeight / containerWidth);
                break;
            }
            default: break;
        }
        if (centeringDirect === 'horizontalCentering') {
            that._setHorizontalAlignment(img, horizontalAlignment);
        }
        if (centeringDirect === 'verticalCentering') {
            that._setVerticalAlignment(img, verticalAlignment);
        }
    }
    _setHorizontalAlignment($img, horizontalAlignment) {
        if (horizontalAlignment === 'Center') {
            $img.css({ marginLeft: ($.fn.constructor(this.contentRoot).width() - $img.width()) / 2 });
            return;
        }
        $img.attr('align', horizontalAlignment.toLowerCase());
    }
    _setVerticalAlignment($img, verticalAlignment) {
        var verticalOffsetCoeff, differenceTop = $.fn.constructor(this.contentRoot).height() - $img.height();
        switch (verticalAlignment) {
            case 'Bottom':
                verticalOffsetCoeff = 1;
                break;
            case 'Center':
                verticalOffsetCoeff = 0.5;
                break;
            case 'Top':
                verticalOffsetCoeff = 0;
                break;
        }
        $img.css({ marginTop: Math.floor(differenceTop * verticalOffsetCoeff) + 'px' });
    }
    _setImgSizeWithProportions($img, containerProportion) {
        var imgProportion = this._initialHeight / this._initialWidth;
        if (imgProportion > containerProportion) {
            $img.height('100%');
            $img.width(Math.floor($img.height() / imgProportion));
            return 'horizontalCentering';
        }
        else {
            $img.width('100%');
            $img.height(Math.floor($img.width() * imgProportion));
            return 'verticalCentering';
        }
    }
    _getImageSource(imageViewModel) {
        if (imageViewModel) {
            var url = imageViewModel.Url, sourceBase64String = imageViewModel.SourceBase64String, mimeType = imageViewModel.MimeType || '';
            if (sourceBase64String) {
                return 'data:' + mimeType + ';base64,' + sourceBase64String;
            }
            if (url) {
                return url;
            }
        }
        return '';
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        this._loadImage();
    }
    _getWidget() {
        return this.img && _jquery_helpers_1.wrapPublicElement(this.img[0]) || null;
    }
}
exports.imageItem = imageItem;
