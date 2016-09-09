'use strict';

// sprite size: 64x64
// maybe i should take every thick as a step

// para ajustar a velocidad cambiar la variable fps
var fps = 30;

var animation = {
	'moleup': [
		{
			from: 0,
			to: 0,
			repeat: 4
		}
	]
};

var images = [],
	canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	//id = context.createImageData(1, 1),
	//d = id.data,
	posX = 170,
	posY = 270,
	startY = 270,
	numResourcesLoaded = 0,
	totalResources = 9,
	tickCount = 0,
	ticksPerFrame = 3,
	tickCountGrass = 0,
	ticksPerFrameGrass = 5,
	imagePos = 0,
	xMovement = 50,
	currentAnimation = 'moleUp',
	k = -1,
	laughTimes = 1,
	totalLaughTimes = 12,
	switchGrass = 1,
	grassPos = 0;


$('#droppable-element').droppable({
	accept: '.draggable-element',
	activeClass: 'ui-state-highlight',
	drop: function(event, ui){
		if (!$(ui.draggable).hasClass('no-draggable')){
			$(ui.draggable).appendTo('#droppable-element').removeAttr('style').addClass('no-draggable');
			if($(ui.draggable).hasClass('repeat')){
				$(ui.draggable).addClass('repeatable bg-success-2');
				$(ui.draggable).append('<div class="space">&nbsp;</div>');
				$(ui.draggable).droppable({
					greedy: true,
					accept: '.draggable-element',
					activeClass: 'ui-state-highlight-level2',
					drop: function(event, ui){
						if (!$(ui.draggable).hasClass('no-draggable')){
							$(this).find('.space').remove();
							$(ui.draggable).appendTo(this).removeAttr('style').addClass('no-draggable inside-loop');
						}
					}
				});
			}
		}
	}
});


function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoints(){
	for(var p=0; p<points.length; p++){
		context.beginPath();
		context.fillStyle = '#DDFF00';
		context.strokeStyle = '#DDFF00';
		context.arc(points[p].x, points[p].y, 4, 0, 2 * Math.PI);
		context.fill();
		context.closePath();
	}
}


function drawEllipse(centerX, centerY, width, height) {
	context.beginPath();
	context.moveTo(centerX, centerY - height / 2);
	context.bezierCurveTo(
	centerX + width / 2, centerY - height / 2,
	centerX + width / 2, centerY + height / 2,
	centerX, centerY + height / 2);

	context.bezierCurveTo(
	centerX - width / 2, centerY + height / 2,
	centerX - width / 2, centerY - height / 2,
	centerX, centerY - height / 2);

	context.fillStyle = 'black';
	context.fill();
	context.closePath();
}


function fillBackground(color){
	context.beginPath();
	context.rect(0, 0, 400, 400);
	context.fillStyle = color;
	context.fill();
	context.closePath();
}



function drawShadow(){
	drawEllipse(posXInCanvas + 32, posYInCanvas + 60, 30, 4);
}

function drawImage(im){
	context.drawImage(images[im], 0, 0, 178, xMovement, posX, posY, 178, xMovement);
}

function calculatePositionAndChangeImage(){
	if(currentAnimation === 'moleUp'){
		laughTimes = 0;
		imagePos = 0;
		if(xMovement < 200){
			xMovement += 10
		}
		if(startY - posY <= 140){
			posY -= 10;
		}else{
			currentAnimation = 'smile';
		}
	}
	if(currentAnimation === 'moleDown'){
		laughTimes = 0;
		imagePos = 0;
		if(xMovement >= 10){
			xMovement -= 10
		}
		if(xMovement == 0){
			xMovement = 1;
		}
		if(startY - posY >= -20){
			posY += 10;
		}
	}
	if(currentAnimation === 'smile'){
		laughTimes++;
		if(imagePos === 0 || imagePos === 3){
			k = k * -1;
		}
		posY = posY - (5*k);
		imagePos += k;
		if(laughTimes === totalLaughTimes){
			currentAnimation = 'moleDown';
		}
	}
}

function drawGrass(){
	context.beginPath();
	context.rect(0, 315, 500, 500);
	context.fillStyle = '#3AAA35';
	context.fill();
	context.closePath();
	/*
	context.drawImage(images[8], 0, 0, 128, 128, 0, 190, 128, 128);
	context.drawImage(images[8], 0, 0, 128, 128, 128, 190, 128, 128);
	context.drawImage(images[8], 0, 0, 128, 128, 256, 190, 128, 128);
	context.drawImage(images[8], 0, 0, 128, 128, 384, 190, 128, 128);
	*/
	context.drawImage(images[8], grassPos*128, 0, 128, 128, 0, 190, 128, 128);
	context.drawImage(images[8], grassPos*128, 0, 128, 128, 128, 190, 128, 128);
	context.drawImage(images[8], grassPos*128, 0, 128, 128, 256, 190, 128, 128);
	context.drawImage(images[8], grassPos*128, 0, 128, 128, 384, 190, 128, 128);
	tickCountGrass++;
	if(tickCountGrass > ticksPerFrameGrass){
		tickCountGrass = 0;
		grassPos++;
		if(grassPos > 3){
			grassPos = 0;
		}
	}
	/*
	switchGrass *= -1;
	if(switchGrass === 1){
	}else{
		context.drawImage(images[8], 0, 128, 512, 256, 0, 252, 512, 128);
	}*/
}

function redraw() {
	if (tickCount > ticksPerFrame){
		calculatePositionAndChangeImage();
		clearCanvas();						// clear earlier step
		drawImage(imagePos);						// draw character
		drawGrass();
		tickCount = 0;
	}else {
		tickCount++;
	}
}

function isTheRightStep(){
	if (movements[pos].html().indexOf(stages[stage].correct[0][pos]) != -1){
		return true;
	}else if (stages[stage].correct[1] != undefined){
		if (movements[pos].html().indexOf(stages[stage].correct[1][pos]) != -1){
			return true;
		}
	}
	return false;
}


function markStep(color){
	$(movements[pos]).animate({
		'background-color': color
	}, 3000);
}

function resetVariables(){
	points = [];
	characterState = stages[stage].characterState;
	jsonCharacterState = character.animations[characterState];
	ticksPerFrame = 1;
	tickCount = 0;
	posInSpriteSheet = 0;
	posXInCanvas = stages[stage].posXInCanvas;
	posYInCanvas = stages[stage].posYInCanvas;
	stepsMoved = 0;
	movements = [];
	pos = 0;
	stepsToWalk = 8;
	allRight = true;

}

function resourceLoaded() {
	numResourcesLoaded += 1;
	if(numResourcesLoaded === totalResources) {
		setInterval(redraw, 1000 / fps);
	}
}

function loadImage(src, im) {
	images[im] = new Image();
	images[im].onload = function() {
		resourceLoaded();
	};
	images[im].src = src;
}

loadImage('images/mole_1.png', 0);
loadImage('images/mole_laugh1.png', 1);
loadImage('images/mole_laugh2.png', 2);
loadImage('images/mole_laugh3.png', 3);
loadImage('images/mole_thump1.png', 4);
loadImage('images/mole_thump2.png', 5);
loadImage('images/mole_thump3.png', 6);
loadImage('images/mole_thump4.png', 7);
loadImage('images/grass.png', 8);