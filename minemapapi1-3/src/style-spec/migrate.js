'use strict';

/**
 * Migrate a minemap style to the latest version.
 *
 * @private
 * @alias migrate
 * @param {object} style a minemap style
 * @returns {Object} a migrated style
 * @example
 * var fs = require('fs');
 * var migrate = require('minemap-style-spec').migrate;
 * var style = fs.readFileSync('./style.json', 'utf8');
 * fs.writeFileSync('./style.json', JSON.stringify(migrate(style)));
 */
module.exports = function(style) {
    let migrated = false;

    if (style.version === 6) {
        style = require('./migrate/v7')(style);
        migrated = true;
    }

    if (style.version === 7 || style.version === 8) {
        style = require('./migrate/v8')(style);
        migrated = true;
    }

    if (!migrated) {
        throw new Error('cannot migrate from', style.version);
    }

    return style;
};
