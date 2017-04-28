let myWorker;

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
    console.log(info);
    let bytes = (info.usedJSHeapSize/1048576).toFixed(2)+' MB';
    document.querySelector('#working-set-size').innerText = bytes;
}

function loadPrimesFromWorker() {
    myWorker.postMessage(['a', 'b', 'c']);
}

//event listeners.
document.addEventListener('DOMContentLoaded', function() {
    const ofVersion = document.querySelector('#of-version');
    const cubeElem = document.querySelector('.cube');
    const childWindowNumElem = document.querySelector('#child-window-num');
    const applicationNumElem = document.querySelector('#application-num');
    const cube = new Cube(cubeElem);
    const memorTracker = new MemoryTracker(updateMemStats);

    let childWindows = 0;
    let applications = 1;

    cube.animateTheCube();

    if (typeof fin != 'undefined') {

        const currentApp = fin.desktop.Application.getCurrent();
        fin.desktop.System.getVersion(function(version) {
            ofVersion.innerText = version;
        });
        fin.desktop.System.showDeveloperTools(currentApp.uuid, currentApp.name || currentApp.uuid);

        currentApp.addEventListener('window-created', () => {
            childWindows++;
            childWindowNumElem.innerText = childWindows;
        });

        currentApp.addEventListener('window-closed', () => {
            childWindows--;
            childWindowNumElem.innerText = childWindows;
        });

        fin.desktop.System.addEventListener('application-created', () => {
            console.log('created brah');
            applications++;
            applicationNumElem.innerText = applications;
        });

        fin.desktop.System.addEventListener('application-closed', () => {
            applications--;
            applicationNumElem.innerText = applications;
        });

        fin.desktop.System.getAllApplications(apps => {
            applications = apps.length;
            applicationNumElem.innerText = applications;
        });


    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }

    //we want child windows to have access to the Cube object, a simple way is to make it global.
    window.Cube = Cube;

    myWorker = new Worker('js/simple-worker.js');

    myWorker.onmessage = function(e) {
        console.log('here is the response');
        console.log(e);
    };
});
