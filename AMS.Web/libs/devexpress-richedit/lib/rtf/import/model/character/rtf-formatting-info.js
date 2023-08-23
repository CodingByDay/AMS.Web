import { CodePageCharacterDecoder } from '../../encoding/code-page-character-decoder';
import { CodePages } from '../../encoding/code-pages';
import { RtfImportData } from '../../rtf-import-data';
export class RtfFormattingInfo {
    constructor() {
        this._unicodeCharacterByteCount = 1;
        this.codePage = CodePages.default;
    }
    setDecoder(_obj) {
    }
    get unicodeCharacterByteCount() { return this._unicodeCharacterByteCount; }
    set unicodeCharacterByteCount(value) {
        if (value < 0)
            RtfImportData.throwInvalidRtfFile();
        this._unicodeCharacterByteCount = value;
    }
    get codePage() { return this._codePage; }
    set codePage(value) {
        if (this._codePage == value)
            return;
        this._codePage = value;
        this.decoder = this.chooseDecoder();
    }
    chooseDecoder() {
        return new CodePageCharacterDecoder(this.codePage);
    }
    clone() {
        const clone = this.createEmptyClone();
        clone.copyFrom(this);
        return clone;
    }
    createEmptyClone() {
        return new RtfFormattingInfo();
    }
    copyFrom(info) {
        this.unicodeCharacterByteCount = info.unicodeCharacterByteCount;
        this.codePage = info.codePage;
        this.deleted = info.deleted;
    }
}
