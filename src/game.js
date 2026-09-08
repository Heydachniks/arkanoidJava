import Ball from './ball.js';
import Paddle from './paddle.js';
import BrickFactory from './brickfactory.js';
import PowerupFactory from './powerupfactory.js';

import { Text, AnimatedSprite, Assets, Spritesheet  } from 'pixi.js';

export default class Game {

    #app;
    #paddle;
    #ball;
    #bricks = [];
    #brick_factory;
    #powerups = [];
    #powerup_factory;
    #score = 0;
    #lives = 10;
    #lives_text;
    #score_text;

    #backgrounds = {
        frames: {
            blue_hex1: {
                frame: {x: 0, y: 0, w:224, h: 239},
                sourceSize: {w:224, h: 239},
                spriteSourceSize: {x: 0, y: 0, w:224, h: 239}
            },
            blue_hex2: {
                frame: {x: 0, y: 256, w:224, h: 239},
                sourceSize: {w:224, h: 239},
                spriteSourceSize: {x: 0, y: 0, w:224, h: 239}
            }
        },
        meta: {
            image: '/sprites/back.png',
            size: {w: 1152, h: 496}
        },
        animations: {
            blue_hex: ['blue_hex1', 'blue_hex2']
        }
    }

    constructor(pixiApp) {
        this.#app = pixiApp;

        this.#createBackground();

        this.#paddle = new Paddle();
        this.#paddle.x = (this.#app.screen.width - 96) /2;
        this.#paddle.y = this.#app.screen.height - 24;
        this.#app.stage.addChild(this.#paddle);

        this.#ball = new Ball();
        this.#ball.x = this.#app.screen.width /2;
        this.#ball.y = this.#app.screen.height/2;
        this.#app.stage.addChild(this.#ball);

        this.#powerup_factory = new PowerupFactory(this.#app);

        this.#brick_factory = new BrickFactory(this.#app);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 14; j++) {
                const brick = this.#brick_factory.createBrick(
                    (j * 45) + 20,
                    (i * 21) + 150
                );

                if (brick) {
                    this.#bricks.push(brick);
                }
            }
        }

        this.#lives_text = new Text({
            text: 'Lives: ' + this.#lives,
            style: {
                fontFamily: 'Arial',
                fontSize: 32,
                fill: '#ffffff',
            }
        });
        this.#app.stage.addChild(this.#lives_text);

        this.#score_text = new Text({
            text: 'Score: ' + this.#score,
            style: {
                fontFamily: 'Arial',
                fontSize: 32,
                fill: '#ffffff',
            }
        });
        this.#score_text.x = this.#app.screen.width - 150;
        this.#app.stage.addChild(this.#score_text);
    }

    update() {
        this.#ball.update();

        this.detectBallPaddleCollision();

        for (let brick = 0; brick < this.#bricks.length; brick++) {
            if (this.detectBallCollision(this.#bricks[brick])) {
                this.detectBallBrickCollision(this.#bricks[brick]);
                this.#bricks[brick].damageBrick();
                console.log(this.#bricks[brick].getStatus());
                    if (this.#bricks[brick].getStatus() === 0) {
                        if (Math.random() < 0.5) {
                            const powerup = this.#powerup_factory.createPowerup(this.#bricks[brick]);
                            this.#powerups.push(powerup);
                        }
                        this.#bricks[brick].removeFromParent();
                        this.#bricks.splice(brick, 1);
                        this.#score++;
                        this.#score_text.text = 'Score: ' + this.#score;
                    }
                break;
            }
        };

        for (let powerup = 0; powerup < this.#powerups.length; powerup++) {
            this.#powerups[powerup].update();
            if (this.detectCollision(this.#powerups[powerup], this.#paddle)) {
                this.powerupAction(this.#powerups[powerup]);
                this.#powerups[powerup].removeFromParent();
                this.#powerups.splice(powerup, 1);
            }
        };

        this.detectCanvasCollision();

        if (this.#lives === 0) {
            alert('Поражение!');
        }
        if (this.#bricks.length === 0) {
            alert('Победа!');
        }

    }

    powerupAction (powerup) {
        if (powerup.getStatus() === 0) {
            this.#ball.resetSpeed();
        }
        else if (powerup.getStatus() === 1) {
            this.#paddle.becomeLarge();
        }
        else if (powerup.getStatus() === 2) {
            this.#score++;
            this.#score_text.text = 'Score: ' + this.#score;
        }
        else if (powerup.getStatus() === 3) {
            this.#paddle.becomeSmall();
        }
    }

    detectCollision(entity, area) {
        return (entity.x < area.x + area.width && 
                entity.x + entity.width > area.x &&
                entity.y < area.y + area.height && 
                entity.y + entity.height > area.y);
    }

    detectBallCollision(area) {
        return (this.#ball.x - this.#ball.getRadius() < area.x + area.width && 
                this.#ball.x + this.#ball.getRadius() > area.x &&
                this.#ball.y - this.#ball.getRadius() < area.y + area.height && 
                this.#ball.y + this.#ball.getRadius() > area.y);
    }

    detectBallBrickCollision(brick) {
        const overlapLeft = this.#ball.x + this.#ball.getRadius() - brick.x;
        const overlapRight = brick.x + brick.width - this.#ball.x - this.#ball.getRadius();
        const overlapTop = this.#ball.y + this.#ball.getRadius() - brick.y;
        const overlapBottom = brick.y + brick.height - this.#ball.y - this.#ball.getRadius();

        const overlapX = Math.min(overlapLeft, overlapRight);
        const overlapY = Math.min(overlapTop, overlapBottom);

        if (overlapX < overlapY) {
        this.#ball.reverseX();
        } else {
            this.#ball.reverseY();
        }
    }

    detectBallPaddleCollision() {
        if (this.detectBallCollision(this.#paddle)) {
            if (this.#ball.x < this.#paddle.x + this.#paddle.width / 2
                && this.#ball.getSpeedX() > 0) {
                this.#ball.reverseX();
            }
            else if (this.#ball.x >= this.#paddle.x + this.#paddle.width / 2 
                && this.#ball.getSpeedX() < 0){
                this.#ball.reverseX();
            }
            this.#ball.reverseY();
        }
    }

    detectCanvasCollision() {
        if (this.#ball.y > this.#app.screen.height + this.#ball.height 
            && ! this.detectBallCollision(this.#paddle)) {
            this.#ball = new Ball();
            this.#ball.x = this.#app.screen.width /2;
            this.#ball.y = this.#app.screen.height/2;
            this.#app.stage.addChild(this.#ball);
            this.#lives -= 1;
            this.#lives_text.text = 'Lives: ' + this.#lives;
        }
        if (this.#ball.x + this.#ball.getRadius() > this.#app.screen.width - 24) {
            this.#ball.reverseX();
        }
        if (this.#ball.y - this.#ball.getRadius() < 74) {
            this.#ball.reverseY();
        }
        if (this.#ball.x - this.#ball.getRadius() < 24) {
            this.#ball.reverseX();
        }
    }

    handleMouseMove(e) {
        this.#paddle.movePaddle(e, this.#app);
    }

    async #createBackground (){
        const back = await Assets.load(this.#backgrounds.meta.image);
        const backsheet = new Spritesheet(back, this.#backgrounds);
        await backsheet.parse();

        const blue_hex_anim = new AnimatedSprite(backsheet.animations.blue_hex);

        blue_hex_anim.animationSpeed =  0.02;
        blue_hex_anim.play();
        blue_hex_anim.width = this.#app.screen.width;
        blue_hex_anim.height = this.#app.screen.height - 50;
        blue_hex_anim.y = 50;

        this.#app.stage.addChildAt(blue_hex_anim, 0);
    }
}
