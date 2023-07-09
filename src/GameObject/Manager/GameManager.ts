import { playerAnimationKey } from '../../Constant/AnimationKey'
import { sceneKey } from '../../Constant/SceneKey'
import { Player } from '../Player/Player'

export class GameManager {
    public player: Player
    private scene: Phaser.Scene
    private static instance: GameManager
    public winZone: Phaser.GameObjects.Rectangle
    public startZone: Phaser.GameObjects.Rectangle

    private score: number

    static get Instance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager()
        }

        return GameManager.instance
    }

    public initialize(scene: Phaser.Scene): void {
        this.scene = scene
        this.score = 0
    }

    public retrieveHighScore(): number {
        const itemKey = 'highScore' + this.scene.scene.key
        const score = localStorage.getItem(itemKey)
        return score ? parseInt(score) : 0
    }

    public addScore(score: number): void {
        this.score += score
    }

    public saveHighScore(highScore: number): void {
        const itemKey = 'highScore' + this.scene.scene.key
        localStorage.setItem(itemKey, highScore.toString())
    }

    public isPlayerWin(): boolean {
        return (
            Phaser.Geom.Intersects.RectangleToRectangle(
                this.player.getBounds(),
                this.winZone.getBounds()
            ) &&
            GameManager.Instance.player.playerStateStack.top() ==
                GameManager.Instance.player.playerState.get(playerAnimationKey.IDLE)
        )
    }

    public update(): void {
        if (this.player.isDead) {
            this.scene.cameras.main.setAlpha(0)
            this.scene.scene.restart()
        }
        if (this.isPlayerWin()) {
            this.scene.scene.stop()
            if (this.score > this.retrieveHighScore()) {
                this.saveHighScore(this.score)
            }

            if (this.scene.scene.key == sceneKey.LEVEL1) {
                this.scene.scene.start(sceneKey.LEVEL2)
            } else if (this.scene.scene.key == sceneKey.LEVEL2) {
                this.scene.scene.start(sceneKey.LEVEL3)
            } else if (this.scene.scene.key == sceneKey.LEVEL3) {
                this.scene.scene.start(sceneKey.MENU)
            }
        }
        console.log(this.scene.scene.key)
        this.player.update()
    }
}
