var switchworker = (function () {
    return {
        requestTimeout: null,
        replaceTimeout: null,
        start: function (info) {
        },
        request:function () {
            EventObj.fire('layer-request');
            console.log('layer-request：请求');
        },
        replace: function () {
            console.log('layer-replace:替换')
            EventObj.fire('layer-replace');
        },
        cancel: function () {
            clearTimeout(this.requestTimeout);
            clearTimeout(this.replaceTimeout);
        }
    }
})();


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

/**
 * 这里需要做两部分，图层顺序调节，图层的删除。
 */
var state = (function () {
    var state = {
        order: 'tracking',
        sourceName: 'tracking',
        layerName: 'trackinglayer',
        removeSource: 'tracking',
        removeLayer: 'trackinglayer',
        backgroundId: '52d5cdf6f4c84d57a20c10d0a97140a1',
        buildingId: 'ef56fa93b68849cb90c34aae7c03fe4e'
    };

    state.addLayer = function(map, layerName, sourceName, layerBefore, type, sourceLayer,traffic) {
        map.addLayer({
            "id": layerName,
            "type": type || 'tracking',
            "source": sourceName,
            "source-layer": sourceLayer || 'link',
            "layout": {
                "tracking-join": "round",
                "tracking-cap": "round"
            },
            "paint": {
                'tracking-speed': 1,
                "tracking-color": traffic ? {
                    property:'sp',
                    stops:[
                        [0,'#ff0000'],
                        [1,'#FF6300'],
                        [2,'#ffff00'],
                        [3,'#00ff00'],
                        [14,'#00ff00']
                    ]
                } : "#63B8FF",
                "tracking-width": 3
            }
        }, layerBefore);
    }

    state.addSource = function(map, sourceName, url) {
        map.addSource(sourceName, {
            'type': 'vector',
            'tiles': [url || 'http://123.207.109.239:8086/test_spring_boot-0.0.1-SNAPSHOT/test/trackingdidi1/{z}/{x}/{y}/480']
        });
    }

    return state;
})();
