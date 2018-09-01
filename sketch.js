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
var item;


function setup() {
  createCanvas(600,600);
  background(50);
  angleMode(DEGREES);
  character = new Character(width/2, height/2);
  item = new Item(width/3, height/2);
 
}

function draw() { 
  background(50);
  item.show();
  character.show(item);
// character.check(item);
  character.move();
  
  for(var i = 0; i <= lasers.length -1; i+=1){
		if(lasers[i].visable === true){
			lasers[i].show();
			lasers[i].update();
		}
	}
}


function Character(x,y){
	this.visable = true;
	this.loc  = createVector(x,y);
	this.w = 10;
	this.h = 10;
	this.colid;
	
	this.show = function(t){
	 // if(collideRectRect(this.loc.x,this.loc.y, this.w,this.h, t.loc.x, t.loc.y, t.h, t.w)){
	 //   fill(color("green"));
	 // }else{
	 //   fill(color("white"));
	 // }
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
	
	this.check = function(t){
  // return 
  }
}

function Item(x,y){
  this.visable = true;
	this.loc  = createVector(x,y);
	this.w = 10;
	this.h = 10;
	
	this.show = function(){
		if(this.visable){
			rect(this.loc.x,this.loc.y, this.w,this.h);
		}
	}
}