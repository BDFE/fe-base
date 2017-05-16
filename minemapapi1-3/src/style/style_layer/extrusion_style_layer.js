'use strict';

const StyleLayer = require('../style_layer');
const ExtrusionBucket = require('../../data/bucket/extrusion_bucket');

class ExtrusionStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        const value = super.getPaintValue(name, globalProperties, featureProperties);
        if (name === 'extrusion-color' && value) {
            value[3] = 1;
        }
        return value;
    }

    createBucket(options) {
        return new ExtrusionBucket(options);
    }
}

module.exports = ExtrusionStyleLayer;
