(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
		WebAPIのみ
			ESはbabel-polyfillとかにおまかせ
			loaderがscriptではなくimportsrなのは、scriptだとジュール内のthisがundefinedになるため
			なるべく変換がいらないように書く
	*/
	// performance.now
	__webpack_require__(1);

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
	__webpack_require__(2);

	/*
		BroadcastChannel API
			コンテキストをwindowにして実行
	*/
	// require('script!./lib/52f437d1451d12145264-a9d216c215bd7d03a2eeea24200cb58fad5fdab9/broadcastchannel');
	__webpack_require__(3);

	/*
		DOM Level 4
			ChildNode
			ParentNode
			Element#matches()
			Element#classList
			etc...
	*/
	__webpack_require__(4);

	// CSS.supports
	__webpack_require__(5);

	// // ChildNode
	// require('./lib/childNode');

	// document.head
	document.head || (document.head = document.getElementsByTagName('head')[0]);

	// DOMParser - HTML
	__webpack_require__(6);

	// XMLHttpRequest, FormData
	__webpack_require__(7);

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
			globalコンテキストで実行する
		読み込みについて
			windowコンテキストで実行する必要がある？
			素のrequireやimports-loaderだとChromeで[TypeError: Cannot set property 'true' of undefined]
			script-loaderだとSafari5.1.7で[TypeError: setting a property that has only a getter]
	*/
	//require('imports?this=>window!web-animations-js');
	__webpack_require__(8);
	//require('web-animations-js');

	// window.fetch
	__webpack_require__(11)

	module.exports = true;


/***/ },
/* 1 */
/***/ function(module, exports) {

	// @license http://opensource.org/licenses/MIT
	// copyright Paul Irish 2015


	// Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
	//   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
	// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

	// if you want values similar to what you'd get with real perf.now, place this towards the head of the page
	// but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed


	(function(){

	  if ("performance" in window == false) {
	      window.performance = {};
	  }
	  
	  Date.now = (Date.now || function () {  // thanks IE8
		  return new Date().getTime();
	  });

	  if ("now" in window.performance == false){
	    
	    var nowOffset = Date.now();
	    
	    if (performance.timing && performance.timing.navigationStart){
	      nowOffset = performance.timing.navigationStart
	    }

	    window.performance.now = function now(){
	      return Date.now() - nowOffset;
	    }
	  }

	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

	// MIT license

	(function() {
	    var lastTime = 0;
	    var vendors = ['ms', 'moz', 'webkit', 'o'];
	    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
	                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
	    }
	 
	    if (!window.requestAnimationFrame)
	        window.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
	            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
	              timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	 
	    if (!window.cancelAnimationFrame)
	        window.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	}());

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*** IMPORTS FROM imports-loader ***/
	(function() {

	(function(global) {
	  var channels = [];

	  function BroadcastChannel(channel) {
	    var $this = this;
	    channel = String(channel);

	    var id = '$BroadcastChannel$' + channel + '$';

	    channels[id] = channels[id] || [];
	    channels[id].push(this);

	    this._name = channel;
	    this._id = id;
	    this._closed = false;
	    this._mc = new MessageChannel();
	    this._mc.port1.start();
	    this._mc.port2.start();

	    global.addEventListener('storage', function(e) {
	      if (e.storageArea !== global.localStorage) return;
	      if (e.newValue === null) return;
	      if (e.key.substring(0, id.length) !== id) return;
	      var data = JSON.parse(e.newValue);
	      $this._mc.port2.postMessage(data);
	    });
	  }

	  BroadcastChannel.prototype = {
	    // BroadcastChannel API
	    get name() { return this._name; },
	    postMessage: function(message) {
	      var $this = this;
	      if (this._closed) {
	        var e = new Error();
	        e.name = 'InvalidStateError';
	        throw e;
	      }
	      var value = JSON.stringify(message);

	      // Broadcast to other contexts via storage events...
	      var key = this._id + String(Date.now()) + '$' + String(Math.random());
	      global.localStorage.setItem(key, value);
	      setTimeout(function() { global.localStorage.removeItem(key); }, 500);

	      // Broadcast to current context via ports
	      channels[this._id].forEach(function(bc) {
	        if (bc === $this) return;
	        bc._mc.port2.postMessage(JSON.parse(value));
	      });
	    },
	    close: function() {
	      if (this._closed) return;
	      this._closed = true;
	      this._mc.port1.close();
	      this._mc.port2.close();

	      var index = channels[this._id].indexOf(this);
	      channels[this._id].splice(index, 1);
	    },

	    // EventTarget API
	    get onmessage() { return this._mc.port1.onmessage; },
	    set onmessage(value) { this._mc.port1.onmessage = value; },
	    addEventListener: function(type, listener /*, useCapture*/) {
	      return this._mc.port1.addEventListener.apply(this._mc.port1, arguments);
	    },
	    removeEventListener: function(type, listener /*, useCapture*/) {
	      return this._mc.port1.removeEventListener.apply(this._mc.port1, arguments);
	    },
	    dispatchEvent: function(event) {
	      return this._mc.port1.dispatchEvent.apply(this._mc.port1, arguments);
	    }
	  };

	  global.BroadcastChannel = global.BroadcastChannel || BroadcastChannel;
	}(self));
	}.call(window));

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	Copyright (C) 2013-2015 by Andrea Giammarchi - @WebReflection

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.

	*/
	(function(window){'use strict';
	  /* jshint loopfunc: true, noempty: false*/
	  // http://www.w3.org/TR/dom/#element

	  function createDocumentFragment() {
	    return document.createDocumentFragment();
	  }

	  function createElement(nodeName) {
	    return document.createElement(nodeName);
	  }

	  function enoughArguments(length, name) {
	    if (!length) throw new Error(
	      'Failed to construct ' +
	        name +
	      ': 1 argument required, but only 0 present.'
	    );
	  }

	  function mutationMacro(nodes) {
	    if (nodes.length === 1) {
	      return textNodeIfString(nodes[0]);
	    }
	    for (var
	      fragment = createDocumentFragment(),
	      list = slice.call(nodes),
	      i = 0; i < nodes.length; i++
	    ) {
	      fragment.appendChild(textNodeIfString(list[i]));
	    }
	    return fragment;
	  }

	  function textNodeIfString(node) {
	    return typeof node === 'string' ? document.createTextNode(node) : node;
	  }

	  for(var
	    head,
	    property,
	    TemporaryPrototype,
	    TemporaryTokenList,
	    wrapVerifyToken,
	    document = window.document,
	    hOP = Object.prototype.hasOwnProperty,
	    defineProperty = Object.defineProperty || function (object, property, descriptor) {
	      if (hOP.call(descriptor, 'value')) {
	        object[property] = descriptor.value;
	      } else {
	        if (hOP.call(descriptor, 'get'))
	          object.__defineGetter__(property, descriptor.get);
	        if (hOP.call(descriptor, 'set'))
	          object.__defineSetter__(property, descriptor.set);
	      }
	      return object;
	    },
	    indexOf = [].indexOf || function indexOf(value){
	      var length = this.length;
	      while(length--) {
	        if (this[length] === value) {
	          break;
	        }
	      }
	      return length;
	    },
	    // http://www.w3.org/TR/domcore/#domtokenlist
	    verifyToken = function (token) {
	      if (!token) {
	        throw 'SyntaxError';
	      } else if (spaces.test(token)) {
	        throw 'InvalidCharacterError';
	      }
	      return token;
	    },
	    DOMTokenList = function (node) {
	      var
	        noClassName = typeof node.className === 'undefined',
	        className = noClassName ?
	          (node.getAttribute('class') || '') : node.className,
	        isSVG = noClassName || typeof className === 'object',
	        value = (isSVG ?
	          (noClassName ? className : className.baseVal) :
	          className
	        ).replace(trim, '')
	      ;
	      if (value.length) {
	        properties.push.apply(
	          this,
	          value.split(spaces)
	        );
	      }
	      this._isSVG = isSVG;
	      this._ = node;
	    },
	    classListDescriptor = {
	      get: function get() {
	        return new DOMTokenList(this);
	      },
	      set: function(){}
	    },
	    uid = 'dom4-tmp-'.concat(Math.random() * +new Date()).replace('.','-'),
	    trim = /^\s+|\s+$/g,
	    spaces = /\s+/,
	    SPACE = '\x20',
	    CLASS_LIST = 'classList',
	    toggle = function toggle(token, force) {
	      if (this.contains(token)) {
	        if (!force) {
	          // force is not true (either false or omitted)
	          this.remove(token);
	        }
	      } else if(force === undefined || force) {
	        force = true;
	        this.add(token);
	      }
	      return !!force;
	    },
	    DocumentFragmentPrototype = window.DocumentFragment && DocumentFragment.prototype,
	    Node = window.Node,
	    NodePrototype = (Node || Element).prototype,
	    CharacterData = window.CharacterData || Node,
	    CharacterDataPrototype = CharacterData && CharacterData.prototype,
	    DocumentType = window.DocumentType,
	    DocumentTypePrototype = DocumentType && DocumentType.prototype,
	    ElementPrototype = (window.Element || Node || window.HTMLElement).prototype,
	    HTMLSelectElement = window.HTMLSelectElement || createElement('select').constructor,
	    selectRemove = HTMLSelectElement.prototype.remove,
	    ShadowRoot = window.ShadowRoot,
	    SVGElement = window.SVGElement,
	    // normalizes multiple ids as CSS query
	    idSpaceFinder = / /g,
	    idSpaceReplacer = '\\ ',
	    createQueryMethod = function (methodName) {
	      var createArray = methodName === 'querySelectorAll';
	      return function (css) {
	        var a, i, id, query, nl, selectors, node = this.parentNode;
	        if (node) {
	          for (
	            id = this.getAttribute('id') || uid,
	            query = id === uid ? id : id.replace(idSpaceFinder, idSpaceReplacer),
	            selectors = css.split(','),
	            i = 0; i < selectors.length; i++
	          ) {
	            selectors[i] = '#' + query + ' ' + selectors[i];
	          }
	          css = selectors.join(',');
	        }
	        if (id === uid) this.setAttribute('id', id);
	        nl = (node || this)[methodName](css);
	        if (id === uid) this.removeAttribute('id');
	        // return a list
	        if (createArray) {
	          i = nl.length;
	          a = new Array(i);
	          while (i--) a[i] = nl[i];
	        }
	        // return node or null
	        else {
	          a = nl;
	        }
	        return a;
	      };
	    },
	    addQueryAndAll = function (where) {
	      if (!('query' in where)) {
	        where.query = ElementPrototype.query;
	      }
	      if (!('queryAll' in where)) {
	        where.queryAll = ElementPrototype.queryAll;
	      }
	    },
	    properties = [
	      'matches', (
	        ElementPrototype.matchesSelector ||
	        ElementPrototype.webkitMatchesSelector ||
	        ElementPrototype.khtmlMatchesSelector ||
	        ElementPrototype.mozMatchesSelector ||
	        ElementPrototype.msMatchesSelector ||
	        ElementPrototype.oMatchesSelector ||
	        function matches(selector) {
	          var parentNode = this.parentNode;
	          return !!parentNode && -1 < indexOf.call(
	            parentNode.querySelectorAll(selector),
	            this
	          );
	        }
	      ),
	      'closest', function closest(selector) {
	        var parentNode = this, matches;
	        while (
	          // document has no .matches
	          (matches = parentNode && parentNode.matches) &&
	          !parentNode.matches(selector)
	        ) {
	          parentNode = parentNode.parentNode;
	        }
	        return matches ? parentNode : null;
	      },
	      'prepend', function prepend() {
	        var firstChild = this.firstChild,
	            node = mutationMacro(arguments);
	        if (firstChild) {
	          this.insertBefore(node, firstChild);
	        } else {
	          this.appendChild(node);
	        }
	      },
	      'append', function append() {
	        this.appendChild(mutationMacro(arguments));
	      },
	      'before', function before() {
	        var parentNode = this.parentNode;
	        if (parentNode) {
	          parentNode.insertBefore(
	            mutationMacro(arguments), this
	          );
	        }
	      },
	      'after', function after() {
	        var parentNode = this.parentNode,
	            nextSibling = this.nextSibling,
	            node = mutationMacro(arguments);
	        if (parentNode) {
	          if (nextSibling) {
	            parentNode.insertBefore(node, nextSibling);
	          } else {
	            parentNode.appendChild(node);
	          }
	        }
	      },
	      // WARNING - DEPRECATED - use .replaceWith() instead
	      'replace', function replace() {
	        this.replaceWith.apply(this, arguments);
	      },
	      'replaceWith', function replaceWith() {
	        var parentNode = this.parentNode;
	        if (parentNode) {
	          parentNode.replaceChild(
	            mutationMacro(arguments),
	            this
	          );
	        }
	      },
	      'remove', function remove() {
	        var parentNode = this.parentNode;
	        if (parentNode) {
	          parentNode.removeChild(this);
	        }
	      },
	      'query', createQueryMethod('querySelector'),
	      'queryAll', createQueryMethod('querySelectorAll')
	    ],
	    slice = properties.slice,
	    i = properties.length; i; i -= 2
	  ) {
	    property = properties[i - 2];
	    if (!(property in ElementPrototype)) {
	      ElementPrototype[property] = properties[i - 1];
	    }
	    if (property === 'remove') {
	      // see https://github.com/WebReflection/dom4/issues/19
	      HTMLSelectElement.prototype[property] = function () {
	        return 0 < arguments.length ?
	          selectRemove.apply(this, arguments) :
	          ElementPrototype.remove.call(this);
	      };
	    }
	    // see https://github.com/WebReflection/dom4/issues/18
	    if (/^(?:before|after|replace|replaceWith|remove)$/.test(property)) {
	      if (CharacterData && !(property in CharacterDataPrototype)) {
	        CharacterDataPrototype[property] = properties[i - 1];
	      }
	      if (DocumentType && !(property in DocumentTypePrototype)) {
	        DocumentTypePrototype[property] = properties[i - 1];
	      }
	    }
	    // see https://github.com/WebReflection/dom4/pull/26
	    if (/^(?:append|prepend)$/.test(property)) {
	      if (DocumentFragmentPrototype) {
	        if (!(property in DocumentFragmentPrototype)) {
	          DocumentFragmentPrototype[property] = properties[i - 1];
	        }
	      } else {
	        try {
	          createDocumentFragment().constructor.prototype[property] = properties[i - 1];
	        } catch(o_O) {}
	      }
	    }
	  }

	  // bring query and queryAll to the document too
	  addQueryAndAll(document);

	  // brings query and queryAll to fragments as well
	  if (DocumentFragmentPrototype) {
	    addQueryAndAll(DocumentFragmentPrototype);
	  } else {
	    try {
	      addQueryAndAll(createDocumentFragment().constructor.prototype);
	    } catch(o_O) {}
	  }

	  // bring query and queryAll to the ShadowRoot too
	  if (ShadowRoot) {
	    addQueryAndAll(ShadowRoot.prototype);
	  }

	  // most likely an IE9 only issue
	  // see https://github.com/WebReflection/dom4/issues/6
	  if (!createElement('a').matches('a')) {
	    ElementPrototype[property] = function(matches){
	      return function (selector) {
	        return matches.call(
	          this.parentNode ?
	            this :
	            createDocumentFragment().appendChild(this),
	          selector
	        );
	      };
	    }(ElementPrototype[property]);
	  }

	  // used to fix both old webkit and SVG
	  DOMTokenList.prototype = {
	    length: 0,
	    add: function add() {
	      for(var j = 0, token; j < arguments.length; j++) {
	        token = arguments[j];
	        if(!this.contains(token)) {
	          properties.push.call(this, property);
	        }
	      }
	      if (this._isSVG) {
	        this._.setAttribute('class', '' + this);
	      } else {
	        this._.className = '' + this;
	      }
	    },
	    contains: (function(indexOf){
	      return function contains(token) {
	        i = indexOf.call(this, property = verifyToken(token));
	        return -1 < i;
	      };
	    }([].indexOf || function (token) {
	      i = this.length;
	      while(i-- && this[i] !== token){}
	      return i;
	    })),
	    item: function item(i) {
	      return this[i] || null;
	    },
	    remove: function remove() {
	      for(var j = 0, token; j < arguments.length; j++) {
	        token = arguments[j];
	        if(this.contains(token)) {
	          properties.splice.call(this, i, 1);
	        }
	      }
	      if (this._isSVG) {
	        this._.setAttribute('class', '' + this);
	      } else {
	        this._.className = '' + this;
	      }
	    },
	    toggle: toggle,
	    toString: function toString() {
	      return properties.join.call(this, SPACE);
	    }
	  };

	  if (SVGElement && !(CLASS_LIST in SVGElement.prototype)) {
	    defineProperty(SVGElement.prototype, CLASS_LIST, classListDescriptor);
	  }

	  // http://www.w3.org/TR/dom/#domtokenlist
	  // iOS 5.1 has completely screwed this property
	  // classList in ElementPrototype is false
	  // but it's actually there as getter
	  if (!(CLASS_LIST in document.documentElement)) {
	    defineProperty(ElementPrototype, CLASS_LIST, classListDescriptor);
	  } else {
	    // iOS 5.1 and Nokia ASHA do not support multiple add or remove
	    // trying to detect and fix that in here
	    TemporaryTokenList = createElement('div')[CLASS_LIST];
	    TemporaryTokenList.add('a', 'b', 'a');
	    if ('a\x20b' != TemporaryTokenList) {
	      // no other way to reach original methods in iOS 5.1
	      TemporaryPrototype = TemporaryTokenList.constructor.prototype;
	      if (!('add' in TemporaryPrototype)) {
	        // ASHA double fails in here
	        TemporaryPrototype = window.TemporaryTokenList.prototype;
	      }
	      wrapVerifyToken = function (original) {
	        return function () {
	          var i = 0;
	          while (i < arguments.length) {
	            original.call(this, arguments[i++]);
	          }
	        };
	      };
	      TemporaryPrototype.add = wrapVerifyToken(TemporaryPrototype.add);
	      TemporaryPrototype.remove = wrapVerifyToken(TemporaryPrototype.remove);
	      // toggle is broken too ^_^ ... let's fix it
	      TemporaryPrototype.toggle = toggle;
	    }
	  }

	  if (!('contains' in NodePrototype)) {
	    defineProperty(NodePrototype, 'contains', {
	      value: function (el) {
	        while (el && el !== this) el = el.parentNode;
	        return this === el;
	      }
	    });
	  }

	  if (!('head' in document)) {
	    defineProperty(document, 'head', {
	      get: function () {
	        return head || (
	          head = document.getElementsByTagName('head')[0]
	        );
	      }
	    });
	  }

	  // requestAnimationFrame partial polyfill
	  (function () {
	    for (var
	      raf,
	      rAF = window.requestAnimationFrame,
	      cAF = window.cancelAnimationFrame,
	      prefixes = ['o', 'ms', 'moz', 'webkit'],
	      i = prefixes.length;
	      !cAF && i--;
	    ) {
	      rAF = rAF || window[prefixes[i] + 'RequestAnimationFrame'];
	      cAF = window[prefixes[i] + 'CancelAnimationFrame'] ||
	            window[prefixes[i] + 'CancelRequestAnimationFrame'];
	    }
	    if (!cAF) {
	      // some FF apparently implemented rAF but no cAF 
	      if (rAF) {
	        raf = rAF;
	        rAF = function (callback) {
	          var goOn = true;
	          raf(function () {
	            if (goOn) callback.apply(this, arguments);
	          });
	          return function () {
	            goOn = false;
	          };
	        };
	        cAF = function (id) {
	          id();
	        };
	      } else {
	        rAF = function (callback) {
	          return setTimeout(callback, 15, 15);
	        };
	        cAF = function (id) {
	          clearTimeout(id);
	        };
	      }
	    }
	    window.requestAnimationFrame = rAF;
	    window.cancelAnimationFrame = cAF;
	  }());

	  // http://www.w3.org/TR/dom/#customevent
	  try{new window.CustomEvent('?');}catch(o_O){
	    window.CustomEvent = function(
	      eventName,
	      defaultInitDict
	    ){

	      // the infamous substitute
	      function CustomEvent(type, eventInitDict) {
	        /*jshint eqnull:true */
	        var event = document.createEvent(eventName);
	        if (typeof type != 'string') {
	          throw new Error('An event name must be provided');
	        }
	        if (eventName == 'Event') {
	          event.initCustomEvent = initCustomEvent;
	        }
	        if (eventInitDict == null) {
	          eventInitDict = defaultInitDict;
	        }
	        event.initCustomEvent(
	          type,
	          eventInitDict.bubbles,
	          eventInitDict.cancelable,
	          eventInitDict.detail
	        );
	        return event;
	      }

	      // attached at runtime
	      function initCustomEvent(
	        type, bubbles, cancelable, detail
	      ) {
	        /*jshint validthis:true*/
	        this.initEvent(type, bubbles, cancelable);
	        this.detail = detail;
	      }

	      // that's it
	      return CustomEvent;
	    }(
	      // is this IE9 or IE10 ?
	      // where CustomEvent is there
	      // but not usable as construtor ?
	      window.CustomEvent ?
	        // use the CustomEvent interface in such case
	        'CustomEvent' : 'Event',
	        // otherwise the common compatible one
	      {
	        bubbles: false,
	        cancelable: false,
	        detail: null
	      }
	    );
	  }

	  // window.Event as constructor
	  try { new Event('_'); } catch (o_O) {
	    /* jshint -W022 */
	    o_O = (function ($Event) {
	      function Event(type, init) {
	        enoughArguments(arguments.length, 'Event');
	        var out = document.createEvent('Event');
	        if (!init) init = {};
	        out.initEvent(
	          type,
	          !!init.bubbles,
	          !!init.cancelable
	        );
	        return out;
	      }
	      Event.prototype = $Event.prototype;
	      return Event;
	    }(window.Event || function Event() {}));
	    defineProperty(window, 'Event', {value: o_O});
	    // Android 4 gotcha
	    if (Event !== o_O) Event = o_O;
	  }

	  // window.KeyboardEvent as constructor
	  try { new KeyboardEvent('_', {}); } catch (o_O) {
	    /* jshint -W022 */
	    o_O = (function ($KeyboardEvent) {
	      // code inspired by https://gist.github.com/termi/4654819
	      var
	        initType = 0,
	        defaults = {
	          char: '',
	          key: '',
	          location: 0,
	          ctrlKey: false,
	          shiftKey: false,
	          altKey: false,
	          metaKey: false,
	          altGraphKey: false,
	          repeat: false,
	          locale: navigator.language,
	          detail: 0,
	          bubbles: false,
	          cancelable: false,
	          keyCode: 0,
	          charCode: 0,
	          which: 0
	        },
	        eventType
	      ;
	      try {
	        var e = document.createEvent('KeyboardEvent');
	        e.initKeyboardEvent(
	          'keyup', false, false, window, '+', 3,
	          true, false, true, false, false
	        );
	        initType = (
	          (e.keyIdentifier || e.key) == '+' &&
	          (e.keyLocation || e.location) == 3
	        ) && (
	          e.ctrlKey ? e.altKey ? 1 : 3 : e.shiftKey ? 2 : 4
	        ) || 9;
	      } catch(o_O) {}
	      eventType = 0 < initType ? 'KeyboardEvent' : 'Event';

	      function getModifier(init) {
	        for (var
	          out = [],
	          keys = [
	            'ctrlKey',
	            'Control',
	            'shiftKey',
	            'Shift',
	            'altKey',
	            'Alt',
	            'metaKey',
	            'Meta',
	            'altGraphKey',
	            'AltGraph'
	          ],
	          i = 0; i < keys.length; i += 2
	        ) {
	          if (init[keys[i]])
	            out.push(keys[i + 1]);
	        }
	        return out.join(' ');
	      }

	      function withDefaults(target, source) {
	        for (var key in source) {
	          if (
	            source.hasOwnProperty(key) &&
	            !source.hasOwnProperty.call(target, key)
	          ) target[key] = source[key];
	        }
	        return target;
	      }

	      function withInitValues(key, out, init) {
	        try {
	          out[key] = init[key];
	        } catch(o_O) {}
	      }

	      function KeyboardEvent(type, init) {
	        enoughArguments(arguments.length, 'KeyboardEvent');
	        init = withDefaults(init || {}, defaults);
	        var
	          out = document.createEvent(eventType),
	          ctrlKey = init.ctrlKey,
	          shiftKey = init.shiftKey,
	          altKey = init.altKey,
	          metaKey = init.metaKey,
	          altGraphKey = init.altGraphKey,
	          modifiers = initType > 3 ? getModifier(init) : null,
	          key = String(init.key),
	          chr = String(init.char),
	          location = init.location,
	          keyCode = init.keyCode || (
	            (init.keyCode = key) &&
	            key.charCodeAt(0)
	          ) || 0,
	          charCode = init.charCode || (
	            (init.charCode = chr) &&
	            chr.charCodeAt(0)
	          ) || 0,
	          bubbles = init.bubbles,
	          cancelable = init.cancelable,
	          repeat = init.repeat,
	          locale = init.locale,
	          view = init.view || window,
	          args
	        ;
	        if (!init.which) init.which = init.keyCode;
	        if ('initKeyEvent' in out) {
	          out.initKeyEvent(
	            type, bubbles, cancelable, view,
	            ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode
	          );
	        } else if (0 < initType && 'initKeyboardEvent' in out) {
	          args = [type, bubbles, cancelable, view];
	          switch (initType) {
	            case 1:
	              args.push(key, location, ctrlKey, shiftKey, altKey, metaKey, altGraphKey);
	              break;
	            case 2:
	              args.push(ctrlKey, altKey, shiftKey, metaKey, keyCode, charCode);
	              break;
	            case 3:
	              args.push(key, location, ctrlKey, altKey, shiftKey, metaKey, altGraphKey);
	              break;
	            case 4:
	              args.push(key, location, modifiers, repeat, locale);
	              break;
	            default:
	              args.push(char, key, location, modifiers, repeat, locale);
	          }
	          out.initKeyboardEvent.apply(out, args);
	        } else {
	          out.initEvent(type, bubbles, cancelable);
	        }
	        for (key in out) {
	          if (defaults.hasOwnProperty(key) && out[key] !== init[key]) {
	            withInitValues(key, out, init);
	          }
	        }
	        return out;
	      }
	      KeyboardEvent.prototype = $KeyboardEvent.prototype;
	      return KeyboardEvent;
	    }(window.KeyboardEvent || function KeyboardEvent() {}));
	    defineProperty(window, 'KeyboardEvent', {value: o_O});
	    // Android 4 gotcha
	    if (KeyboardEvent !== o_O) KeyboardEvent = o_O;
	  }

	  // window.MouseEvent as constructor
	  try { new MouseEvent('_', {}); } catch (o_O) {
	    /* jshint -W022 */
	    o_O = (function ($MouseEvent) {
	      function MouseEvent(type, init) {
	        enoughArguments(arguments.length, 'MouseEvent');
	        var out = document.createEvent('MouseEvent');
	        if (!init) init = {};
	        out.initMouseEvent(
	          type,
	          !!init.bubbles,
	          !!init.cancelable,
	          init.view || window,
	          init.detail || 1,
	          init.screenX || 0,
	          init.screenY || 0,
	          init.clientX || 0,
	          init.clientY || 0,
	          !!init.ctrlKey,
	          !!init.altKey,
	          !!init.shiftKey,
	          !!init.metaKey,
	          init.button || 0,
	          init.relatedTarget || null
	        );
	        return out;
	      }
	      MouseEvent.prototype = $MouseEvent.prototype;
	      return MouseEvent;
	    }(window.MouseEvent || function MouseEvent() {}));
	    defineProperty(window, 'MouseEvent', {value: o_O});
	    // Android 4 gotcha
	    if (MouseEvent !== o_O) MouseEvent = o_O;
	  }

	}(window));(function (global){'use strict';

	  // a WeakMap fallback for DOM nodes only used as key
	  var DOMMap = global.WeakMap || (function () {

	    var
	      counter = 0,
	      dispatched = false,
	      drop = false,
	      value
	    ;

	    function dispatch(key, ce, shouldDrop) {
	      drop = shouldDrop;
	      dispatched = false;
	      value = undefined;
	      key.dispatchEvent(ce);
	    }

	    function Handler(value) {
	      this.value = value;
	    }

	    Handler.prototype.handleEvent = function handleEvent(e) {
	      dispatched = true;
	      if (drop) {
	        e.currentTarget.removeEventListener(e.type, this, false);
	      } else {
	        value = this.value;
	      }
	    };

	    function DOMMap() {
	      counter++;  // make id clashing highly improbable
	      this.__ce__ = new Event(('@DOMMap:' + counter) + Math.random());
	    }

	    DOMMap.prototype = {
	      'constructor': DOMMap,
	      'delete': function del(key) {
	        return dispatch(key, this.__ce__, true), dispatched;
	      },
	      'get': function get(key) {
	        dispatch(key, this.__ce__, false);
	        var v = value;
	        value = undefined;
	        return v;
	      },
	      'has': function has(key) {
	        return dispatch(key, this.__ce__, false), dispatched;
	      },
	      'set': function set(key, value) {
	        dispatch(key, this.__ce__, true);
	        key.addEventListener(this.__ce__.type, new Handler(value), false);
	        return this;
	      },
	    };

	    return DOMMap;

	  }());

	  function Dict() {}
	  Dict.prototype = (Object.create || Object)(null);

	  // https://dom.spec.whatwg.org/#interface-eventtarget

	  function createEventListener(type, callback, options) {
	    function eventListener(e) {
	      if (eventListener.once) {
	        e.currentTarget.removeEventListener(
	          e.type,
	          callback,
	          eventListener
	        );
	        eventListener.removed = true;
	      }
	      if (eventListener.passive) {
	        e.preventDefault = createEventListener.preventDefault;
	      }
	      if (typeof eventListener.callback === 'function') {
	        /* jshint validthis: true */
	        eventListener.callback.call(this, e);
	      } else if (eventListener.callback) {
	        eventListener.callback.handleEvent(e);
	      }
	      if (eventListener.passive) {
	        delete e.preventDefault;
	      }
	    }
	    eventListener.type = type;
	    eventListener.callback = callback;
	    eventListener.capture = !!options.capture;
	    eventListener.passive = !!options.passive;
	    eventListener.once = !!options.once;
	    // currently pointless but specs say to use it, so ...
	    eventListener.removed = false;
	    return eventListener;
	  }

	  createEventListener.preventDefault = function preventDefault() {};

	  var
	    Event = global.CustomEvent,
	    hOP = Object.prototype.hasOwnProperty,
	    dE = global.dispatchEvent,
	    aEL = global.addEventListener,
	    rEL = global.removeEventListener,
	    counter = 0,
	    increment = function () { counter++; },
	    indexOf = [].indexOf || function indexOf(value){
	      var length = this.length;
	      while(length--) {
	        if (this[length] === value) {
	          break;
	        }
	      }
	      return length;
	    },
	    getListenerKey = function (options) {
	      return ''.concat(
	        options.capture ? '1' : '0',
	        options.passive ? '1' : '0',
	        options.once ? '1' : '0'
	      );
	    },
	    augment, proto
	  ;

	  try {
	    aEL('_', increment, {once: true});
	    dE(new Event('_'));
	    dE(new Event('_'));
	    rEL('_', increment, {once: true});
	  } catch(o_O) {}

	  if (counter !== 1) {
	    (function () {
	      var dm = new DOMMap();
	      function createAEL(aEL) {
	        return function addEventListener(type, handler, options) {
	          if (options && typeof options !== 'boolean') {
	            var
	              info = dm.get(this),
	              key = getListenerKey(options),
	              i, tmp, wrap
	            ;
	            if (!info) dm.set(this, (info = new Dict()));
	            if (!(type in info)) info[type] = {
	              handler: [],
	              wrap: []
	            };
	            tmp = info[type];
	            i = indexOf.call(tmp.handler, handler);
	            if (i < 0) {
	              i = tmp.handler.push(handler) - 1;
	              tmp.wrap[i] = (wrap = new Dict());
	            } else {
	              wrap = tmp.wrap[i];
	            }
	            if (!(key in wrap)) {
	              wrap[key] = createEventListener(type, handler, options);
	              aEL.call(this, type, wrap[key], wrap[key].capture);
	            }
	          } else {
	            aEL.call(this, type, handler, options);
	          }
	        };
	      }
	      function createREL(rEL) {
	        return function removeEventListener(type, handler, options) {
	          if (options && typeof options !== 'boolean') {
	            var
	              info = dm.get(this),
	              key, i, tmp, wrap
	            ;
	            if (info && (type in info)) {
	              tmp = info[type];
	              i = indexOf.call(tmp.handler, handler);
	              if (-1 < i) {
	                key = getListenerKey(options);
	                wrap = tmp.wrap[i];
	                if (key in wrap) {
	                  rEL.call(this, type, wrap[key], wrap[key].capture);
	                  delete wrap[key];
	                  // return if there are other wraps
	                  for (key in wrap) return;
	                  // otherwise remove all the things
	                  tmp.handler.splice(i, 1);
	                  tmp.wrap.splice(i, 1);
	                  // if there are no other handlers
	                  if (tmp.handler.length === 0)
	                    // drop the info[type] entirely
	                    delete info[type];
	                }
	              }
	            }
	          } else {
	            rEL.call(this, type, handler, options);
	          }
	        };
	      }

	      augment = function (Constructor) {
	        if (!Constructor) return;
	        var proto = Constructor.prototype;
	        proto.addEventListener = createAEL(proto.addEventListener);
	        proto.removeEventListener = createREL(proto.removeEventListener);
	      };

	      if (global.EventTarget) {
	        augment(EventTarget);
	      } else {
	        augment(global.Text);
	        augment(global.Element || global.HTMLElement);
	        augment(global.HTMLDocument);
	        augment(global.Window || {prototype:global});
	        augment(global.XMLHttpRequest);
	      }

	    }());
	  }

	}(self));

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* CSS.supports polyfill | @version 0.4 | MIT License | github.com/termi/CSS.supports */
	;(function(){"use strict";function s(l){function e(){var b=d.length-1;0>b&&(t=!1);return d[b]}function a(c){var l=d.length-1;0>l&&(t=!1);b=d[l]=c}function m(b,c,a,d){r=a||h;var e,f,g;d&&r--;do if(a=l.charAt(++r),d)(g=a&&(e||f),"'"==a||'"'==a)?g=e=!e:e||(f||"("!=a?f&&")"==a&&(f=!1,g=!0):g=f=!0);while(g||a&&!(b&&a==b||c&&a!=c));if(null==b||a==b)return r}l||s.a();var d=[],f,b,t=!0,k,n,q,w,u,g=41,c,h=-1,r,v=l.length;for(d.push(void 0);++h<v;){1==c?g=40:2==c||4==c||32==c?g=41:64==c?g=39:16==c?g=103:8==c&&(g=16);f=l.charAt(h);
	if(g&1&&"n"==f&&"not"==l.substr(h,3))c=1,h+=2;else if(g&2&&"a"==f&&"and"==l.substr(h,3))c=2,h+=2;else if(g&4&&"o"==f&&"or"==l.substr(h,2))c=4,h++;else if(g&32&&"("==f&&m("("," "))c=32,h=r-1;else if(g&64&&")"==f&&1<d.length)c=64;else if(g&8&&"("==f&&(n=m(null," "))&&m(":",null,n)){c=8;h=r-1;q=l.substr(n,h-n+1).trim();n=0;w=null;continue}else if(g&16&&(n=m(null," "))&&m(")",null,n,!0))c=16,h=r,w=l.substr(n,h-n).trim(),n=0,f=" ";else if(" "==f)continue;else c=0;t&&f&&c&g||s.a();t=!0;if(4==c)!1===b?(a(),
	u=!1):!0===b&&(u=!0);else if(!u)if(b=e(),1==c)k=!0;else if(2==c)!1===b?u=!0:a();else{if(!1!==b||c&96)32==c?d.push(void 0):64==c?(u=!1,d.pop(),void 0!==e()&&(b=!!(b&e())),k=!1):16==c&&(a(p(q,w)),k&&(b=!b),k=!1,w=q=null);a(b)}}(!t||void 0===b||1<d.length)&&s.a();return b}var a=window,p,v,q,k=a.CSS;k||(k=a.CSS={});p=k.supports;!p&&a.supportsCSS&&(p=k.supports=a.supportsCSS.bind(a),a.__proto__&&delete a.__proto__.supportsCSS);if("function"===typeof p){var x;a:{try{p.call(k,"(a:a)");x=!(a=p=null);break a}catch(y){}x=
	void 0}if(x)return}else v="runtimeStyle"in document.documentElement,a=a.document.createElement("_"),q={},p=function(a,e,k,m,d){var f=m+"\\/"+d;if(f in q)return q[f];a=(m+"").replace(this,a);var b=m&&d&&a in e;if(b)if(v)if(/\(|\s/.test(d))try{e[a]=d,b=!!e[a]}catch(p){b=!1}else e.cssText="display:none;height:0;width:0;visibility:hidden;position:absolute;position:fixed;"+m+":"+d,document.documentElement.appendChild(k),b=k.currentStyle[a]==d,document.documentElement.removeChild(k);else e.cssText=m+":"+
	d,b=e[a],b=b==d||b&&0<e.length;e.cssText="";return q[f]=b}.bind(/(-)([a-z])/g,function(a,e,k){return k.toUpperCase()},a.style,v?a:null);s.a=function(){throw Error("SYNTAX_ERR");};k.supports=function(a,e){if(!arguments.length)throw Error("WRONG_ARGUMENTS_ERR");return 1==arguments.length?s(a):p(a,e)};a=a=null})();


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
	 * DOMParser HTML extension
	 * 2012-09-04
	 * 
	 * By Eli Grey, http://eligrey.com
	 * Public domain.
	 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
	 */

	/*! @source https://gist.github.com/1129031 */
	/*global document, DOMParser*/

	(function(DOMParser) {
		"use strict";

		var
		  DOMParser_proto = DOMParser.prototype
		, real_parseFromString = DOMParser_proto.parseFromString
		;

		// Firefox/Opera/IE throw errors on unsupported types
		try {
			// WebKit returns null on unsupported types
			if ((new DOMParser).parseFromString("", "text/html")) {
				// text/html parsing is natively supported
				return;
			}
		} catch (ex) {}

		DOMParser_proto.parseFromString = function(markup, type) {
			if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
				var
				  doc = document.implementation.createHTMLDocument("")
				;
		      		if (markup.toLowerCase().indexOf('<!doctype') > -1) {
	        			doc.documentElement.innerHTML = markup;
	      			}
	      			else {
	        			doc.body.innerHTML = markup;
	      			}
				return doc;
			} else {
				return real_parseFromString.apply(this, arguments);
			}
		};
	}(DOMParser));

/***/ },
/* 7 */
/***/ function(module, exports) {

	// IE用のXHR補完を取っ払ってBabel用にglobal入れ替え。

	(function(global) {

	  // babel fix
	  global = window;

	  // FormData interface
	  // Needed for: IE9-
	  (function() {
	    if ('FormData' in global)
	      return;

	    function FormData(form) {
	      this._data = [];
	      if (!form) return;
	      for (var i = 0; i < form.elements.length; ++i) {
	        var element = form.elements[i];
	        if (element.name !== '')
	          this.append(element.name, element.value);
	      }
	    }

	    FormData.prototype = {
	      append: function(name, value /*, filename */) {
	        if ('Blob' in global && value instanceof global.Blob)
	          throw TypeError("Blob not supported");
	        name = String(name);
	        this._data.push([name, value]);
	      },

	      toString: function() {
	        return this._data.map(function(pair) {
	          return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
	        }).join('&');
	      }
	    };

	    global.FormData = FormData;
	    var send = global.XMLHttpRequest.prototype.send;
	    global.XMLHttpRequest.prototype.send = function(body) {
	      if (body instanceof FormData) {
	        this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        arguments[0] = body.toString();
	      }
	      return send.apply(this, arguments);
	    };
	  }());

	}(this));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9)(__webpack_require__(10))

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript !== "undefined")
			execScript(src);
		else
			eval.call(null, src);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "// Copyright 2014 Google Inc. All rights reserved.\n//\n// Licensed under the Apache License, Version 2.0 (the \"License\");\n// you may not use this file except in compliance with the License.\n//     You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an \"AS IS\" BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n//     See the License for the specific language governing permissions and\n// limitations under the License.\n\n!function(a,b){var c={},d={},e={},f=null;!function(a,b){function c(a){if(\"number\"==typeof a)return a;var b={};for(var c in a)b[c]=a[c];return b}function d(){this._delay=0,this._endDelay=0,this._fill=\"none\",this._iterationStart=0,this._iterations=1,this._duration=0,this._playbackRate=1,this._direction=\"normal\",this._easing=\"linear\",this._easingFunction=x}function e(){return a.isDeprecated(\"Invalid timing inputs\",\"2016-03-02\",\"TypeError exceptions will be thrown instead.\",!0)}function f(b,c,e){var f=new d;return c&&(f.fill=\"both\",f.duration=\"auto\"),\"number\"!=typeof b||isNaN(b)?void 0!==b&&Object.getOwnPropertyNames(b).forEach(function(c){if(\"auto\"!=b[c]){if((\"number\"==typeof f[c]||\"duration\"==c)&&(\"number\"!=typeof b[c]||isNaN(b[c])))return;if(\"fill\"==c&&v.indexOf(b[c])==-1)return;if(\"direction\"==c&&w.indexOf(b[c])==-1)return;if(\"playbackRate\"==c&&1!==b[c]&&a.isDeprecated(\"AnimationEffectTiming.playbackRate\",\"2014-11-28\",\"Use Animation.playbackRate instead.\"))return;f[c]=b[c]}}):f.duration=b,f}function g(a){return\"number\"==typeof a&&(a=isNaN(a)?{duration:0}:{duration:a}),a}function h(b,c){return b=a.numericTimingToObject(b),f(b,c)}function i(a,b,c,d){return a<0||a>1||c<0||c>1?x:function(e){function f(a,b,c){return 3*a*(1-c)*(1-c)*c+3*b*(1-c)*c*c+c*c*c}if(e<=0){var g=0;return a>0?g=b/a:!b&&c>0&&(g=d/c),g*e}if(e>=1){var h=0;return c<1?h=(d-1)/(c-1):1==c&&a<1&&(h=(b-1)/(a-1)),1+h*(e-1)}for(var i=0,j=1;i<j;){var k=(i+j)/2,l=f(a,c,k);if(Math.abs(e-l)<1e-5)return f(b,d,k);l<e?i=k:j=k}return f(b,d,k)}}function j(a,b){return function(c){if(c>=1)return 1;var d=1/a;return c+=b*d,c-c%d}}function k(a){C||(C=document.createElement(\"div\").style),C.animationTimingFunction=\"\",C.animationTimingFunction=a;var b=C.animationTimingFunction;if(\"\"==b&&e())throw new TypeError(a+\" is not a valid value for easing\");return b}function l(a){if(\"linear\"==a)return x;var b=E.exec(a);if(b)return i.apply(this,b.slice(1).map(Number));var c=F.exec(a);if(c)return j(Number(c[1]),{start:y,middle:z,end:A}[c[2]]);var d=B[a];return d?d:x}function m(a){return Math.abs(n(a)/a.playbackRate)}function n(a){return 0===a.duration||0===a.iterations?0:a.duration*a.iterations}function o(a,b,c){if(null==b)return G;var d=c.delay+a+c.endDelay;return b<Math.min(c.delay,d)?H:b>=Math.min(c.delay+a,d)?I:J}function p(a,b,c,d,e){switch(d){case H:return\"backwards\"==b||\"both\"==b?0:null;case J:return c-e;case I:return\"forwards\"==b||\"both\"==b?a:null;case G:return null}}function q(a,b,c,d,e){var f=e;return 0===a?b!==H&&(f+=c):f+=d/a,f}function r(a,b,c,d,e,f){var g=a===1/0?b%1:a%1;return 0!==g||c!==I||0===d||0===e&&0!==f||(g=1),g}function s(a,b,c,d){return a===I&&b===1/0?1/0:1===c?Math.floor(d)-1:Math.floor(d)}function t(a,b,c){var d=a;if(\"normal\"!==a&&\"reverse\"!==a){var e=b;\"alternate-reverse\"===a&&(e+=1),d=\"normal\",e!==1/0&&e%2!==0&&(d=\"reverse\")}return\"normal\"===d?c:1-c}function u(a,b,c){var d=o(a,b,c),e=p(a,c.fill,b,d,c.delay);if(null===e)return null;var f=q(c.duration,d,c.iterations,e,c.iterationStart),g=r(f,c.iterationStart,d,c.iterations,e,c.duration),h=s(d,c.iterations,g,f),i=t(c.direction,h,g);return c._easingFunction(i)}var v=\"backwards|forwards|both|none\".split(\"|\"),w=\"reverse|alternate|alternate-reverse\".split(\"|\"),x=function(a){return a};d.prototype={_setMember:function(b,c){this[\"_\"+b]=c,this._effect&&(this._effect._timingInput[b]=c,this._effect._timing=a.normalizeTimingInput(this._effect._timingInput),this._effect.activeDuration=a.calculateActiveDuration(this._effect._timing),this._effect._animation&&this._effect._animation._rebuildUnderlyingAnimation())},get playbackRate(){return this._playbackRate},set delay(a){this._setMember(\"delay\",a)},get delay(){return this._delay},set endDelay(a){this._setMember(\"endDelay\",a)},get endDelay(){return this._endDelay},set fill(a){this._setMember(\"fill\",a)},get fill(){return this._fill},set iterationStart(a){if((isNaN(a)||a<0)&&e())throw new TypeError(\"iterationStart must be a non-negative number, received: \"+timing.iterationStart);this._setMember(\"iterationStart\",a)},get iterationStart(){return this._iterationStart},set duration(a){if(\"auto\"!=a&&(isNaN(a)||a<0)&&e())throw new TypeError(\"duration must be non-negative or auto, received: \"+a);this._setMember(\"duration\",a)},get duration(){return this._duration},set direction(a){this._setMember(\"direction\",a)},get direction(){return this._direction},set easing(a){this._easingFunction=l(k(a)),this._setMember(\"easing\",a)},get easing(){return this._easing},set iterations(a){if((isNaN(a)||a<0)&&e())throw new TypeError(\"iterations must be non-negative, received: \"+a);this._setMember(\"iterations\",a)},get iterations(){return this._iterations}};var y=1,z=.5,A=0,B={ease:i(.25,.1,.25,1),\"ease-in\":i(.42,0,1,1),\"ease-out\":i(0,0,.58,1),\"ease-in-out\":i(.42,0,.58,1),\"step-start\":j(1,y),\"step-middle\":j(1,z),\"step-end\":j(1,A)},C=null,D=\"\\\\s*(-?\\\\d+\\\\.?\\\\d*|-?\\\\.\\\\d+)\\\\s*\",E=new RegExp(\"cubic-bezier\\\\(\"+D+\",\"+D+\",\"+D+\",\"+D+\"\\\\)\"),F=/steps\\(\\s*(\\d+)\\s*,\\s*(start|middle|end)\\s*\\)/,G=0,H=1,I=2,J=3;a.cloneTimingInput=c,a.makeTiming=f,a.numericTimingToObject=g,a.normalizeTimingInput=h,a.calculateActiveDuration=m,a.calculateIterationProgress=u,a.calculatePhase=o,a.normalizeEasing=k,a.parseEasingFunction=l}(c,f),function(a,b){function c(a,b){return a in k?k[a][b]||b:b}function d(a){return\"display\"===a||0===a.lastIndexOf(\"animation\",0)||0===a.lastIndexOf(\"transition\",0)}function e(a,b,e){if(!d(a)){var f=h[a];if(f){i.style[a]=b;for(var g in f){var j=f[g],k=i.style[j];e[j]=c(j,k)}}else e[a]=c(a,b)}}function f(a){var b=[];for(var c in a)if(!(c in[\"easing\",\"offset\",\"composite\"])){var d=a[c];Array.isArray(d)||(d=[d]);for(var e,f=d.length,g=0;g<f;g++)e={},\"offset\"in a?e.offset=a.offset:1==f?e.offset=1:e.offset=g/(f-1),\"easing\"in a&&(e.easing=a.easing),\"composite\"in a&&(e.composite=a.composite),e[c]=d[g],b.push(e)}return b.sort(function(a,b){return a.offset-b.offset}),b}function g(b){function c(){var a=d.length;null==d[a-1].offset&&(d[a-1].offset=1),a>1&&null==d[0].offset&&(d[0].offset=0);for(var b=0,c=d[0].offset,e=1;e<a;e++){var f=d[e].offset;if(null!=f){for(var g=1;g<e-b;g++)d[b+g].offset=c+(f-c)*g/(e-b);b=e,c=f}}}if(null==b)return[];window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||(b=f(b));for(var d=b.map(function(b){var c={};for(var d in b){var f=b[d];if(\"offset\"==d){if(null!=f){if(f=Number(f),!isFinite(f))throw new TypeError(\"Keyframe offsets must be numbers.\");if(f<0||f>1)throw new TypeError(\"Keyframe offsets must be between 0 and 1.\")}}else if(\"composite\"==d){if(\"add\"==f||\"accumulate\"==f)throw{type:DOMException.NOT_SUPPORTED_ERR,name:\"NotSupportedError\",message:\"add compositing is not supported\"};if(\"replace\"!=f)throw new TypeError(\"Invalid composite mode \"+f+\".\")}else f=\"easing\"==d?a.normalizeEasing(f):\"\"+f;e(d,f,c)}return void 0==c.offset&&(c.offset=null),void 0==c.easing&&(c.easing=\"linear\"),c}),g=!0,h=-(1/0),i=0;i<d.length;i++){var j=d[i].offset;if(null!=j){if(j<h)throw new TypeError(\"Keyframes are not loosely sorted by offset. Sort or specify offsets.\");h=j}else g=!1}return d=d.filter(function(a){return a.offset>=0&&a.offset<=1}),g||c(),d}var h={background:[\"backgroundImage\",\"backgroundPosition\",\"backgroundSize\",\"backgroundRepeat\",\"backgroundAttachment\",\"backgroundOrigin\",\"backgroundClip\",\"backgroundColor\"],border:[\"borderTopColor\",\"borderTopStyle\",\"borderTopWidth\",\"borderRightColor\",\"borderRightStyle\",\"borderRightWidth\",\"borderBottomColor\",\"borderBottomStyle\",\"borderBottomWidth\",\"borderLeftColor\",\"borderLeftStyle\",\"borderLeftWidth\"],borderBottom:[\"borderBottomWidth\",\"borderBottomStyle\",\"borderBottomColor\"],borderColor:[\"borderTopColor\",\"borderRightColor\",\"borderBottomColor\",\"borderLeftColor\"],borderLeft:[\"borderLeftWidth\",\"borderLeftStyle\",\"borderLeftColor\"],borderRadius:[\"borderTopLeftRadius\",\"borderTopRightRadius\",\"borderBottomRightRadius\",\"borderBottomLeftRadius\"],borderRight:[\"borderRightWidth\",\"borderRightStyle\",\"borderRightColor\"],borderTop:[\"borderTopWidth\",\"borderTopStyle\",\"borderTopColor\"],borderWidth:[\"borderTopWidth\",\"borderRightWidth\",\"borderBottomWidth\",\"borderLeftWidth\"],flex:[\"flexGrow\",\"flexShrink\",\"flexBasis\"],font:[\"fontFamily\",\"fontSize\",\"fontStyle\",\"fontVariant\",\"fontWeight\",\"lineHeight\"],margin:[\"marginTop\",\"marginRight\",\"marginBottom\",\"marginLeft\"],outline:[\"outlineColor\",\"outlineStyle\",\"outlineWidth\"],padding:[\"paddingTop\",\"paddingRight\",\"paddingBottom\",\"paddingLeft\"]},i=document.createElementNS(\"http://www.w3.org/1999/xhtml\",\"div\"),j={thin:\"1px\",medium:\"3px\",thick:\"5px\"},k={borderBottomWidth:j,borderLeftWidth:j,borderRightWidth:j,borderTopWidth:j,fontSize:{\"xx-small\":\"60%\",\"x-small\":\"75%\",small:\"89%\",medium:\"100%\",large:\"120%\",\"x-large\":\"150%\",\"xx-large\":\"200%\"},fontWeight:{normal:\"400\",bold:\"700\"},outlineWidth:j,textShadow:{none:\"0px 0px 0px transparent\"},boxShadow:{none:\"0px 0px 0px 0px transparent\"}};a.convertToArrayForm=f,a.normalizeKeyframes=g}(c,f),function(a){var b={};a.isDeprecated=function(a,c,d,e){var f=e?\"are\":\"is\",g=new Date,h=new Date(c);return h.setMonth(h.getMonth()+3),!(g<h&&(a in b||console.warn(\"Web Animations: \"+a+\" \"+f+\" deprecated and will stop working on \"+h.toDateString()+\". \"+d),b[a]=!0,1))},a.deprecated=function(b,c,d,e){var f=e?\"are\":\"is\";if(a.isDeprecated(b,c,d,e))throw new Error(b+\" \"+f+\" no longer supported. \"+d)}}(c),function(){if(document.documentElement.animate){var a=document.documentElement.animate([],0),b=!0;if(a&&(b=!1,\"play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState\".split(\"|\").forEach(function(c){void 0===a[c]&&(b=!0)})),!b)return}!function(a,b,c){function d(a){for(var b={},c=0;c<a.length;c++)for(var d in a[c])if(\"offset\"!=d&&\"easing\"!=d&&\"composite\"!=d){var e={offset:a[c].offset,easing:a[c].easing,value:a[c][d]};b[d]=b[d]||[],b[d].push(e)}for(var f in b){var g=b[f];if(0!=g[0].offset||1!=g[g.length-1].offset)throw{type:DOMException.NOT_SUPPORTED_ERR,name:\"NotSupportedError\",message:\"Partial keyframes are not supported\"}}return b}function e(c){var d=[];for(var e in c)for(var f=c[e],g=0;g<f.length-1;g++){var h=g,i=g+1,j=f[h].offset,k=f[i].offset,l=j,m=k;0==g&&(l=-(1/0),0==k&&(i=h)),g==f.length-2&&(m=1/0,1==j&&(h=i)),d.push({applyFrom:l,applyTo:m,startOffset:f[h].offset,endOffset:f[i].offset,easingFunction:a.parseEasingFunction(f[h].easing),property:e,interpolation:b.propertyInterpolation(e,f[h].value,f[i].value)})}return d.sort(function(a,b){return a.startOffset-b.startOffset}),d}b.convertEffectInput=function(c){var f=a.normalizeKeyframes(c),g=d(f),h=e(g);return function(a,c){if(null!=c)h.filter(function(a){return c>=a.applyFrom&&c<a.applyTo}).forEach(function(d){var e=c-d.startOffset,f=d.endOffset-d.startOffset,g=0==f?0:d.easingFunction(e/f);b.apply(a,d.property,d.interpolation(g))});else for(var d in g)\"offset\"!=d&&\"easing\"!=d&&\"composite\"!=d&&b.clear(a,d)}}}(c,d,f),function(a,b,c){function d(a){return a.replace(/-(.)/g,function(a,b){return b.toUpperCase()})}function e(a,b,c){h[c]=h[c]||[],h[c].push([a,b])}function f(a,b,c){for(var f=0;f<c.length;f++){var g=c[f];e(a,b,d(g))}}function g(c,e,f){var g=c;/-/.test(c)&&!a.isDeprecated(\"Hyphenated property names\",\"2016-03-22\",\"Use camelCase instead.\",!0)&&(g=d(c)),\"initial\"!=e&&\"initial\"!=f||(\"initial\"==e&&(e=i[g]),\"initial\"==f&&(f=i[g]));for(var j=e==f?[]:h[g],k=0;j&&k<j.length;k++){var l=j[k][0](e),m=j[k][0](f);if(void 0!==l&&void 0!==m){var n=j[k][1](l,m);if(n){var o=b.Interpolation.apply(null,n);return function(a){return 0==a?e:1==a?f:o(a)}}}}return b.Interpolation(!1,!0,function(a){return a?f:e})}var h={};b.addPropertiesHandler=f;var i={backgroundColor:\"transparent\",backgroundPosition:\"0% 0%\",borderBottomColor:\"currentColor\",borderBottomLeftRadius:\"0px\",borderBottomRightRadius:\"0px\",borderBottomWidth:\"3px\",borderLeftColor:\"currentColor\",borderLeftWidth:\"3px\",borderRightColor:\"currentColor\",borderRightWidth:\"3px\",borderSpacing:\"2px\",borderTopColor:\"currentColor\",borderTopLeftRadius:\"0px\",borderTopRightRadius:\"0px\",borderTopWidth:\"3px\",bottom:\"auto\",clip:\"rect(0px, 0px, 0px, 0px)\",color:\"black\",fontSize:\"100%\",fontWeight:\"400\",height:\"auto\",left:\"auto\",letterSpacing:\"normal\",lineHeight:\"120%\",marginBottom:\"0px\",marginLeft:\"0px\",marginRight:\"0px\",marginTop:\"0px\",maxHeight:\"none\",maxWidth:\"none\",minHeight:\"0px\",minWidth:\"0px\",opacity:\"1.0\",outlineColor:\"invert\",outlineOffset:\"0px\",outlineWidth:\"3px\",paddingBottom:\"0px\",paddingLeft:\"0px\",paddingRight:\"0px\",paddingTop:\"0px\",right:\"auto\",textIndent:\"0px\",textShadow:\"0px 0px 0px transparent\",top:\"auto\",transform:\"\",verticalAlign:\"0px\",visibility:\"visible\",width:\"auto\",wordSpacing:\"normal\",zIndex:\"auto\"};b.propertyInterpolation=g}(c,d,f),function(a,b,c){function d(b){var c=a.calculateActiveDuration(b),d=function(d){return a.calculateIterationProgress(c,d,b)};return d._totalDuration=b.delay+c+b.endDelay,d}b.KeyframeEffect=function(c,e,f,g){var h,i=d(a.normalizeTimingInput(f)),j=b.convertEffectInput(e),k=function(){j(c,h)};return k._update=function(a){return h=i(a),null!==h},k._clear=function(){j(c,null)},k._hasSameTarget=function(a){return c===a},k._target=c,k._totalDuration=i._totalDuration,k._id=g,k},b.NullEffect=function(a){var b=function(){a&&(a(),a=null)};return b._update=function(){return null},b._totalDuration=0,b._hasSameTarget=function(){return!1},b}}(c,d,f),function(a,b){function c(a,b,c){c.enumerable=!0,c.configurable=!0,Object.defineProperty(a,b,c)}function d(a){this._surrogateStyle=document.createElementNS(\"http://www.w3.org/1999/xhtml\",\"div\").style,this._style=a.style,this._length=0,this._isAnimatedProperty={};for(var b=0;b<this._style.length;b++){var c=this._style[b];this._surrogateStyle[c]=this._style[c]}this._updateIndices()}function e(a){if(!a._webAnimationsPatchedStyle){var b=new d(a);try{c(a,\"style\",{get:function(){return b}})}catch(b){a.style._set=function(b,c){a.style[b]=c},a.style._clear=function(b){a.style[b]=\"\"}}a._webAnimationsPatchedStyle=a.style}}var f={cssText:1,length:1,parentRule:1},g={getPropertyCSSValue:1,getPropertyPriority:1,getPropertyValue:1,item:1,removeProperty:1,setProperty:1},h={removeProperty:1,setProperty:1};d.prototype={get cssText(){return this._surrogateStyle.cssText},set cssText(a){for(var b={},c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;this._surrogateStyle.cssText=a,this._updateIndices();for(var c=0;c<this._surrogateStyle.length;c++)b[this._surrogateStyle[c]]=!0;for(var d in b)this._isAnimatedProperty[d]||this._style.setProperty(d,this._surrogateStyle.getPropertyValue(d))},get length(){return this._surrogateStyle.length},get parentRule(){return this._style.parentRule},_updateIndices:function(){for(;this._length<this._surrogateStyle.length;)Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,get:function(a){return function(){return this._surrogateStyle[a]}}(this._length)}),this._length++;for(;this._length>this._surrogateStyle.length;)this._length--,Object.defineProperty(this,this._length,{configurable:!0,enumerable:!1,value:void 0})},_set:function(a,b){this._style[a]=b,this._isAnimatedProperty[a]=!0},_clear:function(a){this._style[a]=this._surrogateStyle[a],delete this._isAnimatedProperty[a]}};for(var i in g)d.prototype[i]=function(a,b){return function(){var c=this._surrogateStyle[a].apply(this._surrogateStyle,arguments);return b&&(this._isAnimatedProperty[arguments[0]]||this._style[a].apply(this._style,arguments),this._updateIndices()),c}}(i,i in h);for(var j in document.documentElement.style)j in f||j in g||!function(a){c(d.prototype,a,{get:function(){return this._surrogateStyle[a]},set:function(b){this._surrogateStyle[a]=b,this._updateIndices(),this._isAnimatedProperty[a]||(this._style[a]=b)}})}(j);a.apply=function(b,c,d){e(b),b.style._set(a.propertyName(c),d)},a.clear=function(b,c){b._webAnimationsPatchedStyle&&b.style._clear(a.propertyName(c))}}(d,f),function(a){window.Element.prototype.animate=function(b,c){var d=\"\";return c&&c.id&&(d=c.id),a.timeline._play(a.KeyframeEffect(this,b,c,d))}}(d),function(a,b){function c(a,b,d){if(\"number\"==typeof a&&\"number\"==typeof b)return a*(1-d)+b*d;if(\"boolean\"==typeof a&&\"boolean\"==typeof b)return d<.5?a:b;if(a.length==b.length){for(var e=[],f=0;f<a.length;f++)e.push(c(a[f],b[f],d));return e}throw\"Mismatched interpolation arguments \"+a+\":\"+b}a.Interpolation=function(a,b,d){return function(e){return d(c(a,b,e))}}}(d,f),function(a,b){function c(a,b,c){return Math.max(Math.min(a,c),b)}function d(b,d,e){var f=a.dot(b,d);f=c(f,-1,1);var g=[];if(1===f)g=b;else for(var h=Math.acos(f),i=1*Math.sin(e*h)/Math.sqrt(1-f*f),j=0;j<4;j++)g.push(b[j]*(Math.cos(e*h)-f*i)+d[j]*i);return g}var e=function(){function a(a,b){for(var c=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],d=0;d<4;d++)for(var e=0;e<4;e++)for(var f=0;f<4;f++)c[d][e]+=b[d][f]*a[f][e];return c}function b(a){return 0==a[0][2]&&0==a[0][3]&&0==a[1][2]&&0==a[1][3]&&0==a[2][0]&&0==a[2][1]&&1==a[2][2]&&0==a[2][3]&&0==a[3][2]&&1==a[3][3]}function c(c,d,e,f,g){for(var h=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]],i=0;i<4;i++)h[i][3]=g[i];for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[3][i]+=c[j]*h[j][i];var k=f[0],l=f[1],m=f[2],n=f[3],o=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];o[0][0]=1-2*(l*l+m*m),o[0][1]=2*(k*l-m*n),o[0][2]=2*(k*m+l*n),o[1][0]=2*(k*l+m*n),o[1][1]=1-2*(k*k+m*m),o[1][2]=2*(l*m-k*n),o[2][0]=2*(k*m-l*n),o[2][1]=2*(l*m+k*n),o[2][2]=1-2*(k*k+l*l),h=a(h,o);var p=[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]];e[2]&&(p[2][1]=e[2],h=a(h,p)),e[1]&&(p[2][1]=0,p[2][0]=e[0],h=a(h,p)),e[0]&&(p[2][0]=0,p[1][0]=e[0],h=a(h,p));for(var i=0;i<3;i++)for(var j=0;j<3;j++)h[i][j]*=d[i];return b(h)?[h[0][0],h[0][1],h[1][0],h[1][1],h[3][0],h[3][1]]:h[0].concat(h[1],h[2],h[3])}return c}();a.composeMatrix=e,a.quat=d}(d,f),function(a,b,c){a.sequenceNumber=0;var d=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type=\"finish\",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()};b.Animation=function(b){this.id=\"\",b&&b._id&&(this.id=b._id),this._sequenceNumber=a.sequenceNumber++,this._currentTime=0,this._startTime=null,this._paused=!1,this._playbackRate=1,this._inTimeline=!0,this._finishedFlag=!0,this.onfinish=null,this._finishHandlers=[],this._effect=b,this._inEffect=this._effect._update(0),this._idle=!0,this._currentTimePending=!1},b.Animation.prototype={_ensureAlive:function(){this.playbackRate<0&&0===this.currentTime?this._inEffect=this._effect._update(-1):this._inEffect=this._effect._update(this.currentTime),this._inTimeline||!this._inEffect&&this._finishedFlag||(this._inTimeline=!0,b.timeline._animations.push(this))},_tickCurrentTime:function(a,b){a!=this._currentTime&&(this._currentTime=a,this._isFinished&&!b&&(this._currentTime=this._playbackRate>0?this._totalDuration:0),this._ensureAlive())},get currentTime(){return this._idle||this._currentTimePending?null:this._currentTime},set currentTime(a){a=+a,isNaN(a)||(b.restart(),this._paused||null==this._startTime||(this._startTime=this._timeline.currentTime-a/this._playbackRate),this._currentTimePending=!1,this._currentTime!=a&&(this._idle&&(this._idle=!1,this._paused=!0),this._tickCurrentTime(a,!0),b.applyDirtiedAnimation(this)))},get startTime(){return this._startTime},set startTime(a){a=+a,isNaN(a)||this._paused||this._idle||(this._startTime=a,this._tickCurrentTime((this._timeline.currentTime-this._startTime)*this.playbackRate),b.applyDirtiedAnimation(this))},get playbackRate(){return this._playbackRate},set playbackRate(a){if(a!=this._playbackRate){var c=this.currentTime;this._playbackRate=a,this._startTime=null,\"paused\"!=this.playState&&\"idle\"!=this.playState&&(this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)),null!=c&&(this.currentTime=c)}},get _isFinished(){return!this._idle&&(this._playbackRate>0&&this._currentTime>=this._totalDuration||this._playbackRate<0&&this._currentTime<=0)},get _totalDuration(){return this._effect._totalDuration},get playState(){return this._idle?\"idle\":null==this._startTime&&!this._paused&&0!=this.playbackRate||this._currentTimePending?\"pending\":this._paused?\"paused\":this._isFinished?\"finished\":\"running\"},_rewind:function(){if(this._playbackRate>=0)this._currentTime=0;else{if(!(this._totalDuration<1/0))throw new DOMException(\"Unable to rewind negative playback rate animation with infinite duration\",\"InvalidStateError\");this._currentTime=this._totalDuration}},play:function(){this._paused=!1,(this._isFinished||this._idle)&&(this._rewind(),this._startTime=null),this._finishedFlag=!1,this._idle=!1,this._ensureAlive(),b.applyDirtiedAnimation(this)},pause:function(){this._isFinished||this._paused||this._idle?this._idle&&(this._rewind(),this._idle=!1):this._currentTimePending=!0,this._startTime=null,this._paused=!0},finish:function(){this._idle||(this.currentTime=this._playbackRate>0?this._totalDuration:0,this._startTime=this._totalDuration-this.currentTime,this._currentTimePending=!1,b.applyDirtiedAnimation(this))},cancel:function(){this._inEffect&&(this._inEffect=!1,this._idle=!0,this._paused=!1,this._isFinished=!0,this._finishedFlag=!0,this._currentTime=0,this._startTime=null,this._effect._update(null),b.applyDirtiedAnimation(this))},reverse:function(){this.playbackRate*=-1,this.play()},addEventListener:function(a,b){\"function\"==typeof b&&\"finish\"==a&&this._finishHandlers.push(b)},removeEventListener:function(a,b){if(\"finish\"==a){var c=this._finishHandlers.indexOf(b);c>=0&&this._finishHandlers.splice(c,1)}},_fireEvents:function(a){if(this._isFinished){if(!this._finishedFlag){var b=new d(this,this._currentTime,a),c=this._finishHandlers.concat(this.onfinish?[this.onfinish]:[]);setTimeout(function(){c.forEach(function(a){a.call(b.target,b)})},0),this._finishedFlag=!0}}else this._finishedFlag=!1},_tick:function(a,b){this._idle||this._paused||(null==this._startTime?b&&(this.startTime=a-this._currentTime/this.playbackRate):this._isFinished||this._tickCurrentTime((a-this._startTime)*this.playbackRate)),b&&(this._currentTimePending=!1,this._fireEvents(a))},get _needsTick(){return this.playState in{pending:1,running:1}||!this._finishedFlag},_targetAnimations:function(){var a=this._effect._target;return a._activeAnimations||(a._activeAnimations=[]),a._activeAnimations},_markTarget:function(){var a=this._targetAnimations();a.indexOf(this)===-1&&a.push(this)},_unmarkTarget:function(){var a=this._targetAnimations(),b=a.indexOf(this);b!==-1&&a.splice(b,1)}}}(c,d,f),function(a,b,c){function d(a){var b=j;j=[],a<q.currentTime&&(a=q.currentTime),q._animations.sort(e),q._animations=h(a,!0,q._animations)[0],b.forEach(function(b){b[1](a)}),g(),l=void 0}function e(a,b){return a._sequenceNumber-b._sequenceNumber}function f(){this._animations=[],this.currentTime=window.performance&&performance.now?performance.now():0}function g(){o.forEach(function(a){a()}),o.length=0}function h(a,c,d){p=!0,n=!1;var e=b.timeline;e.currentTime=a,m=!1;var f=[],g=[],h=[],i=[];return d.forEach(function(b){b._tick(a,c),b._inEffect?(g.push(b._effect),b._markTarget()):(f.push(b._effect),b._unmarkTarget()),b._needsTick&&(m=!0);var d=b._inEffect||b._needsTick;b._inTimeline=d,d?h.push(b):i.push(b)}),o.push.apply(o,f),o.push.apply(o,g),m&&requestAnimationFrame(function(){}),p=!1,[h,i]}var i=window.requestAnimationFrame,j=[],k=0;window.requestAnimationFrame=function(a){var b=k++;return 0==j.length&&i(d),j.push([b,a]),b},window.cancelAnimationFrame=function(a){j.forEach(function(b){b[0]==a&&(b[1]=function(){})})},f.prototype={_play:function(c){c._timing=a.normalizeTimingInput(c.timing);var d=new b.Animation(c);return d._idle=!1,d._timeline=this,this._animations.push(d),b.restart(),b.applyDirtiedAnimation(d),d}};var l=void 0,m=!1,n=!1;b.restart=function(){return m||(m=!0,requestAnimationFrame(function(){}),n=!0),n},b.applyDirtiedAnimation=function(a){if(!p){a._markTarget();var c=a._targetAnimations();c.sort(e);var d=h(b.timeline.currentTime,!1,c.slice())[1];d.forEach(function(a){var b=q._animations.indexOf(a);b!==-1&&q._animations.splice(b,1)}),g()}};var o=[],p=!1,q=new f;b.timeline=q}(c,d,f),function(a,b){function c(a,b){for(var c=0,d=0;d<a.length;d++)c+=a[d]*b[d];return c}function d(a,b){return[a[0]*b[0]+a[4]*b[1]+a[8]*b[2]+a[12]*b[3],a[1]*b[0]+a[5]*b[1]+a[9]*b[2]+a[13]*b[3],a[2]*b[0]+a[6]*b[1]+a[10]*b[2]+a[14]*b[3],a[3]*b[0]+a[7]*b[1]+a[11]*b[2]+a[15]*b[3],a[0]*b[4]+a[4]*b[5]+a[8]*b[6]+a[12]*b[7],a[1]*b[4]+a[5]*b[5]+a[9]*b[6]+a[13]*b[7],a[2]*b[4]+a[6]*b[5]+a[10]*b[6]+a[14]*b[7],a[3]*b[4]+a[7]*b[5]+a[11]*b[6]+a[15]*b[7],a[0]*b[8]+a[4]*b[9]+a[8]*b[10]+a[12]*b[11],a[1]*b[8]+a[5]*b[9]+a[9]*b[10]+a[13]*b[11],a[2]*b[8]+a[6]*b[9]+a[10]*b[10]+a[14]*b[11],a[3]*b[8]+a[7]*b[9]+a[11]*b[10]+a[15]*b[11],a[0]*b[12]+a[4]*b[13]+a[8]*b[14]+a[12]*b[15],a[1]*b[12]+a[5]*b[13]+a[9]*b[14]+a[13]*b[15],a[2]*b[12]+a[6]*b[13]+a[10]*b[14]+a[14]*b[15],a[3]*b[12]+a[7]*b[13]+a[11]*b[14]+a[15]*b[15]]}function e(a){var b=a.rad||0,c=a.deg||0,d=a.grad||0,e=a.turn||0,f=(c/360+d/400+e)*(2*Math.PI)+b;return f}function f(a){switch(a.t){case\"rotatex\":var b=e(a.d[0]);return[1,0,0,0,0,Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1];case\"rotatey\":var b=e(a.d[0]);return[Math.cos(b),0,-Math.sin(b),0,0,1,0,0,Math.sin(b),0,Math.cos(b),0,0,0,0,1];case\"rotate\":case\"rotatez\":var b=e(a.d[0]);return[Math.cos(b),Math.sin(b),0,0,-Math.sin(b),Math.cos(b),0,0,0,0,1,0,0,0,0,1];case\"rotate3d\":var c=a.d[0],d=a.d[1],f=a.d[2],b=e(a.d[3]),g=c*c+d*d+f*f;if(0===g)c=1,d=0,f=0;else if(1!==g){var h=Math.sqrt(g);c/=h,d/=h,f/=h}var i=Math.sin(b/2),j=i*Math.cos(b/2),k=i*i;return[1-2*(d*d+f*f)*k,2*(c*d*k+f*j),2*(c*f*k-d*j),0,2*(c*d*k-f*j),1-2*(c*c+f*f)*k,2*(d*f*k+c*j),0,2*(c*f*k+d*j),2*(d*f*k-c*j),1-2*(c*c+d*d)*k,0,0,0,0,1];case\"scale\":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,1,0,0,0,0,1];case\"scalex\":return[a.d[0],0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];case\"scaley\":return[1,0,0,0,0,a.d[0],0,0,0,0,1,0,0,0,0,1];case\"scalez\":return[1,0,0,0,0,1,0,0,0,0,a.d[0],0,0,0,0,1];case\"scale3d\":return[a.d[0],0,0,0,0,a.d[1],0,0,0,0,a.d[2],0,0,0,0,1];case\"skew\":var l=e(a.d[0]),m=e(a.d[1]);return[1,Math.tan(m),0,0,Math.tan(l),1,0,0,0,0,1,0,0,0,0,1];case\"skewx\":var b=e(a.d[0]);return[1,0,0,0,Math.tan(b),1,0,0,0,0,1,0,0,0,0,1];case\"skewy\":var b=e(a.d[0]);return[1,Math.tan(b),0,0,0,1,0,0,0,0,1,0,0,0,0,1];case\"translate\":var c=a.d[0].px||0,d=a.d[1].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,0,1];case\"translatex\":var c=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,0,0,1];case\"translatey\":var d=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,d,0,1];case\"translatez\":var f=a.d[0].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,f,1];case\"translate3d\":var c=a.d[0].px||0,d=a.d[1].px||0,f=a.d[2].px||0;return[1,0,0,0,0,1,0,0,0,0,1,0,c,d,f,1];case\"perspective\":var n=a.d[0].px?-1/a.d[0].px:0;return[1,0,0,0,0,1,0,0,0,0,1,n,0,0,0,1];case\"matrix\":return[a.d[0],a.d[1],0,0,a.d[2],a.d[3],0,0,0,0,1,0,a.d[4],a.d[5],0,1];case\"matrix3d\":return a.d}}function g(a){return 0===a.length?[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]:a.map(f).reduce(d)}function h(a){return[i(g(a))]}var i=function(){function a(a){return a[0][0]*a[1][1]*a[2][2]+a[1][0]*a[2][1]*a[0][2]+a[2][0]*a[0][1]*a[1][2]-a[0][2]*a[1][1]*a[2][0]-a[1][2]*a[2][1]*a[0][0]-a[2][2]*a[0][1]*a[1][0]}function b(b){for(var c=1/a(b),d=b[0][0],e=b[0][1],f=b[0][2],g=b[1][0],h=b[1][1],i=b[1][2],j=b[2][0],k=b[2][1],l=b[2][2],m=[[(h*l-i*k)*c,(f*k-e*l)*c,(e*i-f*h)*c,0],[(i*j-g*l)*c,(d*l-f*j)*c,(f*g-d*i)*c,0],[(g*k-h*j)*c,(j*e-d*k)*c,(d*h-e*g)*c,0]],n=[],o=0;o<3;o++){for(var p=0,q=0;q<3;q++)p+=b[3][q]*m[q][o];n.push(p)}return n.push(1),m.push(n),m}function d(a){return[[a[0][0],a[1][0],a[2][0],a[3][0]],[a[0][1],a[1][1],a[2][1],a[3][1]],[a[0][2],a[1][2],a[2][2],a[3][2]],[a[0][3],a[1][3],a[2][3],a[3][3]]]}function e(a,b){for(var c=[],d=0;d<4;d++){for(var e=0,f=0;f<4;f++)e+=a[f]*b[f][d];c.push(e)}return c}function f(a){var b=g(a);return[a[0]/b,a[1]/b,a[2]/b]}function g(a){return Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2])}function h(a,b,c,d){return[c*a[0]+d*b[0],c*a[1]+d*b[1],c*a[2]+d*b[2]]}function i(a,b){return[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}function j(j){var k=[j.slice(0,4),j.slice(4,8),j.slice(8,12),j.slice(12,16)];if(1!==k[3][3])return null;for(var l=[],m=0;m<4;m++)l.push(k[m].slice());for(var m=0;m<3;m++)l[m][3]=0;if(0===a(l))return!1;var n,o=[];if(k[0][3]||k[1][3]||k[2][3]){o.push(k[0][3]),o.push(k[1][3]),o.push(k[2][3]),o.push(k[3][3]);var p=b(l),q=d(p);n=e(o,q)}else n=[0,0,0,1];var r=k[3].slice(0,3),s=[];s.push(k[0].slice(0,3));var t=[];t.push(g(s[0])),s[0]=f(s[0]);var u=[];s.push(k[1].slice(0,3)),u.push(c(s[0],s[1])),s[1]=h(s[1],s[0],1,-u[0]),t.push(g(s[1])),s[1]=f(s[1]),u[0]/=t[1],s.push(k[2].slice(0,3)),u.push(c(s[0],s[2])),s[2]=h(s[2],s[0],1,-u[1]),u.push(c(s[1],s[2])),s[2]=h(s[2],s[1],1,-u[2]),t.push(g(s[2])),s[2]=f(s[2]),u[1]/=t[2],u[2]/=t[2];var v=i(s[1],s[2]);if(c(s[0],v)<0)for(var m=0;m<3;m++)t[m]*=-1,s[m][0]*=-1,s[m][1]*=-1,s[m][2]*=-1;var w,x,y=s[0][0]+s[1][1]+s[2][2]+1;return y>1e-4?(w=.5/Math.sqrt(y),x=[(s[2][1]-s[1][2])*w,(s[0][2]-s[2][0])*w,(s[1][0]-s[0][1])*w,.25/w]):s[0][0]>s[1][1]&&s[0][0]>s[2][2]?(w=2*Math.sqrt(1+s[0][0]-s[1][1]-s[2][2]),x=[.25*w,(s[0][1]+s[1][0])/w,(s[0][2]+s[2][0])/w,(s[2][1]-s[1][2])/w]):s[1][1]>s[2][2]?(w=2*Math.sqrt(1+s[1][1]-s[0][0]-s[2][2]),x=[(s[0][1]+s[1][0])/w,.25*w,(s[1][2]+s[2][1])/w,(s[0][2]-s[2][0])/w]):(w=2*Math.sqrt(1+s[2][2]-s[0][0]-s[1][1]),x=[(s[0][2]+s[2][0])/w,(s[1][2]+s[2][1])/w,.25*w,(s[1][0]-s[0][1])/w]),[r,t,u,x,n]}return j}();a.dot=c,a.makeMatrixDecomposition=h}(d,f),function(a){function b(a,b){var c=a.exec(b);if(c)return c=a.ignoreCase?c[0].toLowerCase():c[0],[c,b.substr(c.length)]}function c(a,b){b=b.replace(/^\\s*/,\"\");var c=a(b);if(c)return[c[0],c[1].replace(/^\\s*/,\"\")]}function d(a,d,e){a=c.bind(null,a);for(var f=[];;){var g=a(e);if(!g)return[f,e];if(f.push(g[0]),e=g[1],g=b(d,e),!g||\"\"==g[1])return[f,e];e=g[1]}}function e(a,b){for(var c=0,d=0;d<b.length&&(!/\\s|,/.test(b[d])||0!=c);d++)if(\"(\"==b[d])c++;else if(\")\"==b[d]&&(c--,0==c&&d++,c<=0))break;var e=a(b.substr(0,d));return void 0==e?void 0:[e,b.substr(d)]}function f(a,b){for(var c=a,d=b;c&&d;)c>d?c%=d:d%=c;return c=a*b/(c+d)}function g(a){return function(b){var c=a(b);return c&&(c[0]=void 0),c}}function h(a,b){return function(c){var d=a(c);return d?d:[b,c]}}function i(b,c){for(var d=[],e=0;e<b.length;e++){var f=a.consumeTrimmed(b[e],c);if(!f||\"\"==f[0])return;void 0!==f[0]&&d.push(f[0]),c=f[1]}if(\"\"==c)return d}function j(a,b,c,d,e){for(var g=[],h=[],i=[],j=f(d.length,e.length),k=0;k<j;k++){var l=b(d[k%d.length],e[k%e.length]);if(!l)return;g.push(l[0]),h.push(l[1]),i.push(l[2])}return[g,h,function(b){var d=b.map(function(a,b){return i[b](a)}).join(c);return a?a(d):d}]}function k(a,b,c){for(var d=[],e=[],f=[],g=0,h=0;h<c.length;h++)if(\"function\"==typeof c[h]){var i=c[h](a[g],b[g++]);d.push(i[0]),e.push(i[1]),f.push(i[2])}else!function(a){d.push(!1),e.push(!1),f.push(function(){return c[a]})}(h);return[d,e,function(a){for(var b=\"\",c=0;c<a.length;c++)b+=f[c](a[c]);return b}]}a.consumeToken=b,a.consumeTrimmed=c,a.consumeRepeated=d,a.consumeParenthesised=e,a.ignore=g,a.optional=h,a.consumeList=i,a.mergeNestedRepeated=j.bind(null,null),a.mergeWrappedNestedRepeated=j,a.mergeList=k}(d),function(a){function b(b){function c(b){var c=a.consumeToken(/^inset/i,b);if(c)return d.inset=!0,c;var c=a.consumeLengthOrPercent(b);if(c)return d.lengths.push(c[0]),c;var c=a.consumeColor(b);return c?(d.color=c[0],c):void 0}var d={inset:!1,lengths:[],color:null},e=a.consumeRepeated(c,/^/,b);if(e&&e[0].length)return[d,e[1]]}function c(c){var d=a.consumeRepeated(b,/^,/,c);if(d&&\"\"==d[1])return d[0]}function d(b,c){for(;b.lengths.length<Math.max(b.lengths.length,c.lengths.length);)b.lengths.push({px:0});for(;c.lengths.length<Math.max(b.lengths.length,c.lengths.length);)c.lengths.push({px:0});if(b.inset==c.inset&&!!b.color==!!c.color){for(var d,e=[],f=[[],0],g=[[],0],h=0;h<b.lengths.length;h++){var i=a.mergeDimensions(b.lengths[h],c.lengths[h],2==h);f[0].push(i[0]),g[0].push(i[1]),e.push(i[2])}if(b.color&&c.color){var j=a.mergeColors(b.color,c.color);f[1]=j[0],g[1]=j[1],d=j[2];\n}return[f,g,function(a){for(var c=b.inset?\"inset \":\" \",f=0;f<e.length;f++)c+=e[f](a[0][f])+\" \";return d&&(c+=d(a[1])),c}]}}function e(b,c,d,e){function f(a){return{inset:a,color:[0,0,0,0],lengths:[{px:0},{px:0},{px:0},{px:0}]}}for(var g=[],h=[],i=0;i<d.length||i<e.length;i++){var j=d[i]||f(e[i].inset),k=e[i]||f(d[i].inset);g.push(j),h.push(k)}return a.mergeNestedRepeated(b,c,g,h)}var f=e.bind(null,d,\", \");a.addPropertiesHandler(c,f,[\"box-shadow\",\"text-shadow\"])}(d),function(a,b){function c(a){return a.toFixed(3).replace(\".000\",\"\")}function d(a,b,c){return Math.min(b,Math.max(a,c))}function e(a){if(/^\\s*[-+]?(\\d*\\.)?\\d+\\s*$/.test(a))return Number(a)}function f(a,b){return[a,b,c]}function g(a,b){if(0!=a)return i(0,1/0)(a,b)}function h(a,b){return[a,b,function(a){return Math.round(d(1,1/0,a))}]}function i(a,b){return function(e,f){return[e,f,function(e){return c(d(a,b,e))}]}}function j(a,b){return[a,b,Math.round]}a.clamp=d,a.addPropertiesHandler(e,i(0,1/0),[\"border-image-width\",\"line-height\"]),a.addPropertiesHandler(e,i(0,1),[\"opacity\",\"shape-image-threshold\"]),a.addPropertiesHandler(e,g,[\"flex-grow\",\"flex-shrink\"]),a.addPropertiesHandler(e,h,[\"orphans\",\"widows\"]),a.addPropertiesHandler(e,j,[\"z-index\"]),a.parseNumber=e,a.mergeNumbers=f,a.numberToString=c}(d,f),function(a,b){function c(a,b){if(\"visible\"==a||\"visible\"==b)return[0,1,function(c){return c<=0?a:c>=1?b:\"visible\"}]}a.addPropertiesHandler(String,c,[\"visibility\"])}(d),function(a,b){function c(a){a=a.trim(),f.fillStyle=\"#000\",f.fillStyle=a;var b=f.fillStyle;if(f.fillStyle=\"#fff\",f.fillStyle=a,b==f.fillStyle){f.fillRect(0,0,1,1);var c=f.getImageData(0,0,1,1).data;f.clearRect(0,0,1,1);var d=c[3]/255;return[c[0]*d,c[1]*d,c[2]*d,d]}}function d(b,c){return[b,c,function(b){function c(a){return Math.max(0,Math.min(255,a))}if(b[3])for(var d=0;d<3;d++)b[d]=Math.round(c(b[d]/b[3]));return b[3]=a.numberToString(a.clamp(0,1,b[3])),\"rgba(\"+b.join(\",\")+\")\"}]}var e=document.createElementNS(\"http://www.w3.org/1999/xhtml\",\"canvas\");e.width=e.height=1;var f=e.getContext(\"2d\");a.addPropertiesHandler(c,d,[\"background-color\",\"border-bottom-color\",\"border-left-color\",\"border-right-color\",\"border-top-color\",\"color\",\"outline-color\",\"text-decoration-color\"]),a.consumeColor=a.consumeParenthesised.bind(null,c),a.mergeColors=d}(d,f),function(a,b){function c(a,b){if(b=b.trim().toLowerCase(),\"0\"==b&&\"px\".search(a)>=0)return{px:0};if(/^[^(]*$|^calc/.test(b)){b=b.replace(/calc\\(/g,\"(\");var c={};b=b.replace(a,function(a){return c[a]=null,\"U\"+a});for(var d=\"U(\"+a.source+\")\",e=b.replace(/[-+]?(\\d*\\.)?\\d+/g,\"N\").replace(new RegExp(\"N\"+d,\"g\"),\"D\").replace(/\\s[+-]\\s/g,\"O\").replace(/\\s/g,\"\"),f=[/N\\*(D)/g,/(N|D)[*\\/]N/g,/(N|D)O\\1/g,/\\((N|D)\\)/g],g=0;g<f.length;)f[g].test(e)?(e=e.replace(f[g],\"$1\"),g=0):g++;if(\"D\"==e){for(var h in c){var i=eval(b.replace(new RegExp(\"U\"+h,\"g\"),\"\").replace(new RegExp(d,\"g\"),\"*0\"));if(!isFinite(i))return;c[h]=i}return c}}}function d(a,b){return e(a,b,!0)}function e(b,c,d){var e,f=[];for(e in b)f.push(e);for(e in c)f.indexOf(e)<0&&f.push(e);return b=f.map(function(a){return b[a]||0}),c=f.map(function(a){return c[a]||0}),[b,c,function(b){var c=b.map(function(c,e){return 1==b.length&&d&&(c=Math.max(c,0)),a.numberToString(c)+f[e]}).join(\" + \");return b.length>1?\"calc(\"+c+\")\":c}]}var f=\"px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc\",g=c.bind(null,new RegExp(f,\"g\")),h=c.bind(null,new RegExp(f+\"|%\",\"g\")),i=c.bind(null,/deg|rad|grad|turn/g);a.parseLength=g,a.parseLengthOrPercent=h,a.consumeLengthOrPercent=a.consumeParenthesised.bind(null,h),a.parseAngle=i,a.mergeDimensions=e;var j=a.consumeParenthesised.bind(null,g),k=a.consumeRepeated.bind(void 0,j,/^/),l=a.consumeRepeated.bind(void 0,k,/^,/);a.consumeSizePairList=l;var m=function(a){var b=l(a);if(b&&\"\"==b[1])return b[0]},n=a.mergeNestedRepeated.bind(void 0,d,\" \"),o=a.mergeNestedRepeated.bind(void 0,n,\",\");a.mergeNonNegativeSizePair=n,a.addPropertiesHandler(m,o,[\"background-size\"]),a.addPropertiesHandler(h,d,[\"border-bottom-width\",\"border-image-width\",\"border-left-width\",\"border-right-width\",\"border-top-width\",\"flex-basis\",\"font-size\",\"height\",\"line-height\",\"max-height\",\"max-width\",\"outline-width\",\"width\"]),a.addPropertiesHandler(h,e,[\"border-bottom-left-radius\",\"border-bottom-right-radius\",\"border-top-left-radius\",\"border-top-right-radius\",\"bottom\",\"left\",\"letter-spacing\",\"margin-bottom\",\"margin-left\",\"margin-right\",\"margin-top\",\"min-height\",\"min-width\",\"outline-offset\",\"padding-bottom\",\"padding-left\",\"padding-right\",\"padding-top\",\"perspective\",\"right\",\"shape-margin\",\"text-indent\",\"top\",\"vertical-align\",\"word-spacing\"])}(d,f),function(a,b){function c(b){return a.consumeLengthOrPercent(b)||a.consumeToken(/^auto/,b)}function d(b){var d=a.consumeList([a.ignore(a.consumeToken.bind(null,/^rect/)),a.ignore(a.consumeToken.bind(null,/^\\(/)),a.consumeRepeated.bind(null,c,/^,/),a.ignore(a.consumeToken.bind(null,/^\\)/))],b);if(d&&4==d[0].length)return d[0]}function e(b,c){return\"auto\"==b||\"auto\"==c?[!0,!1,function(d){var e=d?b:c;if(\"auto\"==e)return\"auto\";var f=a.mergeDimensions(e,e);return f[2](f[0])}]:a.mergeDimensions(b,c)}function f(a){return\"rect(\"+a+\")\"}var g=a.mergeWrappedNestedRepeated.bind(null,f,e,\", \");a.parseBox=d,a.mergeBoxes=g,a.addPropertiesHandler(d,g,[\"clip\"])}(d,f),function(a,b){function c(a){return function(b){var c=0;return a.map(function(a){return a===k?b[c++]:a})}}function d(a){return a}function e(b){if(b=b.toLowerCase().trim(),\"none\"==b)return[];for(var c,d=/\\s*(\\w+)\\(([^)]*)\\)/g,e=[],f=0;c=d.exec(b);){if(c.index!=f)return;f=c.index+c[0].length;var g=c[1],h=n[g];if(!h)return;var i=c[2].split(\",\"),j=h[0];if(j.length<i.length)return;for(var k=[],o=0;o<j.length;o++){var p,q=i[o],r=j[o];if(p=q?{A:function(b){return\"0\"==b.trim()?m:a.parseAngle(b)},N:a.parseNumber,T:a.parseLengthOrPercent,L:a.parseLength}[r.toUpperCase()](q):{a:m,n:k[0],t:l}[r],void 0===p)return;k.push(p)}if(e.push({t:g,d:k}),d.lastIndex==b.length)return e}}function f(a){return a.toFixed(6).replace(\".000000\",\"\")}function g(b,c){if(b.decompositionPair!==c){b.decompositionPair=c;var d=a.makeMatrixDecomposition(b)}if(c.decompositionPair!==b){c.decompositionPair=b;var e=a.makeMatrixDecomposition(c)}return null==d[0]||null==e[0]?[[!1],[!0],function(a){return a?c[0].d:b[0].d}]:(d[0].push(0),e[0].push(1),[d,e,function(b){var c=a.quat(d[0][3],e[0][3],b[5]),g=a.composeMatrix(b[0],b[1],b[2],c,b[4]),h=g.map(f).join(\",\");return h}])}function h(a){return a.replace(/[xy]/,\"\")}function i(a){return a.replace(/(x|y|z|3d)?$/,\"3d\")}function j(b,c){var d=a.makeMatrixDecomposition&&!0,e=!1;if(!b.length||!c.length){b.length||(e=!0,b=c,c=[]);for(var f=0;f<b.length;f++){var j=b[f].t,k=b[f].d,l=\"scale\"==j.substr(0,5)?1:0;c.push({t:j,d:k.map(function(a){if(\"number\"==typeof a)return l;var b={};for(var c in a)b[c]=l;return b})})}}var m=function(a,b){return\"perspective\"==a&&\"perspective\"==b||(\"matrix\"==a||\"matrix3d\"==a)&&(\"matrix\"==b||\"matrix3d\"==b)},o=[],p=[],q=[];if(b.length!=c.length){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[[\"matrix\",[r[2]]]]}else for(var f=0;f<b.length;f++){var j,s=b[f].t,t=c[f].t,u=b[f].d,v=c[f].d,w=n[s],x=n[t];if(m(s,t)){if(!d)return;var r=g([b[f]],[c[f]]);o.push(r[0]),p.push(r[1]),q.push([\"matrix\",[r[2]]])}else{if(s==t)j=s;else if(w[2]&&x[2]&&h(s)==h(t))j=h(s),u=w[2](u),v=x[2](v);else{if(!w[1]||!x[1]||i(s)!=i(t)){if(!d)return;var r=g(b,c);o=[r[0]],p=[r[1]],q=[[\"matrix\",[r[2]]]];break}j=i(s),u=w[1](u),v=x[1](v)}for(var y=[],z=[],A=[],B=0;B<u.length;B++){var C=\"number\"==typeof u[B]?a.mergeNumbers:a.mergeDimensions,r=C(u[B],v[B]);y[B]=r[0],z[B]=r[1],A.push(r[2])}o.push(y),p.push(z),q.push([j,A])}}if(e){var D=o;o=p,p=D}return[o,p,function(a){return a.map(function(a,b){var c=a.map(function(a,c){return q[b][1][c](a)}).join(\",\");return\"matrix\"==q[b][0]&&16==c.split(\",\").length&&(q[b][0]=\"matrix3d\"),q[b][0]+\"(\"+c+\")\"}).join(\" \")}]}var k=null,l={px:0},m={deg:0},n={matrix:[\"NNNNNN\",[k,k,0,0,k,k,0,0,0,0,1,0,k,k,0,1],d],matrix3d:[\"NNNNNNNNNNNNNNNN\",d],rotate:[\"A\"],rotatex:[\"A\"],rotatey:[\"A\"],rotatez:[\"A\"],rotate3d:[\"NNNA\"],perspective:[\"L\"],scale:[\"Nn\",c([k,k,1]),d],scalex:[\"N\",c([k,1,1]),c([k,1])],scaley:[\"N\",c([1,k,1]),c([1,k])],scalez:[\"N\",c([1,1,k])],scale3d:[\"NNN\",d],skew:[\"Aa\",null,d],skewx:[\"A\",null,c([k,m])],skewy:[\"A\",null,c([m,k])],translate:[\"Tt\",c([k,k,l]),d],translatex:[\"T\",c([k,l,l]),c([k,l])],translatey:[\"T\",c([l,k,l]),c([l,k])],translatez:[\"L\",c([l,l,k])],translate3d:[\"TTL\",d]};a.addPropertiesHandler(e,j,[\"transform\"])}(d,f),function(a){function b(a){var b=Number(a);if(!(isNaN(b)||b<100||b>900||b%100!==0))return b}function c(b){return b=100*Math.round(b/100),b=a.clamp(100,900,b),400===b?\"normal\":700===b?\"bold\":String(b)}function d(a,b){return[a,b,c]}a.addPropertiesHandler(b,d,[\"font-weight\"])}(d),function(a){function b(a){var b={};for(var c in a)b[c]=-a[c];return b}function c(b){return a.consumeToken(/^(left|center|right|top|bottom)\\b/i,b)||a.consumeLengthOrPercent(b)}function d(b,d){var e=a.consumeRepeated(c,/^/,d);if(e&&\"\"==e[1]){var f=e[0];if(f[0]=f[0]||\"center\",f[1]=f[1]||\"center\",3==b&&(f[2]=f[2]||{px:0}),f.length==b){if(/top|bottom/.test(f[0])||/left|right/.test(f[1])){var h=f[0];f[0]=f[1],f[1]=h}if(/left|right|center|Object/.test(f[0])&&/top|bottom|center|Object/.test(f[1]))return f.map(function(a){return\"object\"==typeof a?a:g[a]})}}}function e(d){var e=a.consumeRepeated(c,/^/,d);if(e){for(var f=e[0],h=[{\"%\":50},{\"%\":50}],i=0,j=!1,k=0;k<f.length;k++){var l=f[k];\"string\"==typeof l?(j=/bottom|right/.test(l),i={left:0,right:0,center:i,top:1,bottom:1}[l],h[i]=g[l],\"center\"==l&&i++):(j&&(l=b(l),l[\"%\"]=(l[\"%\"]||0)+100),h[i]=l,i++,j=!1)}return[h,e[1]]}}function f(b){var c=a.consumeRepeated(e,/^,/,b);if(c&&\"\"==c[1])return c[0]}var g={left:{\"%\":0},center:{\"%\":50},right:{\"%\":100},top:{\"%\":0},bottom:{\"%\":100}},h=a.mergeNestedRepeated.bind(null,a.mergeDimensions,\" \");a.addPropertiesHandler(d.bind(null,3),h,[\"transform-origin\"]),a.addPropertiesHandler(d.bind(null,2),h,[\"perspective-origin\"]),a.consumePosition=e,a.mergeOffsetList=h;var i=a.mergeNestedRepeated.bind(null,h,\", \");a.addPropertiesHandler(f,i,[\"background-position\",\"object-position\"])}(d),function(a){function b(b){var c=a.consumeToken(/^circle/,b);if(c&&c[0])return[\"circle\"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\\(/)),d,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\\)/))],c[1]));var f=a.consumeToken(/^ellipse/,b);if(f&&f[0])return[\"ellipse\"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\\(/)),e,a.ignore(a.consumeToken.bind(void 0,/^at/)),a.consumePosition,a.ignore(a.consumeToken.bind(void 0,/^\\)/))],f[1]));var g=a.consumeToken(/^polygon/,b);return g&&g[0]?[\"polygon\"].concat(a.consumeList([a.ignore(a.consumeToken.bind(void 0,/^\\(/)),a.optional(a.consumeToken.bind(void 0,/^nonzero\\s*,|^evenodd\\s*,/),\"nonzero,\"),a.consumeSizePairList,a.ignore(a.consumeToken.bind(void 0,/^\\)/))],g[1])):void 0}function c(b,c){if(b[0]===c[0])return\"circle\"==b[0]?a.mergeList(b.slice(1),c.slice(1),[\"circle(\",a.mergeDimensions,\" at \",a.mergeOffsetList,\")\"]):\"ellipse\"==b[0]?a.mergeList(b.slice(1),c.slice(1),[\"ellipse(\",a.mergeNonNegativeSizePair,\" at \",a.mergeOffsetList,\")\"]):\"polygon\"==b[0]&&b[1]==c[1]?a.mergeList(b.slice(2),c.slice(2),[\"polygon(\",b[1],g,\")\"]):void 0}var d=a.consumeParenthesised.bind(null,a.parseLengthOrPercent),e=a.consumeRepeated.bind(void 0,d,/^/),f=a.mergeNestedRepeated.bind(void 0,a.mergeDimensions,\" \"),g=a.mergeNestedRepeated.bind(void 0,f,\",\");a.addPropertiesHandler(b,c,[\"shape-outside\"])}(d),function(a,b){function c(a,b){b.concat([a]).forEach(function(b){b in document.documentElement.style&&(d[a]=b)})}var d={};c(\"transform\",[\"webkitTransform\",\"msTransform\"]),c(\"transformOrigin\",[\"webkitTransformOrigin\"]),c(\"perspective\",[\"webkitPerspective\"]),c(\"perspectiveOrigin\",[\"webkitPerspectiveOrigin\"]),a.propertyName=function(a){return d[a]||a}}(d,f)}(),!function(){if(void 0===document.createElement(\"div\").animate([]).oncancel){var a;if(window.performance&&performance.now)var a=function(){return performance.now()};else var a=function(){return Date.now()};var b=function(a,b,c){this.target=a,this.currentTime=b,this.timelineTime=c,this.type=\"cancel\",this.bubbles=!1,this.cancelable=!1,this.currentTarget=a,this.defaultPrevented=!1,this.eventPhase=Event.AT_TARGET,this.timeStamp=Date.now()},c=window.Element.prototype.animate;window.Element.prototype.animate=function(d,e){var f=c.call(this,d,e);f._cancelHandlers=[],f.oncancel=null;var g=f.cancel;f.cancel=function(){g.call(this);var c=new b(this,null,a()),d=this._cancelHandlers.concat(this.oncancel?[this.oncancel]:[]);setTimeout(function(){d.forEach(function(a){a.call(c.target,c)})},0)};var h=f.addEventListener;f.addEventListener=function(a,b){\"function\"==typeof b&&\"cancel\"==a?this._cancelHandlers.push(b):h.call(this,a,b)};var i=f.removeEventListener;return f.removeEventListener=function(a,b){if(\"cancel\"==a){var c=this._cancelHandlers.indexOf(b);c>=0&&this._cancelHandlers.splice(c,1)}else i.call(this,a,b)},f}}}(),function(a){var b=document.documentElement,c=null,d=!1;try{var e=getComputedStyle(b).getPropertyValue(\"opacity\"),f=\"0\"==e?\"1\":\"0\";c=b.animate({opacity:[f,f]},{duration:1}),c.currentTime=0,d=getComputedStyle(b).getPropertyValue(\"opacity\")==f}catch(a){}finally{c&&c.cancel()}if(!d){var g=window.Element.prototype.animate;window.Element.prototype.animate=function(b,c){return window.Symbol&&Symbol.iterator&&Array.prototype.from&&b[Symbol.iterator]&&(b=Array.from(b)),Array.isArray(b)||null===b||(b=a.convertToArrayForm(b)),g.call(this,b,c)}}}(c),b.true=a}({},function(){return this}());\n//# sourceMappingURL=web-animations.min.js.map"

