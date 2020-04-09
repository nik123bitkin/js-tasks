const ArrayTool = {
    getMaxSubSumFast: function (array) {
        let ans = 0, sum = 0;

        for (let element of array) {
            sum += element;
            ans = Math.max(ans, sum);
            sum = Math.max(sum, 0);
        }

        return ans;
    },

    getMaxSubSumSlow: function (array) {
        let sum = 0;

        for (let i = 0; i < array.length; i++) {
            let tempSum = 0;
            for (let j = i; j < array.length; j++) {
                tempSum += array[j];
                sum = Math.max(sum, tempSum);
            }
        }

        return sum;
    },

    getMin: function (array) {
        return array.reduce((current, next) => current > next ? next : current);
    },

    getMax: function (array) {
        return array.reduce((current, next) => current < next ? next : current);
    },

    getMedian: function (array) {
        const median = Math.floor(array.length / 2),
            nums = [...array].sort((a, b) => a - b);
        return array.length % 2 !== 0 ? nums[median] : (nums[median - 1] + nums[median]) / 2;
    },

    getIncSequence: function (array) {
        if (array.length === 1) {
            return array;
        }
        let start = 0, startIndex = 0;
        let length = 1, maxLength = 1;
        for (let i = 1; i < array.length; i++) {
            if (array[i] > array[i - 1]) {
                length++;
            } else {
                if (length > maxLength) {
                    maxLength = length;
                    startIndex = start;
                }
                length = 1;
                start = i;
            }
        }
        if (length > maxLength) {
            maxLength = length;
            startIndex = start;
        }
        return array.slice(startIndex, startIndex + maxLength);
    }

};

const ArraySorter = {

    arrayLength: 0,

    swap: function (array, i, j) {
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    },

    heapRoot: function (array, i) {
        let left = 2 * i + 1, right = 2 * i + 2, max = i;

        if (left < this.arrayLength && array[left] > array[max]) {
            max = left;
        }

        if (right < this.arrayLength && array[right] > array[max]) {
            max = right;
        }

        if (max !== i) {
            this.swap(array, i, max);
            this.heapRoot(array, max);
        }
    },

    heapSort: function (array) {

        this.arrayLength = array.length;

        for (let i = Math.floor(this.arrayLength / 2); i >= 0; i--) {
            this.heapRoot(array, i);
        }

        for (let i = array.length - 1; i > 0; i--) {
            this.swap(array, 0, i);
            this.arrayLength--;
            this.heapRoot(array, 0);
        }

        return array;
    },

    quickSort: function (array) {
        if (array.length < 2) {
            return array;
        } else {
            const left = [], right = [], sorted = [];
            const pivot = array.pop();

            for (let item of array) {
                if (item <= pivot) {
                    left.push(item);
                } else {
                    right.push(item);
                }
            }

            return sorted.concat(this.quickSort(left), pivot, this.quickSort(right))
        }
    },

    countingSort: function (array) {
        let z = 0, count = [], min = Math.min(...array), max = Math.max(...array);

        for (let i = min; i <= max; i++) {
            count[i] = 0;
        }

        for (let item of array) {
            count[item]++;
        }

        for (let i = min; i <= max; i++) {
            while (count[i]-- > 0) {
                array[z++] = i;
            }
        }

        return array;
    },

    insertionSort: function (array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[0]) {
                array.unshift(array.splice(i, 1)[0]);
            } else if (!(array[i] > array[i - 1])) {
                for (let j = 1; j < i; j++) {
                    if (array[i] > array[j - 1] && array[i] < array[j]) {
                        array.splice(j, 0, array.splice(i, 1)[0]);
                    }
                }
            }
        }
        return array;
    }
};

const defaultAlphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const Converter = {

    convertToDec: function (vector, base, alphabet) {
        let number = 0;
        for (let i = 0; i < vector.length; i++) {
            number += alphabet.indexOf(vector[i]) * base ** i;
        }

        return number;
    },

    convert: function (vector, base, target, alphabet =
        [defaultAlphabet, defaultAlphabet]) {
        vector.reverse();

        let number = this.convertToDec(vector, base, alphabet[0]);
        let ans = [];

        while (number > 0) {
            const character = alphabet[1][number % target];
            ans.push(character);
            number = number / target >> 0;
        }

        ans.reverse();

        return ans;
    }
};

const FormatType = {
    noWrap: 0,
    wordWrap: 1,
    charWrap: 2,
    sentenceWrap: 3,
};

Object.freeze(FormatType);

const TextFormatter = {

    separateChars: ['.', '!', '!?', '...'],

    format: function (text, maxLength = 0, maxStrings = Number.MAX_SAFE_INTEGER,
                      formatType = FormatType.noWrap) {
        if (maxLength === 0 || maxLength > text.length) {
            return text;
        }
        if (maxLength < text.length && formatType === FormatType.noWrap) {
            throw new Error("Max length of the string is less than text length and no wrap allowed");
        }
        let separators = this.separateChars;
        let newText = [];
        let startIndex = 0;
        switch (formatType) {
            case FormatType.wordWrap:
                separators = [' '];
            case FormatType.sentenceWrap:
                for (let i = 0; i < maxStrings && startIndex < text.length; i++) {
                    let temp = text.slice(startIndex, startIndex + maxLength);
                    let j = temp.length - 1;
                    for (; j > -1; j--) {
                        if (separators.indexOf(temp[j]) !== -1) {
                            break;
                        }
                    }
                    // no separators and not last chunk
                    if (j === -1 && (startIndex + maxLength < text.length)) {
                        throw new Error("Unable to format. Change max length or max number of strings");
                    }
                    //if last chunk of text
                    if (startIndex + maxLength > text.length) {
                        newText.push(temp);
                        startIndex = text.length;
                    } else {
                        newText.push(text.slice(startIndex, startIndex + j + 1));
                        startIndex += j + 1;
                    }
                }
                if (startIndex < text.length) {
                    throw new Error("Unable to format. Change max length or max number of strings");
                } else {
                    newText = newText.join('\n');
                    return newText;
                }
            case FormatType.charWrap:
                for (let i = 0; i < maxStrings && startIndex < text.length; i++) {
                    newText.push(text.slice(startIndex, startIndex + maxLength));
                    startIndex += maxLength;
                }
                if (startIndex < text.length) {
                    throw new Error("Unable to format. Change max length or max number of strings");
                } else {
                    newText = newText.join('\n');
                    return newText;
                }
        }
    },
};

