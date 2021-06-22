import { M3 } from "./m3";

export type M4 = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export type M4Column = [number, number, number, number];

function fromM3(m: M3): M4 {
    return [
        m[0], m[1], m[2], 0,
        m[3], m[4], m[5], 0,
        m[6], m[7], m[8], 0,
        0, 0, 0, 1
    ];
}

function translate(dx: number, dy: number) {
    return [
        1, 0, 0, dx,
        0, 1, 0, dy,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

// function scale() {

// }


export {
    fromM3,
    translate,
    // rotateX,
    // rotateY,
    // rotateZ,
    // rotate,
    // scale,
    // multiply,
    // inverse
}