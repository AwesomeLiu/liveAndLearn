/* 类型断言 */
/* 语法 */
// [1] 值 as 类型
// [2] <类型>值

// 在 tsx 中必须使用 [1]

// 形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode
// 在 ts 中除了表示类型断言之外，也可以表示一个泛型

// 所以建议统一使用 [1]

/* 用途 */
// [1] 将一个联合类型断言为其中一个类型
interface Cat {
    name: string;
    run(): void;
}

interface Fish {
    name: string;
    swim(): void;
}

function isFish(animal: Cat | Fish): boolean {
    return typeof (animal as Fish).swim === "function";
}
// 类型断言只能 [欺骗] 编译器，无法避免运行时的错误，请勿滥用

// [2] 将一个父类断言为更加具体的子类
class ApiError extends Error {
    code: number = 0;
}

class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    return typeof (error as ApiError).code === "number";
}
// 此处使用 instanceof 更合适，因为 ApiError 是一个 JavaScript 的类
function isApiError2(error: Error) {
    return error instanceof ApiError;
}

// 但 ApiError 不是类，而是接口的情况下就无法使用 instanceof 进行判断
interface ApiError2 extends Error {
    code: number;
}

interface HttpError2 extends Error {
    statusCode: number;
}

function isApiError3(error: Error) {
    return typeof (error as ApiError2).code === "number";
    // return error instanceof ApiError2; // 报错
}

// [3] 将任何一个类型断言 any
(window as any).foo = 1;
// 将一个变量断言为 any 是解决 ts 中类型问题的最后一个手段
// 不要滥用 as any，但也不能否定它的作用

// [4] 将 any 断言为一个具体的类型
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Dog {
    name: string;
    run(): void;
}

const tom = getCacheData("tom") as Dog; // 将 getCacheData 断言为 Dog 类型
tom.run();

/* 类型断言的限制 */
// 并不是任何一个类型都可以被断言为任何另一个类型
interface Animal {
    name: string;
}

interface Mouse {
    name: string;
    run(): void;
}

let jerry: Mouse = {
    name: "jerry",
    run: () => console.log("run")
};

let animal: Animal = jerry;
// Mouse 包含了 Animal 中的所有属性，并有一个额外的方法
// ts 不关心它们之间定义时是什么关系，只会看最终结构有什么关系
// ts 会认为与 Cat extends Animal 等价，即 Animal 兼容 Cat

function testAnimal(amimal: Animal) {
    return (animal as Mouse); // 父类可以被断言为子类
}
function testMouse(mouse: Mouse) {
    return (mouse as Animal); // 子类可以被断言为父类
}

// 综上，要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可

/* 双重断言 */
// as any as Foo

function testCat(cat: Cat) {
    // return (cat as Fish); // 报错
    return (cat as any as Fish);
}

// 使用双重断言，可以打破 [要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可] 的限制
// 可以将任何一个类型断言为任何另一个类型
// [!!!] 双重断言大部分情况下都是错误的，慎用

/* 类型断言 vs 类型转换 */
// 类型断言只会影响 ts 编译时的类型，类型断言语句在编译结果中会被删除

/* 类型断言 vs 类型声明 */
// animal 断言为 cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可
// animal 赋值给 tom，则需要满足 Cat 兼容 Animal
// 类型声明比类型断言更加严格。为了增加代码的质量，最好优先使用类型声明，这也比类型断言的 as 语法更加优雅

/* 类型断言 vs 泛型 */
function getCacheData2<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat2 {
    name: string;
    run(): void;
}

const tom2 = getCacheData2<Cat2>("tom");
tom2.run();

// 通过给 getCacheData 函数添加一个泛型 <T>
// 我们可以更加规范的实现对 getCacheData 返回值的约束，同时也去掉了 any，是最优的一个解决方案