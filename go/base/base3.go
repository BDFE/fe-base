package main

import (
	"fmt"
	// "reflect"
	// "errors"
	// "time"
)

func mapTest() {
	fmt.Println("===== map test ======")

	kvs := map[string]string{"a": "apple", "b": "banana"}
	kvs["c"] = "cccc"
	kvs["d"] = "daniel"
	v, invalid := kvs["a"]
	fmt.Println(kvs)
	fmt.Printf("value:%s, invalid=%t \n", v, invalid)

}
func rangeTest() {
	fmt.Println("===== range test ======")

	arr := []int{1, 2, 3}
	for i, v := range arr {
		fmt.Printf("arr[%d]=%d \n", i, v)
	}

	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	//range也可以用来枚举Unicode字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）本身。
	for i, c := range "hello" {
		fmt.Printf("%d -> %c\n", i, c)
	}
}

type Phone interface {
	call()
}

type NokiaPhone struct {
}

func (nokiaPhone NokiaPhone) call() {
	fmt.Println("I am Nokia, I can call you!")
}

type IPhone struct {
}

func (iPhone IPhone) call() {
	fmt.Println("I am iPhone, I can call you!")
}

func interfaceTest() {
	fmt.Println("===== interface test ======")
	var phone Phone
	phone = new(NokiaPhone)
	phone.call()
	phone = new(IPhone)
	phone.call()
}

func selectTest() {
	fmt.Println("===== select test ======")

	var c1, c2, c3 chan int
	var i1, i2 int
	select {
	case i1 = <-c1:
		fmt.Printf("received ", i1, " from c1\n")
	case c2 <- i2:
		fmt.Printf("sent ", i2, " to c2\n")
	case i3, ok := (<-c3): // same as: i3, ok := <-c3
		if ok {
			fmt.Printf("received ", i3, " from c3\n")
		} else {
			fmt.Printf("c3 is closed\n")
		}
	default:
		fmt.Printf("no communication\n")
	}
}

func main() {
	mapTest()
	rangeTest()
	interfaceTest()
	selectTest()
}
