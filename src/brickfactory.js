import Brick from './brick.js';

export default class BrickFactory{

    #app;

    constructor(pixiApp){
        this.#app = pixiApp;
    }

    createBrick(x, y) {        
        const brick = new Brick(Math.floor(Math.random() * 4));
        if (brick.getStatus() > 0) {
            brick.x = x;
            brick.y = y;
            this.#app.stage.addChild(brick);
            return brick;
        }

        return null;
    }
}