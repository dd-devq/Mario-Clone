import { Player } from './Player'
import { playerAnimationKey } from '../../Constant/AnimationKey'

export class HitState extends State<Player> {
    public Enter(): void {
        this.parent.play(playerAnimationKey.HIT)
    }

    public Update(): void {
        //
    }

    public Exit(): void {
        this.parent.stop()
    }
}
