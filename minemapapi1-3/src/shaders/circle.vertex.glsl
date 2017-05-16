uniform mat4 u_matrix;
uniform bool u_scale_with_map;
uniform vec2 u_extrude_scale;

attribute vec2 a_pos;

#pragma minemap: define highp vec4 color
#pragma minemap: define mediump float radius
#pragma minemap: define lowp float blur
#pragma minemap: define lowp float opacity
#pragma minemap: define highp vec4 stroke_color
#pragma minemap: define mediump float stroke_width
#pragma minemap: define lowp float stroke_opacity

varying vec2 v_extrude;
varying lowp float v_antialiasblur;

void main(void) {
    #pragma minemap: initialize highp vec4 color
    #pragma minemap: initialize mediump float radius
    #pragma minemap: initialize lowp float blur
    #pragma minemap: initialize lowp float opacity
    #pragma minemap: initialize highp vec4 stroke_color
    #pragma minemap: initialize mediump float stroke_width
    #pragma minemap: initialize lowp float stroke_opacity

    // unencode the extrusion vector that we snuck into the a_pos vector
    v_extrude = vec2(mod(a_pos, 2.0) * 2.0 - 1.0);

    vec2 extrude = v_extrude * (radius + stroke_width) * u_extrude_scale;
    // multiply a_pos by 0.5, since we had it * 2 in order to sneak
    // in extrusion data
    gl_Position = u_matrix * vec4(floor(a_pos * 0.5), 0, 1);

    if (u_scale_with_map) {
        gl_Position.xy += extrude;
    } else {
        gl_Position.xy += extrude * gl_Position.w;
    }

    // This is a minimum blur distance that serves as a faux-antialiasing for
    // the circle. since blur is a ratio of the circle's size and the intent is
    // to keep the blur at roughly 1px, the two are inversely related.
    v_antialiasblur = 1.0 / DEVICE_PIXEL_RATIO / (radius + stroke_width);
}
