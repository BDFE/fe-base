'use strict';
/**
 *  功能服务接口集合
 */
const ajax = require('./ajax');
const config = require('./config');
const TOKEN_VALUE = '25cc55a69ea7422182d00d6b7c0ffa93';

/**
 * 将参数对象合并为url参数字符串
 * @param {Object} paramObj
 * @returns {string}
 */
const joinParamToUrl = function (paramObj) {
    let queryStr = "";
    if (paramObj) {
        Object.keys(paramObj).map((key) => {
            let value = paramObj[key];
            if (typeof(value) != 'string') {
                value = JSON.stringify(value);
            }
            queryStr += `${key}=${value}&`;
        })
    }
    if (queryStr.endsWith("&")) {
        queryStr = queryStr.substr(0, queryStr.length - 1);
    }
    return queryStr;
};

/**
 * 根据查询的数据类型进行关键字搜索
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {string} searchType 查询的数据类型 参数说明：all-所有、busline-公交线路、busstation-公交站点、road-道路、cross-交叉路口、poi-poi数据、area-行政区划、apt-address 门址查询
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.querySearchResultByType('110000','肯德基','poi',1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.querySearchResultByType = function (adminCode, keyword, searchType, pageNumber, pageCount, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        searchType: searchType || 'all',
        key: keyword,
        pageNumber: pageNumber || 1,
        pageCount: pageCount || 10,
        source: 1
    };
    let url = config.DOMAIN + '/service/search/keyword?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据关键字搜索所有符合条件的数据
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryAllSearchResult('110000','肯德基',1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryAllSearchResult = function (adminCode, keyword, pageNumber, pageCount, callback) {
    return exports.querySearchResultByType(adminCode, keyword, 'all', pageNumber, pageCount, callback);
};

/**
 * 根据关键字搜索poi数据
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryPoiSearchResult('110000','肯德基',1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryPoiSearchResult = function (adminCode, keyword, pageNumber, pageCount, callback) {
    return exports.querySearchResultByType(adminCode, keyword, 'poi', pageNumber, pageCount, callback);
};

/**
 * 根据关键字搜索道路数据
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryRoadSearchResult('110000','长安街',1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryRoadSearchResult = function (adminCode, keyword, pageNumber, pageCount, callback) {
    return exports.querySearchResultByType(adminCode, keyword, 'road', pageNumber, pageCount, callback);
};

/**
 * 根据关键字和坐标点进行周边搜索
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {string} searchType 查询的数据类型 参数说明：all-所有、busline-公交线路、busstation-公交站点、road-道路、cross-交叉路口、poi-poi数据、area-行政区划、apt-address 门址查询
 * @param {string} location 中心点坐标x,y
 * @param {string} spatialFuntion 空间查询方式 参数说明：geofilt-周边检索、bbox-正方形检索
 * @param {number} radius 搜索半径,默认500米
 * @param {number} seq 排序方式 参数说明：1-按照距离排序、0-按照权值排序
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.querySearchSurroundResult('110000','肯德基','all','116.40717, 39.90469','geofilt',10000,0,1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.querySearchSurroundResult = function (adminCode, keyword, searchType, location, spatialFuntion, radius, seq, pageNumber, pageCount, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        searchType: searchType || 'all',
        key: keyword,
        location: location,
        inRadius: 1,
        spatialFuntion: spatialFuntion || 'geofilt',
        radius: radius || 500,
        seq: seq || 0,
        source: 1,
        pageNumber: pageNumber || 1,
        pageCount: pageCount || 10,
    };
    let url = config.DOMAIN + '/service/search/surround?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据关键字和矩形框进行范围搜索
 * @param {string} adminCode 行政区划编码
 * @param {string} keyword 关键字
 * @param {string} searchType 查询的数据类型  参数说明：all-所有、busline-公交线路、busstation-公交站点、road-道路、cross-交叉路口、poi-poi数据、area-行政区划、apt-address 门址查询
 * @param {string} bounds 矩形范围 左下角和右上角坐标串x1,y1,x2,y2
 * @param {number} seq 排序方式 参数说明：1-按照距离排序、0-按照权值排序
 * @param {number} pageNumber 指定返回的页码 大于0
 * @param {number} pageCount 指定返回的每页数据个数 大于0 默认值为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.querySearchBboxResult('110000','肯德基','all','116.4029557,39.9015946,116.4116457,39.9129533',0,1,10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.querySearchBboxResult = function (adminCode, keyword, searchType, bounds, seq, pageNumber, pageCount, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        searchType: searchType || 'all',
        key: keyword,
        bounds: bounds,
        seq: seq || 0,
        source: 1,
        pageNumber: pageNumber || 1,
        pageCount: pageCount || 10,
    };
    let url = config.DOMAIN + '/service/search/bbox?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据坐标点进行周边查找
 * @param {string} location 坐标点x,y
 * @param {string} type 查询结果类型 支持多种别，用逗号分割  参数说明：link,poi,road,cross,apt
 * @param {number} radius 周边搜索的半径 默认 1000米
 * @param {number} count 返回记录数(类型不为link时生效)，默认为5
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.querySearchAroundResult('116.4029557,39.9015946','poi',1000,5,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.querySearchAroundResult = function (location, type, radius, count, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        location: location,
        type: type || 'poi',
        radius: radius || 1000,
        count: count || 5,
    };
    let url = config.DOMAIN + '/service/search/around?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据起终点进行驾车路径规划搜索
 * @param {string} sPoint 起点坐标x,y  示例116.23456,39.34324
 * @param {string} ePoint 终点坐标x,y  示例116.23456,39.34324
 * @param {string} wayPoints 途经点坐标x1,y1,x2,y2  示例116.23456,39.34324,116.23486,39.34394最多支持5个
 * @param {number} shpFlag 是否返回形状点 默认1  参数说明：0-不返回路线形状点列、1-返回分段路线形状点列、2-返回概略完整路线形状点列（按始点到终点顺序排列，用于高比例尺显示路线）、4-返回符合线路走向顺序的LinkId列、16-返回符合线路走向顺序的RTIC、32-返回符合线路走向顺序的路况信息、64-返回Link的限速值信息、128-返回概略诱导点、2052-返回link所在的segment中的形状点索引、8196-返回符合线路走向顺序的link长度
 * @param {number} costModel 驾驶策略 默认16 支持组合值相加 参数说明：1-考虑动态交通的最快、2-考虑动态交通的最短距离、4-考虑动态交通的最经济、8-绿色模式、16-不考虑动态交通的最快、32-不考虑动态交通的最短距离、64-most economical
 * @param {number} numAlt 返回结果数量（单策略时返回多条路径的个数，目前最大支持3条）  默认1
 * @param {number} criteria 路径场景 默认0  支持组合 值相加  参数说明：0-不规避、1-避开收费路段、2-避开高速、4-避开渡口、8-避开拼车道路、16-避开行驶许可道路、32-避开高架、64-避开隧道
 * @param {number} traffic 是否支持路况分段 默认0  参数说明：0-不支持路况分段 不转出clisttraffic、1-支持路况分段 路况分段clisttraffic
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryRouteDrivingResult('116.37959,39.86541','116.40411,40.04775',null,1,16,1,0,0,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryRouteDrivingResult = function (sPoint, ePoint, wayPoints, shpFlag, costModel, numAlt, criteria, traffic, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        sPoint: sPoint,
        ePoint: ePoint,
        wayPoints: wayPoints || null,
        shpFlag: shpFlag || 0,
        costModel: costModel || 16,
        numAlt: numAlt || 1,
        criteria: criteria || 0,
        traffic: traffic || 0,
        source: 1
    };
    let url = config.DOMAIN + '/service/route/driving?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据起终点进行公交路径规划搜索
 * @param {string} adminCode 行政区划编码
 * @param {string} sPoint 起点坐标x,y  示例116.23456,39.34324
 * @param {string} ePoint 终点坐标x,y  示例116.23456,39.34324
 * @param {number} strategy 换乘策略 默认0  参数说明：0-时间优先、1-换乘次数优先、2-地铁优先、3-步行距离优先
 * @param {number} shpInfoFlag 形状返回策略 默认1  参数说明：0-不返回形状信息、1-返回未压缩的形状信息、3-返回压缩的形状信息Base64编码
 * @param {number} showWalkInfo 显示步行信息的标识 默认0  参数说明：0-显示步行信息、1-不显示步行信息
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryRouteBusResult('110000','116.37959,39.86541','116.40411,40.04775',0,1,0,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryRouteBusResult = function (adminCode, sPoint, ePoint, strategy, shpInfoFlag, showWalkInfo, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        sPoint: sPoint,
        ePoint: ePoint,
        strategy: strategy || 0,
        shpInfoFlag: shpInfoFlag || 0,
        showWalkInfo: showWalkInfo || 0,
        source: 1
    };
    let url = config.DOMAIN + '/service/route/busTransfer?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据坐标点进行查找其所在的行政区划
 * @param {string} location 坐标点x,y
 * @param {number} geometry 是否返回行政区划标识  参数说明：0-不返回行政区划形状、1-返回行政区划形状
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryAdminResultByPoint('116.37959,39.86541',0,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryAdminResultByPoint = function (location, geometry, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        location: location,
        geometry: geometry || 0
    };
    let url = config.DOMAIN + '/service/search/adminByPoint?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据地址查找geocoding信息
 * @param {string} adminCode 行政区划编码
 * @param {string} address 查找地址
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryGeoCodingResult('110000','天安门',function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryGeoCodingResult = function (adminCode, address, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        address: address,
        source: 1
    };
    let url = config.DOMAIN + '/service/coder/geocoding?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据地址查找地址描述信息
 * @param {string} location 坐标点 x,y
 * @param {number} type 返回结果数据类型 默认1 参数说明：1-apt,poi data 门址或poi数据、2-nearest link data 最近link数据
 * @param {number} radius 搜索周边POI/APT的半径 默认 300米
 * @param {number} roadRadius 搜索周边道路的半径 默认 300米
 * @param {number} kind 最近道路是否考虑路名 参数说明：0-最近的道路不考虑是否有路名、1-最近的有名称的道路
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.queryReverseGeoCodingResult('116.37959,39.86541',1,1000,1000,0,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.queryReverseGeoCodingResult = function (location, type, radius, roadRadius, kind, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        location: location,
        type: type || 1,
        radius: radius || 300,
        roadRadius: roadRadius || 300,
        kind: kind || 0,
        source: 1
    };
    let url = config.DOMAIN + '/service/coder/reverseGeocoding?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据输入内容查找智能提示信息
 * @param {string} adminCode 行政区划编码
 * @param {string} input 输入字符串
 * @param {string} searchType 查找数据类型  默认all  参数说明：（all|area|busline|busstation|cross|poi|road）
 * @param {number} pageCount 返回的记录数 默认为10
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.querySmartTipsResult('110000','肯德','all',10,function (error,results) {
 *    //console.log(results);
 * });
 */
