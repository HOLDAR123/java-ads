/**
 * Singly linked list of integers with basic operations.
 */
public class LinkedList {

    private static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
        }
    }

    private Node head;
    private int size;

    public int size() {
        return size;
    }

    public boolean isEmpty() {
        return head == null;
    }

    // 1. Add element at the beginning
    public void addFirst(int value) {
        Node node = new Node(value);
        node.next = head;
        head = node;
        size++;
    }

    // 2. Add element at the end
    public void addLast(int value) {
        Node node = new Node(value);
        if (head == null) {
            head = node;
        } else {
            Node cur = head;
            while (cur.next != null) {
                cur = cur.next;
            }
            cur.next = node;
        }
        size++;
    }

    // 3. Remove the last element
    public boolean removeLast() {
        if (head == null) {
            return false;
        }
        if (head.next == null) {
            head = null;
            size--;
            return true;
        }
        Node cur = head;
        while (cur.next.next != null) {
            cur = cur.next;
        }
        cur.next = null;
        size--;
        return true;
    }

    // 4. Print all elements
    public void print() {
        Node cur = head;
        while (cur != null) {
            System.out.print(cur.data);
            if (cur.next != null) {
                System.out.print(" ");
            }
            cur = cur.next;
        }
        System.out.println();
    }

    // 5. Search: true if at least one occurrence exists
    public boolean contains(int value) {
        Node cur = head;
        while (cur != null) {
            if (cur.data == value) {
                return true;
            }
            cur = cur.next;
        }
        return false;
    }

    // 6. Insert at index (0-based; 0 = front)
    public boolean insertAt(int index, int value) {
        if (index < 0 || index > size) {
            return false;
        }
        if (index == 0) {
            addFirst(value);
            return true;
        }
        Node prev = head;
        for (int i = 0; i < index - 1; i++) {
            prev = prev.next;
        }
        Node node = new Node(value);
        node.next = prev.next;
        prev.next = node;
        size++;
        return true;
    }

    // 7. Remove first occurrence of value
    public boolean removeByValue(int value) {
        if (head == null) {
            return false;
        }
        if (head.data == value) {
            head = head.next;
            size--;
            return true;
        }
        Node cur = head;
        while (cur.next != null) {
            if (cur.next.data == value) {
                cur.next = cur.next.next;
                size--;
                return true;
            }
            cur = cur.next;
        }
        return false;
    }

    // 8. Merge two lists (append other to this; other becomes empty)
    public void combine(LinkedList other) {
        append(other);
    }

    public void append(LinkedList other) {
        if (other == null || other.head == null) {
            return;
        }
        if (head == null) {
            head = other.head;
            size = other.size;
        } else {
            Node cur = head;
            while (cur.next != null) {
                cur = cur.next;
            }
            cur.next = other.head;
            size += other.size;
        }
        other.head = null;
        other.size = 0;
    }

    // 9. Reverse the list
    public void reverse() {
        Node prev = null;
        Node cur = head;
        while (cur != null) {
            Node next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        head = prev;
    }

    // 10. Insertion sort (ascending)
    public void insertionSort() {
        if (head == null || head.next == null) {
            return;
        }
        Node sortedHead = null;
        Node cur = head;
        while (cur != null) {
            Node next = cur.next;
            sortedHead = sortedInsert(sortedHead, cur);
            cur = next;
        }
        head = sortedHead;
    }

    /** Insert node into ascending sorted segment */
    private static Node sortedInsert(Node sortedHead, Node node) {
        node.next = null;
        if (sortedHead == null || node.data < sortedHead.data) {
            node.next = sortedHead;
            return node;
        }
        Node cur = sortedHead;
        while (cur.next != null && cur.next.data <= node.data) {
            cur = cur.next;
        }
        node.next = cur.next;
        cur.next = node;
        return sortedHead;
    }
}
