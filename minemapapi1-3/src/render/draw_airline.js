'use strict';

const browser = require('../util/browser');
const pixelsToTileUnits = require('../source/pixels_to_tile_units');
const glMatrix = require('@minemap/gl-matrix');
const Buffer = require('../data/buffer');
const VertexArrayObject = require('./vertex_array_object');
const PosArray = require('../data/pos_array');
const pattern = require('./pattern');
const mat3 = glMatrix.mat3;
const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
var config = require('../util/config')
var offset = 0, segmentGroup = 20, discardLine = 0;
/**
 * Draw a line. Under the hood this will read elements from
 * a tile, dash textures from a lineAtlas, and style properties from a layer.
 * @param {Object} painter
 * @param {Object} layer
 * @param {Object} posMatrix
 * @param {Tile} tile
 * @returns {undefined} draws with the painter
 * @private
 */
module.exports = function drawAirline(painter, sourceCache, layer, coords) {
    if (painter.isOpaquePass) return;


    const gl = painter.gl;
    gl.disable(gl.STENCIL_TEST);
    gl.enable(gl.DEPTH_TEST);
    painter.depthMask(true);
    const texture = new ExtrusionTexture(gl, painter, layer);
    texture.bindFramebuffer();

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // don't draw zero-width lines
    if (layer.paint['airline-width'] <= 0) return;

    //hack me
    segmentGroup = layer.paint['airline-seg-group'] || 20;

    discardLine = layer.paint['airline-type'] === 'none' ? 0.0 : 1.0;

    if (layer.paint['airline-type'] === 'history') {
        if (!this.histCount) {
            this.histStart = new Date().getTime();
            this.histCount = 20;
        }

        this.histEnd = new Date().getTime();

        if ((this.histEnd - this.histStart) >= 1000.0 / layer.paint['airline-speed']) {
            this.histCount++;

            this.histCount %= layer.paint['airline-seg-count'];
            this.histCount === 0 ? this.histCount = 20 : null;
            //通知外部
            config.TRW ? config.TRW.setProgress(this.histCount) : null;

            this.histStart = this.histEnd;
        }

    } else {
        if (!this.count) {
            this.start = new Date().getTime();
            this.count = 1;
            //console.log('重新图层');
        }

        this.end = new Date().getTime();

        if ((this.end - this.start) >= 999 / layer.paint['airline-speed']) {
            //console.log(this.count);
            this.count += 1;
            this.count %= 120 + offset;

            if (this.count === offset + 90) {
                config.TRW ? config.TRW.request() : null;
            }

            if (this.count === 0) {
                config.TRW ? config.TRW.replace() : null;
                this.count = offset;
            }

            this.start = this.end;
        }

    }

    const programId =
        layer.paint['airline-dasharray'] ? 'airlineSDF' :
            layer.paint['airline-pattern'] ? 'airlinePattern' : 'airline';

    let prevTileZoom;
    let firstTile = true;

    for (const coord of coords) {
        const tile = sourceCache.getTile(coord);
        const bucket = tile.getBucket(layer);
        if (!bucket) continue;

        const layerData = bucket.buffers.layerData[layer.id];
        const prevProgram = painter.currentProgram;
        const program = painter.useProgram(programId, layerData.programConfiguration);
        const programChanged = firstTile || program !== prevProgram;
        const tileRatioChanged = prevTileZoom !== tile.coord.z;

        if (programChanged) {
            layerData.programConfiguration.setUniforms(painter.gl, program, layer, {zoom: painter.transform.zoom});
        }
        drawLineTile(program, painter, tile, bucket.buffers, layer, coord, layerData, programChanged, tileRatioChanged, layer.paint['airline-type'] === 'history' ? this.histCount : this.count);
        prevTileZoom = tile.coord.z;
        firstTile = false;
    }

    // Unbind the framebuffer as a render target and render it to the map
    texture.unbindFramebuffer();
    texture.renderToMap();
};

