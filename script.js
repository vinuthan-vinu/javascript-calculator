const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let firstValue = null;
let operator = null;
let awaitingNext = false;

function inputDigit(digit) {
    if (awaitingNext) {
        display.value = digit;
        awaitingNext = false;
    } else {
        display.value = display.value === '0' ? digit : display.value + digit;
    }
}

function inputDecimal() {
    if (awaitingNext) {
        display.value = '0.';
        awaitingNext = false;
        return;
    }
    if (!display.value.includes('.')) {
        display.value += '.';
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && awaitingNext) {
        operator = nextOperator;
        return;
    }

    if (firstValue == null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = performCalculation(operator, firstValue, inputValue);
        display.value = String(result);
        firstValue = result;
    }

    operator = nextOperator;
    awaitingNext = true;
}

function performCalculation(op, a, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? 'Error' : a / b;
        default: return b;
    }
}

keys.addEventListener('click', (e) => {
    const button = e.target;
    const action = button.dataset.action;
    const value = button.dataset.value;

    if (!action) return;

    if (action === 'digit') {
        inputDigit(value);
        return;
    }

    if (action === 'decimal') {
        inputDecimal();
        return;
    }

    if (action === 'operator') {
        handleOperator(value);
        return;
    }

    if (action === 'clear') {
        display.value = '';
        firstValue = null;
        operator = null;
        awaitingNext = false;
        return;
    }

    if (action === 'back') {
        display.value = display.value.slice(0, -1);
        return;
    }

    if (action === 'percent') {
        const val = parseFloat(display.value) || 0;
        display.value = String(val / 100);
        return;
    }

    if (action === 'calculate') {
        if (operator == null || awaitingNext) return;
        const inputValue = parseFloat(display.value);
        const result = performCalculation(operator, firstValue, inputValue);
        display.value = String(result);
        firstValue = null;
        operator = null;
        awaitingNext = false;
        return;
    }
});

// initialize display
if (display) display.value = '';
