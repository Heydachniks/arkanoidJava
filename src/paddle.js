import { Container, Assets, Spritesheet, AnimatedSprite } from "pixi.js";

export default class Paddle extends Container{
    #paddles = {
        frames: {
            idle1: {
                frame: {x: 32, y: 0, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
        },
        meta: {
            image: '/sprites/paddle.png',
            size: {w: 208, h: 100}
        },
        animations: {
            idle: ['idle1']
        }
    }

    constructor(){
        super();
        this.#createSprite();

    }

    async #createSprite () {
        const paddle = await Assets.load(this.#paddles.meta.image);
        const paddle_sheet = new Spritesheet(paddle, this.#paddles);
        await paddle_sheet.parse();

        const paddle_anim = new AnimatedSprite(paddle_sheet.animations.idle);
        paddle_anim.scale.set(3);
        this.addChild(paddle_anim);
    }

    movePaddle(e, app) {
        let pos = e.clientX;

        if (pos > 24
            && pos < app.screen.width - this.width - 24) {
            this.x = pos;
        } 
    };
}