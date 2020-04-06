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
        return Math.min(...array);
    },

    getMax: function (array) {
        return Math.max(...array);
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

const Converter = {

    convertToDec: function (vector, base, alphabet) {
        let number = 0;
        for (let i = 0; i < vector.length; i++) {
            number += alphabet.indexOf(vector[i]) * base ** i;
        }

        return number;
    },

    convert: function (vector, base, target, alphabet =
        ['0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ']) {
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
        try {
            // Max length is above text length
            if (maxLength === 0 || maxLength > text.length) {
                return text;
            }
            // length of string is less than text and no wrap allowed
            if (maxLength < text.length && formatType === FormatType.noWrap) {
                throw new Error("Max length of the string is less than text length and no wrap allowed");
            }
            //here maxlength 100% < text.length and FormatType !== nowrap

            let separators = this.separateChars;
            let newText = [];
            let startIndex = 0;
            switch (formatType) {
                case FormatType.wordWrap:
                    separators = [' '];
                case FormatType.sentenceWrap:
                    for(let i = 0; i < maxStrings && startIndex < text.length; i++) {
                        let temp = text.slice(startIndex, startIndex + maxLength);
                        let j = temp.length - 1;
                        for(; j > -1; j--) {
                            if(separators.indexOf(temp[j]) !== -1) {
                                break;
                            }
                        }
                        // no separators and not last chunk
                        if(j === -1 && (startIndex + maxLength < text.length)) {
                            throw new Error("Unable to format");
                        }
                        //if last chunk of text
                        if(startIndex + maxLength > text.length) {
                            newText.push(temp);
                            startIndex = text.length;
                        }else {
                            newText.push(text.slice(startIndex, startIndex + j + 1));
                            startIndex += j + 1;
                        }
                    }
                    if (startIndex < text.length) {
                        throw new Error("Unable to format");
                    } else {
                        newText = newText.join('\n');
                        return newText;
                    }
                    break;
                case FormatType.charWrap:
                    for (let i = 0; i < maxStrings && startIndex < text.length; i++) {
                        newText.push(text.slice(startIndex, startIndex + maxLength));
                        startIndex += maxLength;
                    }
                    if (startIndex < text.length) {
                        throw new Error("Unable to format");
                    } else {
                        newText = newText.join('\n');
                        return newText;
                    }
                    break;
                default:
                    throw new Error("Smth went wrong with nowrap");
            }
        } catch (e) {
            console.log(e);
            return text;
        }
    },
};

console.log(TextFormatter.format('abcd xy z cabcdbd', 8, 10, FormatType.wordWrap));

const StringCalculator = {
    calculate: function (string) {

    },
};

const DateConverter = {
    convertDate: function (source, sourceFormat, targetFormat) {

    },

    convertTicks: function (source, targetFormat) {

    },
};

function onShowHideClick() {
    const x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}