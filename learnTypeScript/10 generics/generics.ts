/* 泛型 */
// 泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
// 上面代码的缺陷是 没有准确的定义返回值的类型 Array<any>

/* 使用泛型 */
function createArray2<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray2<string>(3, 'x'); // ['x', 'x', 'x']
// 使用 T 来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用
// 调用时指定具体类型为 string
// 当然也可以不手动指定，而让类型推论自动推算出来
createArray2(3, 'x'); // ['x', 'x', 'x']

/* 多个类型参数 */
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]

/* 泛型约束 */
// 在函数内部使用泛型变量的时候，由于不知道是哪种类型，所以不能随意使用它的属性或方法
// 报错
// function loggingIdentity<T>(arg: T): T {
//     console.log(arg.length);
//     return arg;
// }

// 此时需要对泛型进行约束
interface Lengthwise {
    length: number;
}

function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

/* 泛型接口 */
interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>;
}

let createArray3: CreateArrayFunc;
createArray3 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray3(3, 'x'); // ['x', 'x', 'x']

// 将泛型参数提前到接口名上
interface CreateArrayFunc2<T> {
    (length: number, value: T): Array<T>;
}

let createArray4: CreateArrayFunc2<any>;
createArray4 = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray4(3, 'x'); // ['x', 'x', 'x']

/* 泛型类 */
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y
};

/* 泛型参数的默认类型 */
// 在 ts 2.3 以后，可以为泛型中的类型参数指定默认类型
// 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，默认类型会起作用
function createArray5<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
