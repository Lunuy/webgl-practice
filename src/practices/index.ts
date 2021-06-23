
import Component from '../tools/component/Component';
import Triangle from './1_Triangle';
import OrthogonalTriangle from './2_OrthogonalTriangle';
import CamMove from './3_CamMove';

export interface Shader {
    vertex: string,
    fragment: string
}


export interface PracticeInfo {
    name: string;
    desc?: string;
    shader: Shader;
    main: (gl: WebGLRenderingContext, program: WebGLProgram, canvas: HTMLCanvasElement) => {
        update?: () => void;
        render: () => void;
        clean?: () => void;
        components?: Component[];
    };
}

const practiceInfos: PracticeInfo[] = [
    Triangle,
    OrthogonalTriangle,
    CamMove
];

export default practiceInfos;