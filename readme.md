# web-api-polyfill
* [honeo/web-api-polyfill](https://github.com/honeo/web-api-polyfill)
* [@honeo/web-api-polyfill](https://www.npmjs.com/package/@honeo/web-api-polyfill)

## なにこれ
自分で使うWebAPIのPolyfill詰め合わせ。  

## 使い方
Babelを通すとコケるかもしれない。
```sh
$ npm i -S @honeo/web-api-polyfill
```
```js
require('@honeo/web-api-polyfill');
```

## 参考
* [HTML5 Cross Browser Polyfills · Modernizr/Modernizr Wiki](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills)
* [Polyfills as a Service](http://polyfills.io/)

## 使ってるやつ

### 自前
document.head  
~~Element.prototype.matches~~ => dom4  
location.origin  
HTMLCollection, NodeListをIterableに。

### BroadcastChannel
* [BroadcastChannel Polyfill](https://gist.github.com/inexorabletash/52f437d1451d12145264)
 * BroadcastChannelのStorageEvent実装。  
 * localStorageにゴミが残る不具合あり。

### CSS.supports
* [termi/CSS.supports](https://github.com/termi/CSS.supports/)


### DOMParser
* [DOMParser HTML extension - Now a polyfill since HTML parsing was added to the DOMParser specification](https://gist.github.com/eligrey/1129031)

### fetch
* [github/fetch: A window.fetch JavaScript polyfill.](https://github.com/github/fetch)

### dom4
* [WebReflection/dom4](https://github.com/WebReflection/dom4)

DOM Lv.4その他。
#### 不具合
Firefox拡張機能のContentsScript内コンテキストではパーミッションエラーが出て動作しない。
#### ParentNode
ParentNode.prepend(), ParentNode.appnd(), ParentNode.query(), ParentNode.queryAll()
#### ChildNode
ChildNode.before(), ChildNode.after(), ChildNode.replaceWith(), ChildNode.remove()
#### Element
Element#classList, Element#matches(), Element#closest()
#### Event
add,removeEventListener(,,object)
#### Other
~~requestAnimationFrame()~~ => requestAnimationFrame polyfill

### ChildNode
* ~~[JAK/childNode.js at master · seznam/JAK](https://github.com/seznam/JAK/blob/master/lib/polyfills/childNode.js)~~ => dom4

### classList
* ~~[eligrey/classList.js](https://github.com/eligrey/classList.js)~~ => dom4

### requestAnimationFrame
* [requestAnimationFrame polyfill](https://gist.github.com/paulirish/1579671)
 * setTimeout実装、dom4内蔵のものはレガシー環境で止まりやすいため。

### performance.now()
* [performance.now() polyfill (aka perf.now())](https://gist.github.com/paulirish/5438650)

### Web Animations API
* [web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)

#### 不具合
* Firefox
 * SDK, WebExtensionsともに、拡張機能のContentsScript内コンテキストではパーミッションエラーが出て動作しない。  
* Safari
 * Safari v5.1.7とPolyfill v2.2.2で[TypeError: setting a property that has only a getter]が発生する。
 * Polyfill v2.2.1に固定中。

### XMLHttpRequest, FormData
* [polyfill/xhr.js at master · inexorabletash/polyfill](https://github.com/inexorabletash/polyfill/blob/master/xhr.js)
