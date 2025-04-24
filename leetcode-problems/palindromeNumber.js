/*
Given an integer x, return true if x is a palindrome, and false otherwise.

 

Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
 */

const x = 33433;

const isPalindrome = function (x) {
    if (x < 0) {
        return false
    } else {
        const y = x.toString();
        const z = Math.floor((y.length) / 2);
        let result = true;
        for (let i = 0; i < z; i++) {
            if (y[i] === y[(y.length) - i - 1]) {
            } else {
                result = false;
                break;
            }
        }
        return result;
    }
};

isPalindrome(x);
