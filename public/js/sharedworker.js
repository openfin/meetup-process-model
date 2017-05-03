const peers = [];

self.addEventListener('connect', function (e) {

	var port = e.ports[0];

    peers.push(port);

	port.addEventListener('message', function (e) {

        peers.forEach(p => {
            p.postMessage(e.data);
        });
	}, false);

	port.start();

}, false);
