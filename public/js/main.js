function createChildWindow() {
    const win = new fin.desktop.Window({
        name:`cwin_${Math.floor(Math.random() * 100)}`,
        url: 'child_a.html',
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
    let bytes = (info.workingSetSize/1048576).toFixed(2)+' MB';
    document.querySelector('#working-set-size').innerText = bytes;
}

//event listeners.
document.addEventListener('DOMContentLoaded', function() {
    const ofVersion = document.querySelector('#of-version');
    const cubeElem = document.querySelector('.cube');
    const cube = new Cube(cubeElem);
    const memorTracker = new MemoryTracker(updateMemStats);

    cube.animateTheCube();

    if (typeof fin != 'undefined') {
        const currentApp = fin.desktop.Application.getCurrent();
        fin.desktop.System.getVersion(function(version) {
            ofVersion.innerText = version;
        });
        fin.desktop.System.showDeveloperTools(currentApp.uuid, currentApp.name || currentApp.uuid);
    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }

    //we want child windows to have access to the Cube object, a simple way is to make it global.
    window.Cube = Cube;

    const myWorker = new Worker('js/simple-worker.js');

    myWorker.onmessage = function(e) {
        console.log('here is the response');
        console.log(e);
    };

    myWorker.postMessage(['a', 'b', 'c']);
    console.log('posed to the worker');
});
