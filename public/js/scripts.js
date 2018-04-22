/*

<strike>TODO: if statement to limit the length of the digits</strike>
TODO: limit the length of digits when a value is operated
TODO: implement plus-minus (+/-)
TODO: implement decimal (.)
TODO: keypress should effect currentNumber and displayScreen
TODO: figure out how to get the plus and multiply keypress to work
            (it doesn't work with the shift + equals and shift + eight)
            
TODO: simplify this shitty code

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
let isOperating = false; // once true, the isOperating string is incomplete until EQUALS or CLEAR is clicked
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
    isOperating = false;
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
    console.log('I am deleting!');
    let displayStringLen = displayString.textContent.length;
    
    if (isOperating || isEqualing) {
        return;
    } else if (displayStringLen === 1) {
        currentNumber = 0;
        displayString.textContent = '0';
    } else {
        displayString.textContent = backspace(displayString.textContent);
        currentNumber = parseInt(displayString.textContent);
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
        isOperating: isOperating,
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
    isOperating = false;
    storedNumber = 0;
    currentNumber = 0;
    displayString.textContent = '0';
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


operations.forEach(function(operation) {
    operation.addEventListener('click', clickOperation, false);
});

function clickOperation(ev) {
    
    // flags are resetting to false at some point
    if (isOperating === false) {
        storedNumber = currentNumber;
        currentNumber = 0;
        isOperating = true;
    } else {
        operate();
    }
    
    resetFlags();
    switch(ev.target.id) {
        case 'add':
            console.log('adding');
            isAdding = true;
            break;
        case 'subtract':
            console.log('subtracting');
            isSubtracting = true;
            break;
        case 'multiply':
            console.log('multiplying');
            isMultiplying = true;
            break;
        case 'divide':
            console.log('dividing');
            isDividing = true;
            break;
    }

    console.log({
        currentNumber: currentNumber,
        storedNumber: storedNumber
    });
    
    console.log({
        isOperating: isOperating,
        isAdding: isAdding,
        isSubtracting: isSubtracting,
        isMultiplying: isMultiplying,
        isDividing: isDividing
    });
}



function operate() {
    if (isDividing) {
        storedNumber = dividing(storedNumber, currentNumber);
    } else if (isSubtracting) {
        storedNumber = subtracting(storedNumber, currentNumber);
    } else if (isAdding) {
        storedNumber = adding(storedNumber, currentNumber);
    } else if (isMultiplying) {
        storedNumber = multiplying(storedNumber, currentNumber);
    }
    displayString.textContent = "" + storedNumber;
    currentNumber = 0;
}