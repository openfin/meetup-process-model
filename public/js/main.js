//event listeners.
document.addEventListener('DOMContentLoaded', function() {
    const ofVersion = document.querySelector('#of-version');
    if (typeof fin != 'undefined') {
	const currentApp = fin.desktop.Application.getCurrent();
        fin.desktop.System.getVersion(function(version) {
            ofVersion.innerText = version;
        });
	fin.desktop.System.showDeveloperTools(currentApp.uuid, currentApp.name || currentApp.uuid);
    } else {
        ofVersion.innerText = 'OpenFin is not available - you are probably running in a browser.';
    }
});
