import Brick from './brick.js';

export default class BrickFactory{

    #app;
    #padding = 10;

    constructor(pixiApp){
        this.#app = pixiApp;
    }

    createBrick(x, y) {        
        const brick = new Brick();
        brick.x = x;
        brick.y = y;
        this.#app.stage.addChild(brick);

        return brick;
    }
}