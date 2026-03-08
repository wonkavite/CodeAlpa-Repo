const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-operand');

let currentInput = '';

// Append Numbers
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') currentInput = '';
    currentInput += number;
    updateDisplay();
}

// Append Operators
function appendOperator(op) {
    if (currentInput === '') return;
    currentInput += ` ${op} `;
    updateDisplay();
}

function clearScreen() {
    currentInput = '';
    previousDisplay.innerText = '';
    updateDisplay();
}

function deleteNumber() {
    currentInput = currentInput.toString().slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.innerText = currentInput || '0';
    // Real-time result preview (Optional logic)
    if (currentInput.split(' ').length >= 3) {
        try {
            const preview = eval(currentInput.replace('^', '**'));
            previousDisplay.innerText = preview;
        } catch { }
    }
}

function calculate() {
    try {
        // We replace ^ with ** for JS math, and evaluate
        const result = eval(currentInput.replace('^', '**'));
        previousDisplay.innerText = currentInput + ' =';
        currentInput = result.toString();
        updateDisplay();
    } catch (e) {
        currentDisplay.innerText = 'Error';
        currentInput = '';
    }
}

// Keyboard Support
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearScreen();
    if (['+', '-', '*', '/', '^'].includes(e.key)) appendOperator(e.key);
});