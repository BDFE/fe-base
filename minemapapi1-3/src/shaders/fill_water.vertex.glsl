attribute vec2 a_pos;

uniform mat4 u_matrix;

#pragma minemap: define lowp vec4 color
#pragma minemap: define lowp float opacity

void main() {
    #pragma minemap: initialize lowp vec4 color
    #pragma minemap: initialize lowp float opacity

    gl_Position = u_matrix * vec4(a_pos, 0, 1);
}
