// grabbing buttons
const buttons = document.querySelectorAll('.button');
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

window.addEventListener('keydown', function(ev) {
    console.log(ev);
    let keycode = ev.which;
    let buttonPressed = document.querySelector(`.button[data-which="${keycode}"]`);
    
    if (buttonPressed !== null) {
        console.log(buttonPressed);
        buttonPressed.classList.add('button-pressed');
    }
});
window.addEventListener('keyup', function(ev) {
    console.log(ev);
    let keycode = ev.which;
    let buttonPressed = document.querySelector(`.button[data-which="${ev.which}"]`);
    
    if (buttonPressed !== null) {
        buttonPressed.classList.remove('button-pressed');
    }
});

buttons.forEach(function(button) {
    button.addEventListener('mousedown', function(ev) {
        this.classList.add('button-pressed');
    });
    button.addEventListener('mouseup', function(ev) {
        this.classList.remove('button-pressed');
    });
});


numbers.forEach(function(number) {
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