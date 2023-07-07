import { playerAnimationKey } from '../../Constant/AnimationKey'
import { audioObj, spriteObj, virtualGuySpriteObj } from '../../Constant/AssetKey'
import { depthLayer } from '../../Constant/DepthLayer'
import { AudioManager } from '../../GameObject/Manager/AudioManager'
import { GameManager } from '../../GameObject/Manager/GameManager'
import { InputManager } from '../../GameObject/Manager/InputManager'
import { Player } from '../../GameObject/Player/Player'
import AnimatedTiles from 'phaser-animated-tiles/dist/AnimatedTiles'

export class Level2Scene extends Phaser.Scene {
    private backgroundScrollSpeed = 0.01
    private background: Phaser.GameObjects.TileSprite

    /* Tilemap */
    private levelMap: Phaser.Tilemaps.Tilemap
    /* Tilemap Layers */
    private platform: Phaser.Tilemaps.TilemapLayer | undefined
    private collectibles: Phaser.Tilemaps.TilemapLayer | undefined
    private spike: Phaser.Tilemaps.TilemapLayer | undefined

    preload() {
        this.load.tilemapTiledJSON('level-1', 'assets\\level\\Level1.json')
        this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles')
    }

    create() {
        this.initManager()
        this.createPlayer()
        this.createMap()
        this.setupCamera()

        AudioManager.Instance.stopAllSoundFX()
        AudioManager.Instance.playSoundFX(audioObj.INTRO.key)
        AudioManager.Instance.bgm = this.sound.add(audioObj.THEME.key)
        AudioManager.Instance.playBGM(0.5, true)
    }

    private initManager(): void {
        const inputManager = InputManager.Instance
        inputManager.initialize(this)

        const audioManager = AudioManager.Instance
        audioManager.initialize(this)

        const gameManager = GameManager.Instance
        gameManager.initialize(this)
    }

    private createMap(): void {
        this.levelMap = this.make.tilemap({ key: 'level-1', tileWidth: 16, tileHeight: 16 })
        const tileSet1 = this.levelMap.addTilesetImage('Terrain', spriteObj.BASE_TERRAIN.key)
        const tileSet3 = this.levelMap.addTilesetImage('Spike', spriteObj.SPIKE.key)
        const tileSetApple = this.levelMap.addTilesetImage('Apple', spriteObj.ITEM_APPLE.key)
        const tileSetBananas = this.levelMap.addTilesetImage('Bananas', spriteObj.ITEM_BANANAS.key)
        const tileSetCherries = this.levelMap.addTilesetImage(
            'Cherries',
            spriteObj.ITEM_CHERRIES.key
        )
        const tileSetKiwi = this.levelMap.addTilesetImage('Kiwi', spriteObj.ITEM_KIWI.key)
        const tileSetMelon = this.levelMap.addTilesetImage('Melon', spriteObj.ITEM_MELON.key)
        const tileSetOrange = this.levelMap.addTilesetImage('Orange', spriteObj.ITEM_ORANGE.key)
        const tileSetPineapple = this.levelMap.addTilesetImage(
            'Pineapple',
            spriteObj.ITEM_PINEAPPLE.key
        )
        const tileSetStrawberry = this.levelMap.addTilesetImage(
            'Strawberry',
            spriteObj.ITEM_STRAWBERRY.key
        )

        if (
            tileSet1 !== null &&
            tileSet3 !== null &&
            tileSetApple !== null &&
            tileSetBananas !== null &&
            tileSetCherries !== null &&
            tileSetKiwi !== null &&
            tileSetMelon !== null &&
            tileSetOrange !== null &&
            tileSetPineapple !== null &&
            tileSetStrawberry !== null
        ) {
            this.platform = this.levelMap.createLayer('Ground', tileSet1, 0, 0)?.setOrigin(0)
            this.spike = this.levelMap.createLayer('Spike', tileSet3, 0, 0)?.setOrigin(0)
            this.collectibles = this.levelMap
                .createLayer(
                    'Collectibles',
                    [
                        tileSetApple,
                        tileSetBananas,
                        tileSetCherries,
                        tileSetKiwi,
                        tileSetMelon,
                        tileSetOrange,
                        tileSetPineapple,
                        tileSetStrawberry,
                    ],
                    0,
                    0
                )
                ?.setOrigin(0)

            if (
                this.platform !== undefined &&
                this.collectibles !== undefined &&
                this.spike !== undefined
            ) {
                this.physics.world.bounds.width = this.platform.width

                /* Platform Collider */
                this.platform.setCollision([
                    94, 95, 96, 97, 98, 116, 117, 118, 119, 120, 138, 139, 140,
                ])
                this.physics.add.collider(
                    GameManager.Instance.player,
                    this.platform,
                    undefined,
                    undefined,
                    this
                )

                /* Spike Collider */
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
                                GameManager.Instance.player,
                                () => {
                                    if (
                                        GameManager.Instance.player.playerStateStack.top() !=
                                        GameManager.Instance.player.playerState.get(
                                            playerAnimationKey.HIT
                                        )
                                    ) {
                                        GameManager.Instance.player.gotoState(
                                            playerAnimationKey.HIT
                                        )
                                    }
                                },
                                undefined,
                                this
                            )
                        }
                    }
                })

                /* Collectibles Collider */
                this.physics.add.overlap(
                    GameManager.Instance.player,
                    this.collectibles,
                    () => {
                        if (GameManager.Instance.player.body !== null) {
                            const playerBounds = new Phaser.Geom.Rectangle(
                                GameManager.Instance.player.body.position.x,
                                GameManager.Instance.player.body.position.y,
                                GameManager.Instance.player.body.width * 0.735,
                                GameManager.Instance.player.body.height * 0.75
                            )
                            const overlappingTiles =
                                this.collectibles?.getTilesWithinShape(playerBounds)
                            if (overlappingTiles !== undefined) {
                                overlappingTiles.forEach((tile) => {
                                    if (tile !== null && tile.index != -1) {
                                        if (tile.visible) {
                                            tile.setVisible(false)
                                            AudioManager.Instance.playSoundFX(
                                                audioObj.COIN.key,
                                                0.25
                                            )
                                        }
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
            .tileSprite(0, 0, 10000, 10000, spriteObj.BASE_BACKGROUND_BLUE.key)
            .setDepth(-1)
    }

    private setupCamera(): void {
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels)
        this.cameras.main.setZoom(4)
        this.cameras.main.startFollow(GameManager.Instance.player)
    }

    private createPlayer(): void {
        GameManager.Instance.player = new Player(this, 1400, 100, virtualGuySpriteObj).setDepth(
            depthLayer.PLAYER
        )
        GameManager.Instance.player.setCollideWorldBounds(true)
    }

    update(time: number, delta: number): void {
        this.background.tilePositionY -= this.backgroundScrollSpeed * delta
        GameManager.Instance.update()
    }
}
