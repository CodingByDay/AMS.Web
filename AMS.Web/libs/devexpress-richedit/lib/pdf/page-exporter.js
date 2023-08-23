import { LayoutAnchoredPictureBox } from '../core/layout/main-structures/layout-boxes/layout-anchored-picture-box';
import { LayoutBoxType } from '../core/layout/main-structures/layout-boxes/layout-box';
import { ColorHelper } from '../core/model/color/color';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { PdfLayoutPageAreaExporter } from './page-area-exporter';
export class PdfLayoutPageExporter {
    constructor(doc, textFontMapCache, measurer) {
        this.doc = doc;
        this.pageAreaExporter = new PdfLayoutPageAreaExporter(doc, textFontMapCache, measurer);
    }
    export(page, anchorObjectsPositionInfo, pageColor) {
        this.doc.addPage(this.getPageOptions(page));
        const pos = new Point(page.x, page.y).applyConverter(UnitConverter.pixelsToPointsF);
        const size = page.createSize().applyConverter(UnitConverter.pixelsToPointsF);
        this.drawRect(pos, size, pageColor);
        const anchoredObjects = page.anchoredObjectHolder.getObjectsForRenderer(anchorObjectsPositionInfo, page.anchoredObjectHolder.objects);
        this.exportFloatingObjects(page, anchoredObjects, 0, page.renderLevelCalculator.headerFooterPageAreasLevel);
        this.exportHeaderFooter(page);
        this.exportFloatingObjects(page, anchoredObjects, page.renderLevelCalculator.headerFooterPageAreasLevel, page.renderLevelCalculator.mainPageAreaLevel);
        this.exportMainSubDocument(page);
        this.exportFloatingObjects(page, anchoredObjects, page.renderLevelCalculator.mainPageAreaLevel, anchoredObjects.length);
    }
    exportFloatingObjects(page, sortedObjects, levelFrom, levelTo) {
        for (let i = levelFrom; i < levelTo && i < sortedObjects.length; i++) {
            const anchorObject = sortedObjects[i];
            this.doc.save();
            this.exportFloatingObject(page, anchorObject);
            this.doc.restore();
        }
    }
    exportFloatingObject(page, anchorObject) {
        const pos = new Point(anchorObject.x, anchorObject.y).applyConverter(UnitConverter.pixelsToPointsF);
        const size = anchorObject.createSize().applyConverter(UnitConverter.pixelsToPointsF);
        const rotation = UnitConverter.radiansToDegrees(anchorObject.rotationInRadians);
        if (rotation)
            this.doc.rotate(rotation, { origin: [pos.x + size.width / 2, pos.y + size.height / 2] });
        if (anchorObject instanceof LayoutAnchoredPictureBox) {
            if (anchorObject.cacheInfo.isPdfCompatible())
                this.doc.image(anchorObject.cacheInfo.pdfCompatibleBase64, pos.x, pos.y, { width: size.width, height: size.height });
        }
        else if (anchorObject.getType() == LayoutBoxType.AnchorTextBox) {
            const textBox = anchorObject;
            const pageArea = NumberMapUtils.elementBy(page.otherPageAreas, (pageArea) => pageArea.subDocument.id == textBox.internalSubDocId);
            if (!pageArea)
                return;
            const shape = textBox.shape;
            this.drawRect(pos, size, shape.fillColor, shape.outlineColor, shape.outlineWidth);
            this.pageAreaExporter.export(pageArea, page.bottom, true);
        }
    }
    drawRect(pos, size, fillColor, outlineColor = ColorHelper.AUTOMATIC_COLOR, outlineWidth = 0) {
        this.doc.save();
        if (fillColor != ColorHelper.AUTOMATIC_COLOR && ColorHelper.getCssStringInternal(fillColor) != 'transparent') {
            this.doc.rect(pos.x, pos.y, size.width, size.height);
            this.doc.fillOpacity(ColorHelper.getOpacity(fillColor));
            this.doc.fill(ColorUtils.colorToHash(fillColor));
        }
        if (outlineColor != ColorHelper.AUTOMATIC_COLOR && outlineWidth > 0)
            this.drawOutlineRect(pos, size, outlineWidth, outlineColor);
        this.doc.fillColor(ColorUtils.colorToHash(ColorHelper.AUTOMATIC_COLOR));
        this.doc.restore();
    }
    drawOutlineRect(pos, size, outlineWidth, outlineColor) {
        this.doc.polygon([pos.x, pos.y], [pos.x + size.width, pos.y], [pos.x + size.width, pos.y + size.height], [pos.x, pos.y + size.height]);
        this.doc.lineWidth(UnitConverter.pixelsToPointsF(outlineWidth));
        this.doc.strokeOpacity(ColorHelper.getOpacity(outlineColor));
        this.doc.strokeColor(ColorUtils.colorToHash(outlineColor));
        this.doc.stroke();
    }
    exportMainSubDocument(page) {
        page.mainSubDocumentPageAreas.forEach((pageArea) => this.pageAreaExporter.export(pageArea, page.bottom, false));
    }
    exportHeaderFooter(page) {
        NumberMapUtils.forEach(page.otherPageAreas, (pageArea) => {
            if (!pageArea.subDocument.isTextBox())
                this.pageAreaExporter.export(pageArea, page.height, false);
        });
    }
    getPageOptions(page) {
        const pageOptions = {};
        pageOptions.size = [UnitConverter.pixelsToPointsF(page.width) + 1, UnitConverter.pixelsToPointsF(page.height) + 1];
        pageOptions.margins = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        };
        return pageOptions;
    }
}