function drawLineTile(program, painter, tile, buffers, layer, coord, layerData, programChanged, tileRatioChanged, link_count) {
    const gl = painter.gl;
    const dasharray = layer.paint['airline-dasharray'];
    const image = layer.paint['airline-pattern'];

    let posA, posB, imagePosA, imagePosB;

    if (programChanged || tileRatioChanged) {
        const tileRatio = 1 / pixelsToTileUnits(tile, 1, painter.transform.tileZoom);

        if (dasharray) {
            posA = painter.lineAtlas.getDash(dasharray.from, layer.layout['airline-cap'] === 'round');
            posB = painter.lineAtlas.getDash(dasharray.to, layer.layout['airline-cap'] === 'round');

            const widthA = posA.width * dasharray.fromScale;
            const widthB = posB.width * dasharray.toScale;

            gl.uniform2f(program.u_patternscale_a, tileRatio / widthA, -posA.height / 2);
            gl.uniform2f(program.u_patternscale_b, tileRatio / widthB, -posB.height / 2);
            gl.uniform1f(program.u_sdfgamma, painter.lineAtlas.width / (Math.min(widthA, widthB) * 256 * browser.devicePixelRatio) / 2);

        } else if (image) {
            imagePosA = painter.spriteAtlas.getPosition(image.from, true);
            imagePosB = painter.spriteAtlas.getPosition(image.to, true);
            if (!imagePosA || !imagePosB) return;

            gl.uniform2f(program.u_pattern_size_a, imagePosA.size[0] * image.fromScale / tileRatio, imagePosB.size[1]);
            gl.uniform2f(program.u_pattern_size_b, imagePosB.size[0] * image.toScale / tileRatio, imagePosB.size[1]);
        }

        gl.uniform2f(program.u_gl_units_to_pixels, 1 / painter.transform.pixelsToGLUnits[0], 1 / painter.transform.pixelsToGLUnits[1]);
    }

    if (programChanged) {

        if (dasharray) {
            gl.uniform1i(program.u_image, 0);
            gl.activeTexture(gl.TEXTURE0);
            painter.lineAtlas.bind(gl);

            gl.uniform1f(program.u_tex_y_a, posA.y);
            gl.uniform1f(program.u_tex_y_b, posB.y);
            gl.uniform1f(program.u_mix, dasharray.t);

        } else if (image) {
            gl.uniform1i(program.u_image, 0);
            gl.activeTexture(gl.TEXTURE0);
            painter.spriteAtlas.bind(gl, true);

            gl.uniform2fv(program.u_pattern_tl_a, imagePosA.tl);
            gl.uniform2fv(program.u_pattern_br_a, imagePosA.br);
            gl.uniform2fv(program.u_pattern_tl_b, imagePosB.tl);
            gl.uniform2fv(program.u_pattern_br_b, imagePosB.br);
            gl.uniform1f(program.u_fade, image.t);
        }
        gl.uniform1f(program.u_width, layer.paint['airline-width']);
    }

    painter.enableTileClippingMask(coord);

    const posMatrix = painter.translatePosMatrix(coord.posMatrix, tile, layer.paint['airline-translate'], layer.paint['airline-translate-anchor']);
    gl.uniformMatrix4fv(program.u_matrix, false, posMatrix);

    gl.uniform1f(program.u_ratio, 1 / pixelsToTileUnits(tile, 1, painter.transform.zoom));

    //hack me
    gl.uniform1f(program.u_start, link_count - segmentGroup);
    gl.uniform1f(program.u_end, link_count);
    gl.uniform1f(program.u_segments, segmentGroup);
    gl.uniform1f(program.u_discard, discardLine);

    for (const segment of buffers.segments) {
        segment.vaos[layer.id].bind(gl, program, buffers.layoutVertexBuffer, buffers.elementBuffer, layerData.paintVertexBuffer, segment.vertexOffset);
        gl.drawElements(gl.TRIANGLES, segment.primitiveLength * 3, gl.UNSIGNED_SHORT, segment.primitiveOffset * 3 * 2);
    }
}
function ExtrusionTexture(gl, painter, layer) {
    this.gl = gl;
    this.width = painter.width;
    this.height = painter.height;
    this.painter = painter;
    this.layer = layer;

    this.texture = null;
    this.fbo = null;
    this.fbos = this.painter.preFbos[this.width] && this.painter.preFbos[this.width][this.height];
}

ExtrusionTexture.prototype.bindFramebuffer = function () {
    const gl = this.gl;

    this.texture = this.painter.getViewportTexture(this.width, this.height);

    gl.activeTexture(gl.TEXTURE1);
    if (!this.texture) {
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        this.texture.width = this.width;
        this.texture.height = this.height;
    } else {
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
    }

    if (!this.fbos) {
        this.fbo = gl.createFramebuffer();
        const stencil = gl.createRenderbuffer();
        const depthRenderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, stencil);
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, this.width, this.height);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, stencil);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    } else {
        this.fbo = this.fbos.pop();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    }
};

ExtrusionTexture.prototype.unbindFramebuffer = function () {
    this.painter.bindDefaultFramebuffer();
    if (this.fbos) {
        this.fbos.push(this.fbo);
    } else {
        if (!this.painter.preFbos[this.width]) this.painter.preFbos[this.width] = {};
        this.painter.preFbos[this.width][this.height] = [this.fbo];
    }
    this.painter.saveViewportTexture(this.texture);
};

ExtrusionTexture.prototype.renderToMap = function () {
    const gl = this.gl;
    const painter = this.painter;
    const program = painter.useProgram('extrusionTexture');

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.uniform1f(program.u_opacity, 1.0);
    gl.uniform1i(program.u_texture, 1);

    gl.uniformMatrix4fv(program.u_matrix, false, mat4.ortho(
        mat4.create(),
        0,
        painter.width,
        painter.height,
        0,
        0,
        1)
    );

    gl.disable(gl.DEPTH_TEST);

    gl.uniform1i(program.u_xdim, painter.width);
    gl.uniform1i(program.u_ydim, painter.height);

    const array = new PosArray();
    array.emplaceBack(0, 0);
    array.emplaceBack(painter.width, 0);
    array.emplaceBack(0, painter.height);
    array.emplaceBack(painter.width, painter.height);
    const buffer = Buffer.fromStructArray(array, Buffer.BufferType.VERTEX);

    const vao = new VertexArrayObject();
    vao.bind(gl, program, buffer);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    gl.enable(gl.DEPTH_TEST);
};
