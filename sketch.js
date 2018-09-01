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
  
  // bullet = new Bullet(100,100,90);

  angleMode(DEGREES);
  ellipseMode(CENTER);
  rectMode(CENTER);
  character = new Character(width/2, height/2);

}

function draw() { 
  background(50);
  character.show();
  character.move();
  
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


