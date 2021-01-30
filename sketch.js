var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,bananaImg,stone,stoneImg;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  //load image 
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
 
  //to create background
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  //to create player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  //to create ground
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  //to create generate the radmon number
  var rand = Math.round(random(1,100));
  console.log (rand);
  
  //to create groups
  FoodGroup = new Group;
  obstacleGroup = new Group;

}

function draw() { 
  background(0);

    //to play the game
  if(gameState===PLAY){
  
  //to repeat the background
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  //to jump the player
    if(keyDown("space") ) {
      player.velocityY = -12;
    }

    //add gravity to player
    player.velocityY = player.velocityY + 0.8;
  
  //player should be on ground
    player.collide(ground);
    
    //when food group is touching the score and size should be increase
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score = score + 2;
      player.scale += + 0.1;
    }
    
    //when obstacle group is touching it should be gameover
    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }

    //to make the game end
  }else if(gameState === END){
    
    //to stop the background and player
    backgr.velocityX = 0;
    player.visible = false;
   
   //to stop the food group and obstacle group
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
 
 //adding that game is over 
  stroke("white");
  textSize(30);
  fill(225);
  text("GAME OVER!",300,220);

  }
 
 //calling food and obstacle group
   food();
   obstacle();

//to draw sprite
  drawSprites();

//to display the score
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE : " +score,650,30);
}

//to create banana
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.addImage(bananaImg);
    banana.y = random(120,200);
    banana.scale = 0.05;
    banana.velocityX = -4;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

//to create stone
function obstacle(){
  if(frameCount % 300 === 0){
  stone = createSprite(400,325,20,20);
  stone.addImage(stoneImg);
  stone.scale = 0.1;
  stone.velocityX = -3;

  stone.lifetime = 150;
  player.depth = stone.depth + 1;
  obstacleGroup.add(stone);
  }
}
