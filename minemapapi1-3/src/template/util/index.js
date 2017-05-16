/**
 * Created by zhoumingrui on 2017/4/7.
 */

/**
 * 产生方格数据
 * @param points [[116.38,49.9,3],[116.38,49.9,3]]
 * @returns {geojson}
 */
exports.pointArrayToGridGeoJson = function (points, gridWidth, coordReverse = false) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    }

    for (let i = 0; i < points.length; i++) {
        let aPoint = coordReverse ? [points[i][1], points[i][0]] : points[i];
        let mercator = lngLat2Mercator(aPoint);
        let gridGeoJson = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] + gridWidth / 2]),
                    mercator2LngLat([mercator[0] + gridWidth / 2, mercator[1] + gridWidth / 2]),
                    mercator2LngLat([mercator[0] + gridWidth / 2, mercator[1] - gridWidth / 2]),
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] - gridWidth / 2]),
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] + gridWidth / 2])
                ]]
            },
            "properties": {
                "count": points[i][2],
                "name": Math.random() * 100 + ''
            }
        }
        featureCollection.features.push(gridGeoJson);
    }

    return featureCollection;
};

/**
 * 产生方格数据
 * @param points [[116.38,49.9,3],[116.38,49.9,3]]
 * @returns {geojson}
 */
exports.pointArrayToPointsGeoJson = function (points, girdWidth) {

    for (let i = 0; i < points.length; i++) {

    }

    return
};

/**
 * 经纬度转墨卡托
 * @param lngLat
 * @returns {{x: number, y: number}}
 */
function lngLat2Mercator(lngLat) {
    var mercator = [];
    var x = lngLat[0] * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + lngLat[1]) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    mercator.push(x);
    mercator.push(y);
    return mercator;
}
exports.lngLat2Mercator = lngLat2Mercator;

/**
 * 墨卡托转经纬度
 * @param mercator
 * @returns {{x: number, y: number}}
 */
function mercator2LngLat(mercator) {
    var lngLat = [];
    var x = mercator[0] / 20037508.34 * 180;
    var y = mercator[1] / 20037508.34 * 180;
    y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
    lngLat.push(x);
    lngLat.push(y);
    return lngLat;
}
exports.mercator2LngLat = mercator2LngLat;

/**
 *
 * @param data 数据，样例  [[116.38,49.9,3],[116.38,49.9,3]]
 * @param segDistance 每小段长度
 * @param speed 粒子速度，可选值为 1，2，3，4，默认为1，速度最快
 * @returns {{type: string, features: Array}}
 */
exports.pointArrayToSpriteGeoJson = function (data, segDistance = 10, speed = 1) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    }
    //计算所有的距离
    var distances = calcDistance(data);
    /**
     * 切断为每10m一段
     */
    var segArr = [];
    for (var i = 0; i < data.length - 1; i++) {

        var seg = Math.round(distances[i] / segDistance);
        var dLng = data[i + 1][0] - data[i][0];
        var dLat = data[i + 1][1] - data[i][1];

        for (var j = 0; j <= seg; j++) {
            segArr.push([data[i][0] + dLng / seg * j, data[i][1] + dLat / seg * j])
        }

    }
    /**
     * 组装geometry
     */
    for (var i = 0; i < segArr.length - 4; i++) {
        var gridGeoJson = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    segArr[i], segArr[i + 1], segArr[i + 2], segArr[i + 3]
                ]
            },
            "properties": {
                "link_seq": i,
                "status": speed  //标识速度，1，2，3，4  1最快
            }
        }
        featureCollection.features.push(gridGeoJson);
    }
    return featureCollection;
}

/**
 * 这个是生成我们指定Symtracking图层的geojson的方法，最关键的是生成的是线数据和包含link_seq这个属性
 * @param data
 * @returns {{type: string, features: Array}}
 */
exports.pointArrayToSymtrackingGeoJson = function (data) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    }

    for (var i = 0; i < data.length - 1; i++) {
        var sPoint = data[i];
        var ePoint = data[i + 1];
        var dLng = ePoint[0] - sPoint[0]
        var dLat = ePoint[1] - sPoint[1]
        for (var j = 0; j < 60; j++) {
            var gridGeoJson = {
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [[sPoint[0] + j * dLng / 60, sPoint[1] + j * dLat / 60], [sPoint[0] + (j + 1) * dLng / 60, sPoint[1] + (j + 1) * dLat / 60]]
                },
                "properties": {
                    "link_seq": i * 60 + j
                }
            }
            featureCollection.features.push(gridGeoJson);
        }

    }

    return featureCollection;
}


