function freezeParentApp() {
    alert('now we are frozen!');
}

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
};

function animateCube() {
    const parentWindow = window.opener.window;
    const cubeElem = document.querySelector('.cube');
    const cube = new parentWindow.Cube(cubeElem);

    cube.animateTheCube();
}

function freezeParentApp() {
    alert('now we are frozen!');
}

function findPrime() {
    doPointlessComputationsWithBlocking();
}

function findPrimeWebWorker() {

}
