/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/semaphore/semaphore.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
export class Semaphore {
    constructor() {
        this.counter = 0
    }
    isFree() {
        return 0 === this.counter
    }
    take() {
        this.counter += 1
    }
    release() {
        this.counter -= 1;
        if (this.counter < 0) {
            this.counter = 0
        }
    }
}
