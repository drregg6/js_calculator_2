/*

TODO: limit the length of digits when a value is operated
TODO: implement plus-minus (+/-)
TODO: implement decimal (.)
TODO: keypress should effect currentNumber and displayScreen
TODO: figure out how to get the plus and multiply keypress to work
            (it doesn't work with the shift + equals and shift + eight)

*/


// grabbing buttons
const buttons = document.querySelectorAll('.button');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
// operations
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const divide = document.querySelector('#divide');
const multiply = document.querySelector('#multiply');
const equals = document.querySelector('#equals');
// special keys
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');
const decimal = document.querySelector('#decimal');
const plusMinus = document.querySelector('#plus-minus');

// screen
const screen = document.querySelector('.screen');
let displayString = screen.firstChild.nextSibling;

// operations flags
let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isEqualing = false;

// data storage
let storedNumber = 0;
let currentNumber = 0;


// pressing each button effects the css
buttons.forEach(function(button) {
    button.addEventListener('mousedown', pressingDown, false);
    button.addEventListener('mouseup', pressingUp, false);
});

numbers.forEach(function(number) {
    number.addEventListener('click', updateCurrentNumber, false);
});

operations.forEach(function(operation) {
    operation.addEventListener('click', clickOperation, false);
});

clear.addEventListener('click', resetCalculator);




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
    isEqualing = true;
});

// event listeners for special keys
decimal.addEventListener('click', function(ev) {
    if (displayString.textContent.indexOf(".") !== -1) {
        console.log('ERROR');
        return;
    } else {
        console.log('Hello world!');
    }
});

// event listeners for deleting
del.addEventListener('click', function(ev) {
    let displayStringLen = displayString.textContent.length;
    
    if (displayStringLen === 1) {
        currentNumber = 0;
        displayString.textContent = currentNumber.toString();
    } else {
        currentNumber = backspace(displayString.textContent);
        displayString.textContent = "" + currentNumber;
    }
});

// listening for keypress on the window
window.addEventListener('keydown', function(ev) {
    console.log(ev);
    let keycode = ev.which;
    let buttonPressed = document.querySelector(`.button[data-which="${keycode}"]`);
    
    // if .button exists in the .html, change the css
    if (buttonPressed !== null) {
        console.log(buttonPressed);
        updateCurrentNumber(buttonPressed);
        buttonPressed.classList.add('button-pressed');
    }
});
window.addEventListener('keyup', function(ev) {
    console.log(ev);
    let keycode = ev.which;
    let buttonPressed = document.querySelector(`.button[data-which="${ev.which}"]`);
    
    // if .button exists in the .html, change the css
    if (buttonPressed !== null) {
        buttonPressed.classList.remove('button-pressed');
    }
});


function updateCurrentNumber(buttonPressed) {
    let pressedString = this.firstChild.nextSibling;
    let pressedInt = parseInt(pressedString.textContent);

    if (displayString.textContent.length === 18) {
        return;
    } else if (currentNumber === 0) {
        displayString.textContent = pressedString.textContent;
        currentNumber = pressedInt;
    } else {
        currentNumber = parseInt(displayString.textContent + pressedString.textContent);
        displayString.textContent = displayString.textContent + pressedString.textContent;
    }
    
    console.log({
        storedNumber: storedNumber,
        currentNumber: currentNumber
    });
}

function pressingDown(ev) {
    this.classList.add('button-pressed');
}
function pressingUp(ev) {
    this.classList.remove('button-pressed');
}

function backspace(str) {
    return str.slice(0,str.length-1);
}

function resetCalculator() {
    resetFlags();
    storedNumber = 0;
    currentNumber = 0;
    displayString.textContent = currentNumber.toString();
}

function resetFlags() {
    isSubtracting = false;
    isDividing = false;
    isAdding = false;
    isMultiplying = false;
    isEqualing = false;
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

// operation flags will reset and one will not turn on
function clickOperation(ev) {
    
    if (storedNumber === 0) { // beginning an operation
        storedNumber = currentNumber;
        currentNumber = 0;
    } else { // continuing an operation
        operate();
    }
    
    // wave a flag
    switch(ev.target.id) {
            case 'add':
                isAdding = true;
                break;
            case 'subtract':
                isSubtracting = true;
                break;
            case 'multiply':
                isMultiplying = true;
                break;
            case 'divide':
                isDividing = true;
                break;
    }
}

function operate() {
    if (currentNumber !== 0) {
        if (isDividing) {
            storedNumber = dividing(storedNumber, currentNumber);
        } else if (isSubtracting) {
            storedNumber = subtracting(storedNumber, currentNumber);
        } else if (isAdding) {
            storedNumber = adding(storedNumber, currentNumber);
        } else if (isMultiplying) {
            storedNumber = multiplying(storedNumber, currentNumber);
        }
    }
    resetFlags(); // flags restored as clickevent continues
    displayString.textContent = "" + storedNumber;
    currentNumber = 0;
}