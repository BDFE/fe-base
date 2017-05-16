/**
 * Created by zhoumingrui on 2016/12/8.
 */
var EventObj = (function () {
    var __message = {};
    return {
        regist: function (type, fn) {
            if (typeof  __message[type] === 'undefined') {
                __message[type] = [fn];
            } else {
                __message[type].push(fn);
            }
        },
        fire: function (type, args) {
            if (!__message[type]) {
                return
            }
            var events = {
                type: type,
                args: args || {}
            }
            i = 0;
            len = __message[type].length;
            for (; i < len; i++) {
                __message[type][i].call(this, events);
            }
        },
        remove: function (type, fn) {
            if (__message[type] instanceof Array) {
                if (!fn) {
                    var i = __message[type].length - 1;
                    for (; i >= 0; i--) {
                        __message[type] = [];
                    }
                } else {
                    var i = __message[type].length - 1;
                    for (; i >= 0; i--) {
                        __message[type][i] === fn && __message[type].splice(i, 1);
                    }
                }
            }
        }
    }

})();
