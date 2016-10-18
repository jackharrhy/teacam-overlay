var socket = io();

function newButton(label) {
  var button = document.createElement('button');
  button.innerHTML = label;
  button.onclick = function() {
    socket.emit('control', label);
  }
  document.body.appendChild(button);
  document.body.appendChild(document.createElement('br'));
}

function newInput(label) {
  var input = document.createElement('input');
  input.placeholder = label
  input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      socket.emit('control', [label, input.value]);
      input.value = '';
    }
  });
  document.body.appendChild(input);
  document.body.appendChild(document.createElement('br'));
}

newButton('teaUpFive');
newButton('teaUpOne');
newButton('teaDownOne');
newButton('teaDownFive');
newInput('footerMessage');
newInput('timer');
