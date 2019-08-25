package main

import "fmt"

const MAX int = 3

func main() {
   var i int
   var ptr [MAX]*int;

//    for  i = 0; i < MAX; i++ {
//       ptr[i] = &a[i] /* 整数地址赋值给指针数组 */
//    }

   for  i = 0; i < MAX; i++ {
	  fmt.Printf("a[%d]=\n", i )
	  if ptr[i] != nil {
		fmt.Printf("%d\n",*ptr[i] )
	  } else {
		fmt.Printf("nil")
	  }
   }
}