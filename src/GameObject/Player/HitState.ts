import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { State } from './State'

export class HitState extends State<Player> {
    private isAnimationComplete: boolean
    private impactForce = 100

    public Enter(): void {
        this.isAnimationComplete = false
        this.parent.play(playerAnimationKey.HIT)
        this.parent.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.isAnimationComplete = true
        })
    }

    public Update(): void {
        if (this.isAnimationComplete) {
            if (this.parent.isTouchingWallLeft) {
                this.parent.applyForceX(this.impactForce)
                this.parent.flipPlayerLeft()
            } else if (!this.parent.isTouchingWallLeft) {
                this.parent.applyForceX(-this.impactForce)
                this.parent.flipPlayerRight()
            } else {
                this.parent.applyForceX(this.impactForce)
            }

            this.parent.gotoState(playerAnimationKey.JUMP)
        }
    }

    public Exit(): void {
        this.parent.stop()
    }
}
