import Ball from './ball.js';
import Paddle from './paddle.js';
import BrickFactory from './brickfactory.js';

export default class Game {

    #app;
    #paddle;
    #ball;
    #bricks = [];
    #brick_factory;

    constructor(pixiApp) {
        this.#app = pixiApp;

        this.#paddle = new Paddle();
        this.#paddle.x = (this.#app.screen.width - this.#paddle.width) /2;
        this.#paddle.y = this.#app.screen.height - this.#paddle.height;
        this.#app.stage.addChild(this.#paddle);

        this.#ball = new Ball();
        this.#ball.x = this.#app.screen.width /2;
        this.#ball.y = this.#app.screen.height/2;
        this.#app.stage.addChild(this.#ball);

        this.#brick_factory = new BrickFactory(this.#app);

        this.#bricks.push(this.#brick_factory.createBrick(100, 50));
        this.#bricks.push(this.#brick_factory.createBrick(200, 50));
        this.#bricks.push(this.#brick_factory.createBrick(500, 100));

    }

    update() {
        this.#ball.update();

        if (this.detectCollision(this.#ball, this.#paddle)) {
            this.#ball.reverseY();
        };

        for (let brick = 0; brick < this.#bricks.length; brick++) {
            if (this.detectCollision(this.#ball, this.#bricks[brick])) {
            this.#ball.reverseY();
            this.#bricks[brick].damageBrick();
            }
            if (this.#bricks[brick].getStatus() === 0) {
                this.#bricks[brick].removeFromParent();
                this.#bricks.splice(brick, 1);
            }
        };

        this.detectCanvasCollision();

    }

    detectCollision(entity, area) {
        return (entity.x < area.x + area.width && 
                entity.x + entity.width > area.x &&
                entity.y < area.y + area.height && 
                entity.y + entity.height > area.y)
    }

    detectCanvasCollision() {
        if (this.#ball.y > this.#app.screen.height + this.#ball.height) {
            this.#ball = new Ball();
            this.#ball.x = this.#app.screen.width /2;
            this.#ball.y = this.#app.screen.height/2;
            this.#app.stage.addChild(this.#ball);
        }
        if (this.#ball.x + this.#ball.getSpeedX() > this.#app.screen.width) {
            this.#ball.reverseX();
        }
        if (this.#ball.y + this.#ball.getSpeedY() < 0) {
            this.#ball.reverseY();
        }
        if (this.#ball.x + this.#ball.getSpeedX() < 0) {
            this.#ball.reverseX();
        }
    }

    handleMouseMove(e) {
        this.#paddle.movePaddle(e, this.#app);
    }
}
