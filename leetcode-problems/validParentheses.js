/**
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.
 

Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true
 */


const s = "()[]{}"

const isValid = function (s) {
    let result = true;
    const opens = [];
    if (s.length % 2 != 0) {
        return false;
    } else {
        for (let i = 0; i < s.length; i++) {
            const parenthese = s[i];
            switch (parenthese) {
                case '(':
                    opens.unshift(')');
                    break;
                case '{':
                    opens.unshift('}');
                    break;
                case '[':
                    opens.unshift(']');
                    break;
                default:
                    if (opens[0] === parenthese) {
                        opens.shift();
                    } else {
                        result = false;
                        break;
                    }

            };

        };
    };
    if (opens.length != 0) {
        result = false;
    }
    return result;
};

isValid(s);
