import { spriteObj, virtualGuySpriteObj } from '../../Constant/AssetKey'
import { depthLayer } from '../../Constant/DepthLayer'
import { InputManager } from '../../GameObject/Manager/InputManager'
export class Level1Scene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    private levelMap: Phaser.Tilemaps.Tilemap
    private platform: Phaser.Tilemaps.TilemapLayer | undefined

    private player: Phaser.Physics.Arcade.Sprite

    preload() {
        this.load.tilemapTiledJSON('level1', 'assets\\level\\Level1.json')
    }

    create() {
        const inputManager = InputManager.Instance
        inputManager.initialize(this)

        this.player = this.physics.add
            .sprite(500, 200, virtualGuySpriteObj.IDLE.key)
            .setBounce(0.1)
            .setDepth(depthLayer.PLAYER)

        if (this.player.body !== null) {
            this.player.body
                .setSize(this.player.width * 0.7, this.player.height * 0.7)
                .setOffset(5, 10)
        }

        this.levelMap = this.make.tilemap({ key: 'level1', tileWidth: 16, tileHeight: 16 })
        const tileSet1 = this.levelMap.addTilesetImage('Terrain', spriteObj.BASE_TERRAIN.key)

        if (tileSet1 !== null) {
            this.platform = this.levelMap
                .createLayer('Ground', tileSet1, 0, 0)
                ?.setOrigin(0)
                .setDepth(depthLayer.PLATFORM)

            if (this.platform !== undefined) {
                this.platform.setCollision([
                    94, 95, 96, 97, 98, 116, 117, 118, 119, 120, 138, 139, 140,
                ])
                this.physics.add.collider(this.player, this.platform)
                this.physics.world.bounds.width = this.platform.width
            }
        }

        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BROWN.key)
            .setDepth(depthLayer.BACKGROUND)

        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.player.setCollideWorldBounds(true)

        this.cameras.main.setZoom(4)
        this.cameras.main.startFollow(this.player)
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        this.player.setVelocityX(0)

        if (InputManager.Instance.isUpKeyPressed()) {
            this.player.setVelocityY(-200)
        } else if (InputManager.Instance.isDownKeyPressed()) {
            this.player.setVelocityY(200)
        }

        if (InputManager.Instance.isLeftKeyPressed()) {
            this.player.flipX = true
            this.player.setVelocityX(-100)
        } else if (InputManager.Instance.isRightKeyPressed()) {
            this.player.flipX = false
            this.player.setVelocityX(100)
        }
    }
}
