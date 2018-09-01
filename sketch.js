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
var fx;

function setup() {
  createCanvas(600,600);
  background(50);
  character = new Character(width/2, height/2);
  item = new Item(width/3, height/2);
 
}

function draw() {
  item.show();
  character.show();
 
  character.move();
  
  // character.check(item);
}


function Character(x,y){
	this.visable = true;
	this.loc  = createVector(x,y);
	this.w = 10;
	this.h = 10;
	this.colid;
	
	this.show = function(){
	  if(this.colid){
	    fill(color("green"));
	  }
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
	
// 	this.check = function(t){
//   return collideRectRect(this.loc.x,this.loc.y, this.w,this.h, t.loc.x, t.loc.y, t.h, t.w);
//   }
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

// function Fx(){
//   this.check = function(a,b){
//   return collideRectRect(a.loc.x,a.loc.y, a.w,a.h, b.loc.x, b.loc.y, b.h, b.w);
//   }
// }