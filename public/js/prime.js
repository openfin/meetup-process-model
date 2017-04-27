function isPrime(n) {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
    if (n == leastFactor(n)) return true;
    return false;
}

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;
    if (n == 0) return 0;
    if (n % 1 || n * n < 2) return 1;
    if (n % 2 == 0) return 2;
    if (n % 3 == 0) return 3;
    if (n % 5 == 0) return 5;
    var m = Math.sqrt(n);
    for (var i = 7; i <= m; i += 30) {
        if (n % i == 0) return i;
        if (n % (i + 4) == 0) return i + 4;
        if (n % (i + 6) == 0) return i + 6;
        if (n % (i + 10) == 0) return i + 10;
        if (n % (i + 12) == 0) return i + 12;
        if (n % (i + 16) == 0) return i + 16;
        if (n % (i + 22) == 0) return i + 22;
        if (n % (i + 24) == 0) return i + 24;
    }
    return n;
}

function now() {
    return new Date().getTime();
}

// main processing loop
// do one second of work, then setTimeout() to allow events to pump from main thread
var lastPrime = 2;
var current = 0;
var timeChunk = 1000;
var timer;

function stop() {
    clearTimeout(timer);
}

function run() {
    var finishTime = now() + timeChunk;
    while (now() < finishTime) {
        ++current;
        if (isPrime(current)) {
            lastPrime = current;
        }
    }
    self.postMessage({highPrime: lastPrime});
    timer = setTimeout(run, 1);
}

// the assumption is that we only get these events when a timer is running between
// calls to run()
self.addEventListener('message', function(e) {
    var data = e.data;
    switch(data.cmd) {
        case "start":
            stop();
            run();
            break;
        case "stop":
            stop();
            break;
        case "query":
            break;
        default:
            break;
    };
}, false);

class PrimeFinder {
    constructor(onUpdate) {
        this.current = 0;

        this.onUpdate = onUpdate;
        this.running = false;
    };

    run() {
        this.isRunning = true;
        this.primeLoop();
    }

    stop() {
        this.running = false;
    }

    isPrime(n) {
        if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
            return false;
        }
        if (n == this.leastFactor(n)){
            return true;
        }

        return false;
    }

    leastFactor(n) {
        if (isNaN(n) || !isFinite(n)) return NaN;
        if (n == 0) return 0;
        if (n % 1 || n * n < 2) return 1;
        if (n % 2 == 0) return 2;
        if (n % 3 == 0) return 3;
        if (n % 5 == 0) return 5;
        var m = Math.sqrt(n);
        for (var i = 7; i <= m; i += 30) {
            if (n % i == 0) return i;
            if (n % (i + 4) == 0) return i + 4;
            if (n % (i + 6) == 0) return i + 6;
            if (n % (i + 10) == 0) return i + 10;
            if (n % (i + 12) == 0) return i + 12;
            if (n % (i + 16) == 0) return i + 16;
            if (n % (i + 22) == 0) return i + 22;
            if (n % (i + 24) == 0) return i + 24;
        }
        return n;
    }


    primeLoop() {
        if(this.running) {

            this.current++;
            if (this.isPrime(this.current)) {
                this.onUpdate(this.current);
            } else {
                setTimeout(this.primeLoop().bind(this));
            }
        }

    }
}
