/**
* DevExtreme (ui/notify.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/** @public */
interface Stack {
    /**
     * @docid
     * @type Enums.StackPosition|object
     */
    position?: 'top left' | 'top right' | 'bottom left' | 'bottom right' | 'top center' | 'bottom center' | 'left center' | 'right center' | 'center' | {
        /**
         * @docid
         * @type number
         */
        top?: number;
        /**
         * @docid
         * @type number
         */
        left?: number;
        /**
         * @docid
         * @type number
         */
        bottom?: number;
        /**
         * @docid
         * @type number
         */
        right?: number;
    };
    /**
     * @docid
     */
    direction?: 'down-push' | 'up-push' | 'left-push' | 'right-push' | 'down-stack' | 'up-stack' | 'left-stack' | 'right-stack';
}

/**
 * Creates a toast message.
 */
declare function notify(message: string, type?: string, displayTime?: number): void;

/**
 * Creates a toast message.
 */
declare function notify(options: any, type?: string, displayTime?: number): void;

/**
 * 
 */
declare function notify(message: string, stack?: Stack): void;

/**
 * 
 */
declare function notify(options: any, stack?: Stack): void;

export default notify;
