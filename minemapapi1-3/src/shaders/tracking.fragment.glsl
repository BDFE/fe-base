#pragma minemap: define highp vec4 color
#pragma minemap: define lowp float blur
#pragma minemap: define lowp float opacity
//hack me
uniform float u_start;
uniform float u_end;
uniform float u_segments;

varying vec2 v_width2;
varying vec2 v_normal;
varying float v_gamma_scale;
varying float v_seq;

void main() {
    #pragma minemap: initialize highp vec4 color
    #pragma minemap: initialize lowp float blur
    #pragma minemap: initialize lowp float opacity
    //hack me
    if(v_seq<u_start || v_seq>u_end){
        discard;
    }
    mediump float drive_opacity = (v_seq - u_start) / u_segments;
        // Calculate the distance of the pixel from the line in pixels.
    float dist = length(v_normal) * v_width2.s;

        // Calculate the antialiasing fade factor. This is either when fading in
        // the line in case of an offset line (v_width2.t) or when fading out
        // (v_width2.s)
    float blur2 = (blur + 1.0 / DEVICE_PIXEL_RATIO) * v_gamma_scale;
    float alpha = clamp(min(dist - (v_width2.t - blur2), v_width2.s - dist) / blur2, 0.0, 1.0);
    vec4 tmpColor = vec4(color.xyz,0.25);
    gl_FragColor = tmpColor * (alpha * opacity) * drive_opacity;

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
