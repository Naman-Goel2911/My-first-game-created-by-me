var boy, boyAnimation, boyImage, boyhealth;
var zombie, zombieGroup, zombieAnimation, zombieCount, zombieHealth;
var ghost, ghostGroup, ghostAnimation, ghostCount, ghostHealth;
var islandImage;
var canvas;
var back;
var edges;
var heart1, heart2, heart3, heart4, heart5, heartImage;
var gameState = "start";
var portal, portalAnimation;

//add ghosts,zombies, power potatoes
//feedback as the score            

function preload()
{
  //load animation for the boy, zombie, ghost, island
  boyStanding = loadAnimation("Images/boystanding.png");
  boyWalkingR = loadAnimation("Images/boywalkingr1.png", "Images/boywalkingr2.png", "Images/boywalkingr3.png", "Images/boywalkingr4.png", "Images/boywalkingr5.png", "Images/boywalkingr6.png", "Images/boywalkingr7.png", "Images/boywalkingr8.png");
  boyWalkingL = loadAnimation("Images/boywalkingl1.png", "Images/boywalkingl2.png", "Images/boywalkingl3.png", "Images/boywalkingl4.png", "Images/boywalkingl5.png", "Images/boywalkingl6.png", "Images/boywalkingl7.png", "Images/boywalkingl8.png");

  zombieAnimation = loadAnimation("Images/zombiewalking1.png", "Images/zombiewalking2.png", "Images/zombiewalking3.png", "Images/zombiewalking4.png", "Images/zombiewalking5.png", "Images/zombiewalking6.png", "Images/zombiewalking7.png", "Images/zombiewalking8.png",);

  ghostAnimation = loadAnimation("Images/ghostwalking1.png", "Images/ghostwalking2.png", "Images/ghostwalking3.png", "Images/ghostwalking4.png", "Images/ghostwalking5.png", "Images/ghostwalking6.png", "Images/ghostwalking7.png", "Images/ghostwalking8.png");

  portalAnimation = loadAnimation("Images/portalimage1.png", "Images/portalimage2.png", "Images/portalimage3.png", "Images/portalimage4.png");

  islandImage = loadImage("Images/islandimage.jpg");

  heartImage = loadImage("Images/heart.png");

  //back = loadImage();
}

function setup() 
{
  //create a boy, give animation appropriately.

  canvas = createCanvas(displayWidth*3, displayHeight*3);

  edges = createEdgeSprites();

  back = createSprite((displayWidth*3)/2, (displayHeight*3)/2, displayWidth*10, displayHeight*10);
  back.scale = 9.5;
  back.addImage(islandImage);
  
  boy = createSprite(displayWidth, displayHeight, 50, 130);
  //boy.x = 0;
  //boy.y = 0;
  boy.addAnimation("boyIsStanding", boyStanding);
  boy.addAnimation("boyIsWalkingL", boyWalkingL);
  boy.addAnimation("boyIsWalkingR", boyWalkingR);

  boy.scale = 0.6
  //camera.position.x = boy.x;
  //camera.position.y = boy.y;

  zombieGroup = new Group();
  ghostGroup = new Group();

  zombieCount = 0;
  ghostCount = 0;

  zombieHealth = 10;
  ghostHealth = 5;
  boyHealth = 100;

  heart1 = createSprite(displayWidth+3000, displayHeight-1350, 50, 50);
  heart1.scale = 0.3;
  heart1.addImage("heart", heartImage);

  heart2 = createSprite(displayWidth+3150, displayHeight-1350, 50, 50);
  heart2.scale = 0.3;
  heart2.addImage("heart", heartImage);

  heart3 = createSprite(displayWidth+3300, displayHeight-1350, 50, 50);
  heart3.scale = 0.3;
  heart3.addImage("heart", heartImage);

  heart4 = createSprite(displayWidth+3450, displayHeight-1350, 50, 50);
  heart4.scale = 0.3;
  heart4.addImage("heart", heartImage);

  heart5 = createSprite(displayWidth+3600, displayHeight-1350, 50, 50);
  heart5.scale = 0.3;
  heart5.addImage("heart", heartImage);

  portal = createSprite(3140, -120, 150, 300);
  portal.addAnimation("Portal", portalAnimation);
}

function draw() 
{
  background(255);
  
  

  //console.log(back.width, back.height);

  if(gameState === "start")
  {
    textSize(30);
    fill("blue");
    text("Island Survival", displayWidth/4, displayHeight/6);
    text("by Naman Goel", displayWidth/4, displayHeight/4.5);
    textSize(20);
    text("Survive on the island while zombies and ghosts following you. Try to find the portal and escape from this island.", displayWidth/4, displayHeight/3);
    text("Use W,A,S and D keys to move on the island", displayWidth/4, displayHeight/3.5);
    text("Your health bar is at the top right corner", displayWidth/4, displayHeight/2.6);
    text("The player is lost, first find him and then start", displayWidth/4, displayHeight/2.3)
    text("Press Q to start", displayWidth/4, displayHeight/2);

    if(keyDown("q") && gameState === "start")
    {
      gameState = "play"
    } 
  }

  if(gameState === "play")
  {
    drawSprites();

   camera.position.x = boy.x;
   camera.position.y = boy.y;

   if(keyWentDown("w"))
   {
      boy.changeAnimation("boyIsWalkingR", boyWalkingR);
      boy.y = boy.y - 20;
   }
 
   if(keyWentUp("w"))
   {
      boy.changeAnimation("boyIsStanding", boyStanding);
      boy.y = boy.y - 20;
   }
   if(keyWentDown("s"))
   {
      boy.changeAnimation("boyIsWalkingR", boyWalkingR);
      boy.y = boy.y + 20;
   }
   if(keyWentUp("s"))
   {
      boy.changeAnimation("boyIsStanding", boyStanding);
      boy.y = boy.y + 20;
   }
   if(keyWentDown("a"))
   {
      boy.changeAnimation("boyIsWalkingL", boyWalkingL);
      boy.x = boy.x - 20;
   }
   if(keyWentUp("a"))
   {
      boy.changeAnimation("boyIsStanding", boyStanding);
      boy.x = boy.x - 20;
   }
   if(keyWentDown("d"))
   {
    boy.changeAnimation("boyIsWalkingR", boyWalkingR);
    boy.x = boy.x + 20;
   }
   if(keyWentUp("d"))
   {
      boy.changeAnimation("boyIsStanding", boyStanding);
      boy.x = boy.x + 20;
   }
 
   if(zombieGroup.isTouching(boy))
   {
     boyHealth = boyHealth - 3;
   }
 
   if(ghostGroup.isTouching(boy))
   {
     boyHealth = boyHealth - 1;
   }
 
   if(boyHealth<80)
   {
     heart5.visible = false;
   }
   if(boyHealth<60)
   {
    heart5.visible = false;
    heart4.visible = false;
   }
   if(boyHealth<40)
   {
    heart5.visible = false;
    heart4.visible = false;
    heart3.visible = false;
   }
   if(boyHealth<20)
   {
    heart5.visible = false;
    heart4.visible = false;
    heart3.visible = false;
    heart2.visible = false;
   }
   if(boyHealth<10)
   {
    heart5.visible = false;
    heart4.visible = false;
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = false;
    gameState = "end";
   }
 
  
   boy.collide(edges[0]);
   boy.collide(edges[1]);
   boy.collide(edges[3]);
 
   spawnGhost();
   spawnZombie();
  }

  if(gameState === "end")
  {
    background(0);
    textSize(30);
    fill(255);
    text("Game Over", boy.x, boy.y);
    text("Press Space to try again", boy.x, boy.y + 70);
  }

  if(keyDown("space") && gameState === "end")
  {
      gameState = "start";
      boyHealth = 100;
      boy.x = displayWidth;
      boy.y = displayHeight;
  }

  if(boy.isTouching(portal) && gameState === "play")
  {
    gameState = "win"
  }

  if(gameState === "win")
  {
    background(0);
    textSize(30);
    fill("pink");
    text("Yeah! You Won!", boy.x, boy.y);
    text("Press P and then Q to play again", boy.x, boy.y + 70);
  }

  if(keyDown("p") && gameState === "win")
  {
      gameState = "start";
      boyHealth = 100;
      boy.x = displayWidth;
      boy.y = displayHeight;
  }

  console.log(boy.x, boy.y);

}

function spawnZombie()
{
   if(frameCount %100 === 0)
   {
     zombieCount++;
     var randomx = random(boy.x-1000, boy.x+1000);
     var randomy = random(boy.y-500, boy.y+500);
     zombie = createSprite(randomx, randomy, 50, 130);
     //zombie.y = boy.y;
     zombie.velocityX = 5;
     zombie.velocityY = random(-5, 5);
     zombie.addAnimation("ZombieIsWalking", zombieAnimation);
     zombie.bounceOff(edges);
     zombie.lifetime = 500;

     zombieGroup.add(zombie);
   }
}

function spawnGhost()
{
  if(frameCount %60 === 0)
   {
     ghostCount++;
     var randomX = random(boy.x-1000, boy.x+1000);
     var randomY = random(boy.y-500, boy.y+500);
     ghost = createSprite(randomX, randomY, 50, 130);
     //ghost.y = boy.y;
     ghost.velocityX = -6;
     ghost.velocityY = random(-6, 6);
     ghost.lifetime = 300;
     ghost.addAnimation("GhostIsWalking", ghostAnimation);
     ghost.bounceOff(edges);

     ghostGroup.add(ghost);
   }
}