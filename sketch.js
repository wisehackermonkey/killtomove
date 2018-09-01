/*
kill to move
wisemonkey
oranbusiness@gmail.com
20180901
github.com/wisehackermonkey
*/


function setup() {
  createCanvas(600,600);
  background(50);
}

function draw() {
  
}


function Character(x,y){
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