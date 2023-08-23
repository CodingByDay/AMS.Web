﻿/**
* DevExpress Dashboard (_dashboard-item-menu-popover.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPopoverOptionsGetterFunction = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const createPopoverOptionsGetterFunction = (menuItem, dashboardItemMenu) => (rootContainer) => {
    const viewerBoundary = rootContainer.querySelector('.dx-dashboard-layout-container');
    const itemMenuElement = rootContainer.querySelector('.dx-dashboard-item-menu-container.dx-state-selected .dx-dashboard-item-menu .dx-dashboard-' + menuItem.menuItemId + '-options-button');
    const itemMenuItemVisible = ko.observable(true);
    const getHeight = () => viewerBoundary.clientHeight;
    let repaintComponentFunction = null;
    let resizeObserver = null;
    let intersectionObserver = null;
    const popoverVisible = ko.pureComputed(() => {
        return menuItem.detailVisible() && itemMenuItemVisible();
    });
    return {
        target: itemMenuElement,
        container: rootContainer,
        visible: popoverVisible,
        position: {
            my: _knockout_utils_1.safeComputed({ isLeft: dashboardItemMenu.isLeft }, args => args.isLeft ? 'right' : 'left'),
            at: _knockout_utils_1.safeComputed({ isLeft: dashboardItemMenu.isLeft }, args => args.isLeft ? 'left' : 'right'),
            boundary: viewerBoundary,
            collision: 'flipfit',
            boundaryOffset: '0, 0',
            offset: _knockout_utils_1.safeComputed({ isLeft: dashboardItemMenu.isLeft }, arg => arg.isLeft ? '+10, 0' : '-10, 0')
        },
        height: getHeight(),
        width: ko.unwrap(menuItem.panelWidth) + 2,
        hoverStateEnabled: false,
        onShown: (options) => {
            _jquery_helpers_1.$unwrap(options.component._$content).classList.add('dx-state-hover');
        },
        hideOnOutsideClick: false,
        animation: { enabled: false },
        onInitialized: (args) => {
            let popupComponent = args.component;
            let setPopupHeightDebounce = _utils_1.debounce(() => {
                popupComponent.option('height', getHeight());
            }, 1);
            resizeObserver = new ResizeObserver(entries => entries[0] && setPopupHeightDebounce());
            resizeObserver.observe(viewerBoundary);
            intersectionObserver = new IntersectionObserver(entries => {
                const lastEntry = entries[entries.length - 1];
                lastEntry && itemMenuItemVisible(lastEntry.isIntersecting);
            }, { root: viewerBoundary, rootMargin: '-36px' });
            intersectionObserver.observe(itemMenuElement);
            repaintComponentFunction = _utils_1.debounce(() => {
                if (!menuItem.isDisposing) {
                    popupComponent.repaint();
                }
            }, 1);
            dashboardItemMenu.layoutController.subscribeOnScroll(repaintComponentFunction);
            dashboardItemMenu.subscribeLayoutItemRepaintRequest(repaintComponentFunction);
        },
        onDisposing: () => {
            menuItem.isDisposing = true;
            resizeObserver && resizeObserver.unobserve(viewerBoundary);
            intersectionObserver && intersectionObserver.unobserve(itemMenuElement);
            dashboardItemMenu.layoutController.unsubscribeOnScroll(repaintComponentFunction);
            dashboardItemMenu.unsubscribeLayoutItemRepaintRequest(repaintComponentFunction);
            popoverVisible.dispose();
        },
        hideOnParentScroll: false,
        wrapperAttr: _knockout_utils_1.safeComputed({ isLeft: dashboardItemMenu.isLeft }, args => {
            const classes = [
                'dx-dashboard-property-grid',
                'dx-disappearing-overlay',
                'dx-dashboard-context-menu-container',
                'dx-menu-position-' + (args.isLeft ? 'left' : 'right')
            ];
            if (menuItem.popoverClass)
                classes.push(menuItem.popoverClass);
            return {
                class: classes.join(' ')
            };
        })
    };
};
exports.createPopoverOptionsGetterFunction = createPopoverOptionsGetterFunction;
