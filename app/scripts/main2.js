'use strict';

//Canvas stuff
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext('2d'),
	width = $('#canvas').width(),
	height = $('#canvas').height(),
	cellWidth = 10,
	direction = undefined,
	food = undefined,
	score = undefined,
	fps = 30,
	gameInterval = undefined,
	rateInterval = undefined,
	tick = 0,
	tickPerFrame = 1,
	rateChange = undefined,
	rateCount = 0,
	addedRate = 0;

//Lets create the snake now
var snakeArray;

function createGameInterval(){
	gameInterval = setInterval(paint, (1000 / fps) + addedRate);
}

function  changeRate(){
	rateCount++;
	if(rateCount > rateChange){
		rateCount = 0;
		if ( (1000 / fps) + addedRate > 5){
			addedRate -= 5;
		}else if( (1000 / fps) + addedRate > 0.5){
			addedRate -= 0.5;
		}
		clearGameInterval();
		createGameInterval();
	}
}

function createRateInterval(){
	rateInterval = setInterval(changeRate, 1000 / fps);
}

function init(){
	direction = 'right';
	score = 0;
	rateChange = 1000;
	rateCount = 0;
	addedRate=0;
	createSnake();
	createFood();
	createGameInterval();
	createRateInterval();
}



$(document).ready(function() {
	init();
});


function createSnake(){
	var length = 5;
	snakeArray = [];
	for(var i = length-1; i>=0; i--){
		snakeArray.push({x: i, y:0});
	}
}

function createFood(){
	food = {
		x: Math.round(Math.random() * (width - cellWidth) / cellWidth), 
		y: Math.round(Math.random() * (height - cellWidth) / cellWidth), 
	};
}

function clearGameInterval(){
	clearInterval(gameInterval);
}

function clearRateInterval(){
	clearInterval(rateInterval);
}

function paint(){
	if(tick > tickPerFrame){
		tick = 0;
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = 'black';
		ctx.strokeRect(0, 0, width, height);

		var nx = snakeArray[0].x;
		var ny = snakeArray[0].y;

		if(direction == 'right') {
			nx++;
		}
		else if(direction == 'left') {
			nx--;
		}
		else if(direction == 'up') {
			ny--;
		}
		else if(direction == 'down'){
			ny++;
		}

		if(nx == -1 || nx == width/cellWidth || ny == -1 || ny == height/cellWidth || checkCollision(nx, ny, snakeArray)){
			clearGameInterval();
			clearRateInterval();
			init();
			return;
		}

		if(nx == food.x && ny == food.y){
			var tail = {x: nx, y: ny};
			score++;
			createFood();
		}else{
			var tail = snakeArray.pop();
			tail.x = nx;
			tail.y = ny;
		}

		snakeArray.unshift(tail);

		for(var i = 0; i < snakeArray.length; i++){
			var snakePart = snakeArray[i];
			paintCell(snakePart.x, snakePart.y);
		}

		paintCell(food.x, food.y, 'red');
		var score_text = 'Score: ' + score;
		ctx.fillText(score_text, 5, height-5);
	}else{
		tick++;
	}
}

function paintCell(x, y, color){
	if(color == undefined){
		ctx.fillStyle = 'blue';
	}else{
		ctx.fillStyle = color;
	}
	ctx.fillRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
	ctx.strokeStyle = 'white';
	ctx.strokeRect(x*cellWidth, y*cellWidth, cellWidth, cellWidth);
}

function checkCollision(x, y, array){
	for(var i = 0; i < array.length; i++){
		if(array[i].x == x && array[i].y == y){
		 return true;
		}
	}
	return false;
}

$(document).on('keydown', function(event) {
	event.preventDefault();
	/* Act on the event */
	let key = event.which;
	if(key == '37' && direction != 'right') {
		direction = 'left';
	}
	else if(key == '38' && direction != 'down') {
		direction = 'up';
	}
	else if(key == '39' && direction != 'left') {
		direction = 'right';
	}
	else if(key == '40' && direction != 'up') {
		direction = 'down';
	}
});
