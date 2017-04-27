class MemoryTracker {
    constructor(onUpdate) {
        this.uuid = fin.desktop.Application.getCurrent().uuid;
        this.onUpdate = onUpdate;
        this.queryProcessStatsLoop();
    }

    queryProcessStatsLoop() {
        fin.desktop.System.getProcessList(pl => {
            this.onUpdate(pl.find((p => p.uuid === this.uuid)));
            setTimeout(this.queryProcessStatsLoop.bind(this), 1000);
        });
    }
}
