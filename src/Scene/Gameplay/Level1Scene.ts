import { spriteObj, virtualGuySpriteObj } from '../../Constant/AssetKey'
import { depthLayer } from '../../Constant/DepthLayer'
import { InputManager } from '../../GameObject/Manager/InputManager'
import { Player } from '../../GameObject/Player/Player'
export class Level1Scene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    private levelMap: Phaser.Tilemaps.Tilemap
    private platform: Phaser.Tilemaps.TilemapLayer | undefined

    private player: Player

    preload() {
        this.load.tilemapTiledJSON('level-1', 'assets\\level\\Level1.json')
    }

    create() {
        const inputManager = InputManager.Instance
        inputManager.initialize(this)

        this.createPlayer()
        this.createMap()
        this.setupCamera()
    }

    private createMap(): void {
        this.levelMap = this.make.tilemap({ key: 'level-1', tileWidth: 16, tileHeight: 16 })
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
                this.physics.world.bounds.width = this.platform.width
                this.physics.add.collider(this.player, this.platform, undefined, undefined, this)
            }
        }

        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BROWN.key)
            .setDepth(depthLayer.BACKGROUND)
    }

    private setupCamera(): void {
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.cameras.main.setZoom(4)
        this.cameras.main.startFollow(this.player)
    }

    private createPlayer(): void {
        this.player = new Player(this, 500, 200, virtualGuySpriteObj).setDepth(depthLayer.PLAYER)
        this.player.setCollideWorldBounds(true)
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        this.player.update()
    }
}
