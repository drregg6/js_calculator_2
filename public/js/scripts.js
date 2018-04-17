let numbers = document.querySelectorAll('.number');
let zeroButton = document.querySelector('#zero');
let oneButton = document.querySelector('#one');
let twoButton = document.querySelector('#two');
let threeButton = document.querySelector('#three');
let fourButton = document.querySelector('#four');
let fiveButton = document.querySelector('#five');
let sixButton = document.querySelector('#six');
let sevenButton = document.querySelector('#seven');
let eightButton = document.querySelector('#eight');
let nineButton = document.querySelector('#nine');

let screen = document.querySelector('.screen');
let displayStr = screen.firstChild.nextSibling;

// button effects
numbers.forEach(function(number) {
    number.addEventListener('mousedown', function(ev) {
        this.classList.add('number-pressed');
    });
    number.addEventListener('mouseup', function(ev) {
        this.classList.remove('number-pressed');
    });
    number.addEventListener('click', function(ev) {
        let pressedStr = this.firstChild.nextSibling.textContent;
        let pressedNum = parseInt(pressedStr);
        console.log(pressedStr);
        console.log(pressedNum);
        
        if (displayStr.textContent === '0') {
            displayStr.textContent = pressedStr;
        } else {
            displayStr.textContent = displayStr.textContent + pressedStr;
        }
    });
});
//zeroButton.addEventListener('click', ev => console.log('Zero!'));
//oneButton.addEventListener('click', function(ev) {
//    let num = parseInt(this.firstChild.nextSibling.innerText);
//    console.log(ev);
//    console.log(num);
//});
//twoButton.addEventListener('click', ev => {
//    console.log(ev);
//});
//threeButton.addEventListener('click', ev => console.log('Three!'));
//fourButton.addEventListener('click', ev => console.log('Four!'));
//fiveButton.addEventListener('click', ev => console.log('Five!'));
//sixButton.addEventListener('click', ev => console.log('Six!'));
//sevenButton.addEventListener('click', ev => console.log('Seven!'));
//eightButton.addEventListener('click', ev => console.log('Eight!'));
//nineButton.addEventListener('click', ev => console.log('Nine!'));