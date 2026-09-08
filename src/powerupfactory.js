import Powerup from './powerup.js';

export default class PowerupFactory{

    #app;

    constructor(pixiApp){
        this.#app = pixiApp;
    }

    createPowerup(brick) {        
        const powerup = new Powerup();
        powerup.x = brick.x;
        powerup.y = brick.y;
        this.#app.stage.addChild(powerup);
        return powerup;

    }
}