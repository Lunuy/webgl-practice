import Component from "./Component";

interface Position {
    x: number;
    y: number;
}
interface ClientPosition extends Position {}

class MouseInput implements Component {
    private canvas: HTMLCanvasElement;
    private mouseMoveListener = (e: MouseEvent) => {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
        this.x = (e.clientX - this.canvas.clientWidth/2)/(this.canvas.clientWidth/2);
        this.y = (this.canvas.clientHeight/2 - e.clientY)/(this.canvas.clientHeight/2);
    }
    private mouseOutListener = (e: MouseEvent) => {
        this.clientX = this.clientY = this.x = this.y = null;
    }
    private mouseDownListener = (e: MouseEvent) => {
        e.preventDefault();
        switch(e.button) {
            case 0:
                this.left = true;
                this.leftDown = true;
                break;
            case 2:
                this.right = true;
                this.rightDown = true;
                break;
        }
    };
    private mouseUpListener = (e: MouseEvent) => {
        e.preventDefault();
        switch(e.button) {
            case 0:
                this.left = false;
                this.leftUp = true;
                break;
            case 2:
                this.right = false;
                this.rightUp = true;
                break;
        }
    };

    public left: boolean = false;
    public leftDown: boolean = false;
    public leftUp: boolean = false;
    public right: boolean = false;
    public rightDown: boolean = false;
    public rightUp: boolean = false;
    public clientX: number | null = null;
    public clientY: number | null = null;
    public x: number | null = null;
    public y: number | null = null;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.init();
    }
    private init() {
        this.canvas.addEventListener('mousemove', this.mouseMoveListener);
        this.canvas.addEventListener('mouseout', this.mouseOutListener);
        this.canvas.addEventListener('mousedown', this.mouseDownListener);
        this.canvas.addEventListener('mouseup', this.mouseUpListener);
    }
    public update() {

    }
    public afterUpdate() {
        this.leftDown = false;
        this.leftUp = false;
        this.rightDown = false;
        this.rightUp = false;
    }
    public clean() {
        this.canvas.removeEventListener('mousemove', this.mouseMoveListener);
        this.canvas.removeEventListener('mouseout', this.mouseOutListener);
        this.canvas.removeEventListener('mousedown', this.mouseDownListener);
        this.canvas.removeEventListener('mouseup', this.mouseUpListener);
    }
}

export default MouseInput;