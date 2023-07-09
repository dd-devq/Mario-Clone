import { fontObj, spriteObj } from '../Constant/AssetKey'
import { sceneKey } from '../Constant/SceneKey'
import { Button } from '../GameObject/UI/Button'
import { depthLayer } from '../Constant/DepthLayer'
import { InputManager } from '../GameObject/Manager/InputManager'

export class PauseScene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    private previous: Button
    private restart: Button
    private next: Button
    private back: Button
    private currentLevel: string

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init(data: any) {
        this.currentLevel = data.currentLevel
    }

    create() {
        const inputManager = InputManager.Instance
        inputManager.initialize(this)

        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_GRAY.key)
            .setDepth(-1)
            .setScale(3)
        this.setupUI()
    }

    private setupUI(): void {
        const width = this.cameras.main.width
        const height = this.cameras.main.height

        this.previous = new Button(this, width / 3, height / 2, spriteObj.PREVIOUS.key, () => {
            if (this.currentLevel == sceneKey.LEVEL2) {
                this.scene.stop()
                this.scene.stop(this.currentLevel)
                this.scene.start(sceneKey.LEVEL1)
            } else if (this.currentLevel == sceneKey.LEVEL3) {
                this.scene.stop()
                this.scene.stop(this.currentLevel)
                this.scene.start(sceneKey.LEVEL2)
            }
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.restart = new Button(this, width / 2, height / 2, spriteObj.RESTART.key, () => {
            this.scene.stop()
            this.scene.stop(this.currentLevel)
            this.scene.start(this.currentLevel)
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.next = new Button(this, width / 1.5, height / 2, spriteObj.NEXT.key, () => {
            if (this.currentLevel == sceneKey.LEVEL1) {
                this.scene.stop()
                this.scene.stop(this.currentLevel)
                this.scene.start(sceneKey.LEVEL2)
            } else if (this.currentLevel == sceneKey.LEVEL2) {
                this.scene.stop()
                this.scene.stop(this.currentLevel)
                this.scene.start(sceneKey.LEVEL3)
            }
        })
            .setScale(4)
            .setDepth(depthLayer.UI)

        this.back = new Button(this, 50, 50, spriteObj.BACK.key, () => {
            this.scene.stop()
            this.scene.resume(this.currentLevel)
            InputManager.Instance.initialize(this.scene.get(this.currentLevel))
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

        this.add
            .bitmapText(
                window.innerWidth / 2,
                height / 5,
                fontObj.MARIO_FONT.key,
                'CURRENT LEVEL ' + this.currentLevel,
                16
            )
            .setScale(3)
            .setOrigin(0.5)
    }

    update(time: number, delta: number) {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        if (InputManager.Instance.isEscKeyDown()) {
            this.scene.stop()
            this.scene.resume(this.currentLevel)
            InputManager.Instance.initialize(this.scene.get(this.currentLevel))
        }
    }
}
