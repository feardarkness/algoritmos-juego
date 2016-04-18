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
			'row': 2,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'face-left': {
			'row': 1,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'face-right': {
			'row': 3,
			'animations': 1,
			'startposInSpriteSheet': 0
		},
		'dead': {
			'row': 0,
			'animations': 6,
			'startposInSpriteSheet': 0
		}
	}
};

var stages = [
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="repeat-1-2">Repetir la última acción 2 veces</div>'
		],
		movements : [{
			y: -8
		},{
			x: 8
		},{
			y: -8
		}],
		correct: ['Mover arriba 8 pasos', 'Mover derecha 8 pasos', 'Mover arriba 8 pasos' ],
		characterState : 'face-up',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.1
	},
	{
		xStart : 35,
		yStart : 60,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo 8 pasos</div>'
		],
		movements : [{
			y: 8
		},{
			x: 8
		}],
		correct: ['Mover abajo 8 pasos', 'Mover derecha 8 pasos' ],
		characterState : 'face-right',
		posXInCanvas: 0,
		posYInCanvas: 0,
		stepInCanvasX : 7.1,
		stepInCanvasY : 8.1
	},
	{
		xStart : 35,
		yStart : 60,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba 8 pasos</div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo 8 pasos</div>'
		],
		movements : [{
			y: 8
		},{
			x: 8
		}],
		correct: ['Mover abajo 8 pasos', 'Mover derecha 8 pasos' ],
		characterState : 'face-right',
		posXInCanvas: 0,
		posYInCanvas: 0,
		stepInCanvasX : 7.1,
		stepInCanvasY : 8.1
	}
];

var images = [],
	canvas = document.getElementById('design-canvas'),
	context = canvas.getContext('2d'),
	fps = 30,
	//id = context.createImageData(1, 1),
	//d = id.data,
	stage = 0,
	characterState = stages[stage].characterState,
	jsonCharacterState = character.animations[characterState],
	totalResources = 3,
	spriteSize = 64,
	numResourcesLoaded = 0,
	ticksPerFrame = 2,
	tickCount = 0,
	posInSpriteSheet = 0,
	posXInCanvas = stages[stage].posXInCanvas,
	posYInCanvas = stages[stage].posYInCanvas,
	movementRate = 2,
	stepsMoved = 0,
	movements = [],
	pos = 0,
	stepsToWalk = 8,
	interval = null,
	deadInterval = null,
	stepInCanvasX = stages[stage].stepInCanvasX,
	stepInCanvasY = stages[stage].stepInCanvasY,
	allRight = true;

