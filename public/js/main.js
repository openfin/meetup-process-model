const sWorker = new SharedWorker('js/sharedworker.js');

function createChildWindow(url) {
    const win = new fin.desktop.Window({
        name:`cwin_${Math.floor(Math.random() * 100)}`,
        url,
        autoShow: true,
        saveWindowState: false
    });
}

function createApplication() {
    const uuid = `app_${Math.floor(Math.random() * 100)}`;
    const app = new fin.desktop.Application({
        name: uuid,
        uuid: uuid,
        url: location.href,
        autoShow: true,
        saveWindowState: false
    }, () => {
        app.run();
    });
}

function updateMemStats(info) {
    let bytes = (info.usedJSHeapSize/1048576).toFixed(2)+' MB';
    document.querySelector('#working-set-size').innerText = bytes;
}

window.addEventListener('message', e => {
    if (e.origin === location.origin) {
        document.querySelector('#primes-num').innerText = e.data;
    }
});

sWorker.port.addEventListener('message', e => {
    document.querySelector('#shared-data').innerText = e.data;
});

//register Service Worker
navigator.serviceWorker.register("../serviceworker.js");

//event listeners.
document.addEventListener('DOMContentLoaded', function() {
    const ofVersion = document.querySelector('#of-version');
    const cubeElem = document.querySelector('.cube');
    const childWindowNumElem = document.querySelector('#child-window-num');
    const applicationNumElem = document.querySelector('#application-num');
    const cube = new Cube(cubeElem);
    const memorTracker = new MemoryTracker(updateMemStats);

    cube.animateTheCube();
    sWorker.port.start();

    if (typeof fin != 'undefined') {
        fin.desktop.System.getVersion(function(version) {
            ofVersion.innerText = version;
        });

    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }

    //we want child windows to have access to the Cube object, a simple way is to make it global.
    window.Cube = Cube;
});
