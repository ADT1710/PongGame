//Circle
let xCircle = 300;
let yCircle = 200;
let diameter = 17;
let radius = diameter/2

let speedCircleX = 6;
let speedCircleY = 6;
let hit = false;

//Rect
let xRectPlayer = 5;
let yRectPlayer = 150;
let widthRect = 7;
let heightRect = 97;

//Rect Enemy
let xRectEnemy = 585;
let yRectEnemy = 150;
let speedEnemy;

//Points
let myPoints = 0;
let enemyPoints = 0;

//Songs
let bgSound;
let hitSound;
let pointSound;

function preload(){
  bgSound = loadSound("bgSound.mp3");
  hitSound= loadSound("hitSound.mp3");
  pointSound= loadSound("pointSound.mp3");
}

function setup() {
  createCanvas(600, 400);
  bgSound.loop();
}

function draw() {
  background(0);
  showCircle();
  moveCircle();
  borderCollision();
  
  showRect(xRectPlayer,yRectPlayer);
  showRect(xRectEnemy,yRectEnemy);
  moveRectPlayer();
  collisionVerifier(xRectPlayer, yRectPlayer);
  collisionVerifier(xRectEnemy, yRectEnemy);
  moveRectEnemy();
  
  addPoints();
  showPoints();
}

function showCircle(){
  circle(xCircle,yCircle,diameter);
}

function moveCircle(){
  xCircle += speedCircleX;
  yCircle += speedCircleY;
}

function borderCollision(){
   if (xCircle +radius > width || xCircle - radius < 0)  
    speedCircleX *= -1;
  
  if (yCircle + radius > height || yCircle - radius < 0) 
    speedCircleY *= -1;
}

function showRect(x,y){
  rect(x,y,widthRect,heightRect);
}

function moveRectPlayer(){
  if(keyIsDown(UP_ARROW))
    yRectPlayer -= 10;
  
  if(keyIsDown(DOWN_ARROW))
    yRectPlayer += 10;
}

function moveRectEnemy(){
  speedEnemy = yCircle - yRectEnemy - widthRect/2 - 70;
  yRectEnemy += speedEnemy;
}

function collisionVerifier(x,y){
  hit = collideRectCircle(x, y, widthRect, heightRect, xCircle, yCircle, radius);
  if (hit){
    speedCircleX *= -1;
    hitSound.play();
  }
}

function addPoints(){
  if(xCircle > 590){
    myPoints +=1;
    pointSound.play();
  }
  if(xCircle < 10){
    enemyPoints +=1;
    pointSound.play();
  }
}

function showPoints(){
  textAlign(CENTER);
  textSize(16);
  
  stroke(255);
  fill(color(255,140,0));
  rect(430,5,40,20);
  rect(130,5,40,20);
  
  fill(255);
  text(myPoints, 150, 20);
  text(enemyPoints, 450, 20);
}
