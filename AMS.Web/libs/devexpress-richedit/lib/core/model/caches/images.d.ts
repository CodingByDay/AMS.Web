import { Size } from '@devexpress/utils/lib/geometry/size';
import { PictureManipulator } from '../manipulators/picture-manipulator/picture-manipulator';
export declare class CacheImageInfo {
    private static emptyPicDimension;
    static get emptyPictureSize(): Size;
    private _referenceInfo?;
    private _base64?;
    private _convertedBase64?;
    private _size?;
    private _isLoaded;
    tmpId?: number;
    actualId?: number;
    imageUrl?: string;
    file?: File;
    get isLoaded(): boolean;
    set isLoaded(val: boolean);
    get size(): Size;
    set size(val: Size);
    get currId(): number;
    get base64(): string | undefined;
    set base64(val: string | undefined);
    get pdfCompatibleBase64(): string | undefined;
    get referenceInfo(): CacheImageInfo | undefined;
    set referenceInfo(val: CacheImageInfo | undefined);
    constructor(base64?: string, actualId?: number, tmpId?: number, imageUrl?: string, file?: File, referenceInfo?: CacheImageInfo, size?: Size, isLoaded?: boolean);
    equals(obj: CacheImageInfo): boolean;
    clone(): CacheImageInfo;
    shouldMakeImagePdfCompatible(): boolean;
    isPdfCompatible(): boolean;
    setPdfCompatibleBase64(val: string): void;
    private getImageHeader;
}
export declare class ImageCache {
    private static transparentWhiteImage1_1;
    private cache;
    readonly emptyImageId: number;
    private lastTmpId;
    private lastActualId;
    get emptyImage(): CacheImageInfo;
    constructor();
    getPictureData(id: number): CacheImageInfo;
    createUnloadedInfoByUrl(imageUrl: string, size?: Size): CacheImageInfo;
    createUnloadedInfoByFile(file: File): CacheImageInfo;
    registerFromAnotherModel(imageInfo: CacheImageInfo): void;
    createUnloadedInfoByBase64(base64: string, size?: Size): CacheImageInfo;
    createLoadedInfo(base64: string, size: Size, id?: number): CacheImageInfo;
    createUnloadedByBase64OrUrl(data: string, size?: Size): CacheImageInfo;
    finalizeLoading(existingInfo: CacheImageInfo, loadedInfo: CacheImageInfo): void;
    getNextActualId(): number;
    isDataRegistered(data: CacheImageInfo): boolean;
    registerPictureData(data: CacheImageInfo): CacheImageInfo;
    loadAllPictures(picture: PictureManipulator): void;
    private findInfoByBase64;
    private findInfoByUrl;
    private origSizeCorrect;
    clone(): ImageCache;
}
//# sourceMappingURL=images.d.ts.map