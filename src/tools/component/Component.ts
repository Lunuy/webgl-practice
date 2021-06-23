

interface Component {
    update(): void;
    afterUpdate(): void;
    clean(): void;
}

export default Component;