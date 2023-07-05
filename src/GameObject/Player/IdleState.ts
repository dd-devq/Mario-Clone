import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { InputManager } from '../Manager/InputManager'
import { State } from './State'

export class IdleState extends State<Player> {
    public Enter(): void {
        this.parent.jumpCount = 0
        this.parent.play(playerAnimationKey.IDLE)
    }

    public Update(): void {
        this.parent.persistenceForce()
        if (InputManager.Instance.isLeftKeyDown()) {
            this.parent.flipPlayerLeft()
            this.parent.gotoState(playerAnimationKey.RUN)
        } else if (InputManager.Instance.isRightKeyDown()) {
            this.parent.flipPlayerRight()
            this.parent.gotoState(playerAnimationKey.RUN)
        }

        if (InputManager.Instance.isSpaceKeyDown()) {
            this.parent.gotoState(playerAnimationKey.JUMP)
        }
    }

    public Exit(): void {
        this.parent.stop()
    }
}
