import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { InputManager } from '../Manager/InputManager'
import { State } from './State'

export class FallState extends State<Player> {
    private inAirMoveForce = 75

    public Enter(): void {
        this.parent.play(playerAnimationKey.FALL)
    }

    public Update(): void {
        this.parent.persistenceForce()

        if (this.parent.isGrounded) {
            this.parent.gotoState(playerAnimationKey.IDLE)
        } else if (this.parent.isTouchingWall) {
            this.parent.gotoState(playerAnimationKey.WALL_JUMP)
        } else if (this.parent.jumpCount == 1 && InputManager.Instance.isSpaceKeyDown()) {
            this.parent.gotoState(playerAnimationKey.DOUBLE_JUMP)
        } else if (this.parent.jumpCount == 0 && InputManager.Instance.isSpaceKeyDown()) {
            this.parent.gotoState(playerAnimationKey.JUMP)
        }

        if (InputManager.Instance.isLeftKeyDown()) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyDown()) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        }

        // Hit Enemy --> Jump
    }

    public Exit(): void {
        this.parent.stop()
    }
}
