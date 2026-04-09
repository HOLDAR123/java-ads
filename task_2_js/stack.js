/**
 * Динамический стек (на массиве). Поддержка нескольких стеков — через StackRegistry.
 */

class Stack {
    constructor() {
        this._items = []
    }

    push(value) {
        this._items.push(value)
    }

    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items.pop()
    }

    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items[this._items.length - 1]
    }

    isEmpty() {
        return this._items.length === 0
    }

    clear() {
        this._items.length = 0
    }

    display() {
        if (this.isEmpty()) {
            console.log("(empty stack)")
            return
        }
        console.log(this._items.slice().reverse().join(" | ") + "  ← top")
    }


    toArrayBottomToTop() {
        return this._items.slice()
    }

    get size() {
        return this._items.length
    }
}

class StackRegistry {
    constructor() {
        this._stacks = new Map()
    }

    create(id) {
        const s = new Stack()
        this._stacks.set(id, s)
        return s
    }

    get(id) {
        return this._stacks.get(id)
    }

    has(id) {
        return this._stacks.has(id)
    }
}

function removeBelowMean(stack) {
    if (!(stack instanceof Stack) || stack.isEmpty()) {
        return
    }
    const popped = []
    while (!stack.isEmpty()) {
        popped.push(stack.pop())
    }
    const sum = popped.reduce((a, b) => a + b, 0)
    const mean = sum / popped.length
    const keptBottomToTop = []
    for (let i = popped.length - 1; i >= 0; i--) {
        if (popped[i] >= mean) {
            keptBottomToTop.push(popped[i])
        }
    }
    for (const v of keptBottomToTop) {
        stack.push(v)
    }
}

function demo() {
    const s = new Stack()
    ;[1.0, 2.0, 3.0, 10.0].forEach((x) => s.push(x))
    process.stdout.write("Stack: ")
    s.display()
    removeBelowMean(s)
    process.stdout.write("After removeBelowMean (mean was 4): ")
    s.display()

    const reg = new StackRegistry()
    reg.create("a").push(1)
    reg.create("b").push(2)
    console.log("registry b peek:", reg.get("b").peek())
}

if (require.main === module) {
    demo()
}

module.exports = { Stack, StackRegistry, removeBelowMean }
