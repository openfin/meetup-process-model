const myWorker = new Worker('js/webworker.js');
const sWorker = new SharedWorker('js/sharedworker.js');

let cube;
let startTime;

function crash() {
    let txt = 'a';
    while(1){
        txt = txt += 'a';
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


function findPrime() {
    startTime = Date.now();
    const primes = doPointlessComputationsWithBlocking().filter(i => i !== 0);
    const endTime = Date.now();
    window.opener.window.postMessage(getFoundInString(primes), location.origin);
}

function findPrimeWebWorker() {
    startTime = Date.now();
    myWorker.postMessage('');
}

function shareData() {
    startTime = Date.now();
    sWorker.port.postMessage(startTime);
}

function getFoundInString(primes) {
    const endTime = Date.now();
    return `${ primes.length } in ${ endTime - startTime }ms`;
}

myWorker.addEventListener('message', e => {
    const view = new Int32Array(e.data);
    const primes = view.filter(i => i !== 0);

    window.opener.window.postMessage(getFoundInString(primes), location.origin);
});
