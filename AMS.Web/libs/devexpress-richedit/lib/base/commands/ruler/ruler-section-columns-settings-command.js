import { LayoutPositionCreatorConflictFlags, LayoutPositionMainSubDocumentCreator } from '../../../core/layout-engine/layout-position-creator';
import { ColumnCalculator } from '../../../core/layout-formatter/formatter/utils/columns-calculator';
import { DocumentLayoutDetailsLevel } from '../../../core/layout/document-layout-details-level';
import { SectionColumnsInfoHistoryItem, SectionSpaceHistoryItem } from '../../../core/model/history/items/section-properties-history-items';
import { SectionColumnProperties } from '../../../core/model/section/section-column-properties';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { CommandBase } from '../command-base';
import { IntervalCommandState } from '../command-states';
export class RulerSectionColumnsSettingsCommand extends CommandBase {
    DEPRECATEDCorrectlMainCommandOptions(options) {
        const lastSelectedInterval = this.selection.lastSelectedInterval;
        options.intervalsInfo.intervals = [new FixedInterval(this.selection.forwardDirection ? lastSelectedInterval.end : lastSelectedInterval.start, 0)];
    }
    getState(options = this.convertToCommandOptions(undefined)) {
        var interval = options.intervalsInfo.interval;
        var position = interval.start;
        var sectionIndex = SearchUtils.normedInterpolationIndexOf(this.control.modelManager.model.sections, (s) => s.startLogPosition.value, position);
        var section = this.control.modelManager.model.sections[sectionIndex];
        var columnsBounds = ColumnCalculator.generateSectionColumns(section.sectionProperties);
        var columns = [];
        for (var i = 0, columnBound; columnBound = columnsBounds[i]; i++) {
            columns.push(new SectionColumnProperties(columnBound.width, 0));
            if (i > 0) {
                var prevBound = columnsBounds[i - 1];
                columns[i - 1].space = columnBound.x - (prevBound.x + prevBound.width);
            }
        }
        var layoutPosition = options.subDocument.isMain() ?
            new LayoutPositionMainSubDocumentCreator(this.control.layout, options.subDocument, position, DocumentLayoutDetailsLevel.Column)
                .create(new LayoutPositionCreatorConflictFlags().setDefault(false), new LayoutPositionCreatorConflictFlags().setDefault(true)) : null;
        return new RulerSectionColumnsSettingsState(this.isEnabled(), interval, columns, section.sectionProperties.equalWidthColumns, layoutPosition ? layoutPosition.columnIndex : 0);
    }
    executeCore(state, options) {
        var rulerState = state;
        var changed = false;
        var modelManipulator = this.modelManipulator;
        if (rulerState.equalWidth) {
            var stateColumn = rulerState.value[0];
            if (options.param[0].space !== stateColumn.space) {
                this.history.addAndRedo(new SectionSpaceHistoryItem(modelManipulator, rulerState.interval, UnitConverter.pixelsToTwips(options.param[0].space)));
                changed = true;
            }
        }
        else {
            var newColumnsInfo = [];
            var oldColumnsInfo = rulerState.value;
            ListUtils.forEach(options.param, (p, i) => {
                changed = changed || p.width !== oldColumnsInfo[i].width || p.space !== oldColumnsInfo[i].space;
                newColumnsInfo.push(new SectionColumnProperties(UnitConverter.pixelsToTwips(p.width), UnitConverter.pixelsToTwips(p.space || 0)));
            });
            if (changed)
                this.history.addAndRedo(new SectionColumnsInfoHistoryItem(modelManipulator, rulerState.interval, newColumnsInfo));
        }
        return changed;
    }
}
export class RulerSectionColumnsSettingsState extends IntervalCommandState {
    constructor(enabled, interval, columns, equalWidth, activeIndex) {
        super(enabled, interval, columns);
        this.equalWidth = equalWidth;
        this.activeIndex = activeIndex;
    }
}
