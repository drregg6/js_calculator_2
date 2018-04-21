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
let isOperating = false;
let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isEqualling = false;

// data storage
let storedNumber = 0;
let currentNumber = 0;



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


// pressing each button effects the css
buttons.forEach(function(button) {
    button.addEventListener('mousedown', pressingDown, false);
    button.addEventListener('mouseup', pressingUp, false);
});

numbers.forEach(function(number) {
    number.addEventListener('click', updateCurrentNumber, false);
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
// a switch statement might be possible for each eventlistener
add.addEventListener('click', function(ev) {
    if (isAdding && !isOperating) {
        resetFlags();
        storedNumber = adding(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isSubtracting && !isOperating) {
        resetFlags();
        storedNumber = subtracting(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isDividing && !isOperating) {
        resetFlags();
        storedNumber = dividing(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isMultiplying && !isOperating) {
        resetFlags();
        storedNumber = multiplying(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    }
    isOperating = true;
    isAdding = true;
});
subtract.addEventListener('click', function(ev) {
    if (isOperating) {
        return;
    } else if (isSubtracting) {
        resetFlags();
        storedNumber = subtracting(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isAdding) {
        resetFlags();
        storedNumber = adding(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isDividing) {
        resetFlags();
        storedNumber = dividing(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isMultiplying) {
        resetFlags();
        storedNumber = multiplying(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    }
    resetFlags();
    isOperating = true;
    isSubtracting = true;
});
multiply.addEventListener('click', function(ev) {
    if (isMultiplying && !isOperating) {
        resetFlags();
        storedNumber = multiplying(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isSubtracting && !isOperating) {
        resetFlags();
        storedNumber = subtracting(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isDividing && !isOperating) {
        resetFlags();
        storedNumber = dividing(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isAdding && !isOperating) {
        resetFlags();
        storedNumber = adding(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    }
    resetFlags();
    isOperating = true;
    isMultiplying = true;
});
divide.addEventListener('click', function(ev) {
    if (ev.target.id === 'divide') {
        console.log('hello world!');
    }
    if (isOperating) {
        resetFlags();
        return;
    } else if (isDividing) {
        resetFlags();
        storedNumber = dividing(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isSubtracting) {
        resetFlags();
        storedNumber = subtracting(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isAdding) {
        resetFlags();
        storedNumber = adding(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    } else if (isMultiplying) {
        resetFlags();
        storedNumber = multiplying(storedNumber, currentNumber);
        displayString.textContent = "" + storedNumber;
        currentNumber = 0;
    }
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
    
    if (isOperating || isEqualling) {
        return;
    } else if (displayStringLen === 1) {
        currentNumber = 0;
        displayString.textContent = '0';
    } else {
        displayString.textContent = backspace(displayString.textContent);
        currentNumber = parseInt(displayString.textContent);
    }
});
clear.addEventListener('click', function(ev) {
    resetFlags();
    isOperating = false;
    storedNumber = 0;
    currentNumber = 0;
    displayString.textContent = '0';
});


function updateCurrentNumber(buttonPressed) {
    let pressedString = this.firstChild.nextSibling;
    let pressedInt = parseInt(pressedString.textContent);

    if (displayString.textContent.length === 18) {
        return;
    } else if (displayString.textContent === '0') {
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

function resetFlags() {
    isSubtracting = false;
    isDividing = false;
    isAdding = false;
    isMultiplying = false;
    isEqualling = false;
}

function adding(a, b) {
//    let answer = a + b;
//    if (answer.toString().length > 18) {
//        return;
//    } else {
//        return answer;
//    }
    return a + b;
}
function subtracting(a, b) {
    return a - b;
}
function multiplying(a, b) {
//    let answer = a * b;
//    if (answer.toString().length > 18) {
//        return;
//    } else {
//        return answer;
//    }
    return a * b;
}
function dividing(a, b) {
    return a / b;
}


operations.forEach(function(operation) {
    operation.addEventListener('click', function(event) {
        console.log({
            isOperating: isOperating,
            isAdding: isAdding,
            isSubtracting: isSubtracting,
            isMultiplying: isMultiplying,
            isDividing: isDividing
        })
    });
});