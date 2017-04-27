class MemoryTracker {
    constructor(onUpdate) {
        this.onUpdate = onUpdate;
        this.queryProcessStatsLoop();
    }

    queryProcessStatsLoop() {
        this.onUpdate(window.performance.memory);
        setTimeout(this.queryProcessStatsLoop.bind(this), 1000);
    }
}
