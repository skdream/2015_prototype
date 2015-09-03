'use strict';
console.log('let_const.js'); 

// 代码块
{
	let a = 10; 
	var b = 1; 
}

// console.log(a); 
console.log(b);

for(let i = 0; i < 10; ++i)  {}
// console.log(i)

var a = []; 
for (var i = 0; i < 10; ++i) {
	a[i] = function() {
		console.log(i)
	}
}

a[6](); 

var a = []; 
for (let i = 0; i < 10; ++i) {
	a[i] = function() {
		console.log(i)
	}
}
a[6](); 


if (1) {
	// console.log(x); 
	let x = 5; 
}

var tmp = 123; 
if (1) {
	tmp = 'abc'; 
}

var tmp = 123; 
if (1) {
	// tmp = 'abc'; 
	let tmp = 1; 
}

function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

const PI = 3.1415;

console.log(PI)

// PI = 1


// const foo = {};
// foo.prop = 123;

// foo.prop
// 123

// foo = {} // 不起作用

const foo = Object.freeze({});
// foo.prop = 123; // 不起作用








