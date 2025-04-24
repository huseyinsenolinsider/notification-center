/**
 Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Example 1:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
 */


const haystack = 'hello';
const needle = 'll';


const strStr = function (haystack, needle) {
    const h = haystack.length;
    const n = needle.length;
    let i = 0;
    let nosub = false;
    for (i; i <= h - n; i++) {
        const substr = haystack.substring(i, (i + n));
        if (substr === needle) {
            nosub = true;
            break;
        }
    }
    if (nosub) {
        return i;
    } else { return -1 }
};

strStr(haystack, needle);