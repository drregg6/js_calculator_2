let numbers = document.querySelectorAll('.number');
let zeroButton = document.querySelector('#zero');
let oneButton = document.querySelector('#one');
let twoButton = document.querySelector('#two');
let threeButton = document.querySelector('#three');
let fourButton = document.querySelector('#four');
let fiveButton = document.querySelector('#five');
let sixButton = document.querySelector('#six');


// button effects
numbers.forEach(function(number) {
    number.addEventListener('mousedown', function(ev) {
        this.classList.add('number-pressed');
    });
    number.addEventListener('mouseup', function(ev) {
        this.classList.remove('number-pressed');
    })
});