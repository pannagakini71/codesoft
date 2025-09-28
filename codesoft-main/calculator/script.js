const display = document.getElementById('result');
const buttons = document.querySelectorAll('button');

let currentNumber = '';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number')) {
            if (waitingForSecondOperand) {
                display.value = value;
                waitingForSecondOperand = false;
            } else {
                display.value = display.value === '0' ? value : display.value + value;
            }
            currentNumber = display.value;
        }

        if (button.classList.contains('operator')) {
            if (value === '←') {
                display.value = display.value.slice(0, -1);
                if (display.value === '') {
                    display.value = '0';
                }
                currentNumber = display.value;
                return;
            }

            const inputValue = parseFloat(display.value);

            if (firstOperand === null) {
                firstOperand = inputValue;
            } else if (operator) {
                const result = calculate(firstOperand, inputValue, operator);
                display.value = result;
                firstOperand = result;
            }

            waitingForSecondOperand = true;
            operator = value;
        }

        if (button.classList.contains('equal')) {
            const inputValue = parseFloat(display.value);
            if (operator && firstOperand !== null) {
                display.value = calculate(firstOperand, inputValue, operator);
                firstOperand = null;
                operator = null;
                waitingForSecondOperand = false;
            }
        }

        if (button.classList.contains('clear')) {
            display.value = '0';
            currentNumber = '';
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
        }
    });
});

function calculate(first, second, op) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Error';
        case '%':
            return (first * second) / 100;
        default:
            return second;
    }
}