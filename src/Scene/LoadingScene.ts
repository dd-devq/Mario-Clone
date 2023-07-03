import { spriteObj, virtualGuySpriteObj } from '../Constant/AssetKey'

export class LoadingScene extends Phaser.Scene {
    preload() {
        this.load.spritesheet(virtualGuySpriteObj.JUMP.key, virtualGuySpriteObj.JUMP.path, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet(
            virtualGuySpriteObj.DOUBLE_JUMP.key,
            virtualGuySpriteObj.DOUBLE_JUMP.path,
            { frameWidth: 32, frameHeight: 32 }
        )
        this.load.spritesheet(
            virtualGuySpriteObj.WALL_JUMP.key,
            virtualGuySpriteObj.WALL_JUMP.path,
            { frameWidth: 32, frameHeight: 32 }
        )
        this.load.spritesheet(virtualGuySpriteObj.FALL.key, virtualGuySpriteObj.FALL.path, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet(virtualGuySpriteObj.HIT.key, virtualGuySpriteObj.HIT.path, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet(virtualGuySpriteObj.IDLE.key, virtualGuySpriteObj.IDLE.path, {
            frameWidth: 32,
            frameHeight: 32,
        })
        this.load.spritesheet(virtualGuySpriteObj.RUN.key, virtualGuySpriteObj.RUN.path, {
            frameWidth: 32,
            frameHeight: 32,
        })

        this.load.image(spriteObj.BASE_TERRAIN.key, spriteObj.BASE_TERRAIN.path)
        this.load.tilemapTiledJSON('level1', 'assets\\level\\Level1.json')
    }

    create() {
        console.log('Hello1')
        const map = this.make.tilemap({ key: 'level1', tileWidth: 16, tileHeight: 16 })
        console.log('Hello2')
        const tileSet = map.addTilesetImage('Terrain', spriteObj.BASE_TERRAIN.key)
        if (tileSet !== null) {
            console.log('Hello3')
            const layer = map.createLayer('Ground', tileSet, 0, 0)?.setOrigin(0)
        }
    }
}
