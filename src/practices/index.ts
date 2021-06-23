
import Triangle from './1_Triangle';
import OrthogonalTriangle from './2_OrthogonalTriangle';

export interface Shader {
    vertex: string,
    fragment: string
}


export interface PracticeInfo {
    name: string;
    shader: Shader;
    main: (gl: WebGLRenderingContext, program: WebGLProgram, canvas: HTMLCanvasElement) => {
        update?: (dt: number) => void;
        render: () => void;
        clean?: () => void;
    },
    desc?: string;
}

const practiceInfos: PracticeInfo[] = [
    Triangle,
    OrthogonalTriangle
];

export default practiceInfos;