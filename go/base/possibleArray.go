package main

import (
	"fmt"
	// "strings"
	// "errors"
	// "time"
)


func appendList(list []int,n int) (bool,[]int){
	var flag bool = false
	if len(list)>0 {
		if list[len(list)-1]+1 == n {
			nl := append(list[0:],n)
			flag = true
			return flag, nl
		}
	}
	return flag, nil
}

func isPossible(nums []int) bool {
    var ar [0]*[]int 
	possible := true
	
	for _,n := range nums {
		var canAppend bool = false
		for i,p := range ar{
            if p!= nil && len(*p) > 0  {
				suc,list := appendList(*p,n)
				if suc && list != nil {
					ar[i] = &list
					canAppend = suc
					break;
				}
			}
		}
		if !canAppend {
			var sli = []int{n}
			ar = append(ar[0:],&sli)
		}
	}
	
	for _,p := range ar {
		if len(*p) < 3 {
			possible = false
			break
		}
	}
	
	return possible
}


func main() {
	nums1 := [4]int {3, 4, 6, 5}
	flag := isPossible(nums1)
	fmt.Println("possible",flag)
}
