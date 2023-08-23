import { LoadCommandRequest, RequestParams, ServerCommandRequest } from '../core/model/json/command-request';
import { CommandType } from '../core/model/json/command-type';
import { JSONEnumLoadPieceTableCommandParameters } from '../core/model/json/enums/json-sub-document-enums';
import { JSONCommandParametersProperty, JSONResponceLevelProperty, JSONResponseError } from '../core/model/json/enums/json-top-level-enums';
import { Errors } from '@devexpress/utils/lib/errors';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { RichEditClientCommand } from './commands/client-command';
import { ServerDispatcherResponseProcessor } from './server-dispatcher-response-processor';
export class ServerDispatcher {
    constructor(control) {
        this.responseWaitingTime = 30000;
        this.pendingPeriod = 5000;
        this.maxCommandCount = 250;
        this.wasModifiedOnServer = false;
        this.requestID = 0;
        this.editRequestID = 0;
        this.waitingTimerID = null;
        this.pendingTimerID = null;
        this.numActiveSaveRequests = 0;
        this.isWaiting = false;
        this.lockQueue = false;
        this.queue = {};
        this.sendedRequests = {};
        this.numQueueLockers = 0;
        this.control = control;
    }
    dispose() {
        this.reset();
    }
    initialize(testMode) {
        this.testMode = testMode;
    }
    saveInProgress() {
        return this.numActiveSaveRequests > 0;
    }
    pushRequest(request, requestParams) {
        request.id = ++this.requestID;
        request.processOnCallback = requestParams.processOnCallback;
        this.lastRequestInQueue = request;
        if (this.lockQueue)
            return;
        if (this.testMode)
            this.queue = {};
        this.lockQueue = requestParams.lockQueue;
        if (ServerCommandRequest.isEditRequest(request)) {
            request.editIncId = ++this.editRequestID;
            this.removeModelRequests();
        }
        if (request.isSaveDocumentRequest())
            this.numActiveSaveRequests++;
        this.queue[request.id] = request;
        if (this.testMode)
            this.sendRequestCore();
        else if (requestParams.immediateSend && !this.isWaiting)
            this.forceSendingRequest();
        else if (!this.isWaiting && this.pendingTimerID == null)
            this.pendingTimerID = setTimeout(() => this.onPendingTimerExpired(), this.pendingPeriod);
    }
    pushLoadNextChunksRequest(subDocument, startPosition) {
        if (!NumberMapUtils.containsBy(this.queue, req => req.isLoadNextChunksRequest()))
            this.pushRequest(new LoadCommandRequest(CommandType.LoadPieceTable, subDocument.id, { [JSONEnumLoadPieceTableCommandParameters.StartPosition]: startPosition }), new RequestParams(false, true, false));
    }
    processSaveResponse(historyId) {
        this.numActiveSaveRequests--;
        if (this.numActiveSaveRequests < 0)
            throw new Error(Errors.InternalException);
        this.control.lastSavedHistoryItemId = historyId;
        this.wasModifiedOnServer = false;
        this.control.barHolder.updateItemsState();
    }
    getRequestJSON() {
        this.lastRequestInQueue = undefined;
        const request = this.getRequestList(true);
        if (request.length && !this.lockQueue)
            return JSON.stringify(request);
        return "";
    }
    reset() {
        this.clearTimers();
        this.numActiveSaveRequests = 0;
        this.isWaiting = false;
        this.lockQueue = false;
        this.queue = {};
        this.control.lastSavedHistoryItemId = -1;
    }
    forceSendingRequest() {
        this.clearTimers();
        this.sendRequestCore();
    }
    hasQueue() {
        return !!this.queue[this.requestID];
    }
    isQueueLocked() {
        return this.lockQueue;
    }
    onGetResponse(responce, testMode = false) {
        let coreResponce;
        try {
            if (testMode)
                coreResponce = eval(responce);
            else
                coreResponce = JSON.parse(responce);
        }
        catch (e) {
            if (testMode)
                throw new Error("InvalidResponce=" + responce.toString());
            return false;
        }
        this.onGetResponseCore(coreResponce);
        return true;
    }
    onGetResponseCore(responce) {
        this.clearWaitingTimer();
        this.isWaiting = false;
        const queueLocked = this.lockQueue;
        if (queueLocked) {
            this.numQueueLockers++;
            this.control.globalEventDispatcher.beginUpdate();
        }
        this.processCommandsResponce(responce[JSONResponceLevelProperty.CommandsResults]);
        this.control.loadingPanelManager.loadingPanel.setVisible(false);
        const errorCode = responce[JSONResponceLevelProperty.ErrorCode];
        if (errorCode == JSONResponseError.NoErrors) {
            if (!this.isWaiting) {
                if (!queueLocked)
                    this.sendRequestCore();
                if (!this.hasQueue())
                    this.lockQueue = false;
            }
            if (queueLocked) {
                if (!this.lockQueue) {
                    if (!this.control.modelManager.model.isLoaded())
                        this.pushLoadNextChunksRequest(this.control.modelManager.model.mainSubDocument, this.control.modelManager.model.getCurrentLength());
                    else {
                        while (this.numQueueLockers > 0) {
                            this.numQueueLockers--;
                            this.control.globalEventDispatcher.endUpdate();
                        }
                    }
                }
            }
            else {
                if (!this.lockQueue) {
                    if (!this.control.modelManager.model.isLoaded())
                        this.pushLoadNextChunksRequest(this.control.modelManager.model.mainSubDocument, this.control.modelManager.model.getCurrentLength());
                }
            }
        }
        else {
            this.reset();
            while (this.numQueueLockers > 0) {
                this.numQueueLockers--;
                this.control.globalEventDispatcher.endUpdate();
            }
            switch (errorCode) {
                case JSONResponseError.SessionHasExpired:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorSessionHasExpiredMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.ModelIsChanged:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorModelIsChangedMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.AuthException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorAuthExceptionMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.InnerException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorInnerExceptionMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.CantSaveToAlreadyOpenedFile:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorOpeningAndOverstoreImpossibleMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.CantSaveToEmptyPath:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorCantSaveToEmptyPathMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.CantSaveDocument:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorSavingMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.CantOpenDocument:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorOpeningMessageCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.PathTooLongException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorPathTooLongCommand).execute(this.control.commandManager.isPublicApiCall);
                    break;
                case JSONResponseError.CalculateDocumentVariableException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorDocVariableErrorCommand).execute(this.control.commandManager.isPublicApiCall);
                    if (this.control.selection.activeSubDocument.fieldsWaitingForUpdate)
                        this.control.selection.activeSubDocument.fieldsWaitingForUpdate.endAction();
                    break;
                case JSONResponseError.InsertContentFromServerException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowInsertContentFromServerErrorDialogCommand).execute(this.control.commandManager.isPublicApiCall);
                    this.control.commandManager.insertContentFromServerRequestManager.reset();
                    break;
                case JSONResponseError.LoadPictureException:
                    this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorLoadPictureMessage).execute(this.control.commandManager.isPublicApiCall);
                    console.error('Could not load the image. See also: https://stackoverflow.com/questions/28286086/default-securityprotocol-in-net-4-5');
                    break;
                default:
                    throw new Error("Undefined server error");
            }
        }
    }
    clearTimers() {
        this.clearWaitingTimer();
        if (this.pendingTimerID) {
            clearTimeout(this.pendingTimerID);
            this.pendingTimerID = null;
        }
    }
    clearWaitingTimer() {
        if (this.waitingTimerID) {
            clearTimeout(this.waitingTimerID);
            this.waitingTimerID = null;
        }
    }
    sendRequestCore() {
        if (!this.hasQueue())
            return false;
        this.isWaiting = true;
        this.lastRequestInQueue = undefined;
        const sendRequestsViaCallback = this.shouldSendRequestsWithCallback();
        const request = this.getRequestList(sendRequestsViaCallback);
        this.showLoadingPanelIfNeeded(request);
        this.control.sendRequest(JSON.stringify(request), sendRequestsViaCallback);
        if (!this.lockQueue)
            this.waitingTimerID = setTimeout(() => this.onWaitingTimerExpired(), this.responseWaitingTime);
        return true;
    }
    showLoadingPanelIfNeeded(requestList) {
        for (const request of requestList) {
            const commandType = request[JSONCommandParametersProperty.CommandType];
            if (ServerCommandRequest.isUIBlockingCommandType(commandType)) {
                this.control.loadingPanelManager.loadingPanel.setVisible(true);
                return;
            }
        }
    }
    shouldSendRequestsWithCallback() {
        return NumberMapUtils.containsBy(this.queue, (val) => val.processOnCallback);
    }
    getRequestList(withPostData) {
        return NumberMapUtils.toListBy(this.queue, (val) => val.getJsonObject(withPostData), this.maxCommandCount);
    }
    removeModelRequests() {
        var keysForDeleting = [];
        NumberMapUtils.forEach(this.queue, (request, key) => {
            if (!ServerCommandRequest.isEditRequest(request) &&
                !request.isSpellCheckerRequest() &&
                !request.isSaveDocumentRequest() &&
                !request.isGetSetRtfRequest() &&
                !request.isForcePushRequest() &&
                !request.isPdfExportRequest())
                keysForDeleting.push(key);
        });
        for (var i = keysForDeleting.length - 1; i >= 0; i--)
            delete this.queue[keysForDeleting[i]];
    }
    processCommandsResponce(commandResults) {
        if (!commandResults)
            return;
        const needHandleRequests = [];
        for (let jsonCommandResponce of commandResults) {
            const commandId = jsonCommandResponce[JSONCommandParametersProperty.IncId];
            if (commandId > 0 && !Object.prototype.hasOwnProperty.call(this.queue, commandId.toString()))
                continue;
            delete this.queue[commandId];
            needHandleRequests.push(jsonCommandResponce);
        }
        this.control.globalEventDispatcher.beginUpdate();
        for (let jsonCommandResponce of needHandleRequests) {
            const commandType = jsonCommandResponce[JSONCommandParametersProperty.CommandType];
            if (ServerCommandRequest.isUIBlockingCommandType(commandType))
                this.control.loadingPanelManager.loadingPanel.setVisible(true);
            const isNewWorkSession = !!jsonCommandResponce[JSONCommandParametersProperty.IsNewWorkSession];
            const jsonServerParams = jsonCommandResponce[JSONCommandParametersProperty.ServerParams];
            const jsonCacheData = jsonCommandResponce[JSONCommandParametersProperty.Caches];
            ServerDispatcherResponseProcessor.processCommandResponce(this, commandType, isNewWorkSession, jsonServerParams, jsonCacheData);
        }
        this.control.globalEventDispatcher.endUpdate();
    }
    onPendingTimerExpired() {
        this.sendRequestCore();
        this.pendingTimerID = null;
    }
    onWaitingTimerExpired() {
        this.sendRequestCore();
        this.waitingTimerID = null;
    }
}
