import { playerAnimationKey } from '../../Constant/AnimationKey'
import { spriteObj, virtualGuySpriteObj } from '../../Constant/AssetKey'
import { depthLayer } from '../../Constant/DepthLayer'
import { InputManager } from '../../GameObject/Manager/InputManager'
import { Player } from '../../GameObject/Player/Player'
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles'

export class Level1Scene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    private levelMap: Phaser.Tilemaps.Tilemap
    private platform: Phaser.Tilemaps.TilemapLayer | undefined
    private collectibles: Phaser.Tilemaps.TilemapLayer | undefined
    private spike: Phaser.Tilemaps.TilemapLayer | undefined

    private player: Player

    preload() {
        this.load.tilemapTiledJSON('level-1', 'assets\\level\\Level1.json')
        this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles')
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
        const tileSet2 = this.levelMap.addTilesetImage('Apple', spriteObj.ITEM_APPLE.key)
        const tileSet3 = this.levelMap.addTilesetImage('Spike', spriteObj.SPIKE.key)
        if (tileSet1 !== null && tileSet2 !== null && tileSet3 !== null) {
            this.platform = this.levelMap.createLayer('Ground', tileSet1, 0, 0)?.setOrigin(0)
            this.spike = this.levelMap.createLayer('Spike', tileSet3, 0, 0)?.setOrigin(0)
            this.collectibles = this.levelMap
                .createLayer('Collectibles', tileSet2, 0, 0)
                ?.setOrigin(0)

            if (
                this.platform !== undefined &&
                this.collectibles !== undefined &&
                this.spike !== undefined
            ) {
                this.physics.world.bounds.width = this.platform.width

                this.platform.setCollision([
                    94, 95, 96, 97, 98, 116, 117, 118, 119, 120, 138, 139, 140,
                ])

                this.physics.add.collider(this.player, this.platform, undefined, undefined, this)

                this.spike.forEachTile((tile) => {
                    if (tile.index != -1) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const tileData: any = tile.getTileData()
                        let posX = 0
                        let posY = 0
                        let width = 0
                        let height = 0

                        if (tileData) {
                            const object = tileData.objectgroup.objects[0]
                            if (tile.rotation == Phaser.Math.PI2 / 4) {
                                posX = tile.pixelX
                                posY = tile.pixelY
                                width = object.height as number
                                height = object.width as number
                            } else if (tile.rotation == Phaser.Math.PI2 / (4 / 3)) {
                                posX = tile.pixelX + object.y
                                posY = tile.pixelY
                                width = object.height as number
                                height = object.width as number
                            } else {
                                posX = tile.pixelX
                                posY = tile.pixelY + object.y
                                width = object.width as number
                                height = object.height as number
                            }

                            const rectangle = this.add
                                .rectangle(posX, posY, width, height)
                                .setOrigin(0)
                            this.physics.add.existing(rectangle, true)
                            this.physics.add.collider(
                                rectangle,
                                this.player,
                                () => {
                                    if (
                                        this.player.playerStateStack.top() !=
                                        this.player.playerState.get(playerAnimationKey.HIT)
                                    ) {
                                        this.player.gotoState(playerAnimationKey.HIT)
                                    }
                                },
                                undefined,
                                this
                            )
                        }
                    }
                })

                this.physics.add.overlap(
                    this.player,
                    this.collectibles,
                    () => {
                        if (this.player.body !== null) {
                            const playerBounds = new Phaser.Geom.Rectangle(
                                this.player.body.position.x,
                                this.player.body.position.y,
                                this.player.body.width * 0.735,
                                this.player.body.height * 0.75
                            )
                            const overlappingTiles =
                                this.collectibles?.getTilesWithinShape(playerBounds)
                            if (overlappingTiles !== undefined) {
                                overlappingTiles.forEach((tile) => {
                                    if (tile !== null && tile.index != -1) {
                                        tile.setVisible(false)
                                    }
                                })
                            }
                        }
                    },
                    undefined,
                    this
                )
            }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.sys as any).animatedTiles.init(this.levelMap)

        this.background = this.add
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BROWN.key)
            .setDepth(-1)
    }

    private setupCamera(): void {
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.cameras.main.setZoom(4)
        this.cameras.main.startFollow(this.player)
    }

    private createPlayer(): void {
        this.player = new Player(this, 1400, 100, virtualGuySpriteObj).setDepth(depthLayer.PLAYER)
        this.player.setCollideWorldBounds(true)
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        this.player.update()
    }
}
