// grabbing buttons
const numbers = document.querySelectorAll('.number');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');

const screen = document.querySelector('.screen');
let displayString = screen.firstChild.nextSibling;

// operations flags
let isOperating = false;
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
        } else if (isOperating) {
            isOperating = false;
            storedNumber = parseInt(displayString.textContent);
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
    isOperating = true;
    isAdding = true;
});
subtract.addEventListener('click', function(ev) {
    resetFlags();
    isOperating = true;
    isSubtracting = true;
});
multiply.addEventListener('click', function(ev) {
    resetFlags();
    isOperating = true;
    isMultiplying = true;
});
divide.addEventListener('click', function(ev) {
    resetFlags();
    isOperating = true;
    isDividing = true;
});
equals.addEventListener('click', function(ev) {
    if (isAdding) {
        storedNumber = adding(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
    } else if (isSubtracting) {
        storedNumber = subtracting(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
    } else if (isMultiplying) {
        storedNumber = multiplying(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
    } else if (isDividing) {
        storedNumber = dividing(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
    }
    resetFlags();
    isEqualling = true;
});
clear.addEventListener('click', function(ev) {
    resetFlags();
    isOperating = false;
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