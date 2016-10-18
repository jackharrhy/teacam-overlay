(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();

var functions = {
	teaUpFive: function () {
		amountOfTea += 5;
	},
	teaUpOne: function () {
		amountOfTea++;
	},
	teaDownOne: function () {
		amountOfTea--;
	},
	teaDownFive: function () {
		amountOfTea -= 5;
	},
	footerMessage: function (message) {
		footerMessageElem.innerHTML = message;
	}
};

console.log(functions);

socket.on('update', function (thingToDo) {
	if (typeof thingToDo === 'object') {
		console.log(thingToDo[0]);
		console.log(thingToDo[1]);
		functions[thingToDo[0]](thingToDo[1]);
	} else {
		functions[thingToDo]();
	}
});

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

document.addEventListener("DOMContentLoaded", function (event) {
	timeElem = document.getElementById('time');
	teaElem = document.getElementById('tea');
	activeForElem = document.getElementById('activeFor');
	footerMessageElem = document.getElementById('footerMessage');

	loop();
	render();
});

},{}]},{},[1])


//# sourceMappingURL=teacam.js.map
