﻿/**
* DevExpress Dashboard (_options-manager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardOptionChangedArgs } from '../control-options';
import { DashboardControl } from '../dashboard-control';
import { DashboardControlActions, OptionConsumer } from './_interfaces';
export declare const getEventName: (actionName: string) => string;
export declare const getOptionNameByEvent: (eventName: string) => string;
export declare const isEventName: (actionName: string) => boolean;
export declare type EventSubscriber<TEvents> = <K extends Extract<keyof TEvents, string>>(eventName: K, eventHandler: (ev: TEvents[K]) => any) => void;
export interface OptionsManagerConfig<TOptions extends Object, TEvents extends Object> {
    defaultOptions: TOptions;
    initOptions: TOptions;
    optionChanged: (args: DashboardOptionChangedArgs<TOptions>) => DashboardControlActions;
    dashboardControl: DashboardControl;
    eventsHolder?: {
        on: EventSubscriber<TEvents>;
        off: EventSubscriber<TEvents>;
    };
    extensionName: string;
}
export declare class OptionsManager<TOptions extends Object, TEvents extends Object> implements OptionConsumer<TOptions> {
    _internalEvents: EventManager<TEvents>;
    _dashboardControl: DashboardControl;
    _config: OptionsManagerConfig<TOptions, TEvents>;
    initialize(_config: OptionsManagerConfig<TOptions, TEvents>): void;
    getDefaultOptions(): TOptions;
    getInitialOptions(): TOptions;
    dispose(): void;
    optionChanged(args: DashboardOptionChangedArgs<TOptions>): DashboardControlActions;
    raiseEvent<K extends Extract<keyof TEvents, string>>(eventName: K, eventArgs: TEvents[K]): void;
    get(optionName: Extract<keyof TOptions, string>): any;
    set(optionName: Extract<keyof TOptions, string>, value: any): any;
    silent(optionName: string, value: any): any;
    private _set;
    private _cachedSetters;
    private _merge;
}
export declare let mergeOptions: (target: any, source: any, externalCache?: {}) => void;
export declare class EventManager<TEvents> {
    dispose(): void;
    private _handlers;
    raise<K extends Extract<keyof TEvents, string>>(eventName: K, eventArgs: TEvents[K]): void;
    on: EventSubscriber<TEvents>;
    off: EventSubscriber<TEvents>;
}
