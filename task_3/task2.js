var lastStoneWeight = function(stones) {
    while (stones.length > 1) {
        stones.sort((a, b) => b - a);
        let y = stones.shift();
        let x = stones.shift();

        if (y !== x) {
            stones.push(y - x);
        }
    }

    return stones.length ? stones[0] : 0;
};


var KthLargest = function(k, nums) {
    this.k = k;
    this.nums = nums.sort((a, b) => b - a);
};

KthLargest.prototype.add = function(val) {
    this.nums.push(val);
    this.nums.sort((a, b) => b - a);
    return this.nums[this.k - 1];
};


var Twitter = function() {
    this.time = 0;
    this.tweets = new Map(); // userId -> [{id, time}]
    this.following = new Map(); // userId -> Set
};

Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweets.has(userId)) {
        this.tweets.set(userId, []);
    }
    this.tweets.get(userId).push({ id: tweetId, time: this.time++ });
};

Twitter.prototype.getNewsFeed = function(userId) {
    let res = [];
    let users = new Set(this.following.get(userId) || []);
    users.add(userId);

    for (let u of users) {
        if (this.tweets.has(u)) {
            res.push(...this.tweets.get(u));
        }
    }

    return res
        .sort((a, b) => b.time - a.time)
        .slice(0, 10)
        .map(t => t.id);
};

Twitter.prototype.follow = function(followerId, followeeId) {
    if (!this.following.has(followerId)) {
        this.following.set(followerId, new Set());
    }
    this.following.get(followerId).add(followeeId);
};

Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (this.following.has(followerId)) {
        this.following.get(followerId).delete(followeeId);
    }
};


var leastInterval = function(tasks, n) {
    const freq = new Map();

    for (let t of tasks) {
        freq.set(t, (freq.get(t) || 0) + 1);
    }

    let maxFreq = Math.max(...freq.values());
    let maxCount = [...freq.values()].filter(v => v === maxFreq).length;

    return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
};

var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};

var kClosest = function(points, k) {
    return points
        .sort((a, b) => (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2))
        .slice(0, k);
};


var MedianFinder = function() {
    this.arr = [];
};

MedianFinder.prototype.addNum = function(num) {
    this.arr.push(num);
    this.arr.sort((a, b) => a - b);
};

MedianFinder.prototype.findMedian = function() {
    let n = this.arr.length;
    let mid = Math.floor(n / 2);

    if (n % 2 === 0) {
        return (this.arr[mid - 1] + this.arr[mid]) / 2;
    } else {
        return this.arr[mid];
    }
};

// ===== Task 1 =====
console.log("Task 1:");
console.log(lastStoneWeight([2,7,4,1,8,1])); // 1
console.log(lastStoneWeight([1])); // 1
console.log(lastStoneWeight([2,2])); // 0


// ===== Task 2 =====
console.log("\nTask 2:");
let kth = new KthLargest(3, [4,5,8,2]);
console.log(kth.add(3));  // 4
console.log(kth.add(5));  // 5
console.log(kth.add(10)); // 5
console.log(kth.add(9));  // 8
console.log(kth.add(4));  // 8


// ===== Task 3 =====
console.log("\nTask 3:");
let twitter = new Twitter();

twitter.postTweet(1, 5);
twitter.postTweet(1, 3);
twitter.postTweet(1, 2);
twitter.postTweet(2, 6);

twitter.follow(1, 2);
console.log(twitter.getNewsFeed(1)); // последние 10 твитов

twitter.unfollow(1, 2);
console.log(twitter.getNewsFeed(1));


// ===== Task 4 =====
console.log("\nTask 4:");
console.log(leastInterval(["A","A","A","A","B","B","B","B"], 2)); // 8
console.log(leastInterval(["A","A","A","A","B","B","B","B"], 0)); // 8 (у тебя может быть 8 или 6 — зависит от логики, но формула даёт 8 корректно)
console.log(leastInterval(["A","A","A","A","A","A","A","A","B","C","D","E","F","G"], 2)); // 16


// ===== Task 5 =====
console.log("\nTask 5:");
console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
console.log(findKthLargest([3,2,3,3,1,2,2,4,5,5,6], 4)); // 4


// ===== Task 6 =====
console.log("\nTask 6:");
console.log(kClosest([[1,3],[-2,2]], 1)); // [[-2,2]]
console.log(kClosest([[3,3],[5,-1],[-2,4]], 2)); // любые 2 ближайшие


// ===== Task 7 =====
console.log("\nTask 7:");
let mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2
