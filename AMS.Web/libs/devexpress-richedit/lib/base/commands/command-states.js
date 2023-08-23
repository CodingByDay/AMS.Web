export class SimpleCommandState {
    constructor(enabled, value) {
        this.visible = true;
        this.denyUpdateValue = false;
        this.enabled = enabled;
        this.value = value;
    }
}
export class IntervalCommandState extends SimpleCommandState {
    constructor(enabled, interval, value) {
        super(enabled, value);
        this.interval = interval;
    }
}
export class IntervalCommandStateEx extends SimpleCommandState {
    constructor(enabled, intervals, value) {
        super(enabled, value);
        this.intervals = intervals;
    }
}
