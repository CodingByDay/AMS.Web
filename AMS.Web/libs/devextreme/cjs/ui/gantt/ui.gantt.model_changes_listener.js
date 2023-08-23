/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.model_changes_listener.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.ModelChangesListener = void 0;
var GANTT_TASKS = "tasks";
var GANTT_DEPENDENCIES = "dependencies";
var GANTT_RESOURCES = "resources";
var GANTT_RESOURCE_ASSIGNMENTS = "resourceAssignments";
var ModelChangesListener = {
    create: function(gantt) {
        return {
            NotifyTaskCreated: function(task, callback, errorCallback) {
                gantt._onRecordInserted(GANTT_TASKS, task, callback)
            },
            NotifyTaskRemoved: function(taskId, errorCallback, task) {
                gantt._onRecordRemoved(GANTT_TASKS, taskId, task)
            },
            NotifyTaskUpdated: function(taskId, newValues, errorCallback) {
                gantt._onRecordUpdated(GANTT_TASKS, taskId, newValues)
            },
            NotifyParentTaskUpdated: function(task, errorCallback) {
                gantt._onParentTaskUpdated(task)
            },
            NotifyDependencyInserted: function(dependency, callback, errorCallback) {
                gantt._onRecordInserted(GANTT_DEPENDENCIES, dependency, callback)
            },
            NotifyDependencyRemoved: function(dependencyId, errorCallback, dependency) {
                gantt._onRecordRemoved(GANTT_DEPENDENCIES, dependencyId, dependency)
            },
            NotifyResourceCreated: function(resource, callback, errorCallback) {
                gantt._onRecordInserted(GANTT_RESOURCES, resource, callback)
            },
            NotifyResourceRemoved: function(resourceId, errorCallback, resource) {
                gantt._onRecordRemoved(GANTT_RESOURCES, resourceId, resource)
            },
            NotifyResourceAssigned: function(assignment, callback, errorCallback) {
                gantt._onRecordInserted(GANTT_RESOURCE_ASSIGNMENTS, assignment, callback)
            },
            NotifyResourceUnassigned: function(assignmentId, errorCallback, assignment) {
                gantt._onRecordRemoved(GANTT_RESOURCE_ASSIGNMENTS, assignmentId, assignment)
            },
            NotifyParentDataRecalculated: function(data) {
                gantt._onParentTasksRecalculated(data)
            },
            NotifyTaskCreating: function(args) {
                gantt._actionsManager.raiseInsertingAction(GANTT_TASKS, args)
            },
            NotifyTaskRemoving: function(args) {
                gantt._actionsManager.raiseDeletingAction(GANTT_TASKS, args)
            },
            NotifyTaskUpdating: function(args) {
                gantt._actionsManager.raiseUpdatingAction(GANTT_TASKS, args)
            },
            NotifyTaskMoving: function(args) {
                gantt._actionsManager.raiseUpdatingAction(GANTT_TASKS, args, gantt._actionsManager.getTaskMovingAction())
            },
            NotifyTaskEditDialogShowing: function(args) {
                gantt._actionsManager.raiseTaskEditDialogShowingAction(args)
            },
            NotifyResourceManagerDialogShowing: function(args) {
                gantt._actionsManager.raiseResourceManagerDialogShowingAction(args)
            },
            NotifyDependencyInserting: function(args) {
                gantt._actionsManager.raiseInsertingAction(GANTT_DEPENDENCIES, args)
            },
            NotifyDependencyRemoving: function(args) {
                gantt._actionsManager.raiseDeletingAction(GANTT_DEPENDENCIES, args)
            },
            NotifyResourceCreating: function(args) {
                gantt._actionsManager.raiseInsertingAction(GANTT_RESOURCES, args)
            },
            NotifyResourceRemoving: function(args) {
                gantt._actionsManager.raiseDeletingAction(GANTT_RESOURCES, args)
            },
            NotifyResourceAssigning: function(args) {
                gantt._actionsManager.raiseInsertingAction(GANTT_RESOURCE_ASSIGNMENTS, args)
            },
            NotifyResourceUnassigning: function(args) {
                gantt._actionsManager.raiseDeletingAction(GANTT_RESOURCE_ASSIGNMENTS, args)
            },
            NotifyScaleCellPrepared: function(args) {
                gantt._actionsManager.raiseScaleCellPreparedAction(args)
            },
            NotifyGanttViewUpdated: function() {
                gantt._onGanttViewCoreUpdated()
            }
        }
    }
};
exports.ModelChangesListener = ModelChangesListener;
