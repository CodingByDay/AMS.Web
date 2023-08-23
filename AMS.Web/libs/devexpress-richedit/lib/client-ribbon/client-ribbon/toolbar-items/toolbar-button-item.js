import { ToolbarInteractiveItem } from './toolbar-interactive-item';
import { ButtonToolbarItemTemplateCreator } from './toolbar-item-template-creators/button-toolbar-item-template-creator';
export class ToolbarButtonItem extends ToolbarInteractiveItem {
    getBuildTemplateStrategy() {
        return new ButtonToolbarItemTemplateCreator({
            itemOptions: this.options,
            onInitialized: e => {
                this.applyWidget(e);
                this.setValue(this.options.isToggleMode && this.options.selected);
            },
            onClick: this.getOnClickHandler()
        });
    }
    setValue(value) {
        if (!this.options.isToggleMode)
            return;
        const resolvedElement = this.getElement();
        resolvedElement[ToolbarButtonItem.ToggleButtonDataProperty] = value;
        if (value) {
            resolvedElement.classList.add(ToolbarButtonItem.ToggleStateClassName);
            resolvedElement.classList.add(ToolbarButtonItem.ButtonGroupItemClassName);
            resolvedElement.classList.add(ToolbarButtonItem.ItemSelectedClassName);
        }
        else {
            resolvedElement.classList.remove(ToolbarButtonItem.ToggleStateClassName);
            resolvedElement.classList.remove(ToolbarButtonItem.ButtonGroupItemClassName);
            resolvedElement.classList.remove(ToolbarButtonItem.ItemSelectedClassName);
        }
    }
    getValue() {
        return this.options.isToggleMode
            ? this.getElement()[ToolbarButtonItem.ToggleButtonDataProperty]
            : null;
    }
    getElement() {
        return (this.widget.element().classList ? this.widget.element() : this.widget.element()[0]);
    }
    getOnClickHandler() {
        return this.onCommandExecuted ? () => {
            this.setValue(!this.getValue());
            this.onCommandExecuted({
                item: this,
                parameter: this.getValue()
            });
        } : undefined;
    }
}
ToolbarButtonItem.ToggleStateClassName = 'dx-r-toggle';
ToolbarButtonItem.ButtonGroupItemClassName = 'dx-buttongroup-item';
ToolbarButtonItem.ItemSelectedClassName = 'dx-item-selected';
ToolbarButtonItem.ToggleButtonDataProperty = 'dx-ri-value';
