var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var score = 0;
var chihuahua;
var chihuahua_running;
var ground;
var groundImage;
var invisibleGround;
var obstacleImage1, obstacleImage2, obstacleImage3;
var obstaclesGroup;
var obstacle1Image;

function preload() {
  
  chihuahua_running = loadAnimation("./assets/chihuahua1.png", "./assets/chihuahua2.png", "./assets/chihuahua3.png");
  groundImage = loadImage("./assets/ground3.png");
  obstacleImage1 = loadImage("./assets/obstacleImage1.png");
  obstacleImage2 = loadImage("./assets/obstacleImage2.png");
  obstacleImage3 = loadImage("./assets/obstacleImage3.png");

}
function setup() {

  createCanvas(600, 200);
  edges = createEdgeSprites();
  

  ground = createSprite(200,180 , 400, 20);
  ground.x = ground.width/2;
  ground.addImage(groundImage);
  invisibleGround = createSprite(200, 190, 400, 20);
  invisibleGround.visible = false;

  chihuahua = createSprite(50, 160, 20, 50);
  chihuahua.setCollider('circle',0,0,350)
 // chihuahua.debug = true;
  chihuahua.scale = 0.1;
  chihuahua.addAnimation("running", chihuahua_running);

  obstaclesGroup = new Group();
 
}
  
function draw() {
  // console.log(frameCount);
  background("#80d2e0");
  // mostrar la puntuacion
  text("puntuacion"+score,500,50);
  score=score+Math.round(frameCount/60);
  if (gameState==PLAY){

    ground.velocityX = -2;

    if (ground.x < 0) {
    
      ground.x = ground.width / 2;
  
    }
    if (keyDown("space")) {
    
      chihuahua.velocityY = -10;
  
    }
    chihuahua.velocityY = chihuahua.velocityY + 0.5;
    if(obstaclesGroup.isTouching(chihuahua)){
      gameState=END;
     //console.log("chiuhua choco y se lastimo");
      
     }
     spawnObstacles();
  }
  else if(gameState==END){
    // se detiene el suelo 
    console.log("el piso se detuvo ")
    ground.velocityX = 0;

  }
 //  console.log(ground.width);
  
 
  chihuahua.collide(invisibleGround);
 
  
 
  drawSprites();

}
function spawnObstacles() {
           
  if (frameCount % 60 === 0) {

    var obstacle = createSprite(50, 160, 20, 50);
    obstacle.velocityX = -2 ;
    obstacle.scale = 0.08;
    obstacle.lifetime = 210;
    
    var rand = Math.round(random(1, 3));

    switch (rand) {

      case 1: obstacle.addImage(obstacleImage1);
        break;
      case 2: obstacle.addImage(obstacleImage2);
        break;
      case 3: obstacle.addImage(obstacleImage3);
        break;

      default: break;

    }
    obstacle.depth = chihuahua.depth;
    chihuahua.depth = chihuahua.depth+1;
    //añade cada obstaculo al grupo
    obstaclesGroup.add(obstacle);
  }

}
 