class Queue {
    constructor() {
        this._items = []
    }

    enqueue(value) {
        this._items.push(value)
    }

    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items.shift()
    }

    front() {
        if (this.isEmpty()) {
            return undefined
        }
        return this._items[0]
    }

    isEmpty() {
        return this._items.length === 0
    }

    clear() {
        this._items.length = 0
    }

    display() {
        if (this.isEmpty()) {
            console.log("(empty queue)")
            return
        }
        console.log("front → " + this._items.join(" → ") + " ← rear")
    }

    toArray() {
        return this._items.slice()
    }

    get size() {
        return this._items.length
    }
}


class QueueRegistry {
    constructor() {
        this._queues = new Map()
    }

    create(id) {
        const q = new Queue()
        this._queues.set(id, q)
        return q
    }

    get(id) {
        return this._queues.get(id)
    }

    has(id) {
        return this._queues.has(id)
    }
}


function removeEvenNumbers(queue) {
    if (!(queue instanceof Queue) || queue.isEmpty()) {
        return
    }
    const temp = []
    while (!queue.isEmpty()) {
        temp.push(queue.dequeue())
    }
    for (const v of temp) {
        if (typeof v !== "number" || v % 2 !== 0) {
            queue.enqueue(v)
        }
    }
}

function demo() {
    const q = new Queue()
    ;[1, 2, 3, 4, 5, 6].forEach((x) => q.enqueue(x))
    process.stdout.write("Queue: ")
    q.display()
    removeEvenNumbers(q)
    process.stdout.write("After removeEvenNumbers: ")
    q.display()

    const reg = new QueueRegistry()
    reg.create("x").enqueue(10)
    reg.create("y").enqueue(20)
    console.log("registry y front:", reg.get("y").front())
}

if (require.main === module) {
    demo()
}

module.exports = { Queue, QueueRegistry, removeEvenNumbers }
