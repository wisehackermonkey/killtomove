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
//

var character;
var bullet;
var enemy;
var bulletTarget;
var moveVal = 0;


function setup() {
  createCanvas(600,600);
  background(50);
  
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
  character.show();
  character.move();
  bullet.show();
  bullet.shoot(bulletTarget);
  bullet.reachTarget(bulletTarget);
  bullet.move();
  enemy.show();
  enemy.colid(character);
  enemy.colid(bullet);
  fill(color("red"));
  text("Desplay:"+moveVal,10,40);
  fill(color("white"));
}


function Character(x,y){
	this.visable = true;
	this.loc  = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.w = 10;
	this.h = 10;
  this.canMove = true;
	this.moves = 200;
	
	this.show = function(){
		if(this.visable){
		  colorMode(HSL);
		  fill(map(this.moves,0,200,0,120), 100, 50);
			rect(this.loc.x,this.loc.y, this.w,this.h);
			colorMode(RGB);
			fill(255);
		}
	}
	
  this.arrows = function(){
    var vhor = 4;
    var ahor = 0.1;
    this.vel.mult(0);
    this.acc.mult(0.85);
    print("works");
    if(keyIsDown(RIGHT_ARROW)){
      print(this.moves);
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
    print(this.moves);
    if(this.moves >0 || this.moves == 200){
      
      this.arrows();
    }else{
      // this.arrows();
      this.vel.mult(0);
      this.acc.mult(0.85);
    }
  	this.vel.add(this.acc);
  	this.loc.add(this.vel);
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
  this.w = 5;
  this.h = 20;
  this.angle = 0;
  this.debug = true;
  this.visable = true;
  
  this.show = function(){
    if(this.visable){
  	  push();
    	  translate(this.loc.x, this.loc.y);
      	rotate(this.vel.heading()+90);
    		ellipse(0,0,this.w,this.h);
  			fill(255,50,2,150);
  			ellipse(random(-1.5,1.5),10, this.w,this.h);
  			fill(170,13,8,75);
  			ellipse(random(-1.5,1.5),20, this.w,this.h);
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