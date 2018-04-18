// grabbing buttons
let numbers = document.querySelectorAll('.number');
let add = document.querySelector('#add');
let subtract = document.querySelector('#subtract');
let divide = document.querySelector('#divide');
let multiply = document.querySelector('#multiply');
let equals = document.querySelector('#equals');
let clear = document.querySelector('#clear');

let screen = document.querySelector('.screen');
let displayString = screen.firstChild.nextSibling;

// operations flags
let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isEqualling = false;

// data storage
let storedNumber = 0;
let currentNumber = 0;



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
        let pressedString = this.firstChild.nextSibling;
        let pressedInt = parseInt(pressedString.textContent);
        
        
        if (displayString.textContent === '0') {
            displayString.textContent = pressedString.textContent;
            currentNumber = pressedInt;
        } else if (isAdding || isDividing || isMultiplying || isSubtracting) {
            displayString.textContent = pressedString.textContent;
            currentNumber = pressedInt;
        } else {
            currentNumber = parseInt(displayString.textContent + pressedString.textContent);
            displayString.textContent = displayString.textContent + pressedString.textContent;
        }
    });
});


// condense this into one function with terms depending on the button pressed
/*

operations.forEach(function(operation) {
    operation.addEventListener(function(ev) {
        
        // this won't work but something similar!
        ev.srcElement.attributes.id
        let operationType = document.querySelector(`.operation[id="${ev.id}"]`)
    })
})

*/
add.addEventListener('click', function(ev) {
    resetFlags();
    isAdding = true;
    savedNumber = currentNumber;
});
subtract.addEventListener('click', function(ev) {
    resetFlags();
    isSubtracting = true;
    savedNumber = currentNumber;
});
multiply.addEventListener('click', function(ev) {
    resetFlags();
    isMultiplying = true;
    savedNumber = currentNumber;
});
divide.addEventListener('click', function(ev) {
    resetFlags();
    isDividing = true;
    savedNumber = currentNumber;
});
equals.addEventListener('click', function(ev) {
    resetFlags();
    isEqualling = true;
});
clear.addEventListener('click', function(ev) {
    resetFlags();
    storedNumber = 0;
    currentNumber = 0;
    displayString.textContent = '0';
});

















function resetFlags() {
    isSubtracting = false;
    isDividing = false;
    isAdding = false;
    isMultiplying = false;
    isEqualling = false;
}

function adding(a, b) {
    return a + b;
}
function subtracting(a, b) {
    return a - b;
}
function multiplying(a, b) {
    return a * b;
}
function dividing(a, b) {
    return a / b;
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