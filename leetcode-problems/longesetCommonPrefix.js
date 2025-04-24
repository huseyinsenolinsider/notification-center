/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

 

Example 1:

Input: strs = ["flower","flow","flight"]
Output: "fl"
 */

const strs = ["flower", "flow", "flight"];

const longestCommonPrefix = function (strs) {
    const x = strs[0];
    let result = '';
    for (let i = 0; i < (strs[0].length); i++) {
        let loop = true;
        let add = true;
        strs.forEach((element) => {
            if (element[i] != '' && x[i] === element[i]) {
            } else {
                loop = false;
                add = false;
            }
        })
        if (add) {
            result = result + x[i];
        }
        if (!loop) {
            break;
        }
    }
    return result;
};

longestCommonPrefix(strs);
