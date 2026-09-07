import { Container, Graphics } from "pixi.js";

export default class Brick extends Container{

    #status = 1;

    constructor(){
        super();

        const sprite = new Graphics();
        sprite.rect(0,0,80,15)
        .fill({
            color: 0xff0000

        });

        this.addChild(sprite);
    }

    damageBrick() {
        this.#status -= 1;
    }
    getStatus() {
        return this.#status;
    }
}