// 多行字符串
console.log(`This is
multi-line string
test.`);

// 模板字符串
var name = "Ryan";
var age = 20;
console.log(`Hello, I'm ${name}, I'm ${age} years old.`);

// Array.splice()
var arr = ['Microsoft', 'Apple', 'Yahoo', 'AOL', 'Excite', 'Oracle'];
arr.splice(2, 3, 'Google', 'Facebook');
console.log(arr);
arr.splice(2, 2);
console.log(arr);
arr.splice(2, 0, 'Tumblr', 'Snapchat');
console.log(arr);

// Map具有的方法
var m1 = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]); // 通过二维数组创建
var m = new Map(); // 初始化一个空Map
m.set("Adam", 67); // 添加新的键值对
m.set("Bob", 59);
m.has("Adam"); // 判断是否存在key为"Adam"  true
m.get("Bob"); // 获取key为"Bob"的值  59
m.delete("Adam"); // 删除key为"Adam"的键值对

// Set具有的方法
var s1 = new Set(); // 初始化一个空Set
var s = new Set([1, 2, 3]); // 通过一维数组创建
s.add(4); // 添加元素到Set中
s.add(4); // 可以重复添加，但没有效果，因为key唯一，不允许重复
s.delete(3); // 删除元素

// for ... of 与 for ... in 的比较
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x in a) {
    console.log(x); // '0', '1', '2', 'name'
}
// for ... in 循环将把name包括在内，但Array的length属性却不包括在内
// for ... of 循环则完全修复了这些问题，它只循环集合本身的元素
var a = ['A', 'B', 'C'];
a.name = 'Hello';
for (var x of a) {
    console.log(x); // 'A', 'B', 'C'
}

// forEach方法
var a = ['A', 'B', 'C'];
a.forEach(function (element, index, array) {
    // element: 指向当前元素的值
    // index: 指向当前索引
    // array: 指向Array对象本身
    console.log(element); // 'A', 'B', 'C'
});
// Set.forEach(function (element, sameElement, set) {...});
// Map.forEach(function (value, key, map) {...});

// rest参数
function foo(a, b, ...rest) {
    console.log(rest);
}
foo(1, 2, 3, 4, 5); // 结果 [3, 4, 5]
foo(1); // 结果 []

// 一个最简单的高阶函数
function add(x, y, f) {
    return f(x) + f(y);
}

// Array.map()
var arr = [1, 2, 3, 4, 5];
arr.map(function (val) {
	return val * val;
}); // [1, 4, 9, 16, 25]

// Array.reduce()
arr.reduce(function (preVal, curVal) {
	return preVal + curVal;
}); // 15

// Array.filter()
arr.filter(function (val) {
	return val < 15;
}) // [1, 4, 9]

// Closure 闭包
var c = (function (x) {
	return x * x;
})(3);
console.log(c);
// 借助闭包封装一个私有变量
function create_counter(initial) {
	var x = initial || 0;
	return {
		inc: function () {
			x++;
			return x;
		}
	};
}
var c1 = create_counter();
c1.inc(); // 1
c1.inc(); // 2
c1.inc(); // 3

var c2 = create_counter(10);
c2.inc(); // 11
c2.inc(); // 12
c2.inc(); // 13

// 将多参数的函数变成单参数的函数
function make_pow(n) {
	return function (x) {
		return Math.pow(x, n);
	};
}
var pow2 = make_pow(2);
var pow3 = make_pow(3);
pow2(5); // 25
pow3(3); // 27

// Arrow Function 箭头函数
var obj = {
	birth: 1990,
	getAge: function () {
		var b = this.birth; // 1990
		var fn = () => new Date().getFullYear() - this.birth; // this指向obj对象
		return fn();
	}
};
obj.getAge(); // 27
// 用call()或者apply()调用箭头函数时，无法对this进行绑定，即传入的第一个参数被忽略
var obj = {
	birth: 1990,
	getAge: function (year) {
		var b = this.birth; // 1990
		var fn = (y) => y - this.birth; // this.birth仍是1990
		return fn.call({ birth: 2000 }, year);
	}
};
obj.getAge(2017); // 27

