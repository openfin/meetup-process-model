importScripts('prime.js');

onmessage = function(e) {
    console.log('Message received from main script');
    //var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    console.log(e);
    let workerResult = e.data;
    console.log('Posting message back to main script');
    //console.log(fin);
    postMessage(doPointlessComputationsWithBlocking());
};
