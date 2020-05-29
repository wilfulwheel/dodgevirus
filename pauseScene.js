class pauseScene extends Phaser.Scene {
    constructor() {
        super({key: 'pauseScene'});
    }

    create () {

        this.input.keyboard.on('keydown_SHIFT', () => {
            gameState.pauseText.visible = false;
            this.scene.resume('gameScene');
        }, this);
    }
}