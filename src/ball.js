import { Container, Graphics } from "pixi.js";

export default class Ball extends Container{

    #speed;
    #max_speed = 10;

    constructor(){
            super();
            const sprite = new Graphics();
            sprite.circle(0,0,10)
            .fill({
                color: 0xffff00
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
        this.#gainingSpeed();
    }
    reverseX() {
        this.#speed.x *= -1;
        this.#gainingSpeed();
    }
    getSpeedY() {
        return (this.#speed.y + this.#speed.acceleration);
    }
    getSpeedX() {
        return (this.#speed.x + this.#speed.acceleration);
    }
    getRadius() {
        return 10;
    }
    resetSpeed() {
        if (this.#speed.x < 0) {
            this.#speed.x = -1;
        }
        else {
            this.#speed.x = 1;
        }
        if (this.#speed.y < 0) {
            this.#speed.y = -2;
        }
        else {
            this.#speed.y = 2
        }
    }

    #gainingSpeed() {
        if (this.#speed.y < 0 && this.#speed.y > -this.#max_speed) {
            this.#speed.y -= 0.1;
        }
        else if (this.#speed.y < 0 && this.#speed.y < this.#max_speed){
            this.#speed.y += 0.1;
        }
        if (this.#speed.x < 0 && this.#speed.x > -this.#max_speed) {
            this.#speed.x -= 0.1;
        }
        else if (this.#speed.x < this.#max_speed){
            this.#speed.x += 0.1;
        }
    }
}