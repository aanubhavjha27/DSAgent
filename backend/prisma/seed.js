import pkg from "@prisma/client"
const { PrismaClient } = pkg
const prisma = new PrismaClient()

async function main() {
  console.log("Clearing existing data...")
  await prisma.problemList.deleteMany()
  await prisma.problem.deleteMany()
  await prisma.list.deleteMany()

  // ── LISTS ──────────────────────────────────────────────────────────────
  console.log("Seeding lists...")
  const lists = await prisma.list.createMany({
    data: [
      // Popular
      { name: "NeetCode 150", slug: "neetcode150", category: "popular", description: "The most popular structured DSA list" },
      { name: "Blind 75", slug: "blind75", category: "popular", description: "Classic FAANG prep list" },
      { name: "Striver's SDE Sheet", slug: "striverssde", category: "popular", description: "Comprehensive SDE interview prep by Striver" },
      // Company
      { name: "Amazon Top 50", slug: "amazon50", category: "company", description: "Most asked at Amazon interviews" },
      { name: "Google Top 50", slug: "google50", category: "company", description: "Most asked at Google interviews" },
      { name: "Meta Top 50", slug: "meta50", category: "company", description: "Most asked at Meta interviews" },
      { name: "Microsoft Top 50", slug: "microsoft50", category: "company", description: "Most asked at Microsoft interviews" },
      // Pattern
      { name: "Dynamic Programming 50", slug: "dp50", category: "pattern", description: "Focused DP practice" },
      { name: "Graph Problems 40", slug: "graph40", category: "pattern", description: "Focused Graph/BFS/DFS practice" },
      { name: "Backtracking 20", slug: "backtracking20", category: "pattern", description: "Focused Backtracking practice" },
      { name: "Sliding Window 25", slug: "slidingwindow25", category: "pattern", description: "Focused Sliding Window practice" },
      { name: "Two Pointers 30", slug: "twopointers30", category: "pattern", description: "Focused Two Pointers practice" },
    ]
  })
  console.log("Lists seeded!")

  // fetch all lists for reference
  const neetcode150 = await prisma.list.findUnique({ where: { slug: "neetcode150" } })
  const blind75 = await prisma.list.findUnique({ where: { slug: "blind75" } })
  const striverssde = await prisma.list.findUnique({ where: { slug: "striverssde" } })
  const amazon50 = await prisma.list.findUnique({ where: { slug: "amazon50" } })
  const google50 = await prisma.list.findUnique({ where: { slug: "google50" } })
  const meta50 = await prisma.list.findUnique({ where: { slug: "meta50" } })
  const microsoft50 = await prisma.list.findUnique({ where: { slug: "microsoft50" } })
  const dp50 = await prisma.list.findUnique({ where: { slug: "dp50" } })
  const graph40 = await prisma.list.findUnique({ where: { slug: "graph40" } })
  const backtracking20 = await prisma.list.findUnique({ where: { slug: "backtracking20" } })
  const slidingwindow25 = await prisma.list.findUnique({ where: { slug: "slidingwindow25" } })
  const twopointers30 = await prisma.list.findUnique({ where: { slug: "twopointers30" } })

  // helper to create problem and connect to lists
  const addProblem = async (data, listIds) => {
    const problem = await prisma.problem.create({ data })
    await prisma.problemList.createMany({
      data: listIds.map(listId => ({ problemId: problem.id, listId }))
    })
    return problem
  }

  console.log("Seeding problems...")

  // ── ARRAYS ───────────────────────────────────────────────────────────────
  await addProblem({ name: "Two Sum", link: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, meta50.id, microsoft50.id])

  await addProblem({ name: "Best Time to Buy and Sell Stock", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "Easy", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, meta50.id])

  await addProblem({ name: "Contains Duplicate", link: "https://leetcode.com/problems/contains-duplicate/", difficulty: "Easy", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Product of Array Except Self", link: "https://leetcode.com/problems/product-of-array-except-self/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, meta50.id])

  await addProblem({ name: "Maximum Subarray", link: "https://leetcode.com/problems/maximum-subarray/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Maximum Product Subarray", link: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Find Minimum in Rotated Sorted Array", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Search in Rotated Sorted Array", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "3Sum", link: "https://leetcode.com/problems/3sum/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, meta50.id])

  await addProblem({ name: "Container With Most Water", link: "https://leetcode.com/problems/container-with-most-water/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Trapping Rain Water", link: "https://leetcode.com/problems/trapping-rain-water/", difficulty: "Hard", category: "Arrays" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Merge Sorted Array", link: "https://leetcode.com/problems/merge-sorted-array/", difficulty: "Easy", category: "Arrays" },
    [striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Sort Colors", link: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", category: "Arrays" },
    [neetcode150.id, striverssde.id])

  await addProblem({ name: "Next Permutation", link: "https://leetcode.com/problems/next-permutation/", difficulty: "Medium", category: "Arrays" },
    [striverssde.id, microsoft50.id])

  await addProblem({ name: "Pascal's Triangle", link: "https://leetcode.com/problems/pascals-triangle/", difficulty: "Easy", category: "Arrays" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Majority Element", link: "https://leetcode.com/problems/majority-element/", difficulty: "Easy", category: "Arrays" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Rotate Array", link: "https://leetcode.com/problems/rotate-array/", difficulty: "Medium", category: "Arrays" },
    [striverssde.id, microsoft50.id])

  await addProblem({ name: "Stock Buy and Sell II", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/", difficulty: "Medium", category: "Arrays" },
    [striverssde.id, amazon50.id])

  // ── TWO POINTERS ─────────────────────────────────────────────────────────
  await addProblem({ name: "Valid Palindrome", link: "https://leetcode.com/problems/valid-palindrome/", difficulty: "Easy", category: "Two Pointers" },
    [neetcode150.id, blind75.id, striverssde.id, twopointers30.id])

  await addProblem({ name: "Two Sum II Input Array Is Sorted", link: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/", difficulty: "Medium", category: "Two Pointers" },
    [neetcode150.id, striverssde.id, twopointers30.id])

  await addProblem({ name: "4Sum", link: "https://leetcode.com/problems/4sum/", difficulty: "Medium", category: "Two Pointers" },
    [striverssde.id, twopointers30.id])

  await addProblem({ name: "Remove Duplicates from Sorted Array", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", difficulty: "Easy", category: "Two Pointers" },
    [neetcode150.id, striverssde.id, twopointers30.id, microsoft50.id])

  await addProblem({ name: "Remove Element", link: "https://leetcode.com/problems/remove-element/", difficulty: "Easy", category: "Two Pointers" },
    [twopointers30.id])

  await addProblem({ name: "Squares of a Sorted Array", link: "https://leetcode.com/problems/squares-of-a-sorted-array/", difficulty: "Easy", category: "Two Pointers" },
    [twopointers30.id, amazon50.id])

  await addProblem({ name: "Backspace String Compare", link: "https://leetcode.com/problems/backspace-string-compare/", difficulty: "Easy", category: "Two Pointers" },
    [twopointers30.id, google50.id])

  await addProblem({ name: "Boats to Save People", link: "https://leetcode.com/problems/boats-to-save-people/", difficulty: "Medium", category: "Two Pointers" },
    [twopointers30.id])

  await addProblem({ name: "Is Subsequence", link: "https://leetcode.com/problems/is-subsequence/", difficulty: "Easy", category: "Two Pointers" },
    [twopointers30.id, amazon50.id])

  await addProblem({ name: "Sort Array By Parity", link: "https://leetcode.com/problems/sort-array-by-parity/", difficulty: "Easy", category: "Two Pointers" },
    [twopointers30.id])

  await addProblem({ name: "Dutch National Flag", link: "https://leetcode.com/problems/sort-colors/", difficulty: "Medium", category: "Two Pointers" },
    [twopointers30.id, striverssde.id])

  // ── SLIDING WINDOW ───────────────────────────────────────────────────────
  await addProblem({ name: "Longest Substring Without Repeating Characters", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "Medium", category: "Sliding Window" },
    [neetcode150.id, blind75.id, striverssde.id, slidingwindow25.id, amazon50.id, google50.id])

  await addProblem({ name: "Longest Repeating Character Replacement", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", difficulty: "Medium", category: "Sliding Window" },
    [neetcode150.id, blind75.id, slidingwindow25.id])

  await addProblem({ name: "Minimum Window Substring", link: "https://leetcode.com/problems/minimum-window-substring/", difficulty: "Hard", category: "Sliding Window" },
    [neetcode150.id, blind75.id, striverssde.id, slidingwindow25.id, google50.id, meta50.id])

  await addProblem({ name: "Permutation in String", link: "https://leetcode.com/problems/permutation-in-string/", difficulty: "Medium", category: "Sliding Window" },
    [neetcode150.id, slidingwindow25.id, amazon50.id])

  await addProblem({ name: "Find All Anagrams in a String", link: "https://leetcode.com/problems/find-all-anagrams-in-a-string/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id, google50.id])

  await addProblem({ name: "Maximum Average Subarray I", link: "https://leetcode.com/problems/maximum-average-subarray-i/", difficulty: "Easy", category: "Sliding Window" },
    [slidingwindow25.id])

  await addProblem({ name: "Maximum Sum of Distinct Subarrays", link: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id])

  await addProblem({ name: "Fruit Into Baskets", link: "https://leetcode.com/problems/fruit-into-baskets/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id, striverssde.id])

  await addProblem({ name: "Longest Subarray of 1s After Deleting One Element", link: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id])

  await addProblem({ name: "Subarray Product Less Than K", link: "https://leetcode.com/problems/subarray-product-less-than-k/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id, amazon50.id])

  await addProblem({ name: "Minimum Size Subarray Sum", link: "https://leetcode.com/problems/minimum-size-subarray-sum/", difficulty: "Medium", category: "Sliding Window" },
    [slidingwindow25.id, striverssde.id])

  // ── STRINGS ──────────────────────────────────────────────────────────────
  await addProblem({ name: "Valid Anagram", link: "https://leetcode.com/problems/valid-anagram/", difficulty: "Easy", category: "Strings" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Group Anagrams", link: "https://leetcode.com/problems/group-anagrams/", difficulty: "Medium", category: "Strings" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Valid Parentheses", link: "https://leetcode.com/problems/valid-parentheses/", difficulty: "Easy", category: "Strings" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, meta50.id, microsoft50.id])

  await addProblem({ name: "Longest Palindromic Substring", link: "https://leetcode.com/problems/longest-palindromic-substring/", difficulty: "Medium", category: "Strings" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Palindromic Substrings", link: "https://leetcode.com/problems/palindromic-substrings/", difficulty: "Medium", category: "Strings" },
    [neetcode150.id, blind75.id])

  await addProblem({ name: "Encode and Decode Strings", link: "https://leetcode.com/problems/encode-and-decode-strings/", difficulty: "Medium", category: "Strings" },
    [neetcode150.id, blind75.id])

  await addProblem({ name: "Roman to Integer", link: "https://leetcode.com/problems/roman-to-integer/", difficulty: "Easy", category: "Strings" },
    [striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Longest Common Prefix", link: "https://leetcode.com/problems/longest-common-prefix/", difficulty: "Easy", category: "Strings" },
    [striverssde.id, google50.id, microsoft50.id])

  await addProblem({ name: "String to Integer (atoi)", link: "https://leetcode.com/problems/string-to-integer-atoi/", difficulty: "Medium", category: "Strings" },
    [striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Count and Say", link: "https://leetcode.com/problems/count-and-say/", difficulty: "Medium", category: "Strings" },
    [striverssde.id, google50.id])

  await addProblem({ name: "Reverse Words in a String", link: "https://leetcode.com/problems/reverse-words-in-a-string/", difficulty: "Medium", category: "Strings" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Zigzag Conversion", link: "https://leetcode.com/problems/zigzag-conversion/", difficulty: "Medium", category: "Strings" },
    [striverssde.id, google50.id])

  // ── LINKED LIST ──────────────────────────────────────────────────────────
  await addProblem({ name: "Reverse Linked List", link: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "Easy", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Merge Two Sorted Lists", link: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "Easy", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Linked List Cycle", link: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "Easy", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Linked List Cycle II", link: "https://leetcode.com/problems/linked-list-cycle-ii/", difficulty: "Medium", category: "Linked List" },
    [striverssde.id, google50.id])

  await addProblem({ name: "Merge K Sorted Lists", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Remove Nth Node From End of List", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Reorder List", link: "https://leetcode.com/problems/reorder-list/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Add Two Numbers", link: "https://leetcode.com/problems/add-two-numbers/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Copy List with Random Pointer", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Find the Duplicate Number", link: "https://leetcode.com/problems/find-the-duplicate-number/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, striverssde.id])

  await addProblem({ name: "LRU Cache", link: "https://leetcode.com/problems/lru-cache/", difficulty: "Medium", category: "Linked List" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Reverse Nodes in k-Group", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", difficulty: "Hard", category: "Linked List" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Palindrome Linked List", link: "https://leetcode.com/problems/palindrome-linked-list/", difficulty: "Easy", category: "Linked List" },
    [striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Intersection of Two Linked Lists", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/", difficulty: "Easy", category: "Linked List" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Middle of the Linked List", link: "https://leetcode.com/problems/middle-of-the-linked-list/", difficulty: "Easy", category: "Linked List" },
    [striverssde.id, amazon50.id])

  // ── STACK ────────────────────────────────────────────────────────────────
  await addProblem({ name: "Min Stack", link: "https://leetcode.com/problems/min-stack/", difficulty: "Medium", category: "Stack" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Evaluate Reverse Polish Notation", link: "https://leetcode.com/problems/evaluate-reverse-polish-notation/", difficulty: "Medium", category: "Stack" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Generate Parentheses", link: "https://leetcode.com/problems/generate-parentheses/", difficulty: "Medium", category: "Stack" },
    [neetcode150.id, striverssde.id, google50.id, meta50.id])

  await addProblem({ name: "Daily Temperatures", link: "https://leetcode.com/problems/daily-temperatures/", difficulty: "Medium", category: "Stack" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Car Fleet", link: "https://leetcode.com/problems/car-fleet/", difficulty: "Medium", category: "Stack" },
    [neetcode150.id])

  await addProblem({ name: "Largest Rectangle in Histogram", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", difficulty: "Hard", category: "Stack" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Next Greater Element I", link: "https://leetcode.com/problems/next-greater-element-i/", difficulty: "Easy", category: "Stack" },
    [striverssde.id])

  await addProblem({ name: "Next Greater Element II", link: "https://leetcode.com/problems/next-greater-element-ii/", difficulty: "Medium", category: "Stack" },
    [striverssde.id])

  await addProblem({ name: "Asteroid Collision", link: "https://leetcode.com/problems/asteroid-collision/", difficulty: "Medium", category: "Stack" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Decode String", link: "https://leetcode.com/problems/decode-string/", difficulty: "Medium", category: "Stack" },
    [striverssde.id, google50.id, amazon50.id])

  // ── BINARY SEARCH ────────────────────────────────────────────────────────
  await addProblem({ name: "Binary Search", link: "https://leetcode.com/problems/binary-search/", difficulty: "Easy", category: "Binary Search" },
    [neetcode150.id, striverssde.id])

  await addProblem({ name: "Guess Number Higher or Lower", link: "https://leetcode.com/problems/guess-number-higher-or-lower/", difficulty: "Easy", category: "Binary Search" },
    [striverssde.id])

  await addProblem({ name: "Search a 2D Matrix", link: "https://leetcode.com/problems/search-a-2d-matrix/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Koko Eating Bananas", link: "https://leetcode.com/problems/koko-eating-bananas/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, striverssde.id, google50.id])

  await addProblem({ name: "Find Peak Element", link: "https://leetcode.com/problems/find-peak-element/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, striverssde.id, google50.id, amazon50.id])

  await addProblem({ name: "Time Based Key Value Store", link: "https://leetcode.com/problems/time-based-key-value-store/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, google50.id])

  await addProblem({ name: "Median of Two Sorted Arrays", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", difficulty: "Hard", category: "Binary Search" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, amazon50.id])

  await addProblem({ name: "Find First and Last Position of Element in Sorted Array", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", difficulty: "Medium", category: "Binary Search" },
    [striverssde.id, google50.id, amazon50.id])

  await addProblem({ name: "Single Element in a Sorted Array", link: "https://leetcode.com/problems/single-element-in-a-sorted-array/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, striverssde.id])

  await addProblem({ name: "Capacity to Ship Packages Within D Days", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", difficulty: "Medium", category: "Binary Search" },
    [neetcode150.id, striverssde.id, amazon50.id])

  // ── TREES ────────────────────────────────────────────────────────────────
  await addProblem({ name: "Invert Binary Tree", link: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Maximum Depth of Binary Tree", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Diameter of Binary Tree", link: "https://leetcode.com/problems/diameter-of-binary-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Balanced Binary Tree", link: "https://leetcode.com/problems/balanced-binary-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Same Tree", link: "https://leetcode.com/problems/same-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Subtree of Another Tree", link: "https://leetcode.com/problems/subtree-of-another-tree/", difficulty: "Easy", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Lowest Common Ancestor of Binary Tree", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Binary Tree Level Order Traversal", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Binary Tree Right Side View", link: "https://leetcode.com/problems/binary-tree-right-side-view/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, striverssde.id, amazon50.id, meta50.id])

  await addProblem({ name: "Count Good Nodes in Binary Tree", link: "https://leetcode.com/problems/count-good-nodes-in-binary-tree/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id])

  await addProblem({ name: "Validate Binary Search Tree", link: "https://leetcode.com/problems/validate-binary-search-tree/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Kth Smallest Element in a BST", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Lowest Common Ancestor of BST", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Construct Binary Tree from Preorder and Inorder Traversal", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", difficulty: "Medium", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Binary Tree Maximum Path Sum", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", difficulty: "Hard", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, meta50.id])

  await addProblem({ name: "Serialize and Deserialize Binary Tree", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", difficulty: "Hard", category: "Trees" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Maximum Width of Binary Tree", link: "https://leetcode.com/problems/maximum-width-of-binary-tree/", difficulty: "Medium", category: "Trees" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Path Sum II", link: "https://leetcode.com/problems/path-sum-ii/", difficulty: "Medium", category: "Trees" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Flatten Binary Tree to Linked List", link: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/", difficulty: "Medium", category: "Trees" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Symmetric Tree", link: "https://leetcode.com/problems/symmetric-tree/", difficulty: "Easy", category: "Trees" },
    [striverssde.id, microsoft50.id, amazon50.id])

    // ── HEAP / PRIORITY QUEUE ────────────────────────────────────────────────
  await addProblem({ name: "Kth Largest Element in a Stream", link: "https://leetcode.com/problems/kth-largest-element-in-a-stream/", difficulty: "Easy", category: "Heap" },
    [neetcode150.id, striverssde.id])

  await addProblem({ name: "Last Stone Weight", link: "https://leetcode.com/problems/last-stone-weight/", difficulty: "Easy", category: "Heap" },
    [neetcode150.id])

  await addProblem({ name: "K Closest Points to Origin", link: "https://leetcode.com/problems/k-closest-points-to-origin/", difficulty: "Medium", category: "Heap" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Kth Largest Element in an Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Medium", category: "Heap" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Top K Frequent Elements", link: "https://leetcode.com/problems/top-k-frequent-elements/", difficulty: "Medium", category: "Heap" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Top K Frequent Words", link: "https://leetcode.com/problems/top-k-frequent-words/", difficulty: "Medium", category: "Heap" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/", difficulty: "Hard", category: "Heap" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, amazon50.id])

  await addProblem({ name: "Task Scheduler", link: "https://leetcode.com/problems/task-scheduler/", difficulty: "Medium", category: "Heap" },
    [neetcode150.id, striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Design Twitter", link: "https://leetcode.com/problems/design-twitter/", difficulty: "Medium", category: "Heap" },
    [neetcode150.id])

  await addProblem({ name: "IPO", link: "https://leetcode.com/problems/ipo/", difficulty: "Hard", category: "Heap" },
    [neetcode150.id])

  await addProblem({ name: "Merge K Sorted Arrays", link: "https://leetcode.com/problems/merge-k-sorted-lists/", difficulty: "Hard", category: "Heap" },
    [striverssde.id, google50.id, amazon50.id])

  // ── GRAPHS ───────────────────────────────────────────────────────────────
  await addProblem({ name: "Number of Islands", link: "https://leetcode.com/problems/number-of-islands/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, striverssde.id, graph40.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Max Area of Island", link: "https://leetcode.com/problems/max-area-of-island/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id, amazon50.id])

  await addProblem({ name: "Clone Graph", link: "https://leetcode.com/problems/clone-graph/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, striverssde.id, graph40.id, google50.id])

  await addProblem({ name: "Walls and Gates", link: "https://leetcode.com/problems/walls-and-gates/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, graph40.id])

  await addProblem({ name: "Rotting Oranges", link: "https://leetcode.com/problems/rotting-oranges/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id, amazon50.id, google50.id])

  await addProblem({ name: "Pacific Atlantic Water Flow", link: "https://leetcode.com/problems/pacific-atlantic-water-flow/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, striverssde.id, graph40.id])

  await addProblem({ name: "Surrounded Regions", link: "https://leetcode.com/problems/surrounded-regions/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id])

  await addProblem({ name: "Course Schedule", link: "https://leetcode.com/problems/course-schedule/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, striverssde.id, graph40.id, amazon50.id, google50.id])

  await addProblem({ name: "Course Schedule II", link: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id, google50.id])

  await addProblem({ name: "Graph Valid Tree", link: "https://leetcode.com/problems/graph-valid-tree/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, graph40.id])

  await addProblem({ name: "Number of Connected Components in an Undirected Graph", link: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, blind75.id, graph40.id])

  await addProblem({ name: "Redundant Connection", link: "https://leetcode.com/problems/redundant-connection/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id])

  await addProblem({ name: "Word Ladder", link: "https://leetcode.com/problems/word-ladder/", difficulty: "Hard", category: "Graphs" },
    [neetcode150.id, striverssde.id, graph40.id, google50.id, amazon50.id])

  await addProblem({ name: "Alien Dictionary", link: "https://leetcode.com/problems/alien-dictionary/", difficulty: "Hard", category: "Graphs" },
    [neetcode150.id, blind75.id, graph40.id, google50.id])

  await addProblem({ name: "Dijkstra's Shortest Path", link: "https://leetcode.com/problems/network-delay-time/", difficulty: "Medium", category: "Graphs" },
    [striverssde.id, graph40.id, google50.id])

  await addProblem({ name: "Minimum Spanning Tree (Kruskal)", link: "https://leetcode.com/problems/min-cost-to-connect-all-points/", difficulty: "Medium", category: "Graphs" },
    [striverssde.id, graph40.id])

  await addProblem({ name: "Flood Fill", link: "https://leetcode.com/problems/flood-fill/", difficulty: "Easy", category: "Graphs" },
    [striverssde.id, graph40.id, amazon50.id])

  await addProblem({ name: "Bipartite Graph Check", link: "https://leetcode.com/problems/is-graph-bipartite/", difficulty: "Medium", category: "Graphs" },
    [striverssde.id, graph40.id])

  await addProblem({ name: "Topological Sort", link: "https://leetcode.com/problems/course-schedule-ii/", difficulty: "Medium", category: "Graphs" },
    [striverssde.id, graph40.id])

  await addProblem({ name: "Swim in Rising Water", link: "https://leetcode.com/problems/swim-in-rising-water/", difficulty: "Hard", category: "Graphs" },
    [neetcode150.id, graph40.id])

  await addProblem({ name: "Cheapest Flights Within K Stops", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", difficulty: "Medium", category: "Graphs" },
    [neetcode150.id, graph40.id, amazon50.id])

  // ── DYNAMIC PROGRAMMING ──────────────────────────────────────────────────
  await addProblem({ name: "Climbing Stairs", link: "https://leetcode.com/problems/climbing-stairs/", difficulty: "Easy", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Min Cost Climbing Stairs", link: "https://leetcode.com/problems/min-cost-climbing-stairs/", difficulty: "Easy", category: "Dynamic Programming" },
    [neetcode150.id, dp50.id])

  await addProblem({ name: "House Robber", link: "https://leetcode.com/problems/house-robber/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, amazon50.id])

  await addProblem({ name: "House Robber II", link: "https://leetcode.com/problems/house-robber-ii/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id])

  await addProblem({ name: "Longest Palindromic Subsequence", link: "https://leetcode.com/problems/longest-palindromic-subsequence/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id])

  await addProblem({ name: "Decode Ways", link: "https://leetcode.com/problems/decode-ways/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, amazon50.id])

  await addProblem({ name: "Coin Change", link: "https://leetcode.com/problems/coin-change/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, amazon50.id, google50.id])

  await addProblem({ name: "Maximum Product Subarray", link: "https://leetcode.com/problems/maximum-product-subarray/", difficulty: "Medium", category: "Dynamic Programming" },
    [dp50.id])

  await addProblem({ name: "Word Break", link: "https://leetcode.com/problems/word-break/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, google50.id, amazon50.id])

  await addProblem({ name: "Longest Increasing Subsequence", link: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Partition Equal Subset Sum", link: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id, amazon50.id])

  await addProblem({ name: "Unique Paths", link: "https://leetcode.com/problems/unique-paths/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, google50.id])

  await addProblem({ name: "Unique Paths II", link: "https://leetcode.com/problems/unique-paths-ii/", difficulty: "Medium", category: "Dynamic Programming" },
    [striverssde.id, dp50.id])

  await addProblem({ name: "Minimum Path Sum", link: "https://leetcode.com/problems/minimum-path-sum/", difficulty: "Medium", category: "Dynamic Programming" },
    [striverssde.id, dp50.id, amazon50.id])

  await addProblem({ name: "Jump Game", link: "https://leetcode.com/problems/jump-game/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id])

  await addProblem({ name: "Jump Game II", link: "https://leetcode.com/problems/jump-game-ii/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id])

  await addProblem({ name: "Longest Common Subsequence", link: "https://leetcode.com/problems/longest-common-subsequence/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, striverssde.id, dp50.id, google50.id])

  await addProblem({ name: "Edit Distance", link: "https://leetcode.com/problems/edit-distance/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id, google50.id, amazon50.id])

  await addProblem({ name: "0/1 Knapsack", link: "https://leetcode.com/problems/partition-equal-subset-sum/", difficulty: "Medium", category: "Dynamic Programming" },
    [striverssde.id, dp50.id])

  await addProblem({ name: "Target Sum", link: "https://leetcode.com/problems/target-sum/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id, amazon50.id])

  await addProblem({ name: "Interleaving String", link: "https://leetcode.com/problems/interleaving-string/", difficulty: "Medium", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id, google50.id])

  await addProblem({ name: "Distinct Subsequences", link: "https://leetcode.com/problems/distinct-subsequences/", difficulty: "Hard", category: "Dynamic Programming" },
    [neetcode150.id, striverssde.id, dp50.id])

  await addProblem({ name: "Burst Balloons", link: "https://leetcode.com/problems/burst-balloons/", difficulty: "Hard", category: "Dynamic Programming" },
    [neetcode150.id, dp50.id, google50.id])

  await addProblem({ name: "Regular Expression Matching", link: "https://leetcode.com/problems/regular-expression-matching/", difficulty: "Hard", category: "Dynamic Programming" },
    [neetcode150.id, blind75.id, dp50.id, google50.id])

  await addProblem({ name: "Matrix Chain Multiplication", link: "https://leetcode.com/problems/minimum-score-triangulation-of-polygon/", difficulty: "Medium", category: "Dynamic Programming" },
    [striverssde.id, dp50.id])

  // ── BACKTRACKING ─────────────────────────────────────────────────────────
  await addProblem({ name: "Subsets", link: "https://leetcode.com/problems/subsets/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, amazon50.id, google50.id])

  await addProblem({ name: "Subsets II", link: "https://leetcode.com/problems/subsets-ii/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id])

  await addProblem({ name: "Combination Sum", link: "https://leetcode.com/problems/combination-sum/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, amazon50.id, google50.id])

  await addProblem({ name: "Combination Sum II", link: "https://leetcode.com/problems/combination-sum-ii/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id])

  await addProblem({ name: "Permutations", link: "https://leetcode.com/problems/permutations/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Permutations II", link: "https://leetcode.com/problems/permutations-ii/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id])

  await addProblem({ name: "Word Search", link: "https://leetcode.com/problems/word-search/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, blind75.id, striverssde.id, backtracking20.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Word Search II", link: "https://leetcode.com/problems/word-search-ii/", difficulty: "Hard", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, google50.id])

  await addProblem({ name: "N Queens", link: "https://leetcode.com/problems/n-queens/", difficulty: "Hard", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, google50.id])

  await addProblem({ name: "N Queens II", link: "https://leetcode.com/problems/n-queens-ii/", difficulty: "Hard", category: "Backtracking" },
    [striverssde.id, backtracking20.id])

  await addProblem({ name: "Sudoku Solver", link: "https://leetcode.com/problems/sudoku-solver/", difficulty: "Hard", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, google50.id])

  await addProblem({ name: "Letter Combinations of a Phone Number", link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, amazon50.id, google50.id, meta50.id])

  await addProblem({ name: "Palindrome Partitioning", link: "https://leetcode.com/problems/palindrome-partitioning/", difficulty: "Medium", category: "Backtracking" },
    [neetcode150.id, striverssde.id, backtracking20.id, amazon50.id])

  await addProblem({ name: "Rat in a Maze", link: "https://leetcode.com/problems/unique-paths-iii/", difficulty: "Hard", category: "Backtracking" },
    [striverssde.id, backtracking20.id])

  // ── MATRIX ───────────────────────────────────────────────────────────────
  await addProblem({ name: "Set Matrix Zeroes", link: "https://leetcode.com/problems/set-matrix-zeroes/", difficulty: "Medium", category: "Matrix" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Spiral Matrix", link: "https://leetcode.com/problems/spiral-matrix/", difficulty: "Medium", category: "Matrix" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Rotate Image", link: "https://leetcode.com/problems/rotate-image/", difficulty: "Medium", category: "Matrix" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Search a 2D Matrix II", link: "https://leetcode.com/problems/search-a-2d-matrix-ii/", difficulty: "Medium", category: "Matrix" },
    [striverssde.id, amazon50.id, google50.id])

  await addProblem({ name: "Game of Life", link: "https://leetcode.com/problems/game-of-life/", difficulty: "Medium", category: "Matrix" },
    [neetcode150.id, striverssde.id, google50.id])

  // ── BINARY / BIT MANIPULATION ─────────────────────────────────────────────
  await addProblem({ name: "Number of 1 Bits", link: "https://leetcode.com/problems/number-of-1-bits/", difficulty: "Easy", category: "Binary" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Counting Bits", link: "https://leetcode.com/problems/counting-bits/", difficulty: "Easy", category: "Binary" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Reverse Bits", link: "https://leetcode.com/problems/reverse-bits/", difficulty: "Easy", category: "Binary" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Missing Number", link: "https://leetcode.com/problems/missing-number/", difficulty: "Easy", category: "Binary" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, microsoft50.id])

  await addProblem({ name: "Sum of Two Integers", link: "https://leetcode.com/problems/sum-of-two-integers/", difficulty: "Medium", category: "Binary" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Single Number", link: "https://leetcode.com/problems/single-number/", difficulty: "Easy", category: "Binary" },
    [neetcode150.id, striverssde.id, amazon50.id])

  await addProblem({ name: "Power of Two", link: "https://leetcode.com/problems/power-of-two/", difficulty: "Easy", category: "Binary" },
    [striverssde.id, amazon50.id])

  await addProblem({ name: "XOR Queries of a Subarray", link: "https://leetcode.com/problems/xor-queries-of-a-subarray/", difficulty: "Medium", category: "Binary" },
    [striverssde.id])

  // ── INTERVALS ────────────────────────────────────────────────────────────
  await addProblem({ name: "Insert Interval", link: "https://leetcode.com/problems/insert-interval/", difficulty: "Medium", category: "Intervals" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Merge Intervals", link: "https://leetcode.com/problems/merge-intervals/", difficulty: "Medium", category: "Intervals" },
    [neetcode150.id, blind75.id, striverssde.id, amazon50.id, google50.id, meta50.id, microsoft50.id])

  await addProblem({ name: "Non-overlapping Intervals", link: "https://leetcode.com/problems/non-overlapping-intervals/", difficulty: "Medium", category: "Intervals" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Meeting Rooms", link: "https://leetcode.com/problems/meeting-rooms/", difficulty: "Easy", category: "Intervals" },
    [blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Meeting Rooms II", link: "https://leetcode.com/problems/meeting-rooms-ii/", difficulty: "Medium", category: "Intervals" },
    [blind75.id, striverssde.id, amazon50.id, google50.id, microsoft50.id])

  await addProblem({ name: "Minimum Interval to Include Each Query", link: "https://leetcode.com/problems/minimum-interval-to-include-each-query/", difficulty: "Hard", category: "Intervals" },
    [neetcode150.id])

  // ── TRIE ─────────────────────────────────────────────────────────────────
  await addProblem({ name: "Implement Trie", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", difficulty: "Medium", category: "Trie" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id, microsoft50.id])

  await addProblem({ name: "Design Add and Search Words Data Structure", link: "https://leetcode.com/problems/design-add-and-search-words-data-structure/", difficulty: "Medium", category: "Trie" },
    [neetcode150.id, blind75.id, striverssde.id])

  await addProblem({ name: "Word Search II", link: "https://leetcode.com/problems/word-search-ii/", difficulty: "Hard", category: "Trie" },
    [neetcode150.id, blind75.id, striverssde.id, google50.id])

  await addProblem({ name: "Maximum XOR of Two Numbers", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", difficulty: "Medium", category: "Trie" },
    [striverssde.id])

  console.log("Seeding complete! All problems inserted.")

}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())