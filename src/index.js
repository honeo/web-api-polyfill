/*
	WebAPIのみ
		ESはbabel-polyfillとかにおまかせ
		loaderがscriptではなくimportsrなのは、scriptだとジュール内のthisがundefinedになるため
		なるべく変換がいらないように書く
*/
// performance.now
require('./lib/performance.now()-polyfill');

/*
	HTMLCollection, NodeListをイテラブルに
		Symbolがある場合のみ
*/
if( window.Symbol ){
	if( !HTMLCollection.prototype[Symbol.iterator] ){
		HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
	}
	if( !NodeList.prototype[Symbol.iterator] ){
		NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
	}
}


/*
	requestAnimationFrame
		dom4内蔵は途中で止まる環境が多いから続投
*/
require('./lib/rAF');

/*
	BroadcastChannel API
		コンテキストをwindowにして実行
*/
// require('script!./lib/52f437d1451d12145264-a9d216c215bd7d03a2eeea24200cb58fad5fdab9/broadcastchannel');
require('imports?this=>window!./lib/52f437d1451d12145264-a9d216c215bd7d03a2eeea24200cb58fad5fdab9/broadcastchannel');

/*
	DOM Level 4
		ChildNode
		ParentNode
		Element#matches()
		Element#classList
		etc...
*/
require('dom4');

// CSS.supports
require('./lib/CSS.supports');

// // ChildNode
// require('./lib/childNode');

// document.head
document.head || (document.head = document.getElementsByTagName('head')[0]);

// DOMParser - HTML
require('./lib/html-domparser');

// XMLHttpRequest, FormData
require('./lib/xhr');

// // Element.prototype.matches()
// Element.prototype.matches || (Element.prototype.matches =
// 	Element.prototype.webkitMatchesSelector ||
// 	Element.prototype.mozMatchesSelector ||
// 	Element.prototype.msMatchesSelector ||
// 	Element.prototype.oMatchesSelector ||
// 	function(selector){
// 		var nodeList = this.parentNode.querySelectorAll(selector);
// 		for(var i=0,nLl=nodeList.length; i<nLl; i++){
// 			if(nodeList[i]===this){
// 				return true;
// 			}
// 		}
// 		return false;
// 	}
// );

// location.origin
location.origin || (location.origin = location.protocol + '//' + location.host);

// // Element.prototype.classList
// require('./lib/classList.js-master/classList')

/*
	Web Animation API

	不具合
		読み込みについて
			以前はwindowコンテキストで実行する必要があった。
			いつからかモジュールスコープでは完全に動かなくなり、importsからscript-loaderへ移行した。
				素のrequireやimports-loaderだとChromeで[TypeError: Cannot set property 'true' of undefined]
		Safari
			web-animations-js 2.2.2とSafari v5.1.7で以下のエラーが発生する。
				[TypeError: setting a property that has only a getter]
			2.2.１までは問題ないからversion固定中。
*/
require('script!web-animations-js');
//require('imports?this=>window!web-animations-js');

// window.fetch
require('whatwg-fetch')

module.exports = true;
