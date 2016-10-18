var socket = io();

var functions = {
	teaUpFive: function() {
		amountOfTea += 5;
	},
	teaUpOne: function() {
		amountOfTea++;
	},
	teaDownOne: function() {
		amountOfTea--;
	},
	teaDownFive: function() {
		amountOfTea -= 5;
	},
	footerMessage: function(message) {
		footerMessageElem.innerHTML = message;
	},
	timer: function(setTo) {
		timer = setTo;
	}
};

console.log(functions);

socket.on('update', function(thingToDo) {
	if(typeof(thingToDo) === 'object') {
		console.log(thingToDo[0]);
		console.log(thingToDo[1]);
		functions[thingToDo[0]](thingToDo[1]);
	} else {
		functions[thingToDo]();
	}
})

var timeElem;
var teaElem;
var footerMessageElem;

function changeTeaAmount(percentage) {
	teaElem.style.height = String(percentage) + '%';
	teaElem.style.top = String(100 - percentage) + '%';
}

var amountOfTea = 70;

var timer = 0;

function loop() {
	timer--;

	setTimeout(loop, 1000);
}

function render() {
	changeTeaAmount(amountOfTea);

	var date = new Date();
	timeElem.innerHTML = date.toLocaleTimeString();

	if(timer >= 0) {
		timerElem.innerHTML = timer;
	} else {
		timerElem.innerHTML = '';
	}

	requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", function(event) {
	timeElem = document.getElementById('time');
	teaElem = document.getElementById('tea');
	footerMessageElem = document.getElementById('footerMessage');
	timerElem = document.getElementById('timer');

	loop();
	render();
});
