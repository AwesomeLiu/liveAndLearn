// 变量提升
/*
// var 的情况
console.log(var_foo); // undefined
var foo = 2;
// let 的情况
console.log(let_foo); // ReferenceError
let bar = 2;
*/

// 暂时性死区
/*
var temp = 123;
if (true) {
	temp = 'abc'; // ReferenceError
	let temp;
}
*/
/*
var x = x; // 不报错
let x = x; // ReferenceError
*/

// typeof
/*
console.log(typeof x); // ReferenceError
let x;

console.log(typeof undeclared_variable); // "undefined"
*/

// 块级作用域
/*
function f1() {
	let n = 5;
	if (true) {
		let n = 10;
	}
	console.log(n); // 5
}
f1();
*/

/*
{{{{
	{ let insane = 'Hello, world' }
	console.log(insane); // ReferenceError
}}}};
*/
/*
{{{{
	let insane = 'Hello, world';
	{
		let insane = 'Hello';
	}
}}}};
*/