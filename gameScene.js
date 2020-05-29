class gameScene extends Phaser.Scene {
    constructor() {
        super({key: 'gameScene'});
    }

    preload () {
    this.load.image('platform', 'assets/platform.png');
    this.load.image('barry', 'assets/barry2.png');
    this.load.image('virus', 'assets/virus1.png');
}

    create () {
    //title
    this.titleText = this.add.text(225, 30, 'Dodge the Virus', {fontSize: '40px', fill: '#2758e8'});
    this.titleText.setOrigin(0.5);
    this.titleText.depth = 2;

    //player
    gameState.player = this.physics.add.sprite(225, 350, 'barry').setScale(.2);

    //platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(225, 475, 'platform');

    //scores
    gameState.scoreText = this.add.text(250, 465, `Score: 0`, {fontSize: '20px', fill: '#000000'});
    gameState.highScoreText = this.add.text(10, 465, `High Score: ${gameState.highScore}`, {fontSize: '20px', fill: '#000000'});

    //physics
    gameState.player.setCollideWorldBounds(true);
    this.physics.add.collider(gameState.player, platforms);
    gameState.cursors = this.input.keyboard.createCursorKeys();

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
        gameState.score += 10;
        gameState.scoreText.setText(`Score: ${gameState.score}`);
    });

    //endGame
    this.physics.add.collider(gameState.player, germs, () => {
        germGenLoop.destroy();
        this.physics.pause();
        gameState.player.setTint(0x60fc27);
        this.add.text(50, 100, `Game Over.\nPress spacebar to restart.`, {fontSize: '25px', fill: '#000000'});
        if (gameState.highScore < gameState.score) {
            gameState.highScore = gameState.score;
            gameState.highScoreText.setText(`High Score: ${gameState.highScore}`);
            this.add.text(50, 200, `New High Score!\n${gameState.highScore} points`, {fontSize: '40px', fill: '#2758e8'});
        }
        this.input.keyboard.on('keydown_SPACE', () => {
            gameState.score = 0;
            this.scene.restart();
        });
    })

    //pause
    gameState.pauseText = this.add.text(50, 300, `Game Paused.\nPress shift to resume.`, {fontSize: '25px', fill: '#000000'});
    gameState.pauseText.depth = 2;
    gameState.pauseText.visible = false;

    this.input.keyboard.on('keydown_SHIFT', () => {
        this.scene.pause();
        this.scene.launch('pauseScene');
        gameState.pauseText.visible = true;
    }, this);

    this.events.on('pause', () => {
        console.log('game paused');
    })

    this.events.on('resume', () => {
        console.log('game resumed');
    })
}

    update () {
    if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-200);
    }   else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(200);
    }   else {
        gameState.player.setVelocityX(0);
    }
}
}