import { SkipCharacterDecoder } from '../../encoding/skip-character-decoder';
import { DestinationType } from '../utils/destination-type';
import { DestinationBase } from './destination';
export class SkipDestination extends DestinationBase {
    constructor(importer) {
        super(importer);
        const formInfo = this.importer.importers.character.characterFormatting.rtfFormattingInfo;
        this.oldDecoder = formInfo.decoder;
        formInfo.decoder = new SkipCharacterDecoder();
    }
    get destinationType() { return DestinationType.SkipDestination; }
    get controlCharHT() { return null; }
    ;
    beforePopRtfState() {
        this.importer.importers.character.characterFormatting.rtfFormattingInfo.decoder = this.oldDecoder;
        super.beforePopRtfState();
    }
    processControlCharCore(_ch) { }
    processKeywordCore(keyword, parameterValue, hasParameter) {
        const translator = this.keywordHT[keyword];
        if (translator) {
            translator(this.importer, parameterValue, hasParameter);
            return true;
        }
        return false;
    }
    processCharCore(_ch) {
    }
    createClone() {
        return new SkipDestination(this.importer);
    }
}
