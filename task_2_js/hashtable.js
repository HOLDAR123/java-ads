class HashTable {
    constructor(size = 10) {
        this.size = size
        this.table = Array.from({ length: size }, () => [])
    }

    // простая хеш-функция
    _hash(key) {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i)
        }
        return hash % this.size
    }

    // 7. добавление
    set(key, value) {
        const index = this._hash(key)
        const bucket = this.table[index]

        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value
                return
            }
        }

        bucket.push([key, value])
    }

    // получение
    get(key) {
        const index = this._hash(key)
        for (let pair of this.table[index]) {
            if (pair[0] === key) {
                return pair[1]
            }
        }
        return undefined
    }

    // 7. удаление
    remove(key) {
        const index = this._hash(key)
        const bucket = this.table[index]

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1)
                return true
            }
        }
        return false
    }

    // вывод таблицы
    print() {
        this.table.forEach((bucket, i) => {
            const content = bucket.map(([k, v]) => `${k}:${v}`).join(", ")
            console.log(`${i}: ${content}`)
        })
    }

    // 8. сумма значений
    sum() {
        let total = 0
        for (let bucket of this.table) {
            for (let [, value] of bucket) {
                total += value
            }
        }
        return total
    }

    // 9. min
    min() {
        let min = Infinity
        for (let bucket of this.table) {
            for (let [, value] of bucket) {
                if (value < min) min = value
            }
        }
        return min === Infinity ? null : min
    }

    // 9. max
    max() {
        let max = -Infinity
        for (let bucket of this.table) {
            for (let [, value] of bucket) {
                if (value > max) max = value
            }
        }
        return max === -Infinity ? null : max
    }

    // 10. четные
    getEven() {
        const res = []
        for (let bucket of this.table) {
            for (let [, value] of bucket) {
                if (value % 2 === 0) res.push(value)
            }
        }
        return res
    }

    // 10. нечетные
    getOdd() {
        const res = []
        for (let bucket of this.table) {
            for (let [, value] of bucket) {
                if (value % 2 !== 0) res.push(value)
            }
        }
        return res
    }
}


const ht = new HashTable()

ht.set("a", 10)
ht.set("b", 15)
ht.set("c", 20)
ht.set("d", 7)

console.log("Hash table:")
ht.print()

console.log("Sum:", ht.sum())
console.log("Min:", ht.min())
console.log("Max:", ht.max())
console.log("Even:", ht.getEven())
console.log("Odd:", ht.getOdd())

ht.remove("b")

console.log("After delete:")
ht.print()