const StringCalculator = {
    delimiter: function (char) {
        return char === ' ';
    },

    isOperator: function (char) {
        return char === '+' || char === '-' || char === '*' || char === '/' || char === '%';
    },

    isUnary: function (char) {
        return char === '+' || char === '-';
    },

    isDigit: function (char) {
        return '0123456789.'.indexOf(char) !== -1;
    },

    priority: function (char) {
        if (char.length === 2)
            return 4;
        return char === '+' || char === '-' ? 1 :
            char === '*' || char === '/' || char === '%' ? 2 : -1;
    },

    processOperation: function (stack, operator) {
        if (operator.length === 2) {
            operator = operator.charAt(1);
            let l = stack.pop();
            switch (operator) {
                case '+':
                    stack.push(l);
                    break;
                case '-':
                    stack.push(-l);
                    break;
            }
        } else {
            let r = stack.pop();
            let l = stack.pop();
            switch (operator) {
                case '+':
                    stack.push(l + r);
                    break;
                case '-':
                    stack.push(l - r);
                    break;
                case '*':
                    stack.push(l * r);
                    break;
                case '/':
                    stack.push(l / r);
                    break;
                case '%':
                    stack.push(l % r);
                    break;
            }
        }
    },

    calculate: function (string) {
        let mayUnary = true;
        let stack = [];
        let operator = [];
        for (let i = 0; i < string.length; ++i)
            if (!this.delimiter(string[i]))
                if (string[i] === '(') {
                    operator.push('(');
                    mayUnary = true;
                } else if (string[i] === ')') {
                    while (operator[operator.length - 1] !== '(')
                        this.processOperation(stack, operator.pop());
                    operator.pop();
                    mayUnary = false;
                } else if (this.isOperator(string[i])) {
                    let current = string[i];
                    if (mayUnary && this.isUnary(current)) {
                        current = '~' + current;
                    }
                    while (operator.length > 0 && (
                        current.length === 1 && this.priority(operator[operator.length - 1]) >= this.priority(current)
                        || current.length === 2 && this.priority(operator[operator.length - 1]) > this.priority(current))
                        )
                        this.processOperation(stack, operator.pop());
                    operator.push(current);
                    mayUnary = true;
                } else {
                    let operand = '';
                    while (i < string.length && this.isDigit(string[i]))
                        operand += string[i++];
                    --i;
                    stack.push(operand.indexOf('.') === -1 ? parseInt(operand) : parseFloat(operand));
                    mayUnary = false;
                }
        while (operator.length > 0)
            this.processOperation(stack, operator.pop());
        return stack[stack.length - 1];
    },
};

const DateUnits = {
    seconds: 1,
    milliseconds: 0.001,
    ticks: 0.0000001,
    minutes: 60,
    hours: 3600,
};

Object.freeze(DateUnits);

const DateConverter = {

    month: new Map([
        ['01', 'January'], ['02', 'February'], ['03', 'March'], ['04', 'April'],
        ['05', 'May'], ['06', 'June'], ['07', 'July'], ['08', 'August'],
        ['09', 'September'], ['10', 'October'], ['11', 'November'], ['12', 'December'],
    ]),

    convertDate: function (source, sourceFormat, targetFormat, isLong = false) {
        sourceFormat = sourceFormat.toUpperCase() || 'DDMMYYYY';
        targetFormat = targetFormat.toUpperCase() || 'DD-MM-YYYY';
        let day = source.substr(sourceFormat.indexOf('DD'), 2);
        let month = source.substr(sourceFormat.indexOf('MM'), 2);
        let year = source.substr(sourceFormat.indexOf('YYYY'), 4);
        let target = '';
        if (isLong) {
            if (this.month.has(month)) {
                target = day + ' ' + this.month.get(month) + ' ' + year;
            } else {
                target = '0-0-0';
            }
        } else {
            target = targetFormat.replace('DD', day)
                .replace('MM', month).replace('YYYY', year);
        }
        return target;
    },

    convertTicks: function (source, targetFormat, dateUnit) {
        targetFormat = targetFormat.toUpperCase() || 'DD-MM-YYYY';
        let seconds = source * dateUnit;
        let date = new Date(seconds);
        let day = date.getDate().toString(10);
        let month = (date.getMonth() + 1).toString(10);
        let year = date.getFullYear().toString(10);
        return targetFormat.replace('DD', day).replace('MM', month).replace('YYYY', year);
    },
};

const CacheCalculator = {
    cache: new Map(),

    calculate: function (equation, cacheOptions) {
        const operators = '+-*/%';
        equation = equation.replace(' ', '');
        let array = equation.split('');
        let index = array.findIndex((el) => operators.includes(el));
        let left = parseFloat(equation.substring(0, index));
        let right = parseFloat(equation.substring(index + 1));
        let result = 0;
        if (this.cache.has(equation)) {
            result = this.cache.get(equation);
            console.log("With cache")
        } else {
            switch (array[index]) {
                case '+':
                    result = left + right;
                    break;
                case '-':
                    result = left - right;
                    break;
                case '*':
                    result = left * right;
                    break;
                case '/':
                    result = left / right;
                    break;
                case '%':
                    result = left % right;
                    break;
            }
            if (cacheOptions.get(array[index])) {
                this.cache.set(equation, result);
                console.log("Cached");
            }
            console.log("Without cache");
        }
        return result;
    }
}

