let arrayBufferArray = [];

function freezeParentApp() {
    alert('now we are frozen!');
}

function alocateMemory() {
    let ab = new ArrayBuffer(1240000000);
    let view = new Int32Array(ab);
    arrayBufferArray.push(view);
}

function findPrime() {
    doPointlessComputationsWithBlocking();
}

document.addEventListener('DOMContentLoaded', () => {
});
