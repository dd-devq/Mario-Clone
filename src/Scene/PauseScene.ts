import { fontObj, spriteObj } from '../Constant/AssetKey'
import { sceneKey } from '../Constant/SceneKey'
import { Button } from '../GameObject/UI/Button'
import { depthLayer } from '../Constant/DepthLayer'

export class PauseScene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    private lvl1Button: Button
    private lvl2Button: Button
    private lvl3Button: Button

    create() {
        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_YELLOW.key)
            .setDepth(-1)
            .setScale(3)
        this.setupUI()
    }

    private setupUI(): void {
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        this.lvl1Button = new Button(this, width / 3, height / 2, spriteObj.LEVEL1.key, () => {
            this.scene.start(sceneKey.LEVEL1)
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.lvl2Button = new Button(this, width / 2, height / 2, spriteObj.LEVEL2.key, () => {
            this.scene.start(sceneKey.LEVEL2)
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.lvl3Button = new Button(this, width / 1.5, height / 2, spriteObj.LEVEL3.key, () => {
            this.scene.start(sceneKey.LEVEL3)
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.add
            .bitmapText(
                window.innerWidth / 2,
                height / 3,
                fontObj.MARIO_FONT.key,
                'PIXEL ADVENTURE',
                32
            )
            .setScale(3)
            .setOrigin(0.5)
    }

    update(time: number, delta: number) {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
    }
}
