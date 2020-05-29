class startScene extends Phaser.Scene {
    constructor() {
        super({key: 'startScene'});
    }

    preload () {
        this.load.image('platform', 'assets/platform.png');
        this.load.image('virus', 'assets/virus1.png');
    }

    create() {

        this.input.keyboard.on('keydown_SPACE', () => {
            this.scene.stop('startScene');
            this.scene.start('gameScene');
        })

        //platforms
        const platforms = this.physics.add.staticGroup();
        platforms.create(225, 475, 'platform');

        //enemies
        const germs = this.physics.add.group();

        function germGen () {
            const xCoord = Math.random() * 450;
            germs.create(xCoord, 10, 'virus').setScale(.1);
        }

        const germGenLoop = this.time.addEvent({
            delay: 100,
            callback: germGen,
            callbackScope: this,
            loop: true,
        });

        this.physics.add.collider(germs, platforms, function (germ) {
            germ.destroy();
        });

        this.titleText = this.add.text(50, 100, 'Dodge the Virus', {fontSize: '40px', fill: '#2758e8'});
            this.titleText.depth = 2;
        this.startText = this.add.text(50, 200, 'Press spacebar to start.', {fontSize:'25px', fill: '#000000'});
            this.startText.depth = 2;
        this.pauseInstruct = this.add.text(50, 300, 'You can pause at any time\n   using shift.', {fontSize: '25px', fill: '#000000'});
            this.pauseInstruct.depth = 2;
    }
}