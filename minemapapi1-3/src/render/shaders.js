'use strict';

const fs = require('fs');
const path = require('path');

// readFileSync calls must be written out long-form for brfs.
//hack me
module.exports = {
    prelude: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/_prelude.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/_prelude.vertex.glsl'), 'utf8')
    },
    circle: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/circle.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/circle.vertex.glsl'), 'utf8')
    },
    collisionBox: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/collision_box.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/collision_box.vertex.glsl'), 'utf8')
    },
    debug: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/debug.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/debug.vertex.glsl'), 'utf8')
    },
    fill: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/fill.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/fill.vertex.glsl'), 'utf8')
    },
    fillOutline: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_outline.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_outline.vertex.glsl'), 'utf8')
    },
    fillOutlinePattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_outline_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_outline_pattern.vertex.glsl'), 'utf8')
    },
    fillPattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_pattern.vertex.glsl'), 'utf8')
    },
    fillWater: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_water.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/fill_water.vertex.glsl'), 'utf8')
    },
    extrusion: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion.vertex.glsl'), 'utf8')
    },
    extrusionPattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_pattern.vertex.glsl'), 'utf8')
    },
    histogram: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/histogram.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/histogram.vertex.glsl'), 'utf8')
    },
    histogramColor: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/histogram_color.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/histogram_color.vertex.glsl'), 'utf8')
    },
    histogramPattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_pattern.vertex.glsl'), 'utf8')
    },
    extrusionTexture: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_texture.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/extrusion_texture.vertex.glsl'), 'utf8')
    },
    sprite: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/sprite.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/sprite.vertex.glsl'), 'utf8')
    },
    cubicline: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/cubicline.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/cubicline.vertex.glsl'), 'utf8')
    },
    tracking: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/tracking.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/tracking.vertex.glsl'), 'utf8')
    },
    line: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/line.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/line.vertex.glsl'), 'utf8')
    },
    linePattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/line_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/line_pattern.vertex.glsl'), 'utf8')
    },
    lineSDF: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/line_sdf.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/line_sdf.vertex.glsl'), 'utf8')
    },
    airline: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/airline.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/airline.vertex.glsl'), 'utf8')
    },
    airlinePattern: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/airline_pattern.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/airline_pattern.vertex.glsl'), 'utf8')
    },
    airlineSDF: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/airline_sdf.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/airline_sdf.vertex.glsl'), 'utf8')
    },
    raster: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/raster.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/raster.vertex.glsl'), 'utf8')
    },
    symbolIcon: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/symbol_icon.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/symbol_icon.vertex.glsl'), 'utf8')
    },
    symbolSDF: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/symbol_sdf.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/symbol_sdf.vertex.glsl'), 'utf8')
    },
    symtrackingIcon: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/symtracking_icon.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/symtracking_icon.vertex.glsl'), 'utf8')
    },
    symtrackingSDF: {
        fragmentSource: fs.readFileSync(path.join(__dirname, '../shaders/symtracking_sdf.fragment.glsl'), 'utf8'),
        vertexSource: fs.readFileSync(path.join(__dirname, '../shaders/symtracking_sdf.vertex.glsl'), 'utf8')
    }
};
