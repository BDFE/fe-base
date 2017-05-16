#pragma minemap: define highp vec4 color
#pragma minemap: define mediump float radius
#pragma minemap: define lowp float blur
#pragma minemap: define lowp float opacity
#pragma minemap: define highp vec4 stroke_color
#pragma minemap: define mediump float stroke_width
#pragma minemap: define lowp float stroke_opacity

varying vec2 v_extrude;
varying lowp float v_antialiasblur;

void main() {
    #pragma minemap: initialize highp vec4 color
    #pragma minemap: initialize mediump float radius
    #pragma minemap: initialize lowp float blur
    #pragma minemap: initialize lowp float opacity
    #pragma minemap: initialize highp vec4 stroke_color
    #pragma minemap: initialize mediump float stroke_width
    #pragma minemap: initialize lowp float stroke_opacity

    float extrude_length = length(v_extrude);
    float antialiased_blur = -max(blur, v_antialiasblur);

    float opacity_t = smoothstep(0.0, antialiased_blur, extrude_length - 1.0);

    float color_t = stroke_width < 0.01 ? 0.0 : smoothstep(
        antialiased_blur,
        0.0,
        extrude_length - radius / (radius + stroke_width)
    );

    gl_FragColor = opacity_t * mix(color * opacity, stroke_color * stroke_opacity, color_t);

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
