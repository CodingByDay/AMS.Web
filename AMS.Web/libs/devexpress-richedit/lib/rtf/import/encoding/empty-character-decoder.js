import { CodePageCharacterDecoder } from './code-page-character-decoder';
import { CodePages } from './code-pages';
export class EmptyCharacterDecoder extends CodePageCharacterDecoder {
    constructor() {
        super(CodePages.default);
    }
    processChar(importer, ch) {
        importer.destination.processChar(ch);
    }
    flush(_importer) {
    }
}
