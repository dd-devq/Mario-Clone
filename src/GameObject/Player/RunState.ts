import { playerAnimationKey } from '../../Constant/AnimationKey'
import { Player } from './Player'
import { InputManager } from '../Manager/InputManager'
import { State } from './State'

export class RunState extends State<Player> {
    private moveForce = 100

    public Enter(): void {
        this.parent.jumpCount = 0
        this.parent.play(playerAnimationKey.RUN)
    }

    public Update(): void {
        this.parent.persistenceForce()
        if (InputManager.Instance.isLeftKeyDown() && this.parent.isGrounded) {
            this.parent.applyForceX(-this.moveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyDown() && this.parent.isGrounded) {
            this.parent.applyForceX(this.moveForce)
            this.parent.flipPlayerRight()
        } else if (!this.parent.isGrounded) {
            this.parent.gotoState(playerAnimationKey.FALL)
        } else {
            this.parent.gotoState(playerAnimationKey.IDLE)
        }

        if (InputManager.Instance.isSpaceKeyDown() || InputManager.Instance.isUpKeyDown()) {
            this.parent.gotoState(playerAnimationKey.JUMP)
        }
    }

    public Exit(): void {
        this.parent.stop()
    }
}
