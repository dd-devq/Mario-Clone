export class AudioManager {
    private static instance: AudioManager
    private bgm: Phaser.Sound.BaseSound
    private isMuted = false

    static get Instance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager()
        }

        return AudioManager.instance
    }

    public playSoundFX(scene: Phaser.Scene, SoundFXKey: string) {}

    public playBGM() {}

    public stopBGM(scene: Phaser.Scene) {}

    public mute() {}

    public unmute() {}
}

AudioManager.Instance
