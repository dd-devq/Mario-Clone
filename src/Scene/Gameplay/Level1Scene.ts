import { spriteObj, virtualGuySpriteObj } from '../../Constant/AssetKey'
import { depthLayer } from '../../Constant/DepthLayer'

export class Level1Scene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.1
    private background: Phaser.GameObjects.TileSprite

    private levelMap: Phaser.Tilemaps.Tilemap
    private platform: Phaser.Tilemaps.TilemapLayer | undefined

    private player: Phaser.Physics.Arcade.Sprite
    private controller: Phaser.Types.Input.Keyboard.CursorKeys

    preload() {
        this.load.tilemapTiledJSON('level1', 'assets\\level\\Level1.json')
    }

    create() {
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
            }
        }

        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BROWN.key)
            .setDepth(depthLayer.BACKGROUND)

        if (this.input.keyboard?.createCursorKeys() !== undefined) {
            this.controller = this.input.keyboard?.createCursorKeys()
        }
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.player.setCollideWorldBounds(true)
        this.cameras.main.setZoom(3)
        this.cameras.main.startFollow(this.player, false, 1, 1)
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        this.player.setVelocityX(0)
        this.player.setVelocityY(0)

        if (this.controller.up.isDown == true) {
            this.player.setVelocityY(-250)
        } else if (this.controller.down.isDown == true) {
            this.player.setVelocityY(250)
        }

        if (this.controller.left.isDown == true) {
            this.player.setVelocityX(-250)
        } else if (this.controller.right.isDown == true) {
            this.player.setVelocityX(250)
        }
    }
}