exports.querySmartTipsResult = function (adminCode, input, searchType, pageCount, callback) {
    let paramObj = {
        token: TOKEN_VALUE,
        adCode: adminCode,
        input: input,
        searchType: searchType || 'all',
        pageCount: pageCount || 10
    };
    let url = config.DOMAIN + '/service/tips/smartTips?' + joinParamToUrl(paramObj);
    return ajax.getJSON(url, callback);
};

/**
 * 根据输入首字母组合或者关键字查询名称
 * @param {string} name 首字母或关键字
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.searchNameByKey('pql',function (error,results) {
 *    console.log(results);
 * });
 */
exports.searchNameByKey = function (name, callback) {
    if(!name) return;
    let url = config.DOMAIN + '/service/searchnamebykey/' + name;
    return ajax.getJSON(url, callback);
};

/**
 * 通过道路名查询道路几何图形数据
 * @param {string} name 道路名
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.searchRoadByName('平泉路',function (error,results) {
 *    console.log(results);
 * });
 */
exports.searchRoadByName = function (name, callback) {
    if(!name) return;
    let url = config.DOMAIN + '/service/searchroadbyname/' + name;
    return ajax.getJSON(url, callback);
};

/**
 * 根据输入内容查找智能提示信息
 * @param {GeoJson} geometry 首字母或关键字
 * @param {string} minDistance 首字母或关键字
 * @param {Function} callback 回调函数 返回查询结果 示例function(error,result){}
 * @example
 * minemap.service.searchTrafficJam(geometry ,minDistance, function (error,results) {
 *    console.log(results);
 * });
 */
exports.searchTrafficJam = function (geometry ,mineDistance, callback) {
    if(!geometry||!mineDistance) return;
    let url = config.DOMAIN + '/service/searchtrafficjam/';
    return ajax.postJSON(url, {polygon:JSON.stringify(geometry),dis:mineDistance},callback);
};
