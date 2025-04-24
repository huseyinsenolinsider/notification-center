/*
Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

 

Example 1:

Input: nums = [1,3,5,6], target = 5
Output: 2
Example 2:

Input: nums = [1,3,5,6], target = 2
Output: 1
*/

const nums = [1, 3, 5, 6];
const target = 5;

const searchInsert = function (nums, target) {
    let found = false;
    let i = 0;
    let index = 0;
    for (i; i < nums.length; i++) {
        if (nums[i] === target) {
            found = true;
            break;
        } else {
            if (nums[i] < target) {
                index = i + 1;
            }
        }
    }
    const result = found ? i : index;
    return result;
};

searchInsert(nums, target);