export abstract class State<T extends Phaser.Physics.Arcade.Sprite> {
    public parent: T
    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}
