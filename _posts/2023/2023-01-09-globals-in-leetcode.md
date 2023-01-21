---
layout: post
title: Globals In Leetcode
description: A quick tip for solutions involving memoization.
---
{: .large}
Mostly so I never forget this is a thing you can do, here is a quick tip for some pretty specific Leetcode problems:

I don't really know why I didn't think this was a thing you could do, but, if you want to implement memoization in your solution to a problem, if you need to for whatever reason, you can just declare your hashmap outside of your function so it actually persists.

Obviously you can do that with helper functions, but, for some reason it didn't connect for me that you could do that with any binding. So, if you didn't think of that either, now you know!