// generator
function* fib(max) {
	var
		t,
		a = 0,
		b = 1,
		n = 1;
	while (n <= max) {
		yield a;
		t = a + b;
		a = b;
		b = t;
		n++;
	}
	return a;
}
fib(5); // 与调用函数不同，fib(5)仅仅是创建一个generator对象，还没有执行
// next方法
var f = fib(5);
f.next(); // { value: 0, done: false }
f.next(); // { value: 1, done: false }
f.next(); // { value: 1, done: false }
f.next(); // { value: 2, done: false }
f.next(); // { value: 3, done: true }
// for ... of方法
for (var x of fib(5)) {
	console.log(x); // 0, 1, 1, 2, 3
}

// number对象调用toString()
// 123.toString(); // SyntaxError
123..toString(); // 两个点
(123).toString(); // '123'

// 构造函数
function Student(name) {
	this.name = name;
	this.hello = function () {
		console.log("Hello, " + this.name + "!");
	}
}
var s1 = new Student("Ryan");
s1.hello(); // Hello, Ryan!
// s1的原型链是 s1 ---> Student.prototype ---> Object.prototype ---> null
// constructor 属性
console.log(s1.constructor === Student.prototype.constructor); // true
console.log(Student.prototype.constructor === Student); // ture
console.log(Object.getPrototypeOf(s1) === Student.prototype); // true
console.log(s1 instanceof Student); // true

// 原型继承
// Primary 构造函数
function PrimaryStudent(props) {
	// 调用Student构造函数，绑定this变量
	Student.call(this, props);
	this.grade = props.grade || 1;
}
/*
 * 但并不是继承了Student
 * PrimaryStudent创建的对象的原型链是：
 * new PrimaryStudent() ---> PrimaryStudent.prototype ---> Object.proptotype ---> null
 * 想要让PrimaryStudent继承Student，需将原型链修改为
 * new PrimaryStudent() ---> PrimaryStudent.prototype ---> Student.prototype ---> Object.prototype ---> null
*/
// 现借助一个中间对象来实现原型继承，中间对象用一个空函数F来实现
function F() {}
// 把F的原型指向Student.prototype
F.prototype = Student.prototype;
// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype
PrimaryStudent.prototype = new F();
// 把PrimaryStudent原型的构造函数修复为PrimaryStudent
PrimaryStudent.prototype.constructor = PrimaryStudent;
// 继续在PrimaryStudent原型（即new F()对象）上定义方法
PrimaryStudent.prototype.getGrade = function () {
	return this.grade;
}
// 创建s2
var s2 = new PrimaryStudent({
	name: 'Martin',
	grade: 2
});
// 验证原型
console.log("验证原型：");
console.log(s2.__proto__ === PrimaryStudent.prototype); // true
console.log(s2.__proto__.__proto__ === Student.prototype); // true
// 验证继承关系
console.log("验证继承关系：");
console.log(s2 instanceof PrimaryStudent); // true
console.log(s2 instanceof Student); // true
// 在上述过程中，函数F仅用于桥接，仅创建了一个new F()实例，而且，没有改变原有的Student定义的原型链
// 简化代码：将继承这个动作用一个inherits()函数封装起来，隐藏F的定义
function inherits(Child, Parent) {
	var F = function () {};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
}
/*
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
*/

// 用class关键词来编写Student
class Student_byClass {
	constructor(name) {
		this.name = name;
	}

	hello() {
		console.log("Hello, " + this.name + "! -- by class");
	}
}
var s3 = new Student_byClass('Zoro');
s3.hello();

// extends 继承
class PrimaryStudent_byExtends extends Student_byClass {
	constructor(name, grade) {
		super(name); // 用super方法调用父类的构造方法
		this.grade = grade;
	}

	myGrade() {
		console.log("I am at grade " + this.grade);
	}
}
var psbe = new PrimaryStudent_byExtends('Luffy', 6);
psbe.myGrade();
psbe.hello();

