const myWorker = new Worker('js/webworker.js');
const sWorker = new SharedWorker('js/sharedworker.js');

let cube;

function crash() {
    let txt = "a";
    while(1){
        txt = txt += "a";
    }
}

function cloneCube() {
    const parentWindow = window.opener.window;
    const stage = parentWindow.document.querySelector('.stage');
    const container = document.querySelector('.container');

    container.innerHTML = stage.outerHTML;
}

function animateCube() {
    const parentWindow = window.opener.window;
    const cubeElem = document.querySelector('.cube');
    cube = new parentWindow.Cube(cubeElem);

    cube.animateTheCube();
}

function stopCube() {
    cube.stop();
}

function freezeParentApp() {
    alert('now we are frozen!');
}

function findPrime() {
    const startTime = Date.now();
    const primes = doPointlessComputationsWithBlocking().filter(i => i !== 0);
    const endTime = Date.now();
    const primesIn = `${ primes.length } in ${ endTime - startTime }ms`;
    window.opener.window.postMessage(primesIn, location.origin);
}

function findPrimeWebWorker() {
    const startTime = Date.now();
    myWorker.onmessage = function(e) {
        const endTime = Date.now();
        const view = new Int32Array(e.data);
        const primes = view.filter(i => i !== 0);
        const primesIn = `${ primes.length } in ${ endTime - startTime }ms`;
        window.opener.window.postMessage(primesIn, location.origin);
    };

    myWorker.postMessage(['a', 'b', 'c']);
}

function shareData() {
    const startTime = Date.now();
    sWorker.port.postMessage(startTime);
}


myWorker.onmessage = function(e) {
    const view = new Int32Array(e.data);
    const primes = view.filter(i => i !== 0);
};
