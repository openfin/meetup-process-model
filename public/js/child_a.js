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
