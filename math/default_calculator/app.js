const operator = {
    division: '/',
    multiplication: '*',
    subtraction: '-',
    addition: '+',
    comma: '.'
};

const itemType = {
    number: 'number',
    operator: 'operator'
};

const items = [];
const LAST_ITEM_INDEX = -1;

initializeNumbers();
initializeOperators();
initializeControls();

function initializeNumbers() {
    const buttons = document.querySelectorAll('.numbers > button[role=number]');
    const signChanger = document.getElementById('signChanger');
    const comma = document.getElementById('comma');

    for (const button of buttons) {
        const number = button.textContent;

        button.addEventListener('click', () => addNumber(number));
    };

    signChanger.addEventListener('click', changeSign);
    comma.addEventListener('click', addComma);
};

function initializeOperators() {
    const division = document.getElementById('division');
    const multiplication = document.getElementById('multiplication');
    const subtraction = document.getElementById('subtraction');
    const addition = document.getElementById('addition');

    division.addEventListener('click', () => addOperator(operator.division));
    multiplication.addEventListener('click', () => addOperator(operator.multiplication));
    subtraction.addEventListener('click', () => addOperator(operator.subtraction));
    addition.addEventListener('click', () => addOperator(operator.addition));
};

function initializeControls() {
    const clearAll = document.getElementById('clearAll');
    const deleteLast = document.getElementById('deleteLast');
    const calculateButton = document.getElementById('calculate');

    clearAll.addEventListener('click', clearItems);
    deleteLast.addEventListener('click', deleteLastItem);
    calculateButton.addEventListener('click', calculate);
};

function calculate() {
    if (items.length === 0) {
        return;
    };

    const expression = getValues().join(' ');
    const result = parseFloat(eval(expression));

    if (isNaN(result)) {
        return;
    };

    clearItems();
    addItem(itemType.number, result);
};

function addNumber(number) {
    isNotNullOrUndefined(number);

    if (!isNumberExpected()) {
        return;
    }

    if (isNaN(Number(number))) {
        throw new TypeError(`'${number}' не является числом.`);
    }

    const lastItem = items.at(LAST_ITEM_INDEX);
    const endIsComma = lastItem?.value.endsWith(operator.comma);

    if (endIsComma || lastIsNumber()) {
        lastItem.value += number;
        updateDisplay();
        return;
    }

    addItem(itemType.number, number);
};

function addOperator(operator) {
    isNotNullOrUndefined(operator);

    if (isOperatorExpected()) {
        addItem(itemType.operator, operator);
    };
};

function addComma() {
    const lastItem = items.at(LAST_ITEM_INDEX);
    const hasComma = lastItem.value.includes(operator.comma);

    if (hasComma || !lastIsNumber()) {
        return;
    };

    lastItem.value += operator.comma;
    updateDisplay();
};

function changeSign() {
    const lastItem = items.at(LAST_ITEM_INDEX);

    if (!lastIsNumber()) {
        return;
    };

    lastItem.value = lastItem.value.startsWith(operator.subtraction)
        ? lastItem.value.slice(1)
        : operator.subtraction + lastItem.value;

    updateDisplay();
};

function updateDisplay() {
    const display = document.getElementById('display');

    display.textContent = items.length === 0
        ? ''
        : getValues().join(' ');
};

function isNumberExpected() {
    return (
        !isOperatorExpected()
        || items.at(LAST_ITEM_INDEX)?.value !== '0'
    );
};

function isOperatorExpected() {
    const lastItem = items.at(LAST_ITEM_INDEX);

    if (!lastIsNumber()) {
        return false;
    };

    return !lastItem.value.endsWith(operator.comma);
};

function lastIsNumber() {
    return items.at(LAST_ITEM_INDEX)?.type === itemType.number;
};

function addItem(type, value) {
    isNotNullOrUndefined(type, value);

    items.push({ type, value: String(value) });
    updateDisplay();
};

function clearItems() {
    items.length = 0;
    updateDisplay();
};

function deleteLastItem() {
    const lastItem = items.at(LAST_ITEM_INDEX);

    if (!lastItem) {
        return;
    }

    if (lastItem.type === itemType.number) {
        if (lastItem.value.length > 1) {
            lastItem.value = lastItem.value.slice(0, -1);
        }
        else {
            items.pop();
        }
    }
    else {
        items.pop();
    }

    updateDisplay();
};

function getValues() {
    return items.map(item => item.value);
};

function isNotNullOrUndefined(...values) {
    if (values.includes(null) || values.includes(undefined)) {
        throw new TypeError('Недопустимое значение.');
    };
};