// children的更新
/*
* 对于如下HTML结构：
<div id="parent">
    <p>First</p>
    <p>Second</p>
</div>
* 当我们用如下代码删除子节点时：
var parent = document.getElementById('parent');
parent.removeChild(parent.children[0]);
parent.removeChild(parent.children[1]); // 浏览器报错
* 浏览器报错：parent.children[1]不是一个有效的节点
* 原因是，当<p>First</p>节点被删除后，parent.children的节点数量已经从2变为了1，索引[1]已经不存在了
* 因此，删除多个节点时，要注意children属性时刻都在变化
*/

// submit()方法提交表单
/*
<form id="test-form">
    <input type="text" name="test">
    <button type="button" onclick="doSubmitForm()">Submit</button>
</form>

<script>
function doSubmitForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 提交form:
    form.submit();
}
</script>
*/

// 响应<form>本身的onsubmit事件
/*
<form id="test-form" onsubmit="return checkForm()">
    <input type="text" name="test">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var form = document.getElementById('test-form');
    // 可以在此修改form的input...
    // 继续下一步:
    return true; // 告诉浏览器继续提交，如果return false，浏览器将不会继续提交form，这种情况通常对应用户输入有误，提示用户错误信息后终止提交form
}
</script>
*/

// 利用hidden来实现MD5加密传输
/*
<form id="login-form" method="post" onsubmit="return checkForm()">
    <input type="text" id="username" name="username">
    <input type="password" id="input-password">
    <input type="hidden" id="md5-password" name="password">
    <button type="submit">Submit</button>
</form>

<script>
function checkForm() {
    var input_pwd = document.getElementById('input-password');
    var md5_pwd = document.getElementById('md5-password');
    // 把用户输入的明文变为MD5:
    md5_pwd.value = toMD5(input_pwd.value);
    // 继续下一步:
    return true;
}
</script>
*/

// 利用File API读取用户选取的图片文件，并在一个<div>中预览图像
/*
var
    fileInput = document.getElementById('test-image-file'),
    info = document.getElementById('test-file-info'),
    preview = document.getElementById('test-image-preview');
// 监听change事件:
fileInput.addEventListener('change', function () {
    // 清除背景图片:
    preview.style.backgroundImage = '';
    // 检查文件是否选择:
    if (!fileInput.value) {
        info.innerHTML = '没有选择文件';
        return;
    }
    // 获取File引用:
    var file = fileInput.files[0];
    // 获取File信息:
    info.innerHTML = '文件: ' + file.name + '<br>' +
                     '大小: ' + file.size + '<br>' +
                     '修改: ' + file.lastModifiedDate;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
        alert('不是有效的图片文件!');
        return;
    }
    // 读取文件:
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result; // 'data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...'
        preview.style.backgroundImage = 'url(' + data + ')';
    };
    // 以DataURL的形式读取文件:
    reader.readAsDataURL(file);
});

// 上面的代码演示了如何通过HTML5的File API读取文件内容
// 以DataURL的形式读取到的文件是一个字符串，类似于data:image/jpeg;base64,/9j/4AAQSk...(base64编码)...，常用于设置图像
// 如果需要服务器端处理，把字符串base64，后面的字符发送给服务器并用Base64解码就可以得到原始文件的二进制内容
*/

// Promise例子：生成一个0-2之间的随机数，如果小于1，则等待一段时间后返回成功，否则返回失败
function test(resolve, reject) {
	var timeOut = Math.random() * 2;
	console.log('set timeout to: ' + timeOut + ' seconds.');
	setTimeout(function () {
		if (timeOut < 1) {
			console.log('call resolve()...');
			resolve('200 OK');
		} else {
			console.log('call reject()...');
			reject('timeout in ' + timeOut + ' seconds.');
		}
	}, timeOut * 1000);
}
var p1 = new Promise(test);
var p2 = p1.then(function (result) {
	console.log('Done: ' + result);
});
var p3 = p2.catch(function (reason) {
	console.log('Failed: ' + reason);
});

// 串行执行一系列需要异步计算获得结果的任务
// 0.3秒后返回input*input的计算结果:
function multiply(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' x ' + input + '...');
        setTimeout(resolve, 300, input * input);
    });
}
// 0.3秒后返回input+input的计算结果:
function add(input) {
    return new Promise(function (resolve, reject) {
        console.log('calculating ' + input + ' + ' + input + '...');
        setTimeout(resolve, 300, input + input);
    });
}
var p = new Promise(function (resolve, reject) {
    console.log('start new Promise...');
    resolve(5);
});
p.then(multiply).then(add).then(multiply).then(add).then(function (result) {
    console.log('Got value: ' + result);
});

