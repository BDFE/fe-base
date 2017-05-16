#pragma minemap: define highp vec4 outline_color
#pragma minemap: define lowp float opacity

varying vec2 v_pos;

void main() {
    #pragma minemap: initialize highp vec4 outline_color
    #pragma minemap: initialize lowp float opacity

    float dist = length(v_pos - gl_FragCoord.xy);
    float alpha = smoothstep(1.0, 0.0, dist);
    gl_FragColor = outline_color * (alpha * opacity);

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
