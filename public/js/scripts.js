/*

TODO: keypress should effect currentNum and displayScreen
TODO: figure out how to get the plus and multiply keypress to work
            (it doesn't work with the shift + equals and shift + eight)
TODO: code can be cleaned
TODO: send helpers into a new file

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
let storedNum = 0;
let currentNum = 0;



// event listeners

buttons.forEach(function(button) { // changing the css
    button.addEventListener('mousedown', pressDown, false);
    button.addEventListener('mouseup', pressUp, false);
});

numbers.forEach(function(number) { // updating data and display
    number.addEventListener('click', updatecurrentNum, false);
});

operations.forEach(function(operation) { // performing operations
    operation.addEventListener('click', clickOperation, false);
});

equals.addEventListener('click', equaling); // completing operations

// event listeners for deleting
del.addEventListener('click', deleting); // go back one digit
clear.addEventListener('click', resetCalculator); // start anew

// event listeners for special keys
plusMinus.addEventListener('click', posToNeg); // swap between positive and negative
decimal.addEventListener('click', floatingNumber); // use decimals

// listening for keypress on the window
/*

broken


window.addEventListener('keydown', function(ev) {
    console.log(ev);
    let keycode = ev.which;
    let buttonPressed = document.querySelector(`.button[data-which="${keycode}"]`);
    
    // if .button exists in the .html, change the css
    if (buttonPressed !== null) {
        console.log(buttonPressed);
        updatecurrentNum(buttonPressed);
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
*/


// event listener methods

function updatecurrentNum(buttonPressed) { // this can probably be broken apart somewhere
    let displayStringLen = displayString.textContent.length;
    let pressedString = this.firstChild.nextSibling;
    let pressedNum = parseFloat(pressedString.textContent);

    if (displayString.textContent.length === 18) {
        return;
    } else if (isEqualing) {
        isEqualing = false;
        storedNum = 0;
        displayString.textContent = pressedString.textContent;
        currentNum = pressedNum;
    } else if (currentNum === 0) {
        displayString.textContent = pressedString.textContent;
        currentNum = pressedNum;
    } else if (displayString.textContent === '0.') {
        console.log(pressedNum);
        currentNum = parseFloat(displayString.textContent + pressedString.textContent);
        displayString.textContent = "" + currentNum;
    } else {
        currentNum = parseFloat(displayString.textContent + pressedString.textContent);
        displayString.textContent = "" + currentNum;
    }
    
    console.log({
        storedNum: storedNum,
        currentNum: currentNum
    });
}

function clickOperation(ev) {
    
    if (storedNum === 0) { // beginning an operation
        storedNum = currentNum;
    } else { // continuing an operation
        operate();
    }
    currentNum = 0;
    
    // wave a flag to detect what kind of operation to perform
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
    // the same as operating, but has a different effect on operation and number clicks
    // so I need a flag to keep track of equaling
    if (storedNum === 0) {
        return;
    }
    operate();
    isEqualing = true;
}

function posToNeg() {
    if (storedNum !== 0 && currentNum === 0 || isEqualing) {
        // cannot change positive/negative of the solution in the middle of an operation
        return;
    } else if (currentNum > 0 || currentNum < 0) {
        currentNum = currentNum * -1;
        displayString.textContent = "" + currentNum;
    }
    
    console.log({
        currentNum: currentNum,
        storedNum: storedNum
    });
}

function floatingNumber() {
    // cannot add a decimal if a decimal already exists
    // and if user is not in the middle of an operation that already has a decimal
    // ie- displayString.textContent = "2.4"
    //      user clicks #decimal to create "0.4"
    //      but since displayString.textContent.indexOf(".") !== -1
    //      #decimal cannot be used
    if (displayString.textContent.indexOf(".") !== -1 && currentNum !== 0) {
        return;
    } else if (currentNum === 0) {
        displayString.textContent = '0.';
        currentNum = NaN; // temporarily changes to NaN so it doesn't interfere with .operations
    } else {
        displayString.textContent = displayString.textContent + '.';
    }
    
    console.log({
        currentNum: currentNum,
        storedNum: storedNum
    });
}

function pressDown(ev) {
    this.classList.add('button-pressed');
}
function pressUp(ev) {
    this.classList.remove('button-pressed');
}

function deleting() {
    let displayStringLen = displayString.textContent.length;
    
    if (displayStringLen === 1) {
        currentNum = 0;
        displayString.textContent = currentNum.toString();
    } else {
        currentNum = backspace(displayString.textContent);
        displayString.textContent = "" + currentNum;
    }
}

function resetCalculator() {
    resetFlags();
    storedNum = 0;
    currentNum = 0;
    displayString.textContent = currentNum.toString();
}



// helper methods

function backspace(str) {
    return str.slice(0,str.length-1);
}

function operate() {
    if (currentNum !== 0) {
        if (isDividing) {
            storedNum = dividing(storedNum, currentNum);
        } else if (isSubtracting) {
            storedNum = subtracting(storedNum, currentNum);
        } else if (isAdding) {
            storedNum = adding(storedNum, currentNum);
        } else if (isMultiplying) {
            storedNum = multiplying(storedNum, currentNum);
        }
    }
    resetFlags(); // flags restored as clickevent continues
    displayString.textContent = "" + storedNum;
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