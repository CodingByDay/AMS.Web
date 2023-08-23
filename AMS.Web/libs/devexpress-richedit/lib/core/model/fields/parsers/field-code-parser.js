import { Errors } from '@devexpress/utils/lib/errors';
import { DateTimeFieldFormatter } from '@devexpress/utils/lib/formatters/date-time-field';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { InputPositionBase } from '../../../selection/input-position-base';
import { SelectionIntervalsInfo } from '../../../selection/selection-intervals-info';
import { InsertLayoutDependentTextManipulatorParams, InsertTextManipulatorParams } from '../../manipulators/text-manipulator/insert-text-manipulator-params';
import { NumberConverterCreator } from '../../number-converters/number-converter-creator';
import { RichUtils } from '../../rich-utils';
import { RunType } from '../../runs/run-type';
import { SubDocumentInterval, SubDocumentPosition } from '../../sub-document';
import { Field } from '../field';
import { FieldsWaitingForUpdate } from '../tree-creator';
export var FieldCodeParserState;
(function (FieldCodeParserState) {
    FieldCodeParserState[FieldCodeParserState["start"] = 0] = "start";
    FieldCodeParserState[FieldCodeParserState["addedParsersCodePart"] = 1] = "addedParsersCodePart";
    FieldCodeParserState[FieldCodeParserState["updatedParsersCodePart"] = 2] = "updatedParsersCodePart";
    FieldCodeParserState[FieldCodeParserState["resultPartCreated"] = 3] = "resultPartCreated";
    FieldCodeParserState[FieldCodeParserState["addedParsersResultPart"] = 4] = "addedParsersResultPart";
    FieldCodeParserState[FieldCodeParserState["end"] = 5] = "end";
})(FieldCodeParserState || (FieldCodeParserState = {}));
export var FieldSwitchType;
(function (FieldSwitchType) {
    FieldSwitchType[FieldSwitchType["Error"] = 0] = "Error";
    FieldSwitchType[FieldSwitchType["DateAndTime"] = 1] = "DateAndTime";
    FieldSwitchType[FieldSwitchType["Numeric"] = 2] = "Numeric";
    FieldSwitchType[FieldSwitchType["General"] = 3] = "General";
    FieldSwitchType[FieldSwitchType["FieldSpecific"] = 4] = "FieldSpecific";
})(FieldSwitchType || (FieldSwitchType = {}));
export var FieldMailMergeType;
(function (FieldMailMergeType) {
    FieldMailMergeType[FieldMailMergeType["NonMailMerge"] = 1] = "NonMailMerge";
    FieldMailMergeType[FieldMailMergeType["MailMerge"] = 2] = "MailMerge";
    FieldMailMergeType[FieldMailMergeType["Mixed"] = 3] = "Mixed";
})(FieldMailMergeType || (FieldMailMergeType = {}));
export class FieldSwitch {
    constructor(type, name, arg) {
        this.name = name;
        this.type = type;
        this.arg = arg;
    }
}
export class FieldParameter {
    constructor(interval, textRepresentation) {
        this.text = textRepresentation;
        this.interval = interval;
    }
    clone() {
        return new FieldParameter(this.interval.clone(), this.text);
    }
}
export class FieldCodeParserHelper {
    static isWhitespaceAndTextRunType(char, type) {
        return RichUtils.isWhitespace.test(char) && type == RunType.TextRun;
    }
    static isBackslesh(char) {
        return char == "\\";
    }
    static isQuote(char) {
        return char == "\"";
    }
}
export class FieldCodeParser {
    constructor(args) {
        this.switchInfoList = [];
        this.parameterInfoList = [];
        this.modelManager = args.modelManager;
        this.layoutFormatterManager = args.layoutFormatterManager;
        this.requestManager = args.requestManager;
        this.subDocument = args.subDocument;
        this.inputPos = new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromPosition(args.subDocument, args.field.getResultInterval().start));
        this.fieldsStack = [args.field];
        this.modelIterator = args.modelIterator;
        this.lowLevelParsers = [];
        this.parserState = FieldCodeParserState.start;
        this.fieldNameFirstLetterPosition = args.subDocument.positionManager.registerPosition(args.fieldNameFirstLetterPosition);
    }
    removeInterval(interval) {
        this.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(this.subDocument, interval), true, false);
    }
    replaceTextByInterval(interval, text) {
        this.removeInterval(interval);
        this.modelManager.modelManipulator.text.insertTextViaHistory(new InsertTextManipulatorParams(new SubDocumentPosition(this.subDocument, interval.start), this.inputPos.charPropsBundle, RunType.TextRun, text));
    }
    replaceTextByLayoutDependentRun(interval) {
        this.removeInterval(interval);
        this.modelManager.modelManipulator.text.insertTextViaHistory(new InsertLayoutDependentTextManipulatorParams(new SubDocumentPosition(this.subDocument, interval.start), this.inputPos.charPropsBundle));
    }
    static finalAction(layoutFormatterManager, field, subDocument) {
        field.showCode = false;
        if (layoutFormatterManager)
            layoutFormatterManager.invalidator.onIntervalChanged(subDocument.id, field.getAllFieldInterval());
    }
    destructor() {
        this.subDocument.positionManager.unregisterPosition(this.fieldNameFirstLetterPosition);
        this.fieldNameFirstLetterPosition = null;
        FieldCodeParser.finalAction(this.layoutFormatterManager, this.getTopField(), this.subDocument);
    }
    getMailMergeType() {
        throw new Error(Errors.NotImplemented);
    }
    handleSwitch(newSwitch) {
        this.switchInfoList.push(newSwitch);
        return true;
    }
    handleParameter(newParameter) {
        this.parameterInfoList.push(newParameter);
        return true;
    }
    getFormattedResult(value) {
        if (!isDefined(value))
            return null;
        const manager = this.modelManager;
        let type = FieldSwitchType.Error;
        let arg = "";
        for (let i = 0, switchInfo; switchInfo = this.switchInfoList[i]; i++) {
            if (switchInfo.type != FieldSwitchType.FieldSpecific) {
                arg = switchInfo.arg;
                type = switchInfo.type;
                break;
            }
        }
        const numericalValue = typeof value == 'string' ? parseInt(value) : value;
        if (type == FieldSwitchType.General && !StringUtils.isNullOrEmpty(arg)) {
            if (!isNaN(numericalValue))
                return NumberConverterCreator.createConverterByTypeName(arg, manager.model.simpleFormattersManager).convertNumber(numericalValue);
            if (typeof value == 'string')
                switch (arg.toLowerCase()) {
                    case "upper":
                        return value.toLocaleUpperCase();
                    case 'lower':
                        return value.toLocaleLowerCase();
                    case 'firstcap':
                        return this.capitalizesFirstLetterOfFirstWord(value);
                    case 'caps':
                        return this.capitalizesFirstLetterOfEachWord(value);
                    default:
                        return value;
                }
        }
        else if (type == FieldSwitchType.DateAndTime) {
            const date = isNaN(numericalValue) ? new Date(value.toString()) : new Date(numericalValue);
            if (!isNaN(date.getDate())) {
                const dateFormatter = new DateTimeFieldFormatter(manager.richOptions.cultureOpts);
                return !StringUtils.isNullOrEmpty(arg) ? dateFormatter.format(date, arg) :
                    dateFormatter.format(date, manager.richOptions.fields.defaultDateFormat);
            }
        }
        else if (type == FieldSwitchType.Numeric && !isNaN(numericalValue) && !StringUtils.isNullOrEmpty(arg))
            return manager.model.simpleFormattersManager.formatNumber(arg, numericalValue);
        return value.toString();
    }
    capitalizesFirstLetterOfFirstWord(value) {
        let result = value;
        if (result.length > 0)
            result = this.replaceCharacter(result, 0, result[0].toLocaleUpperCase());
        return result;
    }
    capitalizesFirstLetterOfEachWord(value) {
        let result = value.toLocaleLowerCase();
        let index = this.skipCharacters(0, result, (str) => !this.isLetterOrDigit(str));
        while (index < result.length) {
            result = this.replaceCharacter(result, index, result[index].toLocaleUpperCase());
            index = this.skipCharacters(index, result, (str) => this.isLetterOrDigit(str));
            index = this.skipCharacters(index, result, (str) => !this.isLetterOrDigit(str));
        }
        return result;
    }
    replaceCharacter(source, index, chForReplace) {
        return source.substr(0, index) + chForReplace + source.substr(index + 1);
    }
    skipCharacters(index, str, predicate) {
        while (index < str.length && predicate(str[index]))
            index++;
        return index;
    }
    isLetterOrDigit(str) {
        if (str.length != 1)
            return false;
        if (str.match(/[0-9]/i))
            return true;
        if (str.toLocaleLowerCase() != str.toLocaleUpperCase())
            return true;
        return false;
    }
    setInputPositionState() {
        this.inputPos.setIntervals(SelectionIntervalsInfo.fromPosition(this.subDocument, this.fieldNameFirstLetterPosition.value));
    }
    getTopField() {
        return this.fieldsStack[0];
    }
    update(responce) {
        if (this.parserState == FieldCodeParserState.end)
            throw new Error("Excess call updated field");
        switch (this.parserState) {
            case FieldCodeParserState.start:
                var field = this.getTopField();
                if (this.collectAndUpdateLowLevelFields(field.index + 1, field.getCodeStartPosition(), field.getSeparatorPosition())) {
                    this.parserState = FieldCodeParserState.updatedParsersCodePart;
                    return this.parseCodeCurrentField(null);
                }
                this.parserState = FieldCodeParserState.addedParsersCodePart;
                return false;
            case FieldCodeParserState.addedParsersCodePart:
                if (this.updateLowLevelFields(responce)) {
                    this.parserState = FieldCodeParserState.updatedParsersCodePart;
                    return this.parseCodeCurrentField(responce);
                }
                return false;
            case FieldCodeParserState.updatedParsersCodePart:
                return this.parseCodeCurrentField(responce);
            case FieldCodeParserState.addedParsersResultPart:
                return this.updateFieldsInResult(responce);
        }
    }
    collectAndUpdateLowLevelFields(fieldIndex, startPosition, endPosition) {
        var fields = this.subDocument.fields;
        for (var field; field = fields[fieldIndex]; fieldIndex++) {
            if (field.getFieldStartPosition() > endPosition)
                break;
            if (field.parent != this.getTopField() || field.getFieldEndPosition() <= startPosition) {
                fieldIndex++;
                continue;
            }
            var fieldParser = FieldsWaitingForUpdate.getParser(this.modelManager, this.layoutFormatterManager, this.requestManager, this.subDocument, field);
            if (fieldParser) {
                if (!fieldParser.update(null))
                    this.lowLevelParsers.push(fieldParser);
                else
                    fieldParser.destructor();
            }
            else
                this.removeInterval(field.getResultInterval());
        }
        return this.lowLevelParsers.length == 0;
    }
    updateLowLevelFields(responce) {
        for (var parserIndex = 0, parser; parser = this.lowLevelParsers[parserIndex]; parserIndex++) {
            if (parser.update(responce)) {
                parser.destructor();
                this.lowLevelParsers.splice(parserIndex, 1);
                parserIndex--;
            }
        }
        return this.lowLevelParsers.length == 0;
    }
    parseCodeCurrentField(responce) {
        if (this.parseCodeCurrentFieldInternal(responce)) {
            switch (this.parserState) {
                case FieldCodeParserState.resultPartCreated:
                    return this.updateFieldsInResult(responce);
                case FieldCodeParserState.end:
                    return true;
                default:
                    throw new Error("wrong way");
            }
        }
        else {
            if (this.parserState == FieldCodeParserState.updatedParsersCodePart)
                return false;
            else
                throw new Error("wrong way");
        }
    }
    updateFieldsInResult(responce) {
        switch (this.parserState) {
            case FieldCodeParserState.resultPartCreated:
                var fieldIndex = Field.normedBinaryIndexOf(this.subDocument.fields, this.getTopField().getResultStartPosition() + 1);
                var field = this.getTopField();
                if (this.collectAndUpdateLowLevelFields(fieldIndex, field.getResultStartPosition(), field.getResultEndPosition())) {
                    this.parserState = FieldCodeParserState.end;
                    return true;
                }
                this.parserState = FieldCodeParserState.addedParsersResultPart;
                return false;
            case FieldCodeParserState.addedParsersResultPart:
                if (this.updateLowLevelFields(responce)) {
                    this.parserState = FieldCodeParserState.end;
                    return true;
                }
                return false;
        }
    }
    moveIteratorToNextChar() {
        if (this.modelIterator.run.getType() == RunType.FieldCodeEndRun)
            return false;
        if (!this.modelIterator.moveToNextChar())
            throw new Error("wrong way");
        while (true) {
            switch (this.modelIterator.run.getType()) {
                case RunType.FieldCodeStartRun:
                    var fieldIndex = Field.normedBinaryIndexOf(this.subDocument.fields, this.modelIterator.getAbsolutePosition() + 1);
                    var lowLevelField = this.subDocument.fields[fieldIndex];
                    this.fieldsStack.push(lowLevelField);
                    this.modelIterator.setPosition(lowLevelField.getResultStartPosition());
                    break;
                case RunType.FieldResultEndRun:
                case RunType.FieldCodeEndRun:
                    var lowLevelField = this.fieldsStack.pop();
                    if (this.fieldsStack.length == 0) {
                        this.fieldsStack.push(lowLevelField);
                        return false;
                    }
                    this.modelIterator.setPosition(lowLevelField.getFieldEndPosition());
                    break;
                default:
                    return true;
            }
        }
    }
    updateInfo() {
        if (!this.needUpdateInfo())
            return false;
        this.parseSwitchesAndArgs(true);
        this.updateInfoCore();
        return true;
    }
    needUpdateInfo() {
        return false;
    }
    updateInfoCore() { }
    parseSwitchesAndArgs(needAtLestOneSpaceAfterFieldName) {
        if (needAtLestOneSpaceAfterFieldName) {
            var prevPos = this.modelIterator.getAbsolutePosition();
            if (this.skipWhitespaces())
                this.modelIterator.setPosition(prevPos);
            else
                return this.modelIterator.run.getType() == RunType.FieldCodeEndRun;
        }
        while (this.skipWhitespaces() && this.modelIterator.run.getType() != RunType.FieldCodeEndRun) {
            var currChar = this.modelIterator.getCurrentChar();
            if (FieldCodeParserHelper.isBackslesh(currChar)) {
                var switchInfo = this.getSwitchInfo();
                if (switchInfo.type == FieldSwitchType.Error || !this.handleSwitch(switchInfo))
                    return false;
            }
            else {
                var paramInfo = this.getFieldParameterInfo();
                if (!paramInfo || !this.handleParameter(paramInfo))
                    return false;
            }
        }
        return this.modelIterator.run.getType() == RunType.FieldCodeEndRun;
    }
    skipWhitespaces() {
        var isFindWhitespace = false;
        do {
            if (FieldCodeParserHelper.isWhitespaceAndTextRunType(this.modelIterator.getCurrentChar(), this.modelIterator.run.getType()) ||
                this.modelIterator.run.getType() == RunType.ParagraphRun ||
                this.modelIterator.run.getType() == RunType.SectionRun)
                isFindWhitespace = true;
            else
                break;
        } while (this.moveIteratorToNextChar());
        return isFindWhitespace;
    }
    getFieldParameterInfo() {
        var startPosition = this.modelIterator.getAbsolutePosition();
        var parseResult = this.parseSwitchOrFieldArgument();
        if (!parseResult)
            return null;
        var argInterval = parseResult.quoted ?
            FixedInterval.fromPositions(startPosition + 1, this.modelIterator.getAbsolutePosition() - 1) :
            FixedInterval.fromPositions(startPosition, this.modelIterator.getAbsolutePosition());
        return new FieldParameter(argInterval, parseResult.argListChars.join(""));
    }
    getSwitchInfo() {
        if (!this.moveIteratorToNextChar() || this.modelIterator.run.getType() != RunType.TextRun)
            return new FieldSwitch(FieldSwitchType.Error, "", "");
        var currChar = this.modelIterator.getCurrentChar();
        switch (currChar) {
            case "*": return this.makeSwitchInfo(FieldSwitchType.General, currChar, true);
            case "@": return this.makeSwitchInfo(FieldSwitchType.DateAndTime, currChar, true);
            case "#": return this.makeSwitchInfo(FieldSwitchType.Numeric, currChar, true);
            default:
                if (currChar == "!")
                    return this.makeSwitchInfo(FieldSwitchType.FieldSpecific, currChar, true);
                if (!RichUtils.isLatinLetter.test(currChar))
                    return new FieldSwitch(FieldSwitchType.Error, "", "");
                var switchName = currChar;
                var lastPos = this.modelIterator.getAbsolutePosition();
                if (this.moveIteratorToNextChar()) {
                    currChar = this.modelIterator.getCurrentChar();
                    if (RichUtils.isLatinLetter.test(currChar))
                        switchName += currChar;
                    else
                        this.modelIterator.setPosition(lastPos);
                }
                else
                    this.modelIterator.setPosition(lastPos);
                return this.makeSwitchInfo(FieldSwitchType.FieldSpecific, switchName, false);
        }
    }
    makeSwitchInfo(switchType, switchName, needArgument) {
        var switchArg = this.getSwitchArgument(needArgument);
        if (switchArg === null || needArgument && switchArg.length == 0)
            return new FieldSwitch(FieldSwitchType.Error, "", "");
        return new FieldSwitch(switchType, switchName, switchArg);
    }
    getSwitchArgument(needArgument) {
        if (!this.moveIteratorToNextChar())
            return needArgument ? null : "";
        if (!this.skipWhitespaces())
            return null;
        var parseResult = this.parseSwitchOrFieldArgument();
        if (!parseResult)
            return needArgument ? null : "";
        var resArg = parseResult.argListChars.join("");
        if (resArg.length == 0)
            return null;
        return resArg;
    }
    parseSwitchOrFieldArgument() {
        if (this.modelIterator.run.getType() == RunType.FieldCodeEndRun)
            return null;
        var currChar = this.modelIterator.getCurrentChar();
        if (FieldCodeParserHelper.isBackslesh(currChar)) {
            this.modelIterator.moveToPrevChar();
            return null;
        }
        var resList = [];
        var startFieldStackSize = this.fieldsStack.length;
        var lastFieldStackLength = startFieldStackSize;
        var needSearchNextQuote = FieldCodeParserHelper.isQuote(currChar);
        if (needSearchNextQuote)
            if (!this.moveIteratorToNextChar())
                return null;
        var lastSymbolIsQuote = !needSearchNextQuote;
        do {
            currChar = this.modelIterator.getCurrentChar();
            if (needSearchNextQuote) {
                if (FieldCodeParserHelper.isQuote(currChar)) {
                    var prevChar = resList[resList.length - 1];
                    if (!(prevChar && FieldCodeParserHelper.isBackslesh(prevChar))) {
                        lastSymbolIsQuote = true;
                        lastFieldStackLength = this.fieldsStack.length;
                        this.moveIteratorToNextChar();
                        break;
                    }
                }
            }
            else if (FieldCodeParserHelper.isWhitespaceAndTextRunType(currChar, this.modelIterator.run.getType()))
                break;
            resList.push(currChar);
            lastFieldStackLength = this.fieldsStack.length;
        } while (this.moveIteratorToNextChar());
        if (startFieldStackSize != lastFieldStackLength || !lastSymbolIsQuote)
            return null;
        return { argListChars: resList, quoted: needSearchNextQuote };
    }
}
