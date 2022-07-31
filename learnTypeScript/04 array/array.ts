let fibonacci: number[] = [1, 2, 3, 4, 5];
// 报错
// let fibonacci2: number[] = [1, '2'， 3, true, null];

/* 数组泛型 Array Generic */
let fibonacci3: Array<number> = [1, 2, 3, 4, 5];

/* 用接口表示 */
interface NumberArray {
    [index: number]: number;
}
let fibonacci4: NumberArray = [1, 2, 3, 4, 5];

/* 类数组 Array-like Object */
// 报错
// arguments 实际上是一个类数组，不能用普通数组来描述
// function sum() {
//     let args: number[] = arguments;
// }

// 用接口的方式描述
function sum2() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}

// 使用内置类型定义
function sum3() {
    let args: IArguments = arguments;
}

// 实际上 IArguments 
// interface IArguments {
//     [index: number]: number;
//     length: number;
//     callee: Function;
// }