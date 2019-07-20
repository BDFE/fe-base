package main

import (
	"fmt"
	// "strings"
	// "errors"
	// "time"
)

func max(num1, num2 int) (int, string) {
	/* 定义局部变量 */
	var result int

	if num1 > num2 {
		result = num1
	} else {
		result = num2
	}
	return result, "sum"
}

func multi(args ...interface{}) {
	for _, arg := range args {
		fmt.Println(arg)
	}
}

func fn(i int, s string) string {
	var f float64
	var b bool
	fmt.Printf("%v %v %v %q\n", i, f, b, s)
	return "test"
}


func switchType ()  {
	var x interface{}
	//  x,y := "Daniel","hello"

	switch i := x.(type) {
	   case nil:  
		  fmt.Printf(" x 的类型 :%T",i)                
	   case int:  
		  fmt.Printf("x 是 int 型")                      
	   case float64:
		  fmt.Printf("x 是 float64 型")          
	   case func(int) float64:
		  fmt.Printf("x 是 func(int) 型")                      
	   case bool, string:
		  fmt.Printf("x 是 bool 或 string 型" )      
	   default:
		  fmt.Printf("未知型")    
	}   
}



func main() {
	// array := []string{"a", "b", "c"}

	// for i, value := range array {
	// 	fmt.Println(i, value)
	// }
	fmt.Println("====== var types ======")
	var b bool = true
	var n int = 1
	var n1 uint16 = 5555
	var fn float32 = 33.333
	var s string = "hello,daniel"
	var c = 22
	const CON = "const"
	fmt.Println(b, n, n1, fn, s,c,CON)

	fmt.Println("====== var assignment ======")
	var v1, v2 int = 1, 2
	v3, v4 := 33, 44
	fmt.Println(v1, v2, v3, v4)

	// 没有初始化就为零值
	var n3 int
	fmt.Println(n3)

	fmt.Println("====== for loop ======")
	for i := 1; i < 3; i++ {
		fmt.Println("for:", i)
	}
	sum, str := max(22, 33)
	fmt.Println("max:", sum, str)
	// fn(1, "daniel")
	fmt.Println("====== func  args range ======")
	multi('a', 10, false)
	
	fmt.Println("====== switchType ======")
	switchType()

}
