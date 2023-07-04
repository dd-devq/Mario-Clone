import { playerAnimationKey } from '../../Constant/AnimationKey'
import { RunState } from './RunState'
import { FallState } from './FallState'
import { IdleState } from './IdleState'
import { HitState } from './HitState'
import { DoubleJumpState, JumpState, WallJumpState } from './JumpState'

export class Player extends Phaser.Physics.Arcade.Sprite {
    private playerSpriteObj: PlayerSpriteObj

    private controller: Phaser.Types.Input.Keyboard.CursorKeys
    public playerStateStack: Stack<State<Player>> = new Stack<State<Player>>()
    public playerState: Map<string, State<Player>> = new Map<string, State<Player>>()

    /* Player's Flag */
    public isGrounded = true
    public isDoubleJump = false
    public isTouchingWall = false
    public isFacingLeft = false

    constructor(scene: Phaser.Scene, x: number, y: number, playerSpriteObj: PlayerSpriteObj) {
        super(scene, x, y, playerSpriteObj.IDLE.key)

        this.playerSpriteObj = playerSpriteObj
        this.create()
    }

    private create(): void {
        this.createAnimations()
        this.createState()
    }

    private createState(): void {
        this.playerState.set(playerAnimationKey.RUN, new RunState(this))
        this.playerState.set(playerAnimationKey.FALL, new FallState(this))
        this.playerState.set(playerAnimationKey.IDLE, new IdleState(this))
        this.playerState.set(playerAnimationKey.HIT, new HitState(this))
        this.playerState.set(playerAnimationKey.JUMP, new JumpState(this))
        this.playerState.set(playerAnimationKey.WALL_JUMP, new WallJumpState(this))
        this.playerState.set(playerAnimationKey.DOUBLE_JUMP, new DoubleJumpState(this))

        const playerState = this.playerState.get(playerAnimationKey.FALL)
        if (playerState !== undefined) {
            this.playerStateStack.push(playerState)
        }
    }

    private createAnimations(): void {
        Object.values(playerAnimationKey).forEach((key) => {
            if (this.scene.anims.exists(key)) {
                this.scene.anims.remove(key)
            }
        })

        this.anims.create({
            key: playerAnimationKey.JUMP,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.JUMP.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: 0,
        })

        this.anims.create({
            key: playerAnimationKey.DOUBLE_JUMP,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.DOUBLE_JUMP.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: 0,
        })

        this.anims.create({
            key: playerAnimationKey.WALL_JUMP,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.WALL_JUMP.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: 0,
        })

        this.anims.create({
            key: playerAnimationKey.HIT,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.HIT.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: 0,
        })

        this.anims.create({
            key: playerAnimationKey.FALL,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.FALL.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: 0,
        })

        this.anims.create({
            key: playerAnimationKey.IDLE,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.IDLE.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: -1,
        })

        this.anims.create({
            key: playerAnimationKey.RUN,
            frames: this.anims.generateFrameNumbers(this.playerSpriteObj.RUN.key, {
                start: 0,
                end: -1,
            }),
            frameRate: 24,
            repeat: -1,
        })
    }

    public gotoState(state: string) {
        if (this.playerStateStack.length() > 1) {
            this.playerStateStack.top()?.Exit()
            this.playerStateStack.pop()
        }

        const playerState = this.playerState.get(state)
        if (playerState !== undefined) {
            this.playerStateStack.push(playerState)
            this.playerStateStack.top()?.Enter()
        }
    }

    public applyForceX(force: number): void {
        this.setVelocityX(force)
    }

    public flipPlayerLeft(): void {
        this.flipX = true
        this.isFacingLeft = true
    }

    public flipPlayerRight(): void {
        this.flipX = false
        this.isFacingLeft = false
    }

    update() {
        this.playerStateStack.top()?.Update()
        this.updateFlags()
    }

    private updateFlags(): void {
        if (this.body?.touching.down) {
            this.isGrounded = true
        } else {
            this.isGrounded = false
        }

        if (this.body?.touching.left || this.body?.touching.right) {
            this.isTouchingWall = true
        } else {
            this.isTouchingWall = false
        }
    }
}
