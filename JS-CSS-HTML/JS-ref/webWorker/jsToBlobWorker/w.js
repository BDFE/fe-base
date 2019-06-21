// worker2.js
onmessage = function (e) {
    if (!e) return;
    let message = e.data;
    let ar = [];
    ar.length = 10;
    ar.fill(message);
    postMessage(ar);
}