---
layout: post
title: Disjoint Sets and Union Find
description: Another graphing problem already?
---
{: .large}
I guess this week's daily Leetcode problems is using a lot of data structures that I know about but have not had to code myself yet.

A disjoint set is just a collection of sets where every value is unique between all of the sets instead of just one.

Here's the class I used in today's problem so you can see a JavaScript implementation:

    class UnionFind {
        constructor(n) {
            this.id = new Array(n)
    
            for (let i = 0; i < n; i++) {
                this.id[i] = i
            }
        }
    
        find(u) {
            return this.id[u] === u ? u :
            (this.id[u] = this.find(this.id[u]))
        }
    
        union(u, v) {
            let i = this.find(u)
            let j = this.find(v)
    
            if (i > j) {
                this.id[i] = j
            } else {
                this.id[j] = [i]
            }
        }
    }
