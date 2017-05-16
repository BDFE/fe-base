'use strict';

const StyleLayer = require('../style_layer');
const HistogramBucket = require('../../data/bucket/histogram_bucket');

class HistogramStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        const value = super.getPaintValue(name, globalProperties, featureProperties);
        if (name === 'histogram-color' && value) {
            value[3] = 1;
        }
        return value;
    }

    createBucket(options) {
        return new HistogramBucket(options);
    }
}

module.exports = HistogramStyleLayer;
