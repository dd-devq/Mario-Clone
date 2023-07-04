import Phaser from 'phaser'
import { gameConfig } from './Config'
import { sceneKey } from './Constant/SceneKey'
import { LoadingScene } from './Scene/LoadingScene'
import { Level1Scene } from './Scene/Gameplay/Level1Scene'

window.addEventListener('load', () => {
    const game = new Phaser.Game(gameConfig)
    game.scene.add(sceneKey.LOADING, LoadingScene)
    game.scene.add(sceneKey.MENU, LoadingScene)
    game.scene.add(sceneKey.LEVEL1, Level1Scene)
    game.scene.add(sceneKey.LEVEL2, LoadingScene)
    game.scene.add(sceneKey.LEVEL3, LoadingScene)
    game.scene.add(sceneKey.GAME_OVER, LoadingScene)
})
