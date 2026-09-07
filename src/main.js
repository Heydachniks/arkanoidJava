import Game from "./game.js"

import { Application, 
        Text, TextStyle, 
        Graphics, Rectangle, Sprite, 
        Container,
        Assets, Spritesheet, AnimatedSprite} from "pixi.js";

(async() => {

    const app = new Application();

    await app.init({
        width: 672,
        height: 740,
    });

    app.canvas.style.position = 'absolute';    
    document.body.appendChild(app.canvas);

    const game = new Game(app);
    app.ticker.add(game.update, game);

    app.stage.eventMode = 'static';
    app.stage.hitArea = app.screen;
    document.addEventListener('mousemove', 
        function(e){game.handleMouseMove(e)})
})();
