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
// special keys
const ce = document.querySelector('#clear_entry');
const clear = document.querySelector('#clear');
const del = document.querySelector('#delete');
const decimal = document.querySelector('#decimal');
const plusMinus = document.querySelector('#plus-minus');

// screen
let operationString = document.querySelector('#currentOperation');
let displayString = document.querySelector('#display').firstChild.nextSibling;

// operations flags
let isAdding = false;
let isSubtracting = false;
let isMultiplying = false;
let isDividing = false;
let isEqualing = false;
let isFloating = false;

// data storage
let storedNum = 0;
let currentNum = 0;
let floatString;



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
del.addEventListener('click', erase); // go back one digit
clear.addEventListener('click', clearCalc); // start anew
ce.addEventListener('click', clearEntry); // delete current input but continue operation in progress

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
    let pressedString = this.firstChild.nextSibling.textContent;
    let pressedNum = parseFloat(pressedString);

    if (displayString.textContent.length === 18) {
        return;
    } else if (isEqualing) {
        isEqualing = false;
        storedNum = 0;
        displayString.textContent = pressedString;
        currentNum = pressedNum;
    } else if (isFloating) {
	floatString += pressedString;
	displayString.textContent = floatString;
	currentNum = parseFloat(floatString);
    } else if (currentNum === 0) {
        displayString.textContent = pressedString;
        currentNum = pressedNum;
    } else {
        currentNum = parseFloat(displayString.textContent + pressedString);
        displayString.textContent = "" + currentNum;
    }
    
    console.log({
        storedNum: storedNum,
        currentNum: currentNum
    });
}

function clickOperation(ev) {

    let operationNum;
    
    if (storedNum === 0) { // beginning an operation
        storedNum = currentNum;
        operationNum = storedNum;
    } else { // continuing an operation
    	if (isEqualing) {
    		operationNum = storedNum;
    	} else {
    		operationNum = currentNum;
    	}
        operate();
    }
    currentNum = 0;
    isFloating = false;
    
    // wave a flag to detect what kind of operation to perform
    switch(ev.target.id) {
            case 'add':
                isAdding = true;
                operationString.textContent += operationNum + " + ";
                break;
            case 'subtract':
                isSubtracting = true;
                operationString.textContent += operationNum + " - ";
                break;
            case 'multiply':
                isMultiplying = true;
                operationString.textContent += operationNum + " x ";
                break;
            case 'divide':
                isDividing = true;
                operationString.textContent += operationNum + " \xF7 "; // xF7 is division sign
                break;
    }
}

function equaling(ev) {
    // the same as operating, but has a different effect on operation and number clicks
    // so I need a flag to keep track of equaling
    operate();
    isEqualing = true;
    operationString.textContent = "";
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
    /*
    broken
    if (displayString.textContent.indexOf(".") !== -1 && currentNum !== 0) {
        return;
    } else if (currentNum === 0) {
        displayString.textContent = '0.';
        currentNum = NaN; // temporarily changes to NaN so it doesn't interfere with .operations
    } else {
        displayString.textContent = displayString.textContent + '.';
    }
    */
    if (isFloating) {
        return;
    }
    isFloating = true;
    floatString = currentNum + ".";
    displayString.textContent = floatString;
    
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

function erase() {
	if (isEqualing === false) {
    	let displayStringLen = displayString.textContent.length;

	    if (displayStringLen === 1) {
	        currentNum = 0;
	        displayString.textContent = currentNum.toString();
	    } else {
	        currentNum = parseInt(backspace(displayString.textContent));
	        displayString.textContent = "" + currentNum;
	    }
	}
}

function clearCalc() {
    resetFlags();
    storedNum = 0;
    currentNum = 0;
    displayString.textContent = currentNum.toString();
    operationString.textContent = "";
}

function clearEntry() {
	currentNum = 0;
	isFloating = false;
	displayString.textContent = currentNum.toString();
}



// helper methods

function backspace(str) {
    console.log(str);
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
        } else if (storedNum === 0 && currentNum !== 0) {
        	storedNum = currentNum;
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
    isFloating = false;
}
