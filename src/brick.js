import { Container, AnimatedSprite, Assets, Spritesheet } from "pixi.js";

export default class Brick extends Container{

    #status;
    #bricks = {
        frames: {
            white_block1: {
                frame: {x: 0, y: 0, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            red_block1: {
                frame: {x: 0, y: 8, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            grey_block1: {
                frame: {x: 0, y: 16, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
        },
        meta: {
            image: '/sprites/block&back.png',
            size: {w: 128, h: 192}
        },
        animations: {
            white_block: ['white_block1'],
            red_block: ['red_block1'],
            grey_block: ['grey_block1']
        }
    }

    constructor(status){
        super();
        this.#status = status;
        this.#createSprite();
    }

    async #createSprite () {
        const brick = await Assets.load(this.#bricks.meta.image);
        const brick_sheet = new Spritesheet(brick, this.#bricks);
        await brick_sheet.parse();
        let animation;
        if (this.#status === 1){
            animation = new AnimatedSprite(brick_sheet.animations.white_block);
        }
        else if (this.#status === 2){    
            animation = new AnimatedSprite(brick_sheet.animations.red_block);
        }
        else if (this.#status === 3){
            animation = new AnimatedSprite(brick_sheet.animations.grey_block);
        }
        const brick_anim = animation;
        brick_anim.scale.set(3);
        this.addChild(brick_anim);
    }

    damageBrick() {
        this.#status -= 1;
    }
    getStatus() {
        return this.#status;
    }
}