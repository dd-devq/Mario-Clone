import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { InputManager } from '../Manager/InputManager'

export class FallState extends State<Player> {
    private inAirMoveForce = 75

    public Enter(): void {
        this.parent.play(playerAnimationKey.FALL)
    }

    public Update(): void {
        if (this.parent.isGrounded) {
            this.parent.gotoState(playerAnimationKey.IDLE)
        } else if (this.parent.isTouchingWall) {
            this.parent.gotoState(playerAnimationKey.WALL_JUMP)
        } else if (!this.parent.isDoubleJump && InputManager.Instance.isSpaceKeyPressed()) {
            this.parent.gotoState(playerAnimationKey.DOUBLE_JUMP)
        }

        if (InputManager.Instance.isLeftKeyPressed()) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyPressed()) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        }

        // Hit Enemy --> Jump
    }

    public Exit(): void {
        this.parent.stop()
    }
}
