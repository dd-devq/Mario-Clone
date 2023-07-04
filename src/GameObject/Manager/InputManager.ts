export class InputManager {
    private static instance: InputManager

    private scene: Phaser.Scene
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys

    public initialize(scene: Phaser.Scene): void {
        this.scene = scene

        if (this.scene.input.keyboard?.createCursorKeys() !== undefined) {
            this.cursors = this.scene.input.keyboard?.createCursorKeys()
        }
    }

    static get Instance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager()
        }

        return InputManager.instance
    }

    public isLeftKeyPressed(): boolean {
        return this.cursors.left.isDown
    }

    public isRightKeyPressed(): boolean {
        return this.cursors.right.isDown
    }

    public isUpKeyPressed(): boolean {
        return this.cursors.up.isDown
    }

    public isDownKeyPressed(): boolean {
        return this.cursors.down.isDown
    }

    public isSpaceKeyPressed(): boolean {
        return this.cursors.space.isDown
    }
}
