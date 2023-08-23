﻿/**
* DevExpress Analytics (core\_actionProvider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '../serializer/utils';
export class BaseActionsProvider extends Disposable {
    initActions(actions) {
        this.actions = actions;
        this.actions.forEach((action) => {
            if (!action.disabled)
                action.disabled = ko.observable(false);
        });
    }
    getActions(context) {
        if (this.condition(context)) {
            this.setDisabled && this.setDisabled(context);
            return this.actions;
        }
        return [];
    }
    condition(context) {
        return true;
    }
}
