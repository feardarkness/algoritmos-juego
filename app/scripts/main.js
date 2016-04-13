var images = {},
	canvas = document.getElementById('design-canvas'),
	context = canvas.getContext("2d"),
	totalResources = 6,
	numResourcesLoaded = 0,
	fps = 30,
	charX = 100,
	charY = 185,
	id = context.createImageData(1,1),
	d  = id.data;	

loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("hair");

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() { 
      resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

function drawPoint(x, y){	                        
	d[0]   = 255;
	d[1]   = 0;
	d[2]   = 0;
	d[3]   = 255;
	context.putImageData( id, x, y ); 
}

function drawEllipse(centerX, centerY, width, height) {
	
  context.beginPath();
  
  context.moveTo(centerX, centerY - height/2);
  
  context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2);

  context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2);
 
  context.fillStyle = "black";
  context.fill();
  context.closePath();	
}


  
function redraw() {

	var x = charX;
	var y = charY;

	clearCanvas();
  
	//drawPoint(x, y);

	/*                      
	context.drawImage(images["leftArm"], x + 40, y - 42);  
	context.drawImage(images["legs"], x, y);
	context.drawImage(images["torso"], x, y - 50);
	context.drawImage(images["rightArm"], x - 15, y - 42);
	context.drawImage(images["head"], x - 10, y - 125);
	context.drawImage(images["hair"], x - 37, y - 138);
	drawEllipse(x + 47, y - 68, 11, 16); // Left Eye
	drawEllipse(x + 58, y - 68, 12, 17); // Right Eye
	*/
}

