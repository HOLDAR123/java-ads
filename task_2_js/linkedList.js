class Node {
     constructor(data) {
         this.data = data
         this.next = null
     }
}

// TASK 4 - вывести весь связанный список
function printLinkedList (head, headName) {
    let current = head;
    let result = "";
    while (current) {
        result += current.data + " --> "
        current = current.next
    }
    result += "null"
    console.log(result + " " + headName)
}

// TASK 1 - добавить в начало
function pushFront(head, value) {
    const newNode = new Node(value)
    newNode.next = head
    return newNode
}

let head1 = null

head1 = pushFront(head1, 40)
head1 = pushFront(head1, 30)
head1 = pushFront(head1, 20)
head1 = pushFront(head1, 10)

printLinkedList(head1, "Head 1")



// TASK 2 - добавление элемента в конце
function pushEnd (head, value) {
    const newNode = new Node(value)
    if(!head) return newNode;

    let current = head;
    while (current.next) {
        current = current.next;
    }
    current.next = newNode;
    return head
}

let head2 =  null


head2 = pushEnd(head2, 10)
head2 = pushEnd(head2, 20)
head2 = pushEnd(head2, 30)
head2 = pushEnd(head2, 40)
printLinkedList(head2, "Head 2")

// TASK 3 - удаление элемента в конце
function deleteEnd (head) {
    if(!head) return null
    if(!head.next) return null
    let current = head
    while (current.next.next) {
        current = current.next
    }
    current.next = null;
    return head
}

let head3 = null;

head3 = pushFront(head3, 10)
head3 = pushFront(head3, 20)
head3 = pushFront(head3, 30)
head3 = pushFront(head3, 40)
deleteEnd(head3)

printLinkedList(head3, "Head 3")

// TASK 5 - нахождение определенного элемента
function findSpecificElement (head, target)  {
    if (!head) return null
    if (!head.next) return head.data

    let current = head;
    while (current.next) {
        if(current.data === target) return true
        current = current.next
    }
    return false
}

let head4 = null;

head4 = pushFront(head4, 10)
head4 = pushFront(head4, 20)
head4 = pushFront(head4, 30)
head4 = pushFront(head4, 40)

console.log(findSpecificElement(head4, 21))


// TASK 6 - вставка по позиции
function InsertElementInLinkedList(head, newElement, specificPosition) {
    if (specificPosition <= 0) {
        return pushFront(head, newElement)
    }
    const newNode = new Node(newElement)
    let current = head
    let i = 0
    while (current && i < specificPosition - 1) {
        current = current.next
        i++
    }
    if (!current) {
        return pushEnd(head, newElement)
    }
    newNode.next = current.next
    current.next = newNode
    return head
}

let head6 = null
head6 = pushEnd(head6, 10)
head6 = pushEnd(head6, 20)
head6 = pushEnd(head6, 40)
head6 = InsertElementInLinkedList(head6, 30, 2)
printLinkedList(head6, "Head 6 (insert 30 at index 2)")

// TASK 7 - удаление первого вхождения по значению
function removeByValue(head, value) {
    if (!head) return null
    if (head.data === value) return head.next
    let current = head
    while (current.next) {
        if (current.next.data === value) {
            current.next = current.next.next
            return head
        }
        current = current.next
    }
    return head
}

let head7 = null
head7 = pushEnd(head7, 10)
head7 = pushEnd(head7, 20)
head7 = pushEnd(head7, 30)
head7 = removeByValue(head7, 20)
printLinkedList(head7, "Head 7 (removed 20)")

// TASK 8 - объединение двух списков (второй цепляется к концу первого)
function concatenateLists(headA, headB) {
    if (!headA) return headB
    let tail = headA
    while (tail.next) {
        tail = tail.next
    }
    tail.next = headB
    return headA
}

let head8a = null
head8a = pushEnd(head8a, 1)
head8a = pushEnd(head8a, 2)
let head8b = null
head8b = pushEnd(head8b, 3)
head8b = pushEnd(head8b, 4)
let head8 = concatenateLists(head8a, head8b)
printLinkedList(head8, "Head 8 (concatenated)")

// TASK 9 - разворот односвязного списка
function reverseList(head) {
    let prev = null
    let current = head
    while (current) {
        const next = current.next
        current.next = prev
        prev = current
        current = next
    }
    return prev
}

let head9 = null
head9 = pushEnd(head9, 10)
head9 = pushEnd(head9, 20)
head9 = pushEnd(head9, 30)
head9 = reverseList(head9)
printLinkedList(head9, "Head 9 (reversed)")

// TASK 10 - сортировка вставками
function insertionSortLinkedList(head) {
    if (!head || !head.next) return head
    let sorted = null
    let current = head
    while (current) {
        const next = current.next
        if (!sorted || current.data < sorted.data) {
            current.next = sorted
            sorted = current
        } else {
            let s = sorted
            while (s.next && s.next.data < current.data) {
                s = s.next
            }
            current.next = s.next
            s.next = current
        }
        current = next
    }
    return sorted
}

let head10 = null
head10 = pushEnd(head10, 40)
head10 = pushEnd(head10, 10)
head10 = pushEnd(head10, 30)
head10 = pushEnd(head10, 20)
head10 = insertionSortLinkedList(head10)
printLinkedList(head10, "Head 10 (insertion sort)")

