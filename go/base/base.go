package main

import (
	"fmt"
	// "strings"
	// "errors"
	// "time"
)

/*
	fmt.Printf

	%v 输出结构体 {10 30}
	%+v 输出结构体显示字段名 {one:10 tow:30}
	%#v 输出结构体源代码片段 main.Point{one:10, tow:30}
	%T 输出值的类型			 main.Point
	%t 输出格式化布尔值		 true
	%d`输出标准的十进制格式化 100
	%b`输出标准的二进制格式化 99 对应 1100011
	%c`输出定整数的对应字符  99 对应 c
	%x`输出十六进制编码  99 对应 63
	%f`输出十进制格式化  99 对应 63
	%e`输出科学技科学记数法表示形式  123400000.0 对应 1.234000e+08
	%E`输出科学技科学记数法表示形式  123400000.0 对应 1.234000e+08
	%s 进行基本的字符串输出   "\"string\""  对应 "string"
	%q 源代码中那样带有双引号的输出   "\"string\""  对应 "\"string\""
	%p 输出一个指针的值   &jgt 对应 0xc00004a090
	% 后面使用数字来控制输出宽度 默认结果使用右对齐并且通过空格来填充空白部分
	%2.2f  指定浮点型的输出宽度 1.2 对应  1.20
	%*2.2f  指定浮点型的输出宽度对齐，使用 `-` 标志 1.2 对应  *1.20
*/

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

func switchFallthrough(grade string) {
	fmt.Printf("你的等级是 %s\n", grade)
	switch {
	case grade == "A":
		fmt.Printf("case 优秀!\n")
		fallthrough
	case grade == "B", grade == "C":
		fmt.Printf("case 良好\n")
	case grade == "D":
		fmt.Printf("case 及格\n")
	case grade == "F":
		fmt.Printf("case 不及格\n")
	default:
		fmt.Printf("case 差\n")
	}
}
func switchType() {
	// switch 语句还可以被用于 type-switch 来判断某个 interface 变量中实际存储的变量类型。
	var x interface{}
	//  x,y := "Daniel","hello"

	switch i := x.(type) {
	case nil:
		fmt.Printf(" x 的类型 :%T", i)
	case int:
		fmt.Printf("x 是 int 型")
	case float64:
		fmt.Printf("x 是 float64 型")
	case func(int) float64:
		fmt.Printf("x 是 func(int) 型")
	case bool, string:
		fmt.Printf("x 是 bool 或 string 型")
	default:
		fmt.Printf("未知型")
	}
}

func loop() {

	var b = 15
	var a int
	numbers := [6]int{1, 2, 3, 4, 5}

	fmt.Println("=== for a++  ===")
	for a := 0; a < 10; a++ {
		fmt.Printf("a:%d,", a)
	}
	fmt.Println("")
	fmt.Println("=== a < b ===")
	for a < b {
		a++
		fmt.Printf("a:%d,", a)
	}
	fmt.Println("")
	fmt.Println("=== range ===")
	for i, x := range numbers {
		fmt.Printf("number[%d]= %d,", i, x)
	}

}

func main() {
	fmt.Println("====== var types ======")
	var b bool = true
	var n int = 1
	var n1 uint16 = 5555
	var f32 float32 = 33.333
	var s string = "hello,daniel"
	var c = 22
	const scon = "const"
	const icon = 55
	fmt.Println(b, n, n1, f32, s, c, scon, icon)

	fmt.Println("====== type transfer ======")
	var f2i = int(44)
	var i2f = float32(44)
	fmt.Println(f2i, i2f)

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

	fmt.Println("====== switch case ======")
	// fallthrough：Go里面switch默认相当于每个case最后带有break，
	// 匹配成功后不会自动向下执行其他case，而是跳出整个switch, 但是可以使用fallthrough强制执行后面的case代码。
	switchFallthrough("D")
	fmt.Println("---fallthrough: ")
	switchFallthrough("A")
	fmt.Println("====== switchType ======")
	switchType()

	fmt.Println("====== loop ======")
	loop()
}
