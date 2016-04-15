'use strict';

// sprite size: 64x64
// maybe i should take every thick as a step

var character = {
	'id': 'professor',
	'width': 64,
	'height': 64,
	'animations': {
		'walk-up': {
			'row': 0,
			'animations': 8,
			'startposInSpriteSheet': 64
		},
		'walk-down': {
			'row': 2,
			'animations': 8,
			'startposInSpriteSheet': 64
		},
		'walk-left': {
			'row': 1,
			'animations': 8,
			'startposInSpriteSheet': 64
		},
		'walk-right': {
			'row': 3,
			'animations': 8,
			'startposInSpriteSheet': 64
		},
		'face-up': {
			'row': 0,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'face-down': {
			'row': 1,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'face-left': {
			'row': 2,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'face-right': {
			'row': 3,
			'animations': 1,
			'startposInSpriteSheet': 0
		}
	}
};

var image = new Image(),
	canvas = document.getElementById('design-canvas'),
	context = canvas.getContext('2d'),
	fps = 30,
	//id = context.createImageData(1, 1),
	//d = id.data,
	characterState = 'face-right',
	jsonCharacterState = character.animations[characterState],
	totalResources = 1,
	spriteSize = 64,
	numResourcesLoaded = 0,
	ticksPerFrame = 2,
	tickCount = 0,
	posInSpriteSheet = 0,
	posXInCanvas = 0,
	posYInCanvas = 0,
	movementRate = 2,
	stepsMoved = 0,
	movements = [],
	pos = 0,
	stepsToWalk = 8,
	interval = null;



$('.draggable-element').draggable({
	'revert': 'invalid'
});

$('#droppable-element').droppable({
	accept: '.draggable-element',
	activeClass: 'ui-state-highlight',
	drop: function(event, ui){
		if (!$(ui.draggable).hasClass('no-draggable')){
			$(ui.draggable).appendTo('#droppable-element').removeAttr('style').addClass('no-draggable');
			$('#droppable-element').sortable();
		}
	}
});

$('#dialog-message').dialog({
	modal: true
});

$(document).ready(function(){
	var $canvasElement = $('#design-canvas');
	$canvasElement.width($canvasElement.parent().width());
	$canvasElement.height($canvasElement.parent().width());
});

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawImage(){
	context.drawImage(image, posInSpriteSheet * spriteSize + jsonCharacterState.startposInSpriteSheet, jsonCharacterState.row * spriteSize, spriteSize, spriteSize, posXInCanvas, posYInCanvas, spriteSize, spriteSize);
}

function drawCharacterInStartingPosition(){
	characterState = 'face-right';
	jsonCharacterState = character.animations[characterState];
	clearCanvas();
	drawImage();
}

/*
		move the professor with arrow keys :D
$(document).on('keydown', function(event) {
	if(event.which == 13){
		characterState = 'face-right';
	}else if(event.which == 37){
		characterState = 'walk-left';
	}else if(event.which == 38){
		characterState = 'walk-up';
	}else if(event.which == 39){
		characterState = 'walk-right';
	}else if(event.which == 40){
		characterState = 'walk-down';
	}
	jsonCharacterState = character.animations[characterState];
});
*/

/*		draw a point XD
function drawPoint(x, y){
	d[0]   = 255;
	d[1]   = 0;
	d[2]   = 0;
	d[3]   = 255;
	context.putImageData( id, x, y );
}
*/

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

function calculateCharacterPosition(){
	if(characterState === 'walk-left'){
		posXInCanvas = posXInCanvas - movementRate;
	}else if(characterState === 'walk-right'){
		posXInCanvas = posXInCanvas + movementRate;
	}else if(characterState === 'walk-up'){
		posYInCanvas = posYInCanvas - movementRate;
	}else if(characterState === 'walk-down'){
		posYInCanvas = posYInCanvas + movementRate;
	}
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

function isCharacterInCanvas(){
	// todo calcular de acuerdo al width del container los otros extremos!!!
	if (posXInCanvas <= -46 || posYInCanvas <= -64){
		return false;
	}
	return true;
}

function isCharacterMoving(){
	if (characterState.indexOf('walk') !== -1){
		return true;
	}
	return false;
}


function redraw() {
	if (tickCount > ticksPerFrame && isCharacterMoving()){
		if (isCharacterInCanvas()){
			stepsMoved++;
			if(stepsMoved > stepsToWalk * 4){		// 4 thicks = one step
				if(pos === movements.length){		// all movements finished
					clearInterval(interval);
				}
				stepsMoved = 0;
				setCharacterDirection(pos);
			}
			calculateCharacterPosition();		// position of the character in canvas before drawing
			clearCanvas();						// clear earlier step
			fillBackground('#D6C3C6');
			drawShadow();						// shadow draw to character
			drawImage();						// draw character
			if (posInSpriteSheet + 1 >= jsonCharacterState.animations){
				posInSpriteSheet = 0;
			}else{
				posInSpriteSheet++;
			}
			tickCount = 0;
		}else{
			clearInterval(interval);
			// character is out of the canvas, show message or something else
		}
	}else if(isCharacterMoving()){
		tickCount++;
	}
}


function setCharacterDirection(){
	if (pos < movements.length){
		if (movements[pos] === 'right-movement'){
			characterState = 'walk-right';
		}else if (movements[pos] === 'left-movement'){
			characterState = 'walk-left';
		}else if (movements[pos] === 'up-movement'){
			characterState = 'walk-up';
		}else if (movements[pos] === 'down-movement'){
			characterState = 'walk-down';
		}
	}else{
		characterState = 'face-right';
	}
	jsonCharacterState = character.animations[characterState];
	pos++;
}

function resetVariables(){
	characterState = 'face-right';
	jsonCharacterState = character.animations[characterState];
	ticksPerFrame = 2;
	tickCount = 0;
	posInSpriteSheet = 0;
	posXInCanvas = 0;
	posYInCanvas = 0;
	stepsMoved = 0;
	movements = [];
	pos = 0;
	stepsToWalk = 8;
}

function resourceLoaded() {
	numResourcesLoaded += 1;
	if(numResourcesLoaded === totalResources) {
		// agregar un mensaje de que se esta preparando el nivel con ventana modal
		drawCharacterInStartingPosition();
	}
}

function loadImage() {
	image.onload = function() {
		resourceLoaded();
	};
	image.src = 'images/professor_walk_cycle_no_hat.png';
}

loadImage();

$('#try').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	drawCharacterInStartingPosition();
	resetVariables();
	movements = [];
	$('#droppable-element').children('.draggable-element') .each(function(index, el) {
		movements.push($(el).attr('mov'));
	});
	setCharacterDirection();
	interval = setInterval(redraw, 1000 / fps);
});
