'use strict';

// sprite size: 64x64
// maybe i should take every thick as a step

// para ajustar a velocidad cambiar la variable fps
var fps = 30;

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
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>'
		],
		movements : [{
			y: -8
		},{
			x: 8
		},{
			y: 8
		},{
			x: -8
		}],
		correct: [
					[
						'Mover derecha',
						'Mover arriba',
						'Mover izquierda',
						'Mover abajo'
					],
					[
						'Mover arriba',
						'Mover derecha',
						'Mover abajo',
						'Mover izquierda'
					]
				],
		characterState : 'face-right',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>'
		],
		movements : [{
			y: 8
		},{
			y: 8
		},{
			x: 8
		},{
			y: -8
		},{
			x: 8
		}, {
			y: -8
		},{
			x: 8
		},{
			y: -8
		},{
			x: -8
		},{
			y: -8
		},{
			y: -8
		},{
			x: -8
		}],
		correct: [
					[
						'Mover abajo',
						'Mover abajo',
						'Mover derecha',
						'Mover arriba',
						'Mover derecha',
						'Mover arriba',
						'Mover derecha',
						'Mover arriba',
						'Mover izquierda',
						'Mover arriba',
						'Mover arriba',
						'Mover izquierda'
					]
				],
		characterState : 'face-right',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>'
		],
		movements : [{
			x: 8
		},{
			y: -8
		},{
			x: 8
		},{
			y: -8
		},{
			x: -8
		}, {
			y: -8
		}],
		correct: [
					[
						'Mover derecha',
						'Mover arriba',
						'Mover derecha',
						'Mover arriba',
						'Mover izquierda',
						'Mover arriba'
					]
				],
		characterState : 'face-right',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces  <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>'
		],
		movements : [{
			x: 8
		},{
			y: -8
		},{
			x: 8
		},{
			y: -8
		}],
		correct: [['Mover derecha', 'Mover arriba', 'Mover derecha', 'Mover arriba']],
		characterState : 'face-right',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success repeat" mov="repeat-1-2">Repetir acciones 2 veces</div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>'
		],
		movements : [{
			x: 8
		},{
			x: 8
		}],
		correct: [['Mover derecha', 'Mover derecha' ]],
		characterState : 'face-right',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 132,
		yStart : 260,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>'
		],
		movements : [{
			y: -8
		},{
			x: 8
		},{
			y: -8
		}],
		correct: [['Mover arriba', 'Mover derecha', 'Mover arriba' ]],
		characterState : 'face-up',
		posXInCanvas: 100,
		posYInCanvas: 200,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.2
	},
	{
		xStart : 35,
		yStart : 60,
		options:[
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="up-movement">Mover arriba <span class="glyphicon glyphicon-arrow-up" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="down-movement">Mover abajo <span class="glyphicon glyphicon-arrow-down" aria-hidden="true"></span></div>'
		],
		movements : [{
			y: 8
		},{
			x: 8
		},{
			y: 8
		}],
		correct: [['Mover abajo', 'Mover derecha', 'Mover abajo']],
		characterState : 'face-right',
		posXInCanvas: 0,
		posYInCanvas: 0,
		stepInCanvasX : 8.2,
		stepInCanvasY : 8.0
	},
	{
		xStart : 35,
		yStart : 60,
		options:[
			'<div class="draggable-element bg-success" mov="right-movement">Mover derecha <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span></div>',
			'<div class="draggable-element bg-success" mov="left-movement">Mover izquierda <span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>'
		],
		movements : [{
			x: 8
		}],
		correct: [['Mover derecha']],
		characterState : 'face-right',
		posXInCanvas: 0,
		posYInCanvas: 0,
		stepInCanvasX : 7.1,
		stepInCanvasY : 8.1
	}
];

stages = stages.reverse();

var images = [],
	canvas = document.getElementById('design-canvas'),
	context = canvas.getContext('2d'),
	//id = context.createImageData(1, 1),
	//d = id.data,
	greenColor = ['#99D8A2', '#4DD65F', '#11d628'],
	redColor = ['#DB7B7B', '#D12E2E', '#CE0000'],
	stage = 0,
	points = [],
	characterState = stages[stage].characterState,
	jsonCharacterState = character.animations[characterState],
	totalResources = 3,
	spriteSize = 64,
	numResourcesLoaded = 0,
	ticksPerFrame = 1,
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
	$canvasElement.width($canvasElement.parent().width() - 50);
	$canvasElement.height($canvasElement.parent().width() - 50);
});

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
	$canvasElement.width($canvasElement.parent().width() - 50);
	$canvasElement.height($canvasElement.parent().width() - 50);
	drawOptionsAndMakeDraggable();
});



function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPoints(){
	for(var p=0; p<points.length; p++){
		context.beginPath();
		context.fillStyle = "#DDFF00";
		context.strokeStyle = "#DDFF00";
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
	context.strokeStyle = "#DDFF00";
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

$("#howto").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	$('#dialog-howto').dialog('open');
});

$("#about").on('click', function(event) {
	event.preventDefault();
	/* Act on the event */
	$('#dialog-about').dialog('open');
});

$('#dialog-message').dialog({
	modal: true,
	autoOpen: false,
	dialogClass: 'no-close',
	closeOnEscape: false,
	resizable:false,
	draggable: false,
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
	closeOnEscape: false,
	resizable:false,
	draggable: false,
	buttons: [{
		text: "Siguiente reto",
		click: function(){
			$(this).dialog('close');
			stage++;
			revertToStart();
		}
	}]
});

$('#dialog-howto').dialog({
	modal: true,
	autoOpen: false,
	dialogClass: 'no-close',
	closeOnEscape: false,
	resizable:false,
	draggable: false,
	height: 520,
	width: 560,
	buttons: [{
		text: "OK",
		click: function(){
			$(this).dialog('close');
			revertToStart();
		}
	}]
});

$('#dialog-about').dialog({
	modal: true,
	autoOpen: false,
	dialogClass: 'no-close',
	closeOnEscape: false,
	resizable:false,
	draggable: false,
	width: 350,
	buttons: [{
		text: "Entendido",
		click: function(){
			$(this).dialog('close');
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
					if(allRight && movements.length === stages[stage].correct[0].length){
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
		if($(el).hasClass('repeat')){
			for(var i=0; i<=1; i++){		// solo aceptamos loop de 2 por ahora
				$(el).children('.draggable-element').each(function(index2, el2) {
					movements.push($(el2));
				});
			}
		}else{
			movements.push($(el));
		}
	});
	setCharacterDirection();
	interval = setInterval(redraw, 1000 / fps);
});

$('#reset').on('click', function() {
	revertToStart();
});
