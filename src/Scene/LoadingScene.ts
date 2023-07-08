import { audioObj, spriteObj, virtualGuySpriteObj } from '../Constant/AssetKey'
import { depthLayer } from '../Constant/DepthLayer'
import { sceneKey } from '../Constant/SceneKey'

export class LoadingScene extends Phaser.Scene {
    preload() {
        const barWidth = 500
        const barHeight = 50

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()

        progressBox.fillStyle(0x000000, 1)
        progressBox.fillRect(
            (this.scale.canvas.width - barWidth) / 2,
            (this.scale.canvas.height - barHeight) / 2,
            barWidth,
            barHeight
        )

        this.load.on('progress', (value: number) => {
            progressBar.clear()
            progressBar.fillStyle(0xf7f7f7, 1)
            progressBar
                .fillRect(
                    (this.scale.canvas.width - barWidth) / 2,
                    (this.scale.canvas.height - barHeight) / 2,
                    barWidth * value,
                    barHeight
                )
                .setDepth(depthLayer.UI)
        })

        this.load.on('complete', () => {
            progressBar.destroy()
            progressBox.destroy()
            this.scene.start(sceneKey.LEVEL2)
        })

        this.load.spritesheet(spriteObj.DISAPPEARING.key, spriteObj.DISAPPEARING.path, {
            frameWidth: 96,
            frameHeight: 96,
        })

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

        this.load.image(spriteObj.ITEM_APPLE.key, spriteObj.ITEM_APPLE.path)
        this.load.image(spriteObj.ITEM_BANANAS.key, spriteObj.ITEM_BANANAS.path)
        this.load.image(spriteObj.ITEM_CHERRIES.key, spriteObj.ITEM_CHERRIES.path)
        this.load.image(spriteObj.ITEM_KIWI.key, spriteObj.ITEM_KIWI.path)
        this.load.image(spriteObj.ITEM_MELON.key, spriteObj.ITEM_MELON.path)
        this.load.image(spriteObj.ITEM_ORANGE.key, spriteObj.ITEM_ORANGE.path)
        this.load.image(spriteObj.ITEM_ORANGE.key, spriteObj.ITEM_ORANGE.path)
        this.load.image(spriteObj.ITEM_PINEAPPLE.key, spriteObj.ITEM_PINEAPPLE.path)
        this.load.image(spriteObj.ITEM_STRAWBERRY.key, spriteObj.ITEM_STRAWBERRY.path)
        this.load.image(spriteObj.SPIKE.key, spriteObj.SPIKE.path)
        this.load.image(spriteObj.BASE_TERRAIN.key, spriteObj.BASE_TERRAIN.path)
        this.load.image(spriteObj.BASE_BACKGROUND_BROWN.key, spriteObj.BASE_BACKGROUND_BROWN.path)
        this.load.image(spriteObj.BASE_BACKGROUND_BLUE.key, spriteObj.BASE_BACKGROUND_BLUE.path)
        this.load.image(spriteObj.BASE_BACKGROUND_GRAY.key, spriteObj.BASE_BACKGROUND_GRAY.path)
        this.load.image(spriteObj.BASE_BACKGROUND_GREEN.key, spriteObj.BASE_BACKGROUND_GREEN.path)
        this.load.image(spriteObj.BASE_BACKGROUND_PURPLE.key, spriteObj.BASE_BACKGROUND_PURPLE.path)
        this.load.image(spriteObj.BASE_BACKGROUND_YELLOW.key, spriteObj.BASE_BACKGROUND_YELLOW.path)
        this.load.image(spriteObj.BASE_BACKGROUND_PINK.key, spriteObj.BASE_BACKGROUND_PINK.path)
        this.load.image(spriteObj.START.key, spriteObj.START.path)
        this.load.image(spriteObj.END.key, spriteObj.END.path)

        this.load.audio(audioObj.COIN.key, audioObj.COIN.path)
        this.load.audio(audioObj.DEATH.key, audioObj.DEATH.path)
        this.load.audio(audioObj.GAME_OVER.key, audioObj.GAME_OVER.path)
        this.load.audio(audioObj.HERE_WE_GO.key, audioObj.HERE_WE_GO.path)
        this.load.audio(audioObj.INTRO.key, audioObj.INTRO.path)
        this.load.audio(audioObj.JUMP.key, audioObj.JUMP.path)
        this.load.audio(audioObj.POWER_UP.key, audioObj.POWER_UP.path)
        this.load.audio(audioObj.THEME.key, audioObj.THEME.path)
        this.load.audio(audioObj.WIN.key, audioObj.WIN.path)
    }
}
