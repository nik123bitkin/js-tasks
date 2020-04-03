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

// ArrayTool

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

console.log(ArraySorter.insertionSort([1, 4, 6, 3, 2, 5, 8]));

function onShowHideClick() {
    const x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}