import { DifferentOddAndEvenPagesHistoryItem } from '../../../core/model/history/items/document-properties-history-items';
import { SectionDifferentFirstPageHistoryItem, SectionFooterOffsetHistoryItem, SectionHeaderOffsetHistoryItem, SectionLandscapeHistoryItem, SectionMarginBottomHistoryItem, SectionMarginLeftHistoryItem, SectionMarginRightHistoryItem, SectionMarginTopHistoryItem, SectionPageHeightHistoryItem, SectionPageWidthHistoryItem, SectionPaperKindHistoryItem, SectionStartTypeHistoryItem } from '../../../core/model/history/items/section-properties-history-items';
import { ControlOptions } from '../../../core/model/options/control';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { IntervalCommandStateEx } from '../command-states';
import { SectionPropertiesCommandBase } from '../section-properties/section-properties-command-base';
import { DialogParametersBase, ShowDialogCommandBase } from './show-dialog-command-base';
import { RichEditClientCommand } from '../client-command';
export class DialogPageSetupCommand extends ShowDialogCommandBase {
    getRelatedCommands() {
        return {
            [RichEditClientCommand.SetLandscapePageOrientation]: true,
            [RichEditClientCommand.SetPortraitPageOrientation]: true,
        };
    }
    getState(options = this.convertToCommandOptions(undefined)) {
        return new IntervalCommandStateEx(this.isEnabled(), SectionPropertiesCommandBase.getIntervals(this.control, options.subDocument));
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.sections) &&
            SectionPropertiesCommandBase.rangePermissionIncludeFullSection(this.control, this.selection.activeSubDocument, this.selection.intervals);
    }
    createParameters(_options) {
        var dialogParams = new PageSetupDialogParameters();
        dialogParams.init(this.inputPosition.getMergedSectionPropertiesRaw(), this.getInitialTab(), this.control.modelManager.model.differentOddAndEvenPages);
        return dialogParams;
    }
    applyParameters(_state, newParams, initParams) {
        var interval = this.getInterval(newParams.applyTo);
        var isEqualIntervals = this.getInitInterval().equals(interval);
        var modelManipulator = this.modelManipulator;
        var history = this.history;
        this.inputPosition.resetSectionMergedProperties();
        history.beginTransaction();
        let changed = false;
        if (newParams.marginBottom !== undefined && (newParams.marginBottom !== initParams.marginBottom || !isEqualIntervals)) {
            history.addAndRedo(new SectionMarginBottomHistoryItem(modelManipulator, interval, newParams.marginBottom));
            changed = true;
        }
        if (newParams.marginLeft !== undefined && (newParams.marginLeft !== initParams.marginLeft || !isEqualIntervals)) {
            history.addAndRedo(new SectionMarginLeftHistoryItem(modelManipulator, interval, newParams.marginLeft));
            changed = true;
        }
        if (newParams.marginRight !== undefined && (newParams.marginRight !== initParams.marginRight || !isEqualIntervals)) {
            history.addAndRedo(new SectionMarginRightHistoryItem(modelManipulator, interval, newParams.marginRight));
            changed = true;
        }
        if (newParams.marginTop !== undefined && (newParams.marginTop !== initParams.marginTop || !isEqualIntervals)) {
            history.addAndRedo(new SectionMarginTopHistoryItem(modelManipulator, interval, newParams.marginTop));
            changed = true;
        }
        if ((newParams.pageWidth !== undefined && newParams.pageHeight !== undefined) &&
            (newParams.pageWidth !== initParams.pageWidth || newParams.pageHeight !== initParams.pageHeight || !isEqualIntervals)) {
            var sections = this.control.modelManager.model.getSectionsByInterval(interval);
            for (var i = 0, section; section = sections[i]; i++) {
                var sectionInterval = new FixedInterval(section.startLogPosition.value, section.getLength() - 1);
                if (section.sectionProperties.landscape !== (newParams.pageWidth > newParams.pageHeight))
                    history.addAndRedo(new SectionLandscapeHistoryItem(modelManipulator, sectionInterval, newParams.pageWidth > newParams.pageHeight));
                history.addAndRedo(new SectionPageWidthHistoryItem(modelManipulator, sectionInterval, newParams.pageWidth));
                history.addAndRedo(new SectionPageHeightHistoryItem(modelManipulator, sectionInterval, newParams.pageHeight));
            }
            changed = true;
        }
        if (newParams.paperKind !== undefined && newParams.paperKind !== initParams.paperKind) {
            history.addAndRedo(new SectionPaperKindHistoryItem(modelManipulator, interval, newParams.paperKind));
            changed = true;
        }
        if (newParams.startType !== undefined && newParams.startType !== initParams.startType) {
            history.addAndRedo(new SectionStartTypeHistoryItem(modelManipulator, interval, newParams.startType));
            changed = true;
        }
        if (newParams.headerDifferentFirstPage !== undefined && (newParams.headerDifferentFirstPage !== initParams.headerDifferentFirstPage || !isEqualIntervals)) {
            history.addAndRedo(new SectionDifferentFirstPageHistoryItem(modelManipulator, interval, newParams.headerDifferentFirstPage));
            changed = true;
        }
        if (newParams.headerDifferentOddAndEven !== undefined && (newParams.headerDifferentOddAndEven !== initParams.headerDifferentOddAndEven || !isEqualIntervals)) {
            history.addAndRedo(new DifferentOddAndEvenPagesHistoryItem(modelManipulator, newParams.headerDifferentOddAndEven));
            changed = true;
        }
        if (newParams.headerOffset !== undefined && (newParams.headerOffset !== initParams.headerOffset || !isEqualIntervals)) {
            history.addAndRedo(new SectionHeaderOffsetHistoryItem(modelManipulator, interval, newParams.headerOffset));
            changed = true;
        }
        if (newParams.footerOffset !== undefined && (newParams.footerOffset !== initParams.footerOffset || !isEqualIntervals)) {
            history.addAndRedo(new SectionFooterOffsetHistoryItem(modelManipulator, interval, newParams.footerOffset));
            changed = true;
        }
        history.endTransaction();
        return changed;
    }
    getInterval(applyTo) {
        if (applyTo == SectionPropertiesApplyType.WholeDocument)
            return new FixedInterval(0, this.control.modelManager.model.mainSubDocument.getDocumentEndPosition() - 1);
        if (this.selection.activeSubDocument.isMain()) {
            let sectionIndices = this.control.modelManager.model.getSectionIndicesByIntervals(this.selection.intervals);
            var firstSection = this.control.modelManager.model.sections[sectionIndices[0]];
            if (applyTo == SectionPropertiesApplyType.SelectedSections) {
                var lastSection = this.control.modelManager.model.sections[sectionIndices[sectionIndices.length - 1]];
                return FixedInterval.fromPositions(firstSection.startLogPosition.value, lastSection.startLogPosition.value + lastSection.getLength() - 1);
            }
            if (applyTo == SectionPropertiesApplyType.ThisPointForward)
                return FixedInterval.fromPositions(firstSection.startLogPosition.value, this.control.modelManager.model.mainSubDocument.getDocumentEndPosition() - 1);
            return new FixedInterval(firstSection.startLogPosition.value, firstSection.getLength() - 1);
        }
        else if (this.selection.activeSubDocument.isHeaderFooter()) {
            var layoutPage = this.control.layout.pages[this.selection.pageIndex];
            if (layoutPage) {
                var position = layoutPage.getPosition();
                var section = this.control.modelManager.model.getSectionByPosition(position);
                if (applyTo === SectionPropertiesApplyType.CurrentSection || applyTo == SectionPropertiesApplyType.SelectedSections)
                    return new FixedInterval(section.startLogPosition.value, section.getLength());
                else if (applyTo === SectionPropertiesApplyType.ThisPointForward)
                    return FixedInterval.fromPositions(section.startLogPosition.value, this.control.modelManager.model.mainSubDocument.getDocumentEndPosition() - 1);
            }
        }
    }
    getInitInterval() {
        if (this.selection.activeSubDocument.isMain()) {
            let sectionIndices = this.control.modelManager.model.getSectionIndicesByIntervals(this.selection.intervals);
            let firstSection = this.control.modelManager.model.sections[sectionIndices[0]];
            let lastSection = this.control.modelManager.model.sections[sectionIndices[sectionIndices.length - 1]];
            return FixedInterval.fromPositions(firstSection.startLogPosition.value, lastSection.startLogPosition.value + lastSection.getLength() - 1);
        }
        else {
            var layoutPage = this.control.layout.pages[this.selection.pageIndex];
            var section = this.control.modelManager.model.getSectionByPosition(layoutPage.getPosition());
            return new FixedInterval(section.startLogPosition.value, section.getLength());
        }
    }
    getInitialTab() {
        return PageSetupDialogTab.Margins;
    }
    getDialogName() {
        return "PageSetup";
    }
}
export class ShowPagePaperSetupFormCommand extends DialogPageSetupCommand {
    getInitialTab() {
        return PageSetupDialogTab.Paper;
    }
}
export class PageSetupDialogParameters extends DialogParametersBase {
    init(initSecProps, tabs, differentOddAndEvenPages) {
        this.applyTo = SectionPropertiesApplyType.WholeDocument;
        this.marginBottom = initSecProps.marginBottom;
        this.marginLeft = initSecProps.marginLeft;
        this.marginRight = initSecProps.marginRight;
        this.marginTop = initSecProps.marginTop;
        this.landscape = initSecProps.landscape;
        this.pageHeight = initSecProps.pageHeight;
        this.pageWidth = initSecProps.pageWidth;
        this.startType = initSecProps.startType;
        this.headerDifferentOddAndEven = differentOddAndEvenPages;
        this.headerDifferentFirstPage = initSecProps.differentFirstPage;
        this.headerOffset = initSecProps.headerOffset;
        this.footerOffset = initSecProps.footerOffset;
        this.paperKind = initSecProps.paperKind;
        this.initialTab = tabs;
    }
    copyFrom(obj) {
        super.copyFrom(obj);
        this.marginBottom = obj.marginBottom;
        this.marginLeft = obj.marginLeft;
        this.marginRight = obj.marginRight;
        this.marginTop = obj.marginTop;
        this.landscape = obj.landscape;
        this.applyTo = obj.applyTo;
        this.pageHeight = obj.pageHeight;
        this.pageWidth = obj.pageWidth;
        this.startType = obj.startType;
        this.headerDifferentFirstPage = obj.headerDifferentFirstPage;
        this.headerDifferentOddAndEven = obj.headerDifferentOddAndEven;
        this.headerOffset = obj.headerOffset;
        this.footerOffset = obj.footerOffset;
        this.paperKind = obj.paperKind;
        this.initialTab = obj.initialTab;
    }
    clone() {
        const newInstance = new PageSetupDialogParameters();
        newInstance.copyFrom(this);
        return newInstance;
    }
    applyConverter(converter) {
        if (this.marginBottom)
            this.marginBottom = converter(this.marginBottom);
        if (this.marginLeft)
            this.marginLeft = converter(this.marginLeft);
        if (this.marginRight)
            this.marginRight = converter(this.marginRight);
        if (this.marginTop)
            this.marginTop = converter(this.marginTop);
        if (this.pageWidth)
            this.pageWidth = converter(this.pageWidth);
        if (this.pageHeight)
            this.pageHeight = converter(this.pageHeight);
        if (this.headerOffset)
            this.headerOffset = converter(this.headerOffset);
        if (this.footerOffset)
            this.footerOffset = converter(this.footerOffset);
        return this;
    }
}
export var SectionPropertiesApplyType;
(function (SectionPropertiesApplyType) {
    SectionPropertiesApplyType[SectionPropertiesApplyType["WholeDocument"] = 0] = "WholeDocument";
    SectionPropertiesApplyType[SectionPropertiesApplyType["CurrentSection"] = 1] = "CurrentSection";
    SectionPropertiesApplyType[SectionPropertiesApplyType["SelectedSections"] = 2] = "SelectedSections";
    SectionPropertiesApplyType[SectionPropertiesApplyType["ThisPointForward"] = 4] = "ThisPointForward";
})(SectionPropertiesApplyType || (SectionPropertiesApplyType = {}));
export var PageSetupDialogTab;
(function (PageSetupDialogTab) {
    PageSetupDialogTab[PageSetupDialogTab["Margins"] = 0] = "Margins";
    PageSetupDialogTab[PageSetupDialogTab["Paper"] = 1] = "Paper";
    PageSetupDialogTab[PageSetupDialogTab["Layout"] = 2] = "Layout";
})(PageSetupDialogTab || (PageSetupDialogTab = {}));
