﻿/**
* DevExpress Dashboard (_docking-layout-bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _dashboard_title_view_constants_1 = require("../../viewer-parts/title/_dashboard-title-view-constants");
const _dashboard_title_model_1 = require("../viewer/title/_dashboard-title-model");
const _layout_item_1 = require("./core/_layout-item");
const _docking_layout_settings_1 = require("./_docking-layout-settings");
const ShadowSize = _layout_item_1.SplitterSize / 2;
const _getPaddingBesideScrollBar = (mode) => _knockout_utils_1.safeComputed({ mode }, args => {
    const scrollbarSize = 8;
    let calculatedPadding = _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings - scrollbarSize;
    calculatedPadding = calculatedPadding < 0 ? 0 : calculatedPadding;
    return args.mode === 'Fixed' ? calculatedPadding : _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings;
});
const _getScrollDirection = (verticalMode, horizontalMode) => {
    if (horizontalMode === 'Fixed' && verticalMode === 'Fixed') {
        return 'both';
    }
    else if (horizontalMode === 'Fixed') {
        return 'horizontal';
    }
    else if (verticalMode === 'Fixed') {
        return 'vertical';
    }
};
const processResize = ({ element, layout, layoutOptions, fullscreenItemModel, titleModel, titleWidth, titleHeight, repaintRequest, resizeByTimer, rootLayoutElement }) => {
    const disposables = [];
    const toDispose = (disposable) => {
        disposables.push(disposable);
        return disposable;
    };
    const layoutContainerSize = {
        width: _jquery_helpers_1.getWidth(element),
        height: _jquery_helpers_1.getHeight(element),
    };
    const getLayoutWidth = () => {
        const initialWidth = layoutOptions.width.mode() === 'Fixed' ? layoutOptions.width.value() : layoutContainerSize.width;
        return initialWidth - _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings * 2;
    };
    const getLayoutHeight = () => {
        const initialHeight = layoutOptions.height.mode() === 'Fixed' ? layoutOptions.height.value() : layoutContainerSize.height;
        return initialHeight - _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings * 2 - (titleModel.showTitle() === true ? titleHeight() : 0);
    };
    const updateTitleWidth = () => {
        const titleContainerWidth = layoutContainerSize.width - _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings * 2;
        titleWidth((fullscreenItemModel.visible() ? titleContainerWidth : Math.min(getLayoutWidth(), titleContainerWidth)) - ShadowSize * 2);
    };
    const updateFullscreenItemSize = () => {
        if (fullscreenItemModel.visible()) {
            fullscreenItemModel.viewModel().repaintRequest.fire();
        }
    };
    const updateSize = () => {
        updateFullscreenItemSize();
        updateTitleWidth();
        const rootElt = rootLayoutElement();
        if (rootElt) {
            rootElt.style.width = `${getLayoutWidth()}px`;
            rootElt.style.height = `${getLayoutHeight()}px`;
        }
        layout.updateSize(getLayoutWidth(), getLayoutHeight());
    };
    const updateSizeDebounced = _utils_1.debounce(updateSize, 100);
    const resizeObserver = new ResizeObserver(entries => {
        layoutContainerSize.width = entries[0].contentRect.width;
        layoutContainerSize.height = entries[0].contentRect.height;
        if (resizeByTimer()) {
            updateSizeDebounced();
        }
    });
    resizeObserver.observe(element);
    toDispose(_knockout_utils_1.safeSubscribe({
        widthMode: layoutOptions.width.mode,
        fixedWidth: layoutOptions.width.value,
        mode: layoutOptions.height.mode,
        fixedHeight: layoutOptions.height.value,
        titleHeight,
        showTitle: titleModel.showTitle,
        rootLayoutElement
    }, () => updateSize()));
    toDispose(fullscreenItemModel.visible.subscribe(updateTitleWidth));
    toDispose(resizeByTimer.subscribe((newValue) => newValue && updateSize()));
    const forceRepaintCallback = () => updateSize();
    repaintRequest.add(forceRepaintCallback);
    toDispose({
        dispose: () => {
            repaintRequest.remove(forceRepaintCallback);
        }
    });
    return disposables;
};
ko.components.register('dashboard-docking-layout', {
    viewModel: {
        createViewModel: function ({ componentArgs }, componentInfo) {
            let disposables = [];
            const toDispose = (disposable) => {
                disposables.push(disposable);
                return disposable;
            };
            const rootLayoutElement = ko.observable();
            const titleWidth = ko.observable(_jquery_helpers_1.getWidth(componentInfo.element));
            const titleHeight = ko.observable(_dashboard_title_view_constants_1.titleHeight);
            const titleModel = new _dashboard_title_model_1.DashboardTitleModel(componentArgs.titleContext, componentArgs.dashboard);
            const isTitleVisible = titleModel.showTitle;
            const layout = componentArgs.layout;
            const layoutOptions = componentArgs.dashboard.layoutOptions;
            const fullscreenItemModel = componentArgs.fullscreenItemModel;
            const layoutTop = toDispose(_knockout_utils_1.safeComputed({ isTitleVisible, titleHeight, }, args => args.isTitleVisible ? args.titleHeight + _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings : 0));
            const paddings = {
                paddingTop: toDispose(_knockout_utils_1.safeComputed({ isTitleVisible }, args => args.isTitleVisible ? 0 : _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings)),
                paddingRight: toDispose(_getPaddingBesideScrollBar(layoutOptions.height.mode)),
                paddingBottom: toDispose(_getPaddingBesideScrollBar(layoutOptions.width.mode)),
                paddingLeft: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings
            };
            const scrollViewOptions = toDispose(_knockout_utils_1.safeComputed({
                verticalMode: layoutOptions.height.mode,
                horizontalMode: layoutOptions.width.mode
            }, (args) => (Object.assign({ direction: _getScrollDirection(args.verticalMode, args.horizontalMode), showScrollbar: _getScrollDirection(args.verticalMode, args.horizontalMode) ? 'always' : 'never' }, componentArgs.scrollViewEvents))));
            const viewModel = {
                title: {
                    showTitle: titleModel.showTitle,
                    containerStyles: {
                        display: 'flex',
                        justifyContent: 'start',
                        position: 'absolute',
                        top: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings,
                        left: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings + ShadowSize,
                        height: titleHeight
                    },
                    styles: {
                        width: titleWidth,
                    },
                    componentArgs: {
                        height: titleHeight,
                        width: titleWidth,
                        encodeHtml: componentArgs.encodeHtml,
                        options: titleModel.toolbarOptions,
                    }
                },
                scrollView: {
                    options: scrollViewOptions,
                    styles: { top: layoutTop },
                    contentWrapperStyles: Object.assign(Object.assign({}, paddings), { display: 'block', boxSizing: 'content-box' }),
                },
                fullscreenItem: {
                    styles: {
                        paddingTop: paddings.paddingTop,
                        paddingRight: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings,
                        paddingBottom: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings,
                        paddingLeft: _docking_layout_settings_1.DockingLayoutSettings.layoutPaddings,
                        top: layoutTop
                    }
                },
                layout: layout,
                layoutMainElementEvents: Object.assign(Object.assign({}, componentArgs.layoutMainElementEvents), { targetElement: rootLayoutElement }),
                fullscreenItemModel: fullscreenItemModel,
            };
            processResize({
                element: componentInfo.element,
                layout,
                layoutOptions,
                fullscreenItemModel,
                titleModel,
                titleWidth,
                titleHeight,
                repaintRequest: componentArgs.repaintRequest,
                resizeByTimer: componentArgs.resizeByTimer,
                rootLayoutElement: rootLayoutElement
            })
                .forEach(d => toDispose(d));
            const disposeCallback = () => {
                disposables.forEach(disposable => disposable.dispose());
                disposables = [];
                titleModel.dispose();
                window.removeEventListener('unload', disposeCallback);
            };
            ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, disposeCallback);
            window.addEventListener('unload', disposeCallback);
            return viewModel;
        }
    },
    template: { element: 'dx-dashboard-docking-layout' }
});
