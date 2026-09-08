import { Container, AnimatedSprite, Assets, Spritesheet } from "pixi.js";

export default class Powerup extends Container{

    #powerups = {
        frames: {
            slow1: {
                frame: {x: 0, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow2: {
                frame: {x: 16, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow3: {
                frame: {x: 32, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow4: {
                frame: {x: 48, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow5: {
                frame: {x: 64, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow6: {
                frame: {x: 80, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow7: {
                frame: {x: 96, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            slow8: {
                frame: {x: 112, y: 0, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
                        laser1: {
                frame: {x: 0, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser2: {
                frame: {x: 16, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser3: {
                frame: {x: 32, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser4: {
                frame: {x: 48, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser5: {
                frame: {x: 64, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser6: {
                frame: {x: 80, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser7: {
                frame: {x: 96, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            laser8: {
                frame: {x: 112, y: 16, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large1: {
                frame: {x: 0, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large2: {
                frame: {x: 16, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large3: {
                frame: {x: 32, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large4: {
                frame: {x: 48, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large5: {
                frame: {x: 64, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large6: {
                frame: {x: 80, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large7: {
                frame: {x: 96, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            large8: {
                frame: {x: 112, y: 24, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink1: {
                frame: {x: 0, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink2: {
                frame: {x: 16, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink3: {
                frame: {x: 32, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink4: {
                frame: {x: 48, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink5: {
                frame: {x: 64, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink6: {
                frame: {x: 80, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink7: {
                frame: {x: 96, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
            shrink8: {
                frame: {x: 112, y: 48, w:16, h: 7},
                sourceSize: {w:16, h: 7},
                spriteSourceSize: {x: 0, y: 0, w:16, h: 7}
            },
        },
        meta: {
            image: '/sprites/powerup.png',
            size: {w: 128, h: 64}
        },
        animations: {
            slow: ['slow1', 'slow2', 'slow3', 'slow4', 'slow5', 'slow6', 'slow7', 'slow8'],
            large: ['large1', 'large2', 'large3', 'large4', 'large5', 'large6', 'large7', 'large8'],
            laser: ['laser1', 'laser2', 'laser3', 'laser4', 'laser5', 'laser6', 'laser7', 'laser8'],
            shrink: ['shrink1', 'shrink2', 'shrink3', 'shrink4', 'shrink5', 'shrink6', 'shrink7', 'shrink8'],
        }
    }

    #status;

    constructor(){
        super();
        this.#status = Math.floor(Math.random() * 4);
        this.#createSprite(); 
    }
    
    update (){
        this.y += 3;
    }

    async #createSprite () {
        const powerup = await Assets.load(this.#powerups.meta.image);
        const powerup_sheet = new Spritesheet(powerup, this.#powerups);
        await powerup_sheet.parse();

        let animation;
        if (this.#status === 0){
            animation = new AnimatedSprite(powerup_sheet.animations.slow);
        }
        if (this.#status === 1){
            animation = new AnimatedSprite(powerup_sheet.animations.large);
        }
        else if (this.#status === 2){    
            animation = new AnimatedSprite(powerup_sheet.animations.laser);
        }
        else if (this.#status === 3){
            animation = new AnimatedSprite(powerup_sheet.animations.shrink);
        }

        const powerup_anim = animation;
        powerup_anim.scale = 3;
        powerup_anim.animationSpeed = 0.1;
        powerup_anim.play();
        this.addChild(powerup_anim);
    }

    getStatus() {
        return this.#status;
    }
}