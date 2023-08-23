import { DxtUtils } from '../../../../dxt-utils/dxt-utils/dxt-utils';
import { ToolbarItemTemplateCreator } from './base-types';
export class MenuToolbarItemTemplateCreator extends ToolbarItemTemplateCreator {
    constructor(options) {
        super();
        this.options = options;
    }
    createTemplate() {
        const result = super.createTemplate();
        result.widget = 'dxMenu';
        result.options = this.getMenuOptions();
        return result;
    }
    getMenuOptions() {
        DxtUtils.correctItemsIcons(this.options.itemOptions.items);
        return {
            hideSubmenuOnMouseLeave: true,
            focusStateEnabled: false,
            selectByClick: false,
            hint: this.options.itemOptions.text,
            dataSource: [{
                    icon: this.options.itemOptions.icon ? DxtUtils.correctIconName(this.options.itemOptions.icon) : undefined,
                    text: this.options.itemOptions.text,
                    items: this.options.itemOptions.items.map(i => ({
                        beginGroup: i.beginGroup,
                        name: i.name,
                        text: i.text,
                        icon: i.icon,
                        items: i.items
                    }))
                }],
            onSubmenuShowing: (e) => {
                setTimeout(() => {
                    const component = e.component;
                    if (component._visibleSubmenu) {
                        const content = component._visibleSubmenu._overlay.$content();
                        if (getHeight(content) > 600) {
                            const submenu = content.find(".dx-submenu");
                            setHeight(submenu, 400);
                            submenu.dxScrollView({});
                        }
                    }
                });
            },
            onInitialized: this.options.onInitialized,
            onItemRendered: this.options.onItemRendered,
            onItemClick: this.options.onItemClick,
            elementAttr: { class: this.getCssClass() },
            onContentReady: (e) => {
                if (this.options.itemOptions.icon && !this.options.itemOptions.alwaysShowText) {
                    const element = (e.element.classList ? e.element : e.element[0]);
                    element.classList.add(MenuToolbarItemTemplateCreator.ShowTextInMenuClassName);
                }
            }
        };
    }
}
MenuToolbarItemTemplateCreator.ShowTextInMenuClassName = 'dx-showTextInMenu';
const getHeight = function (content) {
    var _a;
    return content.length === 1 ? (((_a = content[0].getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.height) || 0) : void 0;
};
const setHeight = function (content, value) {
    var _a;
    for (let i = 0; i < content.length; i++) {
        const element = content[0];
        const view = ((_a = element.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) || window;
        const style = view.getComputedStyle && view.getComputedStyle(element);
        if (!style)
            return;
        if (style.boxSizing === 'content-box') {
            const border = (parseFloat(style.borderTopWidth) || 0) + (parseFloat(style.borderBottomWidth) || 0);
            const padding = (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);
            value -= border + padding;
        }
        element.style.height = value.toString() + 'px';
    }
};
