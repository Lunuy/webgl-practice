import Component from "./Component";


class Time implements Component {
    public time: number;
    public dt: number;
    constructor() {
        this.time = this.time = performance.now();
        this.dt = 0;
    }
    update() {
        const newTime = performance.now();
        this.dt = newTime - this.time;
        this.time = newTime;
    }
    afterUpdate() {}
    clean() {}
}

export default Time;