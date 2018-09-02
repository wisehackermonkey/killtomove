/*
kill to move
wisemonkey
oranbusiness@gmail.com
20180901
github.com/wisehackermonkey
 art cred go to 
 https://opengameart.org/content/tiny-16-expanded-character-sprites

*/
//todo
//updatex
//movex
//drawx
//showx
//fix bullet angle when fired
//bound to screen

//add screen shake
//add title screen
//bullet explode
//sound effects

var character;
var bullet;
var enemy;
var bulletTarget;
var moveVal = 0;

var player_sprite;
var sprite_sheet_image;
var sprite_sheet;
var walkLeft;

var enemy_sprite;
var enemy_sheet_image;
var enemy_sheet;
var enemy_animation;
var enemy_walk;

var menu;
var bg;

var font;
var fontScore;

var size;

var front_walk = [
  {'name':'player_walk01', 'frame':{'x':16*1, 'y': 0, 'width': 16, 'height': 16}},
  {'name':'player_walk02', 'frame':{'x':16*2, 'y': 0, 'width': 16, 'height': 16}},
  // {'name':'player_walk03', 'frame':{'x':16*3, 'y': 0, 'width': 16, 'height': 16}},
  // {'name':'player_walk04', 'frame':{'x':16*3, 'y': 0, 'width': 16, 'height': 16}},
];
var side_walk   = [
  {'name':'player_walk01', 'frame':{'x':16*1, 'y': 16*2, 'width': 16, 'height': 16}},
  {'name':'player_walk02', 'frame':{'x':16*2, 'y': 16*2, 'width': 16, 'height': 16}},
  {'name':'player_walk03', 'frame':{'x':16*3, 'y': 16*2, 'width': 16, 'height': 16}},
  {'name':'player_walk04', 'frame':{'x':16*3, 'y': 16*2, 'width': 16, 'height': 16}},
];

var enemy_walk   = [
  {'name':'player_walk01', 'frame':{'x':64*1, 'y': 64*1, 'width': 64, 'height': 64}},
  {'name':'player_walk02', 'frame':{'x':64*2, 'y': 64*1, 'width': 64, 'height': 64}},
  {'name':'player_walk03', 'frame':{'x':64*3, 'y': 64*1, 'width': 64, 'height': 64}},
  {'name':'player_walk04', 'frame':{'x':64*1, 'y': 64*2, 'width': 64, 'height': 64}},
  {'name':'player_walk05', 'frame':{'x':64*2, 'y': 64*2, 'width': 64, 'height': 64}},
];
function preload(){
  menu = loadImage("./img/menu2.png"); 
  bg = loadImage("./img/bg_2_3.png");
  font = loadFont("./Techno.ttf");
  fontScore = loadFont("./3X5.TTF");
  
  player_sprite_sheet = loadSpriteSheet('character_2.png', front_walk);
  walkLeft = loadAnimation(player_sprite_sheet);
  player_sprite = createSprite(100, 284, 10, 20);
  player_sprite.addAnimation('walk', walkLeft);
  player.scale = 2;
  enemy_sheet_image = loadSpriteSheet('./img/spider2_2.png', enemy_walk);
  enemy_walk = loadAnimation(enemy_sheet_image);
  // enemy_sprite = createSprite(300,100, 64, 64);
  // enemy_sprite.addAnimation('ohm_walk', enemy_walk);
}

function setup() {
  createCanvas(600,600);
  background(50);
  noSmooth();
  
  
  textFont(font,23);
  bullet = new Bullet(-10,-10,90);
  enemy = new Enemy(300,100);
 
  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  character = new Character(width/2, height/2);
  bulletTarget = createVector(-10,-10);
  
}

function draw() { 
  background(50);
  image(bg,0,0,600,600);
  character.show();
  character.move();
  
  bullet.show();
  bullet.shoot(bulletTarget);
  bullet.reachTarget(bulletTarget);
  bullet.move();
  enemy.show();
  enemy.colid(character);
  enemy.colid(bullet);
  // animation(enemy_walk, enemy.loc.x, enemy.loc.y);
  drawSprites();
  image(menu,0,0);
  fill(color("red"));
  textFont(font,23);
  text("Kill To Move",16,35);
  textFont(fontScore,27);
  text(character.moves,507,43);
  fill(color("white"));
  print(`${mouseX},${mouseY}`);
  

}


