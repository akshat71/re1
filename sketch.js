var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2,sound;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  sound = loadSound("sound/bell.mp3")
  opponent1_red= loadAnimation("opponent1.png","opponent2.png")
  opponent2_yellow = loadAnimation("opponent4.png","opponent5.png")
  opponent3_pink = loadAnimation("opponent7.png","opponent8.png")
  main_Fall = loadAnimation("mainPlayer3.png")
  yellow_fall = loadAnimation("opponent6.png")
 red_fal = loadAnimation("opponent3.png")
  blue_fa = loadAnimation("opponent9.png")
  gameoverimg = loadImage("gameOver.png")
}

function setup(){
  
createCanvas(1100,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -10;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
 redCG = new Group()
 yellowCG = new Group()
 pinkCG = new Group()
  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
  distance = distance+Math.round(getFrameRate()/50)
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
    if(keyDown("space")){
      sound.play()
    }
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    var select_oppPlayer = Math.round(random(1,3))
    if(World.frameCount%150 === 0){
      if(select_oppPlayer === 1){
        pinkCyclist()
      
      }
      if(World.frameCount%250 === 0){
        redCyclist()
      
      }
      if(World.frameCount%200){
        yellowCyclist()
      }
    }
  
    
 }
  
  
  if(mainCyclist.isTouching(yellowCG)||
    mainCyclist.isTouching(redCG)||
    mainCyclist.isTouching(pinkCG)){
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    
    gameState=END
    
     }
  if(mainCyclist.isTouching(yellowCG)){
      player2.addAnimation("yellow",yellow_fall)
  }
  if( mainCyclist.isTouching(redCG)){
     player3.addAnimation("red",blue_fa)
  }
  if( mainCyclist.isTouching(pinkCG)){
        player1.addAnimation("pink",red_fal)
  }
  
  if(gameState===END){
    gameover = createSprite(width/2,150,10,10)
   gameover.addImage(gameoverimg)
   // gameover.x=width/2
   // gameover.y=150
    path.velocityX=0
   // player1.velocityX=0
   // player2.velocityX=0
    // player3.velocityX=0
   // redCG.destroyEach()
   // yellowCG.destroyEach()
   // pinkCG.destroyEach()
    
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    fill("black")
  text("Press up arrow to reset the game",width/2,155)
  }
}


function pinkCyclist(){
  player1 = createSprite(1100,Math.round(random(50,250)),10,10)
  player1.scale=0.06
  player1.addAnimation("pink",opponent3_pink)
  player1.setLifetime=170
  pinkCG.add(player1)
  
  player1.velocityX=-8
}
function yellowCyclist(){
  player2 = createSprite(1100,Math.round(random(50,250)),10,10)
  player2.scale=0.06
  player2.addAnimation("yellow",opponent2_yellow)
  player2.setLifetime=170
  yellowCG.add(player2)
  
  player2.velocityX=-8
}
function redCyclist(){
  player3 = createSprite(1100,Math.round(random(50,250)),10,10)
  player3.scale=0.06
  player3.addAnimation("red",opponent1_red)
  player3.setLifetime=170
  redCG.add(player3)
  player3.velocityX=-8
}