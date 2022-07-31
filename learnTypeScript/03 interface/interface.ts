// 定义接口
interface Person {
    name: string;
    age: number;
}

// 实例
let tom: Person = {
    name: "Tom",
    age: 25
};

interface Person2 {
    name: string;
    age?: number; // 可选属性
}

interface Person3 {
    name: string;
    age?: number;
    [propName: string]: any; // 任意属性
}

// 一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// 报错
// interface Person4 {
//     name: string;
//     age?: number;
//     [propName: string]: string;
// }

interface Person5 {
    readonly id: number; // 只读属性 只能在创建时赋值，初始化后无法修改
    name: string;
    age?: number;
}
// 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候