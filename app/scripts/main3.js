'use strict';

// sprite size: 64x64
// maybe i should take every thick as a step

// para ajustar a velocidad cambiar la variable fps
var fps = 30;

var images = [],
	canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	//id = context.createImageData(1, 1),
	//d = id.data,
	greenColor = ['#99D8A2', '#4DD65F', '#11d628'],
	redColor = ['#DB7B7B', '#D12E2E', '#CE0000'],
	imagePos = 0,
	stage = 0,
	points = [],
	totalResources = 8,
	spriteSize = 64,
	numResourcesLoaded = 0,
	ticksPerFrame = 10,
	tickCount = 0,
	posInSpriteSheet = 0,
	movementRate = 2,
	stepsMoved = 0,
	movements = [],
	pos = 0,
	stepsToWalk = 8,
	interval = null,
	deadInterval = null,
	allRight = true;

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


function revertToStart(){
	clearOptionsInScreen();
	resetVariables();
	drawCharacterInStartingPosition();
	drawOptionsAndMakeDraggable();
}

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

function drawStage(stage){
	context.beginPath();
	var pathX = stage.xStart;
	var pathY = stage.yStart;
	context.lineWidth = 4;
	context.strokeStyle = '#DDFF00';
	points.push({x:pathX, y:pathY});
	context.moveTo(pathX, pathY);
	for(var pos = 0; pos < stage.movements.length; pos++){
		if(stage.movements[pos].hasOwnProperty("x")){
			pathX = pathX + (stepInCanvasX * ( stage.movements[pos].x));
		}else{
			pathY = pathY + (stepInCanvasY * ( stage.movements[pos].y));
		}
		context.lineTo(pathX, pathY);
		points.push({x:pathX, y:pathY});
	}
	context.stroke();
	points.push({x:pathX, y:pathY});
	context.closePath();
	drawPoints();
}

function drawImage(im){
	context.drawImage(images[im], 0, 0, 200, 200, 50, 50, 100, 100);
}

function drawCharacterInStartingPosition(){
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
}



function drawShadow(){
	drawEllipse(posXInCanvas + 32, posYInCanvas + 60, 30, 4);
}


function redraw() {
	console.log("asduisabduasdsa");
	if (tickCount > ticksPerFrame){
		imagePos++;
		clearCanvas();						// clear earlier step
		drawImage(imagePos);						// draw character
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


function setCharacterDirection(){
	if (pos < movements.length){
		if (movements[pos].attr('mov') === 'right-movement'){
			characterState = 'walk-right';
		}else if (movements[pos].attr('mov') === 'left-movement'){
			characterState = 'walk-left';
		}else if (movements[pos].attr('mov') === 'up-movement'){
			characterState = 'walk-up';
		}else if (movements[pos].attr('mov') === 'down-movement'){
			characterState = 'walk-down';
		}
		if(isTheRightStep()){
			if($(movements[pos]).attr('colorPos') != undefined){
				let actualColorPos = parseInt($(movements[pos]).attr('colorPos'));
				markStep(greenColor[actualColorPos]);
				actualColorPos++;
				$(movements[pos]).attr('colorPos', actualColorPos);
			}else{
				markStep(greenColor[0]);		// mark green, all good
				$(movements[pos]).attr('colorPos', 1)
			}
		}else{
			if($(movements[pos]).attr('colorPos') != undefined){
				let actualColorPos = parseInt($(movements[pos]).attr('colorPos'));
				markStep(redColor[actualColorPos]);
				actualColorPos++;
				$(movements[pos]).attr('colorPos', actualColorPos);
			}else{
				markStep(redColor[0]);		// mark green, all good
				$(movements[pos]).attr('colorPos', 1)
			}
			allRight = false;
		}
	}else{
		characterState = 'face-right';
	}
	jsonCharacterState = character.animations[characterState];
	pos++;
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