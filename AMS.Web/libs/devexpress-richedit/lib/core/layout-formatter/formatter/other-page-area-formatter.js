import { Errors } from '@devexpress/utils/lib/errors';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { AnchorObjectVerticalPositionType } from '../../model/floating-objects/enums';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogObjToStr } from '../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { BaseFormatter } from './base-formatter';
export class OtherPageAreaFormatter {
    constructor(manager) {
        this.manager = manager;
    }
    formatOtherPageArea(page, subDocumentInfo, setBounds, getHeaderOrFooterPageAreaBounds, getHeaderOrFooterColumnBounds) {
        if (!subDocumentInfo) {
            setBounds(0);
            return;
        }
        Log.print(LogSource.LayoutFormatter, "formatHeaderOrFooterPageArea", () => `headerSubDocumentInfo: ${LogObjToStr.subDocumentInfoBase(subDocumentInfo)}`);
        const oldActiveFormatter = this.manager.activeFormatter;
        setBounds(-1);
        this.shiftFooterObjectByVertical(page.otherPageAreas, subDocumentInfo, page.anchoredObjectHolder, (obj, pa) => {
            if (pa)
                pa.y += obj.yShift;
            obj.y += obj.yShift;
            obj.yShift = 0;
        });
        const formatter = new BaseFormatter(this.manager, subDocumentInfo.subDocumentId);
        formatter.initDocumentStart();
        formatter.formatPageArea(getHeaderOrFooterPageAreaBounds(), [getHeaderOrFooterColumnBounds()], page);
        const pageArea = formatter.layoutPosition.pageArea;
        if (pageArea) {
            setBounds(ListUtils.last(pageArea.columns[0].rows).bottom);
            const column = pageArea.columns[0];
            let diff = pageArea.y + column.y;
            pageArea.setGeomerty(getHeaderOrFooterPageAreaBounds());
            diff -= pageArea.y + column.y;
            column.setGeomerty(getHeaderOrFooterColumnBounds());
            OtherPageAreaFormatter.reduceRowHeight(column);
            this.shiftFooterObjectByVertical(page.otherPageAreas, subDocumentInfo, page.anchoredObjectHolder, (obj, pa) => {
                if (pa)
                    pa.y -= diff;
                obj.y -= diff;
                obj.yShift = diff;
            });
        }
        else
            setBounds(0);
        this.manager.activeFormatter = oldActiveFormatter;
    }
    shiftFooterObjectByVertical(otherPageAreas, subDocumentInfo, pageAnchoredObjectHolder, action) {
        if (subDocumentInfo.isFooter) {
            NumberMapUtils.forEach(pageAnchoredObjectHolder.objects, (obj) => {
                if (obj.belongsToSubDocId == subDocumentInfo.subDocumentId &&
                    (obj.anchorInfo.isUsedVerticalAbsolutePosition() || obj.anchorInfo.isUsedVerticalRelativePosition()) &&
                    (obj.anchorInfo.verticalPositionType == AnchorObjectVerticalPositionType.Paragraph ||
                        obj.anchorInfo.verticalPositionType == AnchorObjectVerticalPositionType.Line))
                    action(obj, obj.getType() == LayoutBoxType.AnchorTextBox ? otherPageAreas[obj.internalSubDocId] : null);
            });
        }
    }
    setTextBoxContent(page, textBox) {
        const subDocInfo = this.manager.model.subDocuments[textBox.internalSubDocId].info;
        if (!subDocInfo.isTextBox)
            throw new Error(Errors.InternalException);
        const textBoxSubDocInfo = subDocInfo;
        const margins = textBox.textBoxProperties.getContentMargins();
        const contentBounds = textBox.getContentBounds();
        const pageAreaBounds = new Rectangle(0, 0, contentBounds.width, contentBounds.height);
        const columnBounds = pageAreaBounds.clone().applyOffsetsInside(margins);
        this.formatOtherPageArea(page, textBoxSubDocInfo, (_val) => { }, () => pageAreaBounds, () => columnBounds);
        if (textBox.textBoxProperties.resizeShapeToFitText) {
            const pageArea = page.otherPageAreas[textBox.internalSubDocId];
            const column = pageArea.columns[0];
            const bottomPos = column.getLastRow().bottom;
            const diff = column.height - bottomPos;
            if (diff > 0) {
                column.height -= diff;
                pageArea.height -= diff;
                textBox.height -= diff;
            }
        }
    }
    formatHeaderPageArea(page, headerSubDocumentInfo) {
        const boundsCalculator = this.manager.boundsCalculator;
        this.formatOtherPageArea(page, headerSubDocumentInfo, (val) => boundsCalculator.setHeaderBounds(val), () => boundsCalculator.headerPageAreaBounds, () => boundsCalculator.headerColumnBounds);
    }
    formatFooterPageArea(page, footerSubDocumentInfo) {
        const boundsCalculator = this.manager.boundsCalculator;
        this.formatOtherPageArea(page, footerSubDocumentInfo, (val) => boundsCalculator.setFooterBounds(val), () => boundsCalculator.footerPageAreaBounds, () => boundsCalculator.footerColumnBounds);
    }
    static reduceRowHeight(column) {
        const colHeight = column.height;
        for (let row of column.rows) {
            if (row.y >= colHeight && !row.tableCellInfo) {
                row.y = colHeight;
                row.height = 0;
            }
        }
    }
}
