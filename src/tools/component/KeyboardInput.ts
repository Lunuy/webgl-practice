import Component from "./Component";


class KeyboardInput implements Component {
    private canvas: HTMLCanvasElement;
    private keyDownListener = (e: KeyboardEvent) => {
        this.down[e.key] = true;
        this.pressed[e.key] = true;
    };
    private keyUpListener = (e: KeyboardEvent) => {
        this.up[e.key] = true;
        this.pressed[e.key] = undefined;
    };
    public down: { [key: string]: true | undefined } = {};
    public up: { [key: string]: true | undefined } = {};
    public pressed: { [key: string]: true | undefined } = {};
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.init();
    }
    private init() {
        this.canvas.tabIndex = 0;
        this.canvas.focus();
        this.canvas.addEventListener('keydown', this.keyDownListener);
        this.canvas.addEventListener('keyup', this.keyUpListener);
    }
    update() {}
    afterUpdate() {
        for(const key in this.down)
            this.down[key] = undefined;
        for(const key in this.up)
            this.up[key] = undefined;
    }
    clean() {
        this.canvas.removeEventListener('keydown', this.keyDownListener);
        this.canvas.removeEventListener('keyup', this.keyUpListener);
    }
}

export default KeyboardInput;