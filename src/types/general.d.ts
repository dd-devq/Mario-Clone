abstract class State<T extends Phaser.Physics.Arcade.Sprite> {
    public parent: T
    constructor(parent: T) {
        this.parent = parent
    }

    public abstract Enter(): void

    public abstract Update(): void

    public abstract Exit(): void
}

type PlayerSpriteObj = {
    JUMP: {
        key: string
        path: string
    }
    FALL: {
        key: string
        path: string
    }
    HIT: {
        key: string
        path: string
    }
    IDLE: {
        key: string
        path: string
    }
    RUN: {
        key: string
        path: string
    }
    WALL_JUMP: {
        key: string
        path: string
    }
    DOUBLE_JUMP: {
        key: string
        path: string
    }
}

class Stack<T> {
    private data: T[] = []

    public push(value: T): void {
        this.data.push(value)
    }

    public pop(): T | undefined {
        return this.data.pop()
    }

    public top(): T | undefined {
        return this.data[this.data.length - 1]
    }

    public length(): number {
        return this.data.length
    }
}
