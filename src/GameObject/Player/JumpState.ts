import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'
import { InputManager } from '../Manager/InputManager'
import { State } from './State'

export class JumpState extends State<Player> {
    private jumpForce = -250
    private inAirMoveForce = 75

    public Enter(): void {
        this.parent.setVelocityY(0)
        this.parent.play(playerAnimationKey.JUMP)
        ++this.parent.jumpCount
        this.jump()
    }

    public Update(): void {
        if (InputManager.Instance.isLeftKeyDown()) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyDown()) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        }

        if (
            this.parent.jumpCount < this.parent.maxJumpCount &&
            (InputManager.Instance.isSpaceKeyDown() || InputManager.Instance.isUpKeyDown())
        ) {
            this.parent.gotoState(playerAnimationKey.DOUBLE_JUMP)
        }
        if (this.parent.body !== null) {
            if (this.parent.body.velocity.y > 0) {
                this.parent.gotoState(playerAnimationKey.FALL)
            }
        }
    }

    private jump(): void {
        this.parent.setVelocityY(this.jumpForce)
    }

    public Exit(): void {
        this.parent.stop()
    }
}

export class DoubleJumpState extends State<Player> {
    private jumpForce = -175
    private inAirMoveForce = 50

    public Enter(): void {
        this.parent.play(playerAnimationKey.DOUBLE_JUMP)
        ++this.parent.jumpCount
        this.jump()
    }

    public Update(): void {
        if (InputManager.Instance.isLeftKeyDown()) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        } else if (InputManager.Instance.isRightKeyDown()) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        }

        if (this.parent.body !== null) {
            if (this.parent.body.velocity.y > 0) {
                this.parent.gotoState(playerAnimationKey.FALL)
            }
        }
    }

    private jump(): void {
        this.parent.setVelocityY(this.jumpForce)
    }

    public Exit(): void {
        this.parent.stop()
    }
}

export class WallJumpState extends State<Player> {
    private worldGravity = 0
    private inAirMoveForce = 10

    public Enter(): void {
        this.parent.body?.velocity.set(0, 0)
        this.worldGravity = this.parent.scene.physics.world.gravity.y
        this.parent.scene.physics.world.gravity.y = this.worldGravity * 0.05
        this.parent.jumpCount = 0
        this.parent.play(playerAnimationKey.WALL_JUMP)
    }

    public Update(): void {
        this.parent.persistenceForce()

        if (InputManager.Instance.isSpaceKeyDown() || InputManager.Instance.isUpKeyDown()) {
            this.parent.gotoState(playerAnimationKey.JUMP)
        }

        if (InputManager.Instance.isRightKeyDown() && this.parent.isTouchingWallLeft) {
            this.parent.applyForceX(this.inAirMoveForce)
            this.parent.flipPlayerRight()
        } else if (InputManager.Instance.isLeftKeyDown() && !this.parent.isTouchingWallLeft) {
            this.parent.applyForceX(-this.inAirMoveForce)
            this.parent.flipPlayerLeft()
        }

        if (!this.parent.isTouchingWall) {
            this.parent.gotoState(playerAnimationKey.FALL)
        }

        if (this.parent.isGrounded) {
            this.parent.gotoState(playerAnimationKey.IDLE)
        }
    }

    public Exit(): void {
        this.parent.scene.physics.world.gravity.y = this.worldGravity
        this.parent.stop()
    }
}
