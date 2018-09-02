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


function setup() {
  createCanvas(600,600);
  background(50);
  
  bullet = new Bullet(100,100,90);

  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  character = new Character(width/2, height/2);

}

function draw() { 
  background(50);
  character.show();
  character.move();
  bullet.show();
  bullet.shoot(character.loc);
  bullet.move();
}


function Character(x,y){
	this.visable = true;
	this.loc  = createVector(x,y);
	this.w = 10;
	this.h = 10;
	this.colid;
	
	this.show = function(){
		if(this.visable){
			rect(this.loc.x,this.loc.y, this.w,this.h);
		}
	}
	this.move = function(){
	  
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
function Enemy(){
 	this.loc = createVector(x,y);
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.w = 10;
	this.h = 10;
	this.show = function(){
	  rect(this.loc.x,this.loc.y, this.w,this.h);
	}
	this.shoot = function(){
	  
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
	
	this.show = function(){
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
	this.setAngle = function(a){
	  this.angle = a + 90;
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