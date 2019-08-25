package main

import (
	"fmt"
	// "strings"
	// "errors"
	// "time"
)

func maxNumber(nums1 []int, nums2 []int, k int) []int {
	var p1 int = 0
	var p2 int = 0
	var cnt int = 0
	cnt = len(nums1) + len(nums2)
	arr := make([]int, cnt, 10)
	res := make([]int, k, 10)

	for i := 0; i < cnt; i++ {
		if p1 < len(nums1) && p2 < len(nums2) {
			if nums1[p1] > nums2[p2] {
				arr[i] = nums1[p1]
				p1++
			} else {
				arr[i] = nums2[p2]
				p2++
			}
		} else {
			if p1 >= len(nums1) {
				arr[i] = nums2[p2]
				p2++
			} else {
				arr[i] = nums1[p1]
				p1++
			}
		}
	}
	fmt.Println("arr", arr, len(arr), k)

	var pt int
	for len(arr) >= k {
		n, sli := reduceLength(arr[0:], k)
		res[pt] = n
		arr = sli
		if(k>1){
			k--
			pt++
		}
		fmt.Println("for",k,n, sli)
	}
	return res
}

func reduceLength(arr []int, k int) (int, []int) {
	// fmt.Println("r")
	b := len(arr) - k + 1
	head := arr[:b]
	tail := arr[b:]
	mp := 0

	for i := 0; i < len(head); i++ {
		if head[mp] < head[i] {
			mp = i
		}
	}
	// fmt.Println("reduce",head,tail)

	return head[mp], append(head[mp+1:], tail...)
}

func main() {
	// fmt.Println("====== var types ======")
	nums1 := [4]int{3, 4, 6, 5}
	nums2 := [6]int{9, 1, 2, 5, 8, 3}
	ar3 := maxNumber(nums1[0:], nums2[0:], 5)
	fmt.Println(ar3)
	return ar3

}
