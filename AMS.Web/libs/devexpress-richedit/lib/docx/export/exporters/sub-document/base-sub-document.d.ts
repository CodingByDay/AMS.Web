import { Field } from '../../../../core/model/fields/field';
import { RunBase } from '../../../../core/model/runs/run-base';
import { Section } from '../../../../core/model/section/section';
import { SubDocument } from '../../../../core/model/sub-document';
import { Stack } from '@devexpress/utils/lib/class/stack';
import { ConstInterval } from '@devexpress/utils/lib/intervals/const';
import { Data } from '../../data';
import { ExporterBaseWithRootElement } from '../base';
import { RelationCollectionExporter } from '../relations/relation-collection';
export declare type RunHandler = (runText: string) => void;
export declare abstract class BaseSubDocumentExporter extends ExporterBaseWithRootElement {
    get filePath(): string;
    get rootNSPrefix(): string;
    get rootNSValue(): string;
    fieldCodeDepth: number;
    hyperlinkRelationsTable: Record<string, string>;
    subDocument: SubDocument;
    protected fieldsStack: Stack<Field>;
    protected runHandlerMap: Record<number, RunHandler>;
    private _filePath;
    private ignorableNamespaces;
    private modelIterator;
    private bookmarksIterator;
    private rangePermisiionsIterator;
    private run;
    private runText;
    private runStartCharOffset;
    private absRunStartPosition;
    private tableExporter;
    private paragraph;
    private firstIteration;
    private readonly predefinedGroupNames;
    constructor(data: Data, subDocument: SubDocument, filePath: string);
    protected fillWriter(): void;
    protected abstract createRelationExporter(): RelationCollectionExporter;
    protected abstract fillWriterCore(): any;
    protected init(): void;
    protected endParagraph(pos: number, section: Section, allowInitNextParagraph: boolean): void;
    getCurrentParagraphRun(): RunBase | null;
    protected exportSection(section: Section, sectionInterval: ConstInterval): void;
    private registerNamespaces;
    private registerDefaultNamespaces;
    private registerNamespace;
    private registerIgnorableNamespaces;
    private exportRun;
    private textRunHandler;
    private paragraphRunHandler;
    private sectionRunHandler;
    private fieldCodeStartRunHandler;
    private fieldCodeEndRunHandler;
    private fieldResultEndRunHandler;
    private shouldExportPicture;
    private anchoredPictureRunHandler;
    private anchoredTextRunHandler;
    private inlinePictureRunHandler;
    private layoutDependentRunHandler;
    private exportBookmark;
    private exportRangePermission;
    private getGroupName;
    private exportFieldChar;
    private writeHideByParent;
}
//# sourceMappingURL=base-sub-document.d.ts.map