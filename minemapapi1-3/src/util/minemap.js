'use strict';
// @flow

const config = require('./config');
const browser = require('./browser');
const version = require('../../package.json').version;

const help = '参见minedata.cn帮助页面';

type UrlObject = {|
    protocol: string,
    authority: string,
    path: string,
    params: Array<string>
|};

function makeAPIURL(urlObject: UrlObject, accessToken, solu, dataVersion): string {

    switch (urlObject.protocol) {
        case 'minemap':
            const srcUrlObject = parseUrl(config.SRC_URL);
            urlObject.protocol = srcUrlObject.protocol;
            urlObject.authority = srcUrlObject.authority;
            break;
        case 'minemapdata':
            const apiUrlObject = parseUrl(config.API_URL);
            urlObject.path = apiUrlObject.path + urlObject.authority + urlObject.path;
            urlObject.protocol = apiUrlObject.protocol;
            urlObject.authority = apiUrlObject.authority;
            break;
        case 'minemapdatad':
            const dynUrlObject = parseUrl(config.DYN_URL);
            urlObject.path = dynUrlObject.path + urlObject.authority + urlObject.path;
            urlObject.protocol = dynUrlObject.protocol;
            urlObject.authority = dynUrlObject.authority;
            break;
        case 'minemapdatam':
            const mergeUrlObject = parseUrl(config.MERGE_URL);
            urlObject.path = mergeUrlObject.path + urlObject.authority + urlObject.path;
            urlObject.protocol = mergeUrlObject.protocol;
            urlObject.authority = mergeUrlObject.authority;
            break;
    }

    if (!config.REQUIRE_ACCESS_TOKEN) return formatUrl(urlObject);

    accessToken = accessToken || config.ACCESS_TOKEN;
    solu = solu || config.SOLU;
    dataVersion = dataVersion || config.DATA_VERSION;

    if (!accessToken)
        throw new Error(`需要申请accessToken. ${help}`);

    urlObject.params.push(`token=${accessToken}`);
    urlObject.params.push(`solu=${solu}`);
    if (dataVersion) {
        urlObject.params.push(`version=${dataVersion}`);
    }
    return formatUrl(urlObject);
}

function isMinemapURL(url: string) {
    return url.indexOf('minemap:') === 0 || url.indexOf('minemapdata:') === 0 || url.indexOf('minemapdatad:') === 0 || url.indexOf('minemapdatam:') === 0;
}

exports.isMinemapURL = isMinemapURL;

exports.normalizeStyleURL = function (url: string, accessToken: string): string {
    if (!isMinemapURL(url)) return url;
    const urlObject = parseUrl(url);
    urlObject.path = `/styles/v1${urlObject.path}`;
    return makeAPIURL(urlObject, accessToken);
};

exports.normalizeGlyphsURL = function (url: string, accessToken: string): string {
    if (!isMinemapURL(url) && !config.fontsUrl) return url;
    const urlObject = parseUrl(url);
    //urlObject.path = `/minemapapi/${getVersion()}/fonts${urlObject.path.substr(urlObject.path.lastIndexOf('\/'))}.pbf`;
    //return makeAPIURL(urlObject, accessToken);
    return (config.fontsUrl && (config.fontsUrl + `/{fontstack}${urlObject.path.substr(urlObject.path.lastIndexOf('\/'))}.pbf`)) || `${config.SRC_URL}fonts/{fontstack}/${urlObject.path.substr(urlObject.path.lastIndexOf('\/'))}.pbf`;
};

function getVersion() {
    return 'v' + version.substr(version.indexOf('\.') + 1)
}

exports.normalizeSourceURL = function (url: string, accessToken: string): string {
    if (!isMinemapURL(url)) return url;
    const urlObject = parseUrl(url);
    urlObject.path = `/v4/${urlObject.authority}.json`;
    // TileJSON requests need a secure flag appended to their URLs so
    // that the server knows to send SSL-ified resource references.
    urlObject.params.push('secure');
    return makeAPIURL(urlObject, accessToken);
};

exports.normalizeSpriteURL = function (url: string, format: string, extension: string, accessToken: string): string {

    if (!isMinemapURL(url) && !config.spriteUrl) {
        let tmp = url + `${format}${extension}`;
        return tmp;
    }
    const urlObject = parseUrl(url);
    urlObject.path = `/minemapapi/${getVersion()}${urlObject.path}/sprite${format}${extension}`;

    return (config.spriteUrl && (config.spriteUrl + `${format}${extension}`)) || config.DOMAIN + urlObject.path;
};

const imageExtensionRe = /(\.(png|jpg)\d*)(?=$)/;

exports.normalizeTileURL = function (tileURL: string, sourceURL?: ?string, tileSize?: ?number): string {
    //if (!sourceURL || !isMinemapURL(sourceURL)) return tileURL;
    if (!tileURL || !isMinemapURL(tileURL)) return tileURL;

    const urlObject = parseUrl(tileURL);

    // The v4 minemap tile API supports 512x512 image tiles only when @2x
    // is appended to the tile URL. If `tileSize: 512` is specified for
    // a minemap raster source force the @2x suffix even if a non hidpi device.
    const suffix = browser.devicePixelRatio >= 2 || tileSize === 512 ? '@2x' : '';
    const extension = browser.supportsWebp ? '.webp' : '$1';
    urlObject.path = urlObject.path.replace(imageExtensionRe, `${suffix}${extension}`);

    replaceTempAccessToken(urlObject.params);
    return makeAPIURL(urlObject);
};

function replaceTempAccessToken(params: Array<string>) {
    for (let i = 0; i < params.length; i++) {
        if (params[i].indexOf('access_token=tk.') === 0) {
            params[i] = `access_token=${config.ACCESS_TOKEN || ''}`;
        }
    }
}

const urlRe = /^(\w+):\/\/([^/?]+)(\/[^?]+)?\??(.+)?/;

function parseUrl(url: string): UrlObject {
    const parts = url.match(urlRe);
    if (!parts) {
        throw new Error('Unable to parse URL object');
    }
    return {
        protocol: parts[1],
        authority: parts[2],
        path: parts[3] || '/',
        params: parts[4] ? parts[4].split('&') : []
    };
}

function formatUrl(obj: UrlObject): string {
    const params = obj.params.length ? `?${obj.params.join('&')}` : '';
    return `${obj.protocol}://${obj.authority}${obj.path}${params}`;
}
