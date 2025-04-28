/**
 Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

 Input: head = [1,1,2,3,3]
Output: [1,2,3]
 */



const head = [1, 1, 2, 3, 3];

//Array için çözüm 
const deleteDuplicates = function (head) {
    let currentElement = head[0];
    let len = head.length;
    for (let i = 1; i < len; i++) {
        if (currentElement === head[i]) {
            head.splice(i, 1);
            i--;
            len--;
        } else {
            currentElement = head[i];
        }
    }
    return head;
};

deleteDuplicates(head);


// Linked list içim çözüm
// const deleteDuplicates = function(head) {
//     let currentNode = head;
//     while (currentNode && currentNode.next) {
//         if (currentNode.val === currentNode.next.val) {
//             currentNode.next = currentNode.next.next;
//         } else {
//             currentNode = currentNode.next;
//         }
//     }
//     return head;
// };