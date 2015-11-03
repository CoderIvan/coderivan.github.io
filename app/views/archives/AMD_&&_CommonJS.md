# Javascript模块规范: AMD\CommonJS

## AMD
	The Asynchronous Module Definition

* 实现
	* RequireJS

## CommonJS

* 实现
	* Browserify 
	* Node.js

## 区别

* 加载方式
	* CommonJS规范加载模块是同步的
	* AMD规范则是非同步加载模块，允许指定回调函数

## 引用

> [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)

>> [Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

> [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1)

>> [浏览器加载 CommonJS 模块的原理与实现](http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html)

> [Writing Modular JavaScript With AMD, CommonJS & ES Harmony](http://addyosmani.com/writing-modular-js/)