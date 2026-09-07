import { Container, Graphics } from "pixi.js";

export default class Paddle extends Container{
    constructor(){
        super();
        const sprite = new Graphics();
        sprite.rect(0,0,80,15)
        .fill({
            color: 0x0000ff
        });
        this.addChild(sprite);

    }

    movePaddle(e, app) {
        let pos = e.clientX;

        if (pos > (8 + this.width /6)
            && pos < app.screen.width - (8 + this.width+ this.width /6)) {
            this.x = pos;
        } 
    };
}