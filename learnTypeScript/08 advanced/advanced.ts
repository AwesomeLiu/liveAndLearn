/* 类型别名 */
// 类型别名用来给一个类型起新名字
// 类型别名常用语联合类型
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}

/* 字符串字面量类型 */
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {}

handleEvent(document.getElementById("hello"), "scroll");
// 报错
// handleEvent(document.getElementById("world"), "dblclick");

// 类型别名与字符串字面量类型都是使用 type 进行定义

/* 元组 Tuple */
// 数组合并了相同类型的对象，而元组合并了不同类型的对象

let tom: [string, number] = ["Tom", 25];

// 可以只赋值其中一项
let tom2: [string, number];
tom2[0] = "Tom";

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
let tom3: [string, number];
// 报错
// tom3 = ["Tom"];

// 当添加越界的元素时，它的类型会被限制位元组中每个类型的联合类型
let tom4: [string, number];
tom4 = ["Tom", 25];
// 报错
// tom4.push(true);

/* 枚举 */
enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射

// 手动赋值
enum Days2 { Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat };
// 未手动赋值的枚举项会接着上一个枚举项递增
console.log(Days2["Thu"] === 4); // true

// 未手动赋值的枚举项与手动赋值的重复了，ts 是不会察觉到的
enum Days3 { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };
console.log(Days3["Sun"] === 3); // true
console.log(Days3["Wed"] === 3); // true
console.log(Days3[3] === "Sun"); // false
console.log(Days3[3] === "Wed"); // true
// 之后的会覆盖之前的值

// 手动赋值的枚举项可以不是数字，需要使用类型断言来让 tsc 无视类型检查
enum Days4 { Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S" };

// 手动赋值的枚举项也可以是小数或负数，未赋值的项仍是 1 步长递增
enum Days5 { Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat };
console.log(Days["Thu"]); // 4.5

// 枚举项有两种类型：常数项 (constant member) 和计算所得项 (computed member)
enum Color { Red, Green, Blue = "blue".length };
// 但如果紧接在计算所得项后面的是未手动赋值的项，那么会因为无法获得初始值而报错
// 报错
// enum Color2 { Red = "red".length, Green, Blue };

// 当满足以下条件时，枚举成员被当作是常数
// 1. 不具有初始化函数并且之前的枚举成员是常数
// 2. 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 ts 表达式的子集，它可以在编译阶段求值
// // 当一个表达式满足下面条件之一时，它就是一个常数枚举表达式
// // // 数字字面量
// // // 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
// // // 带括号的常数枚举表达式
// // // [+] [-] [~] 一元运算符应用于常数枚举表达式
// // // [+] [-] [*] [/] [%] [<<] [>>] [&] [|] [^] 二元运算符，常数枚举表达式作为其中一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity 则会在编译阶段报错
// 
// 所有其他情况的枚举成员被当作是需要计算得出的值

// 常数枚举
const enum Directions { Up, Down, Left, Right };
// 常数枚举与普通枚举的区别是，会在编译阶段被删除，并且不能包含计算成员

// 外部枚举 Ambient Enums
declare enum Directions2 { Up, Down, Left, Right };
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除
