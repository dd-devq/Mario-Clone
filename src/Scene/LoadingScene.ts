import { spriteObj } from '../Constant/AssetKey'

export class LoadingScene extends Phaser.Scene {
    init() {}

    preload() {
        this.load.spritesheet(spriteObj.ENEMIES_SPRITESHEET.key, spriteObj.ENEMIES_SPRITESHEET.path)
        this.load.spritesheet(spriteObj.MARIO_SPRITESHEET.key, spriteObj.MARIO_SPRITESHEET.path)
        this.load.spritesheet(spriteObj.ITEMS.key, spriteObj.ITEMS.path)

        this.load.image(spriteObj.BASE_TILES.key, spriteObj.BASE_TILES.path)
        this.load.image(spriteObj.CASTLE.key, spriteObj.CASTLE.path)
        // this.load.tilemapTiledJSON('level1', 'assets\\level\\Level1.json')
    }

    create() {
        // const map = this.make.tilemap({ key: 'level1', tileWidth: 16, tileHeight: 16 })
        // const tileSet = map.addTilesetImage('OverWorld', 'tiles')
        // if (tileSet !== null) {
        //     const layer = map.createLayer('Tile Layer 1', tileSet, 0, 0)?.setOrigin(0)
        // }
        // this.cameras.main.setZoom(1)
    }
}
