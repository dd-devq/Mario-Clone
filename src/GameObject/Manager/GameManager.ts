import { Player } from '../Player/Player'

export class GameManager {
    public player: Player
    private scene: Phaser.Scene
    private static instance: GameManager

    static get Instance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }

        return GameManager.instance
    }

    public initialize(scene: Phaser.Scene): void {
        this.scene = scene
    }

    public addScore(): void {
        //
    }

    public saveScore(): void {
        //
    }

    public update(): void {
        if (this.player.isDead) {
            this.scene.cameras.main.setAlpha(0)
            this.scene.scene.restart()
        }
        this.player.update()
    }
}
