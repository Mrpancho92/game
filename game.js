var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
const button = document.querySelector(".start");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/pasha/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
var score_audio_gaz = new Audio();
var fail = new Audio();

fly.src = "audio/pasha/fly.m4a";
score_audio.src = "audio/pasha/score.m4a";
score_audio_gaz.src = "audio/pasha/gaz.m4a";
fail.src = "audio/pasha/fail.m4a";

var gap = 120;

// При нажатии на какую-либо кнопку


function moveUp() {
 yPos -= 25;
 fly.volume = 0.5;
 fly.play();
}

// Создание блоков
var pipe = [];

pipe[0] = {
 x : cvs.width,
 y : 0
}

var score = 0;
// Позиция птички
var xPos = 10;
var yPos = 150;
var grav = 0.8;

isRunning = false;
function draw(isRunning) {

 ctx.drawImage(bg, 0, 0);

 for(var i = 0; i < pipe.length; i++) {
 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

 pipe[i].x = pipe[i].x - 0.5;

 if(pipe[i].x == 10) {
 pipe.push({
 x : cvs.width,
 y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 });
 }

 // Отслеживание прикосновений
 if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && 
    (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) 
     || yPos + bird.height >= cvs.height - fg.height) {
    isRunning = false;    
    // location.reload();
  // Перезагрузка страницы
 }

 if(pipe[i].x == 5) {
 score++;
 if (pipe.length % 5 === 0) {
    score_audio_gaz.play();
 } else {
    score_audio.play();
 }
 }
 }

 ctx.drawImage(fg, 0, cvs.height - fg.height);
 ctx.drawImage(bird, xPos, yPos);

 yPos += grav;

 ctx.fillStyle = "#000";
 ctx.font = "24px Verdana";
 ctx.fillText("Счет: " + score, 10, cvs.height - 20);

 if (isRunning) {
    requestAnimationFrame(draw);
 } else {
    fail.play(); 
    setTimeout(() => {
        location.reload();
    },1500)
 }
}


button.addEventListener('click', () => {
    document.addEventListener("keydown", moveUp);
    document.addEventListener("touchstart", moveUp);
    draw(true);
    button.blur();
}); 

fail.onload = setTimeout(() => {
    ctx.drawImage(bg, 0, 0);
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);
},30)