function Character(x,y){
	this.visable = true;
	this.loc  = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.w = 20;
	this.h = 10;
  this.canMove = true;
	this.moves = 0;
	
	this.show = function(){
		if(this.visable){
		  colorMode(HSL);
		  fill(map(this.moves,0,200,0,120), 100, 50);
			ellipse(this.loc.x,this.loc.y+5, this.w,this.h);
			
			colorMode(RGB);
			fill(255);
		}
	}
	
  this.arrows = function(){
    var vhor = 4;
    var ahor = 0.1;
    this.vel.mult(0);
    this.acc.mult(0.85);
  
    if(keyIsDown(RIGHT_ARROW)){
      // print(this.moves);
      this.moves-=1;
      this.vel.add(createVector(vhor,0));
      this.acc.add(createVector(ahor,0));
    }else if(keyIsDown(LEFT_ARROW)){
      this.moves-=1;
      this.vel.add(createVector(-vhor,0));
      this.acc.add(createVector(-ahor,0));
    }
    
    if(keyIsDown(UP_ARROW)){
      this.moves-=1;
      this.vel.add(createVector(0, -vhor));
      this.acc.add(createVector(0,-ahor));
    }else if(keyIsDown(DOWN_ARROW)){
      this.moves-=1;
      this.vel.add(createVector(0,vhor));
      this.acc.add(createVector(0,ahor));
      
    }
  }
  
  this.move = function(){
    
    if(this.moves >= 1){
      
      this.arrows();
    }else{
      this.vel.mult(0);
      this.acc.mult(0.85);
    }
  	this.vel.add(this.acc);
  	this.loc.add(this.vel);
  	player_sprite.position = this.loc.copy();
  }
}


function Enemy(x,y){
 	this.loc = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.w = 10;
	this.h = 10;
	this.bullets = [];
	this.visable = true;
	this.hack = true;
	this.show = function(){
	  if(this.visable){
  	  rect(this.loc.x,this.loc.y, this.w,this.h);
	  }
	}
	this.colid = function(t){
	  if(collideRectRect(this.loc.x, this.loc.y,this.h,this.w, t.loc.x,t.loc.y,t.w,t.h ) ){
	    	this.visable = false;
	    	bullet.visable = false;
	    	// print("colid");
	    	
	  }
	  if(this.visable === false && this.hack === true){
	    this.hack = false
	    character.moves = 200;
	  }
	  
	}
	
	this.shoot = function(){
	  
	  for(var i = 0; i <= numLasersTotal;i+=1){
  	  var b = new Bullet(this.loc.x,this.loc.y,90);
  	  this.bullets.push(b);
  	
	  }
	}
	this.showBullets = function(){
	  
	}
}


function Bullet(x,y){
  this.loc = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.w = 3;
  this.h = 15;
  this.angle = 0;
  this.debug = true;
  this.visable = true;
  
  this.show = function(){
    if(this.visable){
      noStroke();
  	  push();
    	  translate(this.loc.x, this.loc.y);
      	rotate(this.vel.heading()+90);
    		ellipse(0,0,this.w,this.h);
  			fill(255,50,2,150);
  			ellipse(random(-1.5,1.5),1*5, this.w,this.h);
  			fill(170,13,8,75);
  			ellipse(random(-1.5,1.5),2*5, this.w,this.h);
  		pop();
    }
  }
  this.setAngle = function(a){
    this.angle = a + 90;
  }
  this.reachTarget = function(t){
	  if(collideRectRect(t.x,t.y,10,10,this.loc.x, this.loc.y,this.h,this.w)){
	    	this.visable = false;
	    	bulletTarget = createVector(-10,-10);
	  }
	}
  this.debugShow = function(){
    if(this.debug){
      
    }
  }
  this.update = function(){
  	this.move();
  	this.edgeDespawn();
  }
  this.move = function(){
  	this.vel.add(this.acc);
  	this.loc.add(this.vel);
    this.acc.mult(0);
  
  }
  this.shoot = function(target){
    var desired = p5.Vector.sub(target,this.loc);
    desired.normalize();
    desired.mult(4);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(0.1);
    this.acc.add(steer);
  }
  this.edgeDespawn = function(){
  	if(this.loc.y >= height){
  		this.visable = false;
  	}
  	if(this.loc.y <= 0){
  		this.visable = false;
  	}
  }
}

function characterBoost(){
    setTimeout(function (){
    character.canMove = true;
  }, 1000);
}
function mousePressed(){
  
  bullet.loc = character.loc.copy();
  bulletTarget =createVector(mouseX,mouseY);
  bullet.visable = true;
//   setTimeout(function (){
//   character.canMove = !character.canMove;
// },1 * 1000);
  
}