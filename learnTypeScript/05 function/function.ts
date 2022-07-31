/* 函数声明 Function Declaration */
function sum(x: number, y: number): number {
    return x + y;
}

// 不允许多参或少参
// 报错
// sum(1, 2, 3);
// sum(1);

/* 函数表达式 Function Expression */
let mySum = function (x: number, y: number): number {
    return x + y;
};
// 上述代码只对等号右侧的匿名函数进行了类型定义，然后通过赋值操作进行类型推论

// 手动添加类型
let mySum2: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
// ts 中的 => 用来表示函数的定义，左边是输入类型，用括号括起来，右边是输出类型
// es6 中的 => 是箭头函数

/* 用接口定义函数的形状 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}
// 采用函数表达式或接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变

/* 可选参数 */
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

// 可选参数后面不允许再出现必需参数
// 报错
// function buildName2(firstName?: string, lastName: string): string {
//     if (firstName) {
//         return firstName + " " + lastName;
//     } else {
//         return lastName;
//     }
// }

/* 参数默认值 */
function buildName3(firstName: string, lastName: string = "cat"): string {
    return firstName + " " + lastName;
}

// 此时不受 [可选参数后面不允许再出现必需参数] 的限制
function buildName4(firstName: string = "Tom", lastName: string): string {
    return firstName + " " + lastName;
}

/* 剩余参数 rest */
// 在 es6 中，可以使用 ...rest 获取剩余参数
function push(array: any[], ...items: any[]) {
    items.forEach(function (item) {
        array.push(item);
    });
}

/* 重载 overload */
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
function reverse(x: number | string): number | string {
    if (typeof x === "number") {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === "string") {
        return x.split('').reverse().join('');
    }
}

// 利用重载
function reverse2(x: number): number;
function reverse2(x: string): string;
function reverse2(x: number | string): number | string {
    if (typeof x === "number") {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === "string") {
        return x.split('').reverse().join('');
    }
}
// 重复定义多次函数，前几次均为函数定义，最后一次是函数实现
// ts 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面