const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed=7; /* update screen 7 times per second */

let tileCount = 20; /* snake original is 20*/
let tileSize = canvas.width/tileCount - 2; /* originally is - 2 */
let headX =10; /* head of the snake */
let headY =10; 
const SnakeParts = [];
let tailLengt = 2;
let Applex = 5;
let Appley = 5;

let xVelocity = 0;
let yVelocity = 0;/*  changes the veolocity */
 /* set setTimeout */

 let score = 0;
/*  gameloop */
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if (result){
        return;
    }


    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //lose when hit the wall
    if (headX < 0){
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if (headY < 0){
        gameOver = true;
    }
    else if (headY === tileCount){
        gameOver = true;
    }
/*    for(let i = 0; i < SnakeParts.length, i++){
        let part = SnakeParts[i];
        if (part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }  */

    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        ctx.fillText("Game Over!", canvas.width/ 6.5, canvas.height/ 2)
    }

    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white"
    ctx.font= "12px Verdana" 
    ctx.fillText("Puntos " + score, canvas.width-60, 15);
}

function clearScreen(){
    ctx.fillStyle ="black"
    /* allows to draw in the screen */
    ctx.fillRect(0,0,canvas.width,canvas.height); /* fillrect is a rectangle this is for black background */
}
function drawSnake(){

    ctx.fillStyle = 'green'
    for(let i=0; i < SnakeParts.length; i++){
        let part = SnakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount,tileSize,tileSize)
    }
    SnakeParts.push(new SnakePart(headX, headY)); // is placeded on th place of th head
    if(SnakeParts.length > tailLengt){
        SnakeParts.shift();// remove the first item
    }
    ctx.fillStyle = 'orange' /* like a paintbrush */
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(Applex*tileCount, Appley*tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if (Applex == headX && Appley == headY){ // change the position every time a colision happend
        Applex = Math.floor(Math.random() * tileCount);
        Appley = Math.floor(Math.random() * tileCount);
        tailLengt++;
        score++;
    }
}

document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    //up w
    if(event.keyCode == 87){
        if(yVelocity == 1) //not allowed to move in you body
            return; /* is return to de event */
        yVelocity = -1;
        xVelocity = 0;   
    } /*downs s */ 
    if(event.keyCode == 83){
        if(yVelocity == -1) //not allowed to move in you body
            return; /* is return to de event */
        yVelocity = 1;
        xVelocity = 0;
    } /* left a */
    if(event.keyCode == 65){
        if(xVelocity == 1) //not allowed to move in you body
            return; /* is return to de event */
        yVelocity = 0;
        xVelocity = -1;
    }   //right d
    if(event.keyCode == 68){
        if(xVelocity == -1) //not allowed to move in you body
            return; /* is return to de event */
        yVelocity = 0;
        xVelocity = 1;
    }

}
drawGame();