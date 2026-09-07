/* const CANVAS_NODE = document.getElementById('arkanoid');
const CTX = CANVAS_NODE.getContext('2d');

const BALL_RADIUS = 10;

CTX.fillStyle = '#0095DD';
CTX.font = '16px Arial';

const PADDLE_WIDTH = 75;
const PADDLE_HEIGHT = 10;

const BRICK_ROW_COUNT = 5;
const BRICK_COLUMN_COUNT = 3;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 20;
const BRICK_PADDING = 10;
const BRICK_OFFSET = 30;

let ballX = CANVAS_NODE.width / 2;
let ballY = CANVAS_NODE.height - 30;
let dx = 2;
let dy = -2;

let paddleX = (CANVAS_NODE.width - PADDLE_WIDTH) / 2;

let score = 0;
let lives = 2;

const bricks = [];

for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
  bricks[c] = [];

  for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBall() {
    CTX.beginPath();
    CTX.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
    CTX.fill();
    CTX.closePath();
}

function drawPaddle() {
    CTX.beginPath();
    CTX.rect(paddleX, CANVAS_NODE.height - PADDLE_HEIGHT, 
        PADDLE_WIDTH,
        PADDLE_HEIGHT
    )

    CTX.fill();
    CTX.closePath();
}

function drawBricks() {
    for (let c = 0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r = 0; r < BRICK_ROW_COUNT; r++) {
    
            if (bricks[c][r].status ==+ 1) {
                const BRICK_X = r * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET;
                const BRICK_Y = c * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET;

                bricks[c][r].x = BRICK_X;
                bricks[c][r].y = BRICK_Y;

                CTX.beginPath();
                CTX.rect(BRICK_X, BRICK_Y, BRICK_WIDTH, BRICK_HEIGHT);
                CTX.fill();
                CTX.closePath();
            }   
        }
    }
}

function drawScore() {
    CTX.fillText("Счёт: " + score, 8, 20);
}

function drawLives() {
    CTX.fillText("Жизней: " + lives, CANVAS_NODE.width - 85, 20);
}

function detectCollision() {
    for (let c=0; c < BRICK_COLUMN_COUNT; c++) {
        for (let r=0; r<BRICK_ROW_COUNT; r++) {
            let brick = bricks [c][r];

            if (brick.status === 1) {
                const isCollisionTrue = ballX > brick.x && ballX < brick.x + BRICK_WIDTH &&
                                        ballY > brick.y && ballY < brick.y + BRICK_HEIGHT

                if (isCollisionTrue) {
                    dy = -dy;
                    brick.status= 0;

                    score++;

                    if (score === BRICK_ROW_COUNT * BRICK_COLUMN_COUNT) {
                        alert('Победа!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

document.addEventListener('mousemove', handleMouseMove);

function handleMouseMove(e) {
    const RELATIVE_X = e.clientX - CANVAS_NODE.offsetLeft;

    if (RELATIVE_X > 0 && RELATIVE_X < CANVAS_NODE.width) {
        paddleX = RELATIVE_X - PADDLE_WIDTH / 2;
    } 
}

function draw() {
    CTX.clearRect(0, 0, CANVAS_NODE.width, CANVAS_NODE.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
    drawLives();
    detectCollision();

    if (ballX + dx < BALL_RADIUS || ballX + dx > CANVAS_NODE.width - BALL_RADIUS) {
        dx = -dx;
    }

    if (ballY + dy < BALL_RADIUS) {
        dy = -dy;
    }

    if (ballY + dy > CANVAS_NODE.height - BALL_RADIUS) {
        if (ballX > paddleX && ballX < paddleX + PADDLE_WIDTH) {
            dy = -dy;
        } else {
            lives --;

            if (lives === 0) {
                    alert('Поражение!');
                    document.location.reload();
                }
                else {
                    ballX = CANVAS_NODE.width / 2;
                    ballY = CANVAS_NODE.height - 30;
                    dx = 2;
                    dy = -2;
                }
        }
    }

    ballX += dx;
    ballY += dy;

    requestAnimationFrame(draw);
}

draw();

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

    const game = new Game(app);
    app.ticker.add(game.update, game);

    app.canvas.style.position = 'absolute';    
    document.body.appendChild(app.canvas);

    // background
    const backgrounds = {
        frames: {
            blue_hex1: {
                frame: {x: 0, y: 0, w:224, h: 239},
                sourceSize: {w:224, h: 239},
                spriteSourceSize: {x: 0, y: 0, w:224, h: 239}
            },
            blue_hex2: {
                frame: {x: 0, y: 256, w:224, h: 239},
                sourceSize: {w:224, h: 239},
                spriteSourceSize: {x: 0, y: 0, w:224, h: 239}
            }
        },
        meta: {
            image: '/sprites/back.png',
            size: {w: 1152, h: 496}
        },
        animations: {
            blue_hex: ['blue_hex1', 'blue_hex2']
        }
    }

    const back = await Assets.load(backgrounds.meta.image);
    const backsheet = new Spritesheet(back, backgrounds);
    await backsheet.parse();

    const blue_hex_anim = new AnimatedSprite(backsheet.animations.blue_hex);

    blue_hex_anim.animationSpeed =  0.02;
    blue_hex_anim.play();
    blue_hex_anim.width = app.screen.width;
    blue_hex_anim.height = app.screen.height - 40;
    blue_hex_anim.y = 40;

    app.stage.addChild(blue_hex_anim);

    // paddle
    const paddles = {
        frames: {
            ball1: {
                frame: {x: 0, y: 40, w:5, h: 4},
                sourceSize: {w:5, h: 4},
                spriteSourceSize: {x: 0, y: 0, w:5, h: 4}
            },
            idle1: {
                frame: {x: 32, y: 0, w:32, h: 8},
                sourceSize: {w:32, h: 8},
                spriteSourceSize: {x: 0, y: 0, w:32, h: 8}
            },
        },
        meta: {
            image: '/sprites/paddle.png',
            size: {w: 208, h: 100}
        },
        animations: {
            ball: ['ball1'],
            idle: ['idle1']
        }
    }

    const paddle = await Assets.load(paddles.meta.image);
    const paddle_sheet = new Spritesheet(paddle, paddles);
    await paddle_sheet.parse();

    const paddle_anim = new AnimatedSprite(paddle_sheet.animations.idle);

    paddle_anim.scale.set(3);
    paddle_anim.x = (app.screen.width - paddle_anim.width) /2;
    paddle_anim.y = app.screen.height -30;

    app.stage.addChild(paddle_anim);

    app.stage.eventMode = 'static';
    app.stage.on('mousemove', movePaddle);

    function movePaddle(e) {
        let pos = e.global;

        if (pos.x > (8 + paddle_anim.width /6)
            && pos.x < app.screen.width - (8 + paddle_anim.width+ paddle_anim.width /6)) {
            paddle_anim.x = pos.x;
        } 
    };

    // ball
    const ball_anim = new AnimatedSprite(paddle_sheet.animations.ball);

    ball_anim.scale.set(3);
    ball_anim.x = app.screen.width /2;
    ball_anim.y = app.screen.height /2;

    app.stage.addChild(ball_anim);

    // text
    const text_style = new TextStyle({
            fill: 0xffffff,
            fontSize: 24
        },);

    const score = new Text({
        text: 'Счёт: ',
        style: text_style
    });

    const lives = new Text({
        text: 'Жизни: ',
        style: text_style
    });
    lives.x = 550;

    app.stage.addChild(score);
    app.stage.addChild(lives);
})();
 */