---
layout: post
title: Leetcode Priority Queue Problems With JavaScript
description: I found a secret that makes these problems much easier!
---
{: .large}
When completing the Leetcode daily challenge for last month, there were quite a few problems where using a priority queue was the optimal solution, but, JavaScript does not have heap or priority queue data structures built into it. When I went to implement my own priority queue class, I learned this secret that made everything much easier:

Trying to declare a PriorityQueue class errors out on Leetcode because they have not only that but also MinPriorityQueue and MaxPriorityQueue implemented for you to use. At the time I couldn't find the documentation for this, but, I just found [this link](https://support.leetcode.com/hc/en-us/articles/360011833974-What-are-the-environments-for-the-programming-languages-) that details the environments for every language on Leetcode.

If you are trying to solve one of these problems, you might just need the .enqueue(), .dequeue(), and .isEmpty() methods. But, the documentation for the version of datastructures-js/priority-queue that they are using is available [here](https://github.com/datastructures-js/priority-queue/blob/12b3e407f2c2b4470dbd12540fa4d1c451d288e4/README.md#enqueueelement-priority) if you end up needing more than that.

The environment for JS also includes [datastructures-js/queue](https://github.com/datastructures-js/queue/blob/fc8a23191093b51faa43238d67ed159bd6e33e0d/README.md) as well as [Lodash](https://lodash.com/docs/4.17.15) if you want to use a regular queue or any of the Lodash utility functions.
