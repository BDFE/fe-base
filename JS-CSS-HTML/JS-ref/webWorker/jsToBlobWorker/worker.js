export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        let message = e.data;
        let ar = [];
        ar.length = 10;
        ar.fill(message);
        postMessage(ar);
    })
}