// 并行执行异步任务
var h1 = new Promise(function (resolve, reject) {
	setTimeout(resolve, 500, 'H1');
});
var h2 = new Promise(function (resolve, reject) {
	setTimeout(resolve, 600, 'H2');
});
// 同时执行h1和h2，并在它们都完成后执行then
Promise.all([h1, h2]).then(function (result) {
	console.log(result); // 获得一个Array：['H1', 'H2']，时间为600ms
});
// 同时执行h1和h2，只获得先返回的结果
Promise.race([h1, h2]).then(function (result) {
	console.log(result + " is faster."); // 'H1 is faster.'，时间为500ms
});

// attr() 与 prop() 的区别
/*
<input id="test-radio" type="radio" name="test" checked value="1">
* 等价于
<input id="test-radio" type="radio" name="test" checked="checked" value="1">
* 但attr()和prop()对于属性checked的处理有所不同
var radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
*/
// 上述过程prop()的返回值更加合理，不过用is()方法判断更好
// radio.is(':checked'); // true
// 类似的属性还有selected，处理时最好用is(':selected')

// change事件
/*
var input = $('#test-input');
input.change(function () {
    console.log('changed...');
});
* 当用户在文本框中输入时，就会触发change事件
* 但是，如果用JS代码去改动文本框的值，将不会触发change事件
* 若要用代码触发change事件，可以直接调用无参数的change()方法来触发
* input.change()相当于input.trigger('change')，它是trigger()方法的简写
*/

// 用回调函数处理返回的数据和出错时的响应
/*
var jqxhr = $.ajax('/api/categories', {
    dataType: 'json'
}).done(function (data) {
    console.log('成功, 收到的数据: ' + JSON.stringify(data));
}).fail(function (xhr, status) {
    console.log('失败: ' + xhr.status + ', 原因: ' + status);
}).always(function () {
    console.log('请求完成: 无论成功或失败都会调用');
});
*/

// get
/*
var jqxhr = $.get('/path/to/resource', {
    name: 'Bob Lee',
    check: 1
});
* 实际的URL是
/path/to/resource?name=Bob%20Lee&check=1
*/

// _.groupBy()
/*
var scores = [20, 81, 75, 40, 91, 59, 77, 66, 72, 88, 99];
var groups = _.groupBy(scores, function (x) {
    if (x < 60) {
        return 'C';
    } else if (x < 80) {
        return 'B';
    } else {
        return 'A';
    }
});
// 结果:
// {
//   A: [81, 91, 88, 99],
//   B: [75, 77, 66, 72],
//   C: [20, 40, 59]
// }
*/

// _.range()
/*
_.range(10);         // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
_.range(1, 11);      // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
_.range(0, 30, 5);   // [0, 5, 10, 15, 20, 25]
_.range(0, -10, -1); // [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
*/

// _.memoize()
/*
var factorial = _.memoize(function(n) {
    console.log('start calculate ' + n + '!...');
    var s = 1, i = n;
    while (i > 1) {
        s = s * i;
        i --;
    }
    console.log(n + '! = ' + s);
    return s;
});
******************************************************
// 第一次调用:
factorial(10); // 3628800
// 注意控制台输出:
// start calculate 10!...
// 10! = 3628800
******************************************************
// 第二次调用:
factorial(10); // 3628800
// 控制台没有输出
******************************************************
// 不过，当你计算factorial(9)的时候，仍然会重新计算
// 为此进行改进，让其递归调用
var factorial = _.memoize(function(n) {
    console.log('start calculate ' + n + '!...');
    if (n < 2) {
        return 1;
    }
    return n * factorial(n - 1);
});
******************************************************
factorial(10); // 3628800
// 输出结果说明factorial(1)~factorial(10)都已经缓存了:
// start calculate 10!...
// ...
// start calculate 1!...
******************************************************
factorial(9); // 362880
// console无输出
******************************************************
*/