import { playerAnimationKey } from '../../Constant/AnimationKey'
import { Player } from './Player'

export class RunState extends State<Player> {
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
