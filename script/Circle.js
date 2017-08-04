
function Circle(x,y,r,g,b){
	this.x = x;
	this.y = y;
	this.w = 0;
	this.grow = true;
	this.red = r;
	this.green = g;
	this.blue = b;
	
	this.expand = function(){
		if(this.grow){
			this.w += 0.5;
		}
	}
	
	this.collison = function(){
		this.grow = false;
	}
	
	this.draw = function(){
		fill(this.red, this.green,this.blue )
		ellipse(this.x, this.y, this.w);
	}
	
	this.getX = function(){
		return this.x;
	}
	
	this.getY = function(){
		return this.y;
	}
	
	this.getR = function(){
		return this.w/2;
	}
}