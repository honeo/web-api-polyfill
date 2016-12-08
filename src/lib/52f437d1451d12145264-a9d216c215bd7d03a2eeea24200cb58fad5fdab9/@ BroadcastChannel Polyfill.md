BroadcastChannel Polyfill
-------------------------

BroadcastChannel is a new communication API proposed in the [HTML Standard](https://html.spec.whatwg.org/multipage/comms.html#broadcasting-to-other-browsing-contexts) but not yet widely implemented. It allows messages to be sent to all other `BroadcastChannel` instances sharing the same channel name within the same browsing context and origin.

```js
var bc = new BroadcastChannel('name');

bc.postMessage(payload);

bc.onmessage = function(e) {
  console.log('Received: ' + e.data);
};
```

Included in this gist is a polyfill for the API.

### Compatibility ###

There is native [BroadcastChannel support](http://caniuse.com/#feat=broadcastchannel) is in:

* Firefox 38+

The polyfill requires [Message Channel support](http://caniuse.com/#feat=channel-messaging), so should work in:

* Chrome 4+
* Safari 5+
* Opera 11.5+

Does not work in:

* Firefox 37- (neither BroadcastChannel nor MessageChannel)
* IE (??)

### Caveats ###
* The real API should let you transmit anything which can copied by the [structured cloning algorithm](https://html.spec.whatwg.org/multipage/infrastructure.html#structured-clone). This polyfill only copies things using `JSON.stringify()`/`JSON.parse()` so it is much more limited.
* This polyfill uses [DOM Storage](https://html.spec.whatwg.org/multipage/#toc-webstorage) (`localStorage`) and `storage` events. DOM Storage is a synchronous API and so may cause performance issues in pages. In addition, it is not exposed to Workers. Therefore, the polyfill will not function in Workers.
* Unique storage keys are used for each message, and are cleaned up a few hundred milliseconds after transmission. This is a total hack and may result in the messages failing to be received (if the write and delete are coalesced) or persisting (if the cleanup is prevented by page close).

### Example ###

Here's a sample inter-tab chat app. Note that a `BroadcastChannel` should broadcast to other `BroadcastChannel` instances within the same page but _not_ to itself, so there is no local echo of the messages.

```html
<!DOCTYPE html>
<script src="broadcastchannel.js"></script>
<textarea id="out" readonly rows=30 col=80></textarea><br>
<form><input id="in"><input type="submit" id="go" value="Send"></form>

<script>
var $ = document.querySelector.bind(document);

var bc = new BroadcastChannel('chat');
bc.addEventListener('message', function(e) {
  $('#out').value += e.data.message + '\r\n';
});

$('#go').addEventListener('click', function(e) {
  e.preventDefault();
  bc.postMessage({message: $('#in').value});
  $('#in').value = '';
});
</script>
```
