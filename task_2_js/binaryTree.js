class TreeNode {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class BinaryTree {
    constructor() {
        this.root = null
    }

    insert(value) {
        this.root = this._insert(this.root, value)
    }

    _insert(node, value) {
        if (node === null) {
            return new TreeNode(value)
        }
        if (value < node.data) {
            node.left = this._insert(node.left, value)
        } else if (value > node.data) {
            node.right = this._insert(node.right, value)
        }
        return node
    }

    remove(value) {
        const before = this._size(this.root)
        this.root = this._remove(this.root, value)
        return this._size(this.root) < before
    }

    _remove(node, value) {
        if (node === null) {
            return null
        }
        if (value < node.data) {
            node.left = this._remove(node.left, value)
        } else if (value > node.data) {
            node.right = this._remove(node.right, value)
        } else {
            if (node.left === null) {
                return node.right
            }
            if (node.right === null) {
                return node.left
            }
            const minRight = this._minValue(node.right)
            node.data = minRight
            node.right = this._remove(node.right, minRight)
        }
        return node
    }

    _minValue(node) {
        while (node.left !== null) {
            node = node.left
        }
        return node.data
    }

    _size(node) {
        if (node === null) {
            return 0
        }
        return 1 + this._size(node.left) + this._size(node.right)
    }

    countEven() {
        return this._countEven(this.root)
    }

    _countEven(node) {
        if (node === null) {
            return 0
        }
        const add = node.data % 2 === 0 ? 1 : 0
        return add + this._countEven(node.left) + this._countEven(node.right)
    }

    countOdd() {
        return this._countOdd(this.root)
    }

    _countOdd(node) {
        if (node === null) {
            return 0
        }
        const add = node.data % 2 !== 0 ? 1 : 0
        return add + this._countOdd(node.left) + this._countOdd(node.right)
    }

    min() {
        if (this.root === null) {
            return null
        }
        let n = this.root
        while (n.left !== null) {
            n = n.left
        }
        return n.data
    }

    max() {
        if (this.root === null) {
            return null
        }
        let n = this.root
        while (n.right !== null) {
            n = n.right
        }
        return n.data
    }

    isEmpty() {
        return this.root === null
    }

    deleteTree() {
        this.root = null
    }

    height() {
        return this._height(this.root)
    }

    _height(node) {
        if (node === null) {
            return 0
        }
        return 1 + Math.max(this._height(node.left), this._height(node.right))
    }

    print() {
        const parts = []
        this._inOrder(this.root, parts)
        console.log(parts.length === 0 ? "(empty)" : parts.join(" "))
    }

    _inOrder(node, out) {
        if (node === null) {
            return
        }
        this._inOrder(node.left, out)
        out.push(String(node.data))
        this._inOrder(node.right, out)
    }
}

function demo() {
    const t = new BinaryTree()
    for (const v of [50, 30, 70, 20, 40, 60, 80, 10, 35]) {
        t.insert(v)
    }
    process.stdout.write("Tree (in-order): ")
    t.print()
    t.remove(20)
    t.remove(70)
    console.log("even=" + t.countEven() + " odd=" + t.countOdd())
    console.log(
        "min=" + t.min() + " max=" + t.max() + " height=" + t.height()
    )
    t.deleteTree()
    console.log("empty=" + t.isEmpty() + " height=" + t.height())
}

if (require.main === module) {
    demo()
}

module.exports = { BinaryTree, TreeNode }
