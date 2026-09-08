import { Container, AnimatedSprite, Assets, Spritesheet } from "pixi.js";

export default class Powerup extends Container{

    #powerups = {
        frames: {
            large1: {
                frame: {x: 0, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large2: {
                frame: {x: 16, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large3: {
                frame: {x: 32, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large4: {
                frame: {x: 48, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large5: {
                frame: {x: 64, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large6: {
                frame: {x: 80, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large7: {
                frame: {x: 96, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large8: {
                frame: {x: 112, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
        },
        meta: {
            image: '/sprites/powerup.png',
            size: {w: 128, h: 64}
        },
        animations: {
            large: ['large1', 'large2', 'large3', 'large4', 'large5', 'large6', 'large7', 'large8'],
        }
    }

    constructor(){
        super();
        this.#createSprite(); 
    }
    
    update (){
        this.y += 3;
    }

    async #createSprite () {
        const powerup = await Assets.load(this.#powerups.meta.image);
        const powerup_sheet = new Spritesheet(powerup, this.#powerups);
        await powerup_sheet.parse();

        const powerup_anim = new AnimatedSprite(powerup_sheet.animations.large);
        powerup_anim.scale.set(3);
        powerup_anim.animationSpeed = 0.1;
        powerup_anim.play();
        this.addChild(powerup_anim);
    }
}