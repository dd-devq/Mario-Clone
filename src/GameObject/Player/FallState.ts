import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { InputManager } from '../Manager/InputManager'
import { State } from './State'

export class FallState extends State<Player> {
    private inAirMoveForce = 75
    private boostForce = 200

    public Enter(): void {
        this.parent.play(playerAnimationKey.FALL)
    }

    public Update(): void {
        this.parent.persistenceForce()

        if (InputManager.Instance.isLeftKeyDown()) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyDown()) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        }

        if (
            this.parent.jumpCount == 1 &&
            (InputManager.Instance.isSpaceKeyDown() || InputManager.Instance.isUpKeyDown())
        ) {
            this.boost()
            this.parent.gotoState(playerAnimationKey.DOUBLE_JUMP)
        } else if (
            this.parent.jumpCount == 0 &&
            (InputManager.Instance.isSpaceKeyDown() || InputManager.Instance.isUpKeyDown())
        ) {
            this.parent.gotoState(playerAnimationKey.JUMP)
        }

        if (this.parent.isTouchingWall) {
            this.parent.gotoState(playerAnimationKey.WALL_JUMP)
        } else if (this.parent.isGrounded) {
            this.parent.gotoState(playerAnimationKey.IDLE)
        }

        // Hit Enemy --> Jump
    }

    private boost(): void {
        this.parent.setVelocityY(this.boostForce)
    }

    public Exit(): void {
        this.parent.stop()
    }
}
