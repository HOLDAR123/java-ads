import java.util.Scanner;

public class Main {

    // 1) Sum of squares: 1^2 + 2^2 + ... + n^2
    public static long sumOfSquares(int n) {
        if (n <= 0) {
            return 0;
        }
        return (long) n * n + sumOfSquares(n - 1);
    }

    // 2) Sum of first n elements of array
    public static int sumFirstNArray(int[] arr, int n) {
        if (n <= 0) {
            return 0;
        }
        return arr[n - 1] + sumFirstNArray(arr, n - 1);
    }

    // 3) Sum of first n positive integers: 1 + 2 + ... + n
    public static int sumFirstNIntegers(int n) {
        if (n <= 0) {
            return 0;
        }
        return n + sumFirstNIntegers(n - 1);
    }

    // 4) Sum of powers: b^0 + b^1 + ... + b^n
    public static long sumPowers(int base, int n) {
        if (n == 0) {
            return 1;
        }
        return pow(base, n) + sumPowers(base, n - 1);
    }

    // Recursive integer power helper
    public static long pow(int base, int exp) {
        if (exp == 0) {
            return 1;
        }
        return base * pow(base, exp - 1);
    }

    // 5) Print N integers in reverse order without arrays/loops for reading logic
    public static void reverseInts(int n, Scanner sc) {
        if (n == 0) {
            return;
        }
        int x = sc.nextInt();
        reverseInts(n - 1, sc);
        System.out.print(x + " ");
    }

    // 6) Print N strings in reverse order without arrays/loops for reading logic
    public static void reverseStrings(int n, Scanner sc) {
        if (n == 0) {
            return;
        }
        String s = sc.next();
        reverseStrings(n - 1, sc);
        System.out.println(s);
    }


    // 7) Fill matrix in spiral mode recursively
    public static void fillSpiral(int[][] matrix, int top, int left, int bottom, int right, int value) {
        if (top > bottom || left > right) {
            return;
        }

        // top row
        for (int j = left; j <= right; j++) {
            matrix[top][j] = value++;
        }
        // right column
        for (int i = top + 1; i <= bottom; i++) {
            matrix[i][right] = value++;
        }
        // bottom row
        if (top < bottom) {
            for (int j = right - 1; j >= left; j--) {
                matrix[bottom][j] = value++;
            }
        }
        // left column
        if (left < right) {
            for (int i = bottom - 1; i > top; i--) {
                matrix[i][left] = value++;
            }
        }

        fillSpiral(matrix, top + 1, left + 1, bottom - 1, right - 1, value);
    }


    public static void printMatrixRecursive(int[][] matrix, int i, int j) {
        int n = matrix.length;
        if (i == n) {
            return;
        }
        if (j == n) {
            System.out.println();
            printMatrixRecursive(matrix, i + 1, 0);
            return;
        }
        System.out.print(matrix[i][j]);
        if (j < n - 1) {
            System.out.print(" ");
        }
        printMatrixRecursive(matrix, i, j + 1);
    }

    // 8) Print all sequences x1..xn where 1 <= xi <= k
    public static void generateSequences(int n, int k) {
        int[] current = new int[n];
        generateSequencesRec(current, 0, n, k);
    }

    private static void generateSequencesRec(int[] current, int index, int n, int k) {
        if (index == n) {
            printArrayRecursive(current, 0);
            System.out.println();
            return;
        }
        for (int value = 1; value <= k; value++) {
            current[index] = value;
            generateSequencesRec(current, index + 1, n, k);
        }
    }

    private static void printArrayRecursive(int[] arr, int idx) {
        if (idx == arr.length) {
            return;
        }
        System.out.print(arr[idx]);
        if (idx < arr.length - 1) {
            System.out.print(" ");
        }
        printArrayRecursive(arr, idx + 1);
    }

    // 9) Print all permutations of string with distinct symbols
    public static void printPermutations(String s) {
        char[] chars = s.toCharArray();
        permute(chars, 0);
    }

    private static void permute(char[] chars, int index) {
        if (index == chars.length - 1) {
            System.out.println(chars);
            return;
        }
        for (int i = index; i < chars.length; i++) {
            swap(chars, index, i);
            permute(chars, index + 1);
            swap(chars, index, i);
        }
    }

    private static void swap(char[] chars, int i, int j) {
        char t = chars[i];
        chars[i] = chars[j];
        chars[j] = t;
    }

    // 10) Power of two with one parameter, no helper methods
    public static boolean isPowerOfTwo(int n) {
        if (n < 1) {
            return false;
        }
        if (n == 1) {
            return true;
        }
        if (n % 2 != 0) {
            return false;
        }
        return isPowerOfTwo(n / 2);
    }

    public static void main(String[] args) {
        // Task 1
        int n1 = 4;
        System.out.println("1) 1^2 + ... + " + n1 + "^2 = " + sumOfSquares(n1));

        // Task 2
        int[] arr = {5, 3, 8, 2, 7};
        int n2 = 3;
        System.out.println("2) Sum of first " + n2 + " array elements = " + sumFirstNArray(arr, n2));

        // Task 3
        int n3 = 10;
        System.out.println("3) 1 + ... + " + n3 + " = " + sumFirstNIntegers(n3));

        // Task 4
        int b = 4, n4 = 3;
        System.out.println("4) " + b + "^0 + ... + " + b + "^" + n4 + " = " + sumPowers(b, n4));

        // Task 5
        Scanner intsInput = new Scanner("1 2 3");
        System.out.print("5) Reverse ints: ");
        reverseInts(3, intsInput);
        System.out.println();

        // Task 6
        Scanner stringsInput = new Scanner("Abc bcdh abcdef");
        System.out.println("6) Reverse strings:");
        reverseStrings(3, stringsInput);

        // Task 7
        int size = 4;
        int[][] matrix = new int[size][size];
        fillSpiral(matrix, 0, 0, size - 1, size - 1, 1);
        System.out.println("7) Spiral " + size + "x" + size + ":");
        printMatrixRecursive(matrix, 0, 0);

        // Task 8
        System.out.println("8) Sequences for n=2, k=3:");
        generateSequences(2, 3);

        // Task 9
        System.out.println("9) Permutations of IOX:");
        printPermutations("IOX");

        // Task 10
        System.out.println("10) Power of two tests:");
        System.out.println("16 -> " + isPowerOfTwo(16));
        System.out.println("18 -> " + isPowerOfTwo(18));
        System.out.println("1  -> " + isPowerOfTwo(1));
        System.out.println("0  -> " + isPowerOfTwo(0));
    }
}