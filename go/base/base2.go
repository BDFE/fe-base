package main

import (
	"fmt"
	"reflect"
	// "errors"
	// "time"
)

func arrayTest() {
	fmt.Println("====== arr ======")

	var ar1 [10]int
	var ar2 = [4]int{1, 2, 3, 4}
	var ar3 = [...]float32{1.1, 2, 5, 2.2}
	fmt.Println(ar1)
	fmt.Println(ar2)
	fmt.Println(ar3)
	first := ar3[2]
	t := reflect.TypeOf(first)
	fmt.Println(len(ar3), first, t)

}
func sliceTest() {
	fmt.Println("====== slice arr ======")
	sli := []int{1, 2, 3}
	fmt.Println(sli, "\n")

	var arr = [11]int{0, 1, 2, 3, 4,  5, 6, 7, 8, 9, 10}
	var s1 = arr[4:]
	var s2 = arr[:7]
	var s3 = arr[4:7]
	fmt.Println(s1, s2, s3, "\n")

	var x = make([]int, 3, 5)
	fmt.Printf("len=%d cap=%d slice=%v\n", len(x), cap(x), x)

	slice := []int{1, 2, 3}
	var con = append(slice, 44, 55)
	fmt.Println("append:", slice, "\n", "con:", con, "\n")
	var arrs = make([]int, len(con), cap(con))
	copy(arrs, con)
	fmt.Println("copy con to arr", arrs)
}

func rangeTest() {

}
func pointer() {
	fmt.Println("====== pointer ======")
	var a int = 20 /* 声明实际变量 */
	var ip *int    /* 声明指针变量 */
	ip = &a        /* 指针变量的存储地址 */
	fmt.Printf("a 变量的地址是: %x\n", &a)
	/* 指针变量的存储地址 */
	fmt.Printf("ip 变量储存的指针地址: %x\n", ip)
	/* 使用指针访问值 */
	fmt.Printf("*ip 变量的值: %d\n", *ip)

	/* 空指针 */
	var ptr *int
	fmt.Printf("ptr 的值为 : %x\n", ptr)
}

type Books struct {
	title   string
	author  string
	subject string
	book_id int
	width   int
	height  int
}

func (r *Books) getArea() int { //为Book类型绑定Area的方法，*Book为指针引用可以修改传入参数的值
	res := r.width * r.height
	// fmt.Println("res",res)
	return res //方法归属于类型，不归属于具体的对象，声明该类型的对象即可调用该类型的方法
}

func changeBook(book *Books) {
	book.title = "book1_change"
}

func structTest() {
	fmt.Println("====== structTest ======")
	var book1 Books
	book1.title = "book1"
	book1.author = "zuozhe"
	book1.book_id = 1
	book1.width = 10
	book1.height = 30
	fmt.Println(book1)
	changeBook(&book1)
	fmt.Println(book1)
	a := book1.getArea()
	fmt.Printf("area:%d \r\n", a)
}

func main() {
	arrayTest()
	pointer()
	structTest()
	sliceTest()
	rangeTest()
}
