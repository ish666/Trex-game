var trex , treximg,treximg2 ;
var ground , invisibleGround , groundimg;
var cloudGroup , cloudimg;
var obsctacleGroup , ob1,ob2,ob3,ob4,ob5,ob6;
var score = 0;
var PLAY = 1;
var END = 0; 
var gameState = PLAY;
var GAMEOVER, RESTART,gameoverimg,restartimg;
function preload(){
  groundimg = loadImage("ground2.png");
  treximg = loadAnimation("trex1.png","trex3.png","trex4.png");
  treximg2=loadAnimation("trex_collided.png");

  cloudimg = loadImage( "cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg= loadImage("restart.png");
}


 function setup() {
  createCanvas(600, 200);
   trex = createSprite(50,150,20,20);
   trex.addAnimation("trexRun", treximg);
   trex.addAnimation("trexDies", treximg2);
   trex.scale = 0.5;
   ground = createSprite(300,150, 600 , 10 );
   ground.addImage("movingground" , groundimg);
   invisibleGround = createSprite(300,155, 600,10);
   invisibleGround.visible = false;
   cloudGroup= new Group();
   obstacleGroup = new Group();
   GAMEOVER= createSprite(300,70,10,10);
   GAMEOVER.addImage("gameends", gameoverimg);
   GAMEOVER.scale= 0.5;
   GAMEOVER.visible = false;
   RESTART = createSprite(300,97,10,10);
   RESTART.addImage("again", restartimg);
   RESTART.scale= 0.5;
   RESTART.visible= false;
   
   
 }

function draw() {
  background(0);
  
  if( gameState === PLAY){
  ground.velocityX = -5;
  if(keyDown("space") && trex.y > 126){
    trex.velocityY = -9 ;
     }
    score = score + Math.round( getFrameRate () / 30);
    trex.velocityY= trex.velocityY+ 0.5;
    if(ground.x < 0 ){
    ground.x = ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
    if(trex.isTouching(obstacleGroup)){
       gameState = END;
       }
  }
  else if ( gameState === END){
  ground.velocityX= 0;
  trex.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("trexDies",treximg2);
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    GAMEOVER.visible= true;
    RESTART.visible = true;
    
    
    
     
  
  
  }
  if(mousePressedOver(RESTART)){
    reset();
  }
  console.log(trex.y);
  
  
  text("score" + score ,500,80 );
  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}
function spawnClouds(){
  if(frameCount% 60 === 0){
  var cloud = createSprite(600,80,10,10);
  cloud.velocityX = -5;
  cloud.addImage("movingcloud" , cloudimg);
  cloud.lifetime= 120;
    cloud.scale= 0.5;
    cloud.y = random(50,100);
    trex.depth = cloud.depth;
    trex.depth = trex.depth +1;
  cloudGroup.add(cloud);
  }
}
function spawnObstacles(){
  if(frameCount% 60 === 0){
    var obs = createSprite(600,130,30,50);
    obs.velocityX = -5;
    var rand =  Math.round(random(1,6));
    switch(rand){
      case 1: obs.addImage("movingobstacle" , ob1);
        break;
       case 2: obs.addImage("movingobstacle" , ob2);
        break;
         case 3: obs.addImage("movingobstacle" , ob3);
        break;
         case 4: obs.addImage("movingobstacle" , ob4);
        break;
         case 5: obs.addImage("movingobstacle" , ob5);
        break;
         case 6: obs.addImage("movingobstacle" , ob6);
        break;
         default: 
        break;
    }
    
    obs.lifetime = 120;
    obs.scale = 0.5;
    obstacleGroup.add(obs);
    
  }
}
  function reset(){
    gameState = PLAY;
    GAMEOVER.visible = false;
    RESTART.visible = false;
    score = 0;
    trex.changeAnimation("trexRun" , treximg);
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
  }

    
    

  
  