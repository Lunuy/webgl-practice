
import { useEffect, useRef, useState } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import practiceInfos from '../practices';
import { createProgram, createShader } from '../tools/webgl';

const OuterDiv = styled.div`
`;

const Canvas = styled.canvas`
display: block;
outline: none;
`;

const ErrorLog = styled.pre`
background-color: black;
color: lightgreen;
`;

const Box = styled.div`
border: black solid 1px;
position: absolute;
right: 0;
top: 0;
width: 200px;
`;

const Info = styled.div`
padding-left: 10px;
`;


interface PracticeError {
    title: string;
    vertex?: string;
    fragment?: string;
    program?: string;
}

function Practice() {
    const { params: { id } }: { params: { id: string } } = useRouteMatch();
    
    if(!(/[0-9]+/.test(id) && (id in practiceInfos)))
        return <Redirect to="/404"/>
    
    const practiceInfo = practiceInfos[id as unknown as number];
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glRef = useRef<WebGLRenderingContext>();
    const [error, setError] = useState<PracticeError | null>(null);

    useEffect(() => {
        if(!canvasRef.current) return;

        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if(gl === null) {
            setError({
                title: `WebGL context creation failed.`
            });
            return;
        }
        glRef.current = gl;

        // shader
        const [vertexShader, v_success] = createShader(gl, gl.VERTEX_SHADER, practiceInfo.shader.vertex);
        const [fragmentShader, f_success] = createShader(gl, gl.FRAGMENT_SHADER, practiceInfo.shader.fragment);
        if(!(v_success && f_success)) {
            setError({
                title: `Shader compile error occured.`,
                vertex: gl.getShaderInfoLog(vertexShader) ?? undefined,
                fragment: gl.getShaderInfoLog(fragmentShader) ?? undefined
            });
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return;
        }

        // program
        const [program, p_success] = createProgram(gl, vertexShader, fragmentShader);
        if(!p_success) {
            setError({
                title: `Program link error occured.`,
                program: gl.getProgramInfoLog(program) ?? undefined
            });
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteProgram(program);
            return;
        }

        
        // essential event listeners
        const resize = () => {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth - 180;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        window.addEventListener('resize', resize);
        resize();


        // prepare to render
        gl.useProgram(program);

        
        // main loop(update - render)
        const {
            update,
            render,
            clean,
            components = []
        } = practiceInfo.main(gl, program, canvas);

        let ended = false;
        const frame = () => {
            if(ended) return;

            components.forEach(component => component.update());
            update?.();
            components.forEach(component => component.afterUpdate());

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            render();

            requestAnimationFrame(frame);
        }
        frame();


        // clean
        return () => {
            ended = true;
            clean?.();
            components.forEach(component => component.clean());
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteProgram(program);
        };
    }, [canvasRef.current, id]);

    if(error) {
        return (
            <OuterDiv>
                <h1>{error.title}</h1>
                <h2>Vertex Shader</h2>
                <ErrorLog>{error.vertex}</ErrorLog>
                <h2>Fragment Shader</h2>
                <ErrorLog>{error.fragment}</ErrorLog>
                <h2>Program</h2>
                <ErrorLog>{error.program}</ErrorLog>
            </OuterDiv>
        );
    }

    return (
        <OuterDiv>
            <Canvas ref={canvasRef}/>
            <Box>
                <Info>
                    <h1>{practiceInfo.name}</h1>
                    <p>{practiceInfo.desc}</p>
                </Info>
            </Box>
        </OuterDiv>
    )
}

export default Practice;