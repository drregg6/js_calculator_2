// grabbing buttons
let numbers = document.querySelectorAll('.number');
let add = document.querySelector('#add');
let subtract = document.querySelector('#subtract');
let divide = document.querySelector('#divide');
let multiply = document.querySelector('#multiply');
let equals = document.querySelector('#equals');
let clear = document.querySelector('#clear');

let screen = document.querySelector('.screen');
let displayStr = screen.firstChild.nextSibling;

let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;

numbers.forEach(function(number) {
    // button pressdown effect
    number.addEventListener('mousedown', function(ev) {
        this.classList.add('number-pressed');
    });
    number.addEventListener('mouseup', function(ev) {
        this.classList.remove('number-pressed');
    });
    // screen display effect
    number.addEventListener('click', function(ev) {
        let pressedStr = this.firstChild.nextSibling.textContent;
        let pressedNum = parseInt(pressedStr);
        
        
        
        if (displayStr.textContent === '0') {
            displayStr.textContent = pressedStr;
        } else {
            displayStr.textContent = displayStr.textContent + pressedStr;
        }
    });
});

add.addEventListener('click', function(ev) {
    resetFlags();
     isAdding = true;
});
subtract.addEventListener('click', function(ev) {
    resetFlags();
    isSubtracting = true;
});
multiply.addEventListener('click', function(ev) {
    resetFlags();
     isMultiplying = true;
});
divide.addEventListener('click', function(ev) {
    resetFlags();
     isDividing = true;
});
equals.addEventListener('click', function(ev) {
     alert('Hello world!');
});
clear.addEventListener('click', function(ev) {
     alert('Hello world!');
});

















function resetFlags() {
    isSubtracting = false;
    isDividing = false;
    isAdding = false;
    isMultiplying = false;
}

//let zeroButton = document.querySelector('#zero');
//let oneButton = document.querySelector('#one');
//let twoButton = document.querySelector('#two');
//let threeButton = document.querySelector('#three');
//let fourButton = document.querySelector('#four');
//let fiveButton = document.querySelector('#five');
//let sixButton = document.querySelector('#six');
//let sevenButton = document.querySelector('#seven');
//let eightButton = document.querySelector('#eight');
//let nineButton = document.querySelector('#nine');



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