/*

TODO: keypress should effect currentNumber and displayScreen
TODO: figure out how to get the plus and multiply keypress to work
            (it doesn't work with the shift + equals and shift + eight)
TODO: code can be cleaned
TODO: send helpers into a new file
TODO: i should comment this code

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
const empty = document.querySelector('#empty');
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



// event listeners

buttons.forEach(function(button) { // changing the css
    button.addEventListener('mousedown', pressingDown, false);
    button.addEventListener('mouseup', pressingUp, false);
});

numbers.forEach(function(number) { // updating data and display
    number.addEventListener('click', updateCurrentNumber, false);
});

operations.forEach(function(operation) { // performing operations
    operation.addEventListener('click', clickOperation, false);
});

equals.addEventListener('click', equaling);

// event listeners for deleting
del.addEventListener('click', backspace);
clear.addEventListener('click', resetCalculator);

// event listeners for special keys
plusMinus.addEventListener('click', posToNeg);
decimal.addEventListener('click', floatingNumber);

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



// event listener methods

function updateCurrentNumber(buttonPressed) { // this can probably be broken apart somewhere
    let displayStringLen = displayString.textContent.length;
    let pressedString = this.firstChild.nextSibling;
    let pressedInt = parseFloat(pressedString.textContent);

    if (displayString.textContent.length === 18) {
        return;
    } else if (isEqualing) {
        isEqualing = false;
        storedNumber = 0;
        displayString.textContent = pressedString.textContent;
        currentNumber = pressedInt;
    } else if (currentNumber === 0) {
        displayString.textContent = pressedString.textContent;
        currentNumber = pressedInt;
    } else if (displayString.textContent === '0.') {
        console.log(pressedInt);
        currentNumber = parseFloat(displayString.textContent + pressedString.textContent);
        displayString.textContent = "" + currentNumber;
    } else {
        currentNumber = parseFloat(displayString.textContent + pressedString.textContent);
        displayString.textContent = "" + currentNumber;
    }
    
    console.log({
        storedNumber: storedNumber,
        currentNumber: currentNumber
    });
}

function clickOperation(ev) {
    
    if (storedNumber === 0) { // beginning an operation
        storedNumber = currentNumber;
    } else { // continuing an operation
        operate();
    }
    currentNumber = 0;
    
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

function equaling(ev) {
    operate();
    isEqualing = true;
}

function posToNeg() {
    if (storedNumber !== 0 && currentNumber === 0 || isEqualing) {
        return;
    } else if (currentNumber > 0 || currentNumber < 0) {
        currentNumber = currentNumber * -1;
        displayString.textContent = "" + currentNumber;
    }
    
    console.log({
        currentNumber: currentNumber,
        storedNumber: storedNumber
    })
}

function floatingNumber() {
    if (displayString.textContent.indexOf(".") !== -1 && currentNumber !== 0) {
        return;
    } else if (currentNumber === 0) {
        displayString.textContent = '0.';
        currentNumber = NaN;
    } else {
        displayString.textContent = displayString.textContent + '.';
    }
    
    console.log({
        currentNumber: currentNumber,
        storedNumber: storedNumber
    })
}

function pressingDown(ev) {
    this.classList.add('button-pressed');
}
function pressingUp(ev) {
    this.classList.remove('button-pressed');
}

function backspace() {
    let displayStringLen = displayString.textContent.length;
    
    if (displayStringLen === 1) {
        currentNumber = 0;
        displayString.textContent = currentNumber.toString();
    } else {
        currentNumber = backspace(displayString.textContent);
        displayString.textContent = "" + currentNumber;
    }
}

function resetCalculator() {
    resetFlags();
    storedNumber = 0;
    currentNumber = 0;
    displayString.textContent = currentNumber.toString();
}



// helper methods

function backspace(str) {
    return str.slice(0,str.length-1);
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

function resetFlags() {
    isSubtracting = false;
    isDividing = false;
    isAdding = false;
    isMultiplying = false;
    isEqualing = false;
}


// little side game

let count = 0;
empty.addEventListener('click', function(){
    count++;
    
    switch(count) {
        case 5:
            alert(':)');
            break;
        case 10:
            alert(':S');
            break;
        case 15:
            alert('wat?');
            break;
        case 25:
            alert('stop...');
            break;
        case 50:
            alert('these are all the hidden messages');
            break;
        case 51:
            count = 0;
    }
    
    console.log(count);
});