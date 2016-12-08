/*
	テスト内容
*/
console.log('test/index.js')


// Modules
// require('babel-polyfill');
const isPolyfill = require('../bundle.min.js');

// Var
const obj = {}
const body = document.body;

// etc
body.appendChild( document.createTextNode(new Date()));

// Tests
obj.isPolyfill = function(){
	return isPolyfill;
}

obj["BroadcastChannel API"] = function(){
	return typeof window.BroadcastChannel==='function';
}

obj["CSS.supports"] = function(){
	return typeof window.CSS.supports==='function';
}

obj["document.head"] = function(){
	return document.head===document.querySelector('head');
}

obj["dom4"] = function(){
	return '省略';
}

obj["DOMParser"] = function(){
	return !!window.DOMParser; //レガシーWebkitだとobject
}

obj["fetch"] = function(){
	return typeof window.fetch==='function';
}

obj["FormData"] = function(){
	return !!window.FormData;
}

if( window.Symbol ){
	obj["HTMLCollection-Iterabled"] = function(){
		return typeof HTMLCollection.prototype[Symbol.iterator]==='function';
	}
	obj["NodeList-Iterabled"] = function(){
		return typeof NodeList.prototype[Symbol.iterator]==='function';
	}
}

obj["location.origin"] = function(){
	return typeof location.origin==='string';
}

obj["performance.now()"] = function(){
	return typeof window.performance==='object' && typeof performance.now()==='number';
}

obj["requestAnimationFrame"] = function(){
	return typeof window.requestAnimationFrame==='function';
}

obj["Web Animations API"] = function(){
	return typeof document.body.animate==='function';
}

obj["XMLHttpRequest"] = function(){
	return !!window.XMLHttpRequest; //レガシーWebkitだとobject
}

// Result
Object.keys(obj).forEach(function(key){
	const value = obj[key];
	const result = value();
	const resultText = result ?
		'<span style="color: green;">'+result+'</span>':
		'<span style="color: red;">'+result+'</span>';
	const div = document.createElement('div');
	div.innerHTML = key+': '+resultText;
	body.appendChild(div);
});
