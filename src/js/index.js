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

var activeFor = -1;

function loop() {
	activeFor++;

	setTimeout(loop, 1000);
}

function render() {
	changeTeaAmount(amountOfTea);

	var date = new Date();
	timeElem.innerHTML = date.toLocaleTimeString();
	activeForElem.innerHTML = "Streaming for: " + activeFor.toString() + " seconds.";

	requestAnimationFrame(render);
}

document.addEventListener("DOMContentLoaded", function(event) {
	timeElem = document.getElementById('time');
	teaElem = document.getElementById('tea');
	activeForElem = document.getElementById('activeFor');
	footerMessageElem = document.getElementById('footerMessage');

	loop();
	render();
});
