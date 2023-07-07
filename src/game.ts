import Phaser from 'phaser'
import { gameConfig } from './Config'
import { sceneKey } from './Constant/SceneKey'
import { LoadingScene } from './Scene/LoadingScene'
import { Level1Scene } from './Scene/Gameplay/Level1Scene'
import { Level2Scene } from './Scene/Gameplay/Level2Scene'
import { Level3Scene } from './Scene/Gameplay/Level3Scene'
import { MenuScene } from './Scene/MenuScene'

window.addEventListener('load', () => {
    const game = new Phaser.Game(gameConfig)
    game.scene.add(sceneKey.LOADING, LoadingScene)
    game.scene.add(sceneKey.MENU, MenuScene)
    game.scene.add(sceneKey.LEVEL1, Level1Scene)
    game.scene.add(sceneKey.LEVEL2, Level2Scene)
    game.scene.add(sceneKey.LEVEL3, Level3Scene)
    game.scene.add(sceneKey.GAME_OVER, LoadingScene)
})
