/* boolean */
let isDone: boolean = false;

/* number */
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

/* string */
let myName: string = 'Tom';
let myAge: number = 25;

let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;

/* void */
function alertName(): void {
    alert("Hello world");
}

/* null & undefined */
let u: undefined = undefined;
let n: null = null;

// void 与 undefined / null 的区别
let unusable: void = undefined; // void 只能赋值 undefined 和 null

let num: number = undefined; // 不报错

/* any */
// 未声明类型的变量均为 any 类型
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7;

/* 类型推论 type inference */
let myFN = 'seven';
// 报错
// myFN = 7; // 推论出来是 string 类型
// 定义时没有赋值，会推断成 any 而且完全不被类型检查

/* 联合类型 Union Types */
let unionType: string | number;
unionType = 'seven';
unionType = 7;
// 报错
// unionType = true;

// 只能访问此联合类型的所有类型里共有的属性或方法
function getLength(value: string | number): string {
    return value.toString();
}

// 报错
// function getLength(value: string | number): number {
//     return value.length; // 不是共有属性或方法
// }