/***/ },
/* 11 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }

	  if (support.arrayBuffer) {
	    var viewClasses = [
	      '[object Int8Array]',
	      '[object Uint8Array]',
	      '[object Uint8ClampedArray]',
	      '[object Int16Array]',
	      '[object Uint16Array]',
	      '[object Int32Array]',
	      '[object Uint32Array]',
	      '[object Float32Array]',
	      '[object Float64Array]'
	    ]

	    var isDataView = function(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj)
	    }

	    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	    }
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }

	    return iterator
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }

	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsArrayBuffer(blob)
	    return promise
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    var promise = fileReaderReady(reader)
	    reader.readAsText(blob)
	    return promise
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf)
	    var chars = new Array(view.length)

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i])
	    }
	    return chars.join('')
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0)
	    } else {
	      var view = new Uint8Array(buf.byteLength)
	      view.set(new Uint8Array(buf))
	      return view.buffer
	    }
	  }

	  function Body() {
	    this.bodyUsed = false

	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (!body) {
	        this._bodyText = ''
	      } else if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer)
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer])
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body)
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer)
	        }
	      }
	    }

	    this.text = function() {
	      var rejected = consumed(this)
	      if (rejected) {
	        return rejected
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob)
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text')
	      } else {
	        return Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(input, options) {
	    options = options || {}
	    var body = options.body

	    if (typeof input === 'string') {
	      this.url = input
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }

	  Request.prototype.clone = function() {
	    return new Request(this, { body: this._bodyInit })
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers()
	    rawHeaders.split('\r\n').forEach(function(line) {
	      var parts = line.split(':')
	      var key = parts.shift().trim()
	      if (key) {
	        var value = parts.join(':').trim()
	        headers.append(key, value)
	      }
	    })
	    return headers
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this.type = 'default'
	    this.status = 'status' in options ? options.status : 200
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = 'statusText' in options ? options.statusText : 'OK'
	    this.headers = new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }

	  Body.call(Response.prototype)

	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }

	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }

	  var redirectStatuses = [301, 302, 303, 307, 308]

	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }

	    return new Response(null, {status: status, headers: {location: url}})
	  }

	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response

	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request = new Request(input, init)
	      var xhr = new XMLHttpRequest()

	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        }
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ }
/******/ ])
});
;