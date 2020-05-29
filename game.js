
    const gameState = {
        score: 0,
        highScore: 0,
        pauseText: 0
    };

    const config = {
        type: Phaser.AUTO,
        width: 450,
        height: 500,
        backgroundColor: 'eeaf3a',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 200},
                enableBody: true,
            }
        },
        scene: [startScene, gameScene, pauseScene]
    };

    const game = new Phaser.Game(config);

