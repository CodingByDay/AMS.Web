import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { SpellCheckerIntervalsManager } from '../spelling/intervals-manager';
import { RunIterator } from './character/run-iterator';
import { ResetFormattingCacheType } from './document-model';
import { Field } from './fields/field';
import { FullChunkAndRunInfo } from './full-chunk-and-run-info';
import { BookmarksManipulator } from './manipulators/bookmarks-manipulator';
import { ModelIterator } from './model-iterator';
import { PositionManager } from './position/position-manager';
import { RichUtils } from './rich-utils';
import { RunType } from './runs/run-type';
export class SubDocument {
    constructor(documentModel, subDocumentInfo) {
        this.chunks = [];
        this.paragraphs = [];
        this.fields = [];
        this.tables = [];
        this.tablesByLevels = [];
        this.positionManager = new PositionManager();
        this.fieldsWaitingForUpdate = null;
        this.bookmarks = [];
        this.rangePermissions = [];
        this.availableRangePermissions = [];
        this.documentModel = documentModel;
        this.id = subDocumentInfo.subDocumentId;
        this.info = subDocumentInfo;
        documentModel.subDocumentsCollection.add(this);
        this.spellCheckerIntervalsManager = new SpellCheckerIntervalsManager(this);
    }
    get interval() { return new FixedInterval(0, this.getDocumentEndPosition()); }
    getLastChunk() {
        return this.chunks[this.chunks.length - 1];
    }
    getFirstChunk() {
        return this.chunks[0];
    }
    getText(interval = new FixedInterval(0, this.getDocumentEndPosition())) {
        var buffer = "";
        var chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, interval.start);
        var chunk = this.chunks[chunkIndex];
        var remainLength = interval.length;
        var offset = interval.start - chunk.startLogPosition.value;
        while (chunk) {
            var length = Math.min(chunk.textBuffer.length - offset, remainLength);
            buffer += chunk.textBuffer.substr(offset, length);
            remainLength -= length;
            if (remainLength === 0)
                break;
            chunk = this.chunks[++chunkIndex];
            offset = 0;
        }
        return buffer;
    }
    getSimpleText(interval) {
        let result = "";
        let pos = interval.start;
        let nested = 0;
        const fieldIndex = Field.normedBinaryIndexOf(this.fields, pos);
        if (fieldIndex > -1) {
            let field = this.fields[fieldIndex];
            while (field.parent)
                field = field.parent;
            pos = field.getFieldStartPosition();
        }
        const iterator = new ModelIterator(this, true);
        iterator.setPosition(pos);
        while (pos < interval.end) {
            switch (iterator.run.getType()) {
                case RunType.FieldCodeStartRun:
                    nested++;
                    break;
                case RunType.FieldCodeEndRun:
                    nested--;
                    break;
                case RunType.TextRun:
                    if (pos >= interval.start && nested == 0)
                        result += iterator.getCurrentChar();
                    break;
            }
            if (!iterator.moveToNextChar())
                break;
            pos = iterator.getAbsolutePosition();
        }
        return result.replace(RichUtils.specialCharacters.LineBreak, " ");
    }
    splitRun(position) {
        var info = this.getRunAndIndexesByPosition(position);
        var offset = position - (info.chunk.startLogPosition.value + info.run.startOffset);
        if (offset > 0)
            info.chunk.splitRun(info.runIndex, offset);
    }
    getLastRun() {
        var lastChunk = this.getLastChunk();
        return lastChunk.textRuns[lastChunk.textRuns.length - 1];
    }
    getFirstRun() {
        return this.chunks[0].textRuns[0];
    }
    getRunIterator(interval) {
        return this.getRunIteratorInternal(interval, false);
    }
    getConstRunIterator(interval) {
        return this.getRunIteratorInternal(interval, true);
    }
    getRunIteratorInternal(interval, isConstRunIterator) {
        if (interval.length == 0)
            return new RunIterator([], [], [], [1], [1]);
        var runs = [], chunks = [], sections = [], indexForChunks = [], indexForSections = [];
        var currentChunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, interval.start), currentChunk = this.chunks[currentChunkIndex];
        chunks.push(currentChunk);
        var currentRunIndex = SearchUtils.normedInterpolationIndexOf(currentChunk.textRuns, (r) => currentChunk.startLogPosition.value + r.startOffset, interval.start), currentRun = currentChunk.textRuns[currentRunIndex], remainIntervalLength = interval.length;
        if (currentChunk.startLogPosition.value + currentRun.startOffset < interval.start) {
            if (isConstRunIterator)
                remainIntervalLength += interval.start - (currentChunk.startLogPosition.value + currentRun.startOffset);
            else {
                currentChunk.splitRun(currentRunIndex, interval.start - (currentChunk.startLogPosition.value + currentRun.startOffset));
                currentRunIndex++;
            }
        }
        var currentSectionIndex = SearchUtils.normedInterpolationIndexOf(this.documentModel.sections, (s) => s.startLogPosition.value, interval.start);
        var currentSection = this.documentModel.sections[currentSectionIndex];
        sections.push(currentSection);
        var runIndex = 0;
        var sectionIndex = 0;
        var remainSectionLength = currentSection.startLogPosition.value + currentSection.getLength() - interval.start;
        while (currentRun = currentChunk.textRuns[currentRunIndex]) {
            if (remainSectionLength === 0 && this.isMain()) {
                currentSectionIndex++;
                currentSection = this.documentModel.sections[currentSectionIndex];
                sections.push(currentSection);
                indexForSections.push(sectionIndex - 1);
                remainSectionLength = currentSection.getLength();
            }
            if (currentRun.getLength() > remainIntervalLength) {
                if (isConstRunIterator) {
                    runs.push(currentRun.createSimularity(Math.max(currentRun.startOffset, interval.start - currentChunk.startLogPosition.value), Math.min(remainIntervalLength, interval.length), currentRun.paragraph, currentRun.characterStyle, currentRun.maskedCharacterProperties));
                }
                else {
                    currentChunk.splitRun(currentRunIndex, remainIntervalLength);
                    runs.push(currentRun);
                }
                break;
            }
            if (runIndex == 0 && isConstRunIterator && currentRun.startOffset + currentChunk.startLogPosition.value < interval.start) {
                var runEndPosition = currentChunk.startLogPosition.value + currentRun.startOffset + currentRun.getLength(), newRunLength = runEndPosition - interval.start;
                runs.push(currentRun.createSimularity(interval.start - currentChunk.startLogPosition.value, newRunLength, currentRun.paragraph, currentRun.characterStyle, currentRun.maskedCharacterProperties));
                remainSectionLength -= newRunLength;
            }
            else {
                runs.push(currentRun);
                remainSectionLength -= currentRun.getLength();
            }
            remainIntervalLength -= currentRun.getLength();
            currentRunIndex++;
            if (!remainIntervalLength)
                break;
            if (currentRunIndex == currentChunk.textRuns.length) {
                currentChunkIndex++;
                indexForChunks.push(runIndex);
                currentChunk = this.chunks[currentChunkIndex];
                chunks.push(currentChunk);
                currentRunIndex = 0;
            }
            sectionIndex++;
            runIndex++;
        }
        indexForChunks.push(runIndex + 1);
        indexForSections.push(sectionIndex + 1);
        return new RunIterator(runs, chunks, sections, indexForChunks, indexForSections);
    }
    getRunsByInterval(interval) {
        var runs = [];
        var chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, interval.start);
        var chunk = this.chunks[chunkIndex];
        var runIndex = SearchUtils.normedInterpolationIndexOf(chunk.textRuns, (r) => chunk.startLogPosition.value + r.startOffset, interval.start);
        var run;
        var length = interval.length;
        var runOffset = interval.start - chunk.textRuns[runIndex].startOffset - chunk.startLogPosition.value;
        while (chunk && (run = chunk.textRuns[runIndex])) {
            runs.push(run);
            length -= (run.getLength() - runOffset);
            if (length <= 0)
                break;
            runIndex++;
            if (runIndex >= chunk.textRuns.length) {
                runIndex = 0;
                chunkIndex++;
                chunk = this.chunks[chunkIndex];
            }
            runOffset = 0;
        }
        return runs;
    }
    getRunByPosition(position) {
        var chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, position);
        var chunk = this.chunks[chunkIndex];
        var runIndex = SearchUtils.normedInterpolationIndexOf(chunk.textRuns, (r) => chunk.startLogPosition.value + r.startOffset, position);
        return chunk.textRuns[runIndex];
    }
    getRunAndIndexesByPosition(position) {
        const chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, position);
        const chunk = this.chunks[chunkIndex];
        const runOffset = position - chunk.startLogPosition.value;
        const runIndex = SearchUtils.normedInterpolationIndexOf(chunk.textRuns, (r) => r.startOffset, runOffset);
        const run = chunk.textRuns[runIndex];
        return new FullChunkAndRunInfo(chunkIndex, chunk, runIndex, run, runOffset - run.startOffset);
    }
    getSectionByPosition(position) {
        return this.documentModel.sections[SearchUtils.normedInterpolationIndexOf(this.documentModel.sections, (s) => s.startLogPosition.value, position)];
    }
    getParagraphByPosition(position) {
        return this.paragraphs[SearchUtils.normedInterpolationIndexOf(this.paragraphs, (p) => p.startLogPosition.value, position)];
    }
    getParagraphIndexByPosition(position) {
        return SearchUtils.normedInterpolationIndexOf(this.paragraphs, (p) => p.startLogPosition.value, position);
    }
    getParagraphsIndices(interval) {
        const endPosition = interval.end;
        const result = FixedInterval.fromPositions(SearchUtils.normedInterpolationIndexOf(this.paragraphs, paragraph => paragraph.startLogPosition.value, interval.start), SearchUtils.normedInterpolationIndexOf(this.paragraphs, paragraph => paragraph.startLogPosition.value, endPosition));
        if (endPosition > this.paragraphs[result.end].startLogPosition.value)
            result.length++;
        return result;
    }
    getParagraphsByInterval(interval) {
        var paragraphs = [], intervalEnd = interval.end, paragraphIndex = SearchUtils.normedInterpolationIndexOf(this.paragraphs, (p) => p.startLogPosition.value, interval.start);
        paragraphs.push(this.paragraphs[paragraphIndex++]);
        for (var paragraph; paragraph = this.paragraphs[paragraphIndex]; paragraphIndex++) {
            if (paragraph.startLogPosition.value < intervalEnd)
                paragraphs.push(paragraph);
            else
                break;
        }
        return paragraphs;
    }
    getParagraphIndicesByIntervals(intervals) {
        let result = [];
        for (var i = 0, interval; interval = intervals[i]; i++) {
            let paragraphIndex = SearchUtils.normedInterpolationIndexOf(this.paragraphs, (p) => p.startLogPosition.value, interval.start);
            let intervalEnd = interval.end;
            result.push(paragraphIndex++);
            for (let paragraph; paragraph = this.paragraphs[paragraphIndex]; paragraphIndex++) {
                if (paragraph.startLogPosition.value < intervalEnd)
                    result.push(paragraphIndex);
                else
                    break;
            }
        }
        return ListUtils.uniqueNumber(result);
    }
    getDocumentEndPosition() {
        return this.info.getEndPosition(this.documentModel);
    }
    getWholeWordInterval(position, checkRunProperties = false, includeBounds = false) {
        var interval = new FixedInterval(position, 0);
        if (!includeBounds && (position == this.getDocumentEndPosition() || position == 0))
            return interval;
        var chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, position);
        var runOffset = position - this.chunks[chunkIndex].startLogPosition.value;
        var runIndex = SearchUtils.normedInterpolationIndexOf(this.chunks[chunkIndex].textRuns, (r) => r.startOffset, runOffset);
        var end = this.getWordEnd(position, checkRunProperties, chunkIndex, runIndex);
        if (end == position && !includeBounds)
            return interval;
        var start = this.getWordStart(position, checkRunProperties, this.chunks[chunkIndex].textRuns[runIndex]);
        if (start == position && !includeBounds)
            return interval;
        interval.start = start;
        interval.length = end - start;
        return interval;
    }
    getWordStart(position, checkRunProperties, prevRun) {
        if (position <= 0)
            return position;
        var start = position;
        position--;
        var chunkIndex = SearchUtils.normedInterpolationIndexOf(this.chunks, (c) => c.startLogPosition.value, position);
        var chunk = this.chunks[chunkIndex];
        var runIndex = SearchUtils.normedInterpolationIndexOf(chunk.textRuns, (r) => r.startOffset, (position - chunk.startLogPosition.value));
        var run = chunk.textRuns[runIndex];
        while (chunk && run && run.getType() === RunType.TextRun && chunk.textBuffer[position - chunk.startLogPosition.value].match(RichUtils.isAlphanumeric) &&
            (!checkRunProperties || prevRun === run || prevRun.maskedCharacterProperties.equals(run.maskedCharacterProperties))) {
            start = position;
            position--;
            if (position - chunk.startLogPosition.value - run.startOffset < 0) {
                prevRun = run;
                runIndex--;
                if (runIndex >= 0)
                    run = chunk.textRuns[runIndex];
                else {
                    chunk = this.chunks[--chunkIndex];
                    if (!chunk)
                        break;
                    runIndex = chunk.textRuns.length - 1;
                    run = chunk.textRuns[runIndex];
                }
            }
        }
        return start;
    }
    getWordEnd(position, checkRunProperties, chunkIndex, runIndex) {
        if (position == this.getDocumentEndPosition())
            return position;
        var chunk = this.chunks[chunkIndex];
        var run = chunk.textRuns[runIndex];
        var end = position;
        var prevRun = run;
        while (chunk && run && run.getType() === RunType.TextRun && chunk.textBuffer[position - chunk.startLogPosition.value].match(RichUtils.isAlphanumeric) &&
            (!checkRunProperties || prevRun === run || prevRun.maskedCharacterProperties.equals(run.maskedCharacterProperties))) {
            position++;
            end = position;
            if (position === chunk.startLogPosition.value + run.startOffset + run.getLength()) {
                prevRun = run;
                run = chunk.textRuns[++runIndex];
                if (!run) {
                    chunk = this.chunks[++chunkIndex];
                    if (chunk) {
                        runIndex = 0;
                        run = chunk.textRuns[runIndex];
                    }
                    else
                        break;
                }
            }
        }
        return end;
    }
    resetMergedFormattingCache(type, interval = new FixedInterval(0, this.getDocumentEndPosition())) {
        const parInd = this.getParagraphsIndices(interval);
        if (type & ResetFormattingCacheType.Paragraph)
            ListUtils.forEach(this.paragraphs, (paragraph) => paragraph.resetParagraphMergedProperties(), parInd.start, parInd.end);
        const startInfo = this.getRunAndIndexesByPosition(interval.start);
        const endInfo = this.getRunAndIndexesByPosition(interval.end);
        if (type & ResetFormattingCacheType.Character) {
            let runIndex = startInfo.runIndex;
            ListUtils.forEach(this.chunks, (chunk) => {
                ListUtils.allOf(chunk.textRuns, (run) => {
                    run.resetCharacterMergedProperties();
                    return endInfo.run != run;
                }, runIndex);
                runIndex = 0;
            }, startInfo.chunkIndex, endInfo.chunkIndex + 1);
        }
        return FixedInterval.fromPositions(this.paragraphs[parInd.start].startLogPosition.value, this.paragraphs[Math.max(parInd.start, parInd.end - 1)].getEndPosition());
    }
    isEditable(intervals) {
        return !this.documentModel.isDocumentProtectionEnabled || ListUtils.allOf(intervals, (interval) => {
            if (interval.end == this.getDocumentEndPosition())
                interval = interval.makeByStartLength(interval.start, interval.length - 1);
            return ListUtils.unsafeAnyOf(this.availableRangePermissions, (rangePermission) => rangePermission.interval.containsInterval(interval));
        });
    }
    filterRangePermissions(protectionSettings) {
        this.availableRangePermissions = this.documentModel.isDocumentProtectionEnabled ?
            ListUtils.reducedMap(this.rangePermissions, (permission) => permission.isGranted(protectionSettings) ? permission : null) :
            ListUtils.shallowCopy(this.rangePermissions);
    }
    clone(model) {
        const result = new SubDocument(model, this.info.clone());
        result.paragraphs = ListUtils.map(this.paragraphs, p => p.clone(result));
        result.chunks = ListUtils.map(this.chunks, c => c.clone(result));
        result.fields = ListUtils.map(this.fields, f => f.clone(result));
        result.fields.forEach(f => f.initParent(result.fields));
        for (let t of this.tables)
            result.tables.push(t.clone(result));
        result.bookmarks = ListUtils.map(this.bookmarks, b => b.clone(result));
        result.availableRangePermissions = ListUtils.map(this.availableRangePermissions, rp => rp.clone(result.positionManager));
        result.rangePermissions = ListUtils.map(this.rangePermissions, rp => rp.clone(result.positionManager));
        result.isDeleted = this.isDeleted;
        return result;
    }
    isMain() { return this.info.isMain; }
    isHeaderFooter() { return this.info.isHeaderFooter; }
    isFooter() { return this.info.isFooter; }
    isHeader() { return this.info.isHeader; }
    isNote() { return this.info.isNote; }
    isFootNote() { return this.info.isFootNote; }
    isEndNote() { return this.info.isEndNote; }
    isTextBox() { return this.info.isTextBox; }
    isComment() { return this.info.isComment; }
    isReferenced() { return this.info.isReferenced; }
    getParagraphProperties(paragraph) {
        return paragraph.getParagraphMergedProperties();
    }
    findBookmarkByInterval(intervals, searchHidden = true) {
        const bkms = [];
        IntervalAlgorithms.handleAffectedObjects(this.bookmarks, IntervalAlgorithms.getMergedIntervals(intervals, true), (bkm, _index, interval, intersection) => {
            if ((searchHidden || !bkm.isHidden()) && (intersection.length || bkm.length == 0 || intersection.start == bkm.start ||
                (interval.length == 0 && interval.start < bkm.end)))
                bkms.push(bkm);
        }, BookmarksManipulator.findBookmarkStartIndex);
        return bkms;
    }
    getActualSubDocument() {
        var _a;
        if (!this.isDeleted)
            return this;
        return (_a = this.documentModel.subDocumentsCollection.collection[this.replacedWithSubDocId]) === null || _a === void 0 ? void 0 : _a.getActualSubDocument();
    }
}
SubDocument.AUTOGENERATE_ID = -1;
SubDocument.MAIN_SUBDOCUMENT_ID = 0;
export class SubDocumentPosition {
    constructor(subDocument, position) {
        this.subDocument = subDocument;
        this.position = position;
    }
    validateInterval() {
        const docEnd = this.subDocument.getDocumentEndPosition();
        this.position = Math.min(docEnd - 1, this.position);
    }
    clone() {
        return new SubDocumentPosition(this.subDocument, this.position);
    }
    equals(obj) {
        return obj &&
            this.subDocument.id == obj.subDocument.id &&
            this.position == obj.position;
    }
}
export class SubDocumentInterval {
    constructor(subDocument, interval) {
        this.subDocument = subDocument;
        this.interval = interval;
    }
    static fromPosition(subDocument, position) {
        return new SubDocumentInterval(subDocument, new FixedInterval(position, 0));
    }
    clone() {
        return new SubDocumentInterval(this.subDocument, this.interval.clone());
    }
    validateInterval() {
        const docEnd = this.subDocument.getDocumentEndPosition();
        if (this.interval.start == 0 && this.interval.end == docEnd)
            return;
        this.interval.start = Math.min(docEnd, this.interval.start);
        this.interval.end = Math.min(docEnd, this.interval.end);
    }
    equals(obj) {
        return obj &&
            this.subDocument.id == obj.subDocument.id &&
            this.interval.equals(obj.interval);
    }
}
export class SubDocumentIntervals {
    constructor(subDocument, intervals) {
        this.subDocument = subDocument;
        this.intervals = intervals;
    }
    get multiselection() { return this.intervals.length > 1; }
    validateInterval() {
        const docEnd = this.subDocument.getDocumentEndPosition();
        for (let curr of this.intervals) {
            if (curr.start == 0 && curr.end == docEnd)
                continue;
            const start = Math.min(docEnd - 1, curr.start);
            const end = Math.min(docEnd - 1, curr.end);
            curr.start = start;
            curr.end = end;
        }
    }
    clone() {
        return new SubDocumentIntervals(this.subDocument, ListUtils.deepCopy(this.intervals));
    }
    equals(obj) {
        return obj &&
            this.subDocument.id == obj.subDocument.id &&
            obj.intervals && ListUtils.equals(this.intervals, obj.intervals);
    }
    static fromPosition(subDocument, pos) {
        return new SubDocumentIntervals(subDocument, [new FixedInterval(pos, 0)]);
    }
}
