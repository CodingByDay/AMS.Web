import { HtmlBuilder } from '../../html-export';
import { RendererClassNames } from '../../../core/canvas/renderer-class-names';
import { UpdateFieldsOptions } from '../../../core/model/fields/tree-creator';
import { ControlOptions } from '../../../core/model/options/control';
import { PrintMode } from '../../../core/model/options/printing';
import { PaperKind } from '../../../core/model/section/paper-kind';
import { SubDocumentIntervals } from '../../../core/model/sub-document';
import { ViewType } from '../../../core/view-settings/views-settings';
import { Browser } from '@devexpress/utils/lib/browser';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { pdfExport } from '../../../pdf/api/pdf';
import { RichEditClientCommand } from '../client-command';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { UpdateFieldCommandBase } from '../fields/update-field-command-base';
export class PrintDocumentOnClient extends CommandBase {
    constructor(control, _nonce) {
        super(control);
        this._nonce = _nonce;
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.printing) &&
            this.control.modelManager.model.isLoaded();
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    getMode(param) {
        return param !== null && param !== undefined ? param : this.control.modelManager.richOptions.printing.mode;
    }
    getclosePrintDialogWithHtmlPreview(param) {
        return param !== null && param !== undefined ? param : this.control.modelManager.richOptions.printing.closePrintDialogWithHtmlPreview;
    }
    executeCore(_state, options) {
        if (this.control.commandManager.isPrintingProcessing)
            return false;
        this.control.commandManager.isPrintingProcessing = true;
        let mode;
        let closePrintDialogWithHtmlPreview;
        if (typeof options.param === 'object' && options.param != null) {
            mode = this.getMode(options.param.mode);
            closePrintDialogWithHtmlPreview = this.getclosePrintDialogWithHtmlPreview(options.param.closePrintDialogWithHtmlPreview);
        }
        else {
            mode = this.getMode(options.param);
            closePrintDialogWithHtmlPreview = this.control.modelManager.richOptions.printing.closePrintDialogWithHtmlPreview;
        }
        const htmlPrinting = mode == PrintMode.ClientHtml;
        let printWindow;
        if (htmlPrinting)
            printWindow = window.open('', 'print', `height=${window.innerHeight},width=${window.innerWidth},tabbar=no`);
        let needSwitchViewType = false;
        if (this.control.innerClientProperties.viewsSettings.viewType == ViewType.Simple) {
            needSwitchViewType = true;
            this.control.commandManager.getCommand(RichEditClientCommand.SwitchToPrintLayoutView).execute(this.control.commandManager.isPublicApiCall);
        }
        let needToggleHiddenSymbols = false;
        if (this.control.innerClientProperties.showHiddenSymbols) {
            needToggleHiddenSymbols = true;
            this.control.commandManager.getCommand(RichEditClientCommand.ToggleShowWhitespace).execute(this.control.commandManager.isPublicApiCall);
        }
        this.control.commandManager.printTimerId = setTimeout(() => {
            while (!this.control.layout.isFullyFormatted)
                this.control.layoutFormatterManager.forceFormatPage(this.control.layout.validPageCount + 1);
            const subDocsInfo = NumberMapUtils.toListBy(this.modelManipulator.model.subDocuments, (sd) => new SubDocumentIntervals(sd, [sd.interval]));
            if (this.control.modelManager.richOptions.fields.updateFieldsBeforePrint) {
                UpdateFieldCommandBase.updateFields(this, subDocsInfo, () => {
                    this.printCore(htmlPrinting, printWindow, closePrintDialogWithHtmlPreview, needSwitchViewType, needToggleHiddenSymbols);
                }, new UpdateFieldsOptions(false, false));
            }
            else
                this.printCore(htmlPrinting, printWindow, closePrintDialogWithHtmlPreview, needSwitchViewType, needToggleHiddenSymbols);
        }, 100);
        return true;
    }
    printCore(htmlPrinting, printWindow, closePrintDialogWithHtmlPreview, needSwitchViewType, needToggleHiddenSymbols) {
        if (htmlPrinting)
            this.generatePrintDocument(printWindow, closePrintDialogWithHtmlPreview);
        else {
            pdfExport(this.control, (blob, _stream) => {
                if (window.navigator.msSaveOrOpenBlob && !Browser.Edge)
                    window.navigator.msSaveOrOpenBlob(blob, this.control.documentInfo.getFileNameForDownload() + ".pdf");
                else
                    this.control.pdfHelperFrame.showPrintDialog(URL.createObjectURL(blob));
            }, () => { });
        }
        if (needSwitchViewType)
            this.control.commandManager.getCommand(RichEditClientCommand.SwitchToSimpleView).execute(this.control.commandManager.isPublicApiCall);
        if (needToggleHiddenSymbols)
            this.control.commandManager.getCommand(RichEditClientCommand.ToggleShowWhitespace).execute(this.control.commandManager.isPublicApiCall);
        this.control.commandManager.isPrintingProcessing = false;
    }
    generatePrintDocument(printWindow, closePrintDialogWithHtmlPreview) {
        const height = this.control.layout.pages[0].height;
        const width = this.control.layout.pages[0].width;
        let printWindowContent = `<!DOCTYPE html>
                <html moznomarginboxes mozdisallowselectionprint>
                <head>
                    <style ${this._nonce ? `nonce="${this._nonce}"` : ''}>
                        html, body {
                            margin: 0;
                            width: ${width}px;
                            height: ${height}px;
                        }
                        .dxrePageArea, .dxreColumn, .dxreRow, .dxreBox, .dxreBoxBg, .dxreParFrame, .dxreBoxSpace, .dxreAncPic,
                        .dxreTable, .dxreTableCellBg, .dxreTableBrd, .dxreTextBoxBg {
                            position:absolute;
                        }
                        .dxreTableRowCursor, .dxreTableColumnCursor { display: none; }
                        ${this.createZIndexStyles()}
                        br { display: none; }
                        @page { margin: 0; size:${width}px ${height}px; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                </body>
                </html>`;
        printWindow.document.write(printWindowContent);
        printWindow.document.close();
        this.generatePrintContent().forEach((child) => {
            printWindow.document.body.appendChild(child);
        });
        printWindow.focus();
        const interval = setInterval(() => {
            if (printWindow.document.readyState == 'complete') {
                printWindow.print();
                if (closePrintDialogWithHtmlPreview && !Browser.AndroidMobilePlatform)
                    printWindow.close();
                clearInterval(interval);
            }
        }, 100);
    }
    generatePrintContent() {
        const layout = this.control.layout;
        const htmlBuilder = new HtmlBuilder();
        for (let i = 0, layoutPage; layoutPage = layout.pages[i]; i++) {
            const pageSize = PrintPageSizesCalculator.getPrintPageSize(layoutPage);
            const pageWidth = pageSize.width;
            const pageHeight = pageSize.height;
            const page = this.control.viewManager.printLayoutRenderer.getPageRender(i, layoutPage);
            const main = page.getElementsByClassName(RendererClassNames.MAIN_PAGE_AREA_CONTAINER)[0].cloneNode(true);
            const fo = page.getElementsByClassName(RendererClassNames.FLOATING_OBJECTS_CONTAINER)[0].cloneNode(true);
            const other = page.getElementsByClassName(RendererClassNames.OTHER_PAGE_AREA_CONTAINER)[0].cloneNode(true);
            const shapeBg = page.getElementsByClassName(RendererClassNames.SHAPE_BG_CONTAINER)[0].cloneNode(true);
            if (Browser.IE) {
                htmlBuilder
                    .startChild('div')
                    .configure((el) => {
                    el.style.cssText = `position: relative; margin:0px; display:block; width:${pageWidth}px; height:${pageHeight}px;`;
                })
                    .addElement(main)
                    .addElement(fo)
                    .addElement(other)
                    .addElement(shapeBg)
                    .endChild('div')
                    .startChild('br')
                    .endChild('br');
            }
            else {
                htmlBuilder
                    .startChild('svg', 'http://www.w3.org/2000/svg')
                    .configure((el) => {
                    el.setAttribute("width", pageWidth.toString());
                    el.setAttribute("height", pageHeight.toString());
                })
                    .startChild('foreignObject', 'http://www.w3.org/2000/svg')
                    .configure((el) => {
                    el.setAttribute("x", "0");
                    el.setAttribute("y", "0");
                    el.setAttribute("width", pageWidth.toString());
                    el.setAttribute("height", pageHeight.toString());
                })
                    .startChild('div')
                    .configure((el) => {
                    el.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
                })
                    .addElement(main)
                    .addElement(fo)
                    .addElement(other)
                    .addElement(shapeBg)
                    .endChild('div')
                    .endChild('foreignObject')
                    .endChild('svg');
            }
        }
        return htmlBuilder.childElements;
    }
    createZIndexStyles() {
        let result = '';
        let ind = 0;
        const names = ['TextBoxBg', 'TblRowBg', 'TblCellBg', 'ParBg', 'BoxBg', 'BoxSpace', 'Box', 'TableBorder', 'AnchoredPicture', 'TextBox'];
        for (let level = 0; level <= 8; level++) {
            for (let i = 0, name; name = names[i]; i++) {
                result += `.dxre${name}ZL${level} { z-index: ${ind}; }\r\n`;
                ind++;
            }
        }
        return result;
    }
}
class PrintPageSize {
    constructor(paperKind, vertical, horizontal = vertical, accuracy = 5, converterToPixels = UnitConverter.millimetersToPixel) {
        this.paperKind = paperKind;
        this.vertical = vertical;
        this.horizontal = horizontal;
        this.accuracy = accuracy;
        this.converterToPixels = converterToPixels;
        vertical.applyConverter(converterToPixels);
        horizontal.applyConverter(converterToPixels);
    }
    getDifference(landscape, currSize) {
        const size = landscape ? this.horizontal : this.vertical;
        return new Size(Math.abs(size.width - currSize.width), Math.abs(size.height - currSize.height));
    }
    isAccuracyAchieved(diff) {
        return diff.width < this.accuracy && diff.height < this.accuracy;
    }
}
class Diff {
    constructor(pageSizeInfo, diff) {
        this.pageSizeInfo = pageSizeInfo;
        this.diff = diff;
        this.maxDiff = Math.max(diff.width, diff.height);
    }
}
class PrintPageSizesCalculator {
    static getPrintPageSize(layoutSize) {
        const landscape = layoutSize.width > layoutSize.height;
        const list = ListUtils.reducedMap(PrintPageSizesCalculator.sizesList, (info) => {
            const diff = info.getDifference(landscape, layoutSize);
            return info.isAccuracyAchieved(diff) ? new Diff(info, diff) : null;
        });
        if (!list.length)
            return new Size(layoutSize.width, layoutSize.height);
        const finalPageInfo = ListUtils.minByCmp(list, (a, b) => a.maxDiff - b.maxDiff).pageSizeInfo;
        return landscape ? finalPageInfo.horizontal : finalPageInfo.vertical;
    }
}
PrintPageSizesCalculator.sizesList = [
    new PrintPageSize(PaperKind.A4, new Size(210, 296), new Size(297, 209)),
    new PrintPageSize(PaperKind.Letter, new Size(UnitConverter.millimetersToPixel(216), UnitConverter.millimetersToPixel(278) - 1), new Size(UnitConverter.millimetersToPixel(280), (215)), 7, v => v),
];
