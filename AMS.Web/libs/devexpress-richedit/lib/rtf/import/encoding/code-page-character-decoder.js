import { DecoderHelper } from '../dx-decoding/decoder-helper';
import { CharacterDecoder } from './character-decoder';
export class CodePageCharacterDecoder extends CharacterDecoder {
    constructor(codePage) {
        super(codePage);
        this.bytes = [];
    }
    processChar(importer, ch) {
        if (this.bytes.length == CodePageCharacterDecoder.capacity)
            this.flush(importer);
        this.bytes.push(ch);
    }
    flushByChar(importer, chars) {
        const count = chars.length;
        for (let i = 0; i < count; i++)
            importer.processChar(chars[i]);
    }
    flushByString(importer, chars) {
        importer.destination.processText(chars.join(""));
    }
    flush(importer) {
        if (this.bytes.length > 0) {
            const chars = DecoderHelper.getChars(this.bytes, this.codePage);
            if (!importer.destination.canAppendText || chars.length <= 1) {
                this.flushByChar(importer, chars);
            }
            else {
                this.flushByString(importer, chars);
            }
            this.bytes = [];
        }
    }
}
CodePageCharacterDecoder.capacity = 2048;
