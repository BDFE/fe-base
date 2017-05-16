'use strict';

const StyleLayer = require('../style_layer');
const SpriteBucket = require('../../data/bucket/sprite_bucket');
const util = require('../../util/util');

class SpriteStyleLayer extends StyleLayer {

    getPaintValue(name, globalProperties, featureProperties) {
        const value = super.getPaintValue(name, globalProperties, featureProperties);

        // If the line is dashed, scale the dash lengths by the line
        // width at the previous round zoom level.
        if (value && name === 'sprite-dasharray') {
            const width = this.getPaintValue('sprite-width',
                    util.extend({}, globalProperties, {zoom: Math.floor(globalProperties.zoom)}), featureProperties);
            value.fromScale *= width;
            value.toScale *= width;
        }

        return value;
    }

    createBucket(options) {
        return new SpriteBucket(options);
    }
}

module.exports = SpriteStyleLayer;
