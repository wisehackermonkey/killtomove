/*
kill to move
wisemonkey
oranbusiness@gmail.com
20180901
github.com/wisehackermonkey


*/
//todo
//update
//move
//draw
//show

var character;
var bullet;
var enemy;
var bulletTarget;

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
  text("Desplay",10,40);
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
	this.timeEnd = 0;
	
	this.show = function(){
		if(this.visable){
			rect(this.loc.x,this.loc.y, this.w,this.h);
		}
	}
	this.move = function(){
	  
	  if(this.canMove){
  		if(keyIsDown(RIGHT_ARROW)){
  		  this.loc.x += 1;
  		}
  		if(keyIsDown(LEFT_ARROW)){
  		  this.loc.x -= 1;
  		}
  		if(keyIsDown(UP_ARROW)){
  		  this.loc.y -= 1;
  		}
  		if(keyIsDown(DOWN_ARROW)){
  		  this.loc.y += 1;
  		}
	  }
	}
  
  this.stopMove = function(){
    this.canMove = !this.canMove;
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
	
	this.show = function(){
	  if(this.visable){
  	  rect(this.loc.x,this.loc.y, this.w,this.h);
	  }
	}
	this.colid = function(t){
	  if(collideRectRect(this.loc.x, this.loc.y,this.h,this.w, t.loc.x,t.loc.y,t.w,t.h ) ){
	    	this.visable = false;
	    	bullet.visable = false;
	    	print("colid");
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
	    	 print("bullet target aquired");
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
// }, 1000);
  
}