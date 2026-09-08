import { Container, Assets, Spritesheet, AnimatedSprite } from "pixi.js";

export default class Paddle extends Container{
    #paddles = {
        frames: {
            normal1: {
                frame: {x: 32, y: 0, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            normal2: {
                frame: {x: 32, y: 8, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            normal3: {
                frame: {x: 32, y: 16, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            normal4: {
                frame: {x: 32, y: 24, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            normal5: {
                frame: {x: 32, y: 32, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            normal6: {
                frame: {x: 32, y: 40, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
            large1: {
                frame: {x: 64, y: 0, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
            large2: {
                frame: {x: 64, y: 8, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
            large3: {
                frame: {x: 64, y: 16, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
            large4: {
                frame: {x: 64, y: 24, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
            large5: {
                frame: {x: 64, y: 32, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
            large6: {
                frame: {x: 64, y: 40, w:48, h: 8},
                sourceSize: {w:48, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:48, h: 8}
            },
        },
        meta: {
            image: '/sprites/paddle.png',
            size: {w: 208, h: 100}
        },
        animations: {
            normal: ['normal1', 'normal2', 'normal3', 'normal4', 'normal5', 'normal6'],
            large: ['large1', 'large2', 'large3', 'large4', 'large5', 'large6']
        }
    }

    #paddle_sheet;
    #paddle_anim;

    constructor(){
        super();
        this.#createSprite();

    }

    async #createSprite () {
        const paddle = await Assets.load(this.#paddles.meta.image);
        this.#paddle_sheet = new Spritesheet(paddle, this.#paddles);
        await this.#paddle_sheet.parse();

        this.#paddle_anim = new AnimatedSprite(this.#paddle_sheet.animations.normal);
        this.#paddle_anim.scale.set(3);
        this.#paddle_anim.animationSpeed = 0.1;
        this.#paddle_anim.play();
        this.addChild(this.#paddle_anim);
    }

    movePaddle(e, app) {
        let pos = e.clientX;

        if (pos > 24
            && pos < app.screen.width - this.width - 24) {
            this.x = pos;
        } 
    };

    becomeLarge() {
        this.#paddle_anim.textures = this.#paddle_sheet.animations.large;
        this.#paddle_anim.animationSpeed = 0.1;
        this.#paddle_anim.play();
    }
    becomeSmall() {
        this.#paddle_anim.textures = this.#paddle_sheet.animations.normal;
        this.#paddle_anim.animationSpeed = 0.1;
        this.#paddle_anim.play();
    }
}