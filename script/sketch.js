var circles = []; //all circles
var activeCircles = [];//circles currently growing
var img; 
var running;
var maxBubbleRadius;

//load image from url in input field
function preload() { 
  var url = document.getElementById("url");
  img = loadImage(url.value);
}

function setup() {
	maxBubbleRadius = document.getElementById("maxR").value;
	console.log("Start");
	img.loadPixels();
	image(img,0,0);
	noStroke();
	background(0);
	createCanvas(img.width,img.height);
	background(0);
	running = true;
	
}

function reset(){
	running = false;
	background(255);
	circles = [];
	activeCircles = [];
}

function draw() {
	if(running){
		addCircle();
		updateCircles();
	}
}

function addCircle(){
	var newX = random(img.width);
	var newY = random(img.height);
	var freeSpot = true;
	for(var i = 0; i < circles.length; i++){
		if(dist(newX,newY,circles[i].getX(),circles[i].getY()) < circles[i].getR()){
			freeSpot = false;
			break;
		}
	}
	if(freeSpot){
		var pixelIndex = (int(newX) + int(newY) * img.width) * 4;
		var r = img.pixels[pixelIndex];
		var g = img.pixels[pixelIndex+1];
		var b = img.pixels[pixelIndex+2];
		c = new Circle(newX,newY, r, g, b);
		circles.push(c);
		activeCircles.push(c);
	}
	else{
		addCircle()
	}
}

function updateCircles(){
	var circlesToRemove = [];
	for(var i = 0; i < activeCircles.length; i++){
		for(var j = 0; j < circles.length; j++){
			if(activeCircles[i]!=circles[j]){
				//Check intersection
				if(isIntersecting(activeCircles[i], circles[j])){
					activeCircles[i].collison();
					circlesToRemove.push(activeCircles[i]);
				}
			}
		}
		if(activeCircles[i].getR() > maxBubbleRadius){//max size
			activeCircles[i].collison();
			circlesToRemove.push(activeCircles[i]);
		}
		activeCircles[i].expand();
		activeCircles[i].draw();
	}
	for(var k = 0; k <circlesToRemove.length; k++){
		activeCircles.splice(activeCircles.indexOf(circlesToRemove[k]), 1);
	}
}

function isIntersecting(c1, c2){
	return(dist(c1.getX(),c1.getY(),c2.getX(),c2.getY()) < (c1.getR() + c2.getR()))
}



