/*
You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.


Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1. 
 */




const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;


const merge = function (nums1, m, nums2, n) {
    let nums1CurrentIndex = m - 1;
    let nums2CurrentIndex = n - 1;
    let nums1LastIndex = m + n - 1;

    while (nums1CurrentIndex >= 0 && nums2CurrentIndex >= 0) {
        if (nums1[nums1CurrentIndex] > nums2[nums2CurrentIndex]) {
            nums1[nums1LastIndex] = nums1[nums1CurrentIndex];
            nums1CurrentIndex--;
        } else {
            nums1[nums1LastIndex] = nums2[nums2CurrentIndex];
            nums2CurrentIndex--;
        }
        nums1LastIndex--;
    }
    while (nums2CurrentIndex >= 0) {
        nums1[nums1LastIndex] = nums2[nums2CurrentIndex];
        nums2CurrentIndex--;
        nums1LastIndex--;
    }
};

merge(nums1, m, nums2, n);