function onBuildClick() {
    const cellsPerRow = 10;
    let table = document.getElementById('array-table');
    table.innerText = '';
    const stringLength = document.getElementById('array-input');
    const length = Number(stringLength.value);
    if (!isNaN(length) || length < 45) {
        const rows = Math.floor(length / cellsPerRow);
        const remainCells = length % cellsPerRow;
        let templateRow = document.getElementById('array-table-row').content.querySelector('tr');
        let templateCell = document.getElementById('array-table-cell').content.querySelector('th');
        for (let i = 0; i < rows; i++) {
            let row = document.importNode(templateRow, true);
            for (let j = 0; j < cellsPerRow; j++) {
                let cell = document.importNode(templateCell, true);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        if (remainCells !== 0) {
            let row = document.importNode(templateRow, true);
            for (let j = 0; j < remainCells; j++) {
                let cell = document.importNode(templateCell, true);
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
    } else {
        stringLength.classList.add('input--error');
    }
}

function getCellValues() {
    let array = [];
    const table = document.getElementById('array-table');
    for (let row = 0; row < table.rows.length; row++) {
        for (let cell = 0; cell < table.rows[row].cells.length; cell++) {
            let cellContent = table.rows[row].cells[cell].children[0];
            let number = Number(cellContent.value);
            if (isNaN(number)) {
                cellContent.classList.add('input--error');
                return [];
            }
            array.push(number);
        }
    }
    return array;
}

function setCellValues(array) {
    const table = document.getElementById('array-table');
    for (let row = 0; row < table.rows.length; row++) {
        for (let cell = 0; cell < table.rows[row].cells.length; cell++) {
            let child = table.rows[row].cells[cell].children[0];
            child.value = array[row * table.rows[0].cells.length + cell];
        }
    }
    return array;
}

function onArrayCommandClick(element) {
    let array = getCellValues();
    if (array.length > 0) {
        let dest = document.getElementById('array-result');
        dest.value = '';
        switch (element.value) {
            case 'Sub Sum':
                dest.value = ArrayTool.getMaxSubSumFast(array);
                break;
            case 'Sub Sum Slow':
                dest.value = ArrayTool.getMaxSubSumSlow(array);
                break;
            case 'Min':
                dest.value = ArrayTool.getMin(array);
                break;
            case 'Max':
                dest.value = ArrayTool.getMax(array);
                break;
            case 'Median':
                dest.value = ArrayTool.getMedian(array);
                break;
            case 'Selection':
                dest.value = ArrayTool.getIncSequence(array);
                break;
            case 'Heap sort':
                setCellValues(ArraySorter.heapSort(array));
                break;
            case 'Quick sort':
                setCellValues(ArraySorter.quickSort(array));
                break;
            case 'Counting sort':
                setCellValues(ArraySorter.countingSort(array));
                break;
            case 'Insertion sort':
                setCellValues(ArraySorter.insertionSort(array));
                break;
        }
    }
}

function onTextFormatClick() {
    let formatValue = document.querySelector('input[name="wrap"]:checked').value;
    let formatType = formatValue === 'noWrap' ? FormatType.noWrap :
        formatValue === 'wordWrap' ? FormatType.wordWrap :
            formatValue === 'sentenceWrap' ? FormatType.sentenceWrap : FormatType.charWrap;
    let source = document.getElementById('formatter-input').value;
    let dest = document.getElementById('formatter-output');
    const maxLength = Number(document.getElementById('formatter-maxlength').value);
    const maxStrings = Number(document.getElementById('formatter-maxstrings').value);
    if (isNaN(maxLength) || isNaN(maxStrings)) {
        if (isNaN(maxLength)) {
            document.getElementById('formatter-maxlength').classList.add('input--error')
        }
        if (isNaN(maxStrings)) {
            document.getElementById('formatter-maxstrings').classList.add('input--error')
        }
    } else {
        try {
            dest.value = TextFormatter.format(source, maxLength, maxStrings, formatType);
        } catch (e) {
            dest.value = e.message;
        }
    }
}

const allowedSymbols = '0123456789.+-*/()';
function onCalculateClick() {
    let cacheChecked = document.getElementById("cache-input").checked;
    let source = document.getElementById("calculator-input").value;
    let dest = document.getElementById("calculator-output");
    dest.value = '';
    let correct = true;
    for (let char of source) {
        if (allowedSymbols.indexOf(char) === -1) {
            correct = false;
        }
    }
    if (correct) {
        let cacheOptions = new Map([
            ['+', document.getElementById('cache-plus').checked],
            ['-', document.getElementById('cache-minus').checked],
            ['*', document.getElementById('cache-mult').checked],
            ['/', document.getElementById('cache-div').checked],
            ['%', document.getElementById('cache-rem').checked],
        ]);
        dest.value = cacheChecked ?
            CacheCalculator.calculate(source, cacheOptions) : StringCalculator.calculate(source);
    } else {
        document.getElementById("calculator-input").classList.add('input--error')
    }
}

function onConvertClick() {
    let source = document.getElementById("converter-input");
    let dest = document.getElementById("converter-output");
    dest.value = '';
    let stringBase = document.getElementById("converter-base");
    let base = Number(stringBase.value);
    let stringTarget = document.getElementById("converter-target");
    let target = Number(stringTarget.value);
    let baseAlphabet = document.getElementById("converter-base-alph");
    let targetAlphabet = document.getElementById("converter-target-alph");
    if (isNaN(base) || base < 2 || base > baseAlphabet.value.length) {
        stringBase.classList.add('input--error');
        if (base > baseAlphabet.value.length) {
            baseAlphabet.classList.add('input--error');
        }
    } else if (isNaN(target) || target < 2 || target > targetAlphabet.value.length) {
        stringTarget.classList.add('input--error');
        if (target > targetAlphabet.value.length) {
            targetAlphabet.classList.add('input--error');
        }
    } else if ([...source.value].findIndex((char) => baseAlphabet.value.indexOf(char) === -1) !== -1) {
        source.classList.add('input--error');
    } else {
        dest.value = Converter.convert(source.value.split(''), base, target,
            [baseAlphabet.value, targetAlphabet.value]).join('');
    }
}

function onDateConvertClick() {
    let source = document.getElementById("date-input").value;
    let dest = document.getElementById("date-output");
    let sourceFormat = document.getElementById("date-source-format").value;
    let targetFormat = document.getElementById("date-target-format").value;
    let isLong = document.getElementById('date-long').checked;
    let unitValue = document.querySelector('input[name="date-format"]:checked').value;
    let unitType;
    switch (unitValue) {
        case 'ticks':
            unitType = DateUnits.ticks;
            break;
        case 'milliseconds':
            unitType = DateUnits.milliseconds;
            break;
        case 'seconds':
            unitType = DateUnits.seconds;
            break;
        case 'minutes':
            unitType = DateUnits.minutes;
            break;
        case 'hours':
            unitType = DateUnits.hours;
            break;
        case 'date':
            unitType = null;
            break;
    }
    if (unitType) {
        dest.value = DateConverter.convertTicks(source, targetFormat, unitType);
    } else {
        dest.value = DateConverter.convertDate(source, sourceFormat, targetFormat, isLong);
    }
}

function onInputChange() {
    let inputs = document.getElementsByClassName('text-input');
    for (let element of inputs) {
        if (element.classList.contains('input--error')) {
            element.classList.remove('input--error');
        }
    }
}