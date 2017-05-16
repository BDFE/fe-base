varying vec4 v_color;
#pragma minemap: define lowp float base
#pragma minemap: define lowp float height
#pragma minemap: define highp vec4 color

void main() {
    #pragma minemap: initialize lowp float base
    #pragma minemap: initialize lowp float height
    #pragma minemap: initialize highp vec4 color

    gl_FragColor = v_color;

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
