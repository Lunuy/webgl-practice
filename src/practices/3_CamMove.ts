import { Shader } from '.';
import { mat3, mat4, vec3 } from 'gl-matrix';
import KeyboardInput from '../tools/component/KeyboardInput';
import Time from '../tools/component/Time';

const shader: Shader = {
    vertex: `
attribute vec4 a_position;
attribute vec4 a_color;

uniform mat4 u_projection;
uniform mat4 u_invcam;

varying vec4 v_color;

void main() {
    gl_Position = u_projection * u_invcam * a_position;
    
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

    // components
    const keyboardInput = new KeyboardInput(canvas);
    const time = new Time();
    
    // shader attributes
    const positionAttribLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttribLocation = gl.getAttribLocation(program, 'a_color');
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // uniforms
    const projectionUniformLocation = gl.getUniformLocation(program, 'u_projection');
    const invCamUniformLocation = gl.getUniformLocation(program, 'u_invcam');

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
    const camMatrix = mat4.create();
    const invCamMatrix = mat4.create();
    mat4.invert(invCamMatrix, camMatrix);

    // temporary
    const translateVector = vec3.create();

    function update() {
        // move
        const dx = 0.005 * time.dt * (keyboardInput.pressed['d'] ? 1 : (keyboardInput.pressed['a'] ? -1 : 0));
        const dy = 0.005 * time.dt * (keyboardInput.pressed['w'] ? 1 : (keyboardInput.pressed['s'] ? -1 : 0));
        // vec3.transformMat3(translateVector, vec3.fromValues(dx, dy, 0), mat3.fromMat4(mat3.create(), camMatrix));
        // const clone = mat4.clone(camMatrix);
        vec3.set(translateVector, dx, dy, 0);
        mat4.translate(camMatrix, camMatrix, translateVector);

        // rotation
        const dr = 1/1000 * Math.PI * time.dt * (keyboardInput.pressed['q'] ? 1 : (keyboardInput.pressed['e'] ? -1 : 0));
        mat4.rotate(camMatrix, camMatrix, dr, vec3.fromValues(0, 0, 1));
    }
    function render() {
        const aspectRatio = canvas.clientWidth / canvas.clientHeight;
        mat4.invert(invCamMatrix, camMatrix);
        mat4.ortho(
            projectionMatrix,
            -aspectRatio, aspectRatio,
            -1, 1,
            0,
            10
        );
        gl.uniformMatrix4fv(projectionUniformLocation, false, projectionMatrix);
        gl.uniformMatrix4fv(invCamUniformLocation, false, invCamMatrix);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function clean() {
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(colorBuffer);
    }

    return {
        update,
        render,
        clean,
        components: [keyboardInput, time]
    };
}

export default {
    name: 'Cam Move',
    desc: 'Cam Moving using mat4.translate',
    shader,
    main
};