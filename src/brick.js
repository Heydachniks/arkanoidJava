import { Container, AnimatedSprite, Assets, Spritesheet } from "pixi.js";

export default class Brick extends Container{

    #class;
    #status;
    #brick_anim;
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
            grey_block2: {
                frame: {x: 16, y: 16, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            grey_block3: {
                frame: {x: 32, y: 16, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            grey_block4: {
                frame: {x: 48, y: 16, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            grey_block5: {
                frame: {x: 64, y: 16, w:15, h: 7},
                sourceSize: {w:15, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:15, h: 7}
            },
            grey_block6: {
                frame: {x: 80, y: 16, w:15, h: 7},

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
            grey_block: ['grey_block1', 'grey_block2', 'grey_block3', 'grey_block4', 'grey_block5', 'grey_block6']
        }
    }

    constructor(status){
        super();
        this.#class = status;
        this.#status = status;
        this.#createSprite();
    }

    async #createSprite () {
        const brick = await Assets.load(this.#bricks.meta.image);
        const brick_sheet = new Spritesheet(brick, this.#bricks);
        await brick_sheet.parse();
        let animation;
        if (this.#class === 1){
            animation = new AnimatedSprite(brick_sheet.animations.white_block);
        }
        else if (this.#class === 2){    
            animation = new AnimatedSprite(brick_sheet.animations.red_block);
        }
        else if (this.#class === 3){
            animation = new AnimatedSprite(brick_sheet.animations.grey_block);
        }
        this.#brick_anim = animation;
        this.#brick_anim.scale.set(3);
        this.addChild(this.#brick_anim);
    }

    damageBrick() {
        if (this.#class === 3) {
            this.#brick_anim.animationSpeed = 0.1;
            this.#brick_anim.loop = false;
            this.#brick_anim.gotoAndPlay(0);
        }
        this.#status -= 1;
    }
    getStatus() {
        return this.#status;
    }
}