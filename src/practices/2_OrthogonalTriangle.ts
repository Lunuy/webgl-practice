import { Shader } from ".";


const shader: Shader = {
    vertex: `
attribute vec4 a_position;
attribute vec4 a_color;

varying vec4 v_color;

void main() {
    gl_Position = a_position;
    
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


function main(gl: WebGLRenderingContext, program: WebGLProgram) {
    
    // shader attributes
    const positionAttribLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttribLocation = gl.getAttribLocation(program, 'a_color');
    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);

    // buffers
    const positionBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();

    const positions = [
        -0.5, -0.5,
        -0.5, 0.5,
        0.5, 0
    ];
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(
        positionAttribLocation, 2, gl.FLOAT, false, 0, 0
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

    // TODO: add uniform to shader - orthogonal matrix


    // loop
    function render() {
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function clean() {
        gl.deleteBuffer(positionBuffer);
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