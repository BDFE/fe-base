
#pragma minemap: define lowp float base
#pragma minemap: define lowp float height
#pragma minemap: define lowp vec4 color

uniform vec4 u_color_a;
uniform vec4 u_color_b;
uniform vec4 u_color_c;
uniform vec4 u_color_d;
uniform vec4 u_color_e;
uniform float u_max_height;

varying float v_opacity;
varying float v_height;
varying float v_directional;

void main() {
    #pragma minemap: initialize lowp float base
    #pragma minemap: initialize lowp float height
    #pragma minemap: initialize lowp vec4 color

    if (v_height < 0.25 * u_max_height) {
            vec4 tmp = u_color_b - u_color_a;
            vec4 real = tmp * ((v_height) / 0.25 / u_max_height) + u_color_a;
            gl_FragColor = vec4(real.rgb * v_directional, 1.0);
        } else if (v_height < 0.5 * u_max_height) {
            vec4 tmp = u_color_c - u_color_b;
            vec4 real = tmp * ((v_height - 0.25 * u_max_height) / 0.25 / u_max_height) + u_color_b;
            gl_FragColor = vec4(real.rgb * v_directional, 1.0);
        } else if (v_height < 0.75 * u_max_height) {
            vec4 tmp = u_color_d - u_color_c;
            vec4 real = tmp * ((v_height - 0.5 * u_max_height) / 0.25 / u_max_height) + u_color_c;
            gl_FragColor = vec4(real.rgb * v_directional, 1.0);
        } else if (v_height < 0.8 * u_max_height){
            vec4 tmp = u_color_e - u_color_d;
            vec4 real = tmp * ((v_height - 0.75 * u_max_height) / 0.25 / u_max_height) + u_color_d;
            gl_FragColor = vec4(real.rgb * v_directional, 1.0);
        } else{
            gl_FragColor = vec4(u_color_e.rgb * v_directional, 1.0);
        }

    //gl_FragColor = v_color * v_opacity;
}
