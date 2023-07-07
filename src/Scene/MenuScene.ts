import { spriteObj } from '../Constant/AssetKey'

export class MenuScene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    create() {
        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BROWN.key)
            .setDepth(-1)
    }

    update(time: number, delta: number) {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
    }
}
