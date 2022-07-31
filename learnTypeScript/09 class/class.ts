/* 类 */
// 类（Class）：定义了一件事物的抽象特点，包含属性和方法
// 对象（Object）：类的实例，通过 new 生成
// 面向对象（OOP）的三大特性：封装、继承、多态
// 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口
// 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
// 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应
// 存取器（getter & setter）：用以改变属性的读取和赋值行为
// 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质，如 public
// 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
// 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但可以实现多个接口

/* es6 中类的用法 */
// 使用 class 定义类
// 使用 constructor 定义构造函数
// 通过 new 生成实例
// 使用 extends 实现继承
// 子类中使用 super 来调用父类的构造函数和方法
// 使用 getter 和 setter 读取和改变属性的值
// 使用 static 修饰符修饰的方法称为静态方法，无需实例化，而是直接通过类来调用

/* es7 中类的用法 */
// es6 中实例的属性只能通过构造函数中的 this.xxx 来定义，es7 可以直接在类里定义
// 可以使用 static 定义一个静态属性

/* ts 中类的用法 */
// ts 可以使用三种访问修饰符（Access Modifiers），分别是 public / private / protected
// public 修饰的属性或方法是共有的，可以在任何地方被访问到，默认所有的属性和方法都是 public
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，和 private 类似，区别是它在子类中允许被访问

class Animal {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

let a = new Animal("Jerry");
console.log(a.name); // Jerry

a.name = "Tom";
console.log(a.name); // Tom

/*--- private ---*/
class Animal2 {
    private name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
        console.log(this.name); // 报错
    }
}

/*--- protected ---*/
class Animal3 {
    protected name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal3 {
    constructor(name: string) {
        super(name);
        console.log(this.name); // 正常运行
    }
}

/*--- private 构造函数 ---*/
class Animal4 {
    public name: string;
    private constructor(name: string) {
        this.name = name;
    }
}
// 报错
// class Fish extends Animal4 {
//     constructor(name: string) {
//         super(name);
//     }
// }
// 报错
// let b = new Animal4("Tom");

/*--- protectd 构造函数 ---*/
class Animal5 {
    public name: string;
    protected constructor(name: string) {
        this.name = name;
    }
}

class Mouse extends Animal5 {
    constructor(name: string) {
        super(name);
    }
}
// 报错
// let c = new Animal5("Jerry");

// 参数属性
class Animal6 {
    public constructor(public name: string) {

    }
}

// readonly
// 只允许出现在属性声明或索引签名或构造函数中
class Animal7 {
    readonly name: string;
    public constructor(name: string) {
        this.name = name;
    }
}

let d = new Animal7("Jack");
console.log(d.name); // Jack
// 报错
// d.name = "Tom";

// 如果 readonly 和其他访问修饰符同时存在，需写在其后面
class Animal8 {
    public constructor(public readonly name: string) {
        this.name = name;
    }
}

// 抽象类
// 抽象类不允许被实例化
abstract class Human {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }
    public abstract sayHi(): void;
}
// 报错
// let h = new Human("Lily");

// 抽象类中的抽象方法必须被子类实现
class Man extends Human {
    public sayHi() {
        console.log("hi");
    }
}

let lihua = new Man("lihua");

/* 类的类型 */
class Vehicle {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): string {
        return "the vehicle is running";
    }
}

let vehicle: Vehicle = new Vehicle("Benz");
console.log(vehicle.run());

/* 类实现接口 */
// implements
interface Alarm {
    alert(): void;
}

class Door {

}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log("SecurityDoor alert");
    }
}

class Car implements Alarm {
    alert() {
        console.log("Car alert");
    }
}

// 一个类可以实现多个接口
interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car2 implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }

    lightOn() {
        console.log('Car light on');
    }

    lightOff() {
        console.log('Car light off');
    }
}

// 接口继承接口
interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}

// 接口继承类
// 常见的面向对象语言中，接口是不能继承类的，但在 ts 中是可以的
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };

// 在声明 class Point 时，会创建一个名为 Point 的类，和一个名为 Point 的类型（实例的类型）
// Point3d 实际上继承的是类 Point 的实例的类型，即接口 Point3d 继承另一个接口 PointInstanceType
// PointInstanceType 相比于 Point 缺少了 constructor 方法
// 实例的类型不包括构造函数、静态属性或静态方法