---
layout: post
title: 周末在家写了几个常用的排序算法
category: 算法
date: 2017-04-16 00:00:00
---

第一次手写算法，见笑。

## 快速排序

```
function QuikSort(arr, left, right){
  if(left >= right)
  {
    return ;
  }
  arr = Object(arr);
  var key = arr[left];
  var i = left;
  var j = right;
  // noprotect
  while (i < j) {
    while(i < j && arr[j] >= key){
      j --
    }
    arr[i] = arr[j];
    while (i < j && arr[i] <= key) {
      i ++;
    }
    arr[j] = arr[i];
  }
  arr[i] = key;
  QuikSort(arr, left, i - 1)
  QuikSort(arr, i + 1, right)
  return arr;
}

console.log(QuikSort([5,4,6,3,7,2,8], 0,6))
```


## 希尔排序

```
function ShellSort(arr) {
  arr = Object(arr);
  var len = arr.length;
  var inc = len;
  //noprotect
  while(inc>>=1) {
    for (var z = 0; z < inc; z++) {
      for (var i = z + inc; i <= len; i += inc ) {
        for (var j = z; j < len - i;  j += inc) {
          if (arr[j]> arr[j+inc]) {
            var tmp = arr [j];
            arr [j] = arr[j + inc];
            arr[j+inc] = tmp;
          }
        }
      }
    }
  }
  return arr;
}

console.log(ShellSort([65,12,34,55,12,33,2,1,4,2]))
```

## 桶排序

```
function BucketSort(arr) {
  var result = [];
  var bucket = [];
  for (var i = 0, len = arr.length; i < len; i ++) {
    if (!bucket[arr[i]]) bucket[arr[i]] = 0;
    bucket[arr[i]] ++;
  }
  for (var i = 0, len = bucket.length; i < len; i++) {
    if (bucket[i] || bucket[i] === 0) {
      for (var j = 0; j < bucket[i]; j ++) {
        result.push(i);
      }
    }
  }
  return result;
}

console.log(BucketSort([100,30,133,22,36,41]));
```

## 选择排序

```
function sort(arr) {
  arr = Object(arr);
  var m,tmp;
  for (var i = 0; i < arr.length; i ++) {
     m = i;
     for (var j = i + 1; j < arr.length; j ++) {
       m = arr[m] > arr[j] ? m : j;
     }
     tmp = arr[m];
     arr[m] = arr[i];
     arr[i] = tmp;
  }
  return arr;
}
console.log(sort([1,2,3,4]))
```

## 插入排序

```
function InsertionSort (arr) {
  arr = Object(arr);
  for (var i = 1, len = arr.length; i <= len; i ++) {
    for (var j = 0; j < i; j ++) {
      var tmp = arr[i];
      if (arr[i] < arr[j]) {
        for (var z = i; z > j; z --) {
          arr[z] = arr[z-1];
        }
        arr[j] = tmp;
      }
    }
  }
  return arr;
}

console.log(InsertionSort([55,6,3,4,1]));
```

## 冒泡排序
```
function BubbleSort (arr) {
  arr = Object(arr);
  var len = arr.length;
  for (var i = 1; i <= len; i ++) {
    for (var j = 0; j < len - i; j ++) {
      if (arr [j] > arr[j + 1]) {
        var tmp = arr [j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }
  return arr;
}

console.log(BubbleSort([23,56,12,50,4, 15, 4]));
```