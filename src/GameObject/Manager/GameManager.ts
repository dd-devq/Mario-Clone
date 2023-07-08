import { playerAnimationKey } from '../../Constant/AnimationKey'
import { sceneKey } from '../../Constant/SceneKey'
import { Player } from '../Player/Player'

export class GameManager {
    public player: Player
    private scene: Phaser.Scene
    private static instance: GameManager
    public winZone: Phaser.GameObjects.Rectangle
    public startZone: Phaser.GameObjects.Rectangle

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
            this.scene.scene.start(sceneKey.LEVEL3)
        }
        this.player.update()
    }
}
