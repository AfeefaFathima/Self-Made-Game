var canvas 
var backgroundImage,street,theif_img,invisibleGround
var dimoImg,diamondGroup
var obstacleImage,obstacle, obstaclesGroup
var gameState="play"
var gameOverImage,resetImage
var score

function preload(){
backgroundImage=loadImage("street.jpg")
theif_img=loadImage("Theif.png")
dimoImg=loadImage("-diamond-.png")
obstacleImage=loadImage("barrier.png")
gameOverImage=loadImage("Game over.jpg");
resetImage=loadImage("Reset.png");
}   

function setup(){
canvas=createCanvas(windowWidth,windowHeight)
theif = createSprite(300,550,20,20)
theif.scale=0.2
theif.addImage("theif",theif_img)

invisibleGround = createSprite(windowWidth/2-200,600,windowWidth,30);
  invisibleGround.visible = false
  
  obstaclesGroup = new Group();
  diamondGroup=new Group();

  gameOver = createSprite(windowWidth/2,windowHeight/2);
  gameOver.addImage(gameOverImage);

  restart = createSprite(windowWidth/2,windowHeight/2);
  restart.addImage(resetImage);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  score = 0;
   
  }



function draw(){
background(backgroundImage)
textSize(45)
fill("black")
text("Score: "+ score,500,100);

if(gameState === "play"){
  console.log("jump")
  gameOver.visible = false
  restart.visible = false

  spawnDimo();
  spawnObstacle();
  //move the ground
  invisibleGround.velocityX = -4
  

if (invisibleGround.x < 0){
  invisibleGround.x = invisibleGround.width/2;
}

if(keyDown("space")) {
  theif.velocityY=-15
 // console.log("hello")
}
theif.velocityY= theif.velocityY+0.8

if(obstaclesGroup.isTouching(theif)){
  score=score-10
  obstaclesGroup.destroyEach();
  if(score==-10){
gameState="end"
  }
}

if(diamondGroup.isTouching(theif)){
score=score+10
diamondGroup.destroyEach();
}
}
else if (gameState === "end") {
console.log("hey")
gameOver.visible = true;
restart .visible = true;
obstaclesGroup.setVelocityXEach(0)
diamondGroup.setVelocityXEach(0)
theif.velocityX=0

obstaclesGroup.setLifetimeEach(-1)
diamondGroup.setLifetimeEach(-1)

if(mousePressedOver(restart)){
reset();
}

}

//ground.velocityX = 0;


theif.collide(invisibleGround);

  
drawSprites()
}




    


function windowResized(){
resizeCanvas(windowWidth,windowHeight)
}
function spawnObstacle(){
  if(frameCount % 160 ===0){
var obstacles=createSprite(windowWidth,windowHeight-150,20,20)
obstacles.velocityX=-4
//obstacles.y=Math.round(random(100,1000))
//obstacles.velocityX=-(7+score/100)
obstacles.addImage("obstacleImg",obstacleImage)
obstacles.scale = 0.5;
obstacles.lifetime = 400;
obstaclesGroup.add(obstacles);

  }
}
function spawnDimo(){
  if(frameCount % 260 ===0){
var diamond=createSprite(windowWidth,windowHeight-150,20,20)
diamond.velocityX=-4
diamond.addImage("dimoImg",dimoImg)
diamond.scale=0.3
diamond.lifetime=400
diamondGroup.add(diamond)

  }
}
//function keyPressed(){
  //if(keyCode==RIGHT_ARROW)[
//theif.velocityX=2
  //]
  
//}
function reset(){
  gameState="play"
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach()
  diamondGroup.destroyEach()
  score=0
}
