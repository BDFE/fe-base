package main

import (
	"fmt"
	// "strings"
	// "errors"
	// "time"
)

func maxNumber(nums1 []int, nums2 []int, k int) []int {
    nums1 = append(nums1,nums2...)
    return nums1
}

func main() {
	fmt.Println("====== var types ======")
	nums1 := [4]int {3, 4, 6, 5}
    nums2 := [6]int {9, 1, 2, 5, 8, 3}
    s1 := nums1[0:]
    s2 := nums2[0:]

    ar := append(s1,s2...)
	// ar := maxNumber(nums1,nums2,5)
	fmt.Println(nums1,nums2,ar)

}
