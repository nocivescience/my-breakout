const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const score = 0;
const brickRowCount=9;
const brickColumnCount=5;
const colors=[
    'red',
    'green',
    'yellow',
]
rulesBtn.addEventListener('click',()=>{
    rules.classList.add('show')
})
closeBtn.addEventListener('click',()=>{
    rules.classList.remove('show')
})
// creando la bola
const ball = {
    x: canvas.width/2,
    y: canvas.height-130,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    color: '#0095DD'
}
// creando el paddle
const paddle = {
    x: canvas.width/2 - 40,
    y: canvas.height-30,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}
// creando los ladrillos
const bricks = [];
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}
for(let i=0; i<brickRowCount; i++){
    bricks[i] = [];
    for(let j=0; j<brickColumnCount; j++){
        const x=i*(brickInfo.w+brickInfo.padding)+brickInfo.offsetX;
        const y=j*(brickInfo.h+brickInfo.padding)+brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}
console.log(bricks[0][1])
function drawBricks(){
    bricks.forEach(column=>{
        column.forEach((brick,index)=>{
            ctx.fillStyle=colors[index%colors.length];
            ctx.fillRect(brick.x,brick.y,brick.w,brick.h);
        })
    })
}
function drawPaddle(){
    ctx.fillStyle='black';
    ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
}
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle='rgb(49, 49, 49)';
    ctx.arc(ball.x,ball.y,ball.size,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
}
function movePaddle(){
    paddle.x+=paddle.dx;
    if(paddle.x<0){
        paddle.x=0
    }else if(paddle.x>canvas.width-paddle.w){
        paddle.x=canvas.width-paddle.w
    }
}
function moveBall(){
    ball.x+=ball.dx;
    ball.y+=ball.dy;
    if(ball.x+ball.size>canvas.width||ball.x-ball.size<0){
        ball.dx*=-1;
    }else if(ball.y+ball.size>canvas.height||ball.y-ball.size<0){
        ball.dy*=-1;
    }
}
function keyDown(e){
    switch(e.key){
        case 'd':
            paddle.dx=paddle.speed;
            break;
        case 'a':
            paddle.dx=-paddle.speed;
            break;
    }
}
function keyUp(e){
    switch(e.key){
        case 'd':
            paddle.dx=0;
            break;
        case 'a':
            paddle.dx=0;
            break;
    }
}
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBall();
    drawBricks();
    drawPaddle();
}
function update(){
    movePaddle();
    moveBall();
    draw();
    requestAnimationFrame(update)
}
update();
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);