import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { State } from './State'
import { AudioManager } from '../Manager/AudioManager'
import { audioObj } from '../../Constant/AssetKey'

export class HitState extends State<Player> {
    private isAnimationComplete: boolean
    private impactForce = 50

    public Enter(): void {
        AudioManager.Instance.stopBGM()
        AudioManager.Instance.playSoundFX(audioObj.DEATH.key)
        this.isAnimationComplete = false
        this.parent.applyForceX(0)
        this.parent.play(playerAnimationKey.HIT)
        this.parent.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isAnimationComplete = true
        })
        this.parent.scene.cameras.main.shake(50, 0.00075)
    }

    public Update(): void {
        if (this.isAnimationComplete) {
            this.parent.isDead = true
        }
    }

    public Exit(): void {
        this.parent.stop()
    }
}
