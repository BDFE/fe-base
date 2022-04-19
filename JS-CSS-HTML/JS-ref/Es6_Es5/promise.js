var MyPromise = function (fn) {
    let promise = this;
    let value = null;
    promise.status = 'PENDING';
    promise.reason = '';
    promise._resolves = [];
    promise._rejects = [];

    function resolve(v) {
        setTimeout(function () {
            promise.status = 'FULLFILLED'
            promise._resolves.forEach(function (callback) {
                value = callback(v);
            })
        }, 0);
    }

    function reject(v) {
        setTimeout(() => {
            promise.status = 'REJECTED';
            promise._rejects.forEach(function (callback) {
                promise.reason = callback(v)
            })
        }, 0);
    }

    this.then = function (onFulfilled, onRejected) {
        let promise = this;
        var isFunction = (f) => {
            return Object.prototype.toString.call(f) == '[object Function]';
        }

        return new MyPromise(function (resolve, reject) {
            let errback = (rs) => {
                reason = isFunction(onRejected) && onRejected(rs) || rs;
                console.log('errback', rs)
                reject(reason);
            }

            var handle = (v) => {
                let ret = isFunction(onFulfilled) ? onFulfilled(v) : v;
                if (ret && ret['then'] && isFunction(ret['then'])) {
                    ret.then(function (v) {
                        resolve(v);
                    })
                } else {
                    resolve(ret);
                }
            }

            if (promise.status == 'PENDING') {
                promise._resolves.push(handle);
                promise._rejects.push(errback);
            } else if (promise.status == 'FULLFILLED') {
                handle(v)
            } else if (promise.status === 'REJECTED') {
                errback(promise.reason);
            }
        })
    }
    fn(resolve, reject);
}


/**********************************************************************/
//实例
var getData100 = function () {
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            resolve('100ms');
        }, 100);
    });
}

var getData200 = function () {
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            resolve('200ms');
        }, 200);
    });
}
var getData300 = function () {
    return new MyPromise(function (resolve, reject) {
        setTimeout(function () {
            reject('hah');
        }, 300);
    });
}

getData100().then(function (data) {
    console.log('1', data); // 100ms
    return getData200();
}).then(function (data) {
    console.log('2', data); // 200ms
    return getData300();
}).then(function (data) {
    console.log('3', data);
}, function (data) {
    console.log('r', data);
    console.log(data);
});