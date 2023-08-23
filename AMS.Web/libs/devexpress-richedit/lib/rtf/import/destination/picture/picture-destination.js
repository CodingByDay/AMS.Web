import { Size } from '@devexpress/utils/lib/geometry/size';
import { RtfDrawingKeywords } from '../../../translation-table/rtf-drawing-keywords';
import { hexToBase64 } from '../../../../base-utils/hexadecimal-converter';
import { RtfMathUtils } from '../../../utils/rtf-math-utils';
import { EmptyCharacterDecoder } from '../../encoding/empty-character-decoder';
import { PictureDestinationInfo } from '../../model/image/picture-destination-info';
import { RtfImageInfo } from '../../model/image/rtf-image-info';
import { HexContentDestination } from '../base/hex-content-destination';
import { ShapePropertyDestination } from '../shape/shape-property-destination';
import { DestinationType } from '../utils/destination-type';
import { PictureSourceType } from '../utils/enums';
import { RtfHundredthsOfMillimeterConverter, RtfPixelsToTwipsConverter } from './picture-units-converter';
import { SkipDestination } from '../base/skip-destination';
export class PictureDestination extends HexContentDestination {
    constructor(importer) {
        super(importer);
        this.info = new PictureDestinationInfo();
        this.oldDecoder = this.importer.importers.character.characterFormatting.rtfFormattingInfo.decoder;
        this.importer.importers.character.characterFormatting.rtfFormattingInfo.setDecoder(new EmptyCharacterDecoder());
    }
    get destinationType() { return DestinationType.PictureDestination; }
    ;
    get controlCharHT() { return null; }
    ;
    static getThis(rtfImporter) {
        return rtfImporter.destination;
    }
    static onEmfFileKeyword(importer, _parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.Emf;
    }
    static onPngFileKeyword(importer, _parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.Png;
    }
    static onJpegFileKeyword(importer, _parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.Jpeg;
    }
    static onMacFileKeyword(importer, _parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.Mac;
    }
    static onWindowsMetafileKeyword(importer, parameterValue, hasParameter) {
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.Wmf;
        if (hasParameter)
            destination.info.wmfMapMode = parameterValue;
    }
    static onDeviceIndependentBitmapFileKeyword(importer, parameterValue, hasParameter) {
        if (hasParameter && parameterValue != 0)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.WindowsDib;
    }
    static onDeviceDependentBitmapFileKeyword(importer, parameterValue, hasParameter) {
        if (hasParameter && parameterValue != 0)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.pictureSourceType = PictureSourceType.WindowsBmp;
    }
    static onBitmapBitsPerPixelKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 1;
        const isParameterValueCorrect = parameterValue == 1 ||
            parameterValue == 4 || parameterValue == 8 || parameterValue == 16 || parameterValue == 24 || parameterValue == 32;
        if (!isParameterValueCorrect)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.bmpBitsPerPixel = parameterValue;
    }
    static onBitmapPlanesKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        if (parameterValue != 1)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.bmpColorPlanes = parameterValue;
    }
    static onBitmapBytesInLineKeyword(importer, parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.bmpBytesInLine = parameterValue;
    }
    static onPictureWidthKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        let correctedValue = parameterValue;
        if (parameterValue < 0 && RtfMathUtils.isShortValue(parameterValue))
            correctedValue = PictureDestination.fillBytesToConvertFromShortIntToLongInt(RtfMathUtils.getShortValue(parameterValue));
        destination.info.pictureWidth = correctedValue;
    }
    static onPictureHeightKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        let correctedValue = parameterValue;
        if (PictureDestination.checkIfParameterStoredAsShortIntegerInsteadLongInt(parameterValue))
            correctedValue = PictureDestination.fillBytesToConvertFromShortIntToLongInt(RtfMathUtils.getShortValue(parameterValue));
        destination.info.pictureHeight = correctedValue;
    }
    static checkIfParameterStoredAsShortIntegerInsteadLongInt(parameterValue) {
        return parameterValue < 0 && RtfMathUtils.isShortValue(parameterValue);
    }
    static fillBytesToConvertFromShortIntToLongInt(parameterValue) {
        return RtfMathUtils.getUInt16(parameterValue);
    }
    static onPictureGoalWidthKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.desiredPictureWidth = parameterValue;
    }
    static onPictureGoalHeightKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.desiredPictureHeight = parameterValue;
    }
    static onHorizontalScalingKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.scaleX = parameterValue;
    }
    static onVerticalScalingKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.scaleY = parameterValue;
    }
    static onPicScaledKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onTopCropKeyword(importer, parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.topCrop = parameterValue;
    }
    static onBottomCropKeyword(importer, parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.bottomCrop = parameterValue;
    }
    static onLeftCropKeyword(importer, parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.leftCrop = parameterValue;
    }
    static onRightCropKeyword(importer, parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.info.rightCrop = parameterValue;
    }
    static onBitmapMetafileKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onBitsPerPixelBitmapMetafileKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onDxImageUri(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onShapePropertiesKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new ShapePropertyDestination(importer, importer.destination.info.properties);
    }
    static onBlipTag(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            importer.throwInvalidRtfFile();
        const destination = importer.destination;
        destination.info.blipTag = parameterValue;
    }
    static onShapePropertyKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new ShapePropertyDestination(importer, PictureDestination.getThis(importer).info.properties);
    }
    createClone() {
        const clone = new PictureDestination(this.importer);
        clone.info = this.info;
        return clone;
    }
    beforePopRtfState() {
        this.importer.importers.character.characterFormatting.rtfFormattingInfo.setDecoder(this.oldDecoder);
        super.beforePopRtfState();
    }
    processBinCharCore(ch) {
        this.info.dataStream.push(ch);
    }
    validateImageSize(_image) {
        if (this.info.pictureWidth < 0)
            this.info.pictureWidth = 0;
        if (this.info.pictureHeight < 0)
            this.info.pictureHeight = 0;
    }
    loadMetafile(_info) {
    }
    loadBitmap(_info) {
    }
    loadDib(_info) {
    }
    loadImageInUnits(imageInfo, _unitsConverter) {
        this.importer.importers.image.scale = new Size(this.info.scaleX, this.info.scaleY);
        this.importer.importers.image.desireSize = new Size(this.info.desiredPictureWidth, this.info.desiredPictureHeight);
        this.applyVisibleSize(imageInfo);
    }
    applyVisibleSize(imageInfo) {
        if (this.info.scaleX <= 0)
            this.info.scaleX = 100;
        if (this.info.scaleY <= 0)
            this.info.scaleY = 100;
        const unscaledVisibleWidth = Math.max(1, this.info.desiredPictureWidth - this.info.leftCrop - this.info.rightCrop);
        const unscaledVisibleHeight = Math.max(1, this.info.desiredPictureHeight - this.info.topCrop - this.info.bottomCrop);
        imageInfo.actualSize = new Size((unscaledVisibleWidth * this.info.scaleX + 50) / 100, (unscaledVisibleHeight * this.info.scaleY + 50) / 100);
    }
    loadMetafileImageInUnits(_imageInfo) {
    }
    applySourceRect(_imageInfo, _desiredPictureWidth, _desiredPictureHeight) {
    }
    getFractionInThousandthOfPercent(_cropSize, _desiredSize) {
        return 0;
    }
    loadPicture() {
        const info = new RtfImageInfo();
        if (this.info.dataStream.length > 0)
            this.loadPictureCore(info);
        return info;
    }
    loadPictureCore(info) {
        info.base64 = this.getPrefix(this.info.pictureSourceType) + hexToBase64(this.info.dataStream.join(""));
        this.validateImageSize(info.base64);
        this.loadImageInUnits(info, PictureDestination.rtfHundredthsOfMillimeterConverter);
    }
    getPrefix(sourceType) {
        return "data:" + this.getPictureFormat(sourceType) + ";base64,";
    }
    getPictureFormat(sourceType) {
        switch (sourceType) {
            case PictureSourceType.Jpeg:
                return 'image/jpeg';
            default:
                return 'image/png';
        }
    }
    getImageInfo() {
        const imageInfo = this.loadPicture();
        if (imageInfo != null)
            this.info.properties.trySetProperty(RtfDrawingKeywords.PseudoInline, value => imageInfo.pseudoInline = value);
        imageInfo.blipTag = this.info.blipTag;
        return imageInfo;
    }
    dispose(_disposing) {
    }
}
PictureDestination.rtfHundredthsOfMillimeterConverter = new RtfHundredthsOfMillimeterConverter();
PictureDestination.rtfPixelsConverter = new RtfPixelsToTwipsConverter(96);