function calcDistance(arr) {
    var distances = []
    for (var i = 0; i < arr.length - 1; i++) {
        let pt1 = lngLat2Mercator(arr[i]);
        let pt2 = lngLat2Mercator(arr[i + 1]);
        let leng = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
        distances.push(leng);
    }
    return distances;
}

/**
 * 产生航线数据数据
 * @param start [{name: '北京', lngLat: [116.406658, 39.898668], code: 1},
 {name: '上海', lngLat: [121.53178, 31.205854], code: 2},
 {name: '成都', lngLat: [103.865765, 30.678178], code: 3},
 {name: '兰州', lngLat: [103.602093, 36.10469], code: 4}
 ]
 @param end [{name: '北京', lngLat: [116.406658, 39.898668], code: 1},
 {name: '上海', lngLat: [121.53178, 31.205854], code: 2},
 {name: '成都', lngLat: [103.865765, 30.678178], code: 3},
 {name: '兰州', lngLat: [103.602093, 36.10469], code: 4}
 ]
 * @returns {geojson}
 */
exports.startAndEndPointArrayToAirlineGeoJson = function (start, end, maxHeight = 2000, segCount = 100) {
    let featureCollection = {
        type: 'FeatureCollection',
        features: []
    }
    for (var i = 0; i < start.length; i++) {
        var startItem = start[i];
        for (var j = 0; j < end.length; j++) {
            var endItem = end[j];
            spliteLineAndGenGeo(featureCollection, startItem.lngLat, endItem.lngLat, startItem.code, maxHeight, segCount);
        }
    }

    return featureCollection;
}

function spliteLineAndGenGeo(f, s, e, code, h, sc) {

    var dlng = e[0] - s[0]
    var dlat = e[1] - s[1]
    var seg = parseInt(Math.random() * sc);
    var offset = parseInt(Math.random() * sc / 4);

    var count = Math.round(Math.random() * 100);
    var height = Math.random() * h / 2 + 1500;
    for (var i = 0; i < seg; i++) {
        /**
         * 航线最大高度
         */

        /**
         * 抛物线计算方程
         * @type {number}
         */
        var a = -4 * height / Math.pow(e[0] - s[0], 2);
        var b = -a * (e[0] + s[0]);
        var c = a * e[0] * s[0];
        /**
         * 航线每段geom
         * @type {{type: string, geometry: {type: string, coordinates: [*]}, properties: {start_height: number, end_height: number, count: number, code: *}}}
         */
        var geom = {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [s[0] + i * dlng / seg, s[1] + i * dlat / seg], [s[0] + (i + 1) * dlng / seg, s[1] + (i + 1) * dlat / seg]
                ]
            },
            "properties": {
                "start_height": a * Math.pow(s[0] + i * dlng / seg, 2) + b * (s[0] + i * dlng / seg) + c,
                "end_height": a * Math.pow(s[0] + (i + 1) * dlng / seg, 2) + b * (s[0] + (i + 1) * dlng / seg) + c,
                "link_seq": i + offset,
                "count": count,
                "total": seg,
                "code": code
            }
        }
        f.features.push(geom);
    }
}

/**
 * 产生粒子数据数据
 * @param points [[116.38,49.9,3],[116.38,49.9,3]]
 * @returns {geojson}
 */
exports.dataArrayToTrackingGeoJson = function (points, gridWidth, coordReverse = false) {
    var featureCollection = {
        type: 'FeatureCollection',
        features: []
    }

    for (let i = 0; i < points.length; i++) {
        let aPoint = coordReverse ? [points[i][1], points[i][0]] : points[i];
        let mercator = lngLat2Mercator(aPoint);
        let gridGeoJson = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] + gridWidth / 2]),
                    mercator2LngLat([mercator[0] + gridWidth / 2, mercator[1] + gridWidth / 2]),
                    mercator2LngLat([mercator[0] + gridWidth / 2, mercator[1] - gridWidth / 2]),
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] - gridWidth / 2]),
                    mercator2LngLat([mercator[0] - gridWidth / 2, mercator[1] + gridWidth / 2])
                ]]
            },
            "properties": {
                "count": points[i][2],
                "name": Math.random() * 100 + ''
            }
        }
        featureCollection.features.push(gridGeoJson);
    }

    return featureCollection;
};
