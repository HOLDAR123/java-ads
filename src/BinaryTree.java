/**
 * BST (tasks 1–6) and simple hash table (tasks 7–10).
 */
public class BinaryTree {

    private static class Node {
        int data;
        Node left;
        Node right;

        Node(int data) {
            this.data = data;
        }
    }

    private Node root;

    public void insert(int value) {
        root = insert(root, value);
    }

    private Node insert(Node node, int value) {
        if (node == null) {
            return new Node(value);
        }
        if (value < node.data) {
            node.left = insert(node.left, value);
        } else if (value > node.data) {
            node.right = insert(node.right, value);
        }
        return node;
    }

    public boolean remove(int value) {
        int before = size(root);
        root = remove(root, value);
        return size(root) < before;
    }

    private Node remove(Node node, int value) {
        if (node == null) {
            return null;
        }
        if (value < node.data) {
            node.left = remove(node.left, value);
        } else if (value > node.data) {
            node.right = remove(node.right, value);
        } else {
            if (node.left == null) {
                return node.right;
            }
            if (node.right == null) {
                return node.left;
            }
            int minRight = minValue(node.right);
            node.data = minRight;
            node.right = remove(node.right, minRight);
        }
        return node;
    }

    private int minValue(Node node) {
        while (node.left != null) {
            node = node.left;
        }
        return node.data;
    }

    private int size(Node node) {
        if (node == null) {
            return 0;
        }
        return 1 + size(node.left) + size(node.right);
    }

    public int countEven() {
        return countEven(root);
    }

    public int countOdd() {
        return countOdd(root);
    }

    private int countEven(Node node) {
        if (node == null) {
            return 0;
        }
        int add = (node.data % 2 == 0) ? 1 : 0;
        return add + countEven(node.left) + countEven(node.right);
    }

    private int countOdd(Node node) {
        if (node == null) {
            return 0;
        }
        int add = (node.data % 2 != 0) ? 1 : 0;
        return add + countOdd(node.left) + countOdd(node.right);
    }

    public Integer min() {
        if (root == null) {
            return null;
        }
        Node n = root;
        while (n.left != null) {
            n = n.left;
        }
        return n.data;
    }

    public Integer max() {
        if (root == null) {
            return null;
        }
        Node n = root;
        while (n.right != null) {
            n = n.right;
        }
        return n.data;
    }

    public boolean isEmpty() {
        return root == null;
    }

    public void deleteTree() {
        root = null;
    }

    public int height() {
        return height(root);
    }

    private int height(Node node) {
        if (node == null) {
            return 0;
        }
        return 1 + Math.max(height(node.left), height(node.right));
    }

    /** In-order print (sorted for BST). */
    public void print() {
        StringBuilder sb = new StringBuilder();
        inOrder(root, sb);
        System.out.println(sb.length() == 0 ? "(empty)" : sb.toString().trim());
    }

    private void inOrder(Node node, StringBuilder sb) {
        if (node == null) {
            return;
        }
        inOrder(node.left, sb);
        sb.append(node.data).append(" ");
        inOrder(node.right, sb);
    }

    public static void main(String[] args) {
        BinaryTree t = new BinaryTree();
        for (int v : new int[]{50, 30, 70, 20, 40, 60, 80, 10, 35}) {
            t.insert(v);
        }
        System.out.print("Tree (in-order): ");
        t.print();
        t.remove(20);
        t.remove(70);
        System.out.println("even=" + t.countEven() + " odd=" + t.countOdd());
        System.out.println("min=" + t.min() + " max=" + t.max() + " height=" + t.height());
        t.deleteTree();
        System.out.println("empty=" + t.isEmpty() + " height=" + t.height());

        SimpleHashTable ht = new SimpleHashTable(11);
        for (int v : new int[]{5, 16, 27, 8, 3}) {
            ht.add(v);
        }
        ht.display();
        System.out.println("sum=" + ht.sum() + " min=" + ht.min() + " max=" + ht.max());
        System.out.print("even: ");
        ht.printEven();
        System.out.print("odd: ");
        ht.printOdd();
        ht.remove(16);
        ht.display();
    }
}

class SimpleHashTable {

    private static class HashNode {
        int value;
        HashNode next;

        HashNode(int value) {
            this.value = value;
        }
    }

    private final HashNode[] buckets;
    private final int capacity;

    SimpleHashTable(int capacity) {
        this.capacity = capacity;
        this.buckets = new HashNode[capacity];
    }

    private int indexFor(int value) {
        return Math.floorMod(value, capacity);
    }

    public void add(int value) {
        int i = indexFor(value);
        HashNode cur = buckets[i];
        while (cur != null) {
            if (cur.value == value) {
                return;
            }
            cur = cur.next;
        }
        HashNode n = new HashNode(value);
        n.next = buckets[i];
        buckets[i] = n;
    }

    public boolean remove(int value) {
        int i = indexFor(value);
        HashNode cur = buckets[i];
        HashNode prev = null;
        while (cur != null) {
            if (cur.value == value) {
                if (prev == null) {
                    buckets[i] = cur.next;
                } else {
                    prev.next = cur.next;
                }
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false;
    }

    public void display() {
        for (int b = 0; b < capacity; b++) {
            System.out.print("[" + b + "]: ");
            HashNode cur = buckets[b];
            if (cur == null) {
                System.out.println("-");
            } else {
                while (cur != null) {
                    System.out.print(cur.value);
                    if (cur.next != null) {
                        System.out.print(" -> ");
                    }
                    cur = cur.next;
                }
                System.out.println();
            }
        }
    }

    public long sum() {
        long s = 0;
        for (int b = 0; b < capacity; b++) {
            HashNode cur = buckets[b];
            while (cur != null) {
                s += cur.value;
                cur = cur.next;
            }
        }
        return s;
    }

    public Integer min() {
        Integer m = null;
        for (int b = 0; b < capacity; b++) {
            HashNode cur = buckets[b];
            while (cur != null) {
                if (m == null || cur.value < m) {
                    m = cur.value;
                }
                cur = cur.next;
            }
        }
        return m;
    }

    public Integer max() {
        Integer m = null;
        for (int b = 0; b < capacity; b++) {
            HashNode cur = buckets[b];
            while (cur != null) {
                if (m == null || cur.value > m) {
                    m = cur.value;
                }
                cur = cur.next;
            }
        }
        return m;
    }

    public void printEven() {
        boolean first = true;
        for (int b = 0; b < capacity; b++) {
            HashNode cur = buckets[b];
            while (cur != null) {
                if (cur.value % 2 == 0) {
                    if (!first) {
                        System.out.print(" ");
                    }
                    System.out.print(cur.value);
                    first = false;
                }
                cur = cur.next;
            }
        }
        System.out.println(first ? "(none)" : "");
    }

    public void printOdd() {
        boolean first = true;
        for (int b = 0; b < capacity; b++) {
            HashNode cur = buckets[b];
            while (cur != null) {
                if (cur.value % 2 != 0) {
                    if (!first) {
                        System.out.print(" ");
                    }
                    System.out.print(cur.value);
                    first = false;
                }
                cur = cur.next;
            }
        }
        System.out.println(first ? "(none)" : "");
    }
}
