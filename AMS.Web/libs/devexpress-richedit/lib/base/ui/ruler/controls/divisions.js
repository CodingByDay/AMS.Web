import { RichEditUnit } from '../../../../base-utils/unit-converter';
import { Browser } from '@devexpress/utils/lib/browser';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { DocumentRenderer } from '../../../canvas/renderes/common/document-renderer';
import { RULER_CLASS_NAME, RULLER_NUMBER_CORRECTION } from '../settings';
import { RulerBase } from './base';
export const MINOR_TOP_AND_BOTTOM_MARGIN = 4;
export const MAJOR_TOP_AND_BOTTOM_MARGIN = 2;
export const DIVISION_CONTAINER_CLASS_NAME = RULER_CLASS_NAME + "Divisions";
export const DIVISION_CLASS_NAME = "Division";
export const DIVISION_MINOR_CLASS_NAME = RULER_CLASS_NAME + "Minor" + DIVISION_CLASS_NAME;
export const DIVISION_MAJOR_CLASS_NAME = RULER_CLASS_NAME + "Major" + DIVISION_CLASS_NAME;
export const DIVISION_NUMBER_CLASS_NAME = RULER_CLASS_NAME + "Number" + DIVISION_CLASS_NAME;
export class RulerDivisionsControl extends RulerBase {
    constructor(modelData, controls, divisionInfo, maxPageWidth) {
        super(modelData, controls);
        this.height = 0;
        const unitCount = Math.ceil(maxPageWidth / divisionInfo.unitSize);
        this.rootElement.style.width = divisionInfo.unitSize * (unitCount * 2 + 1) + "px";
        this.controls.ruler.rootElement.appendChild(this.rootElement);
        if (Browser.IE && Browser.MajorVersion <= 9)
            this.rootElement.offsetParent;
        this.height = this.rootElement.offsetHeight;
        createDivisionElements(this.rootElement, unitCount, divisionInfo, this.height);
        this.initialLeft = -(unitCount * divisionInfo.unitSize - RULLER_NUMBER_CORRECTION);
    }
    getRootClassName() { return DIVISION_CONTAINER_CLASS_NAME; }
    update() {
        this.updateModelState();
        this.updateView();
    }
    updateModelState() { }
    updateView() {
        const newViewState = this.getViewValue();
        if (newViewState != this.viewState) {
            this.viewState = newViewState;
            this.rootElement.style.left = this.viewState + this.initialLeft + "px";
        }
    }
    getViewValue() {
        const seps = this.controls.tables.currModelState.columnSeparators;
        if (!seps.hasItems)
            return this.controls.paragraphLeftPosition;
        const item = this.controls.tables.currModelState.columnSeparators.items[0];
        return this.controls.leftMargin.currModelState.modelValue + this.controls.columns.currModelState.activeColumn.leftPos +
            this.controls.tables.currModelState.columnSeparators.cellSpacing + item.leftMargin + item.position;
    }
}
function createDivisionElements(rootElement, unitCount, divisionInfo, height) {
    let divisionLeftPosition = 0;
    const createSimpleDivision = (className, topAndBottomMargin) => {
        const stepSize = divisionInfo.stepSize;
        const element = DocumentRenderer.renderContainer("");
        element.style.left = divisionLeftPosition + "px";
        element.style.width = stepSize + "px";
        element.style.height = height - topAndBottomMargin * 2 + "px";
        element.style.marginTop = topAndBottomMargin + "px";
        element.style.marginBottom = topAndBottomMargin + "px";
        element.className = className;
        divisionLeftPosition += stepSize;
        return element;
    };
    const createNumberDivision = (className, numb) => {
        const element = createSimpleDivision(className, null);
        if (numb != 0) {
            const numberElement = DocumentRenderer.renderContainer("");
            numberElement.innerHTML = numb.toString();
            element.appendChild(numberElement);
        }
        return element;
    };
    const createDivision = (numb) => {
        const fragment = document.createDocumentFragment();
        for (let type of divisionInfo.unitMap) {
            switch (type) {
                case DivisionType.Number:
                    fragment.appendChild(createNumberDivision(DIVISION_NUMBER_CLASS_NAME, numb));
                    break;
                case DivisionType.Major:
                    fragment.appendChild(createSimpleDivision(DIVISION_MAJOR_CLASS_NAME, MAJOR_TOP_AND_BOTTOM_MARGIN));
                    break;
                case DivisionType.Minor:
                    fragment.appendChild(createSimpleDivision(DIVISION_MINOR_CLASS_NAME, MINOR_TOP_AND_BOTTOM_MARGIN));
                    break;
            }
        }
        return fragment;
    };
    for (let i = unitCount; i > 0; i--)
        rootElement.appendChild(createDivision(i));
    for (let j = 0; j <= unitCount; j++)
        rootElement.appendChild(createDivision(j));
}
export var DivisionType;
(function (DivisionType) {
    DivisionType[DivisionType["Number"] = 0] = "Number";
    DivisionType[DivisionType["Minor"] = 1] = "Minor";
    DivisionType[DivisionType["Major"] = 2] = "Major";
})(DivisionType || (DivisionType = {}));
export class DivisionInfo {
    constructor(map, unitSize) {
        this.unitMap = map;
        this.unitSize = unitSize;
        this.stepSize = this.unitSize / this.unitMap.length;
    }
    static create(unitType) {
        return unitType == RichEditUnit.Inch ?
            new DivisionInfo([DivisionType.Number, DivisionType.Minor, DivisionType.Minor, DivisionType.Minor,
                DivisionType.Major, DivisionType.Minor, DivisionType.Minor, DivisionType.Minor], UnitConverter.inchesToPixels(1)) :
            new DivisionInfo([DivisionType.Number, DivisionType.Minor, DivisionType.Major, DivisionType.Minor], UnitConverter.centimeterToPixelF(1));
    }
}
