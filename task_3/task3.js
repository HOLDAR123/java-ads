function isPalindrome(s) {
    let cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    let left = 0;
    let right = cleaned.length - 1;

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}


function twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        let sum = numbers[left] + numbers[right];

        if (sum === target) return [left + 1, right + 1];
        if (sum < target) left++;
        else right--;
    }
}


function threeSum(nums) {
    nums.sort((a, b) => a - b);
    let result = [];

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;

        let left = i + 1;
        let right = nums.length - 1;

        while (left < right) {
            let sum = nums[i] + nums[left] + nums[right];

            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while (nums[left] === nums[left + 1]) left++;
                while (nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}



function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let max = 0;

    while (left < right) {
        let width = right - left;
        let h = Math.min(height[left], height[right]);
        max = Math.max(max, width * h);

        if (height[left] < height[right]) left++;
        else right--;
    }

    return max;
}


function trap(height) {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

// ===== isPalindrome =====
console.log("isPalindrome:");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false


// ===== twoSum =====
console.log("\ntwoSum:");
console.log(twoSum([2,7,11,15], 9)); // [1,2]
console.log(twoSum([1,2,3,4,6], 6)); // [2,4]


// ===== threeSum =====
console.log("\nthreeSum:");
console.log(threeSum([-1,0,1,2,-1,-4]));
// [[-1,-1,2], [-1,0,1]]


// ===== maxArea =====
console.log("\nmaxArea:");
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // 49


// ===== trap =====
console.log("\ntrap:");
console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1])); // 6
