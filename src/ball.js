import { Container, Graphics } from "pixi.js";

export default class Ball extends Container{

    #speed;

    constructor(){
            super();
            const sprite = new Graphics();
            sprite.circle(0,0,10)
            .fill({
                color: 0x00ff00
            });
            this.addChild(sprite);
            this.#speed = {
                x: 1,
                y: 3,
                acceleration: 0
            };
        }

    update(){
        this.y = this.y + this.#speed.y;
        this.x = this.x + this.#speed.x;
    }

    reverseY() {
        this.#speed.y *= -1;
    }
    reverseX() {
        this.#speed.x *= -1;
    }
    getSpeedY() {
        return (this.#speed.y + this.#speed.acceleration);
    }
    getSpeedX() {
        return (this.#speed.x + this.#speed.acceleration);
    }
}