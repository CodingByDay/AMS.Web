import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { RunType } from '../runs/run-type';
import { ModelCheckerResult } from './check-all';
import { HeaderFooterType } from '../section/enums';
import { base64ToHex } from '../../../base-utils/hexadecimal-converter';
import { ExtensionHelper } from '../../formats/utils/extension-helper';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
import { DocumentFormat } from '../../document-format';
import { DXColor } from '../color/dx-color';
export class ModelComparer {
    constructor(model, target, format = null) {
        this.results = [];
        this.pictureSizeAccuracy = 6;
        this.nextRowMark = `
    `;
        this.source = model;
        this.target = target;
        this.format = format;
    }
    compareAll() {
        this.compare([
            this.compareSubDocuments
        ]);
        return !this.results.length;
    }
    compare(comparers) {
        for (let comparer of comparers) {
            const result = comparer.call(this);
            if (result != ModelCheckerResult.None && result !== null) {
                this.results.push(result);
                console.log(this.consoleErrorMessage);
                break;
            }
        }
    }
    compareSubDocuments() {
        this.consoleErrorMessage = 'fail comparing into' + this.nextRowMark;
        let result = this.compareSubDocumentsCore(this.source.mainSubDocument, this.target.mainSubDocument);
        if (result)
            return result;
        result = ListUtils.unsafeAnyOf(this.source.sections, (section, index) => {
            return this.compareSection(section, this.target.sections[index]);
        });
        if (result)
            return result;
        return ModelCheckerResult.None;
    }
    compareSection(source, target) {
        let result = this.compareHeadersFooters(source.headers, target.headers);
        if (!result)
            result = this.compareHeadersFooters(source.footers, target.footers);
        return result;
    }
    compareHeadersFooters(source, target) {
        let result = this.compareHeaderFooter(source, target, HeaderFooterType.Even);
        if (!result)
            result = this.compareHeaderFooter(source, target, HeaderFooterType.Odd);
        if (!result)
            result = this.compareHeaderFooter(source, target, HeaderFooterType.First);
        return result;
    }
    compareHeaderFooter(source, target, type) {
        let sourceObj = source.getObject(type);
        let targetObj = target.getObject(type);
        if (!sourceObj && !targetObj)
            return ModelCheckerResult.None;
        if (!sourceObj || !targetObj)
            return ModelCheckerResult.Section;
        return this.compareSubDocumentsCore(sourceObj.getSubDocument(this.source), targetObj.getSubDocument(this.target));
    }
    compareSubDocumentsCore(source, target) {
        this.consoleErrorMessage += 'SubDoc id = ' + source.id + ' is header: ' + source.isHeader() + ' is footer: ' + source.isFooter() + this.nextRowMark;
        if (!source || !target)
            return ModelCheckerResult.SubDocument;
        if (source.chunks.length != target.chunks.length)
            return ModelCheckerResult.SubDocument;
        let result = this.compareRangePermissions(source.rangePermissions, target.rangePermissions);
        if (result != ModelCheckerResult.None)
            return result;
        return ListUtils.unsafeAnyOf(source.chunks, (sourceChunk, index) => {
            this.consoleErrorMessage += 'chunk index = ' + index + this.nextRowMark;
            return this.compareChunks(sourceChunk, target.chunks[index]);
        });
    }
    compareRangePermissions(source, target) {
        if (source.length != target.length)
            return ModelCheckerResult.RangePermission;
        return ListUtils.anyOf(source, (sourcePermission, index) => !sourcePermission.equals(target[index])) ? ModelCheckerResult.RangePermission : ModelCheckerResult.None;
    }
    countNotLoadedPicture(sourceRuns) {
        const result = ListUtils.reducedMap(sourceRuns, (run) => {
            return this.runShouldBeLostOnExport(run) ? run : null;
        });
        return result.length;
    }
    runShouldBeLostOnExport(run) {
        const runType = run.getType();
        if (runType == RunType.InlinePictureRun)
            return !run.info.cacheInfo.isLoaded;
        else if (runType == RunType.AnchoredPictureRun)
            return !run.info.cacheInfo.isLoaded;
        return false;
    }
    isASCII(code) {
        return code >= 0 && code <= 127;
    }
    compareChunks(sourceChunk, targetChunk) {
        this.consoleErrorMessage += 'chunk length = ' + sourceChunk.textRuns.length + this.nextRowMark;
        const hasLostedRuns = sourceChunk.textRuns.length != targetChunk.textRuns.length;
        if (hasLostedRuns && sourceChunk.textRuns.length - this.countNotLoadedPicture(sourceChunk.textRuns) != targetChunk.textRuns.length) {
            if (this.format != DocumentFormat.Rtf || sourceChunk.textBuffer != targetChunk.textBuffer)
                return ModelCheckerResult.Chunk;
        }
        let skippedRunCount = 0;
        let skippedOffset = 0;
        let splitedRunCount = 0;
        return ListUtils.unsafeAnyOf(sourceChunk.textRuns, (sourceRun, index) => {
            const targetIndex = index - skippedRunCount + splitedRunCount;
            const targetRun = targetChunk.textRuns[targetIndex];
            const problemRun = sourceRun.getType() != targetRun.getType() || sourceRun.startOffset - skippedOffset != targetRun.startOffset ||
                sourceRun.getLength() != targetRun.getLength();
            this.consoleErrorMessage += 'source run index = ' + index + ' target run index = ' + targetIndex + this.nextRowMark;
            if (problemRun && hasLostedRuns) {
                if (this.runShouldBeLostOnExport(sourceRun)) {
                    skippedRunCount++;
                    skippedOffset += sourceRun.getLength();
                    return ModelCheckerResult.None;
                }
                let separatorsCount = 0;
                const runType = sourceRun.getType();
                if (runType == RunType.TextRun) {
                    const text = sourceChunk.getRunText(sourceRun);
                    const length = sourceRun.getLength();
                    let hasNonASCIICharacters = false;
                    for (let i = 0; i < length; i++) {
                        if (!this.isASCII(text.charCodeAt(i))) {
                            hasNonASCIICharacters = true;
                            separatorsCount++;
                        }
                    }
                    if (hasNonASCIICharacters) {
                        if (text.length == separatorsCount)
                            separatorsCount--;
                        if (this.isASCII(text.charCodeAt(0)) && this.isASCII(text.charCodeAt(text.length - 1)))
                            separatorsCount++;
                        splitedRunCount += separatorsCount;
                        return ModelCheckerResult.None;
                    }
                }
                return ModelCheckerResult.Run;
            }
            return this.compareRuns(sourceRun, targetRun, sourceChunk, targetChunk, skippedOffset);
        });
    }
    compareRuns(sourceRun, targetRun, sourceChunk, targetChunk, skippedOffset) {
        if (sourceRun.getType() != targetRun.getType() || sourceRun.startOffset - skippedOffset != targetRun.startOffset ||
            sourceRun.getLength() != targetRun.getLength() || sourceChunk.getRunText(sourceRun) != targetChunk.getRunText(targetRun) ||
            !this.compareCharacterPropertiesBundle(sourceRun.getCharPropsBundle(this.source), targetRun.getCharPropsBundle(this.target))) {
            this.consoleErrorMessage += 'main run properties comparing failed ' + this.nextRowMark;
            return ModelCheckerResult.Run;
        }
        switch (sourceRun.getType()) {
            case RunType.TextRun:
            case RunType.ParagraphRun:
                return ModelCheckerResult.None;
            case RunType.InlinePictureRun:
                return this.compareInlinePictureRuns(sourceRun, targetRun);
            case RunType.AnchoredPictureRun:
                return this.compareAnchoredPictureRuns(sourceRun, targetRun);
            case RunType.AnchoredTextBoxRun:
                return this.compareAnchoredTextBoxRuns(sourceRun, targetRun);
            default: return ModelCheckerResult.None;
        }
    }
    compareCharacterPropertiesBundle(sourceProps, targetProps) {
        return this.compareStyles(sourceProps.style, targetProps.style);
    }
    compareStyles(sourceSize, targetSize) {
        if (!sourceSize || !targetSize)
            return !sourceSize && !targetSize;
        return sourceSize.styleName == targetSize.styleName && sourceSize.deleted == targetSize.deleted &&
            this.compareStyles(sourceSize.parent, targetSize.parent);
    }
    compareInlinePictureRuns(sourceRun, targetRun) {
        const result = this.comparePictureSize(sourceRun.size, targetRun.size) && this.compareShape(sourceRun.info.shape, targetRun.info.shape) &&
            this.compareNonVisualDrawingObjectInfo(sourceRun.info.containerProperties, targetRun.info.containerProperties);
        this.consoleErrorMessage += 'InlinePicture run properties comparing failed ' + this.nextRowMark;
        return result ? ModelCheckerResult.None : ModelCheckerResult.Run;
    }
    compareAnchoredPictureRuns(sourceRun, targetRun) {
        const result = this.comparePictureSize(sourceRun.size, targetRun.size) && this.compareShape(sourceRun.info.shape, targetRun.info.shape) &&
            this.compareNonVisualDrawingObjectInfo(sourceRun.info.containerProperties, targetRun.info.containerProperties) &&
            this.compareAnchorInfo(sourceRun.info.anchorInfo, targetRun.info.anchorInfo);
        this.consoleErrorMessage += 'AnchoredPictureRun run properties comparing failed ' + this.nextRowMark;
        return result ? ModelCheckerResult.None : ModelCheckerResult.Run;
    }
    compareAnchoredTextBoxRuns(sourceRun, targetRun) {
        const result = this.compareTextBoxSize(sourceRun.size, targetRun.size) && this.compareShape(sourceRun.shape, targetRun.shape) &&
            this.compareAnchorInfo(sourceRun.anchorInfo, targetRun.anchorInfo) &&
            this.compareTextBoxProperties(sourceRun.textBoxProperties, targetRun.textBoxProperties);
        this.consoleErrorMessage += 'AnchoredTextBoxRun run properties comparing failed ' + this.nextRowMark;
        return result ? ModelCheckerResult.None : ModelCheckerResult.Run;
    }
    compareTextBoxProperties(source, target) {
        return source.resizeShapeToFitText == target.resizeShapeToFitText &&
            source.upright == target.upright &&
            source.verticalAlignment == target.verticalAlignment &&
            source.wrapText == target.wrapText &&
            source.leftMargin == target.leftMargin &&
            source.rightMargin == target.rightMargin &&
            source.topMargin == target.topMargin &&
            source.bottomMargin == target.bottomMargin;
    }
    compareAnchorInfo(source, target) {
        return source.equals(target);
    }
    compareTextBoxSize(source, target) {
        return source.useAbsoluteHeight() ? true : source.relativeHeightType == target.relativeHeightType &&
            source.useAbsoluteWidth() ? true : source.relativeWidthType == target.relativeWidthType && source.lockAspectRatio == target.lockAspectRatio && source.rotation == target.rotation &&
            this.compareSize(source.relativeSize, target.relativeSize) && this.compareSize(source.absoluteSize, target.absoluteSize);
    }
    comparePictureSize(source, target) {
        return this.compareSizeBasedOnScale(source.actualSize, target.actualSize, source.scale) && source.lockAspectRatio == target.lockAspectRatio &&
            this.compareSize(source.originalSize, target.originalSize) && this.compareSize(source.scale, target.scale) &&
            source.rotation == target.rotation && this.compareCacheInfo(source.cacheInfo, target.cacheInfo);
    }
    compareSizeBasedOnScale(sourceSize, targetSize, sourceScale) {
        const accuracyX = Math.floor(sourceScale.width / 100) + this.pictureSizeAccuracy;
        const accuracyY = Math.floor(sourceScale.height / 100) + this.pictureSizeAccuracy;
        return this.compareSize(sourceSize, targetSize, accuracyX, accuracyY);
    }
    compareSize(sourceSize, targetSize, accuracyX, accuracyY) {
        accuracyX !== null && accuracyX !== void 0 ? accuracyX : (accuracyX = this.pictureSizeAccuracy);
        accuracyY !== null && accuracyY !== void 0 ? accuracyY : (accuracyY = this.pictureSizeAccuracy);
        return Math.abs(sourceSize.width - targetSize.width) < accuracyX
            && Math.abs(sourceSize.height - targetSize.height) < accuracyY;
    }
    compareCacheInfo(source, target) {
        return base64ToHex(ExtensionHelper.getBase64DataWithoutPrefix(source.base64)) ===
            base64ToHex(ExtensionHelper.getBase64DataWithoutPrefix(target.base64)) && this.compareSize(source.size, target.size);
    }
    compareShape(source, target) {
        const fillColorEquals = ColorUtils.colorToHash(source.fillColor) == ColorUtils.colorToHash(target.fillColor) ||
            DXColor.isTransparentOrEmptyorNoColor(source.fillColor) == DXColor.isTransparentOrEmptyorNoColor(target.fillColor);
        const hasOutlineColor = !DXColor.isTransparentOrEmptyorNoColor(source.outlineColor);
        const outlineEquals = source.outlineWidth > 0 && hasOutlineColor ?
            (ColorUtils.colorToHash(source.outlineColor) == ColorUtils.colorToHash(target.outlineColor) ||
                DXColor.isTransparentOrEmptyorNoColor(source.outlineColor) == DXColor.isTransparentOrEmptyorNoColor(target.outlineColor)) &&
                source.outlineWidth == target.outlineWidth : true;
        return fillColorEquals && outlineEquals;
    }
    compareNonVisualDrawingObjectInfo(source, target) {
        if (this.format && this.format == DocumentFormat.Rtf)
            return source.description == target.description;
        const isAutogeneratedProperties = !source.name && target.name == 'Picture ' + target.id;
        if (isAutogeneratedProperties)
            return true;
        return source.name == target.name && source.title == target.title && source.description == target.description;
    }
}
