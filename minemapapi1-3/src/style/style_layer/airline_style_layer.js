'use strict';

const StyleLayer = require('../style_layer');
const AirlineBucket = require('../../data/bucket/airline_bucket');
const util = require('../../util/util');

class AirlineStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        const value = super.getPaintValue(name, globalProperties, featureProperties);

        // If the line is dashed, scale the dash lengths by the line
        // width at the previous round zoom level.
        if (value && name === 'airline-dasharray') {
            const width = this.getPaintValue('airline-width',
                    util.extend({}, globalProperties, {zoom: Math.floor(globalProperties.zoom)}), featureProperties);
            value.fromScale *= width;
            value.toScale *= width;
        }

        return value;
    }

    createBucket(options) {
        return new AirlineBucket(options);
    }
}

module.exports = AirlineStyleLayer;
