
/**
Given an integer rowIndex, return the rowIndexth (0-indexed) row of the Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:

Example 1:

Input: rowIndex = 3
Output: [1,3,3,1]
*/

const rowIndex = 3;

const getRow = function (rowIndex) {
    if (rowIndex === 0) {
        return [1]
    } else if (rowIndex === 1) {
        return [1, 1]
    } else {
        const result = [[1], [1, 1]];
        for (let i = 2; i <= rowIndex; i++) {
            const arr = [1];
            for (let j = 0; j < i - 1; j++) {
                arr.push(result[i - 1][j] + result[i - 1][j + 1]);
            }
            arr.push(1);
            result.push(arr);
        }
        return result[rowIndex];
    }
};

getRow(rowIndex);