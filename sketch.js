const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img;
var food;
var rabbit;
var rabbitBlinked;
var rabbitEat;
var rabbitSad;

 

var bk_sound;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var baloon;
var mute_BTN;

var button;
var button2;
var button3;
var rope2;
var rope3;
var fruit_con2
var fruit_con3;

var canW;
var canH;



function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  
bk_sound = loadSound('sound1.mp3');
cut_sound = loadSound('rope_cut.mp3');
sad_sound = loadSound('sad.wav');
eating_sound = loadSound('eating_sound.mp3');
air = loadSound('air.wav');
mute_BTN = loadImage('mute.png');
  rabbitBlinked = loadAnimation("blink_1.png", "blink_2.png", "blinK_3.png");
  rabbitEat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  rabbitSad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");


  rabbitBlinked.playing = true;
  rabbitEat.playing = true;
  rabbitSad.playing = true;
  rabbitSad.looping = false;
  rabbitEat.looping = false;

  


}

function setup() 
{

  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if(isMobile){
    canW = displayWidth;
    canH = displayHeight
    createCanvas(displayWidth+80, displayHeight);
  }
  else {
    canW = windowWidth;
    canH = windowHeight
    createCanvas(windowWidth, windowHeight);
  }




  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200, canH,600,20);

  rope = new Rope(7,{x:245,y:30});
  rope2 = new Rope(7,{x:370,y:40});
  rope3 = new Rope(4,{x:400,y:225});

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
  

rabbitBlinked.frameDelay = 20;
rabbitEat.frameDelay = 20;


  bunny = createSprite(250,canH-80,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;






  bunny.addAnimation('blinking',rabbitBlinked);
  bunny.addAnimation('eating',rabbitEat);
  bunny.addAnimation('crying',rabbitSad);
  bunny.changeAnimation('blinking');



  button = createImg("cut_button.png");
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  
  button2 = createImg("cut_button.png");
  button2.position(330,35);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  
  button3 = createImg("cut_button.png");
  button3.position(360,200);
  button3.size(50,50);
  button3.mouseClicked(drop3);

  baloon = createImg("balloon.png");
  baloon.position(10, 250);
  baloon.size(150, 100);
  baloon.mouseClicked(airblow);

  mute_BTN = createImg("mute.png");;
  mute_BTN.position(450,20);
  mute_BTN.size(50, 50);
  mute_BTN.mouseClicked(mute);

  bk_sound.play();
  bk_sound.setVolume(0.5);

}

function draw() 
{
  background(51);

  image(bg_img,0,0,3000,3000);
  if (fruit!=null){
  image(food,fruit.position.x,fruit.position.y,70,70);

}






  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation('eating');
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation('crying');
  }

 
   drawSprites()

}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;
}

function drop3(){
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null;
}



function collide(body,sprite){
  if(body!=null){
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (d<=50){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }else{
      return false;
    }
  }
}



function airblow()
{

  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:0});
  air.play();
}

function mute(){
  if(bk_sound.isPlaying())   {
    bk_sound.stop();
  }
  else{
    bk_sound.play();
  }
}