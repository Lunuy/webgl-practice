
// Referenced https://webglfundamentals.org/webgl/lessons/ko/webgl-3d-orthographic.html

export type M3 = [number, number, number, number, number, number, number, number, number];
export type M3Column = [number, number, number];

function translate(dx: number, dy: number): M3 {
    return [
        1, 0, dx,
        0, 1, dy,
        0, 0, 1
    ];
}

function rotate(angle: number): M3 {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return [
        c, -s, 0,
        s, c, 0,
        0, 0, 1
    ];
}

function scale(sx: number, sy: number): M3 {
    return [
        sx, 0, 0,
        0, sy, 0,
        0, 0, 1
    ];
}

function multiply<B extends M3 | M3Column>(a: M3, b: B): B extends M3 ? M3 : M3Column {
    if(b.length === 3) {
        return [
            a[0]*b[0] + a[1]*b[1] + a[2]*b[2],
            a[3]*b[0] + a[4]*b[1] + a[5]*b[2],
            a[6]*b[0] + a[7]*b[1] + a[8]*b[2]
        ] as any;
    } else {
        return [
            a[0]*b[0] + a[1]*b[3] + a[2]*b[6],
            a[0]*b[1] + a[1]*b[4] + a[2]*b[7],
            a[0]*b[2] + a[1]*b[5] + a[2]*b[8],
            a[3]*b[0] + a[4]*b[3] + a[5]*b[6],
            a[3]*b[1] + a[4]*b[4] + a[5]*b[7],
            a[3]*b[2] + a[4]*b[5] + a[5]*b[8],
            a[6]*b[0] + a[7]*b[3] + a[8]*b[6],
            a[6]*b[1] + a[7]*b[4] + a[8]*b[7],
            a[6]*b[2] + a[7]*b[5] + a[8]*b[8],
        ] as any;
    }
}

function inverse(m: M3): M3 {
    const det = m[0] * (m[4] * m[8] - m[7] * m[5]) -
                m[1] * (m[3] * m[8] - m[5] * m[6]) +
                m[2] * (m[3] * m[7] - m[4] * m[6]);
    return [
        (m[4] * m[8] - m[7] * m[5]) / det,
        (m[2] * m[7] - m[1] * m[8]) / det,
        (m[1] * m[5] - m[2] * m[4]) / det,
        (m[5] * m[6] - m[3] * m[8]) / det,
        (m[0] * m[8] - m[2] * m[6]) / det,
        (m[3] * m[2] - m[0] * m[5]) / det,
        (m[3] * m[7] - m[6] * m[4]) / det,
        (m[6] * m[1] - m[0] * m[7]) / det,
        (m[0] * m[4] - m[3] * m[1]) / det
    ];
}

export {
    translate,
    rotate,
    scale,
    multiply,
    inverse
};