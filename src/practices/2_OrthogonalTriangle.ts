import { Shader } from '.';
import { mat4 } from 'gl-matrix';

const shader: Shader = {
    vertex: `
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_projection;

varying vec4 v_color;

void main() {
    gl_Position = u_projection * a_position;
    
    v_color = a_color;
}
    `,
    fragment: `
precision mediump float;

varying vec4 v_color;

void main() {
    gl_FragColor = v_color;
}
    `
};


function main(gl: WebGLRenderingContext, program: WebGLProgram, canvas: HTMLCanvasElement) {
    
    // shader attributes
    const positionAttribLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttribLocation = gl.getAttribLocation(program, 'a_color');
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // uniforms
    const projectionUniformLocation = gl.getUniformLocation(program, 'u_projection');

    // attrib buffers
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    const positions = [
        -0.5, -0.5, -1,
        -0.5, 0.5, -1,
        0.5, 0, -1
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
        positionAttribLocation, 3, gl.FLOAT, false, 0, 0
    );

    const colors = [
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
        colorAttribLocation, 4, gl.FLOAT, false, 0, 0
    );

    // uniform
    const projectionMatrix = mat4.create();
    gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);

    function render() {
        const aspectRatio = canvas.clientWidth / canvas.clientHeight;
        mat4.ortho(
            projectionMatrix,
            -aspectRatio, aspectRatio,
            -1, 1,
            0,
            10
        );
        gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function clean() {
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(colorBuffer);
    }

    return {
        render,
        clean
    };
}

export default {
    name: 'Orthogonal View Triangle',
    desc: 'Simple triangle(orthogonal projection matrix)',
    shader,
    main
};