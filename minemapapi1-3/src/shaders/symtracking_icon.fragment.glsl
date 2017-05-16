uniform sampler2D u_texture;
uniform sampler2D u_fadetexture;

#pragma minemap: define lowp float opacity

varying vec2 v_tex;
varying vec2 v_fade_tex;
varying float v_seq;

void main() {
    #pragma minemap: initialize lowp float opacity
    if(v_seq<0.0){
            discard;
    }

    lowp float alpha = texture2D(u_fadetexture, v_fade_tex).a * opacity;
    gl_FragColor = texture2D(u_texture, v_tex) * alpha;

#ifdef OVERDRAW_INSPECTOR
    gl_FragColor = vec4(1.0);
#endif
}
