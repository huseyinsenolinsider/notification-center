/*
 Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:
 
ample 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
*/


const numRows = 5;

const generate = function (numRows) {
    if (numRows === 0) {
        return []
    } else if (numRows === 1) {
        return [[1]]
    } else if (numRows === 2) {
        return [[1], [1, 1]]
    } else {
        const result = [[1], [1, 1]];
        for (let i = 2; i < numRows; i++) {
            const arr = [1];
            for (let j = 0; j < i - 1; j++) {
                arr.push(result[i - 1][j] + result[i - 1][j + 1]);
            }
            arr.push(1);
            result.push(arr);
        }
        return result;
    }
};

generate(numRows);
