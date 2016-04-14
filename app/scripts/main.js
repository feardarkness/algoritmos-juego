// sprite size: 64x64
// maybe i should take every thick as a step

$(".draggable-element").draggable();
$("#dropable-element").droppable();

$(document).ready(function(){
	var $canvasElement = $("#design-canvas");
	$canvasElement.width($canvasElement.parent().width());
	$canvasElement.height($canvasElement.parent().width())
});

var character = {
	"id": "professor",
	"width": 64,
	"height": 64,
	"animations":{
		"walk-up": {
			"row": 0,
			"animations": 8,
			"startposInSpriteSheet": 64
		},
		"walk-down": {
			"row": 2,
			"animations": 8,
			"startposInSpriteSheet": 64
		},
		"walk-left": {
			"row": 1,
			"animations": 8,
			"startposInSpriteSheet": 64
		},
		"walk-right": {
			"row": 3,
			"animations": 8,
			"startposInSpriteSheet": 64
		},
		"face-up": {
			"row": 0,
			"animations": 1,
			"startposInSpriteSheet": 0
		},
		"face-down": {
			"row": 1,
			"animations": 1,
			"startposInSpriteSheet": 0
		},
		"face-left": {
			"row": 2,
			"animations": 1,
			"startposInSpriteSheet": 0
		},
		"face-right": {
			"row": 3,
			"animations": 1,
			"startposInSpriteSheet": 0
		}
	}
};

var image = new Image(),
	canvas = document.getElementById('design-canvas'),
	context = canvas.getContext("2d"),
	fps = 30,
	charX = 100,
	charY = 185,
	id = context.createImageData(1,1),
	d  = id.data,
	characterState = 'face-right',
	jsonCharacterState = character.animations[characterState],
	totalResources = 1,
	spriteSize = 64,
	numResourcesLoaded = 0,
	ticksPerFrame = 2,
	tickCount = 0,
	posInSpriteSheet = 0,
	posXInCanvas=0,
	posYInCanvas=0,
	movementRate = 2;	

$(document).on('keydown', function(event) {	
	if(event.which == 13){
		characterState = "face-right";		
	}else if(event.which == 37){
		characterState = "walk-left";
	}else if(event.which == 38){
		characterState = "walk-up";
	}else if(event.which == 39){
		characterState = "walk-right";
	}else if(event.which == 40){
		characterState = "walk-down";
	}
	jsonCharacterState = character.animations[characterState];
});

loadImage();

function loadImage() {	
	image.onload = function() { 
	  resourceLoaded();
	}
	image.src = "images/professor_walk_cycle_no_hat.png";
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

function calculateCharacterPosition(){
	if(characterState === "walk-left"){
		posXInCanvas = posXInCanvas - movementRate;
	}else if(characterState === "walk-right"){
		posXInCanvas = posXInCanvas + movementRate;
	}else if(characterState === "walk-up"){
		posYInCanvas = posYInCanvas - movementRate;
	}else if(characterState === "walk-down"){
		posYInCanvas = posYInCanvas + movementRate;
	}
}

function fillBackground(color){
	context.beginPath();
	context.rect(0, 0, 400, 400);
	context.fillStyle = color;
	context.fill();
}

function drawImage(){	
	context.drawImage(image, posInSpriteSheet*spriteSize+jsonCharacterState.startposInSpriteSheet, jsonCharacterState.row*spriteSize, spriteSize, spriteSize, posXInCanvas, posYInCanvas, spriteSize, spriteSize);
}

function drawShadow(){
	drawEllipse(posXInCanvas+32, posYInCanvas+60, 30, 4);
}
  
function redraw() {
	var x = charX;
	var y = charY;

	if (tickCount > ticksPerFrame){
		calculateCharacterPosition();
		clearCanvas();		
		//fillBackground("#D6C3C6");
		//drawShadow();
		drawImage();		
		if (posInSpriteSheet + 1 >= jsonCharacterState.animations){	
			posInSpriteSheet = 0;
		}else{	
			posInSpriteSheet++;
		}
		tickCount = 0;
	}else{
		tickCount++;
	}	
}

