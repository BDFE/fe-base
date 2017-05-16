varying vec4 v_color;
#pragma minemap: define lowp float base
#pragma minemap: define lowp float height
#pragma minemap: define lowp vec4 color
varying float v_opacity;
void main() {
    #pragma minemap: initialize lowp float base
    #pragma minemap: initialize lowp float height
    #pragma minemap: initialize lowp vec4 color

    gl_FragColor = v_color * v_opacity;
}
