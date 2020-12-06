var registrButton = document.querySelectorAll('#formsStyle button')[0];
var resetButton = document.querySelectorAll('#formsStyle button')[1];
console.log(document.getElementById("#formsStyle"));
resetButton.addEventListener('click', reset);

// var formsButtons = Array.prototype.filter.call(formsElements[0].childNodes, function(buttonElements){
//   return buttonElements.nodeName === 'BUTTON';
// });

var textInput = document.querySelectorAll('#formsStyle input[type="text"]');
for(var i=0; i < textInput.length; i++){
  textInput[i].addEventListener('keyup', writing)
}
var emailInput = document.querySelector('#formsStyle input[type="email"]');
emailInput.addEventListener('keyup', writing)
var ageInput = document.querySelector('#formsStyle input[type="number"]');
ageInput.addEventListener('change', writing)
var datetInput = document.querySelector('#formsStyle input[type="date"]');
datetInput.addEventListener('change', writing)
var genderInput =  document.querySelector('#formsStyle select');
datetInput.addEventListener('change', writing)


function reset(){
  document.getElementById("formsStyle").childNodes.reset();
}

function writing(element){
  var string = element.target.value;
  console.log(string);
}

