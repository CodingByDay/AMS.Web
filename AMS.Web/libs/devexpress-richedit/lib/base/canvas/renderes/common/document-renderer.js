import { MapCreator } from '../../../../base-utils/map-creator';
import { RendererClassNames } from '../../../../core/canvas/renderer-class-names';
import { zIndexCssClassType, ZIndexHelper } from '../../../../core/canvas/renderes/z-index-helper';
import { LayoutChangeType } from '../../../../core/layout-formatter/changes/changes/layout-change-base';
import { LayoutBookmarkBoxType } from '../../../../core/layout/main-structures/layout-boxes/bookmark-box';
import { LayoutBoxType } from '../../../../core/layout/main-structures/layout-boxes/layout-box';
import { LayoutPageFlags } from '../../../../core/layout/main-structures/layout-page';
import { BorderLineStyle } from '../../../../core/model/borders/enums';
import { CharacterFormattingScript, StrikeoutType, UnderlineType } from '../../../../core/model/character/enums';
import { ColorHelper } from '../../../../core/model/color/color';
import { SubDocumentInfoType } from '../../../../core/model/enums';
import { Log } from '../../../../core/rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../../../core/rich-utils/debug/logger/base-logger/log-source';
import { HtmlConverter } from '../../../../core/rich-utils/html-converter';
import { ViewType } from '../../../../core/view-settings/views-settings';
import { Browser } from '@devexpress/utils/lib/browser';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Errors } from '@devexpress/utils/lib/errors';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { MathUtils } from '@devexpress/utils/lib/utils/math';
import { CanvasUtils } from '../../utils';
import { ScrollState } from '../../../scroll/model-states';
export class SimpleViewCanvasSizeManager {
    constructor(canvasManager, control) {
        this.id = null;
        this.size = new Size(0, 0);
        this.canvasManager = canvasManager;
        this.control = control;
    }
    dispose() {
        clearTimeout(this.id);
    }
    changeSize(force) {
        const curr = new Size(this.canvasManager.getCanvasWidth(), this.canvasManager.controlHeightProvider.getVisibleAreaHeight(false));
        if (force || !curr.equals(this.size)) {
            this.size = curr;
            this.changeSizeCore();
        }
    }
    setViewMode(val) {
        if (val) {
            this.changeSize(true);
            if (this.id != null)
                return;
            this.id = setInterval(() => this.changeSize(false), SimpleViewCanvasSizeManager.DELAY);
        }
        else {
            if (this.id != null) {
                clearInterval(this.id);
                this.id = null;
            }
            this.changeSizeCore();
        }
    }
    changeSizeCore() {
        {
            ListUtils.forEach(this.control.viewManager.cache, (_val) => this.control.viewManager.renderer.removePage(1), 1);
            this.control.viewManager.ensureFirstPageIsRendered();
            this.control.innerClientProperties.viewsSettings.widthOfPage = this.canvasManager.getCanvasWidth();
            if (this.control.layoutFormatterManager) {
                this.control.layoutFormatterManager.invalidator.onChangedAllLayout();
                this.control.selection.scrollManager.setScroll(new ScrollState().byModelPosition(this.control.selection)
                    .setModelPosition(this.control.selection.lastSelectedInterval.start).useStdRelativePosition().useStdOffset());
            }
            this.control.owner.adjustControl();
            this.control.horizontalRulerControl.update();
        }
    }
}
SimpleViewCanvasSizeManager.DELAY = 1000;
export class DocumentRenderer {
    constructor(viewManager) {
        this.viewManager = viewManager;
        if (this.viewManager.innerClientProperties.viewsSettings.isSimpleView)
            DomUtils.addClassName(this.viewManager.canvas, RendererClassNames.SIMPLE_VIEW);
    }
    get cache() { return this.viewManager.cache; }
    onViewTypeChanged() {
        switch (this.viewManager.innerClientProperties.viewsSettings.viewType) {
            case ViewType.Simple:
                DomUtils.addClassName(this.viewManager.canvas, RendererClassNames.SIMPLE_VIEW);
                break;
            case ViewType.PrintLayout:
                DomUtils.removeClassName(this.viewManager.canvas, RendererClassNames.SIMPLE_VIEW);
                break;
        }
    }
    applyPageChange(layoutPage, pageChange) {
        Log.print(LogSource.DocumentRenderer, "applyPageChanges", `pageIndex ${pageChange.index}`);
        const pageFromCache = this.cache[pageChange.index];
        for (let pageAreaChange of pageChange.mainPageAreaChanges)
            this.applyMainPageAreaChange(pageFromCache, layoutPage, pageAreaChange);
        for (let pageAreaChange of pageChange.otherPageAreaChanges)
            this.applyOtherPageAreaChange(pageFromCache, layoutPage, pageAreaChange);
        for (let anchoredPictureChange of pageChange.anchoredPictureChanges)
            this.applyAnchorPictureChange(pageFromCache, layoutPage, anchoredPictureChange);
    }
    applyAnchorPictureChange(cache, layoutPage, ancPicChange) {
        const objId = ancPicChange.index;
        switch (ancPicChange.changeType) {
            case LayoutChangeType.Deleted: {
                DocumentRenderer.removeFromContainerByObject(objId, DocumentRenderer.getAnchoredObjectsContainer(cache.page), cache.anchoredPicture);
                break;
            }
            case LayoutChangeType.Replaced: {
                const obj = layoutPage.anchoredObjectHolder.getObjById(objId);
                DocumentRenderer.replaceFromContainerByObject(objId, DocumentRenderer.getAnchoredObjectsContainer(cache.page), cache.anchoredPicture, this.renderFloatingPicture(obj, layoutPage.renderLevelCalculator));
                break;
            }
            case LayoutChangeType.Updated: {
                break;
            }
            case LayoutChangeType.Inserted: {
                const obj = layoutPage.anchoredObjectHolder.getObjById(objId);
                DocumentRenderer.insertToContainerByObject(objId, DocumentRenderer.getAnchoredObjectsContainer(cache.page), cache.anchoredPicture, this.renderFloatingPicture(obj, layoutPage.renderLevelCalculator));
                break;
            }
            default: throw new Error(Errors.InternalException);
        }
    }
    applyMainPageAreaChange(pageCache, layoutPage, pageAreaChange) {
        switch (pageAreaChange.changeType) {
            case LayoutChangeType.Deleted:
                DocumentRenderer.removeFromContainerByIndex(pageCache.page, pageAreaChange.canvasIndex, DocumentRenderer.getMainPageAreaContainerCore);
                break;
            case LayoutChangeType.Replaced:
                DocumentRenderer.replaceInContainer(pageCache.page, pageAreaChange.canvasIndex, this.renderPageArea(layoutPage.renderLevelCalculator, pageCache, layoutPage.mainSubDocumentPageAreas[pageAreaChange.layoutIndex], null), DocumentRenderer.getMainPageAreaContainerCore);
                break;
            case LayoutChangeType.Updated: {
                const layoutPageArea = layoutPage.mainSubDocumentPageAreas[pageAreaChange.layoutIndex];
                const pageAreaElement = DocumentRenderer.getMainPageAreaContainerCore(pageCache.page).childNodes[pageAreaChange.canvasIndex];
                for (let columnChange of pageAreaChange.columnChanges)
                    this.applyColumnChange(pageAreaElement, layoutPageArea, columnChange, layoutPage.renderLevelCalculator.renderMainPageAreaLevel);
                break;
            }
            default: throw new Error(Errors.InternalException);
        }
    }
    applyOtherPageAreaChange(cache, layoutPage, pageAreaChange) {
        const subDocId = pageAreaChange.index;
        const pageArea = layoutPage.otherPageAreas[subDocId];
        switch (pageAreaChange.changeType) {
            case LayoutChangeType.Deleted: {
                DocumentRenderer.removeFromContainerByObject(subDocId, DocumentRenderer.getOtherPageAreaContainerCore(cache.page), cache.otherAreas);
                DocumentRenderer.removeFromContainerByObject(subDocId, DocumentRenderer.getTextBoxBackgroundContainer(cache.page), cache.textBoxBgElements);
                break;
            }
            case LayoutChangeType.Replaced: {
                DocumentRenderer.replaceFromContainerByObject(subDocId, DocumentRenderer.getOtherPageAreaContainerCore(cache.page), cache.otherAreas, this.renderPageArea(layoutPage.renderLevelCalculator, cache, pageArea, pageArea.subDocument.isTextBox() ? layoutPage.anchoredObjectHolder.getTextBoxByInternalSubDocId(subDocId) : null));
                break;
            }
            case LayoutChangeType.Updated: {
                const pageAreaElement = cache.otherAreas[subDocId];
                const level = pageArea.subDocument.isTextBox() ?
                    layoutPage.renderLevelCalculator.getRenderLevel(layoutPage.anchoredObjectHolder.getTextBoxByInternalSubDocId(subDocId).rendererLevel) :
                    layoutPage.renderLevelCalculator.renderHeaderFooterPageAreasLevel;
                for (let columnChange of pageAreaChange.columnChanges)
                    this.applyColumnChange(pageAreaElement, pageArea, columnChange, level);
                break;
            }
            case LayoutChangeType.Inserted: {
                DocumentRenderer.insertToContainerByObject(subDocId, DocumentRenderer.getOtherPageAreaContainerCore(cache.page), cache.otherAreas, this.renderPageArea(layoutPage.renderLevelCalculator, cache, pageArea, pageArea.subDocument.isTextBox() ? layoutPage.anchoredObjectHolder.getTextBoxByInternalSubDocId(subDocId) : null));
                break;
            }
            default: throw new Error(Errors.InternalException);
        }
    }
    applyColumnChange(pageAreaElement, layoutPageArea, columnChange, level) {
        switch (columnChange.changeType) {
            case LayoutChangeType.Deleted:
                DocumentRenderer.removeFromContainerByIndex(pageAreaElement, columnChange.canvasIndex, DocumentRenderer.getColumnsContainerCore);
                break;
            case LayoutChangeType.Replaced: {
                const renderedColumn = this.renderColumn(layoutPageArea.columns[columnChange.layoutIndex], level, layoutPageArea.subDocument.isMain());
                DocumentRenderer.replaceInContainer(pageAreaElement, columnChange.canvasIndex, renderedColumn, DocumentRenderer.getColumnsContainerCore);
                break;
            }
            case LayoutChangeType.Updated: {
                const layoutColumn = layoutPageArea.columns[columnChange.layoutIndex];
                const columnElement = DocumentRenderer.getColumnsContainerCore(pageAreaElement).childNodes[columnChange.canvasIndex];
                for (var rowChange of columnChange.rowChanges)
                    DocumentRenderer.applyChange(columnElement, rowChange, DocumentRenderer.getRowsContainerCore, () => this.renderRow(layoutColumn.rows[rowChange.layoutIndex], level));
                for (var tableChange of columnChange.tableChanges)
                    DocumentRenderer.applyChange(columnElement, tableChange, DocumentRenderer.getTablesContainerCore, () => DocumentRenderer.renderTable(layoutColumn.tablesInfo[tableChange.layoutIndex], level, this.viewManager.innerClientProperties.showTableGridLines));
                for (var paragraphFrameChange of columnChange.paragraphFrameChanges)
                    DocumentRenderer.applyChange(columnElement, paragraphFrameChange, DocumentRenderer.getParagraphFramesContainerCore, () => DocumentRenderer.renderParagraphFrame(layoutColumn.paragraphFrames[paragraphFrameChange.layoutIndex], level));
                break;
            }
            case LayoutChangeType.Inserted: {
                const renderedColumn = this.renderColumn(layoutPageArea.columns[columnChange.layoutIndex], level, layoutPageArea.subDocument.isMain());
                DocumentRenderer.insertInContainer(pageAreaElement, columnChange.canvasIndex, renderedColumn, DocumentRenderer.getColumnsContainerCore);
                break;
            }
            default: throw new Error(Errors.InternalException);
        }
    }
    static applyChange(topLevelNode, change, getContainer, getRenderedElement) {
        switch (change.changeType) {
            case LayoutChangeType.Deleted:
                DocumentRenderer.removeFromContainerByIndex(topLevelNode, change.canvasIndex, getContainer);
                break;
            case LayoutChangeType.Replaced:
                DocumentRenderer.replaceInContainer(topLevelNode, change.canvasIndex, getRenderedElement(), getContainer);
                break;
            case LayoutChangeType.Inserted:
                DocumentRenderer.insertInContainer(topLevelNode, change.canvasIndex, getRenderedElement(), getContainer);
                break;
            case LayoutChangeType.Updated:
                break;
            default: throw new Error(Errors.InternalException);
        }
    }
    getPageRender(layoutPageIndex, layoutPage) {
        const cachedPage = this.cache[layoutPageIndex].page;
        if (!DocumentRenderer.isPageElementConsiderAllContainers(cachedPage))
            this.renderPageContent(layoutPage, layoutPageIndex);
        return this.cache[layoutPageIndex].page;
    }
    renderPage(layoutPage, layoutPageIndex, renderInnerContent) {
        layoutPage.flags.set(LayoutPageFlags.IsSelectionRendered, false);
        layoutPage.flags.set(LayoutPageFlags.IsMisspelledSelectionRendered, false);
        layoutPage.flags.set(LayoutPageFlags.IsRangePermissionsRendered, false);
        let pageCache = this.cache[layoutPageIndex];
        if (pageCache) {
            const pageElement = pageCache.page;
            this.updatePageClasses(pageElement);
            this.updatePageSize(layoutPage, pageElement);
            DocumentRenderer.updatePageColor(pageElement, this.viewManager.layout.pageColor);
            if (!DocumentRenderer.isPageElementEmpty(pageElement))
                this.removePageContent(layoutPageIndex);
        }
        else {
            const pageElement = DocumentRenderer.renderContainer("");
            pageElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.SERVICE_CONTAINER));
            DocumentRenderer.updatePageColor(pageElement, this.viewManager.layout.pageColor);
            this.updatePageClasses(pageElement);
            this.updatePageSize(layoutPage, pageElement);
            DocumentRenderer.insertInContainer(this.viewManager.pagesContainer, layoutPageIndex, pageElement, (node) => node);
            this.cache.splice(layoutPageIndex, 0, new DocumentRendererPageCache(pageElement));
        }
        if (renderInnerContent)
            this.renderPageContent(layoutPage, layoutPageIndex);
    }
    removePage(pageIndex) {
        const pageCache = this.cache[pageIndex];
        if (pageCache) {
            pageCache.page.parentNode.removeChild(pageCache.page);
            this.cache.splice(pageIndex, 1);
        }
    }
    updatePageSize(page, pageElement) {
        if (pageElement.offsetHeight != page.height || pageElement.offsetWidth != page.width)
            DomUtils.setStyleSize(pageElement.style, page);
    }
    updatePageClasses(pageElement) {
        pageElement.className = RendererClassNames.PAGE;
        if (this.viewManager.innerClientProperties.viewsSettings.isSimpleView &&
            !this.viewManager.innerClientProperties.viewsSettings.isFixedWidthMode)
            DomUtils.addClassName(pageElement, RendererClassNames.SIMPLE_PAGE_FLOW_MODE);
    }
    removePageContent(pageIndex) {
        const pageCache = this.cache[pageIndex];
        if (pageCache)
            pageCache.removeContent();
    }
    renderPageContainers(pageCache) {
        pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.SELECTION_CONTAINER));
        pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.SEARCH_SELECTION_CONTAINER));
        pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.MISSPELLED_SELECTION_CONTAINER));
        pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.RANGE_PERMISSIONS_CONTAINER));
        const result = [
            pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.MAIN_PAGE_AREA_CONTAINER)),
            pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.OTHER_PAGE_AREA_CONTAINER)),
            pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.FLOATING_OBJECTS_CONTAINER))
        ];
        pageCache.page.appendChild(DocumentRenderer.renderContainer(RendererClassNames.SHAPE_BG_CONTAINER));
        return result;
    }
    renderPageContent(page, pageIndex) {
        const pageCache = this.cache[pageIndex];
        const [mainPageAreasContainer, otherPageAreasContainer, floatingObjectsContainer] = this.renderPageContainers(pageCache);
        ListUtils.forEach(page.mainSubDocumentPageAreas, (area) => mainPageAreasContainer.appendChild(this.renderPageArea(page.renderLevelCalculator, pageCache, area, null)));
        if (!this.viewManager.innerClientProperties.viewsSettings.isSimpleView)
            NumberMapUtils.forEach(page.otherPageAreas, (pageArea, subDocId) => {
                if (!pageArea.subDocument.isTextBox())
                    DocumentRenderer.insertToContainerByObject(subDocId, otherPageAreasContainer, pageCache.otherAreas, this.renderPageArea(page.renderLevelCalculator, pageCache, pageArea, null));
            });
        for (let ancObjProps of this.renderPageContentGetFloatingObjects(page)) {
            switch (ancObjProps.getType()) {
                case LayoutBoxType.AnchorTextBox:
                    const internalSubDocId = ancObjProps.internalSubDocId;
                    DocumentRenderer.insertToContainerByObject(internalSubDocId, otherPageAreasContainer, pageCache.otherAreas, this.renderPageArea(page.renderLevelCalculator, pageCache, page.otherPageAreas[internalSubDocId], ancObjProps));
                    break;
                case LayoutBoxType.AnchorPicture:
                    DocumentRenderer.insertToContainerByObject(ancObjProps.objectId, floatingObjectsContainer, pageCache.anchoredPicture, this.renderFloatingPicture(ancObjProps, page.renderLevelCalculator));
                    break;
            }
        }
    }
    static updatePageColor(pageElement, newColor) {
        const newStringColor = ColorUtils.colorToHash(newColor);
        if (pageElement.style.backgroundColor != newStringColor)
            pageElement.style.backgroundColor = ColorHelper.isEmptyBgColor(newColor) ? "" : newStringColor;
    }
    static getPageAreaClassname(area) {
        switch (area.subDocument.info.getType()) {
            case SubDocumentInfoType.Main:
            case SubDocumentInfoType.Header:
            case SubDocumentInfoType.Footer:
                return RendererClassNames.PAGE_AREA;
            case SubDocumentInfoType.TextBox:
                return `${RendererClassNames.PAGE_AREA} ${RendererClassNames.FLOATING_OBJECT_TEXT_BOX_AREA}`;
        }
        throw new Error(Errors.InternalException);
    }
    renderPageArea(renderLevelCalculator, pageCache, area, textBox, renderContent = true) {
        const element = DocumentRenderer.renderContainer(DocumentRenderer.getPageAreaClassname(area));
        if (area.subDocument.isTextBox())
            element.style.overflow = "hidden";
        DomUtils.setStyleSizeAndPosition(element.style, area);
        let level;
        switch (area.subDocument.info.getType()) {
            case SubDocumentInfoType.TextBox:
                level = renderLevelCalculator.getRenderLevel(textBox.rendererLevel);
                break;
            case SubDocumentInfoType.Footer:
            case SubDocumentInfoType.Header:
                level = renderLevelCalculator.renderHeaderFooterPageAreasLevel;
                break;
            case SubDocumentInfoType.Main:
                level = renderLevelCalculator.renderMainPageAreaLevel;
                break;
            default: throw new Error(Errors.NotImplemented);
        }
        if (area.subDocument.isTextBox()) {
            const textBoxShapeInfo = DocumentRenderer.renderContainer(RendererClassNames.TEXT_BOX_BG + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.TextBoxBg));
            const oldBgElem = pageCache.textBoxBgElements[area.subDocument.id];
            if (oldBgElem)
                DomUtils.hideNode(oldBgElem);
            pageCache.textBoxBgElements[area.subDocument.id] = textBoxShapeInfo;
            DocumentRenderer.setShapePropertiesToElement(textBoxShapeInfo, textBox.shape, true);
            DomUtils.setStyleSize(textBoxShapeInfo.style, area);
            DomUtils.setStylePosition(textBoxShapeInfo.style, textBox.getExtendedBounds());
            DocumentRenderer.setRotationInRadians(textBoxShapeInfo, textBox.rotationInRadians);
            DocumentRenderer.getTextBoxBackgroundContainer(pageCache.page).appendChild(textBoxShapeInfo);
            DomUtils.setStylePosition(element.style, area);
            if (DocumentRenderer.setRotationInRadians(element, textBox.rotationInRadians))
                DomUtils.addClassName(element, ZIndexHelper.getClassName(level, zIndexCssClassType.TextBox));
        }
        else {
            const color = ColorHelper.isEmptyBgColor(this.viewManager.layout.pageColor) ?
                ColorUtils.LIGHT_COLOR : this.viewManager.layout.pageColor;
            DocumentRenderer.updatePageColor(element, color);
        }
        if (renderContent)
            for (let column of area.columns)
                element.appendChild(this.renderColumn(column, level, area.subDocument.isMain()));
        return element;
    }
    renderColumn(column, level, _isMainPageArea) {
        const columnElement = DocumentRenderer.renderContainer(RendererClassNames.COLUMN);
        DomUtils.setStyleSizeAndPosition(columnElement.style, column);
        const rowsContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.ROWS_CONTAINER));
        const paragraphFramesContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.PARAGRAPHFRAMES_CONTAINER));
        const tablesContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.TABLES_CONTAINER));
        for (let row of column.rows)
            rowsContainer.appendChild(this.renderRow(row, level));
        for (let frame of column.paragraphFrames)
            paragraphFramesContainer.appendChild(DocumentRenderer.renderParagraphFrame(frame, level));
        for (let tableColumn of column.tablesInfo)
            tablesContainer.appendChild(DocumentRenderer.renderTable(tableColumn, level, this.viewManager.innerClientProperties.showTableGridLines));
        return columnElement;
    }
    renderRow(row, level) {
        const lastBoxIndexWhatCanStrikeoutAndUnderline = row.getLastBoxIndexWhatCanStrikeoutAndUnderline();
        const rowElement = DocumentRenderer.renderContainer(RendererClassNames.ROW);
        rowElement.innerHTML = "";
        if (row.numberingListBox) {
            let box = this.renderBox(row, row.numberingListBox.textBox, 0 > lastBoxIndexWhatCanStrikeoutAndUnderline, level).html;
            if (typeof box === 'string')
                rowElement.innerHTML += box;
            else
                rowElement.appendChild(box);
            if (row.numberingListBox.separatorBox) {
                let box = this.renderBox(row, row.numberingListBox.separatorBox, 0 > lastBoxIndexWhatCanStrikeoutAndUnderline, level).html;
                if (typeof box === 'string')
                    rowElement.innerHTML += box;
                else
                    rowElement.appendChild(box);
            }
        }
        let increaseRowHeight = false;
        for (let boxIndex = 0, box; box = row.boxes[boxIndex]; boxIndex++) {
            if (box.getType() == LayoutBoxType.AnchorTextBox || box.getType() == LayoutBoxType.AnchorPicture)
                continue;
            const boxRenderResult = this.renderBox(row, box, boxIndex > lastBoxIndexWhatCanStrikeoutAndUnderline, level);
            const boxRenderResultHtml = boxRenderResult.html;
            if (typeof boxRenderResultHtml === 'string')
                rowElement.innerHTML += boxRenderResultHtml;
            else
                rowElement.appendChild(boxRenderResultHtml);
            increaseRowHeight = increaseRowHeight || boxRenderResult.increaseRowHeight;
        }
        for (let bookmarkBox of row.bookmarkBoxes)
            rowElement.appendChild(DocumentRenderer.renderBookmark(bookmarkBox, level));
        DomUtils.setStyleSizeAndPosition(rowElement.style, new Rectangle(row.x, row.y + row.getSpacingBefore(), row.width, (row.height - row.getSpacingBefore()) + (increaseRowHeight ? 1 : 0)));
        return rowElement;
    }
    renderBox(row, box, noNeedUnderlineAndStrikeout, level) {
        let content = box.renderGetContent(this);
        let top = box.getTop(row);
        const left = box.x;
        if (box.characterProperties.script === CharacterFormattingScript.Subscript) {
            const multiplier = box.characterProperties.fontInfo.scriptMultiplier;
            top += UnitConverter.pointsToPixelsF(box.characterProperties.fontSize) * (box.characterProperties.fontInfo.subScriptOffset * multiplier - multiplier + 1);
        }
        const delta = box.height > row.height && top >= 0 ? MathUtils.round(box.height - row.height) * 3 / 4 : 0;
        let boxStyles = [];
        boxStyles.push("left: " + MathUtils.round(left, 3) + "px");
        boxStyles.push("top: " + MathUtils.round(top - delta, 3) + "px");
        boxStyles.push("width: " + MathUtils.round(box.width, 3) + "px");
        const height = MathUtils.round(box.height, 3);
        boxStyles.push("height: " + height + "px");
        if (Browser.MacOSPlatform || Browser.MacOSMobilePlatform)
            boxStyles.push("line-height: " + height + "px");
        if (box.characterProperties.smallCaps)
            boxStyles.push("font-variant: small-caps");
        const props = box.renderGetCharacterProperties();
        const charProps = props.initProps;
        const colorProps = props.colorInfo;
        const underlineColor = colorProps.underlineColor;
        const strikeoutColor = colorProps.strikeoutColor;
        const textColor = colorProps.textColor;
        const needUnderline = !noNeedUnderlineAndStrikeout && (charProps.fontUnderlineType != UnderlineType.None) && (box.getType() != LayoutBoxType.Space || !charProps.underlineWordsOnly);
        const needStrikeout = !noNeedUnderlineAndStrikeout && (charProps.fontStrikeoutType != StrikeoutType.None) && (box.getType() != LayoutBoxType.Space || !charProps.strikeoutWordsOnly);
        const noStrikeoutAndUnderline = (needStrikeout && needUnderline) || (needStrikeout && strikeoutColor != ColorHelper.AUTOMATIC_COLOR) || (needUnderline && underlineColor != ColorHelper.AUTOMATIC_COLOR);
        let commonStyles;
        if (noStrikeoutAndUnderline) {
            commonStyles = HtmlConverter.getCssRules(charProps, textColor, box.renderIsWordBox(), noStrikeoutAndUnderline, true);
            boxStyles = boxStyles.concat(HtmlConverter.getSizeSignificantRules(charProps));
            boxStyles.push(HtmlConverter.getForeColorRule(textColor));
            const needColor = strikeoutColor != ColorHelper.AUTOMATIC_COLOR ||
                underlineColor != ColorHelper.AUTOMATIC_COLOR;
            if (needColor && (!needStrikeout || strikeoutColor != ColorHelper.AUTOMATIC_COLOR)) {
                const span = document.createElement('span');
                span.style.cssText = commonStyles.join(";") + ';color: ' + ColorHelper.getCssString(textColor, true);
                if (typeof content === 'string') {
                    span.innerHTML = content;
                }
                else {
                    span.appendChild(content);
                }
                content = span;
            }
            if (needStrikeout) {
                const strikeoutColorStyle = needColor ? ("color: " + ColorHelper.getCssString(strikeoutColor == ColorHelper.AUTOMATIC_COLOR ? textColor : strikeoutColor, true)) : "";
                const span = document.createElement('span');
                span.style.cssText = commonStyles.join(";") + ';text-decoration: line-through;' + strikeoutColorStyle;
                if (typeof content === 'string') {
                    span.innerHTML = content;
                }
                else {
                    span.appendChild(content);
                }
                content = span;
            }
            if (needUnderline) {
                const underlineColorStyle = needColor ? ("color: " + ColorHelper.getCssString(underlineColor == ColorHelper.AUTOMATIC_COLOR ? textColor : underlineColor, true)) : "";
                const span = document.createElement('span');
                span.style.cssText = commonStyles.join(";") + ';text-decoration: underline;' + underlineColorStyle;
                if (typeof content === 'string') {
                    span.innerHTML = content;
                }
                else {
                    span.appendChild(content);
                }
                content = span;
            }
        }
        else
            boxStyles = boxStyles.concat(HtmlConverter.getCssRules(charProps, textColor, box.renderIsWordBox(), noNeedUnderlineAndStrikeout, true));
        let boxClass = "";
        switch (box.getType()) {
            case LayoutBoxType.Text:
            case LayoutBoxType.LayoutDependent:
            case LayoutBoxType.FieldCodeEnd:
            case LayoutBoxType.FieldCodeStart:
            case LayoutBoxType.ColumnBreak:
            case LayoutBoxType.LineBreak:
            case LayoutBoxType.PageBreak:
            case LayoutBoxType.ParagraphMark:
            case LayoutBoxType.SectionMark:
                boxClass = RendererClassNames.BOX + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.Box);
                break;
            default:
                boxClass = RendererClassNames.BOX_SPACE + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.BoxSpace);
        }
        if (charProps.hidden && this.viewManager.innerClientProperties.showHiddenSymbols)
            boxClass += ' ' + RendererClassNames.HIDDEN_BOX;
        const result = new DocumentFragment();
        const contentSpan = document.createElement('span');
        contentSpan.style.cssText = boxStyles.join(";");
        contentSpan.setAttribute('class', boxClass);
        if (typeof content === 'string') {
            contentSpan.innerHTML = content;
        }
        else if (!!content) {
            contentSpan.appendChild(content);
        }
        result.appendChild(contentSpan);
        const backColor = colorProps.foregroundColor;
        if (box.fieldLevel && (backColor == ColorHelper.AUTOMATIC_COLOR || backColor == ColorHelper.NO_COLOR)) {
            let fieldBgClass = RendererClassNames.FIELD_BG + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.FieldBg);
            switch (box.fieldLevel) {
                case 1:
                    fieldBgClass += ' ' + RendererClassNames.FIELD_BOX_LEVEL1;
                    break;
                case 2:
                    fieldBgClass += ' ' + RendererClassNames.FIELD_BOX_LEVEL2;
                    break;
                default: fieldBgClass += ' ' + RendererClassNames.FIELD_BOX_LEVEL3;
            }
            const span = document.createElement('span');
            span.setAttribute('class', fieldBgClass);
            span.style.cssText = 'top: ' + MathUtils.round(top, 3) + 'px; left: ' + MathUtils.round(left, 3) + 'px; width: ' +
                MathUtils.round(box.width, 3) + 'px; height: ' + MathUtils.round(box.height, 3) + 'px';
            result.appendChild(span);
        }
        if (ColorUtils.getAlpha(backColor) > 0 && !noNeedUnderlineAndStrikeout) {
            const height = row.height - row.getSpacingAfter();
            const bgBoxStyle = "top: 0px; left: " + Math.floor(box.x) + "px; width: " + Math.ceil(box.width) + "px; height: " + MathUtils.round(height, 3) +
                "px; background: " + ColorHelper.getCssStringInternal(backColor) + ";";
            const span = document.createElement('span');
            span.setAttribute('class', RendererClassNames.BOX_BG + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.BoxBg));
            span.style.cssText = bgBoxStyle;
            result.appendChild(span);
        }
        if (box.hyperlinkTip) {
            const tip = CanvasUtils.buildHyperlinkTipString(box.hyperlinkTip, this.viewManager.stringResources.commonLabels.clickToFollowHyperlink, this.viewManager.fieldOptions);
            if (tip) {
                const span = document.createElement('span');
                span.setAttribute('title', tip);
                result.replaceChild(span, contentSpan);
                span.appendChild(contentSpan);
            }
        }
        return new BoxRenderResult(result, charProps.hidden);
    }
    static renderBookmark(box, level) {
        const className = (box.boxType == LayoutBookmarkBoxType.StartBox ?
            RendererClassNames.START_BOOKMARK :
            RendererClassNames.END_BOOKMARK) + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.Bookmark);
        const div = document.createElement('div');
        div.setAttribute('class', className);
        div.style.cssText = `width: ${MathUtils.round(box.width, 3)}px; height: ${MathUtils.round(box.height, 3)}px; ` +
            `left: ${MathUtils.round(box.x, 3)}px; top: ${MathUtils.round(box.y, 3)}px; border-color: ${box.color}`;
        return div;
    }
    renderPicture(box) {
        return this.renderPictureBoxContent(box.createSize(), box.cacheInfo, box.hyperlinkTip);
    }
    renderFloatingPicture(box, renderLevelCalculator) {
        const element = DocumentRenderer.renderContainer(RendererClassNames.ANCHORED_PICTURE + " " + ZIndexHelper.getClassName(renderLevelCalculator.getRenderLevel(box.rendererLevel), zIndexCssClassType.AnchoredPicture));
        DomUtils.setStyleSize(element.style, box);
        DomUtils.setStylePosition(element.style, new Point(box.x - box.shape.outlineWidth, box.y - box.shape.outlineWidth));
        DocumentRenderer.setShapePropertiesToElement(element, box.shape, false);
        DocumentRenderer.setRotationInRadians(element, box.rotationInRadians);
        const content = box.renderGetContent(this);
        element.innerHTML = '';
        if (typeof content === 'string') {
            element.innerHTML = content;
        }
        else {
            element.appendChild(content);
        }
        return element;
    }
    static setShapePropertiesToElement(element, shape, isTextBox) {
        element.style.backgroundColor = ColorHelper.getCssStringInternal(shape.fillColor);
        element.style.borderStyle = DocumentRenderer.borderTypeToString(BorderLineStyle.Single);
        element.style.borderColor = ColorHelper.getCssString(shape.outlineColor, false);
        element.style.borderWidth = Math.max(isTextBox ? 1 : 0, shape.outlineWidth).toString() + "px";
        element.style.boxSizing = "content-box";
    }
    static setRotationInRadians(element, rotation) {
        const isSetRotation = rotation != 0;
        element.style.transform = isSetRotation ? "rotate(" + rotation + "rad)" : "none";
        return isSetRotation;
    }
    static renderParagraphFrame(paragraphFrame, level) {
        const element = DocumentRenderer.renderContainer(RendererClassNames.PARAGRAPH_FRAME + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.ParBg));
        DocumentRenderer.updateParagraphFrame(paragraphFrame, element);
        return element;
    }
    static updateParagraphFrame(frame, frameElement) {
        DomUtils.setStyleSizeAndPosition(frameElement.style, frame);
        frameElement.style.background = ColorHelper.getCssStringInternal(frame.paragraphColor);
    }
    static renderTable(tableColumnInfo, level, showTableGridLines) {
        const tblXPos = tableColumnInfo.x;
        const tblYPos = tableColumnInfo.y;
        const tblBgColor = tableColumnInfo.logicInfo.backgroundColor;
        const tableElement = DocumentRenderer.renderContainer(RendererClassNames.TABLE_ELEMENTS_CONTAINER);
        DomUtils.setStylePosition(tableElement.style, tableColumnInfo);
        const tblBordersContainer = tableElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.TABLE_BORDERS_CONTAINER));
        const tblRowsBgContainer = tableElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.TABLE_ROW_BACKGROUND_CONTAINER));
        const tblCellsBgContainer = tableElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.TABLE_CELL_BACKGROUND_CONTAINER));
        const tblCursorsContainer = DocumentRenderer.renderContainer(RendererClassNames.TABLE_CURSORS_CONTAINER);
        tblCursorsContainer.style.width = tableColumnInfo.width + "px";
        tblCursorsContainer.style.height = tableColumnInfo.height + "px";
        tableElement.appendChild(tblCursorsContainer);
        tblCursorsContainer["dxTableIndex"] = tableColumnInfo.logicInfo.grid.table.index;
        for (let i = 0, border; border = tableColumnInfo.horizontalBorders[i]; i++)
            DocumentRenderer.renderHorizontalBorder(tblBordersContainer, border, level, showTableGridLines);
        for (let i = 0, border; border = tableColumnInfo.verticalBorders[i]; i++)
            DocumentRenderer.renderVerticalBorder(tblBordersContainer, border, level, showTableGridLines);
        if (tableColumnInfo.logicInfo.isEditable) {
            for (let border of tableColumnInfo.verticalCursorBorders) {
                let element = DocumentRenderer.renderContainer(RendererClassNames.TABLE_COLUMN_CURSOR + " " +
                    ZIndexHelper.getClassName(level, zIndexCssClassType.TblCursor));
                DomUtils.setStylePosition(element.style, new Point(border.xPos, border.yPos));
                element.style.height = border.length + "px";
                tblCursorsContainer.appendChild(element);
            }
            for (let border of tableColumnInfo.horizontalCursorBorders) {
                let element = DocumentRenderer.renderContainer(RendererClassNames.TABLE_ROW_CURSOR + " " +
                    ZIndexHelper.getClassName(level, zIndexCssClassType.TblCursor));
                DomUtils.setStylePosition(element.style, new Point(border.xPos, border.yPos));
                element.style.width = border.length + "px";
                element["dxLayoutRowIndex"] = border.layoutRowIndex;
                tblCursorsContainer.appendChild(element);
            }
        }
        for (let tblRow of tableColumnInfo.tableRows) {
            DocumentRenderer.renderTableBackgroundElement(RendererClassNames.TABLE_ROW_BG + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.TblRowBg), tblRowsBgContainer, tblRow, tblXPos, tblYPos, tblBgColor);
            for (let cellBgInfo of tblRow.backgroundInfos)
                DocumentRenderer.renderTableBackgroundElement(RendererClassNames.TABLE_CELL_BG + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.TblCellBg), tblCellsBgContainer, cellBgInfo, 0, 0, cellBgInfo.color);
        }
        return tableElement;
    }
    static renderTableBackgroundElement(className, container, bound, tblXPos, tblYPos, color) {
        if (ColorHelper.isEmptyBgColor(color))
            return;
        const elem = DocumentRenderer.renderContainer(className);
        DomUtils.setStylePosition(elem.style, new Point(bound.x - tblXPos, bound.y - tblYPos));
        DomUtils.setStyleSize(elem.style, bound);
        elem.style.backgroundColor = ColorUtils.colorToHash(color);
        container.appendChild(elem);
    }
    static renderVerticalBorder(tableBordersContainer, border, level, showTableGridLines) {
        const borderInfo = border.borderInfo;
        if (DocumentRenderer.isNotRenderTableBorder(borderInfo)) {
            if (showTableGridLines) {
                const element = DocumentRenderer.createBorderElement(ColorUtils.LIGHT_COLOR, level);
                DomUtils.setStyleSizeAndPosition(element.style, new Rectangle(border.xPos, border.yPos, 0, border.length));
                element.style.borderStyle = "None";
                element.style.borderRightWidth = DocumentRenderer.getTableGridLineBorderWidth();
                element.style.borderRightStyle = "dashed";
                tableBordersContainer.appendChild(element);
            }
        }
        else {
            const element = DocumentRenderer.createBorderElement(borderInfo.color, level);
            DomUtils.setStyleSizeAndPosition(element.style, new Rectangle(border.xPos, border.yPos, 0, border.length));
            element.style.backgroundColor = "";
            element.style.borderStyle = "None";
            element.style.borderRightColor = ColorUtils.colorToHash(borderInfo.color);
            element.style.borderRightWidth = DocumentRenderer.getBorderTypeWidth(borderInfo);
            element.style.borderRightStyle = DocumentRenderer.borderTypeToString(borderInfo.style);
            tableBordersContainer.appendChild(element);
        }
    }
    static getTableGridLineBorderWidth() {
        const devicePixelRatio = window.devicePixelRatio;
        if (Browser.Chrome && devicePixelRatio > 1 && devicePixelRatio < 1.5)
            return "1.5px";
        return "1px";
    }
    static renderHorizontalBorder(tableBordersContainer, border, level, showTableGridLines) {
        const borderInfo = border.borderInfo;
        if (DocumentRenderer.isNotRenderTableBorder(borderInfo)) {
            if (!showTableGridLines)
                return;
            const element = DocumentRenderer.createBorderElement(ColorUtils.LIGHT_COLOR, level);
            DomUtils.setStyleSizeAndPosition(element.style, new Rectangle(border.xPos, border.yPos, border.length, 0));
            element.style.borderStyle = "None";
            element.style.borderBottomWidth = DocumentRenderer.getTableGridLineBorderWidth();
            element.style.borderBottomStyle = "dashed";
            tableBordersContainer.appendChild(element);
        }
        else {
            const element = DocumentRenderer.createBorderElement(borderInfo.color, level);
            DomUtils.setStyleSizeAndPosition(element.style, new Rectangle(border.xPos, border.yPos, border.length, 0));
            element.style.backgroundColor = "";
            element.style.borderStyle = "None";
            element.style.borderBottomColor = ColorUtils.colorToHash(borderInfo.color);
            element.style.borderBottomWidth = DocumentRenderer.getBorderTypeWidth(borderInfo);
            element.style.borderBottomStyle = DocumentRenderer.borderTypeToString(borderInfo.style);
            tableBordersContainer.appendChild(element);
        }
    }
    static createBorderElement(color, level) {
        const element = DocumentRenderer.renderContainer(RendererClassNames.TABLE_BORDER + " " + ZIndexHelper.getClassName(level, zIndexCssClassType.TableBorder));
        element.style.backgroundColor = ColorUtils.colorToHash(color);
        return element;
    }
    static isNotRenderTableBorder(borderInfo) {
        return !borderInfo || borderInfo.style == BorderLineStyle.None || borderInfo.style == BorderLineStyle.Nil;
    }
    static borderTypeToString(style) {
        const str = DocumentRenderer.mapBorderTypeToString[style];
        return str ? str : "solid";
    }
    static getBorderTypeWidth(borderInfo) {
        const mimWidth = this.getBorderTypeMinWidth(borderInfo.style);
        return Math.max(mimWidth, borderInfo.width) + "px";
    }
    static getBorderTypeMinWidth(style) {
        if (style == BorderLineStyle.Double)
            return 3;
        return 1;
    }
    static getServiceContainerCore(pageElement) {
        return pageElement.firstChild;
    }
    static getSelectionContainerCore(pageElement) {
        return pageElement.childNodes[1];
    }
    static getSearchSelectionContainerCore(pageElement) {
        return pageElement.childNodes[2];
    }
    static getMisspelledSelectionContainerCore(pageElement) {
        return pageElement.childNodes[3];
    }
    static getRangePermissionsContainerCore(pageElement) {
        return pageElement.childNodes[4];
    }
    static isPageElementConsiderAllContainers(pageElement) {
        return pageElement.childNodes.length > 1;
    }
    static getMainPageAreaContainerCore(pageElement) {
        return pageElement.childNodes[5];
    }
    static getOtherPageAreaContainerCore(pageElement) {
        return pageElement.childNodes[6];
    }
    static getAnchoredObjectsContainer(pageElement) {
        return pageElement.childNodes[7];
    }
    static getTextBoxBackgroundContainer(pageElement) {
        return pageElement.childNodes[8];
    }
    static getRowsContainerCore(columnElement) {
        return columnElement.firstChild;
    }
    static getParagraphFramesContainerCore(columnElement) {
        return Browser.Chrome ? columnElement.firstChild.nextSibling : columnElement.childNodes[1];
    }
    static getTablesContainerCore(columnElement) {
        return columnElement.lastChild;
    }
    static getColumnsContainerCore(pageAreaElement) {
        return pageAreaElement;
    }
    static renderContainer(className) {
        const element = document.createElement("DIV");
        element.className = className;
        return element;
    }
    static removeFromContainerByIndex(node, index, getContainer) {
        const container = getContainer(node);
        const child = container.childNodes[index];
        if (child)
            container.removeChild(child);
    }
    static replaceInContainer(node, index, newRenderedElement, getContainer) {
        const container = getContainer(node);
        container.replaceChild(newRenderedElement, container.childNodes[index]);
    }
    static insertInContainer(node, index, newRenderedElement, getContainer) {
        const container = getContainer(node);
        if (index < container.childNodes.length)
            container.insertBefore(newRenderedElement, container.childNodes[index]);
        else
            container.appendChild(newRenderedElement);
    }
    static removeFromContainerByObject(id, container, cache) {
        const obj = cache[id];
        if (obj) {
            container.removeChild(obj);
            delete cache[id];
        }
    }
    static replaceFromContainerByObject(id, container, cache, newNode) {
        container.replaceChild(newNode, cache[id]);
        cache[id] = newNode;
    }
    static insertToContainerByObject(id, container, cache, newNode) {
        cache[id] = newNode;
        container.appendChild(newNode);
    }
    static isPageElementEmpty(pageElement) {
        return pageElement.childNodes.length == 0;
    }
    renderPictureBoxContent(size, cacheInfo, tip) {
        const tooltip = tip ? CanvasUtils.buildHyperlinkTipString(tip, this.viewManager.stringResources.commonLabels.clickToFollowHyperlink, this.viewManager.fieldOptions) : "";
        const img = document.createElement('img');
        img.setAttribute('src', cacheInfo.base64);
        if (tooltip) {
            img.setAttribute('title', tooltip);
        }
        img.style.cssText = `height: ${MathUtils.round(size.height, 3)}px; width: ${MathUtils.round(size.width, 3)}px; vertical-align: baseline`;
        img.setAttribute('class', RendererClassNames.PICTURE);
        return img;
    }
}
DocumentRenderer.mapBorderTypeToString = new MapCreator()
    .add(BorderLineStyle.Single, "solid")
    .add(BorderLineStyle.Dotted, "dotted")
    .add(BorderLineStyle.Dashed, "dashed")
    .add(BorderLineStyle.Double, "double")
    .add(BorderLineStyle.DashSmallGap, "dashed")
    .add(BorderLineStyle.DotDash, "dashed")
    .add(BorderLineStyle.DotDotDash, "dashed")
    .get();
export class DocumentRendererPageCache {
    constructor(page) {
        this.page = page;
        this.init();
    }
    removeContent() {
        const serviceContainer = DocumentRenderer.getServiceContainerCore(this.page);
        DomUtils.clearInnerHtml(this.page);
        this.page.appendChild(serviceContainer);
        this.init();
    }
    init() {
        this.otherAreas = {};
        this.anchoredPicture = {};
        this.textBoxBgElements = {};
    }
}
export class BoxRenderResult {
    constructor(html, increaseRowHeight) {
        this.html = html;
        this.increaseRowHeight = increaseRowHeight;
    }
    toString() {
        if (typeof this.html === 'string')
            return this.html;
        else {
            const result = [];
            if (this.html) {
                const length = this.html.children.length;
                for (let i = 0; i < length; i++) {
                    result.push(this.html.children.item(i).outerHTML);
                }
            }
            return result.join('');
        }
    }
}
