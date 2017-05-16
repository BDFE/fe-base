uniform mat4 u_matrix;
uniform vec3 u_lightcolor;
uniform lowp vec3 u_lightpos;
uniform lowp float u_lightintensity;

attribute vec2 a_pos;
attribute vec3 a_normal;
attribute float a_edgedistance;

#pragma minemap: define lowp float base
#pragma minemap: define lowp float height

#pragma minemap: define lowp vec4 color

varying float v_opacity;
varying float v_height;
varying float v_directional;

void main() {
    #pragma minemap: initialize lowp float base
    #pragma minemap: initialize lowp float height
    #pragma minemap: initialize lowp vec4 color

    float ed = a_edgedistance; // use each attrib in order to not trip a VAO assert
    float t = mod(a_normal.x, 2.0);

    gl_Position = u_matrix * vec4(a_pos, t > 0.0 ? height * 3.0 : base * 3.0, 1);
    if(t > 0.0){
        v_opacity = 1.2;
        v_height = height*3.0;
    }else{
        v_opacity = 0.1;
        v_height = 0.0;
    }

    // Relative luminance (how dark/bright is the surface color?)
    float colorvalue = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;

    // Calculate cos(theta), where theta is the angle between surface normal and diffuse light ray
    float directional = clamp(dot(a_normal / 16384.0, u_lightpos), 0.0, 1.0);

    // Adjust directional so that
    // the range of values for highlight/shading is narrower
    // with lower light intensity
    // and with lighter/brighter surface colors
    directional = mix((1.0 - u_lightintensity), max((1.0 - colorvalue + u_lightintensity), 1.0), directional);
    if (a_normal.y != 0.0) {
        directional *= clamp((t + base) * pow(height / 150.0, 0.5), mix(0.7, 0.98, 1.0 - u_lightintensity), 1.0);
    }

    v_directional = directional;

}