$(window).resize(function(){
	var $canvasElement = $('#design-canvas');
	$canvasElement.width($canvasElement.parent().width());
	$canvasElement.height($canvasElement.parent().width());
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

function drawOptionsAndMakeDraggable(){
	for(var pos=0; pos < stages[stage].options.length; pos++){
		$("#elements-container").append(stages[stage].options[pos]);
	}
	$('.draggable-element').draggable({
		'revert': 'invalid'
	});
}

function clearOptionsInScreen(){
	$('.draggable-element').each(function(index, el) {
		$(el).remove();
	});
}

function revertToStart(){
	clearOptionsInScreen();
	resetVariables();
	drawCharacterInStartingPosition();
	drawOptionsAndMakeDraggable();
}
$(document).ready(function(){
	var $canvasElement = $('#design-canvas');
	$canvasElement.width($canvasElement.parent().width());
	$canvasElement.height($canvasElement.parent().width());
	drawOptionsAndMakeDraggable();
});



function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawStage(stage){
	context.beginPath();
	var pathX = stage.xStart;
	var pathY = stage.yStart;
	context.lineWidth = 5;
	context.strokeStyle = "#DDFF00";
	context.moveTo(pathX, pathY);
	for(var pos = 0; pos < stage.movements.length; pos++){
		if(stage.movements[pos].hasOwnProperty("x")){
			pathX = pathX + (stepInCanvasX * ( stage.movements[pos].x));
		}else{
			pathY = pathY + (stepInCanvasY * ( stage.movements[pos].y));
		}
		context.lineTo(pathX, pathY);
	}
	context.stroke();
	context.closePath();
}

function drawImage(im){
	context.drawImage(images[im], posInSpriteSheet * spriteSize + jsonCharacterState.startposInSpriteSheet, jsonCharacterState.row * spriteSize, spriteSize, spriteSize, posXInCanvas, posYInCanvas, spriteSize, spriteSize);
}

function drawFloor(){
	var width = $('#design-canvas').parent().width(),
		pieces = Math.ceil(width/62);
	for(var i=0; i<pieces; i++){
		for(var j=0; j<pieces; j++){
			context.drawImage(images[2], 18, 16, 62, 62, 64*i, 64*j, 64, 64);
		}
	}
}

function drawCharacterInStartingPosition(){
	characterState = stages[stage].characterState;
	jsonCharacterState = character.animations[characterState];
	clearCanvas();
	drawFloor();
	drawStage(stages[stage]);
	drawImage(0);
}

$('#dialog-message').dialog({
	modal: true,
	autoOpen: false,
	dialogClass: 'no-close',
	buttons: [{
		text: "Dejame intentar de nuevo",
		click: function(){
			$(this).dialog('close');
			revertToStart();
		}
	}]
});

$('#dialog-success').dialog({
	modal: true,
	autoOpen: false,
	dialogClass: 'no-close',
	buttons: [{
		text: "Siguiente reto",
		click: function(){
			$(this).dialog('close');
			stage++;
			revertToStart();
		}
	}]
});


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

function animateDead(){
	characterState = 'dead';
	jsonCharacterState = character.animations[characterState];
	if (tickCount > 3){				// 3 thicks por frame en la muerte
		clearCanvas();						// clear earlier step
		drawFloor();
		drawStage(stages[stage]);
		drawShadow();						// shadow draw to character
		drawImage(1);
		posYInCanvas += 3;
		if (posInSpriteSheet + 1 === jsonCharacterState.animations){
			clearInterval(deadInterval);
			$("#dialog-message").dialog("open");
		}else{
			posInSpriteSheet++;
		}
		tickCount = 0;
	}else{
		tickCount++;
	}
}


function redraw() {
	if (tickCount > ticksPerFrame && isCharacterMoving()){
		if (isCharacterInCanvas()){
			stepsMoved++;
			if(stepsMoved > stepsToWalk * 4){		// 4 thicks = one step
				if(pos === movements.length){		// all movements finished
					clearInterval(interval);
					if(allRight && movements.length == stages[stage].correct.length){
						$("#dialog-success").dialog("open");
					}else{
						tickCount = 0;
						posInSpriteSheet = 0;
						deadInterval = setInterval(animateDead, 1000 / fps);
						return;
					}
				}
				stepsMoved = 0;
				setCharacterDirection(pos);
			}
			calculateCharacterPosition();		// position of the character in canvas before drawing
			clearCanvas();						// clear earlier step
			//fillBackground('#D6C3C6');
			drawFloor();
			drawStage(stages[stage]);
			drawShadow();						// shadow draw to character
			drawImage(0);						// draw character
			if (posInSpriteSheet + 1 >= jsonCharacterState.animations){
				posInSpriteSheet = 0;
			}else{
				posInSpriteSheet++;
			}
			tickCount = 0;
		}else{
			clearInterval(interval);
			$("#dialog-message").dialog("open");
		}
	}else if(isCharacterMoving()){
		tickCount++;
	}
}

function isTheRightStep(){
	if (movements[pos].html() === stages[stage].correct[pos]){
		return true;
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
			markStep('#7BDB89');		// mark green, all good
		}else{
			markStep('#DB7B7B');		// mark red, bad step
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
	characterState = stages[stage].characterState;
	jsonCharacterState = character.animations[characterState];
	ticksPerFrame = 2;
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
		// agregar un mensaje de que se esta preparando el nivel con ventana modal
		drawCharacterInStartingPosition();
	}
}

function loadImage(src, im) {
	images[im] = new Image();
	images[im].onload = function() {
		resourceLoaded();
	};
	images[im].src = src;
}

loadImage('images/professor_walk_cycle_no_hat.png', 0);
loadImage('images/professor_hurt_no_hat.png', 1);
loadImage('images/crypt.png', 2);

$('#try').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	drawCharacterInStartingPosition();
	resetVariables();
	movements = [];
	$('#droppable-element').children('.draggable-element') .each(function(index, el) {
		//movements.push($(el).attr('mov'));
		movements.push($(el));
	});
	setCharacterDirection();
	interval = setInterval(redraw, 1000 / fps);
});