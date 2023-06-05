const info = document.querySelector('.info')
const infoIn = document.querySelector('.info_inner')
info.addEventListener('click', () => {
    info.classList.toggle('active-info')
    if (info.classList.contains('active-info')){
        infoIn.style.top = '10%'
    }else {
        infoIn.style.top = '-100%'
    }
})

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/ground2.png';

const foodImg = new Image();
foodImg.src = 'img/apple.png';

const foodImg2 = new Image();
foodImg2.src = 'img/melon.png';

const foodImg3 = new Image();
foodImg3.src = 'img/pineapple.png';

let box = 32;

let score = 0;
let score2 = 0;
let score3 = 0;

let food = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 16 + 3) * box
};
let food2 = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 16 + 3) * box
};
let food3 = {
    x: Math.floor(Math.random() * 18 + 1) * box,
    y: Math.floor(Math.random() * 16 + 3) * box
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener('keydown', direction);
let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != 'right') {
    dir = 'left';
    } else if(event.keyCode == 38 && dir != 'down'){
    dir = 'up';
    }
    else if(event.keyCode == 39 && dir != 'left'){
    dir = 'right';
    }
    else if(event.keyCode == 40 && dir != 'up'){
    dir = 'down';
    }
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y) {
        clearInterval(game);
        document.getElementById('youLose').removeAttribute('class')
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);

    ctx.drawImage(foodImg, food.x, food.y)
    ctx.drawImage(foodImg2, food2.x, food2.y)
    ctx.drawImage(foodImg3, food3.x, food3.y)

    for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? '#030bfc' : '#036bfc' ;
    ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
    
    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 6, box * 2.2)
    ctx.fillText(score2, box * 12, box * 2.2)
    ctx.fillText(score3, box * 18, box * 2.2)

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x: Math.floor((Math.random() * 18 + 1)) * box,
            y: Math.floor((Math.random() * 16 + 3)) * box
        };
        } else if(snakeX == food2.x && snakeY == food2.y){
            score2++;
            food2 = {
                x: Math.floor((Math.random() * 18 + 1)) * box,
                y: Math.floor((Math.random() * 16 + 3)) * box
            };
        }
            else if(snakeX == food3.x && snakeY == food3.y){
                score3++;
                food3 = {
                    x: Math.floor((Math.random() * 18 + 1)) * box,
                    y: Math.floor((Math.random() * 16 + 3)) * box
                };
                } else {
                    snake.pop();
                }

    if(snakeX < box  || snakeX > box * 18 || snakeY < 3 * box || snakeY > box * 18){
    clearInterval(game);
    document.getElementById('youLose').removeAttribute('class')
    }
    if(score >= 10 && score2 >= 10 && score3 >= 10){
        clearInterval(game);
        document.getElementById('youWin').removeAttribute('class')
    }


    if(dir == 'left') snakeX -= box;
    if(dir == 'right') snakeX += box;
    if(dir == 'up') snakeY -= box;
    if(dir == 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);
    snake.unshift(newHead)
}


let game = setInterval(drawGame, 100)