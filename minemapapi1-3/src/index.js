'use strict';

const browser = require('./util/browser');

// jshint -W079
const minemap = module.exports = {};

minemap.version = require('../package.json').version;
minemap.workerCount = Math.max(Math.floor(browser.hardwareConcurrency / 2), 1);

minemap.Map = require('./ui/map');
minemap.Navigation = require('./ui/control/navigation_control');
minemap.Geolocate = require('./ui/control/geolocate_control');
minemap.Attribution = require('./ui/control/attribution_control');
minemap.Scale = require('./ui/control/scale_control');
minemap.Fullscreen = require('./ui/control/fullscreen_control');
minemap.Popup = require('./ui/popup');
minemap.Marker = require('./ui/marker');

minemap.Style = require('./style/style');

minemap.LngLat = require('./geo/lng_lat');
minemap.LngLatBounds = require('./geo/lng_lat_bounds');
minemap.Point = require('point-geometry');

minemap.Evented = require('./util/evented');
minemap.supported = require('./util/browser').supported;

minemap.util = {};
minemap.util.getJSON = require('./util/ajax').getJSON;
minemap.util.getArrayBuffer = require('./util/ajax').getArrayBuffer;
const config = require('./util/config');
minemap.config = config;

minemap.service = require('./util/service');

const rtlTextPlugin = require('./source/rtl_text_plugin');

minemap.setRTLTextPlugin = rtlTextPlugin.setRTLTextPlugin;

 /**
  * Sets the map's [RTL text plugin](https://www.minedata.cn/minemap-js/plugins/#minemap-rtl-text).
  * Necessary for supporting languages like Arabic and Hebrew that are written right-to-left.
  *
  * @function setRTLTextPlugin
  * @param {string} pluginURL URL pointing to the minemap text plugin source.
  * @param {Function} callback Called with an error argument if there is an error.
  * @example
  * minemap.setRTLTextPlugin('https://api.minedata.cn/minemap-js/plugins/minemap-rtl-text/v0.1.0/minemap-rtl-text.js');
  * @see [Add support for right-to-left scripts](https://www.minedata.cn/minemap-js/example/minemap-rtl-text/)
  */

 Object.defineProperty(minemap, 'accessToken', {
     get: function () {
         return config.ACCESS_TOKEN;
     },
     set: function (token) {
         config.ACCESS_TOKEN = token;
     }
 });
Object.defineProperty(minemap, 'solution', {
    get: function () {
        return config.SOLU;
    },
    set: function (solution) {
        config.SOLU = solution;
    }
});
Object.defineProperty(minemap, 'dataVersion', {
    get: function () {
        return config.DATA_VERSION;
    },
    set: function (dataVersion) {
        config.DATA_VERSION = dataVersion;
    }
});
Object.defineProperty(minemap, 'TRW', {
    get: function () {
        return config.TRW;
    },
    set: function (TRW) {
        config.TRW = TRW;
    }
});
Object.defineProperty(minemap, 'spriteUrl', {
    get: function () {
        return config.spriteUrl;
    },
    set: function (spriteUrl) {
        config.spriteUrl = spriteUrl;
    }
});
Object.defineProperty(minemap, 'fontsUrl', {
    get: function () {
        return config.fontsUrl;
    },
    set: function (spriteUrl) {
        config.fontsUrl = spriteUrl;
    }
});
Object.defineProperty(minemap, 'domainUrl', {
    get: function () {
        return config.DOMAIN;
    },
    set: function (domainUrl) {
        config.DOMAIN = domainUrl;
        config.API_URL = config.DOMAIN + config.API_BASE;
        config.DYN_URL = config.DOMAIN + config.DYN_BASE;
        config.MERGE_URL = config.DOMAIN + config.MERGE_BASE;
        config.DRIVING_ROUTE_URL = config.DOMAIN + config.DRIVING_ROUTE_BASE;
    }
});

/**
 * Gets and sets the map's [access token](https://www.minedata.cn/help/define-access-token/).
 *
 * @var {string} accessToken
 * @example
 * minemap.accessToken = myAccessToken;
 * @see [Display a map](https://www.minedata.cn/minemap-js/examples/)
 */

/**
 * The version of minemap js in use as specified in `package.json`,
 * `CHANGELOG.md`, and the GitHub release.
 *
 * @var {string} version
 */

/**
 * Returns a Boolean indicating whether the browser [supports minemap js](https://www.minedata.cn/help/minemap-browser-support/#minemap-js).
 *
 * @function supported
 * @param {Object} options
 * @param {boolean} [options.failIfMajorPerformanceCaveat=false] If `true`,
 *   the function will return `false` if the performance of minemap js would
 *   be dramatically worse than expected (i.e. a software renderer would be used).
 * @return {boolean}
 * @example
 * minemap.supported() // = true
 * @see [Check for browser support](https://www.minedata.cn/minemap-js/example/check-for-support/)
 */
