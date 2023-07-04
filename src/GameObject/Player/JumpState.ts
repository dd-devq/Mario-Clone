import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'

export class JumpState extends State<Player> {
    private isDoubleJump: boolean

    public Enter(): void {
        this.parent.play(playerAnimationKey.RUN)
    }

    public Update(): void {
        //
    }

    public Exit(): void {
        this.parent.stop()
    }
}

export class DoubleJumpState extends State<Player> {
    private jumpForce = 200

    public Enter(): void {
        this.parent.play(playerAnimationKey.DOUBLE_JUMP)
        this.jump()
    }

    public Update(): void {
        //
    }

    private jump(): void {
        this.parent.setVelocityY(200)
    }

    public Exit(): void {
        this.parent.stop()
    }
}

export class WallJumpState extends State<Player> {
    public Enter(): void {
        this.parent.play(playerAnimationKey.WALL_JUMP)
    }

    public Update(): void {
        //
    }

    public Exit(): void {
        this.parent.stop()
    }
}
