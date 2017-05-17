'use strict';

const StyleLayer = require('../style_layer');
const CubiclineBucket = require('../../data/bucket/cubicline_bucket');
const util = require('../../util/util');

class CubiclineStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        const value = super.getPaintValue(name, globalProperties, featureProperties);

        // If the line is dashed, scale the dash lengths by the line
        // width at the previous round zoom level.
        if (value && name === 'cubicline-dasharray') {
            const width = this.getPaintValue('cubicline-width',
                    util.extend({}, globalProperties, {zoom: Math.floor(globalProperties.zoom)}), featureProperties);
            value.fromScale *= width;
            value.toScale *= width;
        }

        return value;
    }

    createBucket(options) {
        return new CubiclineBucket(options);
    }
}

module.exports = CubiclineStyleLayer